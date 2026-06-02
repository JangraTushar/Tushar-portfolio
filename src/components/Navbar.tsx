import React, { useState, useEffect } from "react";
import { Menu, X, Terminal, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Resume", href: "#resume" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Background and shadow dynamic styling
      setIsScrolled(window.scrollY > 20);

      // Scroll Progress computation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Active section mapping based on scroll position
      const scrollPosition = window.scrollY + 120;
      for (const item of NAV_ITEMS) {
        const id = item.href.slice(1);
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(href.slice(1));
    if (element) {
      const topOffset = element.offsetTop - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl border-b border-white/20 dark:border-white/5 shadow-lg shadow-indigo-100/5 dark:shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center gap-2 font-display font-bold text-xl text-zinc-900 dark:text-white hover:text-indigo-605 dark:hover:text-indigo-400 transition-colors"
            >
              <Terminal className="w-5 h-5 text-indigo-550 dark:text-indigo-400" />
              <span>
                Tushar<span className="text-indigo-550 dark:text-indigo-400 font-medium">.J</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-7">
              <div className="flex gap-1.5">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      activeSection === item.href
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30 font-semibold"
                        : "text-zinc-650 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="border-l border-zinc-200 dark:border-zinc-800 h-6" />
              <ThemeToggle />
            </div>

            {/* Mobile Actions Selector */}
            <div className="lg:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                id="hamburger-btn"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 bg-white/40 dark:bg-zinc-900/40 border border-white/20 dark:border-white/5 hover:bg-zinc-100/50 dark:hover:bg-zinc-805 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden bg-white/85 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg"
            >
              <div className="px-3 pt-2 pb-6 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-all ${
                      activeSection === item.href
                        ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40"
                        : "text-zinc-650 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full hover:shadow-xl cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transition-transform z-40 group focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Back to Top Scroll button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
