import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowSquareOut, GithubLogo, Users } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HOME_METRICS,
  getFeaturedProjects,
  getSecondaryProjects,
} from "../data/projects";
import { ProjectMedia } from "./ProjectMedia";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Projects() {
  const featured = getFeaturedProjects();
  const secondary = getSecondaryProjects();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const frames = gsap.utils.toArray<HTMLElement>("[data-featured-frame]");
        frames.forEach((frame) => {
          const media = frame.querySelector("[data-frame-media]");
          if (!media) return;

          gsap.fromTo(
            media,
            { scale: 1.08 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top 80%",
                end: "bottom 20%",
                scrub: true,
              },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-4 text-xs font-medium tracking-[0.2em] text-(--text-tertiary) uppercase">
          Projects
        </p>
        <h2 className="font-display text-4xl tracking-tight text-(--text-primary) italic sm:text-5xl">
          Production systems, not toy apps.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
      >
        {HOME_METRICS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-(--border) bg-(--surface) p-4 text-center sm:p-5"
          >
            <div className="text-xl font-bold text-(--metric-accent) sm:text-2xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs text-(--text-tertiary)">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="mt-16 space-y-20 sm:space-y-28">
        {featured.map((project, index) => (
          <article
            key={project.slug}
            data-featured-frame
            className={`grid items-center gap-8 lg:grid-cols-12 ${
              index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="block overflow-hidden rounded-3xl no-underline lg:col-span-7"
            >
              <div data-frame-media className="origin-center">
                <ProjectMedia
                  src={project.cover}
                  alt={`${project.title} — Salil Lakra`}
                  title={project.title}
                  className="aspect-16/10 rounded-3xl border border-(--border)"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            </Link>

            <div className="lg:sticky lg:top-28 lg:col-span-5">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-(--text-tertiary) uppercase">
                {project.year ?? "Selected"}
                {project.metric ? ` · ${project.metric}` : ""}
              </p>
              <h3 className="font-display mt-3 text-3xl text-(--text-primary) italic sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-(--text-secondary)">
                {project.description}
              </p>
              {project.metric ? (
                <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-(--metric-bg) px-2.5 py-0.5 text-xs font-medium text-(--metric-accent)">
                  <Users className="h-3 w-3" />
                  {project.metric}
                </span>
              ) : (
                <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-(--metric-bg) px-2.5 py-0.5 text-xs font-medium text-(--metric-accent)">
                  {project.role}
                </span>
              )}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-(--badge-border) bg-(--badge-bg) px-2 py-0.5 text-xs text-(--text-tertiary)"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  className="inline-flex items-center gap-2 rounded-full bg-(--accent) px-4 py-2 text-sm font-medium text-(--accent-text) no-underline"
                >
                  Open case
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--text-tertiary) transition-colors hover:text-(--text-primary)"
                    aria-label={`${project.title} on GitHub`}
                  >
                    <GithubLogo className="h-4 w-4" />
                  </a>
                ) : null}
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--text-tertiary) transition-colors hover:text-(--text-primary)"
                    aria-label={`${project.title} live site`}
                  >
                    <ArrowSquareOut className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>

      {secondary.length > 0 ? (
      <div className="mt-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h3 className="text-lg font-semibold text-(--text-primary)">More work</h3>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-(--text-secondary) no-underline hover:text-(--text-primary)"
          >
            All projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {secondary.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="card group block overflow-hidden rounded-xl no-underline"
              >
                <ProjectMedia
                  src={project.cover}
                  alt={`${project.title} — Salil Lakra`}
                  title={project.title}
                  className="aspect-16/10"
                />
                <div className="p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-(--text-primary)">
                      {project.title}
                    </h3>
                    {project.metric ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-(--metric-bg) px-2.5 py-0.5 text-xs font-medium text-(--metric-accent)">
                        {project.metric}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm leading-relaxed text-(--text-secondary)">
                    {project.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      ) : (
        <div className="mt-16 flex justify-end">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-(--text-secondary) no-underline hover:text-(--text-primary)"
          >
            All projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      <div className="mt-16 h-px bg-(--border)" />
    </section>
  );
}
