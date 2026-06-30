"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  immediate?: boolean;
  stagger?: number;
}

export function WordReveal({ text, className, delay = 0, immediate = false, stagger = 0.07 }: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const active = immediate || isInView;

  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
          animate={active ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{ marginRight: "0.26em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
