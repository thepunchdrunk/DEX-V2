import React from 'react';
import {
    Check,
    Coffee,
    Users,
} from 'lucide-react';
import { CoffeeChatSuggestion } from '../../../types';

interface CoffeePhaseProps {
    coffeeChats: CoffeeChatSuggestion[];
    setCoffeeChats: React.Dispatch<React.SetStateAction<CoffeeChatSuggestion[]>>;
}

const CoffeePhase: React.FC<CoffeePhaseProps> = ({
    coffeeChats,
    setCoffeeChats,
}) => {
    const handleScheduleCoffee = (id: string) => {
        setCoffeeChats(prev => prev.map(c =>
            c.id === id ? { ...c, scheduled: true, scheduledAt: new Date().toISOString() } : c
        ));
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Mentorship & Synergy Hub</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Build high-fidelity connections early. We've matched you with key institutional nodes to accelerate your integration.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Planned Coffee Chats">
                {coffeeChats.map((chat) => (
                    <div key={chat.id} role="listitem" className="bg-white rounded-[32px] border border-neutral-100 shadow-xl shadow-neutral-100/30 p-8 group hover:border-brand-red/20 transition-all overflow-hidden relative">
                        <div className="flex items-start gap-6 relative z-10">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center text-brand-red text-xl font-black shadow-lg shadow-red-500/10 group-hover:scale-105 transition-transform" aria-hidden="true">
                                    {chat.personName.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" aria-hidden="true" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-black text-neutral-900 tracking-tight leading-none mb-1">{chat.personName}</h4>
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{chat.personTitle}</p>
                                <div className="mt-4 p-4 bg-neutral-50 rounded-2xl border border-neutral-100/50">
                                    <p className="text-[11px] text-neutral-600 font-medium leading-relaxed italic">"{chat.reason}"</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-3">Suggested Discussion Verticals</p>
                            <div className="flex flex-wrap gap-2" role="list" aria-label="Suggested topics">
                                {chat.suggestedTopics.map((topic, i) => (
                                    <span key={i} role="listitem" className="text-[10px] px-3 py-1.5 bg-white border border-neutral-100 text-neutral-600 font-bold rounded-lg shadow-sm hover:border-brand-red/30 transition-colors">
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10">
                            {chat.scheduled ? (
                                <div className="w-full py-4 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-2xl border border-emerald-100 flex items-center justify-center gap-3" role="status">
                                    <Check className="w-4 h-4" aria-hidden="true" /> Connection Synchronized
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleScheduleCoffee(chat.id)}
                                    aria-label={`Initialize Connection with ${chat.personName}`}
                                    className="w-full py-5 bg-brand-red hover:bg-neutral-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-red-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                                >
                                    <Coffee className="w-4 h-4" aria-hidden="true" /> Initialize Connection
                                </button>
                            )}
                        </div>

                        {/* Subtle Background Pattern */}
                        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity" aria-hidden="true">
                            <Users className="w-24 h-24" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoffeePhase;
