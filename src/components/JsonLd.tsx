const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ahmed Ali',
  jobTitle: 'Full-Stack Digital Strategist',
  url: 'https://ahmedali.online',
  email: 'hello@ahmedali.online',
  telephone: '+201011648156',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cairo',
    addressCountry: 'EG',
  },
  sameAs: [
    'https://www.linkedin.com/in/ahmedalii/',
    'https://wa.me/201011648156',
  ],
  knowsAbout: [
    'Performance Marketing',
    'SEO',
    'Web Development',
    'Flutter',
    'AI Integration',
    'Data Analytics',
    'Digital Strategy',
    'Mobile App Development',
    'Next.js',
    'React',
    'Full-Stack Development',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://ahmedali.online',
  name: 'Ahmed Ali | Full-Stack Digital Strategist',
  inLanguage: ['en', 'ar'],
}

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Ahmed Ali Digital Services',
  url: 'https://ahmedali.online',
  serviceType: [
    'Digital Marketing',
    'Web Development',
    'Mobile App Development',
    'SEO',
    'AI Integration',
  ],
  areaServed: [
    { '@type': 'Country', name: 'Egypt' },
    { '@type': 'Country', name: 'Qatar' },
    { '@type': 'Country', name: 'Saudi Arabia' },
    { '@type': 'Country', name: 'UAE' },
  ],
  priceRange: '$$',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does Ahmed Ali offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Performance marketing, SEO, web & mobile development, AI integration, data analytics, and full-stack digital strategy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Ahmed Ali based?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cairo, Egypt, with experience across Qatar, Saudi Arabia, and UAE.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Ahmed Ali build mobile apps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, using Flutter for iOS and Android. Recent project: Maasob Al-Sultan app shipped in under 1 month.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Ahmed Ali work with international clients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, with clients including Ooredoo (Qatar), QNB, Amazon Egypt, Saudi Arabian Airlines, and BinGhatti (Dubai).',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I hire Ahmed Ali?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contact via email at hello@ahmedali.online or WhatsApp at +201011648156.',
      },
    },
  ],
}

export default function JsonLd() {
  return (
    <>
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceSchema),
        }}
      />
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
