import { BookOpen, Briefcase, GraduationCap, Laptop, Share2, Award } from "lucide-react";
import { motion } from "motion/react";
import { ExperienceItem } from "../types";

interface ExperienceProps {
  experienceData: ExperienceItem[];
}

export default function Experience({ experienceData }: ExperienceProps) {
  
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "research experience":
        return <GraduationCap className="w-5 h-5" />;
      case "freelancing":
        return <Laptop className="w-5 h-5" />;
      case "training":
        return <BookOpen className="w-5 h-5" />;
      case "workshops":
        return <Share2 className="w-5 h-5" />;
      default:
        return <Briefcase className="w-5 h-5" />;
    }
  };

  const getStyleTheme = (type: string) => {
    switch (type.toLowerCase()) {
      case "research experience":
        return {
          border: "border-cyan-550/20 dark:border-cyan-500/10",
          glow: "bg-cyan-500 text-cyan-500",
          bubbleBg: "bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400"
        };
      case "freelancing":
        return {
          border: "border-indigo-500/20 dark:border-indigo-500/10",
          glow: "bg-indigo-500 text-indigo-500",
          bubbleBg: "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
        };
      case "training":
        return {
          border: "border-purple-500/20 dark:border-purple-500/10",
          glow: "bg-purple-500 text-purple-500",
          bubbleBg: "bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400"
        };
      default:
        return {
          border: "border-emerald-500/20 dark:border-emerald-500/10",
          glow: "bg-emerald-500 text-emerald-500",
          bubbleBg: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
        };
    }
  };

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const nodeVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.52, ease: "easeOut" }
    }
  };

  return (
    <section
      id="experience"
      className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors border-t border-zinc-100 dark:border-zinc-900 relative"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[40%] right-[10%] w-80 h-80 rounded-full bg-cyan-400/5 blur-3xl" />
        <div className="absolute bottom-[10%] left-[10%] w-96 h-96 rounded-full bg-purple-500/5 blur-3xl animate-pulseGlow-3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-3">
            04 / Trajectory
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white font-display">
            Professional Timeline
          </h3>
          <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline main container structure */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center Vertical Rule representing thread line (Desktop center, mobile left) */}
          <div className="absolute left-[29px] md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-200 dark:bg-zinc-850 -translate-x-1/2 z-0" />

          {/* Timeline Nodes mapping with alternations */}
          <motion.div
            variants={timelineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12"
          >
            {experienceData.map((item, idx) => {
              const theme = getStyleTheme(item.type);
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  variants={nodeVariants}
                  className={`flex flex-col md:flex-row relative z-10 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Decorative timeline bullet thread node spacer */}
                  <div className="absolute left-[29px] md:left-1/2 top-6 -translate-x-1/2 z-10">
                    <div className="relative flex items-center justify-center">
                      {/* Double halo glow circle thread */}
                      <span className={`absolute inline-flex h-10 w-10 rounded-full ${theme.glow} opacity-20 animate-ping duration-1500`} />
                      <div className={`relative h-10 w-10 rounded-full border-2 border-white dark:border-zinc-950 flex items-center justify-center shadow-md bg-white dark:bg-zinc-900 ${theme.bubbleBg}`}>
                        {getIcon(item.type)}
                      </div>
                    </div>
                  </div>

                  {/* Empty Side block for desktop spacing */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Container Node */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                    <div className="glass-card hover:shadow-2xl hover:-translate-y-0.5 transition-all p-6 sm:p-8 rounded-3xl relative overflow-hidden text-left border border-zinc-200 dark:border-zinc-800">
                      
                      {/* Glow Overlay indicator */}
                      <div className={`absolute left-0 top-0 w-1.5 h-full ${theme.glow}`} />

                      {/* Period Header */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-md bg-zinc-150 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          {item.type}
                        </span>
                        <span className="text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                          {item.period}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-zinc-900 dark:text-white font-display">
                        {item.role}
                      </h4>
                      <p className="text-sm font-semibold text-zinc-650 dark:text-zinc-400 font-sans mt-0.5 mb-4 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-cyan-500 shrink-0" />
                        <span>{item.organization}</span>
                        <span className="text-zinc-350 dark:text-zinc-600">•</span>
                        <span className="text-zinc-500 text-xs italic">{item.location}</span>
                      </p>

                      {/* Detailed experience items list */}
                      <ul className="space-y-2 mb-4 text-zinc-600 dark:text-zinc-450 text-sm leading-relaxed">
                        {item.description.map((desc, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5">
                            <span className="text-cyan-500 shrink-0 mt-1.5 inline-block w-1.5 h-1.5 rounded-full" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Key Skills highlights */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/60">
                        {item.keySkills.map((sk) => (
                          <span
                            key={sk}
                            className="px-2 py-0.5 rounded-md bg-zinc-200/55 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-400 text-[10px] font-mono font-semibold"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
