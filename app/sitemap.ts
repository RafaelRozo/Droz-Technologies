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

  const blogRoutes: MetadataRoute.Sitemap = [];

  // Include blog posts from all locales
  for (const locale of ["en", "fr", "es"] as const) {
    try {
      const posts = getAllPosts(locale);
      for (const post of posts) {
        blogRoutes.push({
          url: `${base}/blog/${post.slug}`,
          lastModified: post.date ? new Date(post.date) : now,
          changeFrequency: "monthly",
          priority: post.featured ? 0.85 : 0.7,
        });
      }
    } catch {
      // Locale directory may not exist
    }
  }

  // Deduplicate by URL (same slug in multiple locales should appear once)
  const seen = new Set<string>();
  const uniqueBlogRoutes = blogRoutes.filter((route) => {
    if (seen.has(route.url)) return false;
    seen.add(route.url);
    return true;
  });

  return [...staticRoutes, ...uniqueBlogRoutes];
}
