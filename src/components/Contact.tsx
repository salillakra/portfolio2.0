import { motion } from 'framer-motion'
import { MagneticButton } from './MagneticButton'
import { Send, Github, Linkedin, Instagram } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
          Let's build something.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-(--text-secondary) text-[15px] leading-relaxed">
          Currently open for new opportunities. Whether you have a question or
          just want to say hi — I'll get back to you.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <MagneticButton href="mailto:salillakra.dev@gmail.com" variant="primary">
            <Send className="h-4 w-4" />
            Send Message
          </MagneticButton>

          <MagneticButton href="https://github.com/salillakra">
            <Github className="h-4 w-4" />
            GitHub
          </MagneticButton>

          <MagneticButton href="https://linkedin.com/in/salillakra">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </MagneticButton>

          <MagneticButton href="https://instagram.com/salillakra">
            <Instagram className="h-4 w-4" />
            Instagram
          </MagneticButton>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-32 text-center">
        <p className="text-xs text-[var(--text-tertiary)]">
          © {new Date().getFullYear()} Salil Lakra. Built with TanStack Start.
        </p>
      </div>
    </section>
  )
}
