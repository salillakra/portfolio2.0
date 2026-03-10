import { ThemeToggle } from './ThemeToggle'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 backdrop-blur-xl bg-[var(--nav-bg)] border-b border-[var(--border)]"
    >
      <a href="/" className="text-sm font-semibold tracking-tight text-[var(--text-primary)] no-underline">
        SL
      </a>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[13px] font-medium text-[var(--text-tertiary)] no-underline hover:text-[var(--text-primary)] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      <ThemeToggle />
    </motion.nav>
  )
}
