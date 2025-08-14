"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { docSections } from "./sections"
import { getNavigationStructure } from "./nav"

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

  const navigationStructure = getNavigationStructure()

  return (
    <div className="fixed left-4 top-20 bottom-4 w-80 overflow-y-auto">
      <div
        className={"p-6 neu-radius h-full neu-bg neu-shadow-inset neu-transition"}
      >
        <h2 className={"text-xl font-bold mb-6 text-[var(--neu-text)]"}>Documentation</h2>
        <nav className="space-y-2">
          {navigationStructure.map((group) => (
            <div key={group.id}>
              <button
                onClick={() => toggleGroup(group.id)}
                className={
                  "w-full flex items-center gap-3 p-3 neu-radius text-left font-semibold neu-bg neu-shadow neu-transition text-[var(--neu-text)]"
                }
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
                        className={`w-full flex items-center gap-3 p-2 neu-radius text-left transition-all duration-300 text-sm text-[var(--neu-text)] ${
                          activeSection === item.id
                            ? "neu-bg neu-shadow-inset"
                            : "neu-bg neu-shadow opacity-80 hover:opacity-100"
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
