import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";

// Simplified configuration: all we need is the LiteLLM endpoint.
const LITELLM_ENDPOINT =
  process.env.LITELLM_BASE_URL || "https://ternary-gatewayy.up.railway.app";

// Define available models for routing logic using the correct public model names.
const AVAILABLE_MODELS = [
  "gpt-3.5-turbo",
  "gemini/gemini-2.5-pro",
  "gemini/gemini-2.5-flash",
  "openrouter/meta-llama/llama-3-8b-instruct:free",
  "openrouter/mistralai/mistral-7b-instruct:free",
];

// --- Model Aliases and Auto Mode Logic ---
const MODEL_ALIASES: Record<string, string> = {
  // Alias gemini-1.5-pro to the correct gemini-2.5-pro public name
  "gemini-1.5-pro": "gemini@gemini-2.5-pro",
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
      "gemini/gemini-2.5-pro",
      "gpt-3.5-turbo",
      "gemini/gemini-2.5-flash",
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
      ternary_options,
      files,
      ...body
    } = req.body;

    const modelKey = resolveModel(requestedModel);

    if (!modelKey) {
      return res
        .status(400)
        .json({ error: "Model not found or not available." });
    }

    let finalMessages = messages;
    if (ternary_options?.enableSmartFilesContext && files && files.length > 0) {
      console.log("Optimizing context with smart files...");
      finalMessages = await optimizeContextWithSmartFiles(messages, files);
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
    const response = await fetch(`${LITELLM_ENDPOINT}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(payload),
    });

    // Proxy the entire response from LiteLLM back to the client
    res.status(response.status);

    // Copy all headers from the LiteLLM response to our response
    response.headers.forEach((value, key) => {
      // Avoid setting 'content-encoding' if it's 'gzip', as Vercel handles compression
      if (key.toLowerCase() !== "content-encoding") {
        res.setHeader(key, value);
      }
    });

    if (body.stream && response.body) {
      // For streaming responses, pipe the body directly to the client
      Readable.fromWeb(response.body as any).pipe(res);
    } else {
      // For non-streaming responses, properly format and send the JSON body in one go.
      const data = await response.json();
      res.status(response.status).json({
        success: response.ok,
        message: response.statusText,
        responseObject: data,
        statusCode: response.status,
      });
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
  // Limit to a reasonable number of files to avoid excessive token usage
  const limitedFiles = files.slice(0, 10); // Cap at 10 files

  const filesContext = limitedFiles
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
