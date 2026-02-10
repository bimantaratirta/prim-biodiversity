"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  background?: "white" | "gray" | "dark";
}

const bgClasses = {
  white: "bg-white",
  gray: "bg-gray-50",
  dark: "bg-pertamina-dark text-white",
};

export default function SectionWrapper({
  id,
  children,
  className = "",
  background = "white",
}: SectionWrapperProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id={id} ref={ref} className={`${bgClasses[background]} ${className}`}>
      <motion.div
        className="section-container"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
