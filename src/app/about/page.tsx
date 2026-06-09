import Image from "next/image";
import Link from "next/link";
import { Award, Target, CalendarDays, Compass, Quote, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative w-full bg-light-bg pb-20">
      {/* Header Banner */}
      <section className="relative bg-dark-text text-white py-16 sm:py-24 overflow-hidden border-b-4 border-campus-green">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/building.png"
            alt="Campus Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-campus-green bg-white/10 px-4 py-1 rounded-full border border-white/10">
            About Our School
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Our Legacy & Values</h1>
          <p className="text-sm sm:text-base text-white/75 max-w-2xl mx-auto">
            Discover the mission, history, values, and leadership team behind Goutham School&apos;s 25-year history of academic excellence.
          </p>
        </div>
      </section>

      {/* History & Foundation */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-text tracking-tight">
              Founded on Trust & Academic Vision
            </h2>
            <p className="text-sm sm:text-base text-dark-text/75 leading-relaxed">
              Established in 2001, Goutham School began with a small cluster of classrooms and a bold dream: to provide a high-quality educational environment that prepares children for the complexities of the modern world. 
            </p>
            <p className="text-sm sm:text-base text-dark-text/75 leading-relaxed">
              Over the last quarter-century, we have expanded into a state-of-the-art campus housing thousands of students, modern computer labs, smart classrooms, and a diverse sports infrastructure. Yet, our core focus remains unchanged: establishing trust with families, treating every child as an individual, and maintaining academic integrity.
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-primary-cream pt-6">
              <div className="flex gap-3">
                <CalendarDays className="text-campus-green shrink-0" />
                <div className="text-sm">
                  <span className="font-extrabold text-dark-text block">2001</span>
                  <span className="text-xs text-dark-text/60">Foundation Year</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Award className="text-campus-green shrink-0" />
                <div className="text-sm">
                  <span className="font-extrabold text-dark-text block">100% CBSE Pass</span>
                  <span className="text-xs text-dark-text/60">Outstanding Record</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border-4 border-primary-cream shadow-xl bg-white">
            <Image
              src="/images/prayer.avif"
              alt="Students prayer at Goutham School"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="bg-primary-cream/45 border-y border-primary-cream/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Principal Picture */}
            <div className="text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl bg-white mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Principal Dr. Shanthi Priya"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <h3 className="font-extrabold text-lg sm:text-xl text-dark-text">Dr. Shanthi Priya</h3>
              <p className="text-xs text-deep-green font-bold uppercase tracking-wider mt-0.5">Principal & Administrator</p>
              <p className="text-xs text-dark-text/50 font-bold">22+ Years Educational Experience</p>
            </div>

            {/* Principal Quote */}
            <div className="lg:col-span-2 space-y-6">
              <div className="text-deep-green shrink-0">
                <Quote size={40} className="fill-current opacity-20" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-dark-text tracking-tight -mt-4">
                A Message to Our Parenting Partners
              </h2>
              <div className="text-sm sm:text-base text-dark-text/75 space-y-4 leading-relaxed">
                <p>
                  &quot;At Goutham School, we believe that education is not merely the acquisition of textbook knowledge; it is a holistic journey of discovering who you are. We view parents as active partners in this developmental process. Our teachers do not just teach; they mentor, guide, and protect.&quot;
                </p>
                <p>
                  &quot;We have integrated smart technology across our curriculum to prepare students for digital landscapes, while retaining deep roots in moral values, respect, and physical fitness. Whether your child is an aspiring scientist, a creative artist, or a professional athlete, we provide the platform for them to thrive.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-deep-green bg-primary-cream px-4 py-1.5 rounded-full">
            Our Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-text tracking-tight">
            The Values We Teach & Live By
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Academic Rigor",
              desc: "Encouraging a deep focus on conceptual clarity, scientific reasoning, and analytical writing.",
              icon: Target
            },
            {
              title: "Character Integrity",
              desc: "Fostering honesty, self-discipline, mutual respect, and ethical decision-making.",
              icon: ShieldCheck
            },
            {
              title: "Holistic Development",
              desc: "Promoting physical health, sportsmanship, artistic talents, and psychological well-being.",
              icon: Compass
            },
            {
              title: "Social Responsibility",
              desc: "Developing global citizenship, environmental awareness, and community service values.",
              icon: Award
            }
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-primary-cream/60 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-primary-cream text-deep-green rounded-xl flex items-center justify-center mb-4 shrink-0">
                  <Icon size={22} />
                </div>
                <h3 className="font-extrabold text-base text-dark-text mb-2">{val.title}</h3>
                <p className="text-xs sm:text-sm text-dark-text/65 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-campus-green text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Ready to Become a Part of Our Family?</h2>
          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
            Schedule a physical school campus tour to meet our Principal, explore class laboratory setups, and inspect our play areas.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/admissions"
              className="bg-white hover:bg-primary-cream text-dark-text font-extrabold text-sm px-6 py-3 rounded-full shadow-md transition-all"
            >
              Start Admission Process
            </Link>
            <Link
              href="/contact"
              className="bg-transparent hover:bg-white/10 border border-white/30 text-white font-extrabold text-sm px-6 py-3 rounded-full transition-all"
            >
              Contact Admissions Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
