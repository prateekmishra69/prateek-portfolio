'use client';

import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({
      x: middleX * 0.2,
      y: middleY * 0.2,
    });
  };

  const reset = () => {
    setPosition({
      x: 0,
      y: 0,
    });
  };

  const baseStyles =
    'relative px-6 py-3 rounded-full font-medium transition-colors overflow-hidden flex items-center justify-center gap-2';

  const variants = {
    primary: 'bg-white text-black hover:bg-white/90',
    secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md',
    outline:
      'border border-white/20 text-white hover:bg-white/10 backdrop-blur-md',
  };

  return (
    <motion.button
      suppressHydrationWarning={true}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default MagneticButton;