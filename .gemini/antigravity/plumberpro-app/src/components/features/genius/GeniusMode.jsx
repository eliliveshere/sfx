import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Input, Badge } from '../../ui/Primitives';
import { Send, BrainCircuit, AlertTriangle, CheckCircle2, User } from 'lucide-react';

const PRESETS = [
    "Water heater pilot light won't stay lit",
    "Low water pressure in whole house",
    "Garbage disposal humming but not spinning"
];

const MOCK_RESPONSES = {
    default: {
        cause: "Common issue detected based on keywords.",
        steps: [
            "Check the main shutoff valve.",
            "Inspect visible pipes for leaks.",
            "Verify pressure regulator setting."
        ]
    },
    heater: {
        cause: "Thermocouple failure or gas supply issue.",
        steps: [
            "Check if gas valve is ON.",
            "Inspect thermocouple for soot/damage.",
            "Test thermocouple voltage (should be ~25mV).",
            "Clear air intake screen."
        ]
    },
    pressure: {
        cause: "PRV (Pressure Reducing Valve) failure or main line obstruction.",
        steps: [
            "Check pressure at hose bibb.",
            "Inspect PRV for signs of corrosion.",
            "Check aerators on faucets (if localized).",
            "Verify main shutoff is fully open."
        ]
    }
};

export default function GeniusMode() {
    const [messages, setMessages] = useState([
        { id: 'welcome', role: 'system', content: 'Hi, I’m your Genius Assistant. What are you seeing?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = (text = input) => {
        if (!text.trim()) return;

        // Add User Message
        const userMsg = { id: Date.now(), role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI Delay
        setTimeout(() => {
            let responseKey = 'default';
            if (text.toLowerCase().includes('heater') || text.toLowerCase().includes('pilot')) responseKey = 'heater';
            if (text.toLowerCase().includes('pressure')) responseKey = 'pressure';

            const reply = MOCK_RESPONSES[responseKey];

            const systemMsg = {
                id: Date.now() + 1,
                role: 'system',
                content: reply.cause,
                steps: reply.steps
            };

            setIsTyping(false);
            setMessages(prev => [...prev, systemMsg]);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-safe md:h-screen bg-slate-50 relative max-w-2xl mx-auto border-x border-slate-200 shadow-2xl">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 p-4 sticky top-0 z-20 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
                    <BrainCircuit size={20} className="text-white" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-slate-900 leading-none">Genius Mode</h1>
                    <p className="text-xs text-brand-600 font-bold mt-1 uppercase tracking-wide">AI Assistant</p>
                </div>
            </div>

            {/* Warning Banner */}
            <div className="bg-amber-50 text-amber-800 text-[10px] py-1.5 px-4 text-center uppercase font-bold border-b border-amber-100 flex items-center justify-center gap-2">
                <AlertTriangle size={12} />
                Info only. Follow local code.
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                        {msg.role === 'system' && (
                            <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center mr-2 shrink-0 shadow-sm mt-1">
                                <BrainCircuit size={14} className="text-brand-600" />
                            </div>
                        )}
                        <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                ? 'bg-slate-800 text-white rounded-tr-sm'
                                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm'
                            }`}>
                            {msg.content}

                            {/* Checklist for System messages */}
                            {msg.steps && (
                                <div className="mt-4 space-y-3 pt-3 border-t border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Suggested Actions</p>
                                    {msg.steps.map((step, idx) => (
                                        <div key={idx} className="flex gap-2.5 items-start bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                            <div className="mt-0.5 bg-white rounded-full p-0.5 border border-slate-200 shrink-0">
                                                <CheckCircle2 size={12} className="text-brand-500" />
                                            </div>
                                            <span className="font-medium text-slate-700">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center mr-2 shadow-sm">
                            <BrainCircuit size={14} className="text-brand-600 animate-pulse" />
                        </div>
                        <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm">
                            <div className="flex gap-1.5 h-full items-center">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} className="h-4" />
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t border-slate-200 pb-24 md:pb-4 shadow-float z-30">
                {messages.length < 3 && (
                    <div className="flex gap-2 overflow-x-auto mb-3 pb-1 no-scrollbar">
                        {PRESETS.map(p => (
                            <button key={p} onClick={() => handleSend(p)} className="whitespace-nowrap px-3 py-2 bg-brand-50 text-brand-700 text-xs font-bold rounded-lg border border-brand-100 hover:bg-brand-100 transition-colors">
                                {p}
                            </button>
                        ))}
                    </div>
                )}
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about a problem..."
                        className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500/20 focus:bg-white transition-all outline-none font-medium placeholder:text-slate-400"
                    />
                    <Button variant="primary" className="!p-3 rounded-xl aspect-square" onClick={() => handleSend()}>
                        <Send size={20} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
