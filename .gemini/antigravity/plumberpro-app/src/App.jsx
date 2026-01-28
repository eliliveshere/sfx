import React from 'react';
import { AppProvider, useApp } from './data/AppContext';
import AppShell from './components/layout/AppShell';
import JobsView from './components/features/invoicing/JobsView';
import InvoiceHistory from './components/features/invoicing/InvoiceHistory';
import PartsCatalog from './components/features/parts/PartsCatalog';
import GeniusMode from './components/features/genius/GeniusMode';
import BOMOptimizer from './components/features/bom/BOMOptimizer';
import { Button } from './components/ui/Primitives';

function AppContent() {
  const { activeTab, enableDemoMode, isDemoMode, jobs } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'jobs':
        return <JobsView />;
      case 'invoices':
        return <InvoiceHistory />;
      case 'parts':
        return <PartsCatalog />;
      case 'genius':
        return <GeniusMode />;
      case 'bom':
        return <BOMOptimizer />;
      default:
        return <JobsView />;
    }
  };

  return (
    <AppShell>
      {/* Global Empty State / Demo Prompt if generic */}
      {activeTab === 'jobs' && jobs.length === 0 && !isDemoMode && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl scale-100 animate-slide-up">
            <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚀</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Welcome to Plumber Pro</h2>
            <p className="text-slate-500 mb-6">This is a pilot MVP. Load the demo data to explore the features instantly.</p>
            <Button variant="primary" className="w-full text-lg shadow-brand-500/40" onClick={enableDemoMode}>
              Load Demo Data
            </Button>
            <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-widest">Plumber Pro Alpha v0.1</p>
          </div>
        </div>
      )}
      {renderContent()}
    </AppShell>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
