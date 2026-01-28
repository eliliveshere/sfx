import React, { useState } from 'react';
import { Card, Button, Badge, ToastContainer } from '../../ui/Primitives';
import { UploadCloud, FileSpreadsheet, CheckCircle, TrendingDown, Clock, Truck, Download, ChevronRight, BarChart3 } from 'lucide-react';
import { useApp } from '../../../data/AppContext';

export default function BOMOptimizer() {
    const { addToast } = useApp();
    const [step, setStep] = useState(1);
    const [analyzing, setAnalyzing] = useState(false);

    const handleRunAnalysis = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setStep(3);
            addToast('Optimization Complete', 'success');
        }, 2000);
    };

    const handleExport = (type) => {
        addToast(`${type} Exported Successfully`, 'success');
    };

    const AnalysisCard = ({ title, supplier, total, time, truck, best }) => (
        <div className={`relative overflow-hidden transition-all rounded-xl border ${best ? 'bg-brand-50/50 border-brand-200 shadow-md ring-1 ring-brand-500/20' : 'bg-white border-slate-200 shadow-sm'}`}>
            {best && (
                <div className="absolute top-0 right-0 bg-brand-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-sm">
                    Recommended
                </div>
            )}
            <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                    <div className={`p-2.5 rounded-lg ${best ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-500'}`}>
                        {title.includes('Cheap') ? <TrendingDown size={20} /> : title.includes('Fast') ? <Clock size={20} /> : <Truck size={20} />}
                    </div>
                </div>

                <div className="mb-4">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">{title}</div>
                    <div className="font-extrabold text-2xl text-slate-900 tracking-tight">{total}</div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100/50 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">Source</span>
                        <span className="font-bold text-slate-800">{supplier}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">Lead Time</span>
                        <span className="font-bold text-slate-800">{time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">Logistics</span>
                        <Badge variant="neutral">{truck} Stop(s)</Badge>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 pb-24 md:pb-8 flex flex-col h-full animate-fade-in max-w-4xl mx-auto w-full">
            {/* Header */}
            <div className="mb-8 text-center md:text-left">
                <Badge variant="brand" className="mb-3">Beta Tool</Badge>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Smart BOM Optimizer</h1>
                <p className="text-slate-500 max-w-lg mx-auto md:mx-0">Upload your material lists and let our engine find the cheapest, fastest procurement strategy across all your suppliers.</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between max-w-md mx-auto md:mx-0 mb-8 px-4">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2 relative z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${step >= s ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30 scale-110' : 'bg-slate-100 text-slate-400'
                            }`}>
                            {step > s ? <CheckCircle size={16} /> : s}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= s ? 'text-brand-600' : 'text-slate-300'}`}>
                            {s === 1 ? 'Upload' : s === 2 ? 'Review' : 'Results'}
                        </span>
                    </div>
                ))}
                {/* Progress Line */}
                <div className="absolute left-0 right-0 top-4 h-0.5 bg-slate-100 -z-0 max-w-md mx-auto md:mx-0" />
                <div
                    className="absolute left-0 top-4 h-0.5 bg-brand-500 -z-0 transition-all duration-500 max-w-md mx-auto md:mx-0"
                    style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                />
            </div>

            {step === 1 && (
                <div className="space-y-6 animate-slide-up bg-white p-8 rounded-2xl shadow-card border border-slate-200">
                    <div
                        className="border-dashed border-2 border-slate-200 rounded-xl bg-slate-50/50 py-16 flex flex-col items-center justify-center cursor-pointer hover:bg-brand-50 hover:border-brand-300 transition-all group"
                        onClick={() => { addToast('File Uploaded', 'success'); setStep(2); }}
                    >
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                            <UploadCloud className="text-brand-500" size={36} />
                        </div>
                        <h3 className="font-bold text-slate-900 text-xl mb-2">Upload Project BOM</h3>
                        <p className="text-slate-500 text-sm">Drag & drop CSV, Excel, or PDF</p>
                    </div>

                    <div className="flex justify-between items-center text-xs text-slate-400 font-medium px-2">
                        <span>Secure Processing</span>
                        <span>Max 25MB</span>
                    </div>
                </div>
            )}

            {step === 2 && !analyzing && (
                <div className="space-y-6 animate-slide-up max-w-md mx-auto">
                    <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 shadow-sm">
                        <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
                            <FileSpreadsheet size={24} />
                        </div>
                        <div className="flex-1">
                            <div className="font-bold text-slate-900">Smith_Residence_Final.csv</div>
                            <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
                                <CheckCircle size={10} /> 42 Items Validated
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setStep(1)}>Change</Button>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-4 opacity-70">
                        <div className="bg-slate-200 p-3 rounded-lg text-slate-500">
                            <BarChart3 size={24} />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-slate-700 text-sm">Supplier Data</p>
                            <p className="text-xs text-slate-500 mt-1">Using 3 active price lists</p>
                        </div>
                    </div>

                    <Button variant="primary" size="lg" className="w-full text-lg shadow-xl shadow-brand-500/20" onClick={handleRunAnalysis}>
                        Run AI Optimization
                    </Button>
                </div>
            )}

            {analyzing && (
                <div className="py-24 text-center animate-fade-in">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                        <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
                        <div className="absolute inset-0 border-4 border-t-brand-600 rounded-full animate-spin" />
                        <BrainCircuit className="absolute inset-0 m-auto text-brand-600" size={32} />
                    </div>
                    <h3 className="font-bold text-2xl text-slate-900 mb-2">Crunching Numbers...</h3>
                    <p className="text-slate-500">Analyzing 1,204 price points across 3 suppliers to find your best deal.</p>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-8 animate-slide-up">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AnalysisCard
                            title="Cheapest Total"
                            total="$2,450.12"
                            supplier="Split Order (Mix)"
                            time="2 Days"
                            truck={2}
                            best={true}
                        />
                        <AnalysisCard
                            title="Fastest Availability"
                            total="$2,890.50"
                            supplier="MegaDepot"
                            time="Today (Pickup)"
                            truck={1}
                        />
                        <AnalysisCard
                            title="Fewest Suppliers"
                            total="$2,610.00"
                            supplier="PlumberSupplyCo"
                            time="1 Day"
                            truck={1}
                        />
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 md:pl-64 bg-white border-t border-slate-200 p-4 pb-safe z-40 shadow-float">
                        <div className="max-w-4xl mx-auto flex gap-3">
                            <Button variant="secondary" className="flex-1" onClick={() => handleExport('Purchase Order')}>
                                <Download size={18} className="mr-2" /> Export POs
                            </Button>
                            <Button variant="primary" className="flex-1" onClick={() => handleExport('Pick List')}>
                                <Download size={18} className="mr-2" /> Export Pick List
                            </Button>
                        </div>
                    </div>

                    <div className="text-center pt-8 pb-32">
                        <button onClick={() => setStep(1)} className="text-slate-400 text-sm font-bold hover:text-brand-600 transition-colors uppercase tracking-wider">Start New Analysis</button>
                    </div>
                </div>
            )}
        </div>
    );
}
