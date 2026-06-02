import { useState, useEffect } from "react";
import { Github, ExternalLink, Search, X, CheckCircle, Flame, Target } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectItem } from "../types";

interface ProjectsProps {
  projectsData: ProjectItem[];
}

export default function Projects({ projectsData }: ProjectsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Parse all unique technologies across all projects for filtering
  const allTeches = ["All", ...Array.from(new Set(projectsData.flatMap((p) => p.technologies)))];

  // Search filter implementation
  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTech = selectedTech === "All" || project.technologies.includes(selectedTech);

    return matchesSearch && matchesTech;
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="projects"
      className="py-24 bg-white/20 dark:bg-zinc-950/20 backdrop-blur-md transition-colors border-t border-white/20 dark:border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
            Portfolio
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white font-display">
            Showcase of Intelligence
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-405 mt-2">
            Click on any project to explore deep architecture insights, performance metrics, and key details.
          </p>
          <div className="w-16 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Searching & Filter Utilities */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          {/* Search Input bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              id="project-search-input"
              type="text"
              placeholder="Search technologies, titles, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-white/5 text-zinc-805 dark:text-white placeholder-zinc-450 focus:outline-none focus:ring-2 focus:ring-indigo-505 focus:bg-white/60 dark:focus:bg-white/10 backdrop-blur-md transition-all font-sans text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-650 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Scrolling filter badges */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto md:max-w-2xl no-scrollbar">
            {allTeches.slice(0, 9).map((tech) => (
              <button
                id={`project-tech-tab-${tech.replace(/\s+/g, '-').toLowerCase()}`}
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer backdrop-blur-md ${
                  selectedTech === tech
                    ? "bg-gradient-to-r from-indigo-505 to-purple-600 text-white border-transparent shadow-md"
                    : "bg-white/40 dark:bg-white/5 text-zinc-650 dark:text-zinc-400 border-white/25 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 glass-card rounded-3xl max-w-lg mx-auto">
            <span className="text-4xl text-indigo-500">🔬</span>
            <h4 className="text-lg font-bold text-zinc-850 dark:text-zinc-200 mt-4">
              No matching algorithms
            </h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              Try adjusting your query strings or selecting another technology badge.
            </p>
          </div>
        )}

        {/* Dynamic Project Grid with Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group flex flex-col h-full glass-card glass-card-hover rounded-3xl overflow-hidden cursor-pointer relative"
                onClick={() => setActiveProject(project)}
              >
                {/* Image panel with hover overlay details */}
                <div className="relative h-48 overflow-hidden bg-zinc-800 flex items-center justify-center">
                  <img
                    src={project.image}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80";
                    }}
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-85" />
                  
                  {/* Category Pill Tag */}
                  {project.metrics && (
                    <span className="absolute top-4 left-4 bg-indigo-600/90 text-white font-mono font-bold px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider backdrop-blur-sm">
                      {project.metrics.split(",")[0]}
                    </span>
                  )}
                </div>

                {/* Info block */}
                <div className="p-6 flex flex-col flex-grow text-left space-y-3">
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white font-display group-hover:text-indigo-500 transition-colors">
                    {project.name}
                  </h4>
                  
                  <p className="text-zinc-605 dark:text-zinc-400 text-sm line-clamp-2 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  <div className="flex-grow" />

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-white/20 dark:bg-white/5 border border-white/10 dark:border-white/5 text-zinc-650 dark:text-zinc-400 text-[10px] font-semibold font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/30 text-purple-650 dark:text-purple-400 text-[10px] font-bold font-mono">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Explicit Click Invitation */}
                <div className="px-6 py-4 border-t border-white/10 dark:border-white/5 flex items-center justify-between text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-500 bg-white/10 dark:bg-white/5">
                  <span className="group-hover:text-indigo-400 transition-colors">🔍 Explore Architecture</span>
                  <span className="group-hover:translate-x-1 duration-300 transition-transform">→</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Window implementation */}
        <AnimatePresence>
          {activeProject && (
            <div id="project-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Dark Overlay Background Mask */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
                className="absolute inset-0 bg-zinc-950/60 backdrop-blur-lg cursor-pointer"
              />

              {/* Modal Card Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative glass-card w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-y-auto shadow-2xl z-20 flex flex-col text-left"
              >
                {/* Header Close button */}
                <button
                  id="modal-close-btn"
                  onClick={() => setActiveProject(null)}
                  className="absolute right-4 top-4 z-30 p-2.5 rounded-full bg-zinc-900/60 text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  aria-label="Close Project Information Modal window"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Hero Card Image block inside modal */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0">
                  <img
                    src={activeProject.image}
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80";
                    }}
                    alt={activeProject.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] sm:text-xs font-mono font-bold rounded-lg uppercase tracking-wider block w-fit mb-2">
                       Active Model Highlight
                    </span>
                    <h3 className="text-xl sm:text-3xl font-extrabold text-white font-display">
                      {activeProject.name}
                    </h3>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Performance Indicators / Stats */}
                  {activeProject.metrics && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activeProject.metrics.split(",").map((met, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-white/30 dark:bg-white/5 border border-white/10 dark:border-white/5 flex items-center gap-3 backdrop-blur-md"
                        >
                          {idx === 0 ? (
                            <Flame className="w-5 h-5 text-amber-500 shrink-0" />
                          ) : idx === 1 ? (
                            <Target className="w-5 h-5 text-emerald-500 shrink-0" />
                          ) : (
                            <ExternalLink className="w-5 h-5 text-indigo-500 shrink-0" />
                          )}
                          <span className="text-xs sm:text-sm font-semibold font-mono text-zinc-750 dark:text-zinc-300">
                            {met.trim()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Deep descriptive overview */}
                  <div className="space-y-3">
                    <h5 className="text-lg font-bold text-zinc-900 dark:text-white font-display">
                      Architectural Overview
                    </h5>
                    <p className="text-zinc-650 dark:text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
                      {activeProject.detailedDescription}
                    </p>
                  </div>

                  {/* Key implementations */}
                  {activeProject.features && (
                    <div className="space-y-3">
                      <h5 className="text-lg font-bold text-zinc-900 dark:text-white font-display">
                        Key Engineering Implementations
                      </h5>
                      <ul className="grid grid-cols-1 gap-2.5">
                        {activeProject.features.map((feat, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-zinc-650 dark:text-zinc-300 text-sm leading-relaxed"
                          >
                            <CheckCircle className="w-5 h-5 text-indigo-505 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack categorization bottom */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-6 border-t border-white/10 dark:border-white/5 bg-transparent">
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg bg-white/20 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 text-xs font-semibold font-mono border border-white/10 dark:border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Navigation code anchors */}
                    <div className="flex gap-3 shrink-0">
                      <a
                        id="modal-github-link"
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 font-medium text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 shadow-sm transition-all cursor-pointer backdrop-blur-md"
                      >
                        <Github className="w-4 h-4" />
                        <span>View Source Code</span>
                      </a>

                      <a
                        id="modal-live-link"
                        href={activeProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-550 to-purple-650 hover:from-indigo-600 hover:to-purple-700 font-semibold text-xs sm:text-sm text-white shadow-md transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Launch Project Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
