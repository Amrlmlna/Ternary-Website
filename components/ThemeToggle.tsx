import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../src/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, resolvedTheme, changeTheme, toggleTheme } = useTheme();

  const themes = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ] as const;

  return (
    <div className="flex items-center gap-2">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => changeTheme(value)}
          className={`neu-btn p-2 transition-all ${
            theme === value
              ? "bg-accent text-white neu-shadow"
              : "hover:bg-accent hover:text-white"
          }`}
          title={label}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
}
