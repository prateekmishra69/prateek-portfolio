const fs = require('fs');
const path = require('path');

const writeFileSync = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
};

// 1. Contact Form Component
const contactFormContent = `'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/60 pl-1">Name</label>
          <input 
            type="text" 
            required 
            placeholder="John Doe"
            className="w-full bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 rounded-xl px-5 py-3 text-white placeholder-white/30 outline-none transition-all duration-300"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/60 pl-1">Email</label>
          <input 
            type="email" 
            required 
            placeholder="john@example.com"
            className="w-full bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 rounded-xl px-5 py-3 text-white placeholder-white/30 outline-none transition-all duration-300"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/60 pl-1">Subject</label>
        <input 
          type="text" 
          required 
          placeholder="Project Inquiry"
          className="w-full bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 rounded-xl px-5 py-3 text-white placeholder-white/30 outline-none transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/60 pl-1">Message</label>
        <textarea 
          required 
          rows={5}
          placeholder="How can we collaborate?"
          className="w-full bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 rounded-xl px-5 py-3 text-white placeholder-white/30 outline-none transition-all duration-300 resize-none"
        ></textarea>
      </div>

      <MagneticButton 
        variant="primary" 
        className="w-full py-4 text-lg mt-4 disabled:opacity-50 disabled:pointer-events-none"
      >
        {status === 'idle' && <><Send size={20} /> Send Message</>}
        {status === 'loading' && <><Loader2 size={20} className="animate-spin" /> Sending...</>}
        {status === 'success' && <><CheckCircle size={20} className="text-green-400" /> Sent Successfully</>}
        {status === 'error' && <><AlertCircle size={20} className="text-red-400" /> Error</>}
      </MagneticButton>
    </form>
  );
};

export default ContactForm;
`;
writeFileSync('src/components/contact/ContactForm.tsx', contactFormContent);

// 2. Contact Main Component
const contactContent = `'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import ContactForm from './ContactForm';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';

const Contact = () => {
  const { personalInfo, socialLinks } = portfolio;

  const contactMethods = [
    { icon: <Mail size={24} />, label: "Email", value: personalInfo.email, href: \`mailto:\${personalInfo.email}\` },
    { icon: <Phone size={24} />, label: "Phone", value: personalInfo.phoneNumber, href: \`tel:\${personalInfo.phoneNumber}\` },
    { icon: <MapPin size={24} />, label: "Location", value: personalInfo.location, href: null },
  ];

  const socialProfiles = [
    { name: "LinkedIn", url: socialLinks.linkedin, icon: <Linkedin size={20} /> },
    { name: "GitHub", url: socialLinks.github, icon: <Github size={20} /> },
    { name: "LeetCode", url: socialLinks.leetcode, icon: <ExternalLink size={20} /> },
    { name: "CodeChef", url: socialLinks.codechef, icon: <ExternalLink size={20} /> },
    { name: "Codolio", url: socialLinks.codolio, icon: <ExternalLink size={20} /> },
  ];

  return (
    <section id="contact" className="relative min-h-screen py-24 bg-[#030303] text-white overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-6"
          >
            Let's Work Together.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Contact Info */}
          <div className="lg:w-1/3 space-y-10">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              {contactMethods.map((method, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-sm text-white/50">{method.label}</p>
                    {method.href ? (
                      <a href={method.href} className="text-lg font-medium text-white/90 hover:text-primary transition-colors">
                        {method.value}
                      </a>
                    ) : (
                      <p className="text-lg font-medium text-white/90">{method.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10">
              <h3 className="text-xl font-semibold mb-6">Social Profiles</h3>
              <div className="flex flex-wrap gap-4">
                {socialProfiles.map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all text-white/70 hover:text-white"
                  >
                    {social.icon} {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-2/3 bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md"
          >
            <h3 className="text-2xl font-semibold mb-8">Send a Message</h3>
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
`;
writeFileSync('src/components/contact/Contact.tsx', contactContent);

// 3. AI Portfolio Assistant Component
const chatbotContent = `'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, Sparkles, Minus } from 'lucide-react';
import { portfolio } from '@/data/portfolio';

// Simple Intent Matching Logic based purely on portfolio.ts
const getBotResponse = (input: string) => {
  const query = input.toLowerCase();
  
  if (query.includes('hi') || query.includes('hello')) return "Hi there! I'm Prateek's AI Assistant. Ask me about his skills, projects, experience, or certifications!";
  if (query.includes('skill') || query.includes('technolog') || query.includes('stack')) return \`Prateek is skilled in \${portfolio.skills.programmingLanguages.join(', ')}. His frontend stack includes \${portfolio.skills.frontend.join(', ')} and backend includes \${portfolio.skills.backend.join(', ')}. He is also an \${portfolio.certifications[0].name}!\`;
  if (query.includes('project') || query.includes('build') || query.includes('made')) return \`Prateek has built several projects including \${portfolio.projects[0].name} and \${portfolio.projects[1].name}. Which one would you like to know more about?\`;
  if (query.includes('experience') || query.includes('intern') || query.includes('work')) return \`He recently worked as a \${portfolio.experience[0].role} at \${portfolio.experience[0].company} from \${portfolio.experience[0].duration}.\`;
  if (query.includes('certificat')) return \`He holds the \${portfolio.certifications[0].name} (Score: \${portfolio.certifications[0].score}), as well as certifications from MongoDB and Cambridge.\`;
  if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('hire')) return \`You can reach Prateek via email at \${portfolio.personalInfo.email} or call him at \${portfolio.personalInfo.phoneNumber}.\`;
  if (query.includes('about') || query.includes('who is')) return portfolio.aboutContent.professionalSummary;
  if (query.includes('education') || query.includes('college') || query.includes('university')) return \`He is currently pursuing his \${portfolio.education[0].degree} at \${portfolio.education[0].institution} (CGPA: \${portfolio.education[0].cgpa}).\`;

  return "I'm not quite sure. Try asking about his projects, skills, experience, or contact information!";
};

const PortfolioAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{role: 'bot'|'user', content: string}[]>([
    { role: 'bot', content: "Hello! I'm Prateek's AI Assistant. How can I help you learn more about his portfolio today?" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    // Simulate thinking delay
    setTimeout(() => {
      const response = getBotResponse(userMsg);
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform z-50 group"
          >
            <Bot size={28} />
            {/* Ping animation */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-30 group-hover:animate-ping"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1, height: isMinimized ? 'auto' : '500px' }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-full max-w-[350px] bg-black/80 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">AI Assistant</h4>
                  <p className="text-xs text-white/50">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <button onClick={() => setIsMinimized(!isMinimized)} className="hover:text-white transition-colors">
                  <Minus size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {messages.map((msg, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={idx}
                      className={\`flex items-end gap-2 \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}
                    >
                      {msg.role === 'bot' && (
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mb-1">
                          <Bot size={12} />
                        </div>
                      )}
                      
                      <div className={\`max-w-[80%] rounded-2xl px-4 py-2 text-sm \${msg.role === 'user' ? 'bg-primary text-black rounded-br-sm' : 'bg-white/10 text-white rounded-bl-sm'}\`}>
                        {msg.content}
                      </div>

                      {msg.role === 'user' && (
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 mb-1">
                          <User size={12} />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-white/5">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about my skills..."
                      className="w-full bg-black/50 border border-white/10 rounded-full pl-4 pr-12 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-primary transition-colors"
                    />
                    <button 
                      type="submit" 
                      disabled={!input.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black disabled:opacity-50 transition-opacity"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioAssistant;
`;
writeFileSync('src/components/chatbot/PortfolioAssistant.tsx', chatbotContent);

// 4. Custom Cursor Component
const cursorContent = `'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('magnetic')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-primary/50 rounded-full pointer-events-none z-[99] hidden md:block"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.8 }}
      />
    </>
  );
};

export default CustomCursor;
`;
writeFileSync('src/components/ui/CustomCursor.tsx', cursorContent);

// 5. Scroll Progress Component
const scrollProgressContent = `'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
`;
writeFileSync('src/components/ui/ScrollProgress.tsx', scrollProgressContent);

// 6. Floating Particles Component
const particlesContent = `'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = () => {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/5 backdrop-blur-md"
          style={{ width: p.size, height: p.size, left: \`\${p.x}%\`, top: \`\${p.y}%\` }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
`;
writeFileSync('src/components/ui/FloatingParticles.tsx', particlesContent);

// 7. Navigation Component
const navContent = `'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Profiles', href: '#coding-profiles' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-300 \${
          isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
        }\`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <a href="#" className="text-xl font-bold text-white tracking-tighter">
            Prateek<span className="text-primary">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact"
              className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-primary transition-colors"
            >
              Contact Me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col p-6"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2">
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold text-white/70 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-8 py-3 rounded-full bg-primary text-black text-xl font-bold mt-4"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
`;
writeFileSync('src/components/ui/Navigation.tsx', navContent);

// 8. Update layout.tsx
const layoutContent = `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingParticles from "@/components/ui/FloatingParticles";
import PortfolioAssistant from "@/components/chatbot/PortfolioAssistant";
import Navigation from "@/components/ui/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prateek Mishra | Full Stack Developer",
  description: "Portfolio of Prateek Mishra - AWS Certified Cloud Practitioner and AI & ML Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={\`\${inter.className} bg-black text-white antialiased min-h-screen\`}>
        <CustomCursor />
        <ScrollProgress />
        <FloatingParticles />
        <Navigation />
        
        {children}
        
        <PortfolioAssistant />
      </body>
    </html>
  );
}
`;
writeFileSync('src/app/layout.tsx', layoutContent);

// 9. Update page.tsx (Assemble Everything)
const pageContent = `import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Experience from "@/components/experience/Experience";
import Certifications from "@/components/certifications/Certifications";
import CodingProfiles from "@/components/codingProfiles/CodingProfiles";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <main className="relative z-10 w-full flex flex-col items-center overflow-x-hidden">
      <div className="w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <CodingProfiles />
        <Contact />
      </div>
    </main>
  );
}
`;
writeFileSync('src/app/page.tsx', pageContent);

console.log('Final UI, Layout, and Pages successfully generated!');
