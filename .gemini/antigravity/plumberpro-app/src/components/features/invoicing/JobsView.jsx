import React, { useState } from 'react';
import { useApp } from '../../../data/AppContext';
import { Card, Button, Badge, EmptyState } from '../../ui/Primitives';
import { MapPin, Calendar, Clock, ChevronRight, Play, Briefcase, Phone, Mail, StickyNote } from 'lucide-react';
import InvoiceBuilder from './InvoiceBuilder';

export default function JobsView() {
    const { jobs, isDemoMode, enableDemoMode } = useApp();
    const [selectedJob, setSelectedJob] = useState(null);
    const [isBuildingInvoice, setIsBuildingInvoice] = useState(false);

    // Sub-navigation handling
    if (isBuildingInvoice && selectedJob) {
        return (
            <InvoiceBuilder
                job={selectedJob}
                onBack={() => setIsBuildingInvoice(false)}
                onComplete={() => {
                    setIsBuildingInvoice(false);
                    setSelectedJob(null);
                }}
            />
        );
    }

    if (selectedJob) {
        return (
            <div className="animate-slide-up pb-24 md:pb-8">
                {/* Job Detail Header */}
                <div className="relative bg-slate-850 text-white p-6 pt-safe pb-12 flex flex-col shadow-lg">
                    <div className="flex justify-between items-start mb-4">
                        <button
                            onClick={() => setSelectedJob(null)}
                            className="bg-white/10 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/20 transition-all active:scale-95"
                        >
                            <ChevronRight size={20} className="rotate-180" />
                        </button>
                        <Badge variant="brand">{selectedJob.status}</Badge>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight mb-2">{selectedJob.clientName}</h1>
                    <div className="flex items-center text-slate-300 text-sm font-medium">
                        <MapPin size={16} className="mr-1.5 text-brand-400" /> {selectedJob.address}
                    </div>
                </div>

                <div className="px-4 -mt-8 relative z-10 max-w-2xl mx-auto space-y-6">
                    <Card className="shadow-float">
                        <div className="grid grid-cols-2 gap-6 border-b border-slate-100 pb-4 mb-4">
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date</div>
                                <div className="font-semibold text-slate-900 flex items-center gap-2">
                                    <Calendar size={16} className="text-brand-500" />
                                    {selectedJob.date}
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Window</div>
                                <div className="font-semibold text-slate-900 flex items-center gap-2">
                                    <Clock size={16} className="text-brand-500" />
                                    8AM - 12PM
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Service Request</div>
                            <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                                "{selectedJob.description}"
                            </p>
                        </div>
                    </Card>

                    <Card className="shadow-float">
                        <div className="mb-4">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Contact Information</div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                                        <Phone size={14} />
                                    </div>
                                    <span className="font-medium text-slate-700">{selectedJob.phone || 'No phone'}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                                        <Mail size={14} />
                                    </div>
                                    <span className="font-medium text-slate-700">{selectedJob.email || 'No email'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Job Notes</div>
                            <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg text-amber-900 text-sm font-medium flex gap-2">
                                <StickyNote size={16} className="shrink-0 mt-0.5 opacity-60" />
                                {selectedJob.notes || 'No notes available.'}
                            </div>
                        </div>
                    </Card>

                    <div className="space-y-3">
                        <Button variant="primary" size="lg" className="w-full justify-between group shadow-lg shadow-brand-500/20" onClick={() => setIsBuildingInvoice(true)}>
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-1.5 rounded-lg">
                                    <Play fill="currentColor" size={16} />
                                </div>
                                <span className="font-bold">Start Invoice</span>
                            </div>
                            <ChevronRight className="opacity-60 group-hover:translate-x-1 transition-transform" />
                        </Button>

                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="secondary" className="w-full justify-center gap-2 text-slate-600">
                                <MapPin size={18} /> GPS
                            </Button>
                            <Button variant="secondary" className="w-full justify-center gap-2 text-slate-600">
                                Call
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Job List
    return (
        <div className="p-4 pb-24 md:pb-8 max-w-2xl mx-auto animate-fade-in space-y-6">
            <div className="flex justify-between items-end pt-2">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Jobs</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <div className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200">
                    {jobs.length} Stops
                </div>
            </div>

            <div className="space-y-4">
                {jobs.length === 0 ? (
                    <EmptyState
                        icon={Briefcase}
                        title="No jobs today"
                        description={isDemoMode ? "You're all clear! Relax." : "Enable demo mode to see sample data."}
                        action={!isDemoMode && (
                            <Button onClick={enableDemoMode} variant="outline" className="text-brand-600 border-brand-200 hover:bg-brand-50 mt-4">
                                Load Demo Data
                            </Button>
                        )}
                    />
                ) : (
                    jobs.map((job, idx) => (
                        <div
                            key={job.id}
                            onClick={() => setSelectedJob(job)}
                            className="bg-white p-5 rounded-2xl shadow-card border border-slate-200 active:scale-[0.98] transition-all hover:border-brand-300 hover:shadow-md cursor-pointer group relative overflow-hidden"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-brand-700 transition-colors">
                                        {job.clientName}
                                    </h3>
                                    <span className="text-sm text-slate-500 font-medium mt-0.5">{job.address}</span>
                                </div>
                                <Badge variant={job.status === 'Completed' ? 'success' : job.status === 'In Progress' ? 'brand' : 'neutral'}>
                                    {job.status}
                                </Badge>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wide">
                                    <Clock size={14} /> 8:00 AM - 12:00 PM
                                </div>
                                <div className="text-brand-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    View Job <ChevronRight size={16} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
