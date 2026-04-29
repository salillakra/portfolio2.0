declare module "*.mdx" {
  import type { ComponentType } from "react";

  const MDXComponent: ComponentType;
  export default MDXComponent;

  export const meta: {
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
}
