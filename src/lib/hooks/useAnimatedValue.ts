// Animated value hook — see prompts/13-data-layer.md
// TODO: Implement per prompt 02 (HeroSection needs this)

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export function useAnimatedValue(target: number, duration = 1500): number {
  const [value, setValue] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  // Return ref setter and value — caller needs to attach ref to element
  return value;
}

// Re-export ref hook for component usage
export { useInView } from "react-intersection-observer";
