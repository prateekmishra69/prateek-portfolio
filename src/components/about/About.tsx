'use client';

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
