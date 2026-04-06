import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
  markdownToHtml,
} from "@/lib/blog";
import JsonLd from "@/components/seo/JsonLd";
import BlogPostClient from "./BlogPostClient";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  const slugs = getPostSlugs("en");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug, "en");
  if (!post) return {};

  const base = "https://droztechnologies.com";
  const url = `${base}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.image
        ? [{ url: post.image, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug, "en");
  if (!post) notFound();

  const htmlContent = await markdownToHtml(post.content);
  const allPosts = getAllPosts("en");
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.division === post.division)
    .slice(0, 3);

  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const base = "https://droztechnologies.com";

  const BLOG_POSTING_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Droz Technologies",
      logo: { "@type": "ImageObject", url: `${base}/favicon.ico` },
    },
    url: `${base}/blog/${post.slug}`,
    image: post.image || `${base}/images/team.png`,
    keywords: post.tags.join(", "),
    articleSection: post.division,
    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${base}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <JsonLd data={BLOG_POSTING_SCHEMA} />
      <BlogPostClient
        post={{ ...post, htmlContent }}
        related={related}
        prevPost={prevPost}
        nextPost={nextPost}
      />
    </>
  );
}
