import React, { useState } from 'react';
import { predictDropoutCSV } from '../services/api';

const BulkUpload = ({ onResult }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    if (selectedFile.type === "text/csv" || selectedFile.name.endsWith('.csv')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Architectural incompatibility. Please provide a standard .csv file.");
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const results = await predictDropoutCSV(file);
      
      // Generate result CSV
      const headers = Object.keys(results[0]).join(',');
      const rows = results.map(row => Object.values(row).join(','));
      const csvContent = [headers, ...rows].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Batch_Analysis_${new Date().getTime()}.csv`;
      a.click();
      
      onResult(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="glass rounded-[2rem] p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/5 blur-[100px] rounded-full" />
        
        <div className="max-w-xl mx-auto text-center space-y-6">
          <header className="space-y-2">
            <h2 className="text-3xl font-black text-white tracking-tight">Mass Data Processing</h2>
            <p className="text-slate-500 text-sm">Upload large student datasets for parallel risk classification.</p>
          </header>

          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative group cursor-pointer transition-all duration-500 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center p-12 ${
              dragActive 
              ? 'border-accent-400 bg-accent-400/5 scale-[0.98]' 
              : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
            }`}
          >
            <input 
              type="file" 
              accept=".csv"
              onChange={(e) => validateAndSetFile(e.target.files[0])}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
              file ? 'bg-success/20 text-success' : 'bg-slate-800 text-slate-500 group-hover:text-accent-400'
            }`}>
              {file ? (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              )}
            </div>

            <div className="space-y-1">
              <span className={`text-lg font-bold block ${file ? 'text-white' : 'text-slate-400'}`}>
                {file ? file.name : "Select Target CSV"}
              </span>
              <span className="text-xs text-slate-600 font-medium uppercase tracking-widest">
                {file ? `${(file.size / 1024).toFixed(2)} KB` : "Drag and drop source file here"}
              </span>
            </div>

            {!file && (
               <div className="mt-8 pt-8 border-t border-slate-800/50 w-full flex flex-wrap justify-center gap-3">
                  <Badge label="attendance" />
                  <Badge label="sem1_cgpa" />
                  <Badge label="sem2_cgpa" />
                  <Badge label="fee_paid" />
               </div>
            )}
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-[11px] font-bold">
              {error}
            </div>
          )}

          <button 
            disabled={!file || loading}
            onClick={handleUpload}
            className="btn-premium w-full py-5 text-sm uppercase tracking-[0.2em] font-black shimmer-active"
          >
            {loading ? "Processing Stream..." : "Initiate Batch Classification"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ label }) => (
  <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[9px] font-black text-slate-500 uppercase tracking-widest">
    {label}
  </span>
);

export default BulkUpload;
