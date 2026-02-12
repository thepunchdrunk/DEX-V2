import React, { useState } from 'react';
import {
    ChevronRight,
    Check,
    Mail,
    Clock,
    Send,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';
import { Critical5Contact } from '../../../types';

interface CriticalContactsPhaseProps {
    contacts: Critical5Contact[];
    setContacts: React.Dispatch<React.SetStateAction<Critical5Contact[]>>;
    onComplete: () => void;
}

const CriticalContactsPhase: React.FC<CriticalContactsPhaseProps> = ({
    contacts,
    setContacts,
    onComplete,
}) => {
    const [expandedContact, setExpandedContact] = useState<string | null>(null);
    const [messageInputs, setMessageInputs] = useState<Record<string, string>>({});

    const introDraftsSent = contacts.filter(c => c.introSent).length;

    const handleSendIntro = (contactId: string) => {
        setContacts(prev => prev.map(c =>
            c.id === contactId ? { ...c, introSent: true, introSentAt: new Date().toISOString() } : c
        ));
    };

    const getRelationshipIcon = (type: Critical5Contact['relationship']) => {
        switch (type) {
            case 'MANAGER': return '👤';
            case 'MENTOR': return '🎓';
            case 'PEER': return '🤝';
            case 'STAKEHOLDER': return '🎯';
            case 'BUDDY': return '👋';
            default: return '👤';
        }
    };

    return (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Your Key Network</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Connect with these 5 key people to get up to speed.
                </p>
            </div>

            <div className="space-y-4" role="list" aria-label="Critical 5 Relational Nodes">
                {contacts.map((contact) => (
                    <div
                        key={contact.id}
                        role="listitem"
                        className={`
                            relative bg-white rounded-[32px] border transition-all group overflow-hidden
                            ${expandedContact === contact.id ? 'border-brand-red/20 ring-4 ring-brand-red/5' : 'border-neutral-100 hover:border-brand-red/10'}
                            ${contact.introSent ? 'bg-emerald-50/10 border-emerald-100' : ''}
                        `}
                    >
                        <button
                            onClick={() => setExpandedContact(expandedContact === contact.id ? null : contact.id)}
                            aria-expanded={expandedContact === contact.id}
                            aria-label={`${contact.name}, ${contact.title}. ${contact.relationship}. ${contact.introSent ? 'Introduced' : 'Action Required'}`}
                            className="w-full p-8 flex items-center gap-8 group"
                        >
                            <div className="relative">
                                <div className="w-20 h-20 rounded-[24px] bg-white border border-neutral-100 flex items-center justify-center text-brand-red font-black text-2xl shadow-xl group-hover:scale-105 transition-transform duration-500 overflow-hidden" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent opacity-50" />
                                    <span className="relative z-10">{contact.name.split(' ').map(n => n[0]).join('')}</span>
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-white border border-neutral-100 shadow-lg flex items-center justify-center text-lg" aria-hidden="true">
                                    {getRelationshipIcon(contact.relationship)}
                                </div>
                            </div>

                            <div className="flex-1 text-left">
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className="text-xl font-black text-neutral-900 tracking-tight leading-none">{contact.name}</h4>
                                    <span className={`
                                        text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest border
                                        ${contact.relationship === 'MANAGER' ? 'bg-blue-50 text-blue-600 border-blue-100' : ''}
                                        ${contact.relationship === 'MENTOR' ? 'bg-purple-50 text-purple-600 border-purple-100' : ''}
                                        ${contact.relationship === 'PEER' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : ''}
                                        ${contact.relationship === 'STAKEHOLDER' ? 'bg-amber-50 text-amber-600 border-amber-100' : ''}
                                        ${contact.relationship === 'BUDDY' ? 'bg-pink-50 text-pink-600 border-pink-100' : ''}
                                    `}>
                                        {contact.relationship}
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">{contact.title}</p>
                            </div>

                            <div className="flex items-center gap-6">
                                {contact.introSent && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 text-[9px] font-black uppercase tracking-widest" role="status" aria-label="Connection established">
                                        <Check className="w-3.5 h-3.5" aria-hidden="true" /> Node Linked
                                    </div>
                                )}
                                <div className={`p-3 rounded-full transition-colors ${expandedContact === contact.id ? 'bg-brand-red text-white' : 'bg-neutral-50 text-neutral-400 group-hover:bg-neutral-100'}`} aria-hidden="true">
                                    {expandedContact === contact.id ? (
                                        <ChevronUp className="w-5 h-5" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5" />
                                    )}
                                </div>
                            </div>
                        </button>

                        {/* Expanded Relationship Intelligence View */}
                        {expandedContact === contact.id && (
                            <div className="px-8 pb-8 animate-slide-up" role="region" aria-label={`${contact.name} relationship details`}>
                                <div className="pt-8 border-t border-neutral-50 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Relational Context */}
                                    <div className="bg-neutral-50/50 rounded-3xl p-6 border border-neutral-100">
                                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3">Strategic Context</p>
                                        <p className="text-xs text-neutral-600 font-medium leading-relaxed">{contact.whyTheyMatter}</p>
                                    </div>

                                    {/* Discussion Nodes */}
                                    <div>
                                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Relational On-Ramps</p>
                                        <div className="flex flex-wrap gap-2" role="list" aria-label="Suggested discussion topics">
                                            {contact.suggestedTopics.map((topic, i) => (
                                                <span key={i} role="listitem" className="text-[10px] px-3 py-1.5 bg-white border border-neutral-100 text-neutral-600 font-bold rounded-xl shadow-sm hover:border-brand-red/20 transition-colors cursor-default">
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Channel Protocols */}
                                <div className="mt-8 p-6 bg-neutral-50 rounded-[24px] text-neutral-600 flex items-center justify-between border border-neutral-100" role="region" aria-label="Communication Protocol">
                                    <div className="flex items-center gap-8">
                                        <div>
                                            <p className="text-[9px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-1.5">Primary Channel</p>
                                            <div className="flex items-center gap-2 text-xs font-bold">
                                                <Mail className="w-3.5 h-3.5 text-brand-red" aria-hidden="true" />
                                                {contact.communicationPreference.preferredChannel}
                                            </div>
                                        </div>
                                        <div className="w-px h-10 bg-neutral-200" aria-hidden="true" />
                                        <div>
                                            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-1.5">Sync Window</p>
                                            <div className="flex items-center gap-2 text-xs font-bold">
                                                <Clock className="w-3.5 h-3.5 text-brand-red" aria-hidden="true" />
                                                {contact.communicationPreference.bestTimeToReach}
                                            </div>
                                        </div>
                                    </div>
                                    {contact.communicationPreference.quirks && (
                                        <div className="bg-white border border-neutral-100 px-4 py-2 rounded-xl text-[10px] font-bold text-neutral-500 max-w-[200px] leading-tight shadow-sm" role="note">
                                            💡 {contact.communicationPreference.quirks}
                                        </div>
                                    )}
                                </div>

                                {/* Transmission Interface */}
                                {!contact.introSent && (
                                    <div className="mt-8 bg-neutral-50 rounded-[32px] p-8 border border-neutral-100">
                                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Drafting Institutional Introduction</p>
                                        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-inner min-h-[100px] text-xs text-neutral-500 font-medium leading-relaxed italic" role="textbox" aria-label="Introduction template">
                                            "{messageInputs[contact.id] || contact.introTemplate}"
                                        </div>
                                        <button
                                            onClick={() => handleSendIntro(contact.id)}
                                            aria-label={`Initialize Inter-Departmental Link with ${contact.name}`}
                                            className="mt-6 w-full py-5 bg-brand-red hover:bg-red-500 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-red-500/20 active:scale-95"
                                        >
                                            <Send className="w-4 h-4" /> Initialize Inter-Departmental Link
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Advancement Progress HUD */}
            <div className="flex items-center justify-between pt-8 border-t border-neutral-100">
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                        {contacts.map((c, i) => (
                            <div key={c.id} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-black ${c.introSent ? 'bg-emerald-500 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
                                {c.introSent ? <Check className="w-3 h-3" /> : i + 1}
                            </div>
                        ))}
                    </div>
                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                        {introDraftsSent} / 5 Nodes Bridged
                    </span>
                </div>
                <button
                    onClick={onComplete}
                    disabled={introDraftsSent < 3}
                    className={`
                        px-10 py-4 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center gap-3
                        ${introDraftsSent >= 3
                            ? 'bg-brand-red text-white shadow-xl hover:-translate-y-1 active:translate-y-0 shadow-red-500/20'
                            : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                    `}
                >
                    Transition to Map <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default CriticalContactsPhase;
