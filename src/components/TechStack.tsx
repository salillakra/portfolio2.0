import { motion } from 'framer-motion'

const stack = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'C / C++', 'SQL'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'React Native'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'WebSockets', 'Auth Systems'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Docker', 'Linux', 'Supabase', 'Firebase'],
  },
]

export function TechStack() {
  return (
    <section id="stack" className="mx-auto max-w-3xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
          Stack
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          Technologies I work with.
        </h2>
      </motion.div>

      <div className="mt-12 space-y-8">
        {stack.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
          >
            <h3 className="mb-4 text-sm font-medium text-[var(--text-tertiary)]">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-[var(--badge-border)] bg-[var(--badge-bg)] px-3 py-1.5 text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-16 h-px bg-[var(--border)]" />
    </section>
  )
}
