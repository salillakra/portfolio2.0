import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import {
  PaperPlaneTilt,
  GithubLogo,
  LinkedinLogo,
  InstagramLogo,
  XLogo,
} from "@phosphor-icons/react";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-20 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-(--text-primary) sm:text-4xl">
          Let's build something.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-(--text-secondary) text-[15px] leading-relaxed">
          Currently open for new opportunities. Whether you have a question or
          just want to say hi — I'll get back to you.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticButton
            href="mailto:salillakra.dev@gmail.com"
            variant="primary"
          >
            <PaperPlaneTilt className="h-4 w-4" />
            Send Message
          </MagneticButton>

          <MagneticButton href="https://github.com/salillakra">
            <GithubLogo className="h-4 w-4" />
            GitHub
          </MagneticButton>

          <MagneticButton href="https://linkedin.com/in/salillakra">
            <LinkedinLogo className="h-4 w-4" />
            LinkedIn
          </MagneticButton>

          <MagneticButton href="https://instagram.com/officialsalillakra">
            <InstagramLogo className="h-4 w-4" />
            Instagram
          </MagneticButton>

          <MagneticButton href="https://x.com/salillakra223">
            <XLogo className="h-4 w-4" />
            Twitter
          </MagneticButton>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-20 sm:mt-32 text-center">
        <p className="text-xs text-(--text-tertiary)">
          © {new Date().getFullYear()} Salil Lakra. All rights reserved.
        </p>
      </div>
    </section>
  );
}
