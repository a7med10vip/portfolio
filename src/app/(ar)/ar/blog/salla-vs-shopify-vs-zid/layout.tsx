import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سلة vs شوبيفاي vs زد — أيهم أفضل لمتجرك في 2026؟ | أحمد علي",
  description:
    "مقارنة شاملة بين منصات التجارة الإلكترونية سلة وشوبيفاي وزد في السوق السعودي. الأسعار، المميزات، بوابات الدفع، السيو، والدعم العربي. اختر المنصة المناسبة لمتجرك.",
  keywords: [
    "سلة vs شوبيفاي",
    "أفضل منصة متجر إلكتروني السعودية",
    "سلة أم شوبيفاي أم زد",
    "مقارنة منصات التجارة الإلكترونية",
    "منصة سلة",
    "منصة زد",
    "شوبيفاي السعودية",
    "فتح متجر إلكتروني السعودية",
    "أفضل منصة إلكترونية 2026",
    "تكلفة متجر إلكتروني",
    "بوابات الدفع السعودية",
    "Salla vs Shopify vs Zid",
  ],
  openGraph: {
    title: "سلة vs شوبيفاي vs زد — أيهم أفضل لمتجرك في 2026؟",
    description: "مقارنة شاملة بين أشهر 3 منصات تجارة إلكترونية في السعودية. الأسعار، المميزات، وأي منصة تناسبك.",
    url: "https://ahmedali.online/ar/blog/salla-vs-shopify-vs-zid",
    type: "article",
    locale: "ar_SA",
    images: [{ url: "https://ahmedali.online/ahmed.jpeg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://ahmedali.online/ar/blog/salla-vs-shopify-vs-zid",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "أيهم أفضل سلة أم شوبيفاي للسوق السعودي؟", acceptedAnswer: { "@type": "Answer", text: "سلة أفضل للمبتدئين والمتاجر السعودية لأنها مصممة للسوق المحلي مع دعم عربي كامل وبوابات دفع سعودية جاهزة. شوبيفاي أفضل للمتاجر الدولية أو التي تحتاج تخصيص متقدم." } },
    { "@type": "Question", name: "كم تكلفة فتح متجر إلكتروني على سلة؟", acceptedAnswer: { "@type": "Answer", text: "سلة توفر خطة مجانية مع عمولة 5% على كل طلب. الخطة الأساسية تبدأ من 99 ر.س/شهر، والخطة المتقدمة 299 ر.س/شهر بدون عمولات." } },
    { "@type": "Question", name: "هل شوبيفاي يدعم اللغة العربية؟", acceptedAnswer: { "@type": "Answer", text: "نعم، شوبيفاي يدعم اللغة العربية والاتجاه RTL، لكن الدعم الفني ولوحة التحكم بالإنجليزية. سلة وزد يوفرون واجهة عربية بالكامل." } },
    { "@type": "Question", name: "ما الفرق بين سلة وزد؟", acceptedAnswer: { "@type": "Answer", text: "سلة أسهل في الاستخدام وأرخص في البداية. زد يوفر ميزات أكثر للمتاجر المتوسطة والكبيرة مثل نظام فروع متعدد وتكاملات ERP." } },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "سلة vs شوبيفاي vs زد — أيهم أفضل لمتجرك في 2026؟",
  description: "مقارنة شاملة بين منصات التجارة الإلكترونية سلة وشوبيفاي وزد في السوق السعودي",
  author: { "@type": "Person", name: "Ahmed Ali", url: "https://ahmedali.online" },
  datePublished: "2026-04-04",
  publisher: { "@type": "Person", name: "Ahmed Ali", url: "https://ahmedali.online" },
  url: "https://ahmedali.online/ar/blog/salla-vs-shopify-vs-zid",
  inLanguage: "ar",
};

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {children}
    </>
  );
}
