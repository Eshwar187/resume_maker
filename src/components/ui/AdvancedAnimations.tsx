'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, ReactNode, useState } from 'react';

// Magnetic button effect
interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const MagneticButton = ({ children, className = '', onClick, disabled }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const button = ref.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    
    const button = ref.current;
    if (button) {
      button.style.transform = 'translate(0px, 0px)';
    }
  };

  return (
    <motion.button
      ref={ref}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%', skewX: -15 }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      {children}
    </motion.button>
  );
};

// Floating cards effect
interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const FloatingCard = ({ children, className = '', delay = 0 }: FloatingCardProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: { 
          delay,
          duration: 0.8,
          type: "spring",
          stiffness: 100
        }
      }}
      whileHover={{ 
        y: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {children}
    </motion.div>
  );
};

// Reveal animation
interface RevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const Reveal = ({ children, direction = 'up', delay = 0, className = '' }: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      scale: 0.8,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Particle background with fixed values to prevent hydration mismatch
export const ParticleBackground = () => {
  const [isClient, setIsClient] = useState(false);
  const particles = Array.from({ length: 50 }, (_, i) => i);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30"
            style={{
              left: `${(particle * 2.5) % 100}%`,
              top: `${(particle * 1.7) % 100}%`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        // Use deterministic values based on particle index
        const seedX = (particle * 2.5) % 100;
        const seedY = (particle * 1.7) % 100;
        const seedDuration = 15 + (particle % 10);
        
        return (
          <motion.div
            key={particle}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30"
            initial={{
              x: `${seedX}vw`,
              y: `${seedY}vh`,
            }}
            animate={{
              x: [`${seedX}vw`, `${(seedX + 20) % 100}vw`, `${seedX}vw`],
              y: [`${seedY}vh`, `${(seedY + 15) % 100}vh`, `${seedY}vh`],
            }}
            transition={{
              duration: seedDuration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'linear'
            }}
          />
        );
      })}
    </div>
  );
};

// Morphing blob with controlled animation to prevent hydration mismatch
interface MorphingBlobProps {
  className?: string;
  delay?: number;
}

export const MorphingBlob = ({ className = '', delay = 0 }: MorphingBlobProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`absolute blur-3xl opacity-30 ${className}`} />
    );
  }

  return (
    <motion.div
      className={`absolute blur-3xl opacity-30 ${className}`}
      initial={{
        scale: 1,
        rotate: 0,
        borderRadius: '60% 40% 30% 70%'
      }}
      animate={{
        scale: [1, 1.2, 0.8, 1],
        rotate: [0, 90, 180, 270, 360],
        borderRadius: ['60% 40% 30% 70%', '30% 60% 70% 40%', '60% 40% 30% 70%']
      }}
      transition={{
        delay,
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// Text animation with typewriter effect
interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedText = ({ text, className = '', delay = 0 }: AnimatedTextProps) => {
  const words = text.split(' ');

  return (
    <motion.div className={className}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + wordIndex * 0.1,
            duration: 0.6,
            type: "spring",
            stiffness: 100
          }}
        >
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: delay + wordIndex * 0.1 + charIndex * 0.03,
                duration: 0.3
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Glitch effect
interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText = ({ text, className = '' }: GlitchTextProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        textShadow: [
          '0 0 0 transparent',
          '2px 0 0 #ff0000, -2px 0 0 #00ff00',
          '0 0 0 transparent'
        ]
      }}
      transition={{ duration: 0.3, repeat: 2 }}
    >
      {text}
    </motion.div>
  );
};

// Loading skeleton with shimmer
export const ShimmerSkeleton = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-gray-200 ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
};

// 3D Card effect
interface Card3DProps {
  children: ReactNode;
  className?: string;
}

export const Card3D = ({ children, className = '' }: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`relative transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {children}
    </motion.div>
  );
};
