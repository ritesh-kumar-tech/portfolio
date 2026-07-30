import React from "react";
import { motion } from "motion/react";
import { motionConfig, usePrefersReducedMotion } from "../../motion-config";

// --- 1. SECTION FADE / SLIDE IN ---
interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  once?: boolean;
}

export const MotionSection: React.FC<MotionSectionProps> = ({
  children,
  className = "",
  delay = 0,
  id,
  once = true,
}) => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration: motionConfig.duration.reveal,
        delay,
        ease: motionConfig.ease,
      }}
    >
      {children}
    </motion.section>
  );
};

// --- 2. STAGGER CONTAINER ---
interface MotionStaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerInterval?: number;
  once?: boolean;
}

export const MotionStaggerGroup: React.FC<MotionStaggerGroupProps> = ({
  children,
  className = "",
  staggerInterval = 0.1,
  once = true,
}) => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerInterval,
            delayChildren: 0.05,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// --- 3. PROJECT CARD MOTION WRAPPER ---
interface MotionProjectCardProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export const MotionProjectCard: React.FC<MotionProjectCardProps> = ({
  children,
  className = "",
  index = 0,
}) => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 35, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: motionConfig.duration.fast,
            delay: index * 0.08,
            ease: motionConfig.ease,
          },
        },
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
    >
      {children}
    </motion.div>
  );
};

// --- 4. TECH STACK TILT / FAN-OUT CARD ---
interface MotionTechCardProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export const MotionTechCard: React.FC<MotionTechCardProps> = ({
  children,
  className = "",
  index = 0,
}) => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const tiltAngle = (index % 2 === 0 ? 1.5 : -1.5);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 25, rotate: tiltAngle }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: motionConfig.duration.fast,
        delay: index * 0.06,
        ease: motionConfig.ease,
      }}
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.2)",
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  );
};

// --- 5. TIMELINE ITEM MOTION ---
interface MotionTimelineItemProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
}

export const MotionTimelineItem: React.FC<MotionTimelineItemProps> = ({
  children,
  className = "",
  index = 0,
}) => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: motionConfig.duration.fast,
        delay: index * 0.1,
        ease: motionConfig.ease,
      }}
    >
      {children}
    </motion.div>
  );
};

// --- 6. BUTTON MICRO-INTERACTION WRAPPER ---
interface MotionButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: any) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  id?: string;
}

export const MotionButton: React.FC<MotionButtonProps> = ({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
  id,
}) => {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={className}
        disabled={disabled}
        id={id}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
      id={id}
      whileHover={{ scale: disabled ? 1 : 1.03, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      transition={{ duration: 0.18, ease: "easeInOut" }}
    >
      {children}
    </motion.button>
  );
};
