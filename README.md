# Prateek Mishra - Premium Portfolio & Personal Brand

A cinematic, Awwwards-quality personal brand and developer portfolio built with modern web technologies. This project is designed to feel like a premium product launch page rather than a traditional developer portfolio, focusing on dynamic interactions, glassmorphism, and a robust "Voice Introduction" system.

## 🌟 Features

- **Talking Avatar & Voice Introduction:** An advanced Web Speech API implementation that syncs browser Text-to-Speech (TTS) with subtle avatar head/mouth movements and waveform visualizations. Built with robust auto-play fallback handling.
- **AI Assistant Chatbot:** A fully integrated, floating AI chatbot with pulse animations that answers questions about projects, experience, and contact info based on a central data hub.
- **Cinematic UI/UX:** Powered by Framer Motion, the site utilizes an `Aurora` gradient background, `SpotlightCards` with mouse-tracking glows, and smooth scroll animations.
- **Dynamic Coding Profiles:** Real-time animated counters displaying LeetCode and GitHub statistics.
- **Unified Design System:** A cohesive "dark luxury" theme inspired by Apple, Vercel, and Linear, utilizing deep blacks, subtle white borders, and vibrant `#FF4D4D` accents.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (with custom `@keyframes` & tokens)
- **Animations:** Framer Motion
- **Icons:** Lucide React & React Icons
- **Audio/Voice:** Web Speech API (Browser native)

## 📸 Screenshots

*(Screenshots coming soon after final deployment)*

## 🚀 Live Demo

*(Live demo link will be added here upon final launch)*

## 📦 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/prateek-portfolio.git
   cd prateek-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📂 Architecture Overview

All portfolio data is centralized in `src/data/portfolio.ts`. To update your skills, experience, or projects, simply edit this single file, and the entire website will dynamically reflect the changes.

- `/src/app` - Next.js page routing and global layouts
- `/src/components` - Modular React components (Hero, About, Chatbot, etc.)
- `/src/hooks` - Custom React hooks (e.g., `useTTS.ts` for voice management)
- `/src/data` - Centralized portfolio data source

---
*Designed & Built for Prateek Mishra.*
