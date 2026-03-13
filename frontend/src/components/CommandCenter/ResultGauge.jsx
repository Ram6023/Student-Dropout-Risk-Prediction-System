import React from 'react';
import { motion } from 'framer-motion';

const ResultGauge = ({ probability, riskLevel }) => {
  const percent = Math.round(probability * 100);
  const color = riskLevel === 'Critical' ? '#ef4444' : riskLevel === 'High' ? '#f59e0b' : riskLevel === 'Moderate' ? '#3b82f6' : '#10b981';

  return (
    <div className="panel-glass rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">System Inference</h4>

      <div className="relative w-56 h-56">
        {/* ── Progress Circle ── */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#1e293b" strokeWidth="6" />
          <motion.circle 
            initial={{ strokeDashoffset: 276 }}
            animate={{ strokeDashoffset: 276 - (276 * probability) }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="50" cy="50" r="44" 
            fill="none" 
            stroke={color} 
            strokeWidth="6" 
            strokeDasharray="276.46" 
            strokeLinecap="round" 
            style={{ filter: `drop-shadow(0 0 8px ${color}60)` }}
          />
        </svg>

        {/* ── Value Display ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-6xl font-black text-white tracking-tighter"
            >
                {percent}<span className="text-xl opacity-30">%</span>
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Risk Score</span>
        </div>
      </div>

      <div className="mt-8 space-y-1">
        <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-black uppercase tracking-widest"
            style={{ color: color }}
        >
            {riskLevel} Risk
        </motion.div>
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest opacity-60">Architectural Prediction</p>
      </div>

      {/* ── Status Bar ── */}
      <div className="mt-8 flex gap-2">
        {['Low', 'Moderate', 'High', 'Critical'].map(level => (
            <div 
                key={level}
                className={`w-3 h-1.5 rounded-full transition-all duration-500 ${riskLevel === level ? 'w-8' : 'bg-slate-800'}`}
                style={{ backgroundColor: riskLevel === level ? color : undefined }}
            />
        ))}
      </div>
    </div>
  );
};

export default ResultGauge;
