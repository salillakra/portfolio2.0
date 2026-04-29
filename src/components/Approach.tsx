import { motion } from "framer-motion";
import {
  Globe,
  DeviceMobile,
  Stack,
  Database,
  ArrowRight,
} from "@phosphor-icons/react";

const services = [
  {
    icon: Globe,
    title: "Full-Stack Web Apps",
    description:
      "End-to-end web applications with Next.js, React, and Node.js — auth, payments, dashboards, real-time features.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    icon: DeviceMobile,
    title: "Mobile Development",
    description:
      "Cross-platform mobile apps with React Native — shared codebase, native performance, push notifications.",
    tags: ["React Native", "Expo", "iOS", "Android"],
  },
  {
    icon: Stack,
    title: "APIs & Backend Systems",
    description:
      "RESTful APIs, WebSocket servers, authentication systems, and microservices that handle real traffic at scale.",
    tags: ["Node.js", "Express", "WebSockets", "Auth"],
  },
  {
    icon: Database,
    title: "Database & Infrastructure",
    description:
      "Schema design, query optimization, caching layers, and deployment pipelines with Docker and CI/CD.",
    tags: ["PostgreSQL", "MongoDB", "Docker", "Vercel"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-3xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <h2 className="text-2xl font-bold tracking-tight text-(--text-primary) mb-2">
          What I Can Help With
        </h2>
        <p className="text-(--text-tertiary) text-sm mb-10 max-w-lg">
          From idea to production — I build the whole thing, not just
          components.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {services.map((s) => (
          <motion.div
            key={s.title}
            variants={item}
            className="card rounded-xl p-6 group cursor-default"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              <s.icon className="h-4 w-4 text-(--accent)" />
            </div>

            <h3 className="text-sm font-semibold text-(--text-primary) mb-2 flex items-center gap-1.5">
              {s.title}
              <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200 text-(--text-tertiary)" />
            </h3>

            <p className="text-xs leading-relaxed text-(--text-tertiary) mb-4">
              {s.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: "var(--bg-secondary)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Divider */}
      <div className="mt-16 h-px bg-(--border)" />
    </section>
  );
}
