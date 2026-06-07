'use client';

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
