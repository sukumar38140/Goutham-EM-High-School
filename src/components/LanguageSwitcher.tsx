"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { LANGUAGES } from "@/lib/translations";

export default function LanguageSwitcher() {
  const { lang, setLanguage } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Split languages into Quick List (English, Telugu, Hindi) and others
  const quickLangs = LANGUAGES.filter((l) => ["en", "te", "hi"].includes(l.code));
  const otherLangs = LANGUAGES.filter((l) => !["en", "te", "hi"].includes(l.code));

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <div className="relative font-sans text-left" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 bg-white border border-primary-cream text-xs font-bold rounded-full text-dark-text/75 hover:text-deep-green hover:bg-primary-cream/40 transition-all duration-300 shadow-sm ${
          dropdownOpen ? "border-campus-green ring-1 ring-campus-green" : ""
        }`}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        <Globe size={14} className="text-dark-text/50" />
        <span>{activeLang.nativeName}</span>
        <ChevronDown size={10} className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-primary-cream rounded-xl shadow-xl z-50 py-1.5 animate-fadeIn">
          <div className="px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider text-dark-text/40 border-b border-primary-cream/50 mb-1">
            Languages
          </div>
          {LANGUAGES.map((l) => {
            const isActive = lang === l.code;
            return (
              <button
                key={l.code}
                onClick={() => {
                  setLanguage(l.code);
                  setDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left font-bold transition-colors ${
                  isActive
                    ? "bg-primary-cream/40 text-deep-green"
                    : "text-dark-text/75 hover:bg-primary-cream/25 hover:text-deep-green"
                }`}
              >
                <div className="flex flex-col">
                  <span>{l.nativeName}</span>
                  <span className="text-[8px] text-dark-text/40 font-medium">{l.name}</span>
                </div>
                {isActive && <Check size={12} className="text-campus-green" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
