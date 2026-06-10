"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap, ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.academics"), href: "/academics" },
    { name: t("nav.admissions"), href: "/admissions" },
    { name: t("nav.facilities"), href: "/facilities" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  // Monitor scroll behavior to toggle background transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-md py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 bg-white rounded-full p-1 overflow-hidden shadow-inner border border-primary-cream/80 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Goutham E.M High School Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base md:text-lg tracking-tight text-dark-text group-hover:text-deep-green transition-colors">
                {t("school.name")}
              </span>
              <span className="text-[9px] font-bold text-deep-green uppercase tracking-wide -mt-0.5 max-w-[200px] sm:max-w-none truncate">
                {t("school.tagline")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-semibold text-xs lg:text-sm tracking-wide transition-colors hover:text-deep-green py-2 ${
                    isActive ? "text-deep-green font-bold" : "text-dark-text/80"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-campus-green rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA, Language Switcher & Mobile Hamburger */}
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            <Link
              href="/admissions"
              className="hidden sm:flex items-center gap-1.5 bg-campus-green text-white hover:bg-deep-green font-bold text-xs lg:text-sm px-4 lg:px-5 py-2 lg:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <GraduationCap size={16} />
              {t("nav.apply")}
              <ArrowRight size={12} />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg md:hidden text-dark-text hover:bg-primary-cream/50 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden glass border-t border-primary-cream animate-fadeIn">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-campus-green text-white"
                      : "text-dark-text hover:bg-primary-cream/50 hover:text-deep-green"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Language Switcher container */}
            <div className="px-4 py-3 border-t border-primary-cream/40 flex items-center justify-between">
              <span className="text-xs font-bold text-dark-text/40">Select Language:</span>
              <LanguageSwitcher />
            </div>

            <div className="pt-2 px-4 sm:hidden">
              <Link
                href="/admissions"
                className="flex items-center justify-center gap-2 w-full bg-campus-green text-white hover:bg-deep-green font-bold py-2.5 rounded-xl shadow-md"
              >
                <GraduationCap size={16} />
                {t("nav.apply")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
