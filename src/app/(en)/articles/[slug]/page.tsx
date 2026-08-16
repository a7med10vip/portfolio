import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticleView from "@/components/ArticleView";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articleSchema, articleUrl, articlesFor, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return articlesFor("en").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle("en", slug);
  if (!article) return {};

  return {
    title: `${article.title} | Ahmed Ali`,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: "Ahmed Ali", url: "https://ahmedali.online/who-is-ahmed-ali" }],
    openGraph: {
      title: article.title,
      description: article.description,
      url: articleUrl(article),
      type: "article",
      locale: "en_US",
      publishedTime: article.published,
      authors: ["Ahmed Ali"],
    },
    alternates: {
      canonical: articleUrl(article),
      languages: article.counterpart
        ? { ar: `https://ahmedali.online/ar/articles/${article.counterpart}` }
        : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle("en", slug);
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
      <Navbar />
      <main style={{ background: "#fff" }}>
        <ArticleView article={article} />
      </main>
      <Footer />
    </>
  );
}
