'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useBackground } from '@/contexts/BackgroundContext';

export function BackgroundDisplay() {
  const { bgClass } = useBackground();

  return (
    <div className="fixed inset-0 z-[-50] pointer-events-none transition-all duration-700">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={bgClass}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={`absolute inset-0 w-full h-full ${bgClass}`}
        />
      </AnimatePresence>
    </div>
  );
}

export function BackgroundTrigger({ children, className = '', bgClass }) {
  const { setBgClass } = useBackground();
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' });

  useEffect(() => {
    if (isInView && bgClass) {
      setBgClass(bgClass);
    }
  }, [isInView, bgClass, setBgClass]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}
    </div>
  );
}
