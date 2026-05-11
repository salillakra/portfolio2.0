import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { getAllBlogPostMeta, getFeaturedBlogPostMeta } from "../../lib/blog";

export const Route = createFileRoute("/blog/")({
  loader: () => ({
    posts: getAllBlogPostMeta(),
    featuredPost: getFeaturedBlogPostMeta(),
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { posts, featuredPost } = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const allTags = useMemo(() => {
    return ["All", ...Array.from(new Set(posts.flatMap((post) => post.tags)))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const inTag = selectedTag === "All" || post.tags.includes(selectedTag);
      const inSearch =
        normalizedQuery.length === 0 ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return inTag && inSearch;
    });
  }, [posts, query, selectedTag]);

  return (
    <main className="min-h-screen bg-(--bg)">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-24">
        <header className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-xs font-semibold tracking-[0.12em] text-(--text-secondary) uppercase no-underline"
          >
            Back To Portfolio
          </Link>
          <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-(--text-tertiary) uppercase">
            Insights
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-(--text-primary) md:text-6xl">
            Practical writing for building better software systems
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-(--text-secondary)">
            Long-form writing on full-stack delivery, production architecture,
            and engineering leadership practices for product teams.
          </p>
        </header>

        {featuredPost ? (
          <section className="card mb-10 grid overflow-hidden rounded-3xl md:grid-cols-[1.05fr_0.95fr]">
            <Link
              to="/blog/$slug"
              params={{ slug: featuredPost.slug }}
              className="group block min-h-64 overflow-hidden no-underline md:min-h-full"
              aria-label={featuredPost.title}
            >
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.coverImageAlt}
                className="h-full min-h-64 w-full object-cover transition duration-700 group-hover:scale-105"
                loading="eager"
              />
            </Link>
            <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
              <p className="text-xs font-semibold tracking-[0.14em] text-(--text-tertiary) uppercase">
                Featured Post
              </p>
              <h2 className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-(--text-primary) md:text-4xl">
                <Link
                  to="/blog/$slug"
                  params={{ slug: featuredPost.slug }}
                  className="text-inherit no-underline"
                >
                  {featuredPost.title}
                </Link>
              </h2>
              <p className="mt-4 text-sm leading-7 text-(--text-secondary)">
                {featuredPost.excerpt}
              </p>
              <p className="mt-5 text-xs font-medium text-(--text-tertiary)">
                {new Date(featuredPost.publishedAt).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                )}
                {" · "}
                {featuredPost.readingTime}
              </p>
              <Link
                to="/blog/$slug"
                params={{ slug: featuredPost.slug }}
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-(--accent) px-4 py-2 text-sm font-medium text-(--accent-text) no-underline transition-opacity hover:opacity-90"
              >
                Read featured
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        ) : null}

        <section className="mb-8 rounded-2xl border border-(--border) bg-(--surface) p-4 md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <label className="relative block w-full md:max-w-md">
              <MagnifyingGlass className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-(--text-tertiary)" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, topic, or keyword"
                className="w-full rounded-xl border border-(--border) bg-(--bg-secondary) py-2.5 pr-4 pl-10 text-sm text-(--text-primary) outline-none placeholder:text-(--text-tertiary)"
              />
            </label>
            <p className="text-xs font-medium text-(--text-tertiary)">
              {filteredPosts.length} post(s) found
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const isActive = selectedTag === tag;

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`cursor-pointer rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
                    isActive
                      ? "border-transparent bg-(--accent) text-(--accent-text)"
                      : "border-(--badge-border) bg-(--badge-bg) text-(--text-secondary)"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-(--text-tertiary) uppercase">
              All Articles
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-(--text-primary)">
              Browse the library
            </h2>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="card group flex min-h-full flex-col overflow-hidden rounded-2xl"
            >
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="block overflow-hidden no-underline"
                aria-label={post.title}
              >
                <img
                  src={post.coverImage}
                  alt={post.coverImageAlt}
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium text-(--text-tertiary)">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  {" · "}
                  {post.readingTime}
                </p>
                <h2 className="mt-3 text-xl leading-tight font-semibold text-(--text-primary)">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="text-inherit no-underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-7 text-(--text-secondary)">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-(--badge-border) bg-(--badge-bg) px-3 py-1 text-[11px] font-medium text-(--text-secondary)"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-semibold text-(--text-primary) no-underline"
                >
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}

          {filteredPosts.length === 0 ? (
            <article className="card col-span-full rounded-2xl p-10 text-center">
              <h3 className="text-xl font-semibold text-(--text-primary)">
                No posts match your filters
              </h3>
              <p className="mt-2 text-sm text-(--text-secondary)">
                Try a different search term or switch back to the All tag.
              </p>
            </article>
          ) : null}
        </section>
      </div>
    </main>
  );
}
