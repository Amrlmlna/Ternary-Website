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
        className={`p-8 rounded-2xl border-0 ${
          darkMode
            ? "bg-[#1a1a1a] shadow-[inset_8px_8px_16px_#0a0a0a,inset_-8px_-8px_16px_#2a2a2a]"
            : "bg-[#f0f0f0] shadow-[inset_8px_8px_16px_#d1d1d1,inset_-8px_-8px_16px_#ffffff]"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">{currentSection.content.title}</h1>
        <p className="text-lg mb-8 opacity-80">{currentSection.content.description}</p>

        <div className="space-y-6">
          {currentSection.content.items.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl ${
                darkMode
                  ? "bg-[#0f0f0f] shadow-[8px_8px_16px_#0a0a0a,-8px_-8px_16px_#2a2a2a]"
                  : "bg-[#f0f0f0] shadow-[8px_8px_16px_#d1d1d1,-8px_-8px_16px_#ffffff]"
              }`}
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <div className="opacity-80 leading-relaxed whitespace-pre-line">{item.content}</div>
            </div>
          ))}
        </div>

        {activeSection === "api" && (
          <div className="mt-8 space-y-6">
            <h3 className="text-xl font-semibold mb-4">Example Requests</h3>

            <div>
              <h4 className="text-lg font-medium mb-2">Generate App</h4>
              <div
                className={`p-4 rounded-xl font-mono text-sm ${
                  darkMode
                    ? "bg-[#0a0a0a] shadow-[inset_4px_4px_8px_#050505,inset_-4px_-4px_8px_#0f0f0f]"
                    : "bg-[#e8e8e8] shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff]"
                }`}
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
              <h4 className="text-lg font-medium mb-2">List Models</h4>
              <div
                className={`p-4 rounded-xl font-mono text-sm ${
                  darkMode
                    ? "bg-[#0a0a0a] shadow-[inset_4px_4px_8px_#050505,inset_-4px_-4px_8px_#0f0f0f]"
                    : "bg-[#e8e8e8] shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff]"
                }`}
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
