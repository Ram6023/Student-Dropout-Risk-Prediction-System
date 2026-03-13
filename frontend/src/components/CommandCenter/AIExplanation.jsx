import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Wallet, CheckCircle2 } from 'lucide-react';

const AIExplanation = ({ result }) => {
  if (!result) return null;

  const { factors, risk_level } = result;

  const getInsights = () => {
    const list = [];
    if (factors.attendance > 0.4) list.push({ icon: TrendingDown, label: 'Critical Attendance Deficit', color: 'danger', desc: 'Attendance falls below required engagement thresholds.' });
    if (factors.academic > 0.45) list.push({ icon: AlertTriangle, label: 'Academic Performance Lag', color: 'warning', desc: 'Fluctuations in CGPA indicate potential learning friction.' });
    if (factors.financial > 0.5) list.push({ icon: Wallet, label: 'Financial Barrier Detected', color: 'danger', desc: 'Outstanding dues are creating institutional friction.' });
    
    if (list.length === 0) list.push({ icon: CheckCircle2, label: 'Optimal Performance Profile', color: 'success', desc: 'Student metrics align with institutional success patterns.' });
    
    return list;
  };

  const insights = getInsights();

  return (
    <div className="panel-glass rounded-[2rem] p-8 border border-white/5 space-y-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-5">
         <ShieldIcon />
      </div>

      <header className="flex justify-between items-center">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Neural Interpretation</h4>
        <div className="flex -space-x-2">
           {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800" />)}
        </div>
      </header>

      <div className="space-y-4">
        {insights.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex gap-4 p-5 rounded-3xl bg-white/[0.02] border border-white/[0.04] group hover:bg-white/[0.04] transition-all"
          >
            <div className={`p-3 rounded-2xl bg-${item.color === 'danger' ? 'red' : item.color === 'warning' ? 'amber' : 'emerald'}-500/10 text-${item.color === 'danger' ? 'red' : item.color === 'warning' ? 'amber' : 'emerald'}-400 group-hover:scale-110 transition-transform flex-shrink-0`}>
                <item.icon className="w-5 h-5" />
            </div>
            <div>
                <div className="text-sm font-black text-white mb-1 tracking-tight">{item.label}</div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/5">
        <div className="p-4 rounded-2xl bg-brand-500/5 text-brand-400 text-[10px] font-black flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            EXPLANATORY AI OUTPUT GENERATED
        </div>
      </div>
    </div>
  );
};

const ShieldIcon = () => (
    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L3 7v6a12 12 0 009 11.5 12 12 0 009-11.5V7l-9-5z"/></svg>
);

export default AIExplanation;
