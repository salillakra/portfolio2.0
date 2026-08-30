import { motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export function PageFade({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const skipEntrance = useRef(true);

  useEffect(() => {
    skipEntrance.current = false;
  }, []);

  return (
    <motion.div
      key={pathname}
      initial={skipEntrance.current ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
