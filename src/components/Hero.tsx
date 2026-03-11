import { motion } from "framer-motion";
import { ArrowRight, Github, FileText, Instagram } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20 sm:pt-16 text-center overflow-hidden">
      {/* Ambient gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--surface) px-4 py-1.5 text-xs font-medium text-(--text-tertiary) backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-4xl font-bold tracking-[-0.02em] text-(--text-primary) sm:text-7xl lg:text-8xl"
        >
          Salil Lakra
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm leading-relaxed text-(--text-secondary) sm:text-lg"
        >
          Full Stack Developer building high-performance web and mobile
          applications with Next.js, React Native, and Node.js.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href="#projects" variant="primary">
            View Projects
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>

          <MagneticButton href="https://github.com/salillakra">
            <Github className="h-4 w-4" />
            GitHub
          </MagneticButton>

          <MagneticButton href="/resume.pdf">
            <FileText className="h-4 w-4" />
            Resume
          </MagneticButton>

          <MagneticButton href="https://instagram.com/salillakra">
            <Instagram className="h-4 w-4" />
            Instagram
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-(--bg) to-transparent" />
    </section>
  );
}
