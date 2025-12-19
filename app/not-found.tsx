"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Home, Search, AlertTriangle, BookOpen, PenTool, Atom } from "lucide-react";

// --- MOCK LINK FOR PREVIEW (Replace with `import Link from 'next/link'` in your app) ---
const Link = ({ href, children, className }: any) => (
  <a href={href} className={className}>
    {children}
  </a>
);

// --- GLOBAL STYLES ---
const EdisonStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');
    body { font-family: 'Nunito', sans-serif; }
    
    .btn-3d {
      transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
      transform: translateY(0);
      border-bottom-width: 4px;
    }
    .btn-3d:active {
      transform: translateY(2px);
      border-bottom-width: 0px !important;
      margin-top: 2px;
      margin-bottom: 2px;
      filter: brightness(0.95);
    }
  `}</style>
);

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effect for background elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#fff] flex flex-col items-center justify-center p-4 relative overflow-hidden text-gray-700 selection:bg-[#4854F6] selection:text-white">
      <EdisonStyles />

      {/* --- Floating Background Debris (Parallax) --- */}
      <motion.div 
        animate={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div 
            animate={{ rotate: 360, y: [0, -20, 0] }} 
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute top-[15%] left-[10%] text-indigo-200"
        >
            <Atom size={140} strokeWidth={1} />
        </motion.div>
        
        <motion.div 
            animate={{ rotate: -15, y: [0, 30, 0] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[15%] text-indigo-200/50"
        >
            <BookOpen size={100} strokeWidth={1.5} />
        </motion.div>

        <motion.div 
            animate={{ rotate: 45, x: [0, 20, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[15%] text-purple-200"
        >
            <PenTool size={80} strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        
        {/* Animated 404 Illustration */}
        <div className="relative h-64 mb-8 flex items-center justify-center">
            {/* The "4"s */}
            <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: -120, opacity: 1 }}
                className="absolute text-9xl font-black text-[#4854F6] drop-shadow-[0_8px_0_#353EB5]"
            >
                4
            </motion.div>
            <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 120, opacity: 1 }}
                className="absolute text-9xl font-black text-[#4854F6] drop-shadow-[0_8px_0_#353EB5]"
            >
                4
            </motion.div>

            {/* The Scanning "0" (Magnifying Glass) */}
            <motion.div
                animate={{ 
                    x: [-40, 40, -40], 
                    rotate: [-10, 10, -10]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute z-20"
            >
                <div className="relative group">
                    {/* Glass Handle */}
                    <div className="absolute -bottom-10 -right-10 w-4 h-20 bg-gray-700 rounded-full transform -rotate-45 border-4 border-gray-800 z-0"></div>
                    
                    {/* Glass Rim */}
                    <div className="w-40 h-40 rounded-full border-[12px] border-gray-800 bg-blue-100/50 backdrop-blur-sm flex items-center justify-center shadow-xl relative overflow-hidden z-10">
                        {/* Reflection */}
                        <div className="absolute top-4 right-4 w-8 h-4 bg-white/60 rounded-full transform rotate-45"></div>
                        
                        {/* Searching Eyes inside the lens */}
                        <motion.div 
                            animate={{ x: [10, -10, 10], y: [5, -5, 5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex gap-4"
                        >
                            <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
                            <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Text Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-[2rem] border-4 border-indigo-50 shadow-xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full font-extrabold text-xs uppercase tracking-widest mb-4">
            <AlertTriangle size={16} />
            Error 404
          </div>
          
          <h1 className="text-4xl font-black text-gray-800 mb-4 tracking-tight">
            Class Dismissed?
          </h1>
          <p className="text-xl text-gray-500 font-bold mb-8 leading-relaxed max-w-lg mx-auto">
            This topic seems to have skipped class today. We've checked the entire syllabus, but this page is missing.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/dashboard" className="w-full sm:w-auto">
              <button className="btn-3d w-full sm:w-auto px-8 py-4 bg-[#4854F6] border-[#353EB5] text-white font-extrabold rounded-2xl uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-lg shadow-indigo-200 group">
                <Home size={20} strokeWidth={3} className="group-hover:-translate-y-1 transition-transform" />
                Back to Dashboard
              </button>
            </Link>
            
           
          </div>
        </motion.div>
      </div>
    </div>
  );
}