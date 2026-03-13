import React from 'react';
import { Users, UserX, Activity, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const StatGrid = ({ stats }) => {
  const cards = [
    { label: 'Total Analyzed', value: stats?.total || 1200, icon: Users, color: 'brand', trend: '+12% from prev month' },
    { label: 'Critical Risk', value: stats?.critical || 42, icon: UserX, color: 'danger', trend: '8.2% avg' },
    { label: 'Avg Attendance', value: stats?.avgAttendance || '78%', icon: Activity, color: 'warning', trend: 'Stable' },
    { label: 'Model Confidence', value: '92.4%', icon: Brain, color: 'success', trend: 'Optimized' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <motion.div
           key={idx}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: idx * 0.1 }}
           className="panel-glass p-6 rounded-[2rem] border border-white/5 glow-card group relative overflow-hidden"
        >
          <div className={`absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-10 rounded-full bg-${card.color}-500 transition-opacity group-hover:opacity-20`} />
          
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform`}>
              <card.icon className="w-5 h-5 text-brand-400" />
            </div>
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{card.trend}</span>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-black text-white tracking-tighter">{card.value}</div>
            <div className="text-[11px] font-bold uppercase text-slate-500 tracking-[0.2em]">{card.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatGrid;
