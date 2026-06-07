'use client';

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
