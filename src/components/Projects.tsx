import { motion } from "framer-motion";
import { ArrowSquareOut, GithubLogo, Users } from "@phosphor-icons/react";

const projects = [
  {
    title: "Pantheon Techfest",
    description:
      "Official website for BIT Mesra's Pantheon Techfest — real-time leaderboards, secure user validation, built to handle peak traffic.",
    tech: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    metric: "8,000+ users",
    github: "https://github.com/salillakra/Pantheon-2k25",
    live: "https://pantheon25.com",
  },
  {
    title: "E-Summit 2026",
    description:
      "Platform with dynamic event pages, OAuth authentication, and real-time features during a high traffic live event.",
    tech: ["Next.js", "Supabase", "TypeScript", "Websocket", "PostgreSQL"],
    metric: "11K+ page views",
    github: "https://github.com/EDC-BITM/e-summit26",
    live: "https://esummit.edcbitmesra.in",
  },
  {
    title: "RoboSaga",
    description:
      "Competition platform with structured event data and scalable APIs built for robotics competitions.",
    tech: ["Next.js", "PostgreSQL", "Drizzle ORM"],
    metric: "Scalable APIs",
    github: "https://github.com/Pratyunmis/robosaga26",
    live: "https://robosaga.robolutionbitm.in",
  },
  {
    title: "MetaMind",
    description:
      "Full stack blogging platform with authentication, role-based access, image uploads, and REST API architecture.",
    tech: ["Next.js", "MongoDB"],
    metric: "Full RBAC",
    github: "https://github.com/salillakra/metamind",
  },
];

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-3xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-(--text-tertiary)">
          Projects
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-(--text-primary) sm:text-3xl">
          Production systems, not toy apps.
        </h2>
      </motion.div>

      {/* Metrics banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
      >
        {[
          { value: "11,000+", label: "Users served" },
          { value: "8,000+", label: "Live participants" },
          { value: "Multiple", label: "High traffic deploys" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-(--border) bg-(--surface) p-4 sm:p-5 text-center"
          >
            <div className="text-xl font-bold text-(--metric-accent) sm:text-2xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs text-(--text-tertiary)">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Project cards */}
      <div className="mt-12 space-y-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="card group rounded-xl p-5 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                  <h3 className="text-base sm:text-lg font-semibold text-(--text-primary)">
                    {project.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-(--metric-bg) px-2.5 py-0.5 text-xs font-medium text-(--metric-accent)">
                    <Users className="h-3 w-3" />
                    {project.metric}
                  </span>
                </div>
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-(--badge-border) bg-(--badge-bg) px-2 py-0.5 text-xs text-(--text-tertiary)"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1 sm:pt-0 sm:shrink-0">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--text-tertiary) hover:text-(--text-primary) transition-colors"
                >
                  <GithubLogo className="h-4 w-4" />
                </a>
                {"live" in project && project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--text-tertiary) hover:text-(--text-primary) transition-colors"
                  >
                    <ArrowSquareOut className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-16 h-px bg-(--border)" />
    </section>
  );
}
