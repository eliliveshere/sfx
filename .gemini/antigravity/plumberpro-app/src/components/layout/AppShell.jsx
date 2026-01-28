import React, { useState } from 'react';
import { useApp } from '../../data/AppContext';
import { Wrench, Zap, FileText, Package, BrainCircuit, ShieldCheck, ChevronRight } from 'lucide-react';
import { ToastContainer } from '../ui/Primitives';

export default function AppShell({ children }) {
    const { activeTab, setActiveTab, isDemoMode } = useApp();
    const [showDemoTip, setShowDemoTip] = useState(true);

    const navItems = [
        { id: 'jobs', label: 'Jobs', icon: Wrench },
        { id: 'invoices', label: 'Invoices', icon: FileText },
        { id: 'parts', label: 'Parts', icon: Package },
        { id: 'genius', label: 'Genius', icon: BrainCircuit },
        { id: 'bom', label: 'BOM', icon: Zap },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
            <ToastContainer />

            {/* Desktop Sidebar */}
            <nav className="hidden md:flex fixed top-0 bottom-0 left-0 w-64 bg-slate-900 text-white flex-col z-50 shadow-2xl">
                <div className="p-6 border-b border-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                            <Wrench className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg tracking-tight">Plumber Pro</h1>
                            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Pro Edition</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map((item) => {
                        const isActive = activeTab === item.id;
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all text-sm font-medium ${isActive
                                    ? 'bg-brand-600 text-white shadow-md'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                <div className="p-4 mt-auto">
                    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-2">
                            <ShieldCheck size={14} className="text-emerald-400" />
                            <span>Demo Workspace</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mb-3">Data resets on reload.</p>
                        <button className="w-full bg-white text-slate-900 text-xs font-bold py-2 rounded-lg hover:bg-slate-100 transition-colors">
                            Book Full Demo
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 min-h-screen relative flex flex-col">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 flex justify-between items-center bg-white/80 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                            <Wrench className="text-white" size={16} />
                        </div>
                        <span className="font-bold text-slate-900">Plumber Pro</span>
                    </div>
                    {isDemoMode && (
                        <span className="bg-brand-50 text-brand-700 text-[10px] font-bold px-2 py-1 rounded-full border border-brand-100 uppercase tracking-wide">
                            Demo Mode
                        </span>
                    )}
                </header>

                {/* Contextual Tip Bar (Demo) */}
                {isDemoMode && showDemoTip && (
                    <div className="bg-slate-900 text-white px-4 py-3 text-xs font-medium flex justify-between items-center animate-slide-down relative z-30">
                        <div className="flex gap-2 items-center">
                            <span className="bg-brand-500 w-1.5 h-1.5 rounded-full animate-pulse" />
                            <span>Tip: Create an invoice, add parts, then try the BOM tool.</span>
                        </div>
                        <button onClick={() => setShowDemoTip(false)} className="opacity-60 hover:opacity-100 p-1">
                            <X size={14} />
                        </button>
                    </div>
                )}

                <div className="flex-1 relative">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 pb-safe pt-2 z-50 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] flex justify-between items-center text-[10px]">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${isActive ? 'text-brand-600' : 'text-slate-400'
                                }`}
                        >
                            <div className={`p-1 rounded-full transition-all ${isActive ? 'bg-brand-50 translate-y-[-2px]' : ''}`}>
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className="transition-transform" />
                            </div>
                            <span className={`font-medium transition-opacity ${isActive ? 'opacity-100 font-bold' : 'opacity-70'}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}

// Simple icon import fix
function X({ size }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
}
