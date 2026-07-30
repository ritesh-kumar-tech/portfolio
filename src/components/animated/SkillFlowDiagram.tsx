import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Code, Server, Database, Workflow, Cloud, Cpu, Sparkles, 
  CheckCircle, ArrowRight, Play, Pause, RotateCcw, ChevronRight, Layers, Terminal, RefreshCw, Zap
} from "lucide-react";
import { motionConfig, usePrefersReducedMotion } from "../../motion-config";

export interface SkillNodeStep {
  id: string;
  stepNumber: number;
  title: string;
  category: string;
  subtitle: string;
  icon: string;
  color: string;
  borderColor: string;
  glowColor: string;
  badge: string;
  description: string;
  milestone: string;
  skills: { name: string; level: number; status: "Mastered" | "Advanced" | "Active" }[];
  tools: string[];
}

export const SKILL_TREE_STAGES: SkillNodeStep[] = [
  {
    id: "step-1",
    stepNumber: 1,
    title: "Web Core & JavaScript",
    category: "Foundations",
    subtitle: "Semantic Layouts, Responsive UI & ES6+",
    icon: "Code",
    color: "from-amber-500 to-orange-500",
    borderColor: "border-amber-500/40",
    glowColor: "rgba(245, 158, 11, 0.2)",
    badge: "Level 1: Core",
    description: "Built foundational expertise in cross-browser DOM architecture, responsive CSS layout engines, async JS event loops, and version control hygiene.",
    milestone: "Mastered responsive single-page web foundations & git workflow conventions.",
    skills: [
      { name: "JavaScript (ES6+ / Async)", level: 95, status: "Mastered" },
      { name: "HTML5 & Semantic Markup", level: 98, status: "Mastered" },
      { name: "CSS3 / Flexbox & CSS Grid", level: 95, status: "Mastered" },
      { name: "Git & GitHub Core Workflow", level: 92, status: "Mastered" }
    ],
    tools: ["ES6+", "Sass/SCSS", "Git", "VS Code", "DOM APIs"]
  },
  {
    id: "step-2",
    stepNumber: 2,
    title: "Modern Client Systems",
    category: "Frontend",
    subtitle: "React, Next.js, TypeScript & Tailwind",
    icon: "Layers",
    color: "from-blue-500 to-cyan-500",
    borderColor: "border-cyan-500/40",
    glowColor: "rgba(6, 182, 212, 0.2)",
    badge: "Level 2: Client",
    description: "Evolved to scalable single-page and server-side rendered web applications using React component trees, strict TypeScript types, and utility styling.",
    milestone: "Shipped fast client web experiences with state managers (Redux / Zustand).",
    skills: [
      { name: "React.js & Next.js App Router", level: 95, status: "Mastered" },
      { name: "TypeScript Type Safety", level: 95, status: "Mastered" },
      { name: "Tailwind CSS & Framer Motion", level: 92, status: "Mastered" },
      { name: "State Stores (Redux / Zustand)", level: 88, status: "Advanced" }
    ],
    tools: ["React 18+", "Next.js 14", "TypeScript", "Tailwind", "Vite", "Motion"]
  },
  {
    id: "step-3",
    stepNumber: 3,
    title: "Server & Microservices",
    category: "Backend",
    subtitle: "Node.js, PHP Symfony/Laravel & C#",
    icon: "Server",
    color: "from-indigo-500 to-violet-500",
    borderColor: "border-indigo-500/40",
    glowColor: "rgba(99, 102, 241, 0.2)",
    badge: "Level 3: Backend",
    description: "Expanded backend systems with enterprise MVC frameworks, REST / GraphQL endpoint architecture, JWT auth loops, and event-driven microservices.",
    milestone: "Engineered scalable backend services for SaaS platforms and client APIs.",
    skills: [
      { name: "Node.js & Express / NestJS", level: 92, status: "Mastered" },
      { name: "PHP (Symfony & Laravel)", level: 90, status: "Mastered" },
      { name: "ASP.NET Core (C#)", level: 80, status: "Advanced" },
      { name: "REST & GraphQL APIs / WebSockets", level: 93, status: "Mastered" }
    ],
    tools: ["Express.js", "Symfony 6", "Laravel", "ASP.NET", "GraphQL", "JWT"]
  },
  {
    id: "step-4",
    stepNumber: 4,
    title: "Databases & In-Memory Stores",
    category: "Database",
    subtitle: "PostgreSQL, MySQL, MongoDB & Redis",
    icon: "Database",
    color: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500/40",
    glowColor: "rgba(16, 185, 129, 0.2)",
    badge: "Level 4: Data Layer",
    description: "Mastered relational schema normalizations, complex JOIN query optimization, B-tree indexing strategies, document stores, and in-memory Redis session caching.",
    milestone: "Optimized multi-million record database clusters for high-concurrency apps.",
    skills: [
      { name: "MySQL & PostgreSQL (Indexing)", level: 90, status: "Mastered" },
      { name: "MongoDB & Mongoose", level: 85, status: "Advanced" },
      { name: "Redis Caching & Pub/Sub", level: 82, status: "Advanced" },
      { name: "Prisma & Drizzle ORMs", level: 88, status: "Mastered" }
    ],
    tools: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Drizzle", "Prisma"]
  },
  {
    id: "step-5",
    stepNumber: 5,
    title: "Web Scraping & Bot Automation",
    category: "Automation",
    subtitle: "Python Scrapy, Playwright & Proxy Bypassing",
    icon: "Workflow",
    color: "from-purple-500 to-fuchsia-500",
    borderColor: "border-purple-500/40",
    glowColor: "rgba(168, 85, 247, 0.2)",
    badge: "Level 5: Scraping",
    description: "Architected high-throughput web scraping pipelines featuring proxy pool rotation, Cloudflare / Akamai bypass routines, headless Chrome, and automated ETL data output.",
    milestone: "Scraped 50,000+ daily items across complex e-commerce marketplaces.",
    skills: [
      { name: "Python Async Crawlers & Scrapy", level: 96, status: "Mastered" },
      { name: "Playwright & Selenium Driver", level: 95, status: "Mastered" },
      { name: "Proxy Rotation & CAPTCHA Bypassing", level: 94, status: "Mastered" },
      { name: "BeautifulSoup4 & Data Cleaning", level: 95, status: "Mastered" }
    ],
    tools: ["Python 3", "Scrapy", "Playwright", "Selenium", "BrightData", "BS4"]
  },
  {
    id: "step-6",
    stepNumber: 6,
    title: "Cloud, DevOps & AI Agents",
    category: "Cloud & AI",
    subtitle: "Docker, AWS, CI/CD & Gemini API",
    icon: "Cloud",
    color: "from-rose-500 to-pink-500",
    borderColor: "border-rose-500/40",
    glowColor: "rgba(244, 63, 94, 0.2)",
    badge: "Level 6: Scale & AI",
    description: "Leveraged containerized environments with Docker, automated deployment pipelines via GitHub Actions, cloud server provisioning, and integrating GenAI capabilities.",
    milestone: "Deployed continuous automated cloud build systems & custom AI feature integrations.",
    skills: [
      { name: "Docker & Containerization", level: 85, status: "Advanced" },
      { name: "GitHub Actions & CI/CD Pipelines", level: 92, status: "Mastered" },
      { name: "AWS Services (EC2, S3, RDS, Lambda)", level: 82, status: "Advanced" },
      { name: "Gemini API & LLM Agent Workflows", level: 88, status: "Advanced" }
    ],
    tools: ["Docker", "GitHub Actions", "AWS", "Google GenAI SDK", "Linux"]
  }
];

interface SkillFlowDiagramProps {
  isDark: boolean;
  t: any;
}

export const SkillFlowDiagram: React.FC<SkillFlowDiagramProps> = ({ isDark, t }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const prefersReduced = usePrefersReducedMotion();

  const activeStep = SKILL_TREE_STAGES[activeStepIndex];

  // Auto playback of learning journey
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveStepIndex((prevIndex) => {
        if (prevIndex >= SKILL_TREE_STAGES.length - 1) {
          setIsPlaying(false);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Code": return <Code className="w-5 h-5" />;
      case "Layers": return <Layers className="w-5 h-5" />;
      case "Server": return <Server className="w-5 h-5" />;
      case "Database": return <Database className="w-5 h-5" />;
      case "Workflow": return <Workflow className="w-5 h-5" />;
      case "Cloud": return <Cloud className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* FLOW CONTROLS HEADER */}
      <div className={`p-4 rounded-2xl ${t.bgCard} border ${t.borderCard} flex flex-col sm:flex-row items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400 font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-sm font-bold ${t.textBright}`}>Step-by-Step Skill Acquisition Journey</h3>
            <p className={`text-xs ${t.textMuted}`}>Interactive progression from core web development to full-stack, automation, & cloud AI.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-xl ${isPlaying ? "bg-amber-500 text-slate-950 font-bold" : "bg-indigo-600 hover:bg-indigo-500 text-white"} text-xs font-mono font-medium transition-all flex items-center gap-2 shadow-sm`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause Flow
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Play Journey Flow
              </>
            )}
          </button>
          
          <button
            onClick={() => {
              setIsPlaying(false);
              setActiveStepIndex(0);
            }}
            className={`p-2 rounded-xl ${isDark ? "bg-slate-900 text-slate-400 hover:text-white" : "bg-slate-100 text-slate-600 hover:text-slate-900"} border ${isDark ? "border-slate-800" : "border-slate-200"} transition-colors`}
            title="Reset to Step 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FLOW TREE NODES (PROGRESSION BAR) */}
      <div className="relative pt-2 pb-6 px-2 overflow-x-auto no-scrollbar">
        {/* Connecting Laser Line background */}
        <div className={`absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 ${isDark ? "bg-slate-800" : "bg-slate-200"} rounded-full z-0 hidden md:block`} />
        
        {/* Active Animated Connecting Glow Line */}
        <motion.div 
          className="absolute top-1/2 left-8 -translate-y-1/2 h-1 bg-gradient-to-r from-amber-500 via-indigo-500 to-rose-500 rounded-full z-0 hidden md:block"
          animate={{
            width: `${(activeStepIndex / (SKILL_TREE_STAGES.length - 1)) * 88 + 2}%`
          }}
          transition={{ duration: 0.5, ease: motionConfig.ease }}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 relative z-10">
          {SKILL_TREE_STAGES.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;

            return (
              <motion.button
                key={step.id}
                onClick={() => {
                  setIsPlaying(false);
                  setActiveStepIndex(idx);
                }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`p-3 rounded-2xl border text-left transition-all duration-300 relative flex flex-col justify-between ${
                  isActive
                    ? `${isDark ? "bg-slate-900" : "bg-white"} ${step.borderColor} shadow-lg ring-2 ring-indigo-500/30`
                    : isCompleted
                    ? `${isDark ? "bg-slate-950/80 border-indigo-500/30 text-slate-300" : "bg-indigo-50/50 border-indigo-200 text-slate-700"}`
                    : `${t.bgCard} ${t.borderCard} opacity-70 hover:opacity-100`
                }`}
                style={{
                  boxShadow: isActive ? `0 10px 25px -5px ${step.glowColor}` : "none"
                }}
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-2 w-full">
                  <span className={`w-6 h-6 rounded-lg text-[11px] font-mono font-bold flex items-center justify-center ${
                    isActive || isCompleted
                      ? `bg-gradient-to-r ${step.color} text-white`
                      : `${isDark ? "bg-slate-800 text-slate-400" : "bg-slate-200 text-slate-600"}`
                  }`}>
                    {step.stepNumber}
                  </span>
                  
                  {isCompleted && (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  )}
                </div>

                {/* Node Title & Category */}
                <div>
                  <span className={`block text-[9px] font-mono uppercase tracking-wider ${isDark ? "text-indigo-400" : "text-indigo-600"} font-semibold`}>
                    {step.category}
                  </span>
                  <h4 className={`text-xs font-bold ${t.textBright} line-clamp-1`}>
                    {step.title}
                  </h4>
                </div>

                {/* Active Indicator Arrow */}
                {isActive && (
                  <motion.div 
                    layoutId="active-node-indicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-indigo-500 clip-triangle"
                    style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE STEP DETAILED DISPLAY CARD */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: motionConfig.ease }}
          className={`p-6 sm:p-8 rounded-3xl ${t.bgCard} border ${activeStep.borderColor} shadow-xl relative overflow-hidden`}
        >
          {/* Subtle background glow element */}
          <div 
            className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: activeStep.glowColor }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            
            {/* LEFT COLUMN: Overview & Key Milestone */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-r ${activeStep.color} text-white shadow-md`}>
                    {renderIcon(activeStep.icon)}
                  </div>
                  <div>
                    <span className={`inline-block text-[10px] font-mono tracking-widest uppercase font-bold px-2 py-0.5 rounded ${isDark ? "bg-slate-900 text-indigo-400" : "bg-indigo-50 text-indigo-600"}`}>
                      {activeStep.badge}
                    </span>
                    <h3 className={`text-xl sm:text-2xl font-extrabold ${t.textBright}`}>
                      {activeStep.title}
                    </h3>
                  </div>
                </div>

                <p className={`text-xs font-mono ${t.textIndigo} mb-3`}>
                  {activeStep.subtitle}
                </p>
                
                <p className={`text-xs sm:text-sm ${t.textMuted} leading-relaxed`}>
                  {activeStep.description}
                </p>
              </div>

              {/* Milestone Box */}
              <div className={`p-4 rounded-2xl ${isDark ? "bg-slate-950/80 border-slate-900" : "bg-slate-50 border-slate-200"} border space-y-2`}>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${t.textBright}`}>
                    Stage Milestone
                  </span>
                </div>
                <p className={`text-xs ${isDark ? "text-slate-300" : "text-slate-700"} leading-snug`}>
                  {activeStep.milestone}
                </p>
              </div>

              {/* Tools & Tech Pills */}
              <div>
                <span className={`block text-[10px] font-mono uppercase tracking-wider ${t.textMuted} mb-2`}>
                  Tools & Libraries Utilized:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeStep.tools.map((tool, i) => (
                    <span 
                      key={i} 
                      className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg ${
                        isDark ? "bg-slate-900 text-indigo-300 border border-slate-800" : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SKILLS BREAKDOWN WITH ANIMATED PROGRESS BARS */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-slate-800/40">
                <h4 className={`text-sm font-bold ${t.textBright} flex items-center gap-2`}>
                  <Terminal className="w-4 h-4 text-indigo-400" /> Competence & Proficiency Ratings
                </h4>
                <span className={`text-xs font-mono ${t.textMuted}`}>
                  Step {activeStep.stepNumber} of {SKILL_TREE_STAGES.length}
                </span>
              </div>

              <div className="space-y-4">
                {activeStep.skills.map((skill, idx) => (
                  <div key={idx} className={`p-3.5 rounded-xl ${isDark ? "bg-slate-950/60 border-slate-900" : "bg-white border-slate-200 shadow-xs"} border space-y-2`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span className={`text-xs font-bold ${t.textBright}`}>{skill.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold">
                          {skill.status}
                        </span>
                        <span className={`text-xs font-mono font-bold ${t.textIndigo}`}>{skill.level}%</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className={`w-full h-2 ${isDark ? "bg-slate-900" : "bg-slate-150"} rounded-full overflow-hidden`}>
                      <motion.div
                        className={`h-full bg-gradient-to-r ${activeStep.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: motionConfig.ease }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Actions */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveStepIndex((prev) => Math.max(0, prev - 1));
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    activeStepIndex === 0
                      ? "opacity-30 cursor-not-allowed"
                      : `${isDark ? "bg-slate-900 text-slate-200 hover:bg-slate-800" : "bg-slate-100 text-slate-800 hover:bg-slate-200"}`
                  }`}
                >
                  ← Previous Level
                </button>

                <div className="text-xs font-mono text-slate-400">
                  {activeStepIndex + 1} / {SKILL_TREE_STAGES.length}
                </div>

                <button
                  disabled={activeStepIndex === SKILL_TREE_STAGES.length - 1}
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveStepIndex((prev) => Math.min(SKILL_TREE_STAGES.length - 1, prev + 1));
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    activeStepIndex === SKILL_TREE_STAGES.length - 1
                      ? "opacity-30 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                  }`}
                >
                  Next Level →
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
};
