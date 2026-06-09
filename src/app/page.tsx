import Image from "next/image";
import Link from "next/link";
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
import { News, Event as PrismaEvent, GalleryItem, Faculty } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch dynamic database content for the home page safely with graceful degradation
  let newsItems: News[] = [];
  let upcomingEvents: PrismaEvent[] = [];
  let galleryItems: GalleryItem[] = [];
  let facultyMembers: Faculty[] = [];

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

    facultyMembers = await prisma.faculty.findMany({
      orderBy: { displayOrder: "asc" },
      take: 4
    });
  } catch (error) {
    console.error("Failed to fetch homepage database content:", error);
  }

  return (
    <div className="relative w-full">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-primary-cream/20">
        {/* Desktop Image */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-desktop.png"
            alt="Goutham School Desktop Hero"
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
            alt="Goutham School Mobile Hero"
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
              <Sparkles size={14} /> Admissions Open: 2026–2027
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Shaping Future Leaders Through <span className="text-campus-green">Excellence</span> in Education
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 font-medium max-w-xl">
              Establishing trust with parents, nurturing student potential, and fostering academic excellence for over 25 years.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/admissions"
                className="flex items-center gap-2 bg-campus-green hover:bg-deep-green text-white font-extrabold px-8 py-4 rounded-full shadow-lg transition-transform transform hover:-translate-y-0.5"
              >
                Apply Online Now
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-extrabold px-8 py-4 rounded-full shadow-md transition-colors"
              >
                Schedule Campus Visit
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
      <section className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              About Our School
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              Legacy of Holistic Education
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              Goutham School is dedicated to providing high-quality, comprehensive education that nurtures the intellectual, moral, and physical growth of every child.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image / Card side */}
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-primary-cream">
              <Image
                src="/images/building.jpg"
                alt="Goutham School Building"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-dark-text/25" />
            </div>

            {/* Content side */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-primary-cream/45 p-6 rounded-2xl border border-primary-cream">
                  <h3 className="font-extrabold text-lg text-dark-text mb-2">Our Mission</h3>
                  <p className="text-xs sm:text-sm text-dark-text/70 leading-relaxed">
                    To deliver a challenging, structured curriculum that encourages critical thinking, self-discipline, and a lifelong passion for knowledge.
                  </p>
                </div>
                <div className="bg-primary-cream/45 p-6 rounded-2xl border border-primary-cream">
                  <h3 className="font-extrabold text-lg text-dark-text mb-2">Our Vision</h3>
                  <p className="text-xs sm:text-sm text-dark-text/70 leading-relaxed">
                    To be a leading center of educational excellence, graduating confident, ethical, and socially responsible citizens prepared for the global stage.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-campus-green pl-6 py-2">
                <h4 className="font-extrabold text-lg text-dark-text italic mb-1">
                  &quot;Education is the most powerful weapon which you can use to change the world.&quot;
                </h4>
                <p className="text-xs font-bold text-deep-green uppercase tracking-wide">
                  — Dr. Shanthi Priya, Principal Message
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-deep-green font-bold text-sm hover:gap-3 transition-all"
                >
                  Read More About Our History & Values
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="py-20 bg-light-bg" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              A Classroom Beyond Four Walls
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              Providing an environment engineered for academic success, creative learning, physical health, and emotional safety.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Smart Classrooms",
                desc: "Digitally-equipped learning environments featuring interactive audio-visual projectors.",
                icon: BookOpen
              },
              {
                title: "Experienced Faculty",
                desc: "Highly-qualified class mentors committed to nurturing individual student talents.",
                icon: Users
              },
              {
                title: "Science & Computer Labs",
                desc: "State-of-the-art laboratory facilities designed for hands-on scientific experimentation.",
                icon: Compass
              },
              {
                title: "Sports Programs",
                desc: "Comprehensive coaching setups for football, basketball, and athletic activities.",
                icon: Award
              },
              {
                title: "Student Development",
                desc: "Emphasis on debate clubs, cultural festivals, public speaking, and leadership seminars.",
                icon: Sparkles
              },
              {
                title: "Safety & Security",
                desc: "24/7 CCTV campus surveillance, trained guards, and strict visitor checks.",
                icon: ShieldCheck
              },
              {
                title: "Activity-Based Learning",
                desc: "Experiential teaching techniques that promote collaboration and problem-solving.",
                icon: CheckCircle2
              },
              {
                title: "Digital Ecosystem",
                desc: "Seamless parent portals, online admissions, and dynamic updates via notifications.",
                icon: Bookmark
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-primary-cream/60 p-6 rounded-2xl shadow-sm card-hover flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-cream text-deep-green flex items-center justify-center mb-5 shrink-0">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-extrabold text-base text-dark-text mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-dark-text/60 leading-relaxed flex-grow">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. ACADEMIC PROGRAMS SECTION */}
      <section className="py-20 bg-white" id="academics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              Academic Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              Curriculum Formed for Future Success
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              Providing structured CBSE academic courses from Early Years foundation to Senior Secondary graduation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                level: "Pre-Primary School",
                grades: "Nursery, LKG & UKG",
                desc: "Activity-based learning setup using play-way teaching philosophies to nurture natural curiosity, cognitive skills, and motor habits.",
                focus: ["Play-way Learning", "Phonics & Numbers", "Motor Skills", "Arts & Drawing"]
              },
              {
                level: "Primary & Middle School",
                grades: "Class I to Class VIII",
                desc: "Rigorous academic study focusing on language skills, mathematics, general science, social sciences, and computer education fundamentals.",
                focus: ["Critical Thinking", "Science Experiments", "Language Proficiency", "Coding Intro"]
              },
              {
                level: "Secondary & Senior Secondary",
                grades: "Class IX to Class XII",
                desc: "Comprehensive CBSE-aligned preparation for board exams, featuring advanced coursework in Science, Commerce, and Humanities streams.",
                focus: ["Board Exam Prep", "STEM Focus", "Career Counseling", "Lab Internships"]
              }
            ].map((program, idx) => (
              <div
                key={idx}
                className="bg-light-bg border border-primary-cream/80 p-8 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="text-xs font-bold text-deep-green uppercase tracking-wider mb-2">
                    {program.grades}
                  </div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-dark-text mb-4">
                    {program.level}
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-text/65 leading-relaxed mb-6">
                    {program.desc}
                  </p>
                  <div className="space-y-2 border-t border-primary-cream pt-6 mb-8">
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-dark-text/40 mb-2">
                      Key Highlights
                    </span>
                    {program.focus.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-dark-text/80">
                        <CheckCircle2 size={14} className="text-campus-green shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  href="/academics"
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-campus-green border border-primary-cream hover:border-campus-green text-dark-text hover:text-white font-extrabold text-sm py-3 rounded-xl transition-all"
                >
                  Explore Curriculum
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CAMPUS FACILITIES SECTION */}
      <section className="py-20 bg-light-bg" id="facilities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              Campus Facilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              Designed for Exploration & Play
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              Explore our state-of-the-art campus infrastructure built to facilitate intellectual exploration and physical development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Smart Library", desc: "Housing over 10,000 reference books, science journals, novels, and digital learning subscriptions." },
              { title: "Science Laboratory", desc: "Fully equipped physics, chemistry, and biology setups for experiential educational experiments." },
              { title: "Computer Laboratory", desc: "Featuring high-speed computers, coding tools, and basic AI training platforms." },
              { title: "Playground & Sports field", desc: "Spacious zones tailored for soccer drills, athletics tournaments, and basketball leagues." },
              { title: "Smart Classrooms", desc: "Digital screens and internet access in all senior school classrooms." },
              { title: "School Transportation", desc: "Fleet of GPS-enabled buses covering major residential sectors with trained conductors." }
            ].map((facility, idx) => (
              <div
                key={idx}
                className="bg-white border border-primary-cream/60 p-6 rounded-2xl shadow-sm flex flex-col justify-between card-hover"
              >
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-dark-text mb-2">
                    {facility.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-text/60 leading-relaxed">
                    {facility.desc}
                  </p>
                </div>
                <div className="border-t border-primary-cream/50 pt-4 mt-6">
                  <Link href="/facilities" className="text-xs font-bold text-deep-green hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ADMISSIONS SECTION */}
      <section className="py-20 bg-white" id="admissions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-cream/40 border-2 border-primary-cream rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-white border border-primary-cream px-4 py-1.5 rounded-full">
                Admission Portal
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
                Admission Open for Session 2026–27
              </h2>
              <p className="text-xs sm:text-sm text-dark-text/70 leading-relaxed">
                Start your child&apos;s journey with us. Our registration procedure is designed to be straightforward and completely accessible online. Review the required checklists, check age criteria, and submit applications today.
              </p>

              <div className="space-y-3 border-t border-primary-cream pt-6">
                <h4 className="font-extrabold text-sm text-dark-text uppercase tracking-wider">Required Checklist:</h4>
                {[
                  "Birth Certificate",
                  "Previous School Transfer Certificate (TC)",
                  "Recent Passport-size Photos",
                  "Academic Report Card / Marksheets"
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-dark-text/80">
                    <CheckCircle2 size={16} className="text-campus-green" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-primary-cream/80 p-6 sm:p-8 rounded-2xl shadow-md space-y-6">
              <h3 className="font-extrabold text-lg sm:text-xl text-dark-text">Join Goutham School</h3>
              <p className="text-xs sm:text-sm text-dark-text/60 leading-relaxed">
                Take the first step towards academic and personal excellence. You can apply directly through our secure admissions form, or download the brochure for deep course insights.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/admissions"
                  className="w-full flex items-center justify-center gap-2 bg-campus-green hover:bg-deep-green text-white font-extrabold py-3.5 rounded-xl shadow-sm transition-colors"
                >
                  <GraduationCap size={18} />
                  Apply Online (New Admission)
                </Link>
                <Link
                  href="/admissions"
                  className="w-full flex items-center justify-center gap-2 bg-light-bg border border-primary-cream hover:bg-primary-cream/50 text-dark-text font-extrabold py-3.5 rounded-xl transition-colors"
                >
                  <FileText size={18} className="text-deep-green" />
                  Admission Guidelines & Prospectus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ACHIEVEMENTS SECTION */}
      <section className="py-20 bg-light-bg" id="achievements">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              Achievements
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              Proud of Our Accomplishments
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              A quick review of Goutham School&apos;s top academic awards, sports championship trophies, and community recognition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "National Sports Trophy", desc: "First position in state-wide Inter-School Athletic championship 2025." },
              { title: "100% Board Results", desc: "Continuous streak of 100% pass percentages in CBSE class X and XII board papers." },
              { title: "Innovator Award", desc: "First prize at regional High School Science & Robotics Exhibition for smart trash systems." },
              { title: "Academic Excellence", desc: "Awarded 'Best Academic Curriculum and Mentor Team' by the State Education Panel." }
            ].map((ach, idx) => (
              <div
                key={idx}
                className="bg-white border border-primary-cream/60 p-6 rounded-2xl shadow-sm text-center flex flex-col items-center card-hover"
              >
                <div className="w-12 h-12 rounded-full bg-primary-cream text-deep-green flex items-center justify-center mb-4">
                  <Award size={22} />
                </div>
                <h3 className="font-extrabold text-base text-dark-text mb-2">{ach.title}</h3>
                <p className="text-xs sm:text-sm text-dark-text/60 leading-relaxed">{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FACULTY SECTION */}
      <section className="py-20 bg-white" id="faculty">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              Faculty Members
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              Our Leadership & Academic Mentors
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              Dedicated educators focused on nurturing young minds and establishing foundation stones for future leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {facultyMembers.map((member) => (
              <div
                key={member.id}
                className="bg-light-bg border border-primary-cream/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between card-hover text-center p-6"
              >
                <div>
                  <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md mb-4 bg-white">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-dark-text">{member.name}</h3>
                  <p className="text-xs text-deep-green font-bold uppercase tracking-wider mt-0.5">{member.designation}</p>
                  <p className="text-xs text-dark-text/50 mt-1 font-semibold">{member.department} Department</p>
                  <div className="border-t border-primary-cream mt-4 pt-4 text-left space-y-1.5 text-xs text-dark-text/65">
                    <p><strong>Qualification:</strong> {member.qualification}</p>
                    <p><strong>Experience:</strong> {member.experience}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. GALLERY SECTION */}
      <section className="py-20 bg-light-bg" id="gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              School Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              Campus Life in Focus
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              Browse through recent photos showcasing student assemblies, independence activities, laboratory experiments, and playground sports.
            </p>
          </div>

          <HomeGallery initialItems={galleryItems} />
        </div>
      </section>

      {/* 11. TESTIMONIALS SECTION */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
              What Our Parents & Alumni Say
            </h2>
            <p className="text-dark-text/60 text-sm sm:text-base">
              Read real feedback sharing experiences with academics, safety, sports coaching, and core value grooming.
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* 12. NEWS & EVENTS SECTION */}
      <section className="py-20 bg-light-bg" id="news-events">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* News block (2 cols on large screen) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold text-2xl sm:text-3xl text-dark-text tracking-tight">Latest Announcements</h2>
              </div>

              {newsItems.length === 0 ? (
                <div className="bg-white border border-primary-cream/80 p-8 rounded-2xl text-center text-dark-text/50">
                  No announcements published yet.
                </div>
              ) : (
                <div className="space-y-6">
                  {newsItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-primary-cream/60 p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-6 card-hover"
                    >
                      {item.imageUrl && (
                        <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden shrink-0 border border-primary-cream bg-white">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="space-y-2 flex-grow flex flex-col justify-center">
                        <span className="inline-flex items-center gap-1.5 text-xs text-deep-green font-bold">
                          <Clock size={12} />
                          {new Date(item.publishedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}
                        </span>
                        <h3 className="font-extrabold text-lg text-dark-text hover:text-deep-green transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-dark-text/60 leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Events block (1 col on large screen) */}
            <div className="space-y-8">
              <h2 className="font-extrabold text-2xl sm:text-3xl text-dark-text tracking-tight">Upcoming Events</h2>

              {upcomingEvents.length === 0 ? (
                <div className="bg-white border border-primary-cream/80 p-8 rounded-2xl text-center text-dark-text/50">
                  No upcoming activities scheduled.
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => {
                    const eventDate = new Date(event.date);
                    const day = eventDate.getDate();
                    const month = eventDate.toLocaleString("en-IN", { month: "short" });
                    
                    return (
                      <div
                        key={event.id}
                        className="bg-white border border-primary-cream/60 p-5 rounded-2xl shadow-sm flex gap-4 card-hover items-center"
                      >
                        <div className="w-14 h-14 bg-primary-cream rounded-xl text-deep-green flex flex-col items-center justify-center shrink-0 border border-primary-cream">
                          <span className="text-lg font-black leading-none">{day}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">{month}</span>
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-extrabold text-sm sm:text-base text-dark-text line-clamp-1">
                            {event.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-dark-text/55">
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {event.location}
                            </span>
                          </div>
                          <p className="text-xs text-dark-text/60 line-clamp-1">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 13. CONTACT & LOCATION SECTION */}
      <section className="py-20 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact details and map */}
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
                  Contact School
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-dark-text tracking-tight">
                  Reach Out to Us
                </h2>
                <p className="text-dark-text/60 text-sm sm:text-base">
                  Our front desk operations run Monday through Saturday from 08:30 AM to 03:30 PM.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-cream text-deep-green flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="text-sm">
                    <h4 className="font-extrabold text-dark-text mb-1">Campus Address</h4>
                    <p className="text-dark-text/65 leading-relaxed">
                      Goutham School Campus,<br />
                      12th Main Road, Sector 3,<br />
                      Bengaluru, KA 560034
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-cream text-deep-green flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="text-sm">
                    <h4 className="font-extrabold text-dark-text mb-1">Call Admissions</h4>
                    <a href="tel:+918012345678" className="block text-dark-text/65 hover:text-deep-green mb-1">
                      +91 (80) 1234-5678
                    </a>
                    <a href="tel:+918098765432" className="block text-dark-text/65 hover:text-deep-green">
                      +91 (80) 9876-5432
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-cream text-deep-green flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="text-sm">
                    <h4 className="font-extrabold text-dark-text mb-1">Send Email</h4>
                    <a href="mailto:info@gouthamschool.com" className="block text-dark-text/65 hover:text-deep-green mb-1">
                      info@gouthamschool.com
                    </a>
                    <a href="mailto:admissions@gouthamschool.com" className="block text-dark-text/65 hover:text-deep-green">
                      admissions@gouthamschool.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Map embed simulation */}
              <div className="relative h-64 sm:h-80 w-full bg-primary-cream rounded-3xl overflow-hidden border border-primary-cream/80 shadow-md">
                {/* Mock map UI for local development */}
                <div className="absolute inset-0 bg-blue-50/50 flex flex-col items-center justify-center p-6 text-center">
                  <MapPin size={40} className="text-red-500 fill-current animate-bounce mb-2" />
                  <h4 className="font-extrabold text-dark-text mb-1">Goutham School Location Map</h4>
                  <p className="text-xs text-dark-text/60 max-w-sm mb-4">Located near Sector 3 HSR layouts, accessible by bus and metro connectivity.</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-campus-green border border-primary-cream text-dark-text hover:text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-sm transition-all"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
