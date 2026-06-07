const fs = require('fs');
const path = require('path');

const writeFileSync = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
};

// 1. Certification Card Component
const certCardContent = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, Calendar, Target, ShieldCheck } from 'lucide-react';

interface CertificationCardProps {
  certification: any;
  index: number;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ certification, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white/[0.02] border border-white/10 hover:border-primary/50 hover:bg-white/[0.05] rounded-3xl p-8 transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      {/* Background Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:via-transparent group-hover:to-transparent rounded-3xl transition-all duration-500 blur-xl pointer-events-none" />

      {/* Header / Icon */}
      <div className="flex items-start justify-between mb-6 z-10 relative">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/50">
          <Award size={28} />
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-semibold">
          <ShieldCheck size={14} /> Verified
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 z-10 relative">
        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
          {certification.name}
        </h3>
        <p className="text-white/60 font-medium mb-6">
          {certification.organization}
        </p>

        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-white/50 text-sm">
            <Calendar size={16} />
            <span>Issued: {certification.date}</span>
          </div>
          {certification.score && (
            <div className="flex items-center gap-3 text-white/50 text-sm">
              <Target size={16} className="text-yellow-500/70" />
              <span>Score: <strong className="text-white/80">{certification.score}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto z-10 relative">
        <a 
          href={certification.credentialUrl} 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full transition-colors w-full justify-center group/btn"
        >
          View Credential 
          <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};

export default CertificationCard;
`;
writeFileSync('src/components/certifications/CertificationCard.tsx', certCardContent);

// 2. Certifications Component
const certsContent = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import CertificationCard from './CertificationCard';

const Certifications = () => {
  return (
    <section id="certifications" className="relative min-h-screen py-24 bg-black text-white overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
          >
            Certifications
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            Professional validations of my technical expertise and capabilities from industry-leading organizations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.certifications.map((cert, index) => (
            <CertificationCard 
              key={cert.name} 
              certification={cert} 
              index={index} 
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Certifications;
`;
writeFileSync('src/components/certifications/Certifications.tsx', certsContent);

// 3. Coding Profiles Component
const profilesContent = `'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import { Code2, Terminal, Github as GithubIcon, ExternalLink, Trophy } from 'lucide-react';

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "" }: { value: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  
  useEffect(() => {
    let start = 0;
    const end = numericValue;
    if (start === end) return;
    
    let totalDuration = 2000;
    let incrementTime = (totalDuration / end);
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [numericValue]);

  return <span>{count}{suffix}</span>;
};

const CodingProfiles = () => {
  const { codingProfiles } = portfolio;
  
  const profilesData = [
    {
      ...codingProfiles.leetcode,
      icon: <Code2 size={32} />,
      color: "from-yellow-500/20 to-orange-500/5",
      borderColor: "hover:border-yellow-500/50",
      accent: "text-yellow-500",
      statLabel: "Problems Solved",
      statValue: codingProfiles.leetcode.problemsSolved
    },
    {
      ...codingProfiles.codechef,
      icon: <Terminal size={32} />,
      color: "from-blue-500/20 to-cyan-500/5",
      borderColor: "hover:border-blue-500/50",
      accent: "text-blue-500",
      statLabel: "Highest Rating",
      statValue: codingProfiles.codechef.rating
    },
    {
      ...codingProfiles.github,
      icon: <GithubIcon size={32} />,
      color: "from-purple-500/20 to-pink-500/5",
      borderColor: "hover:border-purple-500/50",
      accent: "text-purple-500",
      statLabel: "Repositories Built",
      statValue: codingProfiles.github.repositories
    }
  ];

  return (
    <section id="coding-profiles" className="relative min-h-screen py-24 bg-[#050505] text-white">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 flex items-center justify-center gap-4"
          >
            <Trophy className="text-yellow-500 hidden md:block" size={40} /> Coding Profiles
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg max-w-2xl mx-auto"
          >
            My competitive programming journey and open-source contributions across various platforms.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {profilesData.map((profile, index) => (
            <motion.a
              href={profile.url}
              target="_blank"
              rel="noreferrer"
              key={profile.platform}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={\`group relative block overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 \${profile.borderColor} transition-all duration-500 p-8\`}
            >
              {/* Animated Background Gradient */}
              <div className={\`absolute inset-0 bg-gradient-to-br \${profile.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0\`} />
              
              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <div className={\`w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 \${profile.accent} group-hover:scale-110 transition-transform duration-500\`}>
                  {profile.icon}
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">
                  {profile.platform}
                </h3>
                
                <div className="mt-6 mb-8 w-full">
                  <div className="text-5xl font-black mb-2 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                    {profile.statValue.includes('+') ? (
                      <AnimatedCounter value={profile.statValue} suffix="+" />
                    ) : (
                      profile.statValue
                    )}
                  </div>
                  <div className="text-sm uppercase tracking-widest text-white/40 font-semibold">
                    {profile.statLabel}
                  </div>
                </div>

                <div className="mt-auto pt-6 w-full border-t border-white/10 flex items-center justify-center gap-2 text-white/50 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium">View Profile</span>
                  <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CodingProfiles;
`;
writeFileSync('src/components/codingProfiles/CodingProfiles.tsx', profilesContent);

console.log('Certifications and Coding Profiles generated!');
