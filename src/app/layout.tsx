import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Goutham E.M High School | IIT Talent School",
  description: "Official website of Goutham E.M High School. IIT Talent School, Neerugattuvari Palle, Madanapalle. Admissions open for Nursery to Class 10 (X) for the Academic Year 2026–27. Explore our computer classes, science labs, and sports coaching.",
  keywords: ["Goutham E.M High School", "IIT Talent School Madanapalle", "Admissions 2026-27", "Madanapalle High School", "Best School in Madanapalle", "Holistic Education", "Computer Labs", "Science Labs", "AI awareness school"],
  metadataBase: new URL("http://localhost:3000"), // Will be changed to production URL in deployment
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Goutham E.M High School | IIT Talent School",
    description: "Admissions Open for Academic Year 2026–27. Explore our academic excellence and technology-driven learning infrastructure.",
    url: "/",
    siteName: "Goutham E.M High School",
    images: [
      {
        url: "/images/hero-desktop.png",
        width: 1200,
        height: 630,
        alt: "Goutham E.M High School Campus",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goutham E.M High School | IIT Talent School",
    description: "Admissions open for the Academic Year 2026-27. Apply online now.",
    images: ["/images/hero-desktop.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "en";

  // Structured Schema Markup JSON-LD (Organization, EducationalOrganization, LocalBusiness)
  const schoolSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "http://localhost:3000/#organization",
        "name": "Goutham E.M High School",
        "url": "http://localhost:3000",
        "logo": "http://localhost:3000/images/logo.png",
        "image": "http://localhost:3000/images/hero-desktop.png",
        "description": "Goutham E.M High School is a premier educational institution providing excellence in academics, sports, and holistic development.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "IIT Talent School, Neerugattuvari Palle",
          "addressLocality": "Madanapalle",
          "addressRegion": "Andhra Pradesh",
          "postalCode": "517325",
          "addressCountry": "IN"
        },
        "telephone": "+919490923166",
        "sameAs": [
          "https://www.facebook.com/gouthamschool",
          "https://www.instagram.com/gouthamschool",
          "https://www.youtube.com/gouthamschool"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "http://localhost:3000/#localbusiness",
        "name": "Goutham E.M High School Admissions",
        "image": "http://localhost:3000/images/hero-desktop.png",
        "telephone": "+919490923166",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "IIT Talent School, Neerugattuvari Palle",
          "addressLocality": "Madanapalle",
          "addressRegion": "Andhra Pradesh",
          "postalCode": "517325",
          "addressCountry": "IN"
        },
        "priceRange": "$$",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:30",
          "closes": "15:30"
        }
      }
    ]
  };

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-light-bg text-dark-text">
        <LanguageProvider initialLang={lang}>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
