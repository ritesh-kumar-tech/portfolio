import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../../motion-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollPinnedRevealProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  pinDuration?: string | number; // e.g. "+=80%"
}

export const ScrollPinnedReveal: React.FC<ScrollPinnedRevealProps> = ({
  children,
  id,
  className = "",
  pinDuration = "+=60%",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced || !containerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const items = contentRef.current?.querySelectorAll("[data-scroll-reveal]");
      if (!items || items.length === 0) return;

      // Set initial state
      gsap.set(items, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top+=100",
          end: pinDuration,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      items.forEach((item, index) => {
        tl.to(
          item,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          index * 0.4
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [pinDuration, prefersReduced]);

  if (prefersReduced) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} id={id} className={`relative ${className}`}>
      <div ref={contentRef} className="w-full h-full">
        {children}
      </div>
    </div>
  );
};
