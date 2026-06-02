import { Terminal, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { AboutData } from "../types";

interface FooterProps {
  aboutData: AboutData;
}

export default function Footer({ aboutData }: FooterProps) {
  
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 80;
      window.scrollTo({
        top,
        behavior: "smooth"
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer
      id="footer"
      className="bg-white/10 dark:bg-zinc-950/20 border-t border-white/20 dark:border-white/5 text-zinc-600 dark:text-zinc-400 py-12 transition-colors relative z-10 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 dark:border-white/5 pb-8 mb-8 text-center md:text-left">
          
          {/* Logo Name */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-900 dark:text-white font-display font-semibold text-lg">
              <Terminal className="w-4 h-4 text-indigo-500" />
              <span>{aboutData.name} Portfolio</span>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm">
              Deploying scalable neural models, multi-agent pipelines, and beautiful human-centric interfaces.
            </p>
          </div>

          {/* Navigation link list */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium">
            <button id="footer-nav-about" onClick={() => handleScrollToSection("about")} className="hover:text-zinc-900 dark:hover:text-white cursor-pointer select-none">About</button>
            <button id="footer-nav-skills" onClick={() => handleScrollToSection("skills")} className="hover:text-zinc-900 dark:hover:text-white cursor-pointer select-none">Skills</button>
            <button id="footer-nav-experience" onClick={() => handleScrollToSection("experience")} className="hover:text-zinc-900 dark:hover:text-white cursor-pointer select-none">Experience</button>
            <button id="footer-nav-projects" onClick={() => handleScrollToSection("projects")} className="hover:text-zinc-900 dark:hover:text-white cursor-pointer select-none">Projects</button>
            <button id="footer-nav-resume" onClick={() => handleScrollToSection("resume")} className="hover:text-zinc-900 dark:hover:text-white cursor-pointer select-none">Resume</button>
            <button id="footer-nav-contact" onClick={() => handleScrollToSection("contact")} className="hover:text-zinc-900 dark:hover:text-white cursor-pointer select-none">Contact</button>
          </div>

        </div>

        {/* Brand Copyright and Social panel */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          
          {/* Copyright description */}
          <div className="text-zinc-405 select-none text-center sm:text-left">
            <span>© {new Date().getFullYear()} Tushar Jangra. All Rights Reserved.</span>
            <span className="hidden sm:inline"> • </span>
            <span className="block sm:inline mt-1 sm:mt-0 italic text-[11px] text-zinc-500">Premium AI/ML Portfolio Stack</span>
          </div>

          {/* Social direct anchors */}
          <div className="flex gap-4">
            <a
              id="footer-git"
              href={aboutData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg border border-white/20 dark:border-white/10 bg-white/40 dark:bg-white/5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:-translate-y-0.5 transition-all cursor-pointer backdrop-blur-md"
              title="GitHub Account"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              id="footer-linkedin"
              href={aboutData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg border border-white/20 dark:border-white/10 bg-white/40 dark:bg-white/5 text-zinc-400 hover:text-indigo-500 hover:-translate-y-0.5 transition-all cursor-pointer backdrop-blur-md"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              id="footer-mail"
              href={`mailto:${aboutData.contactInfo.email}`}
              className="p-1.5 rounded-lg border border-white/20 dark:border-white/10 bg-white/40 dark:bg-white/5 text-zinc-400 hover:text-pink-500 hover:-translate-y-0.5 transition-all cursor-pointer backdrop-blur-md"
              title="Send Direct Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
