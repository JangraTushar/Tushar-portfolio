import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Sparkles, Terminal } from "lucide-react";

// Import separate JSON data files as requested
import aboutData from "./data/about.json";
import skillsData from "./data/skills.json";
import projectsData from "./data/projects.json";
import certificationsData from "./data/certifications.json";

// Import Types
import {
  AboutData,
  SkillCategory,
  ProjectItem,
  CertificationItem
} from "./types";

// Import Modular Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Resume from "./components/Resume";
import Footer from "./components/Footer";

// Cast JSON contents securely to compile-safe Types
const typedAbout = aboutData as AboutData;
const typedSkills = skillsData as SkillCategory[];
const typedProjects = projectsData as ProjectItem[];
const typedCerts = certificationsData as CertificationItem[];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(true);

  // Suppress loading screen after brief pre-render trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    // Track if screen is mobile to omit cursor follower (usability and performance optimization)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Track hover coordinates for interactive mouse trails on desktop
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-850 dark:text-zinc-100 font-sans transition-colors selection:bg-indigo-500/30 dark:selection:bg-indigo-500/40 relative">
      
      {/* Mesh Gradient Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[50%] bg-indigo-600/15 dark:bg-indigo-600/12 rounded-full blur-[130px] pointer-events-none animate-pulseGlow-1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[50%] bg-purple-600/15 dark:bg-purple-600/12 rounded-full blur-[130px] pointer-events-none animate-pulseGlow-2" />
        <div className="absolute top-[40%] right-[20%] w-[40%] h-[40%] bg-pink-500/10 dark:bg-pink-600/5 rounded-full blur-[120px] pointer-events-none animate-pulseGlow-3" />
      </div>

      {/* Interactive Cursor follower particle (Hidden on touch displays) */}
      {!isMobile && (
        <motion.div
          className="fixed w-6 h-6 rounded-full border border-indigo-400 bg-indigo-400/10 pointer-events-none z-50 mix-blend-exclusion"
          animate={{
            x: mousePos.x - 12,
            y: mousePos.y - 12,
            scale: 1
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 250,
            mass: 0.5
          }}
        />
      )}

      {/* Page Loader Initial Sequence */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="page-initial-loader"
            className="fixed inset-0 bg-zinc-950 z-50 flex flex-col items-center justify-center space-y-4"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute h-16 w-16 bg-cyan-500/10 rounded-full animate-ping duration-1000" />
              <div className="relative h-16 w-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400 shadow-xl">
                <Brain className="w-8 h-8 animate-pulse text-cyan-500" />
              </div>
            </div>
            <div className="space-y-1.5 text-center">
              <h3 className="text-white text-base font-bold font-display tracking-tight flex items-center gap-1.5 justify-center">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Compiler BootSequence...</span>
              </h3>
              <p className="text-zinc-500 text-xs font-mono">
                Allocating cognitive tensors
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Portfolio Content Stream */}
      {!loading && (
        <div className="flex flex-col min-h-screen">
          {/* Navigation Bar */}
          <Navbar />

          {/* Section Streams */}
          <main className="flex-grow">
            <Hero aboutData={typedAbout} />
            <About aboutData={typedAbout} />
            <Skills skillsData={typedSkills} />
            <Projects projectsData={typedProjects} />
            <Certifications certificationsData={typedCerts} />
            <Resume
              aboutData={typedAbout}
            />
          </main>

          {/* Page Footer */}
          <Footer aboutData={typedAbout} />
        </div>
      )}
    </div>
  );
}
