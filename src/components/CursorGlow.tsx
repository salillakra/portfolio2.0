import { useEffect } from 'react'

export function CursorGlow() {
  useEffect(() => {
    let rafId = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        document.documentElement.style.setProperty('--mouse-x', `${lastX}px`)
        document.documentElement.style.setProperty('--mouse-y', `${lastY}px`)
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return <div className="cursor-glow" />
}
