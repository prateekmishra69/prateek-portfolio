'use client';

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
      <div className={`absolute inset-0 z-0 transition-colors duration-1000 pointer-events-none ${isSpeaking ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent'}`} />

      <div className="container mx-auto px-6 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 2xl:gap-24 3xl:gap-32 h-full">
        
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
            <h2 className="text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl font-semibold text-white/50 mb-4 3xl:mb-8 tracking-wide">
              Hi, I'm
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl 2xl:text-9xl 3xl:text-[10rem] font-black leading-[0.9] tracking-tighter mb-6 3xl:mb-10 text-white mix-blend-difference">
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
            <p className="text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl font-semibold text-white/80">{heroContent.headline}</p>
            <p className="text-lg 2xl:text-xl 3xl:text-2xl text-white/50 max-w-lg 2xl:max-w-2xl 3xl:max-w-3xl leading-relaxed">{heroContent.subheadline}</p>
          </motion.div>

          {/* Action Buttons & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6 2xl:gap-8 3xl:gap-10 3xl:mt-8"
          >
            <div className="flex gap-4 w-full sm:w-auto">
              <a href="#projects" className="flex-1 sm:flex-none">
                <MagneticButton variant="primary" className="w-full">
                  <span>View Projects</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </a>
              
              <a href="/resume/Prateek_Mishra_Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                <MagneticButton variant="outline" className="w-full">
                  <Download size={18} />
                  <span>Resume</span>
                </MagneticButton>
              </a>
            </div>

            <div className="flex gap-4 ml-0 sm:ml-4 mt-4 sm:mt-0">
              <a href={socialLinks.github} target="_blank" className="p-3 3xl:p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-[#FF4D4D] transition-colors"><Github className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-8 3xl:h-8" /></a>
              <a href={socialLinks.linkedin} target="_blank" className="p-3 3xl:p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-[#FF4D4D] transition-colors"><Linkedin className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-8 3xl:h-8" /></a>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: Talking Avatar Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="w-full lg:w-[45%] flex flex-col items-center lg:items-end justify-center z-20 gap-6 mt-8 lg:mt-0"
          onMouseEnter={() => setIsAvatarHovered(true)}
          onMouseLeave={() => setIsAvatarHovered(false)}
        >
          {/* Glassmorphism Frame for Avatar */}
          <div className="relative p-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4D4D]/20 to-[#7928CA]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-2xl -z-10" />
            <TalkingAvatar 
              imageUrl="/images/prateek-profile.jpg" 
              isSpeaking={isSpeaking} 
              className="w-[280px] sm:w-[350px] lg:w-[400px] 2xl:w-[500px] 3xl:w-[600px]"
            />
          </div>
          
          {/* Voice Intro Component (Meet Prateek) */}
          <div className="w-[280px] sm:w-[350px] lg:w-[400px] 2xl:w-[500px] 3xl:w-[600px] flex justify-center">
            <VoiceIntroduction onSpeakingChange={setIsSpeaking} />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
