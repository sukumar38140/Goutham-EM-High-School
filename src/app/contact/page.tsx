import Image from "next/image";
import { cookies } from "next/headers";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import AnimatedSection from "@/components/AnimatedSection";
import { translations } from "@/lib/translations";

export default async function ContactPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "en";
  const t = (key: string) => translations[lang]?.[key] || translations["en"]?.[key] || key;

  return (
    <div className="relative w-full bg-light-bg pb-20">
      {/* Header Banner */}
      <section className="relative bg-dark-text text-white py-16 sm:py-24 overflow-hidden border-b-4 border-campus-green">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero-desktop.png"
            alt="Contact Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-campus-green bg-white/10 px-4 py-1 rounded-full border border-white/10">
            {t("nav.contact")}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{t("contact.title")}</h1>
          <p className="text-sm sm:text-base text-white/75 max-w-2xl mx-auto">
            Get in touch with Goutham E.M High School&apos;s administrative offices, admissions desk, or principal.
          </p>
        </div>
      </section>

      {/* Main Grid Contact details + Form */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details (5 cols) */}
          <AnimatedSection direction="right" className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark-text tracking-tight">
                Establish Connection
              </h2>
              <p className="text-sm text-dark-text/60 leading-relaxed">
                Whether you have queries regarding age eligibility, school bus routes, fees, or want to schedule interactions with our principal N.Lakshmi Narayana, feel free to drop a message or call.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-cream text-deep-green flex items-center justify-center shrink-0 border border-primary-cream">
                  <MapPin size={22} />
                </div>
                <div className="text-sm">
                  <h4 className="font-extrabold text-dark-text mb-1">{t("contact.address.title")}</h4>
                  <p className="text-dark-text/65 leading-relaxed text-xs sm:text-sm">
                    {t("contact.address.desc")}
                  </p>
                </div>
              </div>

              {/* Call */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-cream text-deep-green flex items-center justify-center shrink-0 border border-primary-cream">
                  <Phone size={22} />
                </div>
                <div className="text-sm">
                  <h4 className="font-extrabold text-dark-text mb-1">{t("contact.phone.title")}</h4>
                  <a href={`tel:${t("contact.phone.desc").split(" ")[0]}`} className="block text-dark-text/65 hover:text-deep-green font-semibold">
                    {t("contact.phone.desc")}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-cream text-deep-green flex items-center justify-center shrink-0 border border-primary-cream">
                  <Mail size={22} />
                </div>
                <div className="text-sm">
                  <h4 className="font-extrabold text-dark-text mb-1">{t("contact.email.title")}</h4>
                  <a href={`mailto:${t("contact.email.desc")}`} className="block text-dark-text/65 hover:text-deep-green font-semibold">
                    {t("contact.email.desc")}
                  </a>
                </div>
              </div>

              {/* Timing */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-cream text-deep-green flex items-center justify-center shrink-0 border border-primary-cream">
                  <Clock size={22} />
                </div>
                <div className="text-sm">
                  <h4 className="font-extrabold text-dark-text mb-1">{t("contact.timing.title")}</h4>
                  <p className="text-dark-text/65 mb-1">
                    {t("contact.timing.desc")}
                  </p>
                  <p className="text-xs text-red-500 font-bold uppercase tracking-wider">
                    Closed on Sundays & Public Holidays
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form (7 cols) */}
          <AnimatedSection direction="left" className="lg:col-span-7">
            <ContactForm />
          </AnimatedSection>

        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="relative h-96 w-full bg-primary-cream rounded-3xl overflow-hidden border border-primary-cream shadow-lg">
          <div className="absolute inset-0 bg-blue-50/40 flex flex-col items-center justify-center p-6 text-center">
            <MapPin size={48} className="text-red-500 fill-current animate-bounce mb-3" />
            <h3 className="font-black text-xl text-dark-text mb-1">Visit Goutham E.M High School</h3>
            <p className="text-sm text-dark-text/60 max-w-md mb-6">
              Our campus is located at IIT Talent School, Neerugattuvari Palle, Madanapalle, Andhra Pradesh.
            </p>
            <a
              href="https://maps.google.com/?q=Goutham+EM+High+School+Madanapalle"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-campus-green hover:bg-deep-green text-white font-extrabold text-sm px-6 py-3.5 rounded-full shadow-md transition-all"
            >
              {t("btn.directions")}
            </a>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
