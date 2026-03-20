"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface TransitionWrapperProps {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}

export function TransitionWrapper({
  children,
  direction = "right",
  delay = 0,
  className = "",
}: TransitionWrapperProps) {
  const isLeft = direction === "left";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isLeft ? -50 : 50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: isLeft ? 50 : -50,
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SlideTransitionProps {
  currentSlideId: string;
  children: ReactNode;
  className?: string;
}

export function SlideTransition({
  currentSlideId,
  children,
  className = "",
}: SlideTransitionProps) {
  return (
    <motion.div
      key={currentSlideId}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerChildren = 0.1,
  delayChildren = 0,
  className = "",
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
