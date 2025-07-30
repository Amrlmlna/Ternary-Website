import { useState, useEffect } from "react";

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("lg");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < breakpoints.sm) {
        setBreakpoint("sm");
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width < breakpoints.md) {
        setBreakpoint("md");
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else if (width < breakpoints.lg) {
        setBreakpoint("lg");
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else if (width < breakpoints.xl) {
        setBreakpoint("xl");
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      } else {
        setBreakpoint("2xl");
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
  };
}
