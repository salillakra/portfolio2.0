import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { getBlogPostBySlug } from "../../lib/blog";
import { absoluteUrl } from "../../lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPostBySlug(params.slug);

    if (!post) {
      throw notFound();
    }

    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Blog | Salil Lakra" }],
      };
    }

    const { meta } = loaderData.post;
    const canonical = absoluteUrl(`/blog/${meta.slug}`);

    return {
      meta: [
        { title: `${meta.title} | Salil Lakra` },
        { name: "description", content: meta.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:title", content: meta.title },
        { property: "og:description", content: meta.excerpt },
        { property: "og:url", content: canonical },
        { property: "og:image", content: meta.coverImage },
        { property: "og:image:alt", content: meta.coverImageAlt },
        { property: "article:published_time", content: meta.publishedAt },
        { property: "article:author", content: meta.author },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: meta.title },
        { name: "twitter:description", content: meta.excerpt },
        { name: "twitter:image", content: meta.coverImage },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const PostContent = post.Component;

  return (
    <main className="min-h-screen bg-(--bg)">
      <div className="mx-auto w-full max-w-3xl px-6 py-18 md:py-24">
        <nav className="mb-10 flex items-center justify-between gap-4">
          <Link
            to="/blog"
            className="inline-flex items-center rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-xs font-semibold tracking-[0.12em] text-(--text-secondary) uppercase no-underline"
          >
            Back To Blogs
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-(--text-secondary) no-underline hover:text-(--text-primary)"
          >
            Portfolio Home
          </Link>
        </nav>

        <header className="mb-10">
          <p className="text-xs font-semibold tracking-[0.16em] text-(--text-tertiary) uppercase">
            {post.meta.author}
          </p>
          <h1 className="mt-3 text-4xl leading-tight font-semibold tracking-tight text-(--text-primary) md:text-5xl">
            {post.meta.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-(--text-secondary)">
            {post.meta.excerpt}
          </p>
          <p className="mt-5 text-sm text-(--text-tertiary)">
            {new Date(post.meta.publishedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {" · "}
            {post.meta.readingTime}
          </p>
        </header>

        <img
          src={post.meta.coverImage}
          alt={post.meta.coverImageAlt}
          className="mb-10 w-full rounded-2xl border border-(--border) object-cover"
          loading="eager"
        />

        <article className="blog-prose">
          <PostContent />
        </article>
      </div>
    </main>
  );
}
