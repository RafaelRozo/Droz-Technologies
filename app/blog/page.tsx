import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import JsonLd from "@/components/seo/JsonLd";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Insights | Droz Technologies",
  description:
    "Technical expertise from five industrial divisions: predictive maintenance, software engineering, intelligent construction, industrial manufacturing, and AI consulting. Written by practitioners.",
  alternates: { canonical: "https://droztechnologies.com/blog" },
  openGraph: {
    title: "Insights | Droz Technologies",
    description:
      "Field-tested knowledge from five industrial divisions. No hype — just engineering.",
    url: "https://droztechnologies.com/blog",
    type: "website",
  },
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://droztechnologies.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Insights",
      item: "https://droztechnologies.com/blog",
    },
  ],
};

export default function BlogPage() {
  const posts = getAllPosts("en");

  return (
    <>
      <JsonLd data={BREADCRUMB_SCHEMA} />
      <BlogListClient posts={posts} />
    </>
  );
}
