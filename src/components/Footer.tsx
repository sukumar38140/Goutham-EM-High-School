import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { Phone, Mail, MapPin, Award, ShieldCheck, Heart } from "lucide-react";
import { translations } from "@/lib/translations";

export default async function Footer() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "en";
  const t = (key: string) => translations[lang]?.[key] || translations["en"]?.[key] || key;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-text text-white/80 border-t-4 border-campus-green pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* School Info Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-9 h-9 bg-white rounded-full p-1 overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Goutham E.M High School Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-base text-white tracking-wider">
                {t("school.name")}
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              Empowering students through academic rigor, character building, and creative development. Establishing paths for future leaders for over 25 years.
            </p>
            <div className="flex items-center gap-2 pt-2 text-campus-green">
              <Award size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">CBSE Affiliated Institution</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="font-bold text-white text-base tracking-wider uppercase mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-campus-green">
              {t("nav.about")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-campus-green transition-colors">{t("nav.home")}</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-campus-green transition-colors">{t("nav.about")}</Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-campus-green transition-colors">{t("nav.academics")}</Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-campus-green transition-colors">{t("nav.admissions")}</Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-campus-green transition-colors">{t("nav.facilities")}</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-campus-green transition-colors">{t("nav.contact")}</Link>
              </li>
            </ul>
          </div>

          {/* Admissions Info & Policies */}
          <div>
            <h3 className="font-bold text-white text-base tracking-wider uppercase mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-campus-green">
              {t("nav.admissions")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/admissions" className="hover:text-campus-green transition-colors">Admission Process</Link>
              </li>
              <li>
                <Link href="/admissions#fees" className="hover:text-campus-green transition-colors">{t("adm.fee.title")}</Link>
              </li>
              <li>
                <Link href="/admissions#documents" className="hover:text-campus-green transition-colors">{t("adm.docs.title")}</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-campus-green transition-colors">Careers / Jobs</Link>
              </li>
              <li>
                <span className="hover:text-campus-green cursor-pointer transition-colors">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-campus-green cursor-pointer transition-colors">Terms of Service</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-bold text-white text-base tracking-wider uppercase mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-campus-green">
              {t("nav.contact")}
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin size={18} className="text-campus-green shrink-0 mt-0.5" />
                <span className="text-white/70 text-xs sm:text-sm">
                  {t("contact.address.desc")}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-campus-green shrink-0" />
                <a href={`tel:${t("contact.phone.desc").split(" ")[0]}`} className="hover:text-campus-green transition-colors text-white/70 font-semibold">
                  {t("contact.phone.desc")}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-campus-green shrink-0" />
                <a href={`mailto:${t("contact.email.desc")}`} className="hover:text-campus-green transition-colors text-white/70 font-semibold">
                  {t("contact.email.desc")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Base */}
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} {t("school.name")}. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/admin/login" className="hover:text-campus-green transition-colors flex items-center gap-1.5 font-semibold text-white/30 hover:text-white/70">
              <ShieldCheck size={14} />
              Admin Portal Login
            </Link>
            <span className="flex items-center gap-1">
              Developed with <Heart size={12} className="text-red-500 fill-current animate-pulse" /> for academic excellence
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
