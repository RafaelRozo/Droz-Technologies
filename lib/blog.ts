import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  division: string;
  category: string;
  tags: string[];
  locale: string;
  description: string;
  readingTime: number;
  featured: boolean;
  image: string;
  content: string;
  htmlContent?: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function estimateReadingTime(text: string): number {
  const wordsPerMinute = 220;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function parsePost(filePath: string, slug: string, locale: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "",
    date: data.date ? String(data.date) : "",
    author: data.author ?? "Droz Technologies",
    division: data.division ?? "",
    category: data.category ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    locale,
    description: data.description ?? "",
    readingTime: data.readingTime ?? estimateReadingTime(content),
    featured: data.featured === true,
    image: data.image ?? "",
    content,
  };
}

export function getPostSlugs(locale: string): string[] {
  const dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(locale: string): BlogPost[] {
  const slugs = getPostSlugs(locale);
  const dir = path.join(CONTENT_DIR, locale);

  const posts = slugs.map((slug) =>
    parsePost(path.join(dir, `${slug}.md`), slug, locale)
  );

  return posts.sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return db - da;
  });
}

export function getPostBySlug(
  slug: string,
  locale: string
): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return parsePost(filePath, slug, locale);
}

export function getPostsByDivision(
  division: string,
  locale: string
): BlogPost[] {
  return getAllPosts(locale).filter((p) => p.division === division);
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml, { sanitize: false }).process(markdown);
  return result.toString();
}
