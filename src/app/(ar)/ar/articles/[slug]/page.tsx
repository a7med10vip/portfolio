import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticleView from "@/components/ArticleView";
import NavbarAr from "@/components/ar/NavbarAr";
import FooterAr from "@/components/ar/FooterAr";
import { articleSchema, articleUrl, articlesFor, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return articlesFor("ar").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle("ar", slug);
  if (!article) return {};

  return {
    title: `${article.title} | أحمد علي`,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: "Ahmed Ali", url: "https://ahmedali.online/who-is-ahmed-ali" }],
    openGraph: {
      title: article.title,
      description: article.description,
      url: articleUrl(article),
      type: "article",
      locale: "ar_SA",
      publishedTime: article.published,
      authors: ["Ahmed Ali"],
    },
    alternates: {
      canonical: articleUrl(article),
      languages: article.counterpart
        ? { en: `https://ahmedali.online/articles/${article.counterpart}` }
        : undefined,
    },
  };
}

export default async function ArticlePageAr({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle("ar", slug);
  if (!article) notFound();

  return (
    <>
      {articleSchema(article).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <NavbarAr />
      <main style={{ background: "#fff" }}>
        <ArticleView article={article} />
      </main>
      <FooterAr />
    </>
  );
}
