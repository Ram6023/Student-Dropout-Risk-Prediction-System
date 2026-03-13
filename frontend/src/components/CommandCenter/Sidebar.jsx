import React from 'react';
import { LayoutDashboard, FileUp, PieChart, Info, Settings, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'predict', label: 'Single Analysis', icon: ShieldCheck },
    { id: 'bulk', label: 'Bulk Processing', icon: FileUp },
    { id: 'analytics', label: 'Advanced Metrics', icon: PieChart },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 panel-glass border-r border-white/5 flex flex-col z-50">
      {/* ── Brand ── */}
      <div className="p-8 pb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
          <ShieldCheck className="w-6 h-6 stroke-[2.5px]" />
        </div>
        <div>
          <h1 className="text-white font-black text-sm tracking-widest uppercase leading-none">DROPOUT<span className="text-brand-400">AI</span></h1>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">v2.4 STABLE</span>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-4 space-y-2">
        <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 px-4">Core Systems</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-brand-500/10 text-white shadow-inner border border-brand-500/20' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
            }`}
          >
            <item.icon className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-400'}`} />
            {item.label}
            {activeTab === item.id && (
              <motion.div 
                layoutId="nav-glow"
                className="absolute right-4 w-1.5 h-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_#818cf8]"
              />
            )}
          </button>
        ))}
      </nav>

      {/* ── System Status ── */}
      <div className="p-6 mt-auto">
        <div className="glass p-4 rounded-3xl border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Engine Status</span>
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          </div>
          <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '92%' }}
                className="h-full bg-brand-500"
            />
          </div>
          <div className="text-[10px] text-slate-400 flex justify-between">
            <span>Accuracy</span>
            <span className="text-white">~92.4%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
