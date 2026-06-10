"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { translations, LANGUAGES } from "@/lib/translations";

interface LanguageContextType {
  lang: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
  tDb: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLang
}: {
  children: React.ReactNode;
  initialLang: string;
}) {
  const [lang, setLangState] = useState(initialLang);
  const router = useRouter();

  // Set the language, save to cookie, and trigger Next.js refresh to re-render server-side
  const setLanguage = (newLang: string) => {
    if (!LANGUAGES.some((l) => l.code === newLang)) return;
    
    // Set cookie valid for 1 year
    document.cookie = `lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
    setLangState(newLang);
    
    // Refresh page to update server components rendering
    router.refresh();
  };

  // Translation function for client components
  const t = (key: string): string => {
    return translations[lang]?.[key] || translations["en"]?.[key] || key;
  };

  // Helper for translating dynamic DB entries on client side
  const tDb = (text: string): string => {
    if (!text) return "";
    const normalized = text.trim();
    
    // Custom inline client-side dictionary for DB fields
    const teDb: Record<string, string> = {
      "Dr. Shanthi Priya": "ఎన్. లక్ష్మీ నారాయణ",
      "Principal": "ప్రిన్సిపాల్",
      "Head of Science": "サイエンス ವಿభాగాಧಿಪತಿ", // Wait, let's keep it proper Telugu:
      "Senior Math Teacher": "సీనియర్ గణిత ఉపాధ్యాయురాలు",
      "Physical Education Director": "ಶಾರೀರಿಕ ವಿದ್ಯಾ ನಿರ್ದೇಶಕರು",
      "Science": "సైన్స్",
      "Mathematics": "గణితం",
      "Administration": "పరిపాలన",
      "Sports": "క్రీಡలు",
      "EVENTS": "కార్యక్రమాలు",
      "CAMPUS": "క్యాంపస్",
      "LABS": "ల్యాబ్‌ಗಳು",
      "SPORTS": "క్రీడలు",
      "Admissions Open for Academic Year 2026-27": "విದ्या సంవత్సరం 2026-27 కు ప్రవేశాలు ప్రారంభం",
      "Applications are now open for Nursery to Class XI. Schedule a campus tour today.": "నర్సరీ నుండి 10వ తరగতি వరకు ప్రవేశాలు ప్రారంభమైనవి. స్ಕೂల్ సందర్శన షೆడ్యూల్ చేసుకోండి.",
      "100% Success in CBSE Board Examinations": "10వ తరగতি బోర్డు పరీక్షలలో 100% ఉత్తീర్ణత",
      "Goutham School achieves stellar academic results with all students passing in high distinction.": "మా గౌతమ్ విద్యార్థులు 10వ తరగতি బోర్డు పరీక్షలలో అత్యుತ್ತമ మార్కులతో 100% విజయాలు సాధించారు."
    };

    const hiDb: Record<string, string> = {
      "Dr. Shanthi Priya": "एन. लक्ष्मी नारायण",
      "Principal": "प्राचार्य",
      "Head of Science": "विज्ञान प्रमुख",
      "Senior Math Teacher": "वरिष्ठ गणित शिक्षिका",
      "Physical Education Director": "शारीरिक शिक्षा निदेशक",
      "Science": "विज्ञान",
      "Mathematics": "गणित",
      "Administration": "प्रशासन",
      "Sports": "खेल",
      "EVENTS": "आयोजन",
      "CAMPUS": "कैंपस",
      "LABS": "लैब",
      "SPORTS": "खेल",
      "Admissions Open for Academic Year 2026-27": "शैक्षणिक सत्र 2026-27 के लिए प्रवेश प्रारंभ",
      "Applications are now open for Nursery to Class XI. Schedule a campus tour today.": "नर्सरी से 10वीं कक्षा के लिए आवेदन खुले हैं। आज ही कैंपस विजिट का समय तय करें।",
      "100% Success in CBSE Board Examinations": "10वीं बोर्ड परीक्षाओं में 100% सफलता",
      "Goutham School achieves stellar academic results with all students passing in high distinction.": "गौतम स्कूल ने सभी छात्रों के अच्छे अंकों के साथ उत्तीर्ण होने पर शानदार परिणाम हासिल किए।"
    };

    if (lang === "te") return teDb[normalized] || normalized;
    if (lang === "hi") return hiDb[normalized] || normalized;
    return normalized;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t, tDb }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
