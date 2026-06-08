'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
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
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/50 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] flex items-center justify-between transition-all duration-500">
          <a href="#" className="text-2xl font-black text-white tracking-tighter">
            PM<span className="text-[#FF4D4D]">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 2xl:gap-12 3xl:gap-16">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-bold tracking-widest uppercase text-white/60 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col p-6"
          >
            <div className="flex justify-end">
              <button onClick={() => setMobileMenuOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-black text-white hover:text-[#FF4D4D] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
