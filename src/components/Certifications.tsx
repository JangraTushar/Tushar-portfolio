import { ExternalLink, Award, Calendar, CheckSquare } from "lucide-react";
import { motion } from "motion/react";
import { CertificationItem } from "../types";

interface CertificationsProps {
  certificationsData: CertificationItem[];
}

export default function Certifications({ certificationsData }: CertificationsProps) {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" }
    }
  };

  return (
    <section
      id="certifications"
      className="py-24 bg-white dark:bg-zinc-950 transition-colors border-t border-zinc-100 dark:border-zinc-900 relative"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-3">
            Credentials
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white font-display">
            Industry Certifications
          </h3>
          <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Certifications Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificationsData.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              className="group flex flex-col h-full bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-200/50 dark:border-zinc-850 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              {/* Cover Header Image representing Certification branding */}
              <div className="relative h-40 w-full overflow-hidden bg-zinc-850 shrink-0">
                <img
                  src={cert.image}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80";
                  }}
                  alt={cert.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                />
                
                {/* Visual Cover masking overlay with glowing tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                
                {/* Award Mini-badge */}
                <div className="absolute bottom-4 left-4 p-2 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20">
                  <Award className="w-5 h-5 text-cyan-300" />
                </div>
              </div>

              {/* Certification Content description */}
              <div className="p-6 flex flex-col flex-grow text-left space-y-4">
                <div className="space-y-1.5 flex-grow">
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white font-display leading-snug group-hover:text-cyan-500 transition-colors">
                    {cert.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium font-sans">
                    <CheckSquare className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{cert.organization}</span>
                  </div>
                </div>

                {/* Date + Link Anchor Row */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-200/50 dark:border-zinc-800/60 text-xs font-mono">
                  <span className="text-zinc-450 dark:text-zinc-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{cert.date}</span>
                  </span>

                  <a
                    id={`cert-credential-link-${cert.id}`}
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 font-bold hover:underline group/link"
                    title="Open verified academic certificate webpage"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
