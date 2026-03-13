import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import PredictionForm from '../components/PredictionForm';
import ResultCard from '../components/ResultCard';
import BulkUpload from '../components/BulkUpload';
import AnalyticsSection from '../components/AnalyticsSection';
import { predictDropoutRisk } from '../services/api';

const Home = () => {
    const [activeTab, setActiveTab] = useState('single');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentResult, setCurrentResult] = useState(null);

    // Load history from session storage to keep it during page reloads in the same session
    useEffect(() => {
        const saved = sessionStorage.getItem('risk_history');
        if (saved) setHistory(JSON.parse(saved));
    }, []);

    const updateHistory = (newResult) => {
        const updated = [newResult, ...history].slice(0, 50); // Keep last 50
        setHistory(updated);
        sessionStorage.setItem('risk_history', JSON.stringify(updated));
    };

    const handlePredict = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const result = await predictDropoutRisk(data);
            setCurrentResult(result);
            updateHistory({
                ...result,
                name: data.name || 'Anonymous Student',
                timestamp: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString()
            });
            // Auto scroll to result on mobile
            if (window.innerWidth < 1024) {
               setTimeout(() => {
                  document.getElementById('result-area')?.scrollIntoView({ behavior: 'smooth' });
               }, 100);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen">
            <div className="bg-mesh" />
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 pt-28 pb-12">
                {/* ── Dashboard Header ── */}
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="glass-pill w-fit animate-pulse border-accent-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
                            Analytical Suite v2.0
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                            Risk Analysis <span className="text-accent-400">Dashboard</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl font-medium">
                            Advanced dropout forecasting utilizing weighted academic and economic indicators.
                        </p>
                    </div>

                    {/* ── Tab Navigator ── */}
                    <div className="glass p-1 rounded-2xl flex gap-1 w-full md:w-auto">
                        <TabButton 
                            active={activeTab === 'single'} 
                            onClick={() => setActiveTab('single')}
                            label="Single"
                            icon="profile"
                        />
                        <TabButton 
                            active={activeTab === 'bulk'} 
                            onClick={() => setActiveTab('bulk')}
                            label="Bulk"
                            icon="cloud"
                        />
                        <TabButton 
                            active={activeTab === 'analytics'} 
                            onClick={() => setActiveTab('analytics')}
                            label="Insights"
                            icon="chart"
                        />
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8">
                    {/* ── Primary Workflow Area ── */}
                    <div className={`${activeTab === 'analytics' ? 'col-span-12' : 'col-span-12 lg:col-span-8'}`}>
                        {activeTab === 'single' && (
                            <div className="space-y-8">
                                <div className="glass rounded-[2rem] p-1 shadow-2xl overflow-hidden border-border-glow">
                                    <div className="p-8">
                                       <PredictionForm onSubmit={handlePredict} loading={loading} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'bulk' && (
                            <BulkUpload onResult={(results) => {
                                // For bulk, we don't pollute the visual history card with dozens of entries
                                // but we could add them to analytics. For now, let's just update history one by one
                                results.forEach(r => updateHistory({
                                    ...r,
                                    name: 'Bulk Imported',
                                    timestamp: new Date().toLocaleTimeString(),
                                    date: new Date().toLocaleDateString()
                                }));
                                setActiveTab('analytics');
                            }} />
                        )}

                        {activeTab === 'analytics' && (
                            <AnalyticsSection history={history} />
                        )}
                    </div>

                    {/* ── Contextual Sidebar (Only for Single/Bulk) ── */}
                    {activeTab !== 'analytics' && (
                        <div className="col-span-12 lg:col-span-4 space-y-6">
                            <div id="result-area">
                                {loading ? (
                                    <StateCard icon="loading" title="Analyzing..." />
                                ) : currentResult ? (
                                    <ResultCard result={currentResult} onReset={() => setCurrentResult(null)} />
                                ) : (
                                    <StateCard icon="empty" title="Awaiting Input" description="Define student parameters to initiate predictive modeling." />
                                )}
                            </div>

                            {/* ── Recent Mini History ── */}
                            <div className="glass rounded-3xl p-6">
                                <h4 className="section-title">Session Feed</h4>
                                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {history.length > 0 ? (
                                        history.map((item, i) => (
                                            <div key={i} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/30 flex justify-between items-center group hover:border-accent-500/30 transition-all">
                                                <div>
                                                    <div className="text-xs font-bold text-white mb-0.5">{item.name}</div>
                                                    <div className="text-[10px] text-slate-500">{item.timestamp}</div>
                                                </div>
                                                <div className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                                                    item.risk_level === 'Critical' ? 'bg-danger/10 text-danger' :
                                                    item.risk_level === 'High' ? 'bg-warning/10 text-warning' :
                                                    'bg-success/10 text-success'
                                                }`}>
                                                    {item.risk_level}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-[11px] text-slate-600 text-center py-8">No session data available.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* ── Footer ── */}
            <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold text-slate-600">
                <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-slate-900 text-accent-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    </span>
                    Student Intelligent Predictor
                </div>
                <div className="uppercase tracking-[0.2em]">Developed for COE Project • 2026</div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-accent-400 transition-colors">Documentation</a>
                    <a href="#" className="hover:text-accent-400 transition-colors">System Health</a>
                </div>
            </footer>
        </div>
    );
};

const TabButton = ({ active, onClick, label, icon }) => {
    const icons = {
        profile: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
        cloud: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />,
        chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 022 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    };

    return (
        <button 
            onClick={onClick}
            className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-500 flex items-center gap-2 ${
                active 
                ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/20' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
        >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {icons[icon]}
            </svg>
            {label}
        </button>
    );
};

const StateCard = ({ icon, title, description }) => (
    <div className="glass rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-2 border-slate-800">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${icon === 'loading' ? 'bg-accent-500/20 animate-spin' : 'bg-slate-900 text-slate-600'}`}>
            {icon === 'loading' ? (
                <svg className="w-6 h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            )}
        </div>
        <div className="space-y-1">
            <h3 className="text-white font-bold">{title}</h3>
            {description && <p className="text-slate-500 text-[11px] leading-relaxed max-w-[180px]">{description}</p>}
        </div>
    </div>
);

export default Home;
