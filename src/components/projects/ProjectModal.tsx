'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import { MagneticButton } from '../ui/MagneticButton';

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black/40 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-xl custom-scrollbar z-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-20 backdrop-blur-md"
            >
              <X size={20} />
            </button>

            {/* Header Image */}
            <div className="w-full h-64 md:h-80 relative overflow-hidden">
              <img 
                src={project.projectImage} 
                alt={project.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{project.name}</h2>
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
              
              {/* Main Column */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
                  <p className="text-white/70 leading-relaxed">{project.detailedDescription}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Challenges Solved</h3>
                  <p className="text-white/70 leading-relaxed">{project.challengesSolved}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-white/80">
                        <CheckCircle2 size={16} className="text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-white/50 font-semibold mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <a href={project.githubLink} target="_blank" rel="noreferrer" className="block">
                    <MagneticButton variant="secondary" className="w-full">
                      <Github size={18} /> View Source
                    </MagneticButton>
                  </a>
                  <a href={project.liveDemo} target="_blank" rel="noreferrer" className="block">
                    <MagneticButton variant="primary" className="w-full">
                      <ExternalLink size={18} /> Live Demo
                    </MagneticButton>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
