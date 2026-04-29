import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function NavPill({
  href,
  children,
  active = false,
  onClick,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-full px-4 py-2 text-[13px] no-underline transition-colors ${
        active
          ? "font-semibold text-(--text-primary)"
          : "font-medium text-(--text-tertiary)"
      }  hover:text-(--text-primary) ${className}`}
    >
      {children}
    </motion.a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        if (currentY < 12) {
          setHidden(false);
        } else if (delta > 10) {
          setHidden(true);
        } else if (delta < -10) {
          setHidden(false);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      setHidden(false);
    }
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -24 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.6 }}
      className="fixed top-3 left-3 right-3 z-40"
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between overflow-hidden rounded-full border border-(--border) bg-(--nav-bg) px-4 py-3 shadow-[0_16px_50px_rgba(0,0,0,0.12)] backdrop-blur-2xl sm:px-5">
        <motion.a
          href="/"
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative z-10 rounded-full bg-(--accent) px-3.5 py-2 text-sm font-semibold tracking-[0.18em] text-(--accent-text) no-underline uppercase"
        >
          SL
        </motion.a>

        {/* Desktop links */}
        <div
          className="relative z-10 hidden md:flex items-center gap-1 rounded-full border border-(--border) bg-(--surface) p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
          onMouseLeave={() => setHoveredLink(null)}
        >
          <div
            className="relative flex items-center justify-center h-full px-1"
            onMouseEnter={() => setHoveredLink("/blog")}
          >
            <NavPill
              href="/blog"
              active
              className="text-(--text-primary) py-2.5 hover:text-(--text-secondary)"
            >
              Blog
            </NavPill>
            <AnimatePresence>
              {hoveredLink === "/blog" && (
                <motion.div
                  layoutId="nav-highlight"
                  className="absolute inset-0 -z-20 rounded-full bg-(--text-primary) opacity-5 dark:bg-(--text-primary) dark:opacity-10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 0.8,
                  }}
                />
              )}
            </AnimatePresence>
          </div>
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative flex items-center justify-center h-full px-1"
              onMouseEnter={() => setHoveredLink(link.label)}
            >
              <NavPill
                href={link.href}
                className="text-(--text-tertiary) hover:text-(--text-secondary) py-2.5"
              >
                {link.label}
              </NavPill>
              <AnimatePresence>
                {hoveredLink === link.label && (
                  <motion.div
                    layoutId="nav-highlight"
                    className="absolute inset-0 -z-20 rounded-full bg-(--text-primary) opacity-5 dark:bg-(--text-primary) dark:opacity-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      mass: 0.8,
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <ThemeToggle />
          {/* Mobile hamburger */}
          <motion.button
            onClick={() => setOpen(!open)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-(--border) bg-(--surface) text-(--text-primary) cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.08)]"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <List className="h-4 w-4" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
            className="md:hidden mx-auto mt-2 overflow-hidden rounded-3xl border border-(--border) bg-(--nav-bg) shadow-[0_16px_50px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
          >
            <div className="flex flex-col px-3 py-3 gap-1">
              <NavPill
                href="/blog"
                onClick={() => setOpen(false)}
                active
                className="rounded-2xl px-4 py-3 text-sm text-(--text-primary)"
              >
                Blog
              </NavPill>
              {navLinks.map((link) => (
                <NavPill
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-(--text-secondary) hover:text-(--text-primary)"
                >
                  {link.label}
                </NavPill>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
