import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      return "dark"; // Default to dark theme for premium developer feel
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 transition-colors backdrop-blur-md cursor-pointer group focus:outline-none focus:ring-2 focus:ring-cyan-500"
      aria-label="Toggle theme selector"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "backOut" }}
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
        )}
      </motion.div>
    </button>
  );
}
