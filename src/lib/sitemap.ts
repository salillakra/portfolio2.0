import { getAllBlogPostMeta } from "./blog";
import { getAllProjects } from "../data/projects";
import { SITE_URL, absoluteUrl } from "./seo";

export type SitemapEntry = {
  loc: string;
  lastmod?: string;
  priority: string;
};

export const getSitemapEntries = (): SitemapEntry[] => {
  const staticPages: SitemapEntry[] = [
    { loc: absoluteUrl("/"), priority: "1.0" },
    { loc: absoluteUrl("/projects"), priority: "0.9" },
    { loc: absoluteUrl("/blog"), priority: "0.9" },
    { loc: absoluteUrl("/resume"), priority: "0.8" },
  ];

  const projectPages = getAllProjects().map((project) => ({
    loc: absoluteUrl(`/projects/${project.slug}`),
    priority: project.featured ? "0.85" : "0.7",
  }));

  const blogPages = getAllBlogPostMeta().map((post) => ({
    loc: absoluteUrl(`/blog/${post.slug}`),
    lastmod: post.updatedAt ?? post.publishedAt,
    priority: "0.8",
  }));

  return [...staticPages, ...projectPages, ...blogPages];
};

export const renderSitemapXml = (entries = getSitemapEntries()) => {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod
        ? `\n    <lastmod>${entry.lastmod}</lastmod>`
        : "";
      return `  <url>\n    <loc>${entry.loc}</loc>${lastmod}\n    <priority>${entry.priority}</priority>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

export const SITEMAP_ORIGIN = SITE_URL;
