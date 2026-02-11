import React, { useState } from 'react';
import {
    ChevronRight,
    Check,
    Users,
    Network,
    Mail,
    Calendar,
    Star,
    Heart,
    Clock,
    MessageSquare,
    Send,
    Coffee,
    Sparkles,
    Target,
    ChevronDown,
    ChevronUp,
    User,
    Building,
    Eye,
} from 'lucide-react';
import {
    UserProfile,
    Critical5Contact,
    StakeholderNode,
    TeamRitual,
    CollaborationNorm,
    PeerCohort,
} from '../../../types';
import {
    CRITICAL_5_CONTACTS,
    STAKEHOLDER_NODES,
    TEAM_RITUALS,
    COLLABORATION_NORMS,
    PEER_COHORT,
} from '../../../constants';

interface Day4NetworkCollaborationProps {
    user: UserProfile;
    onComplete: () => void;
}

type Phase = 'CRITICAL5' | 'STAKEHOLDERS' | 'RITUALS' | 'NORMS' | 'COHORT' | 'DONE';

const Day4NetworkCollaboration: React.FC<Day4NetworkCollaborationProps> = ({ user, onComplete }) => {
    const [phase, setPhase] = useState<Phase>('CRITICAL5');
    const [contacts, setContacts] = useState<Critical5Contact[]>(CRITICAL_5_CONTACTS);
    const [stakeholders] = useState<StakeholderNode[]>(STAKEHOLDER_NODES);
    const [rituals, setRituals] = useState<TeamRitual[]>(TEAM_RITUALS);
    const [norms] = useState<CollaborationNorm[]>(COLLABORATION_NORMS);
    const [cohort, setCohort] = useState<PeerCohort>(PEER_COHORT);
    const [expandedContact, setExpandedContact] = useState<string | null>(null);
    const [messageInputs, setMessageInputs] = useState<Record<string, string>>({});

    // Track completions
    const introDraftsSent = contacts.filter(c => c.introSent).length;
    const ritualsAcknowledged = rituals.filter(r => r.acknowledged).length;

    const canComplete = introDraftsSent >= 3 && ritualsAcknowledged >= 2;

    const handleSendIntro = (contactId: string) => {
        setContacts(prev => prev.map(c =>
            c.id === contactId ? { ...c, introSent: true, introSentAt: new Date().toISOString() } : c
        ));
    };

    const handleAcknowledgeRitual = (ritualId: string) => {
        setRituals(prev => prev.map(r =>
            r.id === ritualId ? { ...r, acknowledged: true } : r
        ));
    };

    const handleConnectPeer = (peerId: string) => {
        setCohort(prev => ({
            ...prev,
            peers: prev.peers.map(p =>
                p.id === peerId ? { ...p, connected: true, connectedAt: new Date().toISOString() } : p
            )
        }));
    };

    const handleCompletePhase = (current: Phase, next: Phase) => {
        setPhase(next);
    };

    const handleCompleteDay = () => {
        setPhase('DONE');
        setTimeout(onComplete, 1500);
    };

    const getRelationshipColor = (type: Critical5Contact['relationship']) => {
        switch (type) {
            case 'MANAGER': return 'border-blue-500 bg-blue-50';
            case 'MENTOR': return 'border-purple-500 bg-purple-50';
            case 'PEER': return 'border-[#4CAF50] bg-[#E8F5E9]';
            case 'STAKEHOLDER': return 'border-[#E65100] bg-[#FFF3E0]';
            case 'BUDDY': return 'border-pink-500 bg-pink-50';
        }
    };

    const getRelationshipIcon = (type: Critical5Contact['relationship']) => {
        switch (type) {
            case 'MANAGER': return '👤';
            case 'MENTOR': return '🎓';
            case 'PEER': return '🤝';
            case 'STAKEHOLDER': return '🎯';
            case 'BUDDY': return '👋';
        }
    };

    const renderCritical5Phase = () => (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Relational Core: The Critical 5</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Identify and synchronize with the five individuals most pivotal to your early integration. Relational capital is the catalyst for operational velocity.
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
                                <div className="w-20 h-20 rounded-[24px] bg-neutral-900 flex items-center justify-center text-white font-black text-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500 overflow-hidden" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-red/40 to-transparent opacity-50" />
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
                                        ${contact.relationship === 'STAKEHOLDERS' || contact.relationship === 'STAKEHOLDER' ? 'bg-amber-50 text-amber-600 border-amber-100' : ''}
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
                                <div className="mt-8 p-6 bg-neutral-900 rounded-[24px] text-white flex items-center justify-between border border-neutral-800" role="region" aria-label="Communication Protocol">
                                    <div className="flex items-center gap-8">
                                        <div>
                                            <p className="text-[9px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-1.5">Primary Channel</p>
                                            <div className="flex items-center gap-2 text-xs font-bold">
                                                <Mail className="w-3.5 h-3.5 text-brand-red" aria-hidden="true" />
                                                {contact.communicationPreference.preferredChannel}
                                            </div>
                                        </div>
                                        <div className="w-px h-10 bg-neutral-800" aria-hidden="true" />
                                        <div>
                                            <p className="text-[9px] font-black text-neutral-500 uppercase tracking-[0.2em] mb-1.5">Sync Window</p>
                                            <div className="flex items-center gap-2 text-xs font-bold">
                                                <Clock className="w-3.5 h-3.5 text-brand-red" aria-hidden="true" />
                                                {contact.communicationPreference.bestTimeToReach}
                                            </div>
                                        </div>
                                    </div>
                                    {contact.communicationPreference.quirks && (
                                        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold text-neutral-400 max-w-[200px] leading-tight" role="note">
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
                    onClick={() => handleCompletePhase('CRITICAL5', 'STAKEHOLDERS')}
                    disabled={introDraftsSent < 3}
                    className={`
                        px-10 py-4 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center gap-3
                        ${introDraftsSent >= 3
                            ? 'bg-neutral-900 text-white shadow-xl hover:-translate-y-1 active:translate-y-0'
                            : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                    `}
                >
                    Transition to Map <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );

    const renderStakeholdersPhase = () => (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Influence Graph</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Map the interdependencies of your role. Understanding the landscape of institutional influence is critical for navigating complex project lifecycles and achieving consensus.
                </p>
            </div>

            {/* Visual Network Graph (Premium Overhaul) */}
            <div className="bg-neutral-900 rounded-[40px] border border-neutral-800 p-12 min-h-[500px] relative overflow-hidden shadow-2xl" role="img" aria-label="Influence Network Map showing your core relationships and stakeholders">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} aria-hidden="true" />

                {/* Connection Lines (Simulated with simple CSS) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10" aria-hidden="true">
                    <div className="w-[400px] h-[400px] border border-white/20 rounded-full" />
                    <div className="absolute w-[280px] h-[280px] border border-white/20 rounded-full" />
                </div>

                {/* Center Node - User */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-brand-red/20 rounded-full blur-2xl group-hover:bg-brand-red/30 transition-all" aria-hidden="true" />
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-neutral-900 font-black text-xl border-4 border-brand-red shadow-2xl relative">
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">Origin Node (You)</p>
                    </div>
                </div>

                {/* Stakeholder Nodes (Sophisticated Mapping) */}
                <div role="list" aria-label="Stakeholder Nodes">
                    {stakeholders.map((node, index) => {
                        const angle = (index / stakeholders.length) * 2 * Math.PI - Math.PI / 2;
                        const radius = node.circle === 'INNER' ? 140 : node.circle === 'MIDDLE' ? 200 : 250;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                            <div
                                key={node.id}
                                role="listitem"
                                aria-label={`${node.name}, ${node.title}. Circle: ${node.circle}`}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group"
                                style={{
                                    top: `calc(50% + ${y}px)`,
                                    left: `calc(50% + ${x}px)`,
                                }}
                            >
                                <div className="absolute -inset-2 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                <div className={`
                                    w-16 h-16 rounded-[24px] flex flex-col items-center justify-center text-[10px] font-black border-2 transition-all duration-500 cursor-pointer shadow-xl relative overflow-hidden group-hover:scale-110 group-hover:-translate-y-1
                                    ${node.circle === 'INNER' ? 'bg-brand-red border-brand-red text-white' : ''}
                                    ${node.circle === 'MIDDLE' ? 'bg-neutral-800 border-neutral-700 text-neutral-300 group-hover:border-neutral-500' : ''}
                                    ${node.circle === 'OUTER' ? 'bg-neutral-900 border-neutral-800 text-neutral-500 group-hover:border-brand-red/20' : ''}
                                `} aria-hidden="true">
                                    <div className="absolute inset-0 bg-white/5 opacity-50" />
                                    <span className="relative z-10">{node.name.split(' ').map(n => n[0]).join('')}</span>
                                </div>
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" aria-hidden="true">
                                    <div className="bg-white px-3 py-1.5 rounded-lg shadow-2xl border border-neutral-100 whitespace-nowrap">
                                        <p className="text-[10px] font-black text-neutral-900 leading-tight">{node.name}</p>
                                        <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">{node.title}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Legend Intelligence HUD */}
                <div className="absolute bottom-10 left-10 bg-black/40 backdrop-blur-xl rounded-3xl p-6 text-[10px] border border-white/10 z-30" aria-label="Influence frequency legend">
                    <p className="font-black text-white uppercase tracking-[0.2em] mb-4" aria-hidden="true">Frequency Mapping</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-brand-red shadow-[0_0_10px_rgba(230,0,0,0.5)]" aria-hidden="true" />
                            <span className="text-neutral-300 font-bold uppercase tracking-widest">High (Daily Link)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" aria-hidden="true" />
                            <span className="text-neutral-400 font-bold uppercase tracking-widest">Mid (Weekly Sync)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-800" aria-hidden="true" />
                            <span className="text-neutral-500 font-bold uppercase tracking-widest">Low (Strategic Only)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Node Intelligence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stakeholders.map((node) => (
                    <div key={node.id} className="bg-white rounded-[24px] border border-neutral-100 p-5 flex items-center gap-5 hover:border-brand-red/20 transition-all hover:shadow-lg group">
                        <div className={`
                            w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xs font-black shadow-lg shadow-neutral-100 group-hover:scale-105 transition-transform
                            ${node.circle === 'INNER' ? 'bg-brand-red' : ''}
                            ${node.circle === 'MIDDLE' ? 'bg-neutral-800' : ''}
                            ${node.circle === 'OUTER' ? 'bg-neutral-100 text-neutral-400' : ''}
                        `}>
                            {node.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-neutral-900 tracking-tight leading-none mb-1 uppercase tracking-widest">{node.name}</p>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.1em]">{node.title}</p>
                        </div>
                        <div className="px-3 py-1.5 bg-neutral-50 text-neutral-500 rounded-xl text-[9px] font-black uppercase tracking-widest border border-neutral-100 group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red transition-all">
                            {node.interactionType}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => handleCompletePhase('STAKEHOLDERS', 'RITUALS')}
                className="w-full py-6 bg-neutral-900 hover:bg-neutral-800 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-4 group shadow-xl"
            >
                Transition to Operational Rituals <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );

    const renderRitualsPhase = () => (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Sync Protocols</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Recurring rituals define the heartbeat of high-performance squads. Synchronize your internal clock with the team's operational rhythm to maintain collective alignment.
                </p>
            </div>

            <div className="space-y-4" role="list" aria-label="Team Operational Rituals">
                {rituals.map((ritual) => (
                    <div
                        key={ritual.id}
                        role="listitem"
                        className={`
                            group relative bg-white rounded-[32px] border p-8 transition-all overflow-hidden
                            ${ritual.acknowledged ? 'border-emerald-100 bg-emerald-50/10' : 'border-neutral-100 hover:border-brand-red/10 hover:shadow-xl hover:shadow-neutral-100/30'}
                        `}
                    >
                        <div className="flex items-start gap-8">
                            <div className={`
                                w-16 h-16 rounded-[20px] flex items-center justify-center text-3xl shadow-lg transition-transform duration-500 group-hover:scale-110
                                ${ritual.type === 'STANDUP' ? 'bg-blue-50 text-blue-600 shadow-blue-100' : ''}
                                ${ritual.type === 'RETROSPECTIVE' ? 'bg-purple-50 text-purple-600 shadow-purple-100' : ''}
                                ${ritual.type === 'PLANNING' ? 'bg-amber-50 text-amber-600 shadow-amber-100' : ''}
                                ${ritual.type === 'SOCIAL' ? 'bg-pink-50 text-pink-600 shadow-pink-100' : ''}
                                ${ritual.type === 'REVIEW' ? 'bg-emerald-50 text-emerald-600 shadow-emerald-100' : ''}
                            `} aria-hidden="true">
                                {ritual.type === 'STANDUP' && '📊'}
                                {ritual.type === 'RETROSPECTIVE' && '🔄'}
                                {ritual.type === 'PLANNING' && '📋'}
                                {ritual.type === 'SOCIAL' && '🎉'}
                                {ritual.type === 'REVIEW' && '👀'}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-xl font-black text-neutral-900 tracking-tight leading-none uppercase tracking-widest">{ritual.name}</h4>
                                    <span className="text-[10px] px-2.5 py-1 bg-neutral-900 text-white font-black rounded-lg uppercase tracking-widest" aria-label={`Frequency: ${ritual.frequency}`}>
                                        {ritual.frequency}
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-500 font-medium leading-relaxed mb-6">{ritual.description}</p>

                                <div className="flex items-center gap-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                                    <div className="flex items-center gap-2" aria-label={`Duration: ${ritual.duration}`}>
                                        <div className="p-1.5 bg-neutral-50 rounded-lg" aria-hidden="true"><Clock className="w-3 h-3 text-neutral-900" /></div>
                                        {ritual.duration}
                                    </div>
                                    <div className="flex items-center gap-2" aria-label={`Participants: ${ritual.participants.length} Operatives`}>
                                        <div className="p-1.5 bg-neutral-50 rounded-lg" aria-hidden="true"><Users className="w-3 h-3 text-neutral-900" /></div>
                                        {ritual.participants.length} Operatives
                                    </div>
                                </div>

                                {/* Participation Intelligence */}
                                <div className="mt-8 p-6 bg-neutral-50 rounded-[24px] border border-neutral-100 relative group/intel" role="note" aria-label="Operational expectations">
                                    <div className="absolute top-4 left-4 w-1 h-8 bg-brand-red rounded-full" aria-hidden="true" />
                                    <p className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2 pl-4" aria-hidden="true">Operational Expectations</p>
                                    <p className="text-xs text-neutral-600 font-bold leading-relaxed pl-4">{ritual.newHireExpectations}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-4">
                                {ritual.acknowledged ? (
                                    <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20 animate-fade-in" role="status" aria-label="Added to calendar">
                                        <Check className="w-4 h-4" aria-hidden="true" /> Added to Sync
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleAcknowledgeRitual(ritual.id)}
                                        aria-label={`Synchronize Calendar for ${ritual.name}`}
                                        className="px-6 py-3 bg-white text-neutral-900 border border-neutral-100 hover:border-brand-red hover:text-brand-red rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-neutral-100/50 transition-all hover:-translate-y-1 active:translate-y-0 group/btn"
                                    >
                                        <div className="flex items-center gap-3" aria-hidden="true">
                                            <Calendar className="w-4 h-4" />
                                            Synchronize Calendar
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-neutral-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-1000"
                            style={{ width: `${(ritualsAcknowledged / rituals.length) * 100}%` }}
                        />
                    </div>
                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                        {ritualsAcknowledged} / {rituals.length} PROTOCOLS SYNCED
                    </span>
                </div>
                <button
                    onClick={() => handleCompletePhase('RITUALS', 'NORMS')}
                    disabled={ritualsAcknowledged < 2}
                    className={`
                        px-10 py-4 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center gap-3
                        ${ritualsAcknowledged >= 2
                            ? 'bg-neutral-900 text-white shadow-xl hover:-translate-y-1 active:translate-y-0'
                            : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                    `}
                >
                    Transition to Norms <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );

    const renderNormsPhase = () => (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Cultural Protocols & Collaboration Norms</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Implicit expectations drive institutional harmony. Aligning with established collaboration norms ensures frictionless integration into high-velocity squad dynamics.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {norms.map((norm) => (
                    <div
                        key={norm.id}
                        className="bg-white rounded-[32px] border border-neutral-100 p-8 transition-all hover:border-brand-red/10 hover:shadow-xl hover:shadow-neutral-100/20 group"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-xl shadow-lg shadow-neutral-100 group-hover:scale-110 transition-transform">
                                {norm.category === 'COMMUNICATION' && '💬'}
                                {norm.category === 'MEETINGS' && '📅'}
                                {norm.category === 'FEEDBACK' && '📝'}
                                {norm.category === 'WORK_HOURS' && '🕐'}
                                {norm.category === 'COLLABORATION' && '🤝'}
                            </div>
                            <h4 className="text-lg font-black text-neutral-900 tracking-tight uppercase tracking-widest">{norm.title}</h4>
                        </div>
                        <p className="text-xs text-neutral-500 font-medium leading-relaxed mb-8">{norm.description}</p>

                        <div className="space-y-3 bg-neutral-50/50 rounded-2xl p-6 border border-neutral-100/50">
                            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2">Institutional Examples</p>
                            {norm.examples.map((ex, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1 h-1 rounded-full bg-brand-red shrink-0" />
                                    <span className="text-[11px] text-neutral-600 font-bold leading-relaxed">{ex}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => handleCompletePhase('NORMS', 'COHORT')}
                className="w-full py-6 bg-neutral-900 hover:bg-neutral-800 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-4 group shadow-xl"
            >
                Transition to Peer Cohort <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );

    const renderCohortPhase = () => (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Peer Cohort</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    You are part of a high-potential collective. Engaging with your cohort accelerates shared learning and builds a horizontal support network that persists throughout your institutional tenure.
                </p>
            </div>

            {/* Cohort Identity (Premium Overhaul) */}
            <div className="relative bg-neutral-900 rounded-[40px] p-10 overflow-hidden border border-neutral-800 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-[10px] font-black text-brand-red uppercase tracking-[0.3em] mb-2">Authenticated Cohort</p>
                        <h4 className="text-4xl font-black text-white tracking-tight mb-2 uppercase">{cohort.cohortName}</h4>
                        <div className="flex items-center gap-4 text-xs font-bold text-neutral-400">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-brand-red" />
                                Commissioned {new Date(cohort.startDate).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <div className="flex -space-x-4">
                        {cohort.peers.map((peer, i) => (
                            <div key={peer.id} className="w-14 h-14 rounded-full border-4 border-neutral-900 bg-neutral-800 flex items-center justify-center text-white font-black text-xs shadow-xl ring-1 ring-white/5">
                                {peer.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Peer Node Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Peer Node Grid">
                {cohort.peers.map((peer) => (
                    <div
                        key={peer.id}
                        role="listitem"
                        className={`
                            relative bg-white rounded-[32px] border p-8 transition-all group overflow-hidden
                            ${peer.connected ? 'border-emerald-100 bg-emerald-50/5' : 'border-neutral-100 hover:border-brand-red/10 hover:shadow-xl hover:shadow-neutral-100/20'}
                        `}
                    >
                        <div className="flex items-start gap-6">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center text-white font-black text-lg shadow-xl group-hover:scale-105 transition-transform" aria-hidden="true">
                                    {peer.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                {peer.connected && (
                                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-lg bg-emerald-500 border-2 border-white flex items-center justify-center shadow-lg" aria-hidden="true">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-black text-neutral-900 tracking-tight leading-none uppercase tracking-widest mb-1">{peer.name}</h4>
                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.1em] mb-4">{peer.title} • {peer.department}</p>

                                {peer.sharedInterests && peer.sharedInterests.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5" role="list" aria-label="Shared interests">
                                        {peer.sharedInterests.map((interest, i) => (
                                            <span key={i} role="listitem" className="text-[9px] px-2.5 py-1 bg-neutral-50 text-neutral-500 font-black rounded-lg uppercase tracking-widest border border-neutral-100">
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8">
                            {peer.connected ? (
                                <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-50 py-3 rounded-2xl justify-center border border-emerald-100" role="status" aria-label="Connection established">
                                    <Check className="w-3 h-3" aria-hidden="true" /> Node Connection Established
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleConnectPeer(peer.id)}
                                    aria-label={`Initialize Connection with ${peer.name}`}
                                    className="w-full py-4 bg-white text-neutral-900 border border-neutral-100 hover:border-brand-red hover:text-brand-red rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-neutral-100/50"
                                >
                                    <Heart className="w-3.5 h-3.5" aria-hidden="true" /> Initialize Connection
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Cohort Sync Events */}
            {cohort.sharedEvents && cohort.sharedEvents.length > 0 && (
                <div className="bg-neutral-50 rounded-[40px] border border-neutral-100 p-10 mt-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-100 shadow-sm flex items-center justify-center text-brand-red">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-neutral-900 tracking-tight uppercase tracking-widest leading-none">Cohort Assembly Schedule</h4>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Upcoming collective engagements</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cohort.sharedEvents.map((event) => (
                            <div key={event.id} className="group flex items-center gap-6 p-6 bg-white rounded-[28px] border border-neutral-100 hover:border-brand-red/20 transition-all hover:shadow-lg">
                                <div className="flex flex-col items-center justify-center w-14 h-14 bg-neutral-900 rounded-2xl text-white shadow-xl group-hover:bg-brand-red transition-colors">
                                    <span className="text-[8px] font-black uppercase tracking-widest opacity-60">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-xl font-black leading-none">{new Date(event.date).getDate()}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-black text-neutral-900 uppercase tracking-widest mb-1">{event.title}</p>
                                    <p className="text-[10px] text-neutral-400 font-bold flex items-center gap-2">
                                        <Target className="w-3 h-3 text-brand-red" />
                                        {event.location}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const phases_list: { id: Phase; label: string; icon: string }[] = [
        { id: 'CRITICAL5', label: 'Critical 5', icon: '⭐' },
        { id: 'STAKEHOLDERS', label: 'Stakeholders', icon: '🗺️' },
        { id: 'RITUALS', label: 'Rituals', icon: '📅' },
        { id: 'NORMS', label: 'Norms', icon: '📋' },
        { id: 'COHORT', label: 'Cohort', icon: '👥' },
    ];

    const getPhaseIndex = (p: Phase) => phases_list.findIndex(x => x.id === p);

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in selection:bg-red-100 selection:text-brand-red">
            {/* Context Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-brand-red bg-red-50 px-3 py-1 rounded-full uppercase tracking-widest">Phase 04 / 05</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Relational Capital & Synergy</span>
                </div>
                <h1 className="text-4xl font-black text-neutral-900 tracking-tight mb-4 leading-tight">
                    Engineering your <span className="text-brand-red">Network Core</span>
                </h1>
                <p className="text-sm text-neutral-500 max-w-2xl leading-relaxed">
                    Institutional success is a collaborative achievement. Build the critical relational architecture and understand the social protocols that accelerate collective velocity.
                </p>
            </div>

            {/* Phase Navigation (Unified & Premium) */}
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-100/30 p-2 mb-10 flex gap-1 overflow-x-auto no-scrollbar" role="tablist" aria-label="Day 4 Onboarding Phases">
                {phases_list.map((p, i) => {
                    const isActive = phase === p.id;
                    const isCompleted = getPhaseIndex(phase) > i || phase === 'DONE';

                    return (
                        <button
                            key={p.id}
                            onClick={() => (isCompleted || isActive) && phase !== 'DONE' && setPhase(p.id)}
                            role="tab"
                            aria-selected={isActive}
                            aria-label={`${p.label}${isCompleted ? ', Completed' : ''}`}
                            className={`
                                flex-1 min-w-[150px] px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3
                                ${isActive && phase !== 'DONE'
                                    ? 'bg-neutral-900 text-white shadow-lg -translate-y-0.5'
                                    : (isCompleted ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-white text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600')}
                            `}
                        >
                            <span className="text-lg" aria-hidden="true">
                                {isCompleted ? <Check className="w-4 h-4" /> : p.icon}
                            </span>
                            {p.label}
                        </button>
                    );
                })}
            </div>

            {/* Focused Relational Content */}
            <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-8 md:p-12 mb-10 min-h-[500px] animate-slide-up">
                <div className="max-w-4xl mx-auto">
                    {phase === 'CRITICAL5' && renderCritical5Phase()}
                    {phase === 'STAKEHOLDERS' && renderStakeholdersPhase()}
                    {phase === 'RITUALS' && renderRitualsPhase()}
                    {phase === 'NORMS' && renderNormsPhase()}
                    {phase === 'COHORT' && renderCohortPhase()}
                    {phase === 'DONE' && (
                        <div className="text-center py-24 animate-fade-in">
                            <div className="w-24 h-24 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <Check className="w-12 h-12 text-emerald-600" />
                            </div>
                            <h2 className="text-3xl font-black text-neutral-900 mb-4 tracking-tight">Phase 04 Synchronized</h2>
                            <p className="text-neutral-500 max-w-sm mx-auto leading-relaxed">
                                Your relational network is now bridged. Preparing transition to Phase 05: Institutional Graduation...
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Advancement Protocol */}
            {phase !== 'DONE' && phase === 'COHORT' && (
                <div className="flex flex-col items-center gap-6">
                    <button
                        onClick={handleCompleteDay}
                        disabled={!canComplete}
                        className={`
                            w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-4 group
                            ${canComplete
                                ? 'bg-brand-red text-white shadow-xl shadow-red-500/30 hover:shadow-red-500/40 hover:-translate-y-1 active:translate-y-0'
                                : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                        `}
                    >
                        {canComplete ? (
                            <>
                                Finalize Day 04: Proceed to Graduation Ceremony
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        ) : (
                            <>Complete Critical Introductions & Rituals to Proceed</>
                        )}
                    </button>
                    {!canComplete && (
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                            Required: 3/5 Intro Drafts ({introDraftsSent}) & 2/5 Rituals Acknowledged ({ritualsAcknowledged})
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Day4NetworkCollaboration;
