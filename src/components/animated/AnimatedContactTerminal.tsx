import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, PhoneCall, Mail, MapPin, Copy, Check, MessageSquare, 
  Terminal, ShieldCheck, Sparkles, Phone, ExternalLink, ArrowUpRight
} from "lucide-react";
import { Profile } from "../../types";

interface AnimatedContactTerminalProps {
  profile: Profile;
  isDark: boolean;
  t: any;
  onSubmitContact: (data: { name: string; email: string; phone: string; subject: string; message: string }) => Promise<boolean>;
}

export const AnimatedContactTerminal: React.FC<AnimatedContactTerminalProps> = ({ 
  profile, 
  isDark, 
  t, 
  onSubmitContact 
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    const success = await onSubmitContact(formData);
    setLoading(false);

    if (success) {
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center space-y-3">
          <p className={`font-mono ${t.textIndigo} text-xs tracking-widest uppercase font-bold`}>
            GET IN TOUCH
          </p>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold ${t.textBright}`}>
            Let's Build Something Exceptional
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
          <p className={`text-xs sm:text-sm ${t.textMuted} max-w-2xl`}>
            Have a project, web scraping pipeline, or full-stack application inquiry? Send a direct dispatch below or connect instantly on WhatsApp.
          </p>
        </div>

        {/* MAIN CONTACT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: QUICK CONTACT CARDS */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className={`p-6 sm:p-8 rounded-3xl ${t.bgCard} border ${t.borderCard} shadow-xl space-y-6 relative overflow-hidden`}>
              <div className="space-y-2">
                <span className={`text-[10px] font-mono uppercase tracking-widest ${t.textIndigo} font-bold`}>
                  DIRECT CHANNELS
                </span>
                <h3 className={`text-xl font-extrabold ${t.textBright}`}>
                  Instant Response SLA
                </h3>
                <p className={`text-xs ${t.textMuted} leading-relaxed`}>
                  I typically respond within <span className="text-emerald-400 font-bold">1-2 hours</span> during active working business windows.
                </p>
              </div>

              {/* CONTACT DETAILS LIST */}
              <div className="space-y-3">
                
                {/* Email Item */}
                <div className={`p-3.5 rounded-2xl ${isDark ? "bg-slate-950/80 border-slate-900" : "bg-slate-50 border-slate-200"} border flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className={`block text-[10px] font-mono uppercase ${t.textMuted}`}>Email Address</span>
                      <span className={`text-xs font-mono font-bold ${t.textBright}`}>{profile.email}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(profile.email, "email")}
                    className="p-2 rounded-xl text-slate-400 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedField === "email" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone / WhatsApp Item */}
                <div className={`p-3.5 rounded-2xl ${isDark ? "bg-slate-950/80 border-slate-900" : "bg-slate-50 border-slate-200"} border flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <div>
                      <span className={`block text-[10px] font-mono uppercase ${t.textMuted}`}>Phone / WhatsApp</span>
                      <span className={`text-xs font-mono font-bold ${t.textBright}`}>{profile.phone}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(profile.phone, "phone")}
                    className="p-2 rounded-xl text-slate-400 hover:text-white transition-colors"
                    title="Copy Phone"
                  >
                    {copiedField === "phone" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location Item */}
                <div className={`p-3.5 rounded-2xl ${isDark ? "bg-slate-950/80 border-slate-900" : "bg-slate-50 border-slate-200"} border flex items-center gap-3`}>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`block text-[10px] font-mono uppercase ${t.textMuted}`}>Location Base</span>
                    <span className={`text-xs font-mono font-bold ${t.textBright}`}>{profile.location}</span>
                  </div>
                </div>

              </div>

              {/* WHATSAPP HIGH PRIORITY CTA */}
              <a
                href={`https://wa.me/${profile.whatsapp || "917463867570"}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" /> Start WhatsApp Chat Directly <ArrowUpRight className="w-4 h-4" />
              </a>

            </div>

          </div>

          {/* RIGHT COLUMN: INTERACTIVE FORM DISPATCH */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-3xl ${t.bgCard} border ${t.borderCard} shadow-xl relative`}>
              
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="w-5 h-5 text-indigo-400" />
                <h3 className={`text-xl font-bold ${t.textBright}`}>
                  Send Direct Project Dispatch
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 text-center space-y-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 text-emerald-400"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto font-bold">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold">Message Transmitted Successfully!</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Thank you for getting in touch. I have received your message and will review your project details immediately.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1">
                        <label className={`block text-xs font-mono font-bold ${t.textMuted}`}>Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full px-4 py-3 rounded-2xl text-xs font-mono ${t.inputBg} border transition-all outline-none focus:ring-2 focus:ring-indigo-500/40`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className={`block text-xs font-mono font-bold ${t.textMuted}`}>Email Address *</label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-4 py-3 rounded-2xl text-xs font-mono ${t.inputBg} border transition-all outline-none focus:ring-2 focus:ring-indigo-500/40`}
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1">
                        <label className={`block text-xs font-mono font-bold ${t.textMuted}`}>Phone / Mobile (Optional)</label>
                        <input
                          type="text"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full px-4 py-3 rounded-2xl text-xs font-mono ${t.inputBg} border transition-all outline-none focus:ring-2 focus:ring-indigo-500/40`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className={`block text-xs font-mono font-bold ${t.textMuted}`}>Subject / Service Focus</label>
                        <input
                          type="text"
                          placeholder="Web Scraping / Next.js Development"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className={`w-full px-4 py-3 rounded-2xl text-xs font-mono ${t.inputBg} border transition-all outline-none focus:ring-2 focus:ring-indigo-500/40`}
                        />
                      </div>

                    </div>

                    <div className="space-y-1">
                      <label className={`block text-xs font-mono font-bold ${t.textMuted}`}>Project Scope & Specifications *</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell me about your project requirements, timeline, or API requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`w-full px-4 py-3 rounded-2xl text-xs font-mono ${t.inputBg} border transition-all outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Transmitting Dispatch...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Send Project Dispatch
                        </>
                      )}
                    </button>

                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
