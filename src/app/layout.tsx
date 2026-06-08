import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import GradientMesh from "@/components/ui/GradientMesh";
import PortfolioAssistant from "@/components/chatbot/PortfolioAssistant";
import Navigation from "@/components/ui/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prateek Mishra | Full Stack Developer",
  description: "AWS Certified Cloud Practitioner | Full Stack Developer | AI & ML Enthusiast",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased min-h-screen selection:bg-[#FF4D4D] selection:text-white`}>
        <GradientMesh />
        <CustomCursor />
        <ScrollProgress />
        <Navigation />
        
        {children}
        
        <PortfolioAssistant />
      </body>
    </html>
  );
}
