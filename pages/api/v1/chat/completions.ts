import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";

type RankedFile = { path: string; score: number };

// Lightweight heuristic ranking using last user message keywords and file path/content matches
function rankFilesByRelevance(
  messages: Array<{ role: string; content?: string }>,
  files: Array<{ path: string; content: string }>
): RankedFile[] {
  const lastUser = [...messages].reverse().find((m) => m?.role === "user");
  const query = (lastUser?.content || "").toLowerCase();
  const qTokens = new Set(
    query
      .split(/[^a-z0-9_]+/i)
      .map((t) => t.trim())
      .filter((t) => t.length >= 3 && t.length <= 64)
  );

  const scoreFile = (f: { path: string; content: string }): number => {
    const pathLc = f.path.toLowerCase();
    const contentLc = (f.content || "").toLowerCase();
    let score = 0;
    // Path-based boosts
    if (pathLc.includes("src/components")) score += 1.5;
    if (pathLc.includes("src/hooks")) score += 1.0;
    if (pathLc.includes("src/pages")) score += 1.0;
    if (pathLc.endsWith(".spec.ts") || pathLc.endsWith(".test.ts"))
      score += 0.3;

    // Token overlap in path
    for (const tok of qTokens) {
      if (pathLc.includes(tok)) score += 1.2;
    }
    // Token overlap in content (limited sampling)
    const snippet = contentLc.slice(0, 5000); // avoid heavy compute
    for (const tok of qTokens) {
      if (snippet.includes(tok)) score += 0.4;
    }
    // Exact phrase hints
    if (query && snippet.includes(query)) score += 2.0;
    return score;
  };

  const ranked = files.map((f) => ({ path: f.path, score: scoreFile(f) }));
  ranked.sort((a, b) => b.score - a.score);
  return ranked;
}

// Allow larger payloads to accommodate Smart Context files
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

// Simplified configuration: all we need is the LiteLLM endpoint.
const LITELLM_ENDPOINT =
  process.env.LITELLM_BASE_URL || "https://ternary-gatewayy.up.railway.app";

// Define available models for routing logic using the correct public model names.
const AVAILABLE_MODELS = [
  "gemini-2.5-pro",
  "gemini-2.5-flash",
  "openrouter/meta-llama/llama-3-8b-instruct:free",
  "openrouter/mistralai/mistral-7b-instruct:free",
];

// --- Model Aliases and Auto Mode Logic ---
const MODEL_ALIASES: Record<string, string> = {
  // Alias gemini-1.5-pro to the correct gemini-2.5-pro public name
  "gemini-1.5-pro": "gemini/gemini-2.5-pro",
  // Ensure aliases point to the exact public model names
};

function resolveModel(requestedModel: string): string {
  // 1. Direct match
  if (AVAILABLE_MODELS.includes(requestedModel)) {
    return requestedModel;
  }

  // 2. Alias match
  const aliasedModel = MODEL_ALIASES[requestedModel];
  if (aliasedModel && AVAILABLE_MODELS.includes(aliasedModel)) {
    return aliasedModel;
  }

  // 3. Auto mode logic with a clear fallback path
  if (requestedModel === "auto") {
    // Prioritize models for "auto" mode based on the allowed list, using correct public names
    const autoPriority = [
      "gemini-2.5-pro",
      "gpt-3.5-turbo",
      "gemini-2.5-flash",
      "openrouter/meta-llama/llama-3-8b-instruct:free",
      "openrouter/mistralai/mistral-7b-instruct:free",
    ];
    for (const model of autoPriority) {
      if (AVAILABLE_MODELS.includes(model)) {
        console.log(`"auto" model resolved to: ${model}`);
        return model;
      }
    }
  }

  // 4. Ultimate fallback: return the first available model as a last resort.
  // This makes the system more resilient if preferred models are removed.
  console.warn(
    `Could not resolve model "${requestedModel}". Falling back to the first available model.`
  );
  return AVAILABLE_MODELS[0];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Log the requested API endpoint URL
  console.log(
    "[API REQUEST]",
    req.method,
    req.url,
    "from",
    req.headers["x-forwarded-for"] || req.socket?.remoteAddress
  );
  // Always set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Ternary-Request-Id"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const startTime = Date.now();
  try {
    const { authorization: authHeader } = req.headers;
    if (!authHeader) {
      return res.status(401).json({
        error: { message: "No API key provided", type: "authentication_error" },
      });
    }

    const {
      model: requestedModel = "auto",
      messages,
      ...body
    } = req.body || {};
    const requestIdHeader = req.headers["x-ternary-request-id"] as
      | string
      | undefined;
    if (requestIdHeader) console.log("[REQUEST-ID]", requestIdHeader);

    // Basic validation for messages
    if (!Array.isArray(messages) || messages.some((m) => !m || !m.role)) {
      return res
        .status(400)
        .json({ error: { message: "Invalid 'messages' format" } });
    }

    // Engine contract: options and files arrive inside body.ternary_options with snake_case keys
    const ternaryOptions = (req.body?.ternary_options ?? {}) as {
      files?: { path: string; content: string }[];
      enable_lazy_edits?: boolean;
      enable_smart_files_context?: boolean;
      // Back-compat: allow camelCase if some client sends it
      enableLazyEdits?: boolean;
      enableSmartFilesContext?: boolean;
    };
    // Prefer snake_case; fallback to camelCase for compatibility
    const enableSmartFilesContext =
      ternaryOptions.enable_smart_files_context ??
      ternaryOptions.enableSmartFilesContext ??
      false;
    const providedFiles =
      Array.isArray(ternaryOptions.files) && ternaryOptions.files.length > 0
        ? (ternaryOptions.files as { path: string; content: string }[])
        : // ultimate fallback: accept legacy top-level files if present
        Array.isArray((req.body as any)?.files)
        ? (req.body as any).files
        : undefined;

    const modelKey = resolveModel(requestedModel);

    if (!modelKey) {
      return res
        .status(400)
        .json({ error: "Model not found or not available." });
    }

    let finalMessages = messages;
    if (enableSmartFilesContext && providedFiles && providedFiles.length > 0) {
      console.log("Optimizing context with smart files...");
      finalMessages = await optimizeContextWithSmartFiles(
        messages,
        providedFiles
      );

      // Engine directive: ask the model to surface Codebase Context and ranked files
      const ranked = rankFilesByRelevance(messages, providedFiles).slice(0, 8);
      const rankedPaths = ranked.map((r: RankedFile) => r.path);

      const engineDirective = {
        role: "system",
        content: `You are integrated inside the Ternary App. When Smart Context is enabled, you MUST:
1) In your <think> section, include a short 'Ranked files' list with scores (path: score), based on the user's request.
2) At the top of your visible answer (right after </think>), output a <ternary-codebase-context files="${rankedPaths.join(
          ", "
        )}"></ternary-codebase-context> tag listing the selected file paths (comma-separated). Do not explain this tag; just output it.
3) Use Ternary tags (<ternary-write>, <ternary-rename>, <ternary-delete>, <ternary-add-dependency>) for actions.
4) If you reference attachments like TERNARY_ATTACHMENT_X in your reasoning, ensure that when writing files you include their content inside <ternary-write> blocks so they persist.`,
      } as const;

      // Prepend engine directive so it doesn't get truncated by context
      finalMessages = [engineDirective, ...finalMessages];
    }

    // Construct the payload for LiteLLM, passing through all relevant options.
    // Filter unsupported parameters for OpenAI models
    let filteredBody = { ...body };
    const openaiModels = ["gpt-3.5-turbo"]; // Only include gpt-3.5-turbo for filtering
    if (openaiModels.includes(modelKey) && "thinking" in filteredBody) {
      // Drop 'thinking' param for OpenAI models
      const { thinking, ...rest } = filteredBody;
      filteredBody = rest;
    }
    const payload = {
      ...filteredBody,
      model: modelKey, // Ensure the resolved model is used
      messages: finalMessages, // Use the potentially modified messages
    };

    // Forward the request to the LiteLLM endpoint
    // Forward request id for tracing if present
    const requestId = req.headers["x-ternary-request-id"] as string | undefined;

    const response = await fetch(`${LITELLM_ENDPOINT}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
        ...(requestId ? { "X-Ternary-Request-Id": requestId } : {}),
      },
      body: JSON.stringify(payload),
    });

    // Proxy the entire response from LiteLLM back to the client
    res.status(response.status);
    if (requestId) {
      // Echo request id for client correlation
      res.setHeader("X-Ternary-Request-Id", requestId);
    }

    // Copy all headers from the LiteLLM response to our response
    response.headers.forEach((value, key) => {
      // Avoid setting 'content-encoding' if it's 'gzip', as Vercel handles compression
      if (key.toLowerCase() !== "content-encoding") {
        res.setHeader(key, value);
      }
    });

    if (body.stream && response.body) {
      // Strengthen SSE streaming behavior
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("X-Accel-Buffering", "no");
      // For streaming responses, pipe the body directly to the client
      Readable.fromWeb(response.body as any).pipe(res);
    } else {
      // For non-streaming responses, forward upstream body as-is when possible
      const text = await response.text();
      try {
        const data = JSON.parse(text);
        // Pass through upstream payload while wrapping minimal metadata
        res.status(response.status).json({
          success: response.ok,
          message: response.statusText,
          responseObject: data,
          statusCode: response.status,
        });
      } catch {
        // Upstream did not return JSON; forward raw text
        res.status(response.status).send(text);
      }
      return; // Explicitly return to end execution.
    }
  } catch (error: any) {
    console.error("Error in chat completions:", error);
    res.status(500).json({
      error: {
        message: error.message || "Internal server error",
        type: "internal_error",
      },
    });
  }
}

// ✅ Optimized Smart Context function
async function optimizeContextWithSmartFiles(
  messages: any[],
  files: { path: string; content: string }[]
): Promise<any[]> {
  // Smarter trimming: cap number of files and total content size
  const MAX_FILES = 12;
  const MAX_TOTAL_CHARS = 200_000; // ~50k tokens rough upper bound
  const MAX_FILE_CHARS = 25_000;

  const trimmed: { path: string; content: string }[] = [];
  let total = 0;
  for (const f of files.slice(0, MAX_FILES)) {
    let c = f.content ?? "";
    if (c.length > MAX_FILE_CHARS) {
      c =
        c.slice(0, MAX_FILE_CHARS) +
        "\n[...TRUNCATED BY ENGINE FOR CONTEXT SIZE...]";
    }
    if (total + c.length > MAX_TOTAL_CHARS) break;
    trimmed.push({ path: f.path, content: c });
    total += c.length;
  }

  const filesContext = trimmed
    .map((file) => `File: ${file.path}\n\n\`\`\`\n${file.content}\n\`\`\`\n`)
    .join("\n---\n");

  const lastUserMessageIndex = messages.findLastIndex((m) => m.role === "user");

  if (lastUserMessageIndex !== -1) {
    const lastUserMessage = messages[lastUserMessageIndex];
    const updatedContent = `The user has provided the following file context. Use this information to inform your response. Do not explicitly mention that you are using this context unless asked.\n\nRelevant Codebase Context:\n${filesContext}\n\n---\n\nUser Request: ${lastUserMessage.content}`;

    const updatedMessages = [...messages];
    updatedMessages[lastUserMessageIndex] = {
      ...lastUserMessage,
      content: updatedContent,
    };
    return updatedMessages;
  } else {
    // Fallback if no user message is found (less likely)
    const systemMessage = {
      role: "system",
      content: `The user has provided the following file context. Use this information to inform your response. Do not explicitly mention that you are using this context unless asked.\n\nRelevant Codebase Context:\n${filesContext}`,
    };
    return [...messages, systemMessage];
  }
}
