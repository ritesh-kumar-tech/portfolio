import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const motionConfig = {
  // Shared easing curves
  ease: [0.22, 1, 0.36, 1], // easeOutExpo
  gsapEase: "power3.out",
  
  // Standardized durations in seconds
  duration: {
    micro: 0.25,
    fast: 0.4,
    reveal: 0.7,
    slow: 1.0,
  },

  // Stagger intervals
  stagger: {
    fast: 0.08,
    medium: 0.12,
    slow: 0.2,
  },

  // Common motion variants
  variants: {
    fadeUp: {
      hidden: { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    },
  },
};

/**
 * Hook to check if the user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: reduce), (prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    } else {
      mediaQuery.addListener(listener);
      return () => mediaQuery.removeListener(listener);
    }
  }, []);

  return prefersReduced;
}
