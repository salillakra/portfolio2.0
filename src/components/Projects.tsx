import { motion } from 'framer-motion'
import { ExternalLink, Github, Users } from 'lucide-react'

const projects = [
  {
    title: 'Pantheon Techfest',
    description:
      "Official website for BIT Mesra's Pantheon Techfest — real-time leaderboards, secure user validation, built to handle peak traffic.",
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL'],
    metric: '8,000+ users',
    github: '#',
    live: '#',
  },
  {
    title: 'E-Summit 2026',
    description:
      'Platform with dynamic event pages, OAuth authentication, and real-time features during a high traffic live event.',
    tech: ['Next.js', 'Supabase', 'TypeScript', 'Websocket','PostgreSQL'],
    metric: '11K+ page views',
    github: '#',
    live: '#',
  },
  {
    title: 'RoboSaga',
    description:
      'Competition platform with structured event data and scalable APIs built for robotics competitions.',
    tech: ['Next.js', 'PostgreSQL', 'Drizzle ORM'],
    metric: 'Scalable APIs',
    github: '#',
    live: '#',
  },
  {
    title: 'MetaMind',
    description:
      'Full stack blogging platform with authentication, role-based access, image uploads, and REST API architecture.',
    tech: ['Next.js', 'MongoDB'],
    metric: 'Full RBAC',
    github: '#',
    live: '#',
  },
]

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-3xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
          Projects
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          Production systems, not toy apps.
        </h2>
      </motion.div>

      {/* Metrics banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10 grid grid-cols-3 gap-4"
      >
        {[
          { value: '11,000+', label: 'Users served' },
          { value: '8,000+', label: 'Live participants' },
          { value: 'Multiple', label: 'High traffic deploys' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 text-center"
          >
            <div className="text-xl font-bold text-[var(--metric-accent)] sm:text-2xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs text-[var(--text-tertiary)]">
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
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="card group rounded-xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {project.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--metric-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--metric-accent)]">
                    <Users className="h-3 w-3" />
                    {project.metric}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-[var(--badge-border)] bg-[var(--badge-bg)] px-2 py-0.5 text-xs text-[var(--text-tertiary)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1 shrink-0">
                <a
                  href={project.github}
                  className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={project.live}
                  className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-16 h-px bg-[var(--border)]" />
    </section>
  )
}
