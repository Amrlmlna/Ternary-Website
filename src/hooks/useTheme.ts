import { useState, useEffect } from "react";

export type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const updateResolvedTheme = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const newResolvedTheme =
        theme === "system" ? (isDark ? "dark" : "light") : theme;
      setResolvedTheme(newResolvedTheme);

      // Apply theme to document
      if (newResolvedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    updateResolvedTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateResolvedTheme);

    return () => mediaQuery.removeEventListener("change", updateResolvedTheme);
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light";
    changeTheme(newTheme);
  };

  return {
    theme,
    resolvedTheme,
    changeTheme,
    toggleTheme,
  };
}
