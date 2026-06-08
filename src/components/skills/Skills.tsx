'use client';

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
      <div className="container mx-auto px-6 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px]">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl 2xl:text-6xl font-black mb-16 2xl:mb-20 3xl:mb-24 tracking-tighter"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Technical Arsenal.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-8 3xl:gap-12">
          {categories.map(([key, items], idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <SpotlightCard className="h-full p-8 2xl:p-10 3xl:p-12 backdrop-blur-xl">
                <h3 className="text-xl 2xl:text-2xl 3xl:text-3xl font-bold mb-6 3xl:mb-8 text-white/90">{formatTitle(key)}</h3>
                <div className="flex flex-wrap gap-3 2xl:gap-4">
                  {items.map((skill: string, sIdx: number) => (
                    <span 
                      key={sIdx}
                      className="px-4 py-2 3xl:px-6 3xl:py-3 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm 2xl:text-base 3xl:text-lg font-medium hover:bg-white/10 hover:border-white/20 hover:text-white transition-all cursor-default"
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
