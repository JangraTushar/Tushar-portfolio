import { useState } from "react";
import * as Icons from "lucide-react";
import { motion } from "motion/react";
import { SkillCategory, SkillItem } from "../types";

interface SkillsProps {
  skillsData: SkillCategory[];
}

export default function Skills({ skillsData }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Filter skills based on user selection
  const categories = ["All", ...skillsData.map((c) => c.category)];

  const getIcon = (iconName: string) => {
    const Component = (Icons as any)[iconName];
    if (Component) return <Component className="w-5 h-5" />;
    return <Icons.Code className="w-5 h-5" />; // Fallback icon
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <section
      id="skills"
      className="py-24 bg-zinc-50/10 dark:bg-zinc-950/10 backdrop-blur-md transition-colors border-t border-white/20 dark:border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
            Expertises
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white font-display">
            Dynamic Skills Spectrum
          </h3>
          <div className="w-16 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Filters for Interactive Filtering */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              id={`skill-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-350 select-none cursor-pointer border backdrop-blur-md ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/10 scale-103"
                  : "bg-white/45 dark:bg-white/5 text-zinc-650 dark:text-zinc-400 border-white/20 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Categories Grid (Bento Grid Style) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData
            .filter((cat) => selectedCategory === "All" || cat.category === selectedCategory)
            .map((categoryObj) => (
              <motion.div
                key={categoryObj.category}
                variants={cardVariants}
                className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col hover:-translate-y-1 transition-all group overflow-hidden relative"
              >
                {/* Thin Gradient Accent Underneath */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-200/50 dark:border-zinc-850">
                  <div className="p-2.5 rounded-2xl bg-indigo-100 dark:bg-indigo-950/45 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    {/* Render Category Indicator */}
                    <Icons.Workflow className="w-5 h-5 animate-pulse" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white font-display">
                    {categoryObj.category}
                  </h4>
                </div>

                <div className="space-y-6 flex-grow">
                  {categoryObj.skills.map((skill: SkillItem) => (
                    <div key={skill.name} className="space-y-2 group/skill">
                      
                      {/* Name, Icon, Percentage Display */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-300 group-hover/skill:text-indigo-600 dark:group-hover/skill:text-indigo-400 transition-colors">
                          <span className="text-zinc-400 group-hover/skill:text-indigo-400 transition-colors">
                            {getIcon(skill.icon)}
                          </span>
                          <span className="font-medium font-sans">{skill.name}</span>
                        </div>
                        <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 font-semibold">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
        </motion.div>

      </div>
    </section>
  );
}
