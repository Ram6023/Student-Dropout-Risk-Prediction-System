import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/CommandCenter/Sidebar';
import StatGrid from '../components/CommandCenter/StatGrid';
import MainDashboard from '../components/CommandCenter/MainDashboard';
import PredictionHub from '../components/CommandCenter/PredictionHub';
import ResultGauge from '../components/CommandCenter/ResultGauge';
import AIExplanation from '../components/CommandCenter/AIExplanation';
import BulkUpload from '../components/BulkUpload';
import { predictDropoutRisk } from '../services/api';
import { Bell, Search, User } from 'lucide-react';

const Home = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentResult, setCurrentResult] = useState(null);

    useEffect(() => {
        const saved = sessionStorage.getItem('risk_history');
        if (saved) setHistory(JSON.parse(saved));
    }, []);

    const updateHistory = (newResult) => {
        const updated = [newResult, ...history].slice(0, 50);
        setHistory(updated);
        sessionStorage.setItem('risk_history', JSON.stringify(updated));
    };

    const handlePredict = async (data) => {
        setLoading(true);
        try {
            const result = await predictDropoutRisk(data);
            setCurrentResult(result);
            updateHistory({
                ...result,
                name: data.name || 'Anonymous Student',
                timestamp: new Date().toLocaleTimeString()
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex bg-slate-950 min-h-screen">
            <div className="bg-command" />
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 ml-64 min-w-0">
                {/* ── Top Bar ── */}
                <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-slate-950/50 backdrop-blur-xl z-40">
                    <div className="flex items-center gap-4 text-slate-500">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <Search className="w-4 h-4 group-hover:text-white transition-colors" />
                            <span className="text-xs font-bold uppercase tracking-widest hidden md:block">System Query...</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative cursor-pointer group">
                             <Bell className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                             <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-500 rounded-full border-2 border-slate-950" />
                        </div>
                        <div className="h-8 w-[1px] bg-white/5 hidden md:block" />
                        <div className="flex items-center gap-3 group cursor-pointer">
                             <div className="text-right hidden sm:block">
                                <div className="text-[10px] font-black text-white uppercase tracking-wider">COE ADMIN</div>
                                <div className="text-[9px] text-brand-400 font-bold uppercase">Authorized Access</div>
                             </div>
                             <div className="w-10 h-10 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 group-hover:border-brand-500 transition-all">
                                <User className="w-5 h-5" />
                             </div>
                        </div>
                    </div>
                </header>

                <div className="p-10 space-y-10">
                    {/* ── Contextual Header ── */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2"
                            >
                                <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                                <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Neural Link Active</span>
                            </motion.div>
                            <h2 className="text-4xl font-black text-white tracking-tighter gradient-text">
                                {activeTab === 'dashboard' ? 'Operational Overview' :
                                 activeTab === 'predict' ? 'Predictive Interface' :
                                 activeTab === 'bulk' ? 'Mass Data Stream' : 'Analytical Insights'}
                            </h2>
                            <p className="text-slate-500 text-sm font-medium">Monitoring and predicting student behavioral entropy across institutional datasets.</p>
                        </div>

                        {activeTab === 'dashboard' && (
                            <div className="flex gap-3">
                                <button onClick={() => setActiveTab('predict')} className="btn-premium px-5 py-2.5 text-[10px] uppercase tracking-widest">New Analysis</button>
                                <button className="glass px-5 py-2.5 rounded-2xl text-[10px] uppercase tracking-widest font-black text-slate-400 hover:text-white transition-all">Export Report</button>
                            </div>
                        )}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "circOut" }}
                        >
                            {activeTab === 'dashboard' && (
                                <div className="space-y-10">
                                    <StatGrid stats={{ total: history.length + 1240, critical: 42, avgAttendance: '78%' }} />
                                    <MainDashboard history={history} />
                                </div>
                            )}

                            {activeTab === 'predict' && (
                                <div className="grid grid-cols-12 gap-10">
                                    <div className="col-span-12 lg:col-span-12 xl:col-span-7">
                                        <PredictionHub onSubmit={handlePredict} loading={loading} />
                                    </div>
                                    <div className="col-span-12 lg:col-span-12 xl:col-span-5 space-y-8 mt-12">
                                        {currentResult ? (
                                            <>
                                                <ResultGauge probability={currentResult.probability} riskLevel={currentResult.risk_level} />
                                                <AIExplanation result={currentResult} />
                                            </>
                                        ) : (
                                            <div className="panel-glass rounded-[2rem] p-12 text-center flex flex-col items-center justify-center min-h-[400px] border-dashed border-2 border-white/5">
                                                <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center mb-6 text-slate-600">
                                                    <Search className="w-8 h-8" />
                                                </div>
                                                <h3 className="text-white font-black uppercase tracking-widest text-sm mb-2">Awaiting Neural Link</h3>
                                                <p className="text-slate-500 text-xs max-w-[200px]">Complete the predictive workflow to visualize risk vectors.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'bulk' && <BulkUpload onResult={() => setActiveTab('dashboard')} />}

                            {activeTab === 'analytics' && <MainDashboard history={history} />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Home;
