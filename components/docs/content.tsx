import { docSections } from "./sections"

interface ContentProps {
  darkMode: boolean
  activeSection: string
}

export default function DocsContent({ darkMode, activeSection }: ContentProps) {
  const currentSection = docSections.find((s) => s.id === activeSection)

  if (!currentSection) return null

  return (
    <div className="ml-96 pr-4">
      <div
        className={"p-8 neu-radius neu-bg neu-shadow-inset neu-transition text-[var(--neu-text)]"}
      >
        <h1 className={"text-3xl font-bold mb-4 text-[var(--neu-text)]"}>{currentSection.content.title}</h1>
        <p className={"text-lg mb-8 text-[var(--neu-text)] opacity-80"}>{currentSection.content.description}</p>

        <div className="space-y-6">
          {currentSection.content.items.map((item, index) => (
            <div
              key={index}
              className={"p-6 neu-radius neu-bg neu-shadow neu-transition"}
            >
              <h3 className={"text-xl font-semibold mb-3 text-[var(--neu-text)]"}>{item.title}</h3>
              <div className={"leading-relaxed whitespace-pre-line text-[var(--neu-text)] opacity-80"}>{item.content}</div>
            </div>
          ))}
        </div>

        {activeSection === "api" && (
          <div className="mt-8 space-y-6">
            <h3 className={"text-xl font-semibold mb-4 text-[var(--neu-text)]"}>Example Requests</h3>

            <div>
              <h4 className={"text-lg font-medium mb-2 text-[var(--neu-text)]"}>Generate App</h4>
              <div
                className={"p-4 neu-radius font-mono text-sm neu-bg neu-shadow-inset text-[var(--neu-text)] opacity-80"}
              >
                <pre className="overflow-x-auto">
                  {`curl -X POST https://api.ternary.dev/v1/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messages": [
      {
        "role": "user",
        "content": "Create a modern landing page for a SaaS product"
      }
    ],
    "model": "auto"
  }'`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className={"text-lg font-medium mb-2 text-[var(--neu-text)]"}>List Models</h4>
              <div
                className={"p-4 neu-radius font-mono text-sm neu-bg neu-shadow-inset text-[var(--neu-text)] opacity-80"}
              >
                <pre className="overflow-x-auto">
                  {`curl -X GET https://api.ternary.dev/v1/models \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
