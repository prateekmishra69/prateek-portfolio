'use client';

import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface ProjectCardProps {
  project: any;
  onClick: () => void;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation (-10 to 10 degrees)
    const xPct = (mouseX / width - 0.5) * 20;
    const yPct = (mouseY / height - 0.5) * -20;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const transform = useMotionTemplate`rotateX(${mouseYSpring}deg) rotateY(${mouseXSpring}deg)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1000 w-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{ transformStyle: "preserve-3d", transform }}
        className="group relative flex flex-col rounded-3xl bg-black/40 border border-white/10 overflow-hidden cursor-pointer hover:border-white/30 transition-colors duration-500 w-full backdrop-blur-md"
      >
        {/* Glow Hover Effect Inside Card */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Image Showcase */}
        <div className="relative h-72 overflow-hidden bg-white/5 p-4 flex items-center justify-center">
          <motion.img 
            style={{ translateZ: "50px" }}
            src={project.projectImage} 
            alt={project.name} 
            className="w-full h-full object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Content Showcase */}
        <div className="p-8 flex flex-col flex-1 z-10" style={{ transformStyle: "preserve-3d" }}>
          <motion.h3 
            style={{ translateZ: "30px" }}
            className="text-3xl font-bold text-white mb-3 group-hover:text-[#FF4D4D] transition-colors"
          >
            {project.name}
          </motion.h3>
          <motion.p 
            style={{ translateZ: "20px" }}
            className="text-white/60 mb-6 flex-1 text-lg leading-relaxed line-clamp-2"
          >
            {project.shortDescription}
          </motion.p>

          <motion.div style={{ translateZ: "40px" }} className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.slice(0, 4).map((tech: string, idx: number) => (
              <span 
                key={idx}
                className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-white/80"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
