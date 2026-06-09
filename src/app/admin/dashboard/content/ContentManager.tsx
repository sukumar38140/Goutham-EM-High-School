"use client";

import { useState, useTransition } from "react";
import { updateContentSettingAction } from "@/app/actions";
import { Loader2, Save } from "lucide-react";

interface ContentSetting {
  key: string;
  value: string;
}

interface ContentManagerProps {
  initialSettings: ContentSetting[];
}

export default function ContentManager({ initialSettings }: ContentManagerProps) {
  const [settings, setSettings] = useState<ContentSetting[]>(initialSettings);
  const [activeTab, setActiveTab] = useState("HERO");
  const [isPending, startTransition] = useTransition();

  // Helper to get key value
  const getSettingValue = <T,>(key: string, defaultValue: T): T => {
    const item = settings.find((s) => s.key === key);
    if (!item) return defaultValue;
    try {
      return JSON.parse(item.value) as T;
    } catch {
      return defaultValue;
    }
  };

  // Form states
  const [heroData, setHeroData] = useState(
    getSettingValue("homepage.hero", {
      headline: "Shaping Future Leaders Through Excellence in Education",
      subheadline: "Admissions Open for Academic Year 2026–27"
    })
  );

  const [statsData, setStatsData] = useState(
    getSettingValue("homepage.stats", {
      studentsCount: "5000+",
      facultyCount: "150+",
      yearsExcellence: "25+",
      development: "100%"
    })
  );

  const [seoData, setSeoData] = useState(
    getSettingValue("seo.globals", {
      title: "Goutham School | Shaping Future Leaders Through Excellence",
      description: "Official website of Goutham School. Admissions open for Nursery to Class XI. Explore our academic excellence and physical campus infrastructure.",
      keywords: "Goutham School, top school, CBSE school, admissions open 2026, best school, quality education"
    })
  );

  const handleSaveSetting = async (key: string, dataObject: Record<string, string>) => {
    const valueString = JSON.stringify(dataObject);
    
    startTransition(async () => {
      const result = await updateContentSettingAction(key, valueString);
      if (result.success) {
        setSettings((prev) =>
          prev.map((item) => (item.key === key ? { ...item, value: valueString } : item))
        );
        alert(result.message || "Settings saved successfully!");
      } else {
        alert(result.message || "Failed to update settings.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Tabs list */}
      <div className="flex flex-wrap gap-2 bg-white border border-primary-cream p-3 rounded-2xl shadow-sm">
        {[
          { key: "HERO", label: "Homepage Hero text" },
          { key: "STATS", label: "Metric Counters" },
          { key: "SEO", label: "SEO Metatags" }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.key
                ? "bg-campus-green text-white shadow-sm"
                : "bg-light-bg text-dark-text/60 hover:bg-primary-cream/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="bg-white border border-primary-cream rounded-3xl p-6 sm:p-10 shadow-lg">
        {/* HERO TAB */}
        {activeTab === "HERO" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-dark-text">Hero Section Editor</h3>
              <p className="text-xs text-dark-text/50">Edit text details showing on the home page splash hero card.</p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Main Headline Title *</label>
                <input
                  type="text"
                  value={heroData.headline}
                  onChange={(e) => setHeroData({ ...heroData, headline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Subheadline / Notification Text *</label>
                <input
                  type="text"
                  value={heroData.subheadline}
                  onChange={(e) => setHeroData({ ...heroData, subheadline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
                />
              </div>
            </div>

            <button
              onClick={() => handleSaveSetting("homepage.hero", heroData)}
              disabled={isPending}
              className="flex items-center gap-2 bg-campus-green hover:bg-deep-green text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-md transition-colors disabled:opacity-75"
            >
              {isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save Hero Settings
            </button>
          </div>
        )}

        {/* STATS TAB */}
        {activeTab === "STATS" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-dark-text">Statistics Metrics</h3>
              <p className="text-xs text-dark-text/50">Modify counter metrics listed in the home stats counter block.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Enrolled Students Count *</label>
                <input
                  type="text"
                  value={statsData.studentsCount}
                  onChange={(e) => setStatsData({ ...statsData, studentsCount: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Expert Mentors Base *</label>
                <input
                  type="text"
                  value={statsData.facultyCount}
                  onChange={(e) => setStatsData({ ...statsData, facultyCount: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Years of Excellence *</label>
                <input
                  type="text"
                  value={statsData.yearsExcellence}
                  onChange={(e) => setStatsData({ ...statsData, yearsExcellence: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Development Index *</label>
                <input
                  type="text"
                  value={statsData.development}
                  onChange={(e) => setStatsData({ ...statsData, development: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
                />
              </div>
            </div>

            <button
              onClick={() => handleSaveSetting("homepage.stats", statsData)}
              disabled={isPending}
              className="flex items-center gap-2 bg-campus-green hover:bg-deep-green text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-md transition-colors disabled:opacity-75"
            >
              {isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save Statistics Metrics
            </button>
          </div>
        )}

        {/* SEO TAB */}
        {activeTab === "SEO" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-dark-text">Global SEO Metatags</h3>
              <p className="text-xs text-dark-text/50">Edit title keywords and site description summaries indexes for Google.</p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Global Meta Title *</label>
                <input
                  type="text"
                  value={seoData.title}
                  onChange={(e) => setSeoData({ ...seoData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Search Keywords (Comma separated list) *</label>
                <input
                  type="text"
                  value={seoData.keywords}
                  onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark-text/75 mb-2">Meta Description *</label>
                <textarea
                  value={seoData.description}
                  onChange={(e) => setSeoData({ ...seoData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-dark-text/10 bg-light-bg focus:border-campus-green focus:outline-none text-xs font-semibold resize-none"
                ></textarea>
              </div>
            </div>

            <button
              onClick={() => handleSaveSetting("seo.globals", seoData)}
              disabled={isPending}
              className="flex items-center gap-2 bg-campus-green hover:bg-deep-green text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-md transition-colors disabled:opacity-75"
            >
              {isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save SEO Metatags
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
