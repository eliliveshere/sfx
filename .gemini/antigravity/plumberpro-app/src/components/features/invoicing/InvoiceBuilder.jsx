import React, { useState } from 'react';
import { useApp } from '../../../data/AppContext';
import { Card, Button, Input, Badge, Drawer } from '../../ui/Primitives';
import { Plus, Trash2, Send, ArrowLeft, Search, Zap, Package, X, Check, ChevronDown } from 'lucide-react';

export default function InvoiceBuilder({ job, onBack, onComplete }) {
    const { parts, addInvoice } = useApp();
    const [items, setItems] = useState([
        { id: 'labor-1', type: 'labor', name: 'Service Call / Labor', qty: 1, price: 150 }
    ]);
    const [isPartsDrawerOpen, setIsPartsDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isSent, setIsSent] = useState(false);

    const categories = ['All', ...new Set(parts.map(p => p.category))];
    const filteredParts = parts.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCat;
    });

    const calculateTotals = () => {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const tax = subtotal * 0.08;
        const total = subtotal + tax;
        return { subtotal, tax, total };
    };
    const { subtotal, tax, total } = calculateTotals();

    const handleAddItem = (part) => {
        const newItem = {
            id: `item-${Date.now()}`,
            type: 'part',
            name: part.name,
            qty: 1,
            price: part.price
        };
        setItems([...items, newItem]);
        setIsPartsDrawerOpen(false);
    };

    // Inline edit handler
    const handleUpdateItem = (id, field, value) => {
        setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

    const handleSend = () => {
        setIsSent(true);
        // Simulate network delay
        setTimeout(() => {
            addInvoice(job.id, items, { subtotal, tax, total });
            onComplete();
        }, 1500);
    };

    return (
        <div className="animate-fade-in pb-32 md:pb-8 relative min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white sticky top-0 z-30 border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" className="!p-2 -ml-2" onClick={onBack}>
                        <ArrowLeft size={20} />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-bold text-slate-900 leading-none">Invoice #{1000 + Math.floor(Math.random() * 100)}</h2>
                        </div>
                        <p className="text-xs text-slate-500 font-medium mt-1">{job.clientName}</p>
                    </div>
                </div>
                <Badge variant={isSent ? "success" : "warning"}>
                    {isSent ? "SENDING..." : "DRAFT"}
                </Badge>
            </div>

            <div className="max-w-2xl mx-auto p-4 space-y-6">

                {/* Sections */}
                <div className="space-y-4">
                    {/* Labor Section */}
                    <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Labor</h3>
                        <div className="space-y-3">
                            {items.filter(i => i.type === 'labor').map((item) => (
                                <InvoiceItemRow key={item.id} item={item} onUpdate={handleUpdateItem} onRemove={() => setItems(items.filter(x => x.id !== item.id))} />
                            ))}
                            <Button variant="secondary" size="sm" className="w-full border-dashed text-slate-500 hover:text-brand-600 hover:border-brand-200" onClick={() => handleAddItem({ name: 'Extra Labor', price: 85, category: 'Labor' })}>
                                + Add Labor
                            </Button>
                        </div>
                    </div>

                    {/* Parts Section */}
                    <div>
                        <div className="flex justify-between items-end mb-2 ml-1 mr-1">
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Parts</h3>
                            <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold">{items.filter(i => i.type === 'part').length} Items</span>
                        </div>
                        <div className="space-y-3">
                            {items.filter(i => i.type === 'part').map((item) => (
                                <InvoiceItemRow key={item.id} item={item} onUpdate={handleUpdateItem} onRemove={() => setItems(items.filter(x => x.id !== item.id))} />
                            ))}
                            <Button variant="outline" className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-500 font-bold hover:bg-white hover:text-brand-600 hover:border-brand-300 transition-all" onClick={() => setIsPartsDrawerOpen(true)}>
                                <div className="flex flex-col items-center gap-1">
                                    <Plus size={24} />
                                    <span>Add Part to Invoice</span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 md:pl-64 bg-white border-t border-slate-200 p-4 pb-safe z-40 shadow-float">
                <div className="max-w-2xl mx-auto flex gap-4 items-center">
                    <div className="flex-1">
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                            <span className="text-sm font-bold text-slate-900">Total</span>
                            <span className="text-xl font-bold font-mono text-slate-900">${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <Button
                        variant="primary"
                        size="lg"
                        className={`min-w-[160px] shadow-xl shadow-brand-500/20 ${isSent ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                        onClick={handleSend}
                        disabled={isSent || items.length === 0}
                    >
                        {isSent ? (
                            <div className="flex items-center gap-2">
                                <Check size={20} /> Sent!
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Send size={18} /> Send Invoice
                            </div>
                        )}
                    </Button>
                </div>
            </div>

            {/* Add Part Drawer */}
            <Drawer isOpen={isPartsDrawerOpen} onClose={() => setIsPartsDrawerOpen(false)} title="Add Item">
                <div className="sticky top-0 bg-white z-10 pb-4 space-y-3">
                    <Input
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />
                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar pl-1">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${selectedCategory === cat
                                        ? 'bg-brand-600 text-white border-brand-600 shadow-md'
                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2 mt-2">
                    {filteredParts.length === 0 ? (
                        <div className="text-center py-8 text-slate-400">No parts found matching filters.</div>
                    ) : (
                        filteredParts.map(part => (
                            <button
                                key={part.id}
                                onClick={() => handleAddItem(part)}
                                className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center hover:bg-white hover:border-brand-300 transition-all active:scale-[0.99] group text-left"
                            >
                                <div>
                                    <div className="font-bold text-slate-900 group-hover:text-brand-700">{part.name}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="neutral" className="bg-white">{part.category}</Badge>
                                        <span className="text-xs text-slate-400 font-medium">Cost: ${part.cost}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-lg text-slate-900">${part.price.toFixed(2)}</div>
                                    <div className="text-xs font-bold text-brand-600 uppercase tracking-wider">+ Add</div>
                                </div>
                            </button>
                        ))
                    )}
                    <button className="w-full p-4 text-center text-sm font-bold text-brand-600 mt-4 border border-brand-100 bg-brand-50/50 rounded-xl" onClick={() => handleAddItem({ name: 'Custom Item', price: 0, category: 'Misc' })}>
                        + Create Custom Item
                    </button>
                </div>
            </Drawer>
        </div>
    );
}

function InvoiceItemRow({ item, onUpdate, onRemove }) {
    return (
        <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <input
                        className="font-bold text-slate-800 w-full bg-transparent focus:outline-none focus:underline placeholder:text-slate-300"
                        value={item.name}
                        onChange={(e) => onUpdate(item.id, 'name', e.target.value)}
                        placeholder="Item Name"
                    />
                </div>
                <button onClick={onRemove} className="text-slate-300 hover:text-red-500 p-1 -mr-1">
                    <Trash2 size={16} />
                </button>
            </div>

            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                    <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 font-bold text-slate-500" onClick={() => onUpdate(item.id, 'qty', Math.max(1, item.qty - 1))}>-</button>
                    <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                    <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-100 font-bold text-slate-500" onClick={() => onUpdate(item.id, 'qty', item.qty + 1)}>+</button>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold">RATE</span>
                    <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                        <input
                            type="number"
                            className="w-20 pl-4 py-1.5 rounded-md border border-slate-200 text-sm font-bold bg-white focus:border-brand-500 outline-none text-right pr-2"
                            value={item.price}
                            onChange={(e) => onUpdate(item.id, 'price', parseFloat(e.target.value) || 0)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end pt-1">
                <span className="text-xs font-bold text-slate-400 uppercase mr-2 mt-1">Line Total</span>
                <span className="font-bold text-slate-900">${(item.price * item.qty).toFixed(2)}</span>
            </div>
        </div>
    )
}
