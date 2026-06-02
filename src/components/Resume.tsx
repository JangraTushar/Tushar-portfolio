import { Eye, FileText, Download } from "lucide-react";
import { AboutData } from "../types";

interface ResumeProps {
  aboutData: AboutData;
}

const getDriveEmbedUrl = (url?: string) => {
  if (!url) return "";
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
};

const getDriveDownloadUrl = (url?: string) => {
  if (!url) return "";
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }
  return url;
};

export default function Resume({ aboutData }: ResumeProps) {
  return (
    <section
      id="resume"
      className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors border-t border-zinc-100 dark:border-zinc-900 relative"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[40%] right-[10%] w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulseGlow-3" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-3">
            CV Hub
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white font-display">
            Interactive Resume Desk
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Inspect my official qualification document in real-time or open the cloud file directly.
          </p>
          <div className="w-16 h-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Premium Google Drive Document Stream */}
        {aboutData.resumeDriveUrl && (
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 backdrop-blur-md mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400">
                  <FileText className="w-6 h-6 animate-pulse" />
                </span>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white font-display">
                    Official Resume
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Direct stream sourced securely from my Google Drive profile
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-center sm:justify-end">
                <a
                  href={getDriveDownloadUrl(aboutData.resumeDriveUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-650 hover:from-cyan-500 hover:to-indigo-550 font-semibold text-sm text-white transition-all shadow-md cursor-pointer hover:scale-102 grow sm:grow-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>

                <a
                  href={aboutData.resumeDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 font-semibold text-sm text-white transition-all shadow-md cursor-pointer hover:scale-102 grow sm:grow-0"
                >
                  <Eye className="w-4 h-4" />
                  <span>Open Resume Document</span>
                </a>
              </div>
            </div>

            {/* Embedded Drive Frame Wrapper with glass borders */}
            <div className="relative w-full aspect-[210/297] sm:h-[1050px] rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-250 dark:border-zinc-850 shadow-2xl overflow-hidden group">
              <iframe
                src={getDriveEmbedUrl(aboutData.resumeDriveUrl)}
                className="w-full h-full border-0 absolute inset-0 rounded-3xl"
                allow="autoplay"
                title="Tushar Jangra - Google Drive Resume"
              />
              {/* Cover overlay when mouse is not hovering, to scroll elements smoothly without iframe interfering too early */}
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent pointer-events-none" />
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
