// import React, { useState, useRef } from "react";
// import { Globe, ChevronDown } from "lucide-react";
// import { useTranslation, Language } from "../src/lib/i18n";
// import { useClickOutside } from "../src/hooks/useClickOutside";

// // export default function LanguageSelector() {
// //   const { language, setLanguage, availableLanguages } = useTranslation();
// //   const [isOpen, setIsOpen] = useState(false);
// //   const dropdownRef = useRef<HTMLDivElement>(null);

// //   useClickOutside(dropdownRef, () => setIsOpen(false));

// //   const currentLanguage = availableLanguages.find(
// //     (lang) => lang.code === language
// //   );

// //   const handleLanguageChange = (newLanguage: Language) => {
// //     setLanguage(newLanguage);
// //     setIsOpen(false);
// //   };

// //   return (
// //     <div className="relative" ref={dropdownRef}>
// //       <button
// //         onClick={() => setIsOpen(!isOpen)}
// //         className="neu-btn flex items-center gap-2 px-3 py-2 text-sm"
// //         aria-label="Select language"
// //       >
// //         <Globe size={16} />
// //         <span>{currentLanguage?.nativeName}</span>
// //         <ChevronDown
// //           size={14}
// //           className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
// //         />
// //       </button>

// //       {isOpen && (
// //         <div className="absolute top-full right-0 mt-2 w-48 neu-bg neu-shadow neu-radius py-2 z-50">
// //           {availableLanguages.map((lang) => (
// //             <button
// //               key={lang.code}
// //               onClick={() => handleLanguageChange(lang.code)}
// //               className={`w-full px-4 py-2 text-left text-sm transition-colors ${
// //                 language === lang.code
// //                   ? "bg-accent text-white"
// //                   : "text-[var(--neu-text)] hover:bg-[var(--neu-border)]"
// //               }`}
// //             >
// //               <div className="flex flex-col">
// //                 <span className="font-medium">{lang.nativeName}</span>
// //                 <span className="text-xs opacity-70">{lang.name}</span>
// //               </div>
// //             </button>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
