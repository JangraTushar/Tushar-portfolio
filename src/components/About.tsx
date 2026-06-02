import { GraduationCap, Award, Briefcase, ShieldCheck, Heart } from "lucide-react";
import { motion } from "motion/react";
import { AboutData } from "../types";

interface AboutProps {
  aboutData: AboutData;
}

export default function About({ aboutData }: AboutProps) {
  const statsList = [
    {
      id: "edu",
      icon: GraduationCap,
      color: "text-indigo-500",
      bgClass: "bg-indigo-500/10",
      borderColor: "group-hover:border-indigo-500/30",
      glowColor: "glow-indigo",
      title: "Education",
      details: "B.Tech in Computer Science (AI/ML specialization). Graduated from MD University(ROHTAK). Strong focus on mathematical foundations of stochastic optimization, algorithms, and deep networks."
    },
    {
      id: "obj",
      icon: Award,
      color: "text-purple-550 dark:text-purple-400",
      bgClass: "bg-purple-500/10",
      borderColor: "group-hover:border-purple-500/30",
      glowColor: "glow-purple",
      title: "Career Objective",
      details: aboutData.careerObjective
    },
    {
      id: "pass",
      icon: Heart,
      color: "text-pink-500",
      bgClass: "bg-pink-500/10",
      borderColor: "group-hover:border-pink-500/30",
      glowColor: "glow-pink",
      title: "Passion for AI",
      details: "Inspired by the capacity of dynamic networks to capture complex high-dimensional mappings. Passionate about multi-agent orchestration, sparse modeling, and deploying trustworthy, safety-bounded systems."
    },
    {
      id: "intel",
      icon: ShieldCheck,
      color: "text-emerald-500",
      bgClass: "bg-emerald-500/10",
      borderColor: "group-hover:border-emerald-500/30",
      glowColor: "glow-emerald",
      title: "Interests",
      details: aboutData.interests.join(" • ")
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section
      id="about"
      className="py-24 bg-white/30 dark:bg-zinc-950/20 backdrop-blur-md transition-colors border-t border-white/20 dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
            Introduction
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white font-display">
            About Me & Scientific Mission
          </h3>
          <div className="w-16 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Detailed Description Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h4 className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-zinc-100 font-display">
              Bridging Mathematics, Neural Architectures, and Human Intention
            </h4>
            <p className="text-zinc-650 dark:text-zinc-400 leading-relaxed text-base font-sans">
              {aboutData.aboutText}
            </p>
            <div className="p-5 border-l-4 border-indigo-500 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-r-2xl border border-white/20 dark:border-white/5">
              <span className="text-sm font-mono text-zinc-550 dark:text-zinc-400 italic font-medium block">
                "The best way to predict the future is to optimize it, layer by layer."
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 glass-card p-6 sm:p-8 rounded-3xl"
          >
            <h4 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 font-display flex items-center gap-2">
              <Briefcase className="text-indigo-550 dark:text-indigo-400 w-5 h-5" />
              <span>Core Academic & Technical Background</span>
            </h4>
            <div className="space-y-4 text-sm font-sans text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-800 pb-2">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Current Focus:</span>
                <span>Large Language Models & Agentic Graphs</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-800 pb-2">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Mathematical Strongholds:</span>
                <span>Linear Algebra, Statistics, Calculus</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200/50 dark:border-zinc-800 pb-2">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Operating Locations:</span>
                <span>{aboutData.contactInfo.location}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Contact Point:</span>
                <span className="hover:text-indigo-400 transition-colors pointer-events-auto">{aboutData.contactInfo.email}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modular Glance Cards with staggered motion animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {statsList.map((card) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                variants={itemVariants}
                className="glass-card glass-card-hover group relative p-6 sm:p-8 rounded-3xl text-left overflow-hidden"
              >
                {/* Glowing border backgrounds on card hover */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-purple-600 opacity-60 rounded-l-full" />
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                  <div className={`p-3 rounded-2xl ${card.bgClass} ${card.color} transition-transform group-hover:scale-110`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-zinc-800 dark:text-white font-display">
                    {card.title}
                  </h4>
                </div>
                
                <p className="text-zinc-650 dark:text-zinc-405 text-sm leading-relaxed font-sans">
                  {card.details}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
