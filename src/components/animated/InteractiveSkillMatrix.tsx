import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, Search, CheckCircle, SlidersHorizontal, LayoutGrid, CircleDot, 
  Sparkles, Award, ArrowUpRight, Cpu, Code, Server, Database, Workflow, 
  Cloud, Terminal, Check, Layers, RefreshCw
} from "lucide-react";
import { Skill } from "../../types";
import { motionConfig } from "../../motion-config";

interface InteractiveSkillMatrixProps {
  skills: Skill[];
  isDark: boolean;
  t: any;
}

type MatrixLayoutMode = "gauges" | "nodes" | "terminal";

export const InteractiveSkillMatrix: React.FC<InteractiveSkillMatrixProps> = ({ skills, isDark, t }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [layoutMode, setLayoutMode] = useState<MatrixLayoutMode>("gauges");
  const [sortBy, setSortBy] = useState<"percentage" | "name">("percentage");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Categories list with counts
  const categoriesWithCounts = useMemo(() => {
    const cats = ["All", "Frontend", "Backend", "Database", "Scraping & Automation", "Tools & Cloud"];
    return cats.map((cat) => {
      const count = cat === "All" 
        ? skills.length 
        : skills.filter((s) => s.category === cat).length;
      return { name: cat, count };
    });
  }, [skills]);

  // Filtered & Sorted skills
  const filteredSkills = useMemo(() => {
    return skills
      .filter((s) => {
        const matchesCat = selectedCategory === "All" || s.category === selectedCategory;
        const matchesQuery = !searchQuery.trim() || 
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          s.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "percentage") return b.percentage - a.percentage;
        return a.name.localeCompare(b.name);
      });
  }, [skills, selectedCategory, searchQuery, sortBy]);

  // Helper for proficiency badge label
  const getProficiencyLabel = (pct: number) => {
    if (pct >= 95) return { label: "Master", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
    if (pct >= 90) return { label: "Expert", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" };
    if (pct >= 85) return { label: "Advanced", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" };
    return { label: "Proficient", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
  };

  // Helper to render Category Icon
  const renderCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Frontend": return <Code className="w-3.5 h-3.5" />;
      case "Backend": return <Server className="w-3.5 h-3.5" />;
      case "Database": return <Database className="w-3.5 h-3.5" />;
      case "Scraping & Automation": return <Workflow className="w-3.5 h-3.5" />;
      case "Tools & Cloud": return <Cloud className="w-3.5 h-3.5" />;
      default: return <Cpu className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* MATRIX CONTROL HEADER */}
      <div className={`p-6 rounded-3xl ${t.bgCard} border ${t.borderCard} shadow-xl space-y-6`}>
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${t.textIndigo}`}>
                Live Technical Competency Matrix
              </span>
            </div>
            <h3 className={`text-xl sm:text-2xl font-extrabold ${t.textBright}`}>
              Production Stack Competencies
            </h3>
            <p className={`text-xs ${t.textMuted} mt-1`}>
              Showing <span className="text-indigo-400 font-bold">{filteredSkills.length}</span> verified technologies across architecture, scraping, & cloud services.
            </p>
          </div>

          {/* VIEW MODE TOGGLES & SORTING */}
          <div className="flex flex-wrap items-center gap-2">
            <div className={`p-1 rounded-2xl ${isDark ? "bg-slate-950 border-slate-900" : "bg-slate-100 border-slate-200"} border flex items-center gap-1`}>
              <button
                onClick={() => setLayoutMode("gauges")}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  layoutMode === "gauges"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : `${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`
                }`}
                title="Circular Gauges View"
              >
                <CircleDot className="w-3.5 h-3.5" /> Gauges
              </button>

              <button
                onClick={() => setLayoutMode("nodes")}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  layoutMode === "nodes"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : `${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`
                }`}
                title="Constellation Nodes Cloud View"
              >
                <Sparkles className="w-3.5 h-3.5" /> Nodes Cloud
              </button>

              <button
                onClick={() => setLayoutMode("terminal")}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  layoutMode === "terminal"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : `${isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`
                }`}
                title="Cyberpunk Terminal Metric View"
              >
                <Terminal className="w-3.5 h-3.5" /> Terminal
              </button>
            </div>

            {/* Sort Toggle */}
            <button
              onClick={() => setSortBy(sortBy === "percentage" ? "name" : "percentage")}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-1.5 ${
                isDark ? "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              Sort: {sortBy === "percentage" ? "Power %" : "A-Z"}
            </button>
          </div>
        </div>

        {/* SEARCH & CATEGORIES ROW */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/30">
          
          {/* Categories Pills with Badge Counts */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {categoriesWithCounts.map(({ name, count }) => {
              const isActive = selectedCategory === name;
              return (
                <button
                  key={name}
                  onClick={() => setSelectedCategory(name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20"
                      : `${isDark ? "bg-slate-950/80 text-slate-400 hover:text-white border-slate-900" : "bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200"} border`
                  }`}
                >
                  {renderCategoryIcon(name)}
                  <span>{name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive ? "bg-white/20 text-white" : isDark ? "bg-slate-800 text-slate-400" : "bg-slate-200 text-slate-700"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search skill (e.g. Next.js, Scrapy)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-8 py-2 rounded-xl text-xs font-mono ${t.inputBg} border transition-all outline-none focus:ring-2 focus:ring-indigo-500/40`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono"
              >
                ×
              </button>
            )}
          </div>

        </div>

      </div>

      {/* RENDER LAYOUT MODES */}
      
      {filteredSkills.length === 0 ? (
        <div className={`p-12 text-center rounded-3xl ${t.bgCard} border ${t.borderCard}`}>
          <Search className="w-8 h-8 text-slate-500 mx-auto mb-3 animate-bounce" />
          <p className={`text-sm font-mono ${t.textBright} font-bold mb-1`}>No technologies found</p>
          <p className={`text-xs ${t.textMuted} max-w-sm mx-auto mb-4`}>
            No competencies match your search for "{searchQuery}" under {selectedCategory}.
          </p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-mono font-bold hover:bg-indigo-500 transition-colors"
          >
            Clear Search & Filters
          </button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {/* MODE 1: CIRCULAR GAUGES MATRIX */}
          {layoutMode === "gauges" && (
            <motion.div
              key="gauges-layout"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredSkills.map((sk, idx) => {
                const prof = getProficiencyLabel(sk.percentage);
                const radius = 28;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset = circumference - (sk.percentage / 100) * circumference;

                return (
                  <motion.div
                    key={sk.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    whileHover={{ scale: 1.03, y: -3 }}
                    onClick={() => setSelectedSkill(sk)}
                    className={`p-5 rounded-3xl ${t.bgCard} border ${t.borderCard} hover:border-indigo-500/40 transition-all cursor-pointer relative group flex flex-col justify-between overflow-hidden shadow-md`}
                  >
                    {/* Hover ambient highlight */}
                    <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />

                    <div>
                      {/* Gauge & Percentage Top Row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="relative w-16 h-16 flex items-center justify-center">
                          <svg className="w-16 h-16 transform -rotate-90">
                            {/* Track Circle */}
                            <circle
                              cx="32"
                              cy="32"
                              r={radius}
                              className={`${isDark ? "stroke-slate-900" : "stroke-slate-150"}`}
                              strokeWidth="5"
                              fill="transparent"
                            />
                            {/* Animated Fill Circle */}
                            <motion.circle
                              cx="32"
                              cy="32"
                              r={radius}
                              className="stroke-indigo-500"
                              strokeWidth="5"
                              strokeDasharray={circumference}
                              initial={{ strokeDashoffset: circumference }}
                              whileInView={{ strokeDashoffset }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: idx * 0.04, ease: "easeOut" }}
                              strokeLinecap="round"
                              fill="transparent"
                            />
                          </svg>
                          <span className={`absolute text-xs font-mono font-extrabold ${t.textBright}`}>
                            {sk.percentage}%
                          </span>
                        </div>

                        {/* Level badge */}
                        <div className="flex flex-col items-end gap-1">
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${prof.color}`}>
                            {prof.label}
                          </span>
                          <span className={`text-[9px] font-mono ${t.textMuted}`}>
                            Verified Stack
                          </span>
                        </div>
                      </div>

                      {/* Skill Name */}
                      <h4 className={`text-sm font-bold ${t.textBright} group-hover:text-indigo-400 transition-colors line-clamp-1`}>
                        {sk.name}
                      </h4>
                    </div>

                    {/* Footer Category Tag */}
                    <div className="pt-4 border-t border-slate-800/30 mt-4 flex items-center justify-between">
                      <span className={`text-[10px] font-mono ${isDark ? "text-slate-400 bg-slate-950" : "text-slate-600 bg-slate-100"} px-2 py-0.5 rounded-md uppercase font-medium`}>
                        {sk.category}
                      </span>
                      <span className="text-[10px] font-mono text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                        Inspect <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* MODE 2: CONSTELLATION NODES CLOUD */}
          {layoutMode === "nodes" && (
            <motion.div
              key="nodes-layout"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className={`p-8 rounded-3xl ${t.bgCard} border ${t.borderCard} relative overflow-hidden`}
            >
              <div className="text-center mb-6">
                <span className={`text-[10px] font-mono uppercase tracking-widest ${t.textIndigo} font-bold`}>
                  Interactive Skill Cloud
                </span>
                <p className={`text-xs ${t.textMuted}`}>Hover or tap nodes to expand proficiency stats & framework specs.</p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {filteredSkills.map((sk, idx) => {
                  const prof = getProficiencyLabel(sk.percentage);
                  
                  // Scale node size based on percentage
                  const isHighPower = sk.percentage >= 92;

                  return (
                    <motion.button
                      key={sk.id}
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.02 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSkill(sk)}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center gap-2.5 ${
                        isHighPower
                          ? `${isDark ? "bg-indigo-950/60 border-indigo-500/50 text-white" : "bg-indigo-50 border-indigo-300 text-indigo-950"} shadow-lg shadow-indigo-500/10`
                          : `${isDark ? "bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700" : "bg-white border-slate-200 text-slate-800 hover:border-slate-300"} shadow-xs`
                      }`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full ${isHighPower ? "bg-indigo-400 animate-ping" : "bg-slate-500"}`} />
                      <span className="text-xs font-bold font-sans">{sk.name}</span>
                      <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-lg ${
                        isHighPower ? "bg-indigo-600 text-white" : isDark ? "bg-slate-900 text-indigo-400" : "bg-slate-100 text-indigo-700"
                      }`}>
                        {sk.percentage}%
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* MODE 3: CYBERPUNK TERMINAL METRICS */}
          {layoutMode === "terminal" && (
            <motion.div
              key="terminal-layout"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className={`p-6 rounded-3xl ${isDark ? "bg-slate-950 border-slate-900" : "bg-slate-900 text-slate-100"} border shadow-2xl font-mono text-xs space-y-4 relative overflow-hidden`}
            >
              {/* Terminal Window Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] text-slate-400 ml-2 font-bold">tech-stack-diagnostics --query="{searchQuery || "all"}"</span>
                </div>
                <span className="text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded">
                  SYS_STATUS: OPTIMAL
                </span>
              </div>

              {/* Terminal Rows Grid */}
              <div className="space-y-2">
                {filteredSkills.map((sk, idx) => {
                  const prof = getProficiencyLabel(sk.percentage);
                  // Create ASCII style progress bar: [||||||||...]
                  const totalBlocks = 15;
                  const filledBlocks = Math.round((sk.percentage / 100) * totalBlocks);
                  const emptyBlocks = totalBlocks - filledBlocks;
                  const barString = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

                  return (
                    <motion.div
                      key={sk.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.02 }}
                      onClick={() => setSelectedSkill(sk)}
                      className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-900 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-indigo-400 font-bold">{`[${String(idx + 1).padStart(2, "0")}]`}</span>
                        <span className="font-bold text-white group-hover:text-indigo-300 transition-colors">{sk.name}</span>
                        <span className="text-[9px] text-slate-500 uppercase px-1.5 py-0.5 rounded bg-slate-950">
                          {sk.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-indigo-400 tracking-wider text-[11px] hidden md:inline">
                          {barString}
                        </span>
                        <span className="text-amber-400 font-bold">{sk.percentage}%</span>
                        <span className="text-[9px] text-emerald-400 uppercase font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                          {prof.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* SKILL DETAIL MODAL DIALOG */}
      <AnimatePresence>
        {selectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={`w-full max-w-lg p-6 sm:p-8 rounded-3xl ${t.bgCard} border ${t.borderCard} shadow-2xl relative space-y-6 overflow-hidden`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/50 text-slate-400 hover:text-white flex items-center justify-center text-sm transition-colors"
              >
                ✕
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/30">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${t.textIndigo} font-bold`}>
                    {selectedSkill.category} Architecture
                  </span>
                  <h3 className={`text-xl sm:text-2xl font-extrabold ${t.textBright}`}>
                    {selectedSkill.name}
                  </h3>
                </div>
              </div>

              {/* Progress Rating */}
              <div className={`p-4 rounded-2xl ${isDark ? "bg-slate-950/80 border-slate-900" : "bg-slate-50 border-slate-200"} border space-y-3`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${t.textBright}`}>
                    Production Proficiency
                  </span>
                  <span className="text-sm font-mono font-extrabold text-indigo-400">
                    {selectedSkill.percentage}% Mastered
                  </span>
                </div>

                <div className={`w-full h-2.5 ${isDark ? "bg-slate-900" : "bg-slate-200"} rounded-full overflow-hidden`}>
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
                    style={{ width: `${selectedSkill.percentage}%` }}
                  />
                </div>
              </div>

              {/* Highlights List */}
              <div className="space-y-2">
                <span className={`text-xs font-mono uppercase font-bold tracking-wider ${t.textMuted}`}>
                  Key Real-World Integration Capabilities:
                </span>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Battle-tested across high-concurrency client platforms & API workloads.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Strict adherence to type safety, error boundaries, & optimization practices.</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Seamless integration with modern CI/CD pipelines & automated testing environments.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold uppercase transition-colors"
                >
                  Close Inspection
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
