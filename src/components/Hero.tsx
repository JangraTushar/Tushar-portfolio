import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowRight, Download, BrainCircuit } from "lucide-react";
import { motion } from "motion/react";
import { AboutData } from "../types";

interface HeroProps {
  aboutData: AboutData;
}

export default function Hero({ aboutData }: HeroProps) {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const words = aboutData.titles;
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      const fullWord = words[titleIdx];
      
      if (!isDeleting) {
        setDisplayText(fullWord.substring(0, displayText.length + 1));
        if (displayText.length === fullWord.length) {
          setIsDeleting(true);
          clearInterval(ticker);
          setTimeout(() => {
            // Pause at the end of the word
            setIsDeleting(true);
          }, period);
        }
      } else {
        setDisplayText(fullWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTitleIdx((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 40 : 100);

    return () => clearInterval(ticker);
  }, [displayText, isDeleting, titleIdx, words]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 80;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-zinc-50/20 dark:bg-zinc-950/20 transition-colors"
    >
      {/* Background overlay blending */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-white dark:to-zinc-950/25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Explanatory Intro Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white font-display">
              Hi, I'm <span className="bg-gradient-to-r from-indigo-600 via-purple-650 to-indigo-500 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">{aboutData.name}</span>
            </h1>

            {/* Dynamic typing loop cursor block */}
            <div className="h-12 flex items-center justify-center lg:justify-start">
              <p className="text-xl sm:text-2xl font-mono text-zinc-650 dark:text-zinc-350">
                <span className="text-indigo-650 dark:text-indigo-400 font-bold border-r-2 border-indigo-500 dark:border-indigo-400 pr-1.5 animate-pulse">
                  {displayText || "\u00A0"}
                </span>
              </p>
            </div>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              {aboutData.tagline}
            </p>

            {/* Call to action trigger mechanisms */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-view-proj"
                onClick={() => handleScrollTo("projects")}
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-650 hover:from-indigo-550 hover:to-purple-600 hover:shadow-indigo-500/20 text-white font-medium text-sm transition-all hover:scale-103 shadow-lg cursor-pointer group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-contact"
                onClick={() => handleScrollTo("contact")}
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 font-medium text-sm text-zinc-800 dark:text-zinc-200 transition-all hover:scale-103 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm animate-pulseGlow"
              >
                Contact Me
              </button>

              <a
                id="hero-res-download"
                href="#resume"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo("resume");
                }}
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-900/60 bg-indigo-50/10 dark:bg-indigo-950/10 hover:bg-indigo-50/25 dark:hover:bg-indigo-950/20 font-medium text-sm text-indigo-600 dark:text-indigo-400 transition-all hover:scale-103 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Anchor Assets */}
            <div className="flex justify-center lg:justify-start gap-4 pt-6">
              <a
                id="hero-git"
                href={aboutData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-white/20 dark:border-white/8 bg-white/40 dark:bg-white/5 text-zinc-650 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white hover:bg-white hover:dark:bg-white/10 transition-all shadow-sm cursor-pointer hover:-translate-y-0.5 backdrop-blur-md"
                title="GitHub Feed"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                id="hero-linkedin"
                href={aboutData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-white/20 dark:border-white/8 bg-white/40 dark:bg-white/5 text-zinc-650 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white hover:dark:bg-white/10 transition-all shadow-sm cursor-pointer hover:-translate-y-0.5 backdrop-blur-md"
                title="LinkedIn Network"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                id="hero-mail"
                href={`mailto:${aboutData.socialLinks.email}`}
                className="p-3 rounded-xl border border-white/20 dark:border-white/8 bg-white/40 dark:bg-white/5 text-zinc-650 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white hover:dark:bg-white/10 transition-all shadow-sm cursor-pointer hover:-translate-y-0.5 backdrop-blur-md"
                title="Email Direct"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Hero Image Section - Glowing Frame Portrait on Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 sm:w-85 sm:h-85 md:w-96 md:h-96 group">
              {/* Outer double glowing boundaries */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 opacity-40 blur-md group-hover:opacity-65 transition-opacity-duration-300 animate-spin-slow duration-3000" />
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 opacity-20 blur-sm group-hover:opacity-45 transition duration-300" />

              {/* Inner Circle Frame Mask containing fallback mechanisms */}
              <div className="relative w-full h-full rounded-full bg-white/20 dark:bg-zinc-900/30 border-4 border-white/55 dark:border-white/15 overflow-hidden shadow-2xl flex items-center justify-center backdrop-blur-md">
                {/* Image element with a beautiful vector gradient alternative if the file is missing/yet to be updated */}
                <img
                  src={`${(import.meta as any).env.BASE_URL}profile/profile.jpg`}
                  onError={(e) => {
                    const target = e.currentTarget;
                    const base = (import.meta as any).env.BASE_URL;
                    if (!target.dataset.tried) {
                      target.dataset.tried = "png";
                      target.src = `${base}profile/profile.png`;
                    } else if (target.dataset.tried === "png") {
                      target.dataset.tried = "jpeg";
                      target.src = `${base}profile/profile.jpeg`;
                    } else if (target.dataset.tried === "jpeg") {
                      target.dataset.tried = "svg";
                      target.src = `${base}profile/avatar.svg`;
                    } else if (target.dataset.tried === "svg") {
                      target.dataset.tried = "unsplash";
                      target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80";
                    }
                  }}
                  alt={aboutData.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 hover:rotate-1"
                />
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
