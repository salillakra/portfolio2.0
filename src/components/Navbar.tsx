import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#stack" },
  { label: "Work", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
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
  const sharedClass = `rounded-full px-4 py-2 text-[13px] no-underline transition-colors ${
    active
      ? "font-semibold text-(--text-primary)"
      : "font-medium text-(--text-tertiary)"
  }  hover:text-(--text-primary) ${className}`;

  if (href.startsWith("/") && !href.includes("#") && !href.includes(".")) {
    return (
      <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
        <Link to={href} onClick={onClick} className={sharedClass}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={sharedClass}
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const workActive = pathname.startsWith("/projects");
  const blogActive = pathname.startsWith("/blog");

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

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.nav
      initial={{ y: -24 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.6 }}
      className="fixed top-3 right-3 left-3 z-40"
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between overflow-hidden rounded-full border border-(--border) bg-(--nav-bg) px-4 py-3 shadow-[0_16px_50px_rgba(0,0,0,0.12)] backdrop-blur-2xl sm:px-5">
        <motion.div
          whileHover={{ y: -1, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to="/"
            className="relative z-10 rounded-full bg-(--accent) px-2 py-2 text-sm font-semibold tracking-[0.18em] text-(--accent-text) no-underline uppercase"
          >
            SL
          </Link>
        </motion.div>

        <div
          className="relative z-10 hidden items-center gap-1 rounded-full border border-(--border) bg-(--surface) p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] md:flex"
          onMouseLeave={() => setHoveredLink(null)}
        >
          <div
            className="relative flex h-full items-center justify-center px-1"
            onMouseEnter={() => setHoveredLink("/blog")}
          >
            <NavPill
              href="/blog"
              active={blogActive}
              className="py-2.5 text-(--text-primary) hover:text-(--text-secondary)"
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
              className="relative flex h-full items-center justify-center px-1"
              onMouseEnter={() => setHoveredLink(link.label)}
            >
              <NavPill
                href={link.href}
                active={link.href === "/projects" && workActive}
                className="py-2.5 text-(--text-tertiary) hover:text-(--text-secondary)"
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
          <motion.button
            onClick={() => setOpen(!open)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-(--border) bg-(--surface) text-(--text-primary) shadow-[0_6px_18px_rgba(0,0,0,0.08)] md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <List className="h-4 w-4" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as const }}
            className="mx-auto mt-2 overflow-hidden rounded-3xl border border-(--border) bg-(--nav-bg) shadow-[0_16px_50px_rgba(0,0,0,0.12)] backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-3 py-3">
              <NavPill
                href="/blog"
                onClick={() => setOpen(false)}
                active={blogActive}
                className="rounded-2xl px-4 py-3 text-sm text-(--text-primary)"
              >
                Blog
              </NavPill>
              {navLinks.map((link) => (
                <NavPill
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  active={link.href === "/projects" && workActive}
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
