
import React, { useState } from 'react';
import {
    Users,
    Search,
    Map,
    Calendar,
    MessageCircle,
    Check,
    ArrowRight,
    Eye,
    Mic,
    Share2
} from 'lucide-react';
import { UserProfile, StakeholderNode, TeamRitual } from '../../../types';
import { STAKEHOLDER_NODES, TEAM_RITUALS } from '../../../constants';

interface Day4NetworkCollaborationProps {
    user: UserProfile;
    onComplete: () => void;
}

type Phase = 'MAPPING' | 'SHADOWING' | 'RITUALS' | 'INFLUENCE';

const Day4NetworkCollaboration: React.FC<Day4NetworkCollaborationProps> = ({ user, onComplete }) => {
    const [phase, setPhase] = useState<Phase>('MAPPING');

    // Mapping State
    const [stakeholders] = useState<StakeholderNode[]>(STAKEHOLDER_NODES);
    const [mappedContacts, setMappedContacts] = useState<Set<string>>(new Set());

    // Shadowing State
    const [shadowingBooked, setShadowingBooked] = useState(false);

    // Rituals State
    const [rituals] = useState<TeamRitual[]>(TEAM_RITUALS);
    const [ritualsJoined, setRitualsJoined] = useState<Set<string>>(new Set());

    // Influence State
    const [influenceQuiz, setInfluenceQuiz] = useState<string | null>(null);

    const canAdvance = () => {
        if (phase === 'MAPPING') return mappedContacts.size >= 3;
        if (phase === 'SHADOWING') return shadowingBooked;
        if (phase === 'RITUALS') return ritualsJoined.size >= 2;
        if (phase === 'INFLUENCE') return influenceQuiz === 'ASK_QUESTIONS';
        return true;
    };

    const handleNext = () => {
        if (phase === 'MAPPING') setPhase('SHADOWING');
        else if (phase === 'SHADOWING') setPhase('RITUALS');
        else if (phase === 'RITUALS') setPhase('INFLUENCE');
        else onComplete();
    };

    // Renderers
    const renderMapping = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Social Capital</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    Orgs are networks, not hierarchies. Map the nodes you need to influence.
                    Find 3 key stakeholders and add them to your radar.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stakeholders.map((node) => (
                    <div
                        key={node.id}
                        onClick={() => setMappedContacts(prev => new Set([...prev, node.id]))}
                        className={`
                            p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 group
                            ${mappedContacts.has(node.id)
                                ? 'bg-amber-50 border-amber-100'
                                : 'bg-white border-neutral-200 hover:border-amber-200 hover:shadow-md'}
                        `}
                    >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg ${mappedContacts.has(node.id) ? 'bg-amber-200' : 'bg-neutral-100'}`}>
                            {node.image || '👤'}
                        </div>
                        <div>
                            <h3 className="font-bold text-neutral-900">{node.name}</h3>
                            <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-1">{node.role}</p>
                            <p className="text-sm text-neutral-600 mb-3">{node.context}</p>
                            {mappedContacts.has(node.id) && (
                                <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                                    <Check className="w-3 h-3" /> Mapped
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderShadowing = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Go See</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    Don't just read docs. Go see how the work actually happens.
                    Shadow a customer call or a deployment this week.
                </p>
            </div>

            <div className="bg-amber-50 border border-amber-100 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8">
                <div className="bg-white p-4 rounded-2xl shadow-sm rotate-3">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-3xl mb-2">
                        🎧
                    </div>
                    <div className="w-32 h-2 bg-neutral-100 rounded-full mb-2" />
                    <div className="w-24 h-2 bg-neutral-100 rounded-full" />
                </div>

                <div className="flex-1">
                    <h3 className="text-xl font-bold text-amber-900 mb-2">The "Shadow" Challenge</h3>
                    <p className="text-amber-800/80 mb-6 font-medium">
                        Book time to silently observe a Customer Success call or an Incident Response.
                    </p>

                    <button
                        onClick={() => setShadowingBooked(true)}
                        className={`
                            px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2
                            ${shadowingBooked
                                ? 'bg-amber-600 text-white'
                                : 'bg-white text-amber-600 border border-amber-200 hover:bg-amber-100'}
                        `}
                    >
                        {shadowingBooked ? <Check className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                        {shadowingBooked ? 'Session Booked' : 'Book Session'}
                    </button>
                </div>
            </div>
        </div>
    );

    const renderRituals = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Tribal Rituals</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    Culture happens in the recurring meetings. Which ones will you join?
                    Commit to attending at least two.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rituals.map((ritual) => (
                    <div
                        key={ritual.id}
                        onClick={() => setRitualsJoined(prev => new Set([...prev, ritual.id]))}
                        className={`
                            p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 group
                            ${ritualsJoined.has(ritual.id)
                                ? 'bg-indigo-50 border-indigo-100'
                                : 'bg-white border-neutral-200 hover:border-brand-red/30'}
                        `}
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${ritualsJoined.has(ritual.id) ? 'bg-indigo-200' : 'bg-neutral-100'}`}>
                            {ritual.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-neutral-900">{ritual.title}</h3>
                            <p className="text-xs text-neutral-500 font-medium mb-2">{ritual.frequency}</p>
                            <p className="text-sm text-neutral-600">{ritual.description}</p>
                        </div>
                        {ritualsJoined.has(ritual.id) && <Check className="w-5 h-5 text-indigo-600" />}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderInfluence = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Influence without Authority</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    How do you get things done when you're not the boss?
                </p>
            </div>

            <div className="bg-neutral-900 rounded-3xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                    <Share2 className="w-6 h-6 text-brand-red" />
                    <h3 className="text-xl font-bold">The Influence Equation</h3>
                </div>
                <p className="text-lg text-neutral-300 leading-relaxed mb-8 border-l-4 border-brand-red pl-6">
                    "Trust = (Credibility + Reliability + Intimacy) / Self-Orientation"
                </p>

                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <h4 className="font-bold mb-4">You disagree with a senior engineer's architectural choice. What do you do?</h4>
                    <div className="space-y-3">
                        {[
                            { id: 'ARGUE', label: 'Argue your point in the big group meeting.' },
                            { id: 'ASK_QUESTIONS', label: 'Ask curious questions to understand their constraints first.' },
                            { id: 'IGNORE', label: 'Ignore it and do it your way.' },
                        ].map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setInfluenceQuiz(opt.id)}
                                className={`
                                    w-full text-left p-4 rounded-lg font-medium transition-all flex items-center justify-between
                                    ${influenceQuiz === opt.id
                                        ? (opt.id === 'ASK_QUESTIONS' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white')
                                        : 'bg-white/5 hover:bg-white/10'}
                                `}
                            >
                                {opt.label}
                                {influenceQuiz === opt.id && (opt.id === 'ASK_QUESTIONS' ? <Check className="w-5 h-5" /> : <span className="text-xl">×</span>)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-neutral-50 border-r border-neutral-200 p-6 flex flex-col">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-6">Social Capital</h3>
                <div className="space-y-2">
                    {[
                        { id: 'MAPPING', label: 'Stakeholder Map' },
                        { id: 'SHADOWING', label: 'Shadowing' },
                        { id: 'RITUALS', label: 'Tribal Rituals' },
                        { id: 'INFLUENCE', label: 'Influence' },
                    ].map((step, i) => {
                        const isActive = phase === step.id;
                        const isCompleted = ['MAPPING', 'SHADOWING', 'RITUALS', 'INFLUENCE'].indexOf(phase) > i;

                        return (
                            <button
                                key={step.id}
                                onClick={() => setPhase(step.id as Phase)}
                                className={`
                                    w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between
                                    ${isActive ? 'bg-white shadow-sm text-amber-600 ring-1 ring-amber-100' : isCompleted ? 'text-emerald-600' : 'text-neutral-400 hover:bg-neutral-100'}
                                `}
                            >
                                {step.label}
                                {isCompleted && <Check className="w-4 h-4" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 md:p-12 flex flex-col">
                <div className="flex-1">
                    {phase === 'MAPPING' && renderMapping()}
                    {phase === 'SHADOWING' && renderShadowing()}
                    {phase === 'RITUALS' && renderRituals()}
                    {phase === 'INFLUENCE' && renderInfluence()}
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-100 flex justify-end">
                    <button
                        onClick={handleNext}
                        disabled={!canAdvance()}
                        className={`
                            px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all
                            ${canAdvance()
                                ? 'bg-neutral-900 text-white hover:bg-black hover:-translate-y-1 shadow-lg'
                                : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                        `}
                    >
                        {phase === 'INFLUENCE' ? 'Complete Day 4' : 'Next Step'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Day4NetworkCollaboration;
