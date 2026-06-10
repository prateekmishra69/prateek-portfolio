'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import { SpotlightCard } from '../ui/SpotlightCard';
import dynamic from 'next/dynamic';
import { Terminal, Code2, Server, Database, Cloud, Wrench, ChevronRight } from 'lucide-react';

// Lazy load the Recharts radar to ensure high Lighthouse scores
const SkillsRadarChart = dynamic(() => import('./SkillsRadarChart'), { ssr: false });

const getCategoryIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('frontend')) return <Code2 className="w-6 h-6 text-cyan-400" />;
  if (t.includes('backend')) return <Server className="w-6 h-6 text-purple-400" />;
  if (t.includes('database')) return <Database className="w-6 h-6 text-emerald-400" />;
  if (t.includes('cloud')) return <Cloud className="w-6 h-6 text-blue-400" />;
  if (t.includes('tool')) return <Wrench className="w-6 h-6 text-orange-400" />;
  return <Terminal className="w-6 h-6 text-pink-400" />;
};

const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / value));
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === value) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [value, inView]);

  return <span ref={ref}>{count}</span>;
};

const Skills = () => {
  const { skills } = portfolio;
  const categories = Object.entries(skills);

  // Dynamic Data Calculation
  const totalSkills = categories.reduce((acc, [_, items]) => acc + items.length, 0);
  const maxCategoryLength = Math.max(...categories.map(([_, items]) => items.length));
  
  let primaryStack = "";
  let highestCount = 0;

  const radarData = categories.map(([key, items]) => {
    if (items.length > highestCount) {
      highestCount = items.length;
      primaryStack = key;
    }
    
    // Baseline logic: max items gets 100%, others are relative. Minimum floor 65% for visual balance.
    const calculatedStrength = Math.round((items.length / maxCategoryLength) * 35) + 65; 
    
    return {
      subject: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
      strength: calculatedStrength,
      fullMark: 100,
    };
  });

  const formatTitle = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        
        {/* TOP SUMMARY */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl 2xl:text-6xl font-black mb-8 tracking-tighter"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Technical Arsenal.</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between"
            >
              <div>
                <p className="text-white/50 text-sm uppercase tracking-wider mb-1">Total Technologies</p>
                <p className="text-4xl font-bold text-white"><AnimatedCounter value={totalSkills} />+</p>
              </div>
              <div className="p-4 rounded-full bg-cyan-500/20"><Terminal className="text-cyan-400" /></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between"
            >
              <div>
                <p className="text-white/50 text-sm uppercase tracking-wider mb-1">Core Categories</p>
                <p className="text-4xl font-bold text-white"><AnimatedCounter value={categories.length} /></p>
              </div>
              <div className="p-4 rounded-full bg-purple-500/20"><Server className="text-purple-400" /></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between"
            >
              <div>
                <p className="text-white/50 text-sm uppercase tracking-wider mb-1">Primary Strength</p>
                <p className="text-2xl font-bold text-white">{formatTitle(primaryStack)}</p>
              </div>
              <div className="p-4 rounded-full bg-orange-500/20"><Wrench className="text-orange-400" /></div>
            </motion.div>
          </div>
        </div>

        {/* MIDDLE: CATEGORY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {categories.map(([key, items], idx) => {
            const title = formatTitle(key);
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="h-full"
              >
                <SpotlightCard className="h-full p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl group hover:border-cyan-500/30 transition-colors duration-500">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 transition-all duration-500">
                        {getCategoryIcon(title)}
                      </div>
                      <h3 className="text-2xl font-bold text-white/90">{title}</h3>
                    </div>
                    <span className="text-white/30 text-sm">{items.length} Techs</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {items.map((skill: string, sIdx: number) => (
                      <div key={sIdx} className="relative group/badge">
                        <motion.span 
                          whileHover={{ scale: 1.05, rotate: 2 }}
                          className="flex items-center px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm font-medium transition-all cursor-crosshair hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                        >
                          {skill}
                        </motion.span>
                        {/* Tooltip */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                          <div className="px-3 py-1 bg-black/90 border border-white/10 text-white text-xs rounded whitespace-nowrap flex flex-col items-center shadow-xl">
                            <span className="font-bold text-cyan-400">{skill}</span>
                            <span className="text-white/50 text-[10px]">{title}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM: SKILLS ANALYTICS PANEL */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl p-8 lg:p-12 bg-[#0a0a0a] border border-white/10 overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex items-center gap-3 mb-10">
            <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full" />
            <h3 className="text-3xl font-bold text-white">Capability Matrix</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left: Animated Radar Chart */}
            <div className="h-[300px] md:h-[400px] w-full flex justify-center items-center">
              <SkillsRadarChart data={radarData} />
            </div>

            {/* Right: Progress Bars */}
            <div className="flex flex-col gap-6">
              {radarData.map((data, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80 font-medium flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-cyan-400" />
                      {data.subject}
                    </span>
                    <span className="text-cyan-400 text-sm font-bold">{data.strength}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${data.strength}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: idx * 0.1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 relative"
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[shine_1s_linear_infinite]" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
