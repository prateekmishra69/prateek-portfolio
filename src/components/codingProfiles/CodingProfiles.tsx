'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Code2, Terminal, ExternalLink, Trophy } from 'lucide-react';
import { FaGithub as GithubIcon } from 'react-icons/fa';

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "" }: { value: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const target = parseInt(value.replace(/[^0-9]/g, '')) || 0;

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    });
    
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, controls]);

  return (
    <motion.span initial={{ opacity: 0, y: 10 }} animate={controls}>
      {count}{suffix}
    </motion.span>
  );
};

const CodingProfiles = () => {
  const { codingProfiles } = portfolio;

  const profiles = [
    {
      ...codingProfiles.leetcode,
      icon: <Code2 size={32} />,
      statLabel: "Problems Solved",
      statValue: codingProfiles.leetcode.problemsSolved
    },
    {
      ...codingProfiles.codechef,
      icon: <Trophy size={32} />,
      statLabel: "Rating",
      statValue: codingProfiles.codechef.rating
    },
    {
      ...codingProfiles.github,
      icon: <GithubIcon size={32} />,
      statLabel: "Repositories",
      statValue: codingProfiles.github.repositories
    }
  ];

  return (
    <section id="coding-profiles" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-16 tracking-tighter"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Coding Profiles.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profiles.map((profile, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <a href={profile.url} target="_blank" rel="noreferrer" className="block h-full">
                <SpotlightCard className="h-full p-8 flex flex-col items-center text-center backdrop-blur-xl group hover:border-[#FF4D4D]/50 transition-colors duration-500">
                  <div className="text-white/60 group-hover:text-[#FF4D4D] group-hover:scale-110 transition-all duration-500 mb-6">
                    {profile.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{profile.platform}</h3>
                  <div className="mt-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#FF4D4D]/10 transition-colors">
                    <span className="text-sm text-white/60 mr-2">{profile.statLabel}:</span>
                    <span className="font-bold text-white group-hover:text-[#FF4D4D]">
                      {profile.statValue.includes('+') ? (
                        <AnimatedCounter value={profile.statValue} suffix="+" />
                      ) : (
                        profile.statValue
                      )}
                    </span>
                  </div>
                </SpotlightCard>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
