'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, Sparkles, Minus } from 'lucide-react';
import { portfolio } from '@/data/portfolio';

// Simple Intent Matching Logic based purely on portfolio.ts
const getBotResponse = (input: string) => {
  const query = input.toLowerCase();
  
  if (query.includes('hi') || query.includes('hello')) return "Hi there! I'm Prateek's AI Assistant. Ask me about his skills, projects, experience, or certifications!";
  if (query.includes('skill') || query.includes('technolog') || query.includes('stack')) return `Prateek is skilled in ${portfolio.skills.programmingLanguages.join(', ')}. His frontend stack includes ${portfolio.skills.frontend.join(', ')} and backend includes ${portfolio.skills.backend.join(', ')}. He is also an ${portfolio.certifications[0].name}!`;
  if (query.includes('project') || query.includes('build') || query.includes('made')) return `Prateek has built several projects including ${portfolio.projects[0].name} and ${portfolio.projects[1].name}. Which one would you like to know more about?`;
  if (query.includes('experience') || query.includes('intern') || query.includes('work')) return `He recently worked as a ${portfolio.experience[0].role} at ${portfolio.experience[0].company} from ${portfolio.experience[0].duration}.`;
  if (query.includes('certificat')) return `He holds the ${portfolio.certifications[0].name} (Score: ${portfolio.certifications[0].score}), as well as certifications from MongoDB and Cambridge.`;
  if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('hire')) return `You can reach Prateek via email at ${portfolio.personalInfo.email} or call him at ${portfolio.personalInfo.phoneNumber}.`;
  if (query.includes('about') || query.includes('who is')) return portfolio.aboutContent.professionalSummary;
  if (query.includes('education') || query.includes('college') || query.includes('university')) return `He is currently pursuing his ${portfolio.education[0].degree} at ${portfolio.education[0].institution} (CGPA: ${portfolio.education[0].cgpa}).`;

  return "I'm not quite sure. Try asking about his projects, skills, experience, or contact information!";
};

const PortfolioAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{role: 'bot'|'user', content: string}[]>([
    { role: 'bot', content: "Hi, I'm Prateek's AI Assistant. Ask me about projects, skills, certifications, or experience." }
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
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/20 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,77,77,0.3)] hover:border-[#FF4D4D]/50 transition-all duration-500 z-50 group hover:scale-110"
          >
            <Bot size={28} className="text-white group-hover:text-[#FF4D4D] transition-colors" />
            
            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF4D4D] rounded-full border-2 border-black flex items-center justify-center">
               <span className="absolute inline-flex w-full h-full rounded-full bg-[#FF4D4D] opacity-75 animate-ping" />
            </div>

            {/* Custom periodic pulse ring */}
            <div className="absolute inset-0 rounded-full border border-[#FF4D4D]/50 scale-[1.2] opacity-0 animate-[pulse-ring_3s_cubic-bezier(0.215,0.61,0.355,1)_infinite]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1, height: isMinimized ? 'auto' : '500px' }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] md:w-full max-w-[380px] bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden z-[100]"
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
                      className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 mb-1">
                          <Bot size={14} />
                        </div>
                      )}
                      
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-white text-black rounded-br-sm' : 'bg-white/10 text-white rounded-bl-sm border border-white/5'}`}>
                        {msg.content}
                      </div>

                      {msg.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 mb-1 border border-white/10">
                          <User size={14} />
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
