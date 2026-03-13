import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Activity, GraduationCap, CreditCard, ChevronRight, Zap } from 'lucide-react';

const PredictionHub = ({ onSubmit, loading }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    sem1_cgpa: '',
    sem2_cgpa: '',
    fee_paid: 1
  });

  const steps = [
    { id: 1, label: 'Student Profile', icon: User },
    { id: 2, label: 'Engagement Level', icon: Activity },
    { id: 3, label: 'Academic Record', icon: GraduationCap },
    { id: 4, label: 'Financial Status', icon: CreditCard },
  ];

  const handleNext = () => step < 4 && setStep(s => s + 1);
  const handleBack = () => step > 1 && setStep(s => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 4) {
        handleNext();
        return;
    }
    onSubmit({
      ...formData,
      attendance: parseFloat(formData.attendance),
      sem1_cgpa: parseFloat(formData.sem1_cgpa),
      sem2_cgpa: parseFloat(formData.sem2_cgpa),
      fee_paid: parseInt(formData.fee_paid)
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      {/* ── Progress Track ── */}
      <div className="flex justify-between mb-12 relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-800 -translate-y-1/2 z-0" />
        {steps.map((s) => (
          <div key={s.id} className="relative z-10">
            <button
                onClick={() => setStep(s.id)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 border-2 ${
                    step >= s.id 
                    ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/30' 
                    : 'bg-surface border-slate-800 text-slate-600'
                }`}
            >
              <s.icon className="w-5 h-5" />
            </button>
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-colors ${step >= s.id ? 'text-white' : 'text-slate-600'}`}>
                {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Form Content ── */}
      <form onSubmit={handleSubmit} className="panel-glass rounded-[2.5rem] p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {step === 1 && (
              <div className="space-y-6">
                <Header title="Identity Definition" desc="Define the target student profile for neural analysis." />
                <InputGroup 
                    label="Full Identification Name"
                    type="text"
                    name="name"
                    placeholder="e.g., Alexander Pierce"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <Header title="Interaction Metrics" desc="Verify school attendance and physical engagement rates." />
                <InputGroup 
                    label="Attendance Percentage (%)"
                    type="number"
                    max={100}
                    name="attendance"
                    placeholder="Enter 0-100"
                    value={formData.attendance}
                    onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <Header title="Academic Performance" desc="Historical CGPA data points for performance benchmarking." />
                <div className="grid grid-cols-2 gap-6">
                    <InputGroup 
                        label="Semester 1 CGPA"
                        type="number"
                        max={10}
                        name="sem1_cgpa"
                        placeholder="0.00"
                        value={formData.sem1_cgpa}
                        onChange={(e) => setFormData({...formData, sem1_cgpa: e.target.value})}
                    />
                    <InputGroup 
                        label="Semester 2 CGPA"
                        type="number"
                        max={10}
                        name="sem2_cgpa"
                        placeholder="0.00"
                        value={formData.sem2_cgpa}
                        onChange={(e) => setFormData({...formData, sem2_cgpa: e.target.value})}
                    />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <Header title="Financial Integrity" desc="Risk flag for outstanding institutional dues." />
                <div className="grid grid-cols-2 gap-4">
                  <SelectBox 
                    active={formData.fee_paid === 1} 
                    onClick={() => setFormData({...formData, fee_paid: 1})}
                    label="Fees Cleared"
                    desc="Stable Status"
                  />
                  <SelectBox 
                    active={formData.fee_paid === 0} 
                    onClick={() => setFormData({...formData, fee_paid: 0})}
                    label="Outstanding"
                    desc="Risk Detected"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/5">
            <button 
                type="button"
                onClick={handleBack}
                disabled={step === 1}
                className="text-xs font-black uppercase text-slate-500 hover:text-white disabled:opacity-30 p-2"
            >
                Previous Stage
            </button>
            
            <button 
                type="submit"
                disabled={loading}
                className="btn-premium px-8 shimmer-indigo py-4 text-xs tracking-[0.2em] font-black"
            >
                {step < 4 ? "Continue Analysis" : loading ? "Processing Brain..." : "Execute Prediction"}
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
      </form>
    </div>
  );
};

const Header = ({ title, desc }) => (
    <div className="space-y-1">
        <h3 className="text-xl font-black text-white">{title}</h3>
        <p className="text-sm text-slate-500">{desc}</p>
    </div>
);

const InputGroup = ({ label, ...props }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">{label}</label>
        <input 
            {...props}
            required
            className="w-full bg-slate-900 border border-slate-800 text-white px-6 py-4 rounded-2xl outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all font-bold placeholder:text-slate-800 text-lg"
        />
    </div>
);

const SelectBox = ({ active, onClick, label, desc }) => (
    <button
        type="button"
        onClick={onClick}
        className={`p-6 rounded-3xl border text-left transition-all group ${active ? 'bg-brand-500/10 border-brand-500' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
    >
        <div className={`text-xs font-black uppercase tracking-widest mb-1 ${active ? 'text-white' : 'text-slate-500'}`}>{label}</div>
        <div className="text-[10px] text-slate-600 font-bold uppercase">{desc}</div>
    </button>
);

export default PredictionHub;
