import React, { useState } from 'react';

const PredictionForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    sem1_cgpa: '',
    sem2_cgpa: '',
    fee_paid: 1 // Default to Paid
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      attendance: parseFloat(formData.attendance),
      sem1_cgpa: parseFloat(formData.sem1_cgpa),
      sem2_cgpa: parseFloat(formData.sem2_cgpa),
      fee_paid: parseInt(formData.fee_paid)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* ── Student Profile Header ── */}
      <div className="relative group">
        <label className="section-title">Student Identification</label>
        <div className="relative mt-2">
           <input
            required
            type="text"
            name="name"
            placeholder="e.g., Alexander Pierce"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-slate-900/50 border border-slate-800 text-white px-6 py-4 rounded-2xl outline-none focus:border-accent-400 focus:ring-4 focus:ring-accent-400/10 transition-all text-lg font-medium placeholder:text-slate-700"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-accent-400 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ── Metrics Group 1 ── */}
        <div className="space-y-6">
           <label className="section-title">Academic Metrics</label>
           <div className="grid grid-cols-2 gap-4">
              <InputGroup 
                label="Sem 1" 
                name="sem1_cgpa" 
                value={formData.sem1_cgpa} 
                onChange={handleChange} 
                placeholder="0.00" 
                max={10}
              />
              <InputGroup 
                label="Sem 2" 
                name="sem2_cgpa" 
                value={formData.sem2_cgpa} 
                onChange={handleChange} 
                placeholder="0.00" 
                max={10}
              />
           </div>
        </div>

        {/* ── Metrics Group 2 ── */}
        <div className="space-y-6">
           <label className="section-title">Engagement & Economic</label>
           <InputGroup 
                label="Attendance Rate (%)" 
                name="attendance" 
                value={formData.attendance} 
                onChange={handleChange} 
                placeholder="0-100" 
                max={100}
                icon="progress"
              />
        </div>
      </div>

      {/* ── Status Toggles ── */}
      <div className="space-y-4">
        <label className="section-title">Financial Standing</label>
        <div className="grid grid-cols-2 gap-4">
          <ToggleButton 
            active={formData.fee_paid === 1} 
            onClick={() => setFormData(p => ({...p, fee_paid: 1}))}
            label="Fees Cleared"
            desc="Institutional dues settled"
            icon="check"
          />
          <ToggleButton 
            active={formData.fee_paid === 0} 
            onClick={() => setFormData(p => ({...p, fee_paid: 0}))}
            label="Outstanding"
            desc="Financial risk flagged"
            icon="alert"
          />
        </div>
      </div>

      <button disabled={loading} type="submit" className="btn-premium w-full py-5 text-xl tracking-tight shimmer-active">
        {loading ? (
             <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
             </div>
        ) : (
            <>
                Execute Prediction
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
            </>
        )}
      </button>

      {/* ── Warning Tooltips ── */}
      {(formData.attendance > 100 || formData.sem1_cgpa > 10 || formData.sem2_cgpa > 10) && (
          <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-[11px] font-bold flex items-center gap-2 animate-bounce">
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 15c-.77 1.333.192 3 1.732 3z" /></svg>
             Values outside valid architectural bounds detected.
          </div>
      )}
    </form>
  );
};

const InputGroup = ({ label, name, value, onChange, placeholder, max, icon }) => (
  <div className="space-y-1.5 flex-1">
    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-1">{label}</div>
    <div className="relative">
        <input
            required
            type="number"
            step="0.01"
            name={name}
            max={max}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full bg-slate-900/50 border border-slate-800 text-white px-4 py-3 rounded-xl outline-none focus:border-accent-400 focus:bg-slate-900 transition-all font-bold"
        />
        {icon === 'progress' && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
        )}
    </div>
  </div>
);

const ToggleButton = ({ active, onClick, label, desc, icon }) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-5 rounded-2xl border text-left transition-all duration-300 group ${
      active 
      ? 'bg-accent-500/10 border-accent-400 shadow-[0_0_15px_-5px_rgba(14,165,233,0.4)]' 
      : 'bg-slate-900/30 border-slate-800 hover:border-slate-700'
    }`}
  >
    <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg ${active ? 'bg-accent-500 text-white' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'}`}>
            {icon === 'check' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 15c-.77 1.333.192 3 1.732 3z" /></svg>
            )}
        </div>
        {active && <div className="w-2 h-2 rounded-full bg-accent-400 animate-ping" />}
    </div>
    <div className={`text-xs font-black uppercase tracking-widest ${active ? 'text-white' : 'text-slate-500'}`}>{label}</div>
    <div className="text-[10px] text-slate-600 font-medium group-hover:text-slate-500 transition-colors uppercase">{desc}</div>
  </button>
);

export default PredictionForm;
