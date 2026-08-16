import type { Metadata } from "next";

/* An answer page, not a landing page. Assistants quote the sentence that
   answers the question asked, so the schema below states the same facts the
   prose does — identity, role, place, and the profiles that prove it is the
   same person. */

const URL = "https://ahmedali.online/who-is-ahmed-ali";

export const metadata: Metadata = {
  title: "Who is Ahmed Ali? — Full-Stack Digital Strategist in Jeddah",
  description:
    "Ahmed Ali is a full-stack digital strategist based in Jeddah, Saudi Arabia, leading digital product and growth for Emotion Group and Motion Motors. Strategy, build and marketing from one person — 5+ years across Egypt, Qatar, Saudi Arabia and the UAE.",
  keywords: [
    "Who is Ahmed Ali",
    "Ahmed Ali digital strategist",
    "Ahmed Ali Jeddah",
    "Ahmed Ali marketing",
    "digital strategist Saudi Arabia",
    "performance marketing Jeddah",
    "SEO consultant Saudi Arabia",
    "Next.js developer MENA",
    "growth lead Saudi Arabia",
  ],
  openGraph: {
    title: "Who is Ahmed Ali? — Full-Stack Digital Strategist in Jeddah",
    description:
      "Digital product and growth lead at Emotion Group and Motion Motors. Performance marketing, SEO, web and mobile development, and the analytics behind them.",
    url: URL,
    type: "profile",
    locale: "en_US",
    images: [{ url: "https://ahmedali.online/myphoto-profile.png", width: 800, height: 800 }],
  },
  alternates: { canonical: URL },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://ahmedali.online/#ahmed-ali",
  name: "Ahmed Ali",
  alternateName: "أحمد علي",
  description:
    "Full-stack digital strategist based in Jeddah, Saudi Arabia. Leads digital product and growth for Emotion Group and Motion Motors, covering strategy, platform build and performance marketing.",
  jobTitle: "Digital Product & Growth Lead",
  url: "https://ahmedali.online",
  mainEntityOfPage: URL,
  image: "https://ahmedali.online/myphoto-profile.png",
  email: "hello@ahmedali.online",
  worksFor: {
    "@type": "Organization",
    name: "Emotion Group",
    url: "https://emotiongrp.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jeddah",
    addressCountry: "SA",
  },
  knowsLanguage: ["en", "ar"],
  sameAs: [
    "https://www.linkedin.com/in/ahmedalii/",
    "https://www.tiktok.com/@ahmed.development",
  ],
  knowsAbout: [
    "Performance Marketing",
    "Search Engine Optimization",
    "Web Development",
    "Next.js",
    "React",
    "Flutter",
    "AI Integration",
    "Data Analytics",
    "Digital Strategy",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Ahmed Ali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ahmed Ali is a full-stack digital strategist based in Jeddah, Saudi Arabia. He is Digital Product & Growth Lead at Emotion Group and Motion Motors, the official SOUEAST dealer for Saudi Arabia's Western Region. He covers strategy, the platform build and the marketing that runs on it, rather than only one of the three, with more than five years of work across Egypt, Qatar, Saudi Arabia and the UAE.",
      },
    },
    {
      "@type": "Question",
      name: "What does Ahmed Ali do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Performance marketing across Google Ads, Meta and TikTok; SEO; web development in Next.js and React; mobile development in Flutter; analytics and tracking in GA4 and GTM; AI integration; and digital strategy.",
      },
    },
    {
      "@type": "Question",
      name: "Where is Ahmed Ali based?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Jeddah, Saudi Arabia. He works remotely across MENA and worldwide, and has worked on the ground in Egypt, Qatar and the UAE.",
      },
    },
    {
      "@type": "Question",
      name: "Which brands has Ahmed Ali worked with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Brands he has worked with include Ooredoo, QNB, Amazon Egypt, Saudi Arabian Airlines, BinGhatti, Dunkin' and Geely, alongside SOUEAST through Motion Motors.",
      },
    },
    {
      "@type": "Question",
      name: "How do you contact Ahmed Ali?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By email at hello@ahmedali.online, or through ahmedali.online.",
      },
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
