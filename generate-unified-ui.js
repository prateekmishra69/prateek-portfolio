const fs = require('fs');
const path = require('path');

const writeFileSync = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
};

// 1. Hero Component: Combines Huge Typography, Gradient Mesh, Talking Avatar, and TTS
const heroContent = `'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';
import { portfolio } from '@/data/portfolio';
import VoiceIntroduction from '../avatar/VoiceIntroduction';
import TalkingAvatar from '../avatar/TalkingAvatar';
import { MagneticButton } from '../ui/MagneticButton';

const Hero = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const { personalInfo, heroContent, socialLinks } = portfolio;
  
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Dim Background when Speaking */}
      <div className={\`absolute inset-0 z-0 transition-colors duration-1000 pointer-events-none \${isSpeaking ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent'}\`} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
        
        {/* LEFT SIDE: Typography & CTA */}
        <motion.div 
          style={{ y: yText }}
          className="w-full lg:w-[55%] flex flex-col justify-center z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-white/50 mb-4 tracking-wide">
              Hi, I'm
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-6 text-white mix-blend-difference">
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
            className="flex flex-col gap-2 mb-8"
          >
            <p className="text-xl md:text-2xl font-semibold text-white/80">{heroContent.headline}</p>
            <p className="text-lg text-white/50 max-w-lg leading-relaxed">{heroContent.subheadline}</p>
          </motion.div>

          {/* Action Buttons & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <div className="flex gap-4 w-full sm:w-auto">
              <a href="#projects" className="flex-1 sm:flex-none">
                <MagneticButton variant="primary" className="w-full">
                  <span>View Projects</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </a>
              
              <a href="/resume/Prateek_Mishra_Resume.pdf" target="_blank" className="flex-1 sm:flex-none">
                <MagneticButton variant="outline" className="w-full">
                  <Download size={18} />
                  <span>Resume</span>
                </MagneticButton>
              </a>
            </div>

            {/* Voice Intro Component */}
            <VoiceIntroduction isSpeaking={isSpeaking} setIsSpeaking={setIsSpeaking} />

            <div className="flex gap-4 ml-0 sm:ml-4 mt-4 sm:mt-0">
              <a href={socialLinks.github} target="_blank" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-[#FF4D4D] transition-colors"><Github size={20} /></a>
              <a href={socialLinks.linkedin} target="_blank" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-[#FF4D4D] transition-colors"><Linkedin size={20} /></a>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Talking Avatar Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-[45%] flex justify-center lg:justify-end z-20"
          onMouseEnter={() => setIsAvatarHovered(true)}
          onMouseLeave={() => setIsAvatarHovered(false)}
        >
          {/* Glassmorphism Frame for Avatar */}
          <div className="relative p-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4D4D]/20 to-[#7928CA]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-2xl -z-10" />
            <TalkingAvatar 
              imageUrl="/images/prateek-profile.png" 
              isSpeaking={isSpeaking} 
              className="w-[280px] sm:w-[350px] lg:w-[400px]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
`;
writeFileSync('src/components/hero/Hero.tsx', heroContent);

// 2. Global Mouse Tracking Wrapper (Linear Style Glows)
const spotlightCardContent = `'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={\`relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 \${className}\`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: \`radial-gradient(600px circle at \${position.x}px \${position.y}px, rgba(255,255,255,0.06), transparent 40%)\`,
        }}
      />
      {children}
    </div>
  );
};
`;
writeFileSync('src/components/ui/SpotlightCard.tsx', spotlightCardContent);

// 3. About Section Upgrade
const aboutContent = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import { SpotlightCard } from '../ui/SpotlightCard';

const About = () => {
  const { aboutContent } = portfolio;

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">My Story.</span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
            {aboutContent.professionalSummary}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aboutContent.storySections.map((section, idx) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
            >
              <SpotlightCard className="h-full p-8 md:p-10 backdrop-blur-xl">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#FF4D4D] transition-colors">{section.title}</h3>
                <p className="text-white/60 leading-relaxed text-lg">{section.content}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
`;
writeFileSync('src/components/about/About.tsx', aboutContent);

// 4. Skills Section Upgrade
const skillsContent = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import { SpotlightCard } from '../ui/SpotlightCard';

const Skills = () => {
  const { skills } = portfolio;
  const categories = Object.entries(skills);

  const formatTitle = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-16 tracking-tighter"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Technical Arsenal.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(([key, items], idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <SpotlightCard className="h-full p-8 backdrop-blur-xl">
                <h3 className="text-xl font-bold mb-6 text-white/90">{formatTitle(key)}</h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill: string, sIdx: number) => (
                    <span 
                      key={sIdx}
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm font-medium hover:bg-white/10 hover:border-white/20 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
`;
writeFileSync('src/components/skills/Skills.tsx', skillsContent);

// 5. Experience Upgrade
const experienceContent = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  const { experience } = portfolio;

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-16 tracking-tighter"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Experience.</span>
        </motion.h2>

        <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12 pb-8">
          {experience.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative pl-8 md:pl-12"
            >
              {/* Glowing Timeline Dot */}
              <div className="absolute -left-[21px] md:-left-[25px] top-2 p-2 bg-[#050505] border border-white/20 rounded-full">
                <div className="w-6 h-6 rounded-full bg-[#FF4D4D]/20 flex items-center justify-center">
                  <Briefcase size={12} className="text-[#FF4D4D]" />
                </div>
              </div>

              <SpotlightCard className="p-8 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <p className="text-lg text-[#F9CB28] font-medium">{exp.company}</p>
                  </div>
                  <span className="text-white/40 text-sm font-medium px-3 py-1 bg-white/5 rounded-full w-fit">
                    {exp.duration}
                  </span>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-2">Key Responsibilities</h4>
                    <ul className="list-disc list-inside text-white/70 space-y-1">
                      {exp.responsibilities.map((req, rIdx) => (
                        <li key={rIdx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
`;
writeFileSync('src/components/experience/Experience.tsx', experienceContent);

console.log('Unified UI script successfully generated!');
