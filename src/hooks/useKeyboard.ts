import { useEffect } from "react";

type KeyHandler = (event: KeyboardEvent) => void;

export function useKeyboard(
  key: string,
  handler: KeyHandler,
  options?: {
    ctrlKey?: boolean;
    shiftKey?: boolean;
    altKey?: boolean;
    metaKey?: boolean;
  }
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        if (options?.ctrlKey && !event.ctrlKey) return;
        if (options?.shiftKey && !event.shiftKey) return;
        if (options?.altKey && !event.altKey) return;
        if (options?.metaKey && !event.metaKey) return;

        handler(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [key, handler, options]);
}
