import { motion } from "framer-motion";
import {
  ArrowRight,
  GithubLogo,
  FileText,
  LinkedinLogo,
  InstagramLogo,
  Coffee,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { MagneticButton } from "./MagneticButton";
import { ProjectMedia } from "./ProjectMedia";
import { getFeaturedProjects } from "../data/projects";

export function Hero() {
  const selected = getFeaturedProjects().slice(0, 3);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-16 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--surface) px-4 py-1.5 text-xs font-medium text-(--text-tertiary) backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl leading-[0.9] tracking-[-0.03em] text-(--text-primary) italic sm:text-8xl lg:text-[7.5rem]"
        >
          Salil Lakra
        </motion.h1>

        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-(--text-secondary) sm:mt-7 sm:text-lg"
        >
          Software engineer focused on distributed backend systems, AI-powered
          applications, and scalable full-stack platforms.
        </motion.p>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10"
        >
          <MagneticButton href="#projects" variant="primary">
            View Projects
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>

          <MagneticButton href="https://github.com/salillakra">
            <GithubLogo className="h-4 w-4" />
            GitHub
          </MagneticButton>

          <MagneticButton href="https://linkedin.com/in/salillakra">
            <LinkedinLogo className="h-4 w-4" />
            LinkedIn
          </MagneticButton>

          <MagneticButton href="/resume">
            <FileText className="h-4 w-4" />
            Resume
          </MagneticButton>

          <MagneticButton href="https://instagram.com/officialsalillakra">
            <InstagramLogo className="h-4 w-4" />
            Instagram
          </MagneticButton>

          <MagneticButton href="https://www.buymeacoffee.com/salillakra">
            <Coffee className="h-4 w-4" />
            Buy me a coffee
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 mx-auto mt-16 w-full max-w-6xl sm:mt-20"
      >
        <p className="mb-4 text-center text-[11px] font-semibold tracking-[0.2em] text-(--text-tertiary) uppercase">
          Selected work
        </p>
        <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-3 sm:gap-4">
          {selected.map((project, index) => (
            <motion.div
              key={project.slug}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="min-w-0"
            >
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="card group flex h-full flex-col overflow-hidden rounded-2xl no-underline"
              >
                <ProjectMedia
                  src={project.cover}
                  alt={`${project.title} — Salil Lakra`}
                  title={project.title}
                  className="aspect-16/10 w-full shrink-0"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display line-clamp-2 min-h-14 flex-1 text-xl leading-7 text-(--text-primary) italic">
                      {project.title}
                    </p>
                    <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-(--text-tertiary) transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-(--text-tertiary)">
                    {project.tagline}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
