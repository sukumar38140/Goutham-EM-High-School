import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  ArrowRight,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Users,
  Compass,
  FileText,
  Clock
} from "lucide-react";
import { prisma } from "@/lib/db";
import CounterSection from "@/components/CounterSection";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import HomeGallery from "@/components/HomeGallery";
import ContactForm from "@/components/ContactForm";
import AnimatedSection from "@/components/AnimatedSection";
import { translations, translateDbField } from "@/lib/translations";
import { News, Event as PrismaEvent, GalleryItem } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "en";
  const t = (key: string) => translations[lang]?.[key] || translations["en"]?.[key] || key;

  // Fetch dynamic database content for the home page safely with graceful degradation
  let newsItems: News[] = [];
  let upcomingEvents: PrismaEvent[] = [];
  let galleryItems: GalleryItem[] = [];

  try {
    newsItems = await prisma.news.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 3
    });

    upcomingEvents = await prisma.event.findMany({
      where: { status: "UPCOMING" },
      orderBy: { date: "asc" },
      take: 3
    });

    galleryItems = await prisma.galleryItem.findMany({
      orderBy: { createdAt: "desc" },
      take: 6
    });
  } catch (error) {
    console.error("Failed to fetch homepage database content:", error);
  }

  // --- RESILIENT FALLBACK CONTENT IN CASE DATABASE IS UNREACHABLE ---
  const defaultNews: News[] = [
    {
      id: "fallback-n1",
      title: "Admissions Open for Academic Year 2026-27",
      summary: "Applications are now open for Nursery to Class X. Schedule a campus tour today.",
      content: "",
      imageUrl: "/images/building.png",
      isFeatured: true,
      status: "PUBLISHED",
      publishedAt: new Date("2026-06-01"),
      createdAt: new Date()
    },
    {
      id: "fallback-n2",
      title: "100% Success in CBSE Board Examinations",
      summary: "Goutham E.M High School achieves stellar academic results with all students passing in high distinction.",
      content: "",
      imageUrl: "/images/building.png",
      isFeatured: false,
      status: "PUBLISHED",
      publishedAt: new Date("2026-05-25"),
      createdAt: new Date()
    }
  ];

  const defaultEvents: PrismaEvent[] = [
    {
      id: "fallback-e1",
      title: "Annual Science & Tech Fair",
      description: "Interact with student-designed smart city models and AI tools projects.",
      date: "2026-07-15",
      location: "Main School Assembly Hall",
      registrationCount: 154,
      status: "UPCOMING",
      createdAt: new Date()
    },
    {
      id: "fallback-e2",
      title: "Parent-Teacher Consultations",
      description: "Discuss individual student progress, behavioral growth, and special focus on slow learners.",
      date: "2026-06-28",
      location: "Respective Classrooms",
      registrationCount: 320,
      status: "UPCOMING",
      createdAt: new Date()
    }
  ];

  const defaultGallery: GalleryItem[] = [
    { id: "fallback-g1", title: "School Campus Building", category: "CAMPUS", imageUrl: "/images/building.png", createdAt: new Date() },
    { id: "fallback-g2", title: "Smart Science Laboratory", category: "LABS", imageUrl: "/images/building.png", createdAt: new Date() },
    { id: "fallback-g3", title: "Computer Classes Setup", category: "LABS", imageUrl: "/images/building.png", createdAt: new Date() }
  ];

  const displayNews = newsItems.length > 0 ? newsItems : defaultNews;
  const displayEvents = upcomingEvents.length > 0 ? upcomingEvents : defaultEvents;
  const displayGallery = galleryItems.length > 0 ? galleryItems : defaultGallery;

  // Why Choose Us list data mapped to translation keys
  const whyChooseUsItems = [
    {
      title: t("why.smartclass.title"),
      desc: t("why.smartclass.desc"),
      icon: BookOpen
    },
    {
      title: t("why.faculty.title"),
      desc: t("why.faculty.desc"),
      icon: Users
    },
    {
      title: t("why.labs.title"),
      desc: t("why.labs.desc"),
      icon: Compass
    },
    {
      title: t("why.sports.title"),
      desc: t("why.sports.desc"),
      icon: Award
    },
    {
      title: t("why.dev.title2"),
      desc: t("why.dev.desc"),
      icon: ShieldCheck
    },
    {
      title: t("why.ai.title"),
      desc: t("why.ai.desc"),
      icon: Sparkles
    },
    {
      title: t("why.experts.title"),
      desc: t("why.experts.desc"),
      icon: CheckCircle2
    },
    {
      title: t("why.academics.title"),
      desc: t("why.academics.desc"),
      icon: Bookmark
    }
  ];

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-primary-cream/20">
        {/* Desktop Image */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-desktop.png"
            alt={`${t("school.name")} Desktop Hero`}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-text/90 via-dark-text/60 to-transparent" />
        </div>

        {/* Mobile Image */}
        <div className="block md:hidden absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-mobile.png"
            alt={`${t("school.name")} Mobile Hero`}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-text/95 via-dark-text/75 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white w-full">
          <div className="max-w-2xl space-y-6 md:space-y-8">
            <span className="inline-flex items-center gap-2 bg-campus-green/90 text-white font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md animate-pulse">
              <Sparkles size={14} /> {t("hero.badge")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {t("school.name")}
              <span className="block text-xl sm:text-2xl text-campus-green font-bold tracking-wide mt-2">
                {t("school.tagline")}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 font-medium max-w-xl">
              {t("hero.desc")}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/admissions"
                className="flex items-center gap-2 bg-campus-green hover:bg-deep-green text-white font-extrabold px-8 py-4 rounded-full shadow-lg transition-transform transform hover:-translate-y-0.5"
              >
                {t("hero.btn.apply")}
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-extrabold px-8 py-4 rounded-full shadow-md transition-colors"
              >
                {t("hero.btn.visit")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="relative z-10 -mt-16 sm:-mt-24 mb-10">
        <CounterSection />
      </section>

      {/* 3. ABOUT SCHOOL SECTION */}
      <section className="py-20 bg-white overflow-hidden" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              {t("about.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              {t("about.title")}
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              {t("about.desc")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image / Card side */}
            <AnimatedSection direction="right" className="relative h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-primary-cream">
              <Image
                src="/images/building.png"
                alt={`${t("school.name")} Building`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-dark-text/25" />
            </AnimatedSection>

            {/* Content side */}
            <AnimatedSection direction="left" className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-primary-cream/45 p-6 rounded-2xl border border-primary-cream">
                  <h3 className="font-extrabold text-lg text-dark-text mb-2">{t("about.mission.title")}</h3>
                  <p className="text-xs sm:text-sm text-dark-text/70 leading-relaxed">
                    {t("about.mission.desc")}
                  </p>
                </div>
                <div className="bg-primary-cream/45 p-6 rounded-2xl border border-primary-cream">
                  <h3 className="font-extrabold text-lg text-dark-text mb-2">{t("about.vision.title")}</h3>
                  <p className="text-xs sm:text-sm text-dark-text/70 leading-relaxed">
                    {t("about.vision.desc")}
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-campus-green pl-6 py-2">
                <h4 className="font-extrabold text-base sm:text-lg text-dark-text italic mb-1">
                  &quot;{t("principal.quote")}&quot;
                </h4>
                <p className="text-xs font-bold text-deep-green uppercase tracking-wide">
                  — {t("principal.name")}, {t("about.message")}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-deep-green font-bold text-sm hover:gap-3 transition-all"
                >
                  {t("about.readmore")}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="py-20 bg-light-bg overflow-hidden" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              {t("why.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              {t("why.title")}
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              {t("why.desc")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUsItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <AnimatedSection
                  key={idx}
                  delay={idx * 0.08}
                  className="bg-white border border-primary-cream/60 p-6 rounded-2xl shadow-sm card-hover flex flex-col"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-cream text-deep-green flex items-center justify-center mb-4 shrink-0 transition-colors duration-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-extrabold text-base text-dark-text mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-dark-text/60 leading-relaxed flex-grow">{item.desc}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. ACADEMIC PROGRAMS SECTION */}
      <section className="py-20 bg-white overflow-hidden" id="academics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              {t("acad.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              {t("acad.title")}
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              {t("acad.desc")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                level: t("acad.pre.title"),
                grades: t("acad.pre.grades"),
                desc: t("acad.pre.desc"),
                focus: [t("why.academics.title"), "Phonics & Numbers", "Motor Skills", "Arts & Fun Activities"]
              },
              {
                level: t("acad.pri.title"),
                grades: t("acad.pri.grades"),
                desc: t("acad.pri.desc"),
                focus: ["Critical Thinking", "Computer Classes", "Science Experiments", "AI Tools Awareness"]
              },
              {
                level: t("acad.sec.title"),
                grades: t("acad.sec.grades"),
                desc: t("acad.sec.desc"),
                focus: ["Board Exam Prep", "Hands-on AI Experience", "Self Defence for Girls", "Sports Trophies Preparation"]
              }
            ].map((program, idx) => (
              <AnimatedSection
                key={idx}
                delay={idx * 0.1}
                className="bg-light-bg border border-primary-cream/80 p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="text-xs font-bold text-deep-green uppercase tracking-wider mb-2">
                    {program.grades}
                  </div>
                  <h3 className="font-extrabold text-xl text-dark-text mb-3">
                    {program.level}
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-text/65 leading-relaxed mb-6">
                    {program.desc}
                  </p>
                  <div className="space-y-2 border-t border-primary-cream pt-5 mb-6">
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-dark-text/40 mb-1.5">
                      {t("acad.key")}
                    </span>
                    {program.focus.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-dark-text/80">
                        <CheckCircle2 size={13} className="text-campus-green shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  href="/academics"
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-campus-green border border-primary-cream hover:border-campus-green text-dark-text hover:text-white font-extrabold text-xs sm:text-sm py-3 rounded-xl transition-all"
                >
                  {t("acad.explore")}
                  <ArrowRight size={12} />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CAMPUS FACILITIES SECTION */}
      <section className="py-20 bg-light-bg overflow-hidden" id="facilities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              {t("fac.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              {t("fac.title")}
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              {t("fac.desc")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t("fac.lib.title"), desc: t("fac.lib.desc") },
              { title: t("fac.science.title"), desc: t("fac.science.desc") },
              { title: t("fac.comp.title"), desc: t("fac.comp.desc") },
              { title: t("fac.sports.title"), desc: t("fac.sports.desc") },
              { title: t("fac.smart.title"), desc: t("fac.smart.desc") },
              { title: t("fac.trans.title"), desc: t("fac.trans.desc") }
            ].map((facility, idx) => (
              <AnimatedSection
                key={idx}
                delay={idx * 0.08}
                className="bg-white border border-primary-cream/60 p-6 rounded-2xl shadow-sm flex flex-col justify-between card-hover"
              >
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-dark-text mb-1.5">
                    {facility.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-text/60 leading-relaxed">
                    {facility.desc}
                  </p>
                </div>
                <div className="border-t border-primary-cream/50 pt-4 mt-6">
                  <Link href="/facilities" className="text-xs font-bold text-deep-green hover:underline">
                    {t("btn.viewdetails")}
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ADMISSIONS SECTION */}
      <section className="py-20 bg-white overflow-hidden" id="admissions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="bg-primary-cream/40 border-2 border-primary-cream rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-white border border-primary-cream px-4 py-1.5 rounded-full">
                {t("adm.badge")}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark-text tracking-tight">
                {t("adm.title")}
              </h2>
              <p className="text-xs sm:text-sm text-dark-text/70 leading-relaxed">
                {t("adm.desc")}
              </p>

              <div className="space-y-3 border-t border-primary-cream pt-6">
                <h4 className="font-extrabold text-sm text-dark-text uppercase tracking-wider">{t("adm.checklist.title")}</h4>
                {[
                  "Birth Certificate",
                  "Previous School Transfer Certificate (TC)",
                  "Recent Passport-size Photos",
                  "Academic Report Card / Marksheets"
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-dark-text/80">
                    <CheckCircle2 size={15} className="text-campus-green" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-primary-cream/80 p-6 sm:p-8 rounded-2xl shadow-md space-y-6">
              <h3 className="font-extrabold text-lg text-dark-text">{t("btn.applynow")}</h3>
              <p className="text-xs sm:text-sm text-dark-text/60 leading-relaxed">
                Take the first step towards academic and personal excellence. You can apply directly through our secure admissions form, or download the brochure for deep course insights.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/admissions"
                  className="w-full flex items-center justify-center gap-2 bg-campus-green hover:bg-deep-green text-white font-extrabold py-3.5 rounded-xl shadow-sm transition-colors text-sm"
                >
                  <GraduationCap size={18} />
                  {t("adm.btn.apply")}
                </Link>
                <Link
                  href="/admissions"
                  className="w-full flex items-center justify-center gap-2 bg-light-bg border border-primary-cream hover:bg-primary-cream/50 text-dark-text font-extrabold py-3.5 rounded-xl transition-colors text-sm"
                >
                  <FileText size={18} className="text-deep-green" />
                  {t("adm.btn.guide")}
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 8. ACHIEVEMENTS SECTION */}
      <section className="py-20 bg-light-bg overflow-hidden" id="achievements">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              Achievements
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              Proud of Our Accomplishments
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              A quick review of Goutham E.M High School&apos;s top academic awards, sports championship trophies, and community recognition.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Every Year Won Cup on Zonals", desc: "Consistently winning zonal cups in Kabaddi and Kho-Kho school championships." },
              { title: t("stats.pass"), desc: "Outstanding record of 100% pass percentages in Class 10 (SSC) board examinations." },
              { title: "AI & Technology Innovator", desc: "First prize at regional exhibition for projects highlighting AI tools and trends." },
              { title: t("stats.marks"), desc: "Over 90% of our students score top marks in regular academic tests and exams." }
            ].map((ach, idx) => (
              <AnimatedSection
                key={idx}
                delay={idx * 0.08}
                className="bg-white border border-primary-cream/60 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center card-hover"
              >
                <div className="w-11 h-11 rounded-full bg-primary-cream text-deep-green flex items-center justify-center mb-3">
                  <Award size={20} />
                </div>
                <h3 className="font-extrabold text-base text-dark-text mb-1.5">{ach.title}</h3>
                <p className="text-xs sm:text-sm text-dark-text/60 leading-relaxed">{ach.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>



      {/* 10. GALLERY SECTION */}
      <section className="py-20 bg-light-bg overflow-hidden" id="gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <AnimatedSection className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              School Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              Campus Life in Focus
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              Browse through recent photos showcasing student assemblies, sports activities, laboratory experiments, and science fairs.
            </p>
          </AnimatedSection>

          <HomeGallery initialItems={displayGallery} />
        </div>
      </section>

      {/* 11. TESTIMONIALS SECTION */}
      <section className="py-20 bg-white overflow-hidden" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              What Our Parents & Alumni Say
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              Read real feedback sharing experiences with academics, safety, sports coaching, and core value grooming.
            </p>
          </AnimatedSection>

          <TestimonialCarousel />
        </div>
      </section>

      {/* 12. NEWS & EVENTS SECTION */}
      <section className="py-20 bg-light-bg overflow-hidden" id="news-events">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* News block */}
            <div className="lg:col-span-2 space-y-8">
              <AnimatedSection className="flex items-center justify-between">
                <h2 className="font-extrabold text-2xl sm:text-3xl text-dark-text tracking-tight">Latest Announcements</h2>
              </AnimatedSection>

              <div className="space-y-6">
                {displayNews.map((item, idx) => {
                  const localizedTitle = translateDbField(item.title, lang);
                  const localizedSummary = translateDbField(item.summary, lang);
                  
                  return (
                    <AnimatedSection
                      key={item.id}
                      delay={idx * 0.08}
                      className="bg-white border border-primary-cream/60 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-6 card-hover"
                    >
                      {item.imageUrl && (
                        <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden shrink-0 border border-primary-cream bg-white">
                          <Image
                            src={item.imageUrl}
                            alt={localizedTitle}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="space-y-2 flex-grow flex flex-col justify-center">
                        <span className="inline-flex items-center gap-1.5 text-xs text-deep-green font-bold">
                          <Clock size={12} />
                          {new Date(item.publishedAt).toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}
                        </span>
                        <h3 className="font-extrabold text-lg text-dark-text hover:text-deep-green transition-colors">
                          {localizedTitle}
                        </h3>
                        <p className="text-xs sm:text-sm text-dark-text/60 leading-relaxed">
                          {localizedSummary}
                        </p>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>

            {/* Events block */}
            <div className="space-y-8">
              <AnimatedSection>
                <h2 className="font-extrabold text-2xl sm:text-3xl text-dark-text tracking-tight">Upcoming Events</h2>
              </AnimatedSection>

              <div className="space-y-4">
                {displayEvents.map((event, idx) => {
                  const eventDate = new Date(event.date);
                  const day = eventDate.getDate();
                  const month = eventDate.toLocaleString(lang === "te" ? "te-IN" : "en-IN", { month: "short" });
                  const localizedTitle = translateDbField(event.title, lang);
                  const localizedDesc = translateDbField(event.description, lang);
                  
                  return (
                    <AnimatedSection
                      key={event.id}
                      delay={idx * 0.08}
                      className="bg-white border border-primary-cream/60 p-5 rounded-2xl shadow-sm flex gap-4 card-hover items-center"
                    >
                      <div className="w-14 h-14 bg-primary-cream rounded-xl text-deep-green flex flex-col items-center justify-center shrink-0 border border-primary-cream">
                        <span className="text-lg font-black leading-none">{day}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">{month}</span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-extrabold text-sm sm:text-base text-dark-text line-clamp-1">
                          {localizedTitle}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-dark-text/55">
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {event.location}
                          </span>
                        </div>
                        <p className="text-xs text-dark-text/60 line-clamp-1">
                          {localizedDesc}
                        </p>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. CONTACT & LOCATION SECTION */}
      <section className="py-20 bg-white overflow-hidden" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact details and map */}
            <AnimatedSection direction="right" className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
                  {t("contact.badge")}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
                  {t("contact.title")}
                </h2>
                <p className="text-dark-text/60 text-sm sm:text-base">
                  {t("contact.desc")}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-cream text-deep-green flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="text-sm">
                    <h4 className="font-extrabold text-dark-text mb-1">{t("contact.address.title")}</h4>
                    <p className="text-dark-text/65 leading-relaxed text-xs sm:text-sm">
                      {t("contact.address.desc")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-cream text-deep-green flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="text-sm">
                    <h4 className="font-extrabold text-dark-text mb-1">{t("contact.phone.title")}</h4>
                    <a href={`tel:${t("contact.phone.desc").split(" ")[0]}`} className="block text-dark-text/65 hover:text-deep-green font-semibold">
                      {t("contact.phone.desc")}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-cream text-deep-green flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="text-sm">
                    <h4 className="font-extrabold text-dark-text mb-1">{t("contact.email.title")}</h4>
                    <a href={`mailto:${t("contact.email.desc")}`} className="block text-dark-text/65 hover:text-deep-green font-semibold">
                      {t("contact.email.desc")}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-cream text-deep-green flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div className="text-sm">
                    <h4 className="font-extrabold text-dark-text mb-1">{t("contact.timing.title")}</h4>
                    <p className="text-dark-text/65 text-xs sm:text-sm">
                      {t("contact.timing.desc")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map embed simulation */}
              <div className="relative h-64 sm:h-80 w-full bg-primary-cream rounded-3xl overflow-hidden border border-primary-cream/80 shadow-md">
                <div className="absolute inset-0 bg-blue-50/50 flex flex-col items-center justify-center p-6 text-center">
                  <MapPin size={36} className="text-red-500 fill-current animate-bounce mb-2" />
                  <h4 className="font-extrabold text-dark-text mb-1">Goutham E.M High School Location Map</h4>
                  <p className="text-xs text-dark-text/60 max-w-sm mb-4">Located at IIT Talent School, Neerugattuvari Palle, Madanapalle.</p>
                  <a
                    href="https://maps.google.com/?q=Goutham+EM+High+School+Madanapalle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-campus-green border border-primary-cream text-dark-text hover:text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-sm transition-all"
                  >
                    {t("btn.directions")}
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection direction="left" className="w-full">
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
