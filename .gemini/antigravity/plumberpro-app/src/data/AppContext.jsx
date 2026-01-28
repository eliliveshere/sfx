import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_JOBS, MOCK_PARTS, MOCK_INVOICES } from './mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
    // State
    const [activeTab, setActiveTab] = useState('jobs'); // jobs | invoices | parts | genius | bom
    const [activeJob, setActiveJob] = useState(null); // Selected Job for Drilldown

    const [jobs, setJobs] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [parts, setParts] = useState([]);
    const [isDemoMode, setIsDemoMode] = useState(false);
    const [toasts, setToasts] = useState([]);

    // Persistence (Simulated)
    useEffect(() => {
        const savedDemo = localStorage.getItem('plumber-pro-demo');
        if (savedDemo === 'true') {
            enableDemoMode();
        }
    }, []);

    const enableDemoMode = () => {
        setIsDemoMode(true);
        setJobs(MOCK_JOBS);
        setParts(MOCK_PARTS);
        setInvoices(MOCK_INVOICES);
        localStorage.setItem('plumber-pro-demo', 'true');
        addToast('Demo Data Loaded', 'success');
    };

    const disableDemoMode = () => {
        setIsDemoMode(false);
        setJobs([]);
        // Keep parts maybe? For now clear.
        setParts([]);
        setInvoices([]);
        setActiveJob(null);
        localStorage.removeItem('plumber-pro-demo');
        addToast('Demo Mode Disabled', 'info');
    };

    const addInvoice = (jobId, items, totals) => {
        const newInvoice = {
            id: `inv-${Date.now()}`,
            jobId,
            items,
            ...totals,
            status: 'Sent',
            date: new Date().toISOString(),
            number: 1000 + invoices.length + 1
        };
        setInvoices([newInvoice, ...invoices]);
        addToast('Invoice Sent Successfully', 'success');
        return newInvoice;
    };

    const addPart = (part) => {
        setParts([...parts, { ...part, id: `p-${Date.now()}` }]);
    };

    const addToast = (message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 3000);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const value = {
        activeTab, setActiveTab,
        jobs, setJobs,
        invoices, setInvoices,
        parts, setParts,
        activeJob, setActiveJob,
        isDemoMode, enableDemoMode, disableDemoMode,
        addInvoice,
        addPart,
        toasts, addToast, removeToast
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}
