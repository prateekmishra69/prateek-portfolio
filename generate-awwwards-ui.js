const fs = require('fs');
const path = require('path');

const writeFileSync = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
};

// 1. New Hero Component (Personal Brand Style)
const heroContent = `'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Play } from 'lucide-react';
import { portfolio } from '@/data/portfolio';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center justify-between h-full">
        
        {/* LEFT SIDE: Typography */}
        <motion.div 
          style={{ y: yText }}
          className="w-full lg:w-1/2 flex flex-col justify-center z-20 pt-10 lg:pt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-lg md:text-xl font-medium text-white/50 mb-4 tracking-wide uppercase">
              Hi, I'm
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl sm:text-8xl md:text-[120px] font-black leading-[0.85] tracking-tighter mb-6 text-white mix-blend-difference">
              PRATEEK
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D4D] via-[#F9CB28] to-[#7928CA]">
                MISHRA
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2 mb-10"
          >
            <p className="text-2xl md:text-3xl font-bold text-white/80 tracking-tight">Full Stack Developer</p>
            <p className="text-2xl md:text-3xl font-bold text-white/60 tracking-tight">Cloud Engineer</p>
            <p className="text-2xl md:text-3xl font-bold text-white/40 tracking-tight">AI Enthusiast</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <a 
              href="#projects"
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden flex items-center gap-2"
            >
              <div className="absolute inset-0 bg-[#FF4D4D] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">View Projects</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform duration-500 group-hover:text-white" />
            </a>
            
            <a 
              href="/resume/Prateek_Mishra_Resume.pdf"
              target="_blank"
              className="group px-8 py-4 bg-white/5 border border-white/20 text-white hover:bg-white/10 font-bold rounded-full flex items-center gap-2 transition-all duration-300 backdrop-blur-md"
            >
              <span>Resume</span>
              <Download size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Large Portrait */}
        <motion.div 
          style={{ 
            y: yImage,
            rotateX: mousePosition.y * -0.5,
            rotateY: mousePosition.x * 0.5,
          }}
          className="w-full lg:w-1/2 h-[50vh] lg:h-screen absolute lg:relative bottom-0 lg:bottom-auto opacity-40 lg:opacity-100 flex items-end lg:items-center justify-center lg:justify-end z-0 lg:z-20 pointer-events-none"
        >
          <div className="relative w-[120%] lg:w-[150%] max-w-[800px] aspect-square lg:-mr-32">
            {/* The Cutout Portrait */}
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="/images/prateek-profile.png"
              alt="Prateek Mishra"
              className="w-full h-full object-contain object-bottom lg:object-center drop-shadow-[0_0_50px_rgba(255,77,77,0.3)]"
            />
            {/* Portrait Glows */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#FF4D4D]/20 blur-[100px] -z-10 rounded-full" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#7928CA]/30 blur-[100px] -z-10 rounded-full" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
`;
writeFileSync('src/components/hero/Hero.tsx', heroContent);

// 2. Animated Gradient Mesh Background
const gradientMeshContent = `'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GradientMesh = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#050505]">
      {/* Animated Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#FF4D4D]/10 blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, 150, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#F9CB28]/10 blur-[150px]"
      />
      
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[#7928CA]/15 blur-[130px]"
      />

      {/* Noise Overlay for cinematic feel */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ backgroundImage: \`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")\` }}
      />
    </div>
  );
};

export default GradientMesh;
`;
writeFileSync('src/components/ui/GradientMesh.tsx', gradientMeshContent);

// 3. Upgrade ProjectCard for 3D Tilt
const projectCardContent = `'use client';

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

  const transform = useMotionTemplate\`rotateX(\${mouseYSpring}deg) rotateY(\${mouseXSpring}deg)\`;

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
`;
writeFileSync('src/components/projects/ProjectCard.tsx', projectCardContent);

// 4. Update Navigation
const navContent = `'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-500 \${
          isScrolled ? 'bg-black/50 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'
        }\`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <a href="#" className="text-2xl font-black text-white tracking-tighter">
            PM<span className="text-[#FF4D4D]">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-bold tracking-widest uppercase text-white/60 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact"
              className="px-6 py-2 rounded-full border border-white/20 text-white text-sm font-bold hover:bg-white hover:text-black transition-all duration-300"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col p-6"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black text-white hover:text-[#FF4D4D] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
`;
writeFileSync('src/components/ui/Navigation.tsx', navContent);

// 5. Setup Lenis in Layout
const layoutContent = `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import GradientMesh from "@/components/ui/GradientMesh";
import PortfolioAssistant from "@/components/chatbot/PortfolioAssistant";
import Navigation from "@/components/ui/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prateek Mishra | Creative Developer",
  description: "Portfolio of Prateek Mishra - Full Stack Developer and AI Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={\`\${inter.className} bg-black text-white antialiased min-h-screen selection:bg-[#FF4D4D] selection:text-white\`}>
        <GradientMesh />
        <CustomCursor />
        <ScrollProgress />
        <Navigation />
        
        {children}
        
        <PortfolioAssistant />
      </body>
    </html>
  );
}
`;
writeFileSync('src/app/layout.tsx', layoutContent);

console.log('Awwwards-quality redesign successfully generated!');
