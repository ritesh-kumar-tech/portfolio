import React from "react";
import { motion } from "motion/react";
import { 
  Code, Server, Database, Workflow, ShieldCheck, Zap, ArrowUpRight, 
  Terminal, PhoneCall, CheckCircle, Cpu, Layers, ShoppingBag, RefreshCw, Briefcase, Sparkles 
} from "lucide-react";
import { Service } from "../../types";
import { motionConfig } from "../../motion-config";

interface AnimatedServicesShowcaseProps {
  services: Service[];
  isDark: boolean;
  t: any;
}

export const AnimatedServicesShowcase: React.FC<AnimatedServicesShowcaseProps> = ({ services, isDark, t }) => {

  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Workflow": return <Workflow className="w-6 h-6" />;
      case "Server": return <Server className="w-6 h-6" />;
      case "Code": return <Code className="w-6 h-6" />;
      case "Database": return <Database className="w-6 h-6" />;
      case "Layers": return <Layers className="w-6 h-6" />;
      case "ShoppingBag": return <ShoppingBag className="w-6 h-6" />;
      case "RefreshCw": return <RefreshCw className="w-6 h-6" />;
      case "Briefcase": return <Briefcase className="w-6 h-6" />;
      case "Sparkles": return <Sparkles className="w-6 h-6" />;
      default: return <Cpu className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className={`py-24 ${t.bgSectionAlt} px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center space-y-3">
          <p className={`font-mono ${t.textIndigo} text-xs tracking-widest uppercase font-bold`}>
            WHAT I DELIVER
          </p>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold ${t.textBright}`}>
            Specialized Development Solutions
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
          <p className={`text-xs sm:text-sm ${t.textMuted} max-w-2xl`}>
            Architecting end-to-end web scraping systems, enterprise PHP backends, and responsive React web platforms.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`p-7 rounded-3xl ${t.bgCard} border ${t.borderCard} hover:border-indigo-500/50 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden`}
            >
              {/* Background Glow */}
              <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/20 transition-all pointer-events-none" />

              <div className="space-y-5">
                {/* ICON & BADGE */}
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform">
                    {renderServiceIcon(service.icon)}
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                    SLA Guaranteed
                  </span>
                </div>

                {/* TITLE & DESCRIPTION */}
                <div className="space-y-2">
                  <h3 className={`text-xl font-extrabold ${t.textBright} group-hover:text-indigo-400 transition-colors`}>
                    {service.title}
                  </h3>
                  <p className={`text-xs ${t.textMuted} leading-relaxed`}>
                    {service.description}
                  </p>
                </div>

                {/* HIGHLIGHT CHECKLIST */}
                <div className="space-y-2 pt-2 border-t border-slate-800/30">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Clean modular code structure</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Production deployment ready</span>
                  </div>
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="pt-6 mt-6 border-t border-slate-800/30 flex items-center justify-between">
                <span className={`text-xs font-mono font-bold ${t.textIndigo}`}>
                  Hire Service
                </span>
                <a
                  href="https://wa.me/917463867570"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors shadow-md"
                  title="Discuss on WhatsApp"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
