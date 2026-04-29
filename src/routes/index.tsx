import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { TechStack } from "../components/TechStack";
import { Projects } from "../components/Projects";
import { Experience } from "../components/Experience";
import { Services } from "../components/Approach";
import { Contact } from "../components/Contact";
import { CursorGlow } from "../components/CursorGlow";
import { SmoothScroll } from "../components/SmoothScroll";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CaretRight } from "@phosphor-icons/react";
import { getAllBlogPostMeta } from "../lib/blog";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({ component: App });

type MagneticCardProps = HTMLMotionProps<"article"> & {
  children: ReactNode;
  className?: string;
};

function MagneticCard({
  children,
  className = "",
  animate,
  transition,
  ...motionProps
}: MagneticCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const motionAnimate =
    animate && typeof animate === "object" && !Array.isArray(animate)
      ? (animate as Record<string, unknown>)
      : {};
  const liftY = typeof motionAnimate.y === "number" ? motionAnimate.y : 0;

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    setOffset({ x, y });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{
        ...motionAnimate,
        x: offset.x * 0.06,
        y: offset.y * 0.06 + liftY,
      }}
      transition={
        transition ?? {
          type: "spring",
          stiffness: 220,
          damping: 18,
          mass: 0.2,
        }
      }
      className={className}
      {...motionProps}
    >
      {children}
    </motion.article>
  );
}

function App() {
  const featuredPosts = useMemo(() => {
    const posts = getAllBlogPostMeta();
    const featured = posts.filter((post) => post.featured);
    return featured.length > 0 ? featured : posts.slice(0, 3);
  }, []);

  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 0 });
  const [hoveredPostSlug, setHoveredPostSlug] = useState<string | null>(null);
  const [canExpandCards, setCanExpandCards] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncPointer = () => setCanExpandCards(mediaQuery.matches);

    syncPointer();
    mediaQuery.addEventListener("change", syncPointer);
    return () => mediaQuery.removeEventListener("change", syncPointer);
  }, []);

  useEffect(() => {
    const updateBounds = () => {
      if (!carouselRef.current || !trackRef.current) return;

      const maxDrag = Math.max(
        0,
        trackRef.current.scrollWidth - carouselRef.current.clientWidth,
      );

      setDragBounds({ left: -maxDrag, right: 0 });
    };

    const carousel = carouselRef.current;
    const track = trackRef.current;
    if (!carousel || !track) return;

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateBounds)
        : null;
    resizeObserver?.observe(carousel);
    resizeObserver?.observe(track);

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateBounds);
    };
  }, [featuredPosts.length]);

  return (
    <>
      <CursorGlow />
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        {featuredPosts.length > 0 ? (
          <section
            className="mx-auto max-w-6xl px-6 py-8 sm:py-12 lg:py-16"
            id="featured-writing"
          >
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-(--text-tertiary) uppercase">
                  Featured writing
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-(--text-primary) sm:text-3xl">
                  A few articles worth opening first
                </h2>
              </div>

              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm font-medium text-(--text-primary) no-underline transition-colors hover:bg-(--surface-hover)"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative">
              <div ref={carouselRef} className="overflow-hidden px-1 py-2">
                <motion.div
                  ref={trackRef}
                  drag="x"
                  dragConstraints={dragBounds}
                  dragElastic={0.12}
                  className="featured-writing-track flex touch-pan-y items-stretch gap-4 pb-2 pr-5 cursor-grab active:cursor-grabbing sm:gap-5 sm:pr-6"
                >
                  {featuredPosts.map((post) => (
                    <MagneticCard
                      key={post.slug}
                      layout
                      onHoverStart={() => setHoveredPostSlug(post.slug)}
                      onHoverEnd={() => setHoveredPostSlug(null)}
                      animate={
                        canExpandCards
                          ? {
                              flexBasis:
                                hoveredPostSlug === post.slug
                                  ? "clamp(22rem, 36vw, 29rem)"
                                  : hoveredPostSlug
                                    ? "clamp(15.5rem, 20vw, 19rem)"
                                    : "clamp(17rem, 25vw, 22rem)",
                              y: hoveredPostSlug === post.slug ? -8 : 0,
                            }
                          : { y: 0 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 24,
                        mass: 0.55,
                      }}
                      className="featured-writing-card card group flex h-[430px] flex-col overflow-hidden rounded-3xl border border-(--border) bg-(--surface) sm:h-[470px] lg:h-[490px]"
                    >
                      <div className="relative h-44 overflow-hidden sm:h-48">
                        <img
                          src={post.coverImage}
                          alt={post.coverImageAlt}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/15 to-transparent" />
                        <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                          Featured
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <div className="text-xs font-medium text-(--text-tertiary)">
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                          {" · "}
                          {post.readingTime}
                        </div>
                        <h3 className="mt-3 text-lg font-semibold tracking-tight text-(--text-primary) sm:text-xl">
                          <Link
                            to="/blog/$slug"
                            params={{ slug: post.slug }}
                            className="text-inherit no-underline"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-(--text-secondary) line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
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
                          className="mt-6 sm:mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-(--accent) px-4 py-2 text-sm font-medium text-(--accent-text) no-underline transition-opacity hover:opacity-90"
                        >
                          Read article
                          <CaretRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </MagneticCard>
                  ))}
                </motion.div>
              </div>

              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-(--bg) to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-(--bg) to-transparent" />
            </div>
          </section>
        ) : null}
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
    </>
  );
}
