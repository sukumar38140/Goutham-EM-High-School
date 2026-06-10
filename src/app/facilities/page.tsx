import Image from "next/image";
import { cookies } from "next/headers";
import { BookOpen, Compass, Trophy, Bus, Monitor, Volume2, ShieldCheck, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { translations } from "@/lib/translations";

export default async function FacilitiesPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "en";
  const t = (key: string) => translations[lang]?.[key] || translations["en"]?.[key] || key;

  const facilityItems = [
    {
      title: t("fac.lib.title"),
      description: t("fac.lib.desc"),
      icon: BookOpen,
      details: ["10,000+ Book volumes", "Weekly library reading hours", "Subscription digital reference tools"]
    },
    {
      title: t("fac.science.title"),
      description: t("fac.science.desc") + " Featuring modern apparatus to facilitate hand-on experimentations.",
      icon: Compass,
      details: ["Dedicated experiment tables", "CBSE compliant safety setups", "Physics, Chemistry & Biology apparatus"]
    },
    {
      title: t("fac.comp.title"),
      description: t("fac.comp.desc") + " Students learn basic computer applications, digital painting, HTML coding, and Python programming structures.",
      icon: Monitor,
      details: ["Individual workstation configs", "Scratch & Python coding setups", "Hands-on experience with AI tools"]
    },
    {
      title: t("fac.sports.title"),
      description: t("fac.sports.desc") + " We train students to excel in state-level zonal tournaments for sports like Kabaddi and Kho-Kho.",
      icon: Trophy,
      details: ["Basketball court setup", "Kabaddi & Kho-Kho training zones", "Zonal championship coaching setups"]
    },
    {
      title: t("fac.smart.title"),
      description: t("fac.smart.desc"),
      icon: Volume2,
      details: ["HD Interactive Smart Boards", "Audio-visual learning libraries", "Ergonomically designed desks"]
    },
    {
      title: t("fac.trans.title"),
      description: t("fac.trans.desc") + " We operate a fleet of modern, GPS-tracked school buses covering key residential hubs in Madanapalle.",
      icon: Bus,
      details: ["Real-time GPS tracking status", "First-aid & speed limiter checks", "Trained helpers and supervisors"]
    }
  ];

  return (
    <div className="relative w-full bg-light-bg pb-20">
      {/* Header Banner */}
      <section className="relative bg-dark-text text-white py-16 sm:py-24 overflow-hidden border-b-4 border-campus-green">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/building.png"
            alt="Facilities Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-campus-green bg-white/10 px-4 py-1 rounded-full border border-white/10">
            {t("nav.facilities")}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{t("fac.badge")}</h1>
          <p className="text-sm sm:text-base text-white/75 max-w-2xl mx-auto">
            {t("fac.title")}
          </p>
        </div>
      </section>

      {/* Facilities Grid list */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {facilityItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <AnimatedSection
                key={idx}
                delay={idx * 0.08}
                className="bg-white border border-primary-cream p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary-cream text-deep-green rounded-2xl flex items-center justify-center shrink-0">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-dark-text">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-dark-text/65 leading-relaxed">{item.description}</p>
                </div>
                
                <div className="border-t border-primary-cream pt-6 mt-6 space-y-2">
                  <span className="block text-xs font-extrabold uppercase tracking-wider text-dark-text/45">Key Features:</span>
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-dark-text/80">
                      <CheckCircle2 size={14} className="text-campus-green shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Safety & security detail */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="bg-white border border-primary-cream rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-extrabold text-xl sm:text-2xl text-dark-text flex items-center gap-2">
              <ShieldCheck className="text-campus-green" />
              Comprehensive Campus Safety & Security
            </h3>
            <p className="text-xs sm:text-sm text-dark-text/65 leading-relaxed">
              Student safety is our highest operational priority. The entire campus is monitored by high-definition CCTV security cameras with real-time logs kept at the security desk. Professional security guards protect all entrance gates 24/7, and strict visitor checks are implemented. Special self-defense classes for girls are conducted regularly to build confidence and strength.
            </p>
          </div>
          <div className="bg-primary-cream/45 border border-primary-cream p-6 rounded-2xl space-y-3">
            <h4 className="font-extrabold text-sm text-dark-text uppercase tracking-wider">Safety Protocols:</h4>
            {[
              "CCTV cameras covering all corridors",
              "Mandatory visitor log registry",
              "Self-Defense classes conducted termly",
              "Fully stocked medical first-aid room"
            ].map((safety, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-dark-text/85">
                <CheckCircle2 size={14} className="text-campus-green shrink-0" />
                <span>{safety}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
