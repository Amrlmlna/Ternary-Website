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
        className={`p-6 rounded-2xl border-0 h-full ${
          darkMode
            ? "bg-[#212121] shadow-[inset_8px_8px_16px_#000,inset_-8px_-8px_16px_#2f2f2f]"
            : "bg-[#e8e8e8] shadow-[inset_8px_8px_16px_#c5c5c5,inset_-8px_-8px_16px_#ffffff]"
        }`}
      >
        <h2 className={`text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-black"}`}>Documentation</h2>
        <nav className="space-y-2">
          {navigationStructure.map((group) => (
            <div key={group.id}>
              <button
                onClick={() => toggleGroup(group.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 font-semibold ${
                  darkMode
                    ? "text-white bg-[#212121] shadow-[6px_6px_12px_#000,-6px_-6px_12px_#2f2f2f] hover:shadow-[inset_4px_4px_12px_#000,inset_-4px_-4px_12px_#2f2f2f] active:shadow-[inset_4px_4px_12px_#000,inset_-4px_-4px_12px_#1f1f1f]"
                    : "text-black bg-[#e8e8e8] shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] hover:shadow-[inset_4px_4px_12px_#c5c5c5,inset_-4px_-4px_12px_#ffffff] active:shadow-[inset_4px_4px_12px_#c5c5c5,inset_-4px_-4px_12px_#ffffff]"
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
                        className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all duration-300 text-sm ${
                          activeSection === item.id
                            ? darkMode
                              ? "text-white bg-[#212121] shadow-[inset_6px_6px_12px_#000,inset_-6px_-6px_12px_#1f1f1f]"
                              : "text-black bg-[#e8e8e8] shadow-[inset_6px_6px_12px_#c5c5c5,inset_-6px_-6px_12px_#ffffff]"
                            : darkMode
                            ? "text-gray-300 hover:text-white hover:bg-[#212121] hover:shadow-[3px_3px_6px_#000,-3px_-3px_6px_#2f2f2f]"
                            : "text-gray-600 hover:text-black hover:bg-[#e8e8e8] hover:shadow-[3px_3px_6px_#c5c5c5,-3px_-3px_6px_#ffffff]"
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
