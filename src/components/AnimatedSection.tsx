"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.5
}: AnimatedSectionProps) {
  // Determine animation offset based on direction
  const getOffset = () => {
    switch (direction) {
      case "up": return { y: 40 };
      case "down": return { y: -40 };
      case "left": return { x: 40 };
      case "right": return { x: -40 };
      default: return {};
    }
  };

  const initial = {
    opacity: 0,
    ...getOffset()
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0] // smooth cubic-bezier curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
