import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion, motionConfig } from "../../motion-config";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleOnMount?: boolean;
  delay?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = "",
  scrambleOnMount = true,
  delay = 0,
  duration = 1.0,
  as = "h1",
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayText, setDisplayText] = useState(text);
  const [isRevealed, setIsRevealed] = useState(prefersReducedMotion);
  const containerRef = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !scrambleOnMount || !text) {
      setDisplayText(text);
      setIsRevealed(true);
      return;
    }

    let frameId: number;
    let startTime: number | null = null;
    const totalLength = text.length;
    const durationMs = duration * 1000;
    const delayMs = delay * 1000;

    const timeoutId = setTimeout(() => {
      setDisplayText(
        text
          .split("")
          .map((char) => (char === " " || char === "\n" ? char : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]))
          .join("")
      );

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(1, elapsed / durationMs);

        const revealedCount = Math.floor(progress * totalLength);

        let result = "";
        for (let i = 0; i < totalLength; i++) {
          if (text[i] === " " || text[i] === "\n") {
            result += text[i];
          } else if (i < revealedCount) {
            result += text[i];
          } else {
            result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
        }

        setDisplayText(result);

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setDisplayText(text);
          setIsRevealed(true);
        }
      };

      frameId = requestAnimationFrame(animate);
    }, delayMs);

    return () => {
      clearTimeout(timeoutId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [text, delay, duration, scrambleOnMount, prefersReducedMotion]);

  const Component = motion[as as keyof typeof motion] as any;

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component
      ref={containerRef}
      className={className}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionConfig.duration.fast, delay, ease: motionConfig.ease }}
    >
      <span className="inline-block">{displayText}</span>
    </Component>
  );
};
