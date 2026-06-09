import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  title: "Goutham School | Shaping Future Leaders Through Excellence",
  description: "Official website of Goutham School. Admissions open for Nursery to Class XI for the Academic Year 2026–27. Explore our campus infrastructure, experienced faculty, and academic programs.",
  keywords: ["Goutham School", "Admissions 2026-27", "CBSE Schools Bangalore", "Best High School Bangalore", "Holistic Education", "Smart Classrooms"],
  metadataBase: new URL("http://localhost:3000"), // Will be changed to production URL in deployment
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Goutham School | Shaping Future Leaders Through Excellence",
    description: "Admissions Open for Academic Year 2026–27. Explore our academic excellence and physical campus infrastructure.",
    url: "/",
    siteName: "Goutham School",
    images: [
      {
        url: "/images/hero-desktop.png",
        width: 1200,
        height: 630,
        alt: "Goutham School Campus",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goutham School | Shaping Future Leaders",
    description: "Admissions open for the Academic Year 2026-27. Apply online or schedule a campus visit.",
    images: ["/images/hero-desktop.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Schema Markup JSON-LD (Organization, EducationalOrganization, LocalBusiness)
  const schoolSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "http://localhost:3000/#organization",
        "name": "Goutham School",
        "url": "http://localhost:3000",
        "logo": "http://localhost:3000/images/logo.png",
        "image": "http://localhost:3000/images/hero-desktop.png",
        "description": "Goutham School is a premier educational institution providing excellence in academics, sports, and holistic development.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "12th Main Road, Sector 3",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "postalCode": "560034",
          "addressCountry": "IN"
        },
        "telephone": "+918012345678",
        "sameAs": [
          "https://www.facebook.com/gouthamschool",
          "https://www.instagram.com/gouthamschool",
          "https://www.youtube.com/gouthamschool"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "http://localhost:3000/#localbusiness",
        "name": "Goutham School Admissions Office",
        "image": "http://localhost:3000/images/hero-desktop.png",
        "telephone": "+918012345678",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "12th Main Road, Sector 3",
          "addressLocality": "Bengaluru",
          "addressRegion": "Karnataka",
          "postalCode": "560034",
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
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-light-bg text-dark-text">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
