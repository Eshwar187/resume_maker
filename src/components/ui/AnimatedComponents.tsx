'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const FadeInUp = ({ children, delay = 0, className = '' }: FadeInUpProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className={className}
  >
    {children}
  </motion.div>
);

interface SlideInLeftProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const SlideInLeft = ({ children, delay = 0, className = '' }: SlideInLeftProps) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6 }}
    className={className}
  >
    {children}
  </motion.div>
);

interface SlideInRightProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const SlideInRight = ({ children, delay = 0, className = '' }: SlideInRightProps) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.6 }}
    className={className}
  >
    {children}
  </motion.div>
);

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const ScaleIn = ({ children, delay = 0, className = '' }: ScaleInProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
    className={className}
  >
    {children}
  </motion.div>
);

interface StaggeredFadeInProps {
  children: ReactNode[];
  staggerDelay?: number;
  className?: string;
}

export const StaggeredFadeIn = ({ children, staggerDelay = 0.1, className = '' }: StaggeredFadeInProps) => (
  <div className={className}>
    {children.map((child, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * staggerDelay, duration: 0.6 }}
      >
        {child}
      </motion.div>
    ))}
  </div>
);

interface FloatingElementProps {
  children: ReactNode;
  duration?: number;
  distance?: number;
  className?: string;
}

export const FloatingElement = ({ children, duration = 3, distance = 10, className = '' }: FloatingElementProps) => (
  <motion.div
    animate={{
      y: [0, -distance, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={className}
  >
    {children}
  </motion.div>
);

interface PulseGlowProps {
  children: ReactNode;
  color?: string;
  duration?: number;
  className?: string;
}

export const PulseGlow = ({ children, color = '#3B82F6', duration = 2, className = '' }: PulseGlowProps) => (
  <motion.div
    animate={{
      boxShadow: [
        `0 0 0 0 ${color}40`,
        `0 0 0 10px ${color}00`,
        `0 0 0 0 ${color}40`,
      ],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={className}
  >
    {children}
  </motion.div>
);

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
}

export const Typewriter = ({ text, delay = 0, className = '' }: TypewriterProps) => {
  const letters = text.split('');

  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + index * 0.05,
            duration: 0.1
          }}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
};

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  gradient?: string;
}

export const GradientText = ({ children, className = '', gradient = 'from-blue-600 to-purple-600' }: GradientTextProps) => (
  <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const AnimatedCounter = ({ from, to, duration = 2, delay = 0, className = '' }: AnimatedCounterProps) => (
  <motion.span
    className={className}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.3 }}
  >
    <motion.span
      initial={{ y: from }}
      animate={{ y: to }}
      transition={{
        delay,
        duration,
        ease: "easeOut"
      }}
      onUpdate={(latest) => {
        const element = document.getElementById('counter');
        if (element) {
          element.textContent = Math.round(latest.y).toString();
        }
      }}
    >
      <span id="counter">{from}</span>
    </motion.span>
  </motion.span>
);
