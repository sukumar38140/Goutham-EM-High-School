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

  const activeLangName = LANGUAGES.find((l) => l.code === lang)?.nativeName || "English";

  return (
    <div className="flex flex-wrap items-center gap-1.5 font-sans" ref={dropdownRef}>
      {/* Globe Icon */}
      <Globe className="text-dark-text/50 mr-1 hidden lg:block" size={16} />

      {/* Quick Select Buttons */}
      <div className="flex items-center bg-primary-cream/40 border border-primary-cream rounded-full p-0.5 shadow-sm">
        {quickLangs.map((l) => {
          const isActive = lang === l.code;
          return (
            <button
              key={l.code}
              onClick={() => {
                setLanguage(l.code);
                setDropdownOpen(false);
              }}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-campus-green text-white shadow-sm"
                  : "text-dark-text/70 hover:text-deep-green hover:bg-primary-cream/50"
              }`}
              title={l.name}
            >
              {l.code === "en" ? "EN" : l.nativeName}
            </button>
          );
        })}
      </div>

      {/* Other Languages Dropdown Toggle */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`flex items-center gap-1.5 px-3 py-1.5 bg-primary-cream/40 border border-primary-cream text-xs font-bold rounded-full text-dark-text/75 hover:text-deep-green hover:bg-primary-cream/60 transition-all duration-300 ${
            dropdownOpen ? "border-campus-green ring-1 ring-campus-green" : ""
          }`}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          <span className="hidden sm:inline">
            {["en", "te", "hi"].includes(lang) ? "More" : activeLangName}
          </span>
          <span className="sm:hidden">
            {["en", "te", "hi"].includes(lang) ? "⚙️" : activeLangName}
          </span>
          <ChevronDown size={12} className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-primary-cream rounded-2xl shadow-xl z-50 py-2 animate-fadeIn">
            <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-dark-text/40 border-b border-primary-cream/50 mb-1">
              Other Languages
            </div>
            {otherLangs.map((l) => {
              const isActive = lang === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-xs text-left font-bold transition-colors ${
                    isActive
                      ? "bg-primary-cream/40 text-deep-green"
                      : "text-dark-text/75 hover:bg-primary-cream/25 hover:text-deep-green"
                  }`}
                >
                  <div className="flex flex-col">
                    <span>{l.nativeName}</span>
                    <span className="text-[9px] text-dark-text/40 font-medium">{l.name}</span>
                  </div>
                  {isActive && <Check size={14} className="text-campus-green" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
