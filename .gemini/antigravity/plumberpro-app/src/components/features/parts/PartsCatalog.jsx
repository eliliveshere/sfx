import React, { useState } from 'react';
import { useApp } from '../../../data/AppContext';
import { Input, Card, Badge, EmptyState } from '../../ui/Primitives';
import { Search, Filter, Package, Plus } from 'lucide-react';

export default function PartsCatalog() {
    const { parts, activeTab } = useApp();
    const [search, setSearch] = useState('');
    const [filterCat, setFilterCat] = useState('All');

    // Derive categories
    const categories = ['All', ...new Set(parts.map(p => p.category))];

    const filteredParts = parts.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCat = filterCat === 'All' || p.category === filterCat;
        return matchesSearch && matchesCat;
    });

    return (
        <div className="p-4 pb-24 md:pb-8 flex flex-col h-full animate-fade-in relative max-w-2xl mx-auto w-full">
            <div className="sticky top-0 bg-slate-50/95 backdrop-blur-sm pt-2 pb-4 z-20">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">Parts Catalog</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input
                        placeholder="Search master catalog..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="shadow-sm pl-10 bg-white"
                    />
                </div>
                {/* Category Pills */}
                <div className="flex gap-2 overflow-x-auto mt-4 pb-1 no-scrollbar -mx-4 px-4">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilterCat(cat)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all border ${filterCat === cat
                                    ? 'bg-brand-600 text-white border-brand-600 shadow-md transform scale-105'
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 active:scale-95'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 flex-1 overflow-y-auto">
                {filteredParts.length === 0 ? (
                    <EmptyState
                        icon={Package}
                        title="No parts found"
                        description={`No results for "${search}" in ${filterCat}.`}
                    />
                ) : (
                    filteredParts.map(part => (
                        <div key={part.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-card flex justify-between items-center group hover:border-brand-200 transition-all">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="neutral" className="bg-slate-50 border-slate-100">{part.category}</Badge>
                                </div>
                                <div className="font-bold text-slate-900 text-base">{part.name}</div>
                                <div className="text-xs text-slate-400 font-medium mt-1">Ref: {part.id.toUpperCase()}</div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                                <div>
                                    <div className="font-bold text-lg text-slate-900">${part.price.toFixed(2)}</div>
                                    <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Sale Price</div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
