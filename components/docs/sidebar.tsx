"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { docSections } from "./sections"

interface SidebarProps {
  darkMode: boolean
  activeSection: string
  onSectionChange: (sectionId: string) => void
}

export default function DocsSidebar({ darkMode, activeSection, onSectionChange }: SidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["guides", "pro", "integrations"])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
  }

  const navigationStructure = [
    {
      id: "getting-started",
      title: "Getting Started",
      items: [
        { id: "overview", title: "Overview" },
        { id: "quickstart", title: "Quickstart" },
      ],
    },
    {
      id: "guides",
      title: "Guides",
      items: [
        { id: "ai-models", title: "AI Models" },
        { id: "local-models", title: "Local Models" },
        { id: "chatting", title: "Chatting" },
        { id: "debugging", title: "Debugging" },
        { id: "previewing", title: "Previewing" },
        { id: "versioning", title: "Versioning" },
        { id: "importing", title: "Importing" },
        { id: "mobile-app", title: "Mobile App" },
      ],
    },
    {
      id: "pro",
      title: "Pro",
      items: [
        { id: "pro-overview", title: "Pro Overview" },
        { id: "pro-modes", title: "Pro Modes" },
        { id: "maximize-credits", title: "Maximize AI Credits" },
      ],
    },
    {
      id: "integrations",
      title: "Integrations",
      items: [
        { id: "github", title: "GitHub" },
        { id: "supabase", title: "Supabase" },
      ],
    },
    {
      id: "reference",
      title: "Reference",
      items: [
        { id: "api", title: "API Reference" },
        { id: "faq", title: "FAQ" },
        { id: "roadmap", title: "Roadmap" },
      ],
    },
    {
      id: "policies",
      title: "Policies",
      items: [
        { id: "privacy-policy", title: "Privacy Policy" },
        { id: "terms", title: "Terms of Service" },
        { id: "cancellation", title: "Cancellation" },
        { id: "refund", title: "Refund" },
        { id: "abuse", title: "Abuse" },
      ],
    },
  ]

  return (
    <div className="fixed left-4 top-20 bottom-4 w-80 overflow-y-auto">
      <div
        className={`p-6 rounded-2xl border-0 h-full ${
          darkMode
            ? "bg-[#1a1a1a] shadow-[inset_8px_8px_16px_#0a0a0a,inset_-8px_-8px_16px_#2a2a2a]"
            : "bg-[#f0f0f0] shadow-[inset_8px_8px_16px_#d1d1d1,inset_-8px_-8px_16px_#ffffff]"
        }`}
      >
        <h2 className="text-xl font-bold mb-6">Documentation</h2>
        <nav className="space-y-2">
          {navigationStructure.map((group) => (
            <div key={group.id}>
              <button
                onClick={() => toggleGroup(group.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 font-semibold ${
                  darkMode
                    ? "hover:bg-[#0f0f0f] hover:shadow-[4px_4px_8px_#0a0a0a,-4px_-4px_8px_#2a2a2a]"
                    : "hover:bg-[#e8e8e8] hover:shadow-[4px_4px_8px_#d1d1d1,-4px_-4px_8px_#ffffff]"
                }`}
              >
                {expandedGroups.includes(group.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span>{group.title}</span>
              </button>

              {expandedGroups.includes(group.id) && (
                <div className="ml-4 mt-2 space-y-1">
                  {group.items.map((item) => {
                    const section = docSections.find((s) => s.id === item.id)
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSectionChange(item.id)}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all duration-200 text-sm ${
                          activeSection === item.id
                            ? darkMode
                              ? "bg-[#0f0f0f] shadow-[6px_6px_12px_#0a0a0a,-6px_-6px_12px_#2a2a2a] text-white"
                              : "bg-[#f0f0f0] shadow-[6px_6px_12px_#d1d1d1,-6px_-6px_12px_#ffffff] text-gray-900"
                            : "hover:bg-opacity-50"
                        }`}
                      >
                        {section?.icon}
                        <span>{item.title}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
