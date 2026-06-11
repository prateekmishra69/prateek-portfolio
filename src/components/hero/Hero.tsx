'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';
import { portfolio } from '@/data/portfolio';
import VideoControls, { VideoStatus } from '../avatar/VideoControls';
import TalkingAvatar from '../avatar/TalkingAvatar';
import { MagneticButton } from '../ui/MagneticButton';

const Hero = () => {
  const [videoStatus, setVideoStatus] = useState<VideoStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const { personalInfo, heroContent, socialLinks } = portfolio;
  
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section id="hero" className="relative min-h-auto lg:min-h-screen flex items-start lg:items-center pt-16 lg:pt-24 pb-8 lg:pb-12 overflow-hidden">
      {/* Dim Background when Video Playing */}
      <div className={`absolute inset-0 z-0 transition-colors duration-1000 pointer-events-none ${videoStatus === 'playing' ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}`} />

      <div className="container mx-auto px-6 max-w-7xl xl:max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] relative z-10 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-0 lg:gap-16 2xl:gap-24 h-auto lg:h-full">
        
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
            <h1 className="text-[clamp(3.5rem,15vw,6rem)] md:text-8xl xl:text-8xl 2xl:text-9xl 3xl:text-[10rem] font-black leading-[0.85] md:leading-[0.9] tracking-tighter mb-4 md:mb-6 3xl:mb-10 text-white mix-blend-difference">
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
            className="flex flex-col gap-2 mb-6 lg:mb-8"
          >
            <p className="text-lg md:text-2xl 2xl:text-3xl 3xl:text-4xl font-semibold text-white/80">{heroContent.headline}</p>
            <p className="text-base md:text-lg 2xl:text-xl 3xl:text-2xl text-white/50 max-w-lg 2xl:max-w-2xl 3xl:max-w-3xl leading-relaxed">{heroContent.subheadline}</p>
          </motion.div>

          {/* Action Buttons & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 2xl:gap-8 3xl:gap-10 w-full"
          >
            <div className="flex flex-row justify-center sm:justify-start gap-3 w-full sm:w-auto">
              <a href="#projects" className="flex-1 sm:flex-none">
                <MagneticButton variant="primary" className="w-full justify-center">
                  <span>View Projects</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </a>
              
              <a href="/resume/Prateek_Mishra_Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                <MagneticButton variant="outline" className="w-full justify-center">
                  <Download size={18} />
                  <span>Resume</span>
                </MagneticButton>
              </a>
            </div>

            {/* Centered Socials perfectly under CTA on Mobile, beside CTA on Desktop */}
            <div className="flex justify-center sm:justify-start gap-4 w-full sm:w-auto mt-2 sm:mt-0 sm:ml-4">
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
          className="w-full lg:w-[45%] flex justify-center lg:justify-end lg:pr-16 xl:pr-24 z-20 mt-6 lg:mt-0"
          onMouseEnter={() => setIsAvatarHovered(true)}
          onMouseLeave={() => setIsAvatarHovered(false)}
        >
          <div className="flex flex-col items-center gap-3 lg:gap-6">
            {/* Glassmorphism Frame for Avatar */}
            <div className="relative p-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF4D4D]/20 to-[#7928CA]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-2xl -z-10" />
              <TalkingAvatar 
                imageUrl="/images/prateek-profile.jpg" 
                videoStatus={videoStatus}
                isMuted={isMuted}
                onVideoStatusChange={setVideoStatus}
                className="w-[220px] md:w-[320px] lg:w-[380px] xl:w-[450px] 2xl:w-[500px] 3xl:w-[600px]"
              />
            </div>
            
            {/* Video Control Button */}
            <div className="w-full flex justify-center">
              <VideoControls 
                status={videoStatus} 
                isMuted={isMuted}
                onPlayToggle={() => setVideoStatus(videoStatus === 'playing' ? 'idle' : 'playing')} 
                onMuteToggle={() => setIsMuted(!isMuted)}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
