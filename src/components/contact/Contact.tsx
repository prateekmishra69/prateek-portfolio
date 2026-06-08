'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import ContactForm from './ContactForm';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';

const Contact = () => {
  const { personalInfo, socialLinks } = portfolio;

  const contactMethods = [
    { icon: <Mail size={24} />, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: <Phone size={24} />, label: "Phone", value: personalInfo.phoneNumber, href: `tel:${personalInfo.phoneNumber}` },
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

      <div className="container mx-auto px-6 max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1800px] relative z-10">
        
        <div className="mb-20 2xl:mb-24 3xl:mb-32 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl 3xl:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-6"
          >
            Let's Work Together.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg 3xl:text-xl max-w-2xl 3xl:max-w-4xl mx-auto"
          >
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Contact Info */}
          <div className="lg:w-1/3 space-y-10 3xl:space-y-14">
            <div className="space-y-6 3xl:space-y-8">
              <h3 className="text-2xl 3xl:text-3xl font-semibold mb-6">Contact Information</h3>
              {contactMethods.map((method, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 3xl:w-16 3xl:h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                    {method.icon}
                  </div>
                  <div>
                    <p className="text-sm 3xl:text-base text-white/50">{method.label}</p>
                    {method.href ? (
                      <a href={method.href} className="text-lg 3xl:text-xl font-medium text-white/90 hover:text-primary transition-colors">
                        {method.value}
                      </a>
                    ) : (
                      <p className="text-lg 3xl:text-xl font-medium text-white/90">{method.value}</p>
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
            className="lg:w-2/3 bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 3xl:p-16 backdrop-blur-md"
          >
            <h3 className="text-2xl 3xl:text-3xl font-semibold mb-8 3xl:mb-12">Send a Message</h3>
            <ContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
