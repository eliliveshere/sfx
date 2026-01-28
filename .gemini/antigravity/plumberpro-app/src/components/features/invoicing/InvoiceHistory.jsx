import React, { useState } from 'react';
import { useApp } from '../../../data/AppContext';
import { Card, Badge, Button, Drawer } from '../../ui/Primitives';
import { FileText, CheckCircle2, ChevronRight, X, Clock, Receipt } from 'lucide-react';

export default function InvoiceHistory() {
    const { invoices, jobs } = useApp();
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const getJobName = (jobId) => {
        const job = jobs.find(j => j.id === jobId);
        return job ? job.clientName : 'Unknown Client';
    };

    const getJobAddress = (jobId) => {
        const job = jobs.find(j => j.id === jobId);
        return job ? job.address : '';
    };

    return (
        <div className="p-4 pb-24 md:pb-8 space-y-6 animate-fade-in max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Invoice History</h1>

            {invoices.length === 0 ? (
                <div className="text-center py-24 text-slate-400">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText size={40} className="text-slate-300" />
                    </div>
                    <p className="font-bold text-slate-600 text-lg">No invoices yet</p>
                    <p className="text-sm mt-2 max-w-xs mx-auto">Complete jobs to generate and send invoices to your clients.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {invoices.map((inv) => (
                        <div
                            key={inv.id}
                            onClick={() => setSelectedInvoice(inv)}
                            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center cursor-pointer hover:border-brand-300 hover:shadow-md transition-all active:scale-[0.99] group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl transition-colors ${inv.status === 'Sent' ? 'bg-emerald-100 text-emerald-600' : 'bg-brand-50 text-brand-600'
                                    }`}>
                                    <Receipt size={24} />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                                        #{inv.number} • {getJobName(inv.jobId)}
                                    </div>
                                    <div className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1">
                                        <Clock size={12} />
                                        {new Date(inv.date).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-lg text-slate-900">${inv.total?.toFixed(2) || '0.00'}</div>
                                <Badge variant={inv.status === 'Sent' ? 'success' : 'neutral'} className="mt-1">
                                    {inv.status?.toUpperCase() || 'DRAFT'}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Invoice Detail Drawer */}
            <Drawer isOpen={!!selectedInvoice} onClose={() => setSelectedInvoice(null)} title={`Invoice #${selectedInvoice?.number}`}>
                {selectedInvoice && (
                    <div className="space-y-6 pt-2">
                        {/* Status Banner */}
                        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-center justify-center gap-2 text-emerald-700 font-bold text-sm">
                            <CheckCircle2 size={16} />
                            Sent on {new Date(selectedInvoice.date).toLocaleDateString()} at {new Date(selectedInvoice.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>

                        {/* Customer Info */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bill To</h4>
                            <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                                <div className="font-bold text-lg text-slate-900">{getJobName(selectedInvoice.jobId)}</div>
                                <div className="text-slate-500 text-sm mt-1">{getJobAddress(selectedInvoice.jobId)}</div>
                            </div>
                        </div>

                        {/* Line Items */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Line Items</h4>
                            <div className="border border-slate-200 rounded-xl overflow-hidden">
                                {selectedInvoice.items?.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-3 border-b border-slate-100 last:border-0 bg-white">
                                        <div>
                                            <div className="font-bold text-slate-800 text-sm">{item.name}</div>
                                            <div className="text-xs text-slate-400 mt-0.5">Qty: {item.qty} × ${item.price.toFixed(2)}</div>
                                        </div>
                                        <div className="font-bold text-slate-900">
                                            ${(item.qty * item.price).toFixed(2)}
                                        </div>
                                    </div>
                                )) || <div className="p-4 text-center text-slate-400 text-sm">No items found</div>}
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="space-y-2 pt-2">
                            <div className="flex justify-between text-sm text-slate-500">
                                <span>Subtotal</span>
                                <span>${selectedInvoice.subtotal?.toFixed(2) || '0.00'}</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-500 border-b border-slate-200 pb-2">
                                <span>Tax (8%)</span>
                                <span>${selectedInvoice.tax?.toFixed(2) || '0.00'}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-slate-900 pt-1">
                                <span>Total Paid</span>
                                <span>${selectedInvoice.total?.toFixed(2) || '0.00'}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-3 pt-4">
                            <Button variant="secondary" className="w-full">Resend Email</Button>
                            <Button variant="secondary" className="w-full">Download PDF</Button>
                        </div>
                    </div>
                )}
            </Drawer>
        </div>
    );
}
