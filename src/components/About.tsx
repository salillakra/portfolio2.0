import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
          About
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          A full stack developer who ships real systems.
        </h2>

        <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
          <p>
            I'm Salil Lakra from India, currently studying Electronics and
            Communication Engineering at{" "}
            <strong className="font-medium text-[var(--text-primary)]">
              BIT Mesra
            </strong>
            .
          </p>
          <p>
            I build scalable web and mobile applications using modern
            technologies — Next.js, Node.js, React Native, and TypeScript.
          </p>
          <p>
            My core focus areas are{" "}
            <strong className="font-medium text-[var(--text-primary)]">
              backend architecture, performance optimization, scalable APIs, and
              real-time systems
            </strong>
            .
          </p>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-[var(--border)]" />
      </motion.div>
    </section>
  );
}
