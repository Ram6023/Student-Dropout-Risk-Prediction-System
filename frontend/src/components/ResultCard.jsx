import React from 'react';

const ResultCard = ({ result, onReset }) => {
  const { risk_level, probability, factors, prediction } = result;
  const probPercent = Math.round(probability * 100);

  const riskConfigs = {
    Critical: { color: '#ef4444', secondary: 'rgba(239, 68, 68, 0.1)', glow: '0 0 30px rgba(239, 68, 68, 0.4)', text: 'Critical Risk Detected' },
    High: { color: '#f59e0b', secondary: 'rgba(245, 158, 11, 0.1)', glow: '0 0 25px rgba(245, 158, 11, 0.3)', text: 'Significant Warning' },
    Moderate: { color: '#3b82f6', secondary: 'rgba(59, 130, 246, 0.1)', glow: '0 0 20px rgba(59, 130, 246, 0.2)', text: 'Stable Condition' },
    Low: { color: '#10b981', secondary: 'rgba(16, 185, 129, 0.1)', glow: '0 0 25px rgba(16, 185, 129, 0.4)', text: 'Optimal Profile' }
  };

  const config = riskConfigs[risk_level] || riskConfigs.Low;

  return (
    <div className="glass rounded-[2rem] p-8 space-y-8 relative overflow-hidden anim-float border-2" style={{ borderColor: `${config.color}20` }}>
      {/* ── Background Glow ── */}
      <div className="absolute -top-20 -right-20 w-64 h-64 blur-[100px] opacity-20 rounded-full" style={{ background: config.color }} />

      <div className="text-center space-y-4">
        <h4 className="section-title">Analytical Output</h4>
        
        {/* ── High-End Gauge ── */}
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Base Track */}
            <circle cx="50" cy="50" r="42" fill="none" stroke="#0f172a" strokeWidth="8" />
            {/* Glow Path */}
            <circle 
              cx="50" cy="50" r="42" 
              fill="none" 
              stroke={config.color} 
              strokeWidth="10" 
              strokeDasharray="264" 
              strokeDashoffset={264 - (264 * probability)} 
              strokeLinecap="round" 
              style={{ filter: `drop-shadow(0 0 8px ${config.color})`, transition: 'stroke-dashoffset 1.5s ease-out' }}
              opacity="0.3"
            />
            {/* Main Path */}
            <circle 
              cx="50" cy="50" r="42" 
              fill="none" 
              stroke={config.color} 
              strokeWidth="8" 
              strokeDasharray="264" 
              strokeDashoffset={264 - (264 * probability)} 
              strokeLinecap="round" 
              style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-white tracking-tighter" style={{ textShadow: `0 0 20px ${config.color}40` }}>
              {probPercent}<span className="text-xl opacity-50">%</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Risk Index</span>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black uppercase tracking-widest" style={{ color: config.color }}>
            {risk_level}
          </h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{config.text}</p>
        </div>
      </div>

      {/* ── Weighted Factors ── */}
      <div className="space-y-4 pt-6 border-t border-slate-800/50">
        <div className="flex justify-between items-center px-1">
            <span className="section-title m-0">Inference Factors</span>
            <span className="text-[10px] text-slate-500 font-bold">INFLUENCE %</span>
        </div>
        <div className="space-y-4">
            <FactorBar label="Academic Continuity" value={factors.academic} color="#38bdf8" />
            <FactorBar label="Engagement Level" value={factors.attendance} color="#818cf8" />
            <FactorBar label="Economic Stability" value={factors.financial} color="#10b981" />
        </div>
      </div>

      <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 relative group">
          <div className="section-title mb-2">Recommendation</div>
          <p className="text-sm text-white font-medium leading-relaxed italic pr-4">
            "{prediction}"
          </p>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 group-hover:translate-x-1 transition-transform opacity-30">
            <svg className="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01705V14H12.017C14.2262 14 16.017 15.7909 16.017 18V21H14.017Z" /></svg>
          </div>
      </div>

      <button onClick={onReset} className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        New Assessment
      </button>
    </div>
  );
};

const FactorBar = ({ label, value, color }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      <span>{label}</span>
      <span className="text-white">{Math.round(value * 100)}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
      <div 
        className="h-full transition-all duration-1000" 
        style={{ width: `${value * 100}%`, background: color, boxShadow: `0 0 10px ${color}40` }}
      />
    </div>
  </div>
);

export default ResultCard;
