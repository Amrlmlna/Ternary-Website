"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/docs/sidebar";
import DocsContent from "@/components/docs/content";
import { findCategoryBySectionId } from "@/components/docs/nav";

export default function DocsSectionPage() {
  const router = useRouter();
  const { category, section } = router.query as { category?: string; section?: string };

  const [darkMode, setDarkMode] = useState(false);

  const activeSection = useMemo(() => (typeof section === "string" ? section : "overview"), [section]);

  useEffect(() => {
    // If category doesn't match the section's real category, fix the URL without a full reload.
    if (!activeSection) return;
    const cat = findCategoryBySectionId(activeSection);
    if (cat && category && cat.id !== category) {
      router.replace(`/docs/${cat.id}/${activeSection}`);
    }
  }, [category, activeSection, router]);

  const handleSectionChange = (newSectionId: string) => {
    const cat = findCategoryBySectionId(newSectionId);
    const nextCategory = cat?.id ?? category ?? "getting-started";
    router.push(`/docs/${nextCategory}/${newSectionId}`);
  };

  const toggleTheme = () => setDarkMode((v) => !v);
  const scrollToDownload = () => {
    window.location.href = "/";
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen neu-bg neu-transition text-[var(--neu-text)]">
        <Navbar darkMode={darkMode} onDownloadClick={scrollToDownload} onThemeToggle={toggleTheme} />
        <div className="pt-20">
          <DocsSidebar darkMode={darkMode} activeSection={activeSection} onSectionChange={handleSectionChange} />
          <DocsContent darkMode={darkMode} activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
}
