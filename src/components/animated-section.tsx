"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedSection({ className, children }: { className: string; children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  // Keep the content readable for people who prefer reduced motion.
  return (
    <motion.section
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduceMotion ? 0 : 0.35 }}
    >
      {children}
    </motion.section>
  );
}
