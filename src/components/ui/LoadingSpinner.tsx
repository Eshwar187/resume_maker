'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className={`absolute top-0 left-0 ${sizeClasses[size]} border-4 border-transparent border-t-blue-600 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      {text && (
        <motion.p
          className="text-gray-600 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

export function PulseLoader({ count = 3 }: { count?: number }) {
  return (
    <div className="flex space-x-2">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-blue-600 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
