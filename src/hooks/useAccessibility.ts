import { useEffect, useRef, useCallback } from "react";

interface AccessibilityOptions {
  enableKeyboardNavigation?: boolean;
  enableScreenReader?: boolean;
  enableHighContrast?: boolean;
  enableReducedMotion?: boolean;
}

export function useAccessibility(options: AccessibilityOptions = {}) {
  const {
    enableKeyboardNavigation = true,
    enableScreenReader = true,
    enableHighContrast = false,
    enableReducedMotion = false,
  } = options;

  const focusableElementsRef = useRef<HTMLElement[]>([]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enableKeyboardNavigation) return;

      const { key, target } = event;
      const element = target as HTMLElement;

      switch (key) {
        case "Tab":
          // Natural tab navigation
          break;
        case "Enter":
        case " ":
          // Activate buttons and links
          if (element.tagName === "BUTTON" || element.tagName === "A") {
            event.preventDefault();
            element.click();
          }
          break;
        case "Escape":
          // Close modals, dropdowns, etc.
          const closeEvent = new CustomEvent("close", { bubbles: true });
          element.dispatchEvent(closeEvent);
          break;
        case "ArrowUp":
        case "ArrowDown":
          // Navigate through lists
          if (element.getAttribute("role") === "listbox") {
            event.preventDefault();
            const items = Array.from(
              element.querySelectorAll('[role="option"]')
            );
            const currentIndex = items.findIndex(
              (item) => item === document.activeElement
            );
            const direction = key === "ArrowUp" ? -1 : 1;
            const nextIndex =
              (currentIndex + direction + items.length) % items.length;
            (items[nextIndex] as HTMLElement).focus();
          }
          break;
      }
    },
    [enableKeyboardNavigation]
  );

  // Handle focus management
  const trapFocus = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);
    return () => container.removeEventListener("keydown", handleTabKey);
  }, []);

  // Handle screen reader announcements
  const announceToScreenReader = useCallback(
    (message: string, priority: "polite" | "assertive" = "polite") => {
      if (!enableScreenReader) return;

      const announcement = document.createElement("div");
      announcement.setAttribute("aria-live", priority);
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = message;

      document.body.appendChild(announcement);

      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    },
    [enableScreenReader]
  );

  // Handle high contrast mode
  const toggleHighContrast = useCallback(() => {
    if (!enableHighContrast) return;

    const isHighContrast =
      document.documentElement.classList.contains("high-contrast");
    if (isHighContrast) {
      document.documentElement.classList.remove("high-contrast");
      localStorage.setItem("high-contrast", "false");
    } else {
      document.documentElement.classList.add("high-contrast");
      localStorage.setItem("high-contrast", "true");
    }
  }, [enableHighContrast]);

  // Handle reduced motion
  const toggleReducedMotion = useCallback(() => {
    if (!enableReducedMotion) return;

    const isReducedMotion =
      document.documentElement.classList.contains("reduced-motion");
    if (isReducedMotion) {
      document.documentElement.classList.remove("reduced-motion");
      localStorage.setItem("reduced-motion", "false");
    } else {
      document.documentElement.classList.add("reduced-motion");
      localStorage.setItem("reduced-motion", "true");
    }
  }, [enableReducedMotion]);

  // Initialize accessibility features
  useEffect(() => {
    // Add keyboard event listener
    document.addEventListener("keydown", handleKeyDown);

    // Load saved preferences
    const savedHighContrast = localStorage.getItem("high-contrast") === "true";
    const savedReducedMotion =
      localStorage.getItem("reduced-motion") === "true";

    if (enableHighContrast && savedHighContrast) {
      document.documentElement.classList.add("high-contrast");
    }

    if (enableReducedMotion && savedReducedMotion) {
      document.documentElement.classList.add("reduced-motion");
    }

    // Check for user's motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      document.documentElement.classList.add("reduced-motion");
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, enableHighContrast, enableReducedMotion]);

  return {
    trapFocus,
    announceToScreenReader,
    toggleHighContrast,
    toggleReducedMotion,
  };
}
