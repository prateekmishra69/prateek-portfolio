const fs = require('fs');
const path = require('path');

const writeFileSync = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
};

// 1. Certifications Upgrade
const certContent = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Award, ExternalLink } from 'lucide-react';

const Certifications = () => {
  const { certifications } = portfolio;

  return (
    <section id="certifications" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black mb-16 tracking-tighter"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Certifications.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="h-full"
            >
              <SpotlightCard className="h-full p-8 flex flex-col backdrop-blur-xl group cursor-pointer hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-[#F9CB28] group-hover:scale-110 transition-all duration-300 mb-6">
                  <Award size={24} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                <p className="text-white/60 mb-4">{cert.organization}</p>
                
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40 uppercase tracking-wider">Date</span>
                    <span className="text-sm font-medium text-white/80">{cert.date}</span>
                  </div>
                  {cert.score && (
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-white/40 uppercase tracking-wider">Score</span>
                      <span className="text-sm font-bold text-[#F9CB28]">{cert.score}</span>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
`;
writeFileSync('src/components/certifications/Certifications.tsx', certContent);

// 2. Coding Profiles Upgrade
const profilesContent = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Code2, Terminal, ExternalLink, Trophy } from 'lucide-react';
import { FaGithub as GithubIcon } from 'react-icons/fa';

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
                    <span className="font-bold text-white group-hover:text-[#FF4D4D]">{profile.statValue}</span>
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
`;
writeFileSync('src/components/codingProfiles/CodingProfiles.tsx', profilesContent);

console.log('Unified UI 2 script successfully generated!');
