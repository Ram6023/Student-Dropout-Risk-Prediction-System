import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl md:rounded-3xl border-border-glow px-6 py-4 flex justify-between items-center shadow-2xl">
        <div className="flex items-center gap-3 group px-2 cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-accent-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-accent-600 to-accent-400 flex items-center justify-center text-white shadow-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-black text-sm tracking-widest uppercase mb-0.5">
              DROPOUT<span className="text-accent-400">AI</span>
            </h1>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Core Engine Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <div className="hidden md:flex gap-1 pr-4 border-r border-slate-800">
              <NavNode label="Neural Net" active />
              <NavNode label="Dataset v4" />
           </div>
           
           <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] font-black text-white">ADMIN PORTAL</div>
                <div className="text-[9px] text-accent-400/60 font-medium">COE_USER_882</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-[10px] font-black text-slate-400 hover:border-accent-400 transition-colors cursor-pointer">
                SR
              </div>
           </div>
        </div>
      </div>
    </nav>
  );
};

const NavNode = ({ label, active }) => (
  <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all ${
    active ? 'text-white bg-accent-500/10' : 'text-slate-500 hover:text-slate-300'
  }`}>
    {label}
  </div>
);

export default Navbar;
