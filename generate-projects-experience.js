const fs = require('fs');
const path = require('path');

const writeFileSync = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
};

// 1. Update portfolio.ts
const portfolioPath = path.join(__dirname, 'src/data/portfolio.ts');
let portfolioContent = fs.readFileSync(portfolioPath, 'utf-8');

const updatedProjectsData = `
  projects: [
    {
      name: "TradeX – Stock Trading Platform",
      shortDescription: "A full-stack stock trading platform with real-time portfolio management and profit/loss analytics.",
      detailedDescription: "TradeX is a comprehensive stock trading simulation platform built to provide users with a realistic trading experience. It features secure JWT authentication, dynamic watchlists, and an intuitive dashboard for tracking portfolio performance in real-time.",
      challengesSolved: "Implemented complex state management for real-time stock tracking and built scalable REST APIs capable of handling concurrent portfolio operations.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
      features: [
        "Authentication",
        "Portfolio Management",
        "Watchlists",
        "Stock Tracking",
        "Profit/Loss Analytics",
        "REST APIs"
      ],
      githubLink: "ADD_TRADEX_GITHUB_URL",
      liveDemo: "ADD_TRADEX_DEMO_URL",
      projectImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "NALCO Financial Analytics & AI Profit Prediction System",
      shortDescription: "An ML-based financial platform for forecasting enterprise profits using historical datasets.",
      detailedDescription: "Developed during my internship, this system leverages Machine Learning to predict NALCO's future profits. It utilizes Random Forest models coupled with extensive data preprocessing to provide accurate financial forecasting via an interactive Streamlit dashboard.",
      challengesSolved: "Engineered robust data pipelines for handling large-scale industrial datasets and optimized the Random Forest model for high-accuracy predictions.",
      technologies: ["Python", "Streamlit", "Scikit-learn", "Pandas", "NumPy"],
      features: [
        "Profit Forecasting",
        "Random Forest Prediction",
        "Financial Analytics",
        "Interactive Dashboard",
        "Data Visualization"
      ],
      githubLink: "https://github.com/prateekmishra69/nalco_ml_project",
      liveDemo: "https://nalco-ml-project.streamlit.app/",
      projectImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
    }
  ],`;

// Replace the projects array in portfolioContent
portfolioContent = portfolioContent.replace(/projects:\s*\[[\s\S]*?\]\,/m, updatedProjectsData + ',');
fs.writeFileSync(portfolioPath, portfolioContent);

// 2. Project Modal Component
const projectModalContent = `'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, CheckCircle2 } from 'lucide-react';
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
`;
writeFileSync('src/components/projects/ProjectModal.tsx', projectModalContent);

// 3. Project Card Component
const projectCardContent = `'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: any;
  onClick: () => void;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      className="group relative flex flex-col rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden cursor-pointer hover:border-white/30 transition-all duration-500"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden z-10">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img 
          src={project.projectImage} 
          alt={project.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>

      {/* Content Container */}
      <div className="p-8 flex flex-col flex-1 z-10">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
          {project.name}
        </h3>
        <p className="text-white/60 mb-6 flex-1 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.slice(0, 4).map((tech: string, idx: number) => (
            <span 
              key={idx}
              className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-white/70 border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-white/50 border border-white/5">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
`;
writeFileSync('src/components/projects/ProjectCard.tsx', projectCardContent);

// 4. Projects Main Component
const projectsContent = `'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <section id="projects" className="relative min-h-screen py-24 bg-black text-white">
      {/* Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-px w-12 bg-white/50"></div>
            <h2 className="text-sm uppercase tracking-widest text-white/50 font-semibold">Featured Work</h2>
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
          >
            Projects That Matter.
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {portfolio.projects.map((project, index) => (
            <ProjectCard 
              key={project.name} 
              project={project} 
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;
`;
writeFileSync('src/components/projects/Projects.tsx', projectsContent);

// 5. Experience Component
const experienceContent = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import { Briefcase, Building2, CheckCircle } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="relative min-h-screen py-24 bg-[#050505] text-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
          >
            Professional Experience
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2 hidden md:block"></div>
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:hidden"></div>

          {portfolio.experience.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative flex flex-col md:flex-row gap-8 md:gap-0 items-start md:items-center justify-between mb-16"
            >
              {/* Timeline Center Icon */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black border border-white/20 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <Briefcase size={20} className="text-white/80" />
              </div>

              {/* Left Side (Date & Company) */}
              <div className="md:w-1/2 md:pr-16 md:text-right pl-20 md:pl-0 w-full">
                <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-4 mt-2 md:mt-0">
                  {exp.duration}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{exp.company}</h3>
                <h4 className="text-lg text-primary font-medium flex items-center md:justify-end gap-2">
                  <Building2 size={18} />
                  {exp.role}
                </h4>
              </div>

              {/* Right Side (Details Card) */}
              <div className="md:w-1/2 md:pl-16 pl-20 w-full">
                <div className="bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all rounded-2xl p-6 backdrop-blur-md">
                  <h5 className="text-sm font-bold uppercase tracking-wider text-white/40 mb-4">Responsibilities & Achievements</h5>
                  <ul className="space-y-3">
                    {exp.responsibilities.slice(0, 3).map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-white/70">
                        <CheckCircle size={18} className="mt-0.5 shrink-0 text-white/30" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {exp.achievements.slice(0, 1).map((item: string, i: number) => (
                      <li key={\`ach-\${i}\`} className="flex items-start gap-3 text-white/90 font-medium">
                        <CheckCircle size={18} className="mt-0.5 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
`;
writeFileSync('src/components/experience/Experience.tsx', experienceContent);

console.log('Projects and Experience sections created!');
