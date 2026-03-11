import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

const jobs = [
  {
    title: 'Full Stack Developer',
    company: 'Betiyan Nidhi Pvt. Ltd.',
    period: '2024 — Present',
    highlights: [
      'Built Android apps using React Native',
      'Designed scalable Node.js backend architecture',
      'Optimized database queries and API performance',
      'Structured databases for financial workflows',
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-3xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-(--text-tertiary)">
          Experience
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-(--text-primary) sm:text-3xl">
          Where I've worked.
        </h2>
      </motion.div>

      <div className="mt-12 space-y-6">
        {jobs.map((job, idx) => (
          <motion.div
            key={job.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="card rounded-xl p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-(--border) bg-(--badge-bg)">
                  <Briefcase className="h-4 w-4 text-(--text-tertiary)" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-(--text-primary)">
                    {job.title}
                  </h3>
                  <p className="text-sm text-(--text-secondary)">
                    {job.company}
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-(--text-tertiary) border border-(--border) rounded-full px-3 py-1 w-max">
                {job.period}
              </span>
            </div>

            <ul className="space-y-2.5 text-sm text-(--text-secondary)">
              {job.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-(--text-tertiary)" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-16 h-px bg-(--border)" />
    </section>
  )
}
