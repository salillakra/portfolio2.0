import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function MagneticButton({
  children,
  className = '',
  href,
  variant = 'secondary',
}: {
  children: React.ReactNode
  className?: string
  href?: string
  variant?: 'primary' | 'secondary'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    setPosition({ x, y })
  }

  const reset = () => setPosition({ x: 0, y: 0 })

  const base =
    variant === 'primary'
      ? 'bg-(--accent) text-(--accent-text) hover:opacity-90'
      : 'bg-(--surface) text-(--text-primary) border border-(--border) hover:border-(--border-hover) hover:bg-(--surface-hover)'

  const Tag = href ? 'a' : 'button'

  return (
    <motion.div
      ref={ref}
      className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium cursor-pointer transition-all ${base} ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x * 0.1, y: position.y * 0.1 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Tag
        href={href || undefined}
        className="relative z-10 flex items-center justify-center gap-2 no-underline text-inherit w-full h-full"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </Tag>
    </motion.div>
  )
}
