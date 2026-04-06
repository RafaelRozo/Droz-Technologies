import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://droztechnologies.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/divisions/predictive-maintenance`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/divisions/software-development`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/divisions/intelligent-construction`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/divisions/industrial-manufacturing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/divisions/ai-consulting`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllPosts("en");
    blogRoutes = posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.85 : 0.7,
    }));
  } catch {
    // No posts yet — content directory may be empty during build
  }

  return [...staticRoutes, ...blogRoutes];
}
