import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Expert in Saudi Arabia, UAE & Gulf | Ahmed Ali",
  description:
    "Hire a proven SEO consultant for Saudi Arabia, UAE, Qatar & MENA. Arabic & English SEO, technical audits, local search optimization, and organic growth strategies. Top 10 rankings in 8 months.",
  keywords: [
    "SEO expert Saudi Arabia",
    "SEO consultant UAE",
    "SEO specialist Dubai",
    "SEO agency Qatar",
    "Arabic SEO",
    "تحسين محركات البحث السعودية",
    "خبير سيو",
    "SEO Riyadh",
    "SEO Dubai",
    "SEO Doha",
    "technical SEO audit",
    "local SEO Gulf",
    "e-commerce SEO MENA",
    "bilingual SEO Arabic English",
    "organic growth Gulf",
    "SEO expert MENA",
    "hire SEO freelancer Gulf",
  ],
  openGraph: {
    title: "SEO Expert in Saudi Arabia, UAE & Gulf | Ahmed Ali",
    description:
      "Proven SEO results across the Gulf — top 10 rankings, 3.2x traffic growth, bilingual Arabic & English optimization. Free audit available.",
    url: "https://ahmedali.online/services/seo",
    type: "website",
    images: [
      {
        url: "https://ahmedali.online/ahmed.jpeg",
        width: 1200,
        height: 630,
        alt: "Ahmed Ali — SEO Expert for Saudi Arabia, UAE & Gulf Markets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Expert in Saudi Arabia, UAE & Gulf | Ahmed Ali",
    description:
      "Proven SEO results across the Gulf — top 10 rankings, 3.2x traffic growth, bilingual Arabic & English optimization.",
  },
  alternates: {
    canonical: "https://ahmedali.online/services/seo",
  },
  other: {
    "geo.region": "SA",
    "geo.placename": "Riyadh",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does it take to see SEO results in the Gulf market?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Typically 3-6 months for meaningful rankings improvement. Competitive keywords in Saudi Arabia and UAE markets may take 6-8 months. I provide monthly reports so you can track progress from day one.",
      },
    },
    {
      "@type": "Question",
      name: "Do you handle both Arabic and English SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. I build bilingual SEO strategies with proper hreflang implementation, Arabic keyword research, and culturally relevant content for both audiences. This is critical for Gulf markets where users search in both languages.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between SEO and paid ads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paid ads give instant traffic but stop when you stop paying. SEO builds a permanent organic traffic engine — your site keeps ranking and generating leads 24/7 without ongoing ad spend.",
      },
    },
    {
      "@type": "Question",
      name: "Can you work with my existing website on Shopify/WordPress/Salla?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. I work with all major platforms including Shopify, WordPress, Salla, Zid, custom Next.js sites, and more.",
      },
    },
    {
      "@type": "Question",
      name: "How do you measure SEO success?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "I track keyword rankings, organic traffic growth, click-through rates, conversion rates from organic visitors, and revenue attributed to SEO. You get a live dashboard and monthly detailed reports.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer SEO for businesses outside the Gulf?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While my primary focus is the Gulf and MENA region (Saudi Arabia, UAE, Qatar, Egypt), I've worked with international clients across Europe and North America.",
      },
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "SEO & Organic Growth Services",
  description:
    "Professional SEO services for businesses in Saudi Arabia, UAE, Qatar, and the MENA region. Technical SEO, content optimization, local search, and bilingual Arabic-English strategies.",
  provider: {
    "@type": "Person",
    name: "Ahmed Ali",
    jobTitle: "Full-Stack Digital Strategist",
    url: "https://ahmedali.online",
  },
  areaServed: [
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Egypt" },
  ],
  serviceType: "Search Engine Optimization",
  url: "https://ahmedali.online/services/seo",
};

export default function SEOLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {children}
    </>
  );
}
