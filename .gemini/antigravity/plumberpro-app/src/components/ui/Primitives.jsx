import React from 'react';
import { Loader2, CheckCircle2, X, Info } from 'lucide-react';
import { useApp } from '../../data/AppContext';

export function Card({ children, className = '', noPadding = false, ...props }) {
    return (
        <div className={`bg-white rounded-xl shadow-card border border-slate-200 overflow-hidden ${className}`} {...props}>
            <div className={noPadding ? '' : 'p-4'}>
                {children}
            </div>
        </div>
    );
}

export function Button({ children, variant = 'primary', size = 'default', className = '', ...props }) {
    const base = "inline-flex items-center justify-center font-bold tracking-tight transition-all active:scale-[0.96] disabled:opacity-50 disabled:active:scale-100 rounded-xl";

    const sizes = {
        sm: "text-xs px-3 py-1.5 h-8",
        default: "text-sm px-5 py-3 h-12",
        lg: "text-base px-6 py-4 h-14"
    };

    const variants = {
        primary: "bg-brand-600 text-white shadow-lg shadow-brand-600/20 hover:bg-brand-700 hover:shadow-brand-600/30",
        secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm",
        ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent",
        destructive: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100",
        outline: "bg-transparent border-2 border-slate-200 text-slate-600 hover:border-brand-600 hover:text-brand-600"
    };

    return (
        <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}

export function Badge({ children, variant = 'neutral', className = '' }) {
    const variants = {
        success: "bg-emerald-100/50 text-emerald-700 border-emerald-200 shadow-sm shadow-emerald-500/10",
        warning: "bg-amber-100/50 text-amber-700 border-amber-200",
        neutral: "bg-slate-100 text-slate-600 border-slate-200",
        brand: "bg-brand-100/50 text-brand-700 border-brand-200 shadow-sm shadow-brand-500/10",
        dark: "bg-slate-800 text-white border-slate-700"
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}

export function Input({ label, className = '', ...props }) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>}
            <input
                className={`w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all font-medium text-slate-900 placeholder:text-slate-400 ${className}`}
                {...props}
            />
        </div>
    );
}

export function Drawer({ isOpen, onClose, children, title }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-fade-in"
                onClick={onClose}
            />
            {/* Drawer Content */}
            <div className="relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-slide-up">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <h3 className="font-bold text-lg text-slate-900">{title}</h3>
                    <button onClick={onClose} className="p-2 bg-slate-50 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>
                <div className="overflow-y-auto p-4 pb-safe">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function ToastContainer() {
    const { toasts, removeToast } = useApp();
    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-sm px-4">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className="bg-slate-900 text-white px-4 py-3 rounded-xl shadow-float flex items-center justify-between gap-3 animate-slide-down"
                    onClick={() => removeToast(toast.id)}
                >
                    <div className="flex items-center gap-3">
                        {toast.type === 'success' ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Info size={18} className="text-brand-400" />}
                        <span className="font-medium text-sm">{toast.message}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function EmptyState({ icon: Icon, title, description, action }) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Icon size={32} className="text-slate-300" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">{title}</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto mb-6">{description}</p>
            {action}
        </div>
    );
}
