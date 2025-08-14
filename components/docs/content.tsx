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
            ? "bg-[#212121] shadow-[inset_8px_8px_16px_#000,inset_-8px_-8px_16px_#2f2f2f] text-white"
            : "bg-[#e8e8e8] shadow-[inset_8px_8px_16px_#c5c5c5,inset_-8px_-8px_16px_#ffffff] text-black"
        }`}
      >
        <h1 className={`text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-black"}`}>{currentSection.content.title}</h1>
        <p className={`text-lg mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{currentSection.content.description}</p>

        <div className="space-y-6">
          {currentSection.content.items.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl ${
                darkMode
                  ? "bg-[#212121] shadow-[8px_8px_16px_#000,-8px_-8px_16px_#2f2f2f]"
                  : "bg-[#e8e8e8] shadow-[8px_8px_16px_#c5c5c5,-8px_-8px_16px_#ffffff]"
              }`}
            >
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? "text-white" : "text-black"}`}>{item.title}</h3>
              <div className={`leading-relaxed whitespace-pre-line ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{item.content}</div>
            </div>
          ))}
        </div>

        {activeSection === "api" && (
          <div className="mt-8 space-y-6">
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-black"}`}>Example Requests</h3>

            <div>
              <h4 className={`text-lg font-medium mb-2 ${darkMode ? "text-white" : "text-black"}`}>Generate App</h4>
              <div
                className={`p-4 rounded-xl font-mono text-sm ${
                  darkMode
                    ? "bg-[#212121] shadow-[inset_4px_4px_8px_#000,inset_-4px_-4px_8px_#2f2f2f] text-gray-300"
                    : "bg-[#e8e8e8] shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] text-gray-700"
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
              <h4 className={`text-lg font-medium mb-2 ${darkMode ? "text-white" : "text-black"}`}>List Models</h4>
              <div
                className={`p-4 rounded-xl font-mono text-sm ${
                  darkMode
                    ? "bg-[#212121] shadow-[inset_4px_4px_8px_#000,inset_-4px_-4px_8px_#2f2f2f] text-gray-300"
                    : "bg-[#e8e8e8] shadow-[inset_4px_4px_8px_#c5c5c5,inset_-4px_-4px_8px_#ffffff] text-gray-700"
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
