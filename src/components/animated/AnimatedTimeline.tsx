import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle, 
  ChevronRight, Building2, Terminal, Sparkles, ExternalLink
} from "lucide-react";
import { Experience, Education, Certification } from "../../types";
import { motionConfig } from "../../motion-config";

interface AnimatedTimelineProps {
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  isDark: boolean;
  t: any;
}

export const AnimatedTimeline: React.FC<AnimatedTimelineProps> = ({ 
  experiences, 
  education, 
  certifications, 
  isDark, 
  t 
}) => {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* AMBIENT GLOW BACKGROUND */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center space-y-3">
          <p className={`font-mono ${t.textIndigo} text-xs tracking-widest uppercase font-bold`}>
            CAREER TRAJECTORY & LEARNING
          </p>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold ${t.textBright}`}>
            Work Experience & Background
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
          <p className={`text-xs sm:text-sm ${t.textMuted} max-w-2xl`}>
            Over 4+ years delivering scalable backend services, high-throughput web automation, and modern client web applications.
          </p>

          {/* TAB TOGGLES */}
          <div className="pt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab("experience")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeTab === "experience"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : `${isDark ? "bg-slate-900 text-slate-400 hover:text-white" : "bg-white text-slate-600 hover:text-slate-900"} border ${t.borderCard}`
              }`}
            >
              <Briefcase className="w-4 h-4" /> Work Experience ({experiences.length})
            </button>

            <button
              onClick={() => setActiveTab("education")}
              className={`px-5 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                activeTab === "education"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : `${isDark ? "bg-slate-900 text-slate-400 hover:text-white" : "bg-white text-slate-600 hover:text-slate-900"} border ${t.borderCard}`
              }`}
            >
              <GraduationCap className="w-4 h-4" /> Education & Certs
            </button>
          </div>
        </div>

        {/* TIMELINE BODY */}
        <AnimatePresence mode="wait">
          {activeTab === "experience" ? (
            <motion.div
              key="exp-timeline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl mx-auto space-y-8 before:absolute before:inset-0 before:left-6 md:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:via-cyan-500 before:to-indigo-500/20"
            >
              {experiences.map((exp, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* CENTER PULSING TIMELINE NODE */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 w-6 h-6 rounded-full bg-indigo-600 border-4 border-slate-950 z-20 flex items-center justify-center shadow-md">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    </div>

                    {/* CONTENT CARD */}
                    <div className="ml-14 md:ml-0 md:w-1/2 md:px-8 w-full">
                      <div className={`p-6 sm:p-7 rounded-3xl ${t.bgCard} border ${t.borderCard} hover:border-indigo-500/40 transition-all shadow-xl space-y-4 relative group`}>
                        
                        {/* Company & Role Header */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-[10px] font-bold uppercase border border-indigo-500/20">
                              {exp.startDate} - {exp.endDate}
                            </span>
                            {exp.location && (
                              <span className={`text-[11px] font-mono ${t.textMuted} flex items-center gap-1`}>
                                <MapPin className="w-3 h-3 text-indigo-400" /> {exp.location}
                              </span>
                            )}
                          </div>

                          <h3 className={`text-xl font-extrabold ${t.textBright} group-hover:text-indigo-400 transition-colors pt-2`}>
                            {exp.role}
                          </h3>

                          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300">
                            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                            <span>{exp.companyName}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className={`text-xs sm:text-sm ${t.textMuted} leading-relaxed`}>
                          {exp.description}
                        </p>

                        {/* Tech Stack Tags */}
                        {exp.techStack && exp.techStack.length > 0 && (
                          <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-800/30">
                            {exp.techStack.map((tech, i) => (
                              <span
                                key={i}
                                className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-lg ${
                                  isDark ? "bg-slate-900 text-indigo-300 border border-slate-800" : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="edu-timeline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {/* EDUCATION GRID */}
              <div className="space-y-4">
                <h3 className={`text-lg font-mono uppercase font-bold tracking-wider ${t.textIndigo} flex items-center gap-2`}>
                  <GraduationCap className="w-5 h-5" /> Academic Degrees & Qualifications
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {education.map((edu, idx) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className={`p-6 rounded-3xl ${t.bgCard} border ${t.borderCard} hover:border-indigo-500/40 transition-all shadow-lg space-y-3`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[10px] font-bold">
                          {edu.year}
                        </span>
                        <GraduationCap className="w-5 h-5 text-indigo-400" />
                      </div>

                      <h4 className={`text-lg font-bold ${t.textBright}`}>
                        {edu.degree}
                      </h4>

                      <p className={`text-xs font-mono font-bold ${t.textIndigo}`}>
                        {edu.institute}
                      </p>

                      <p className={`text-xs ${t.textMuted} leading-relaxed`}>
                        {edu.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CERTIFICATIONS SECTION */}
              {certifications && certifications.length > 0 && (
                <div className="space-y-4 pt-6">
                  <h3 className={`text-lg font-mono uppercase font-bold tracking-wider ${t.textIndigo} flex items-center gap-2`}>
                    <Award className="w-5 h-5" /> Professional Certifications & Badges
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certifications.map((cert, idx) => (
                      <div
                        key={cert.id}
                        className={`p-5 rounded-2xl ${t.bgCard} border ${t.borderCard} space-y-2 flex flex-col justify-between`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-indigo-400 font-bold">
                              {cert.year}
                            </span>
                            <Award className="w-4 h-4 text-amber-400" />
                          </div>
                          <h5 className={`text-sm font-bold ${t.textBright}`}>
                            {cert.name}
                          </h5>
                          <p className={`text-xs ${t.textMuted}`}>
                            Issuer: {cert.issuer}
                          </p>
                        </div>

                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-mono text-indigo-400 hover:underline flex items-center gap-1 font-bold pt-2 border-t border-slate-800/30"
                          >
                            Verify Credential <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
