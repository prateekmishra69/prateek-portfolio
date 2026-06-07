'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { MagneticButton } from '../ui/MagneticButton';

const ContactForm = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Client Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setErrorMessage('All fields are required.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/60 pl-1">Name</label>
          <input 
            suppressHydrationWarning
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required 
            placeholder="John Doe"
            className="w-full bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 rounded-xl px-5 py-3 text-white placeholder-white/30 outline-none transition-all duration-300"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/60 pl-1">Email</label>
          <input 
            suppressHydrationWarning
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
            placeholder="john@example.com"
            className="w-full bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 rounded-xl px-5 py-3 text-white placeholder-white/30 outline-none transition-all duration-300"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/60 pl-1">Subject</label>
        <input 
          suppressHydrationWarning
          type="text" 
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required 
          placeholder="Project Inquiry"
          className="w-full bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 rounded-xl px-5 py-3 text-white placeholder-white/30 outline-none transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white/60 pl-1">Message</label>
        <textarea 
          suppressHydrationWarning
          name="message"
          value={formData.message}
          onChange={handleChange}
          required 
          rows={5}
          placeholder="How can we collaborate?"
          className="w-full bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 rounded-xl px-5 py-3 text-white placeholder-white/30 outline-none transition-all duration-300 resize-none"
        ></textarea>
      </div>

      {status === 'error' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-[#FF4D4D] text-sm bg-[#FF4D4D]/10 border border-[#FF4D4D]/20 p-3 rounded-lg flex items-center gap-2"
        >
          <AlertCircle size={16} />
          {errorMessage}
        </motion.div>
      )}

      {status === 'success' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-green-400 text-sm bg-green-400/10 border border-green-400/20 p-3 rounded-lg flex items-center gap-2"
        >
          <CheckCircle size={16} />
          Message sent successfully.
        </motion.div>
      )}

      <MagneticButton 
        variant="primary" 
        className="w-full py-4 text-lg mt-4 disabled:opacity-50 disabled:pointer-events-none"
        disabled={status === 'loading'}
      >
        {status === 'idle' && <><Send size={20} /> Send Message</>}
        {status === 'loading' && <><Loader2 size={20} className="animate-spin" /> Sending...</>}
        {status === 'success' && <><CheckCircle size={20} className="text-green-400" /> Sent Successfully</>}
        {status === 'error' && <><Send size={20} /> Try Again</>}
      </MagneticButton>
    </form>
  );
};

export default ContactForm;
