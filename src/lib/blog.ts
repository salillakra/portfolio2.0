import type { ComponentType } from "react";

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  author: string;
  readingTime: string;
  tags: string[];
  coverImage: string;
  coverImageAlt: string;
};

type BlogPostFrontmatter = Omit<BlogPostMeta, "slug">;

type BlogModule = {
  default: ComponentType;
  meta: BlogPostFrontmatter;
};

export type BlogPost = {
  meta: BlogPostMeta;
  Component: ComponentType;
};

const blogModules = import.meta.glob<BlogModule>("../content/blog/*.mdx", {
  eager: true,
});

const normalizeSlug = (filePath: string) => {
  const fileName = filePath.split("/").pop() ?? "";
  return fileName.replace(/\.mdx$/i, "");
};

const withSlug = (slug: string, meta: BlogPostFrontmatter): BlogPostMeta => ({
  slug,
  ...meta,
});

const sortByDate = (a: BlogPostMeta, b: BlogPostMeta) => {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
};

export const getAllBlogPosts = (): BlogPost[] => {
  const posts = Object.entries(blogModules).map(([filePath, module]) => {
    const slug = normalizeSlug(filePath);

    return {
      meta: withSlug(slug, module.meta),
      Component: module.default,
    };
  });

  return posts.sort((a, b) => sortByDate(a.meta, b.meta));
};

export const getAllBlogPostMeta = (): BlogPostMeta[] => {
  return getAllBlogPosts().map((post) => post.meta);
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return getAllBlogPosts().find((post) => post.meta.slug === slug);
};

export const getFeaturedBlogPostMeta = (): BlogPostMeta | undefined => {
  const posts = getAllBlogPostMeta();
  return posts.find((post) => post.featured) ?? posts[0];
};
