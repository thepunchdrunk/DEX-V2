
import React, { useState } from 'react';
import {
    Target,
    Users,
    ChevronRight,
    Check,
    Play,
    Shield,
    Globe,
    Zap,
    Heart,
    Coffee,
    ArrowRight
} from 'lucide-react';
import { UserProfile, Critical5Contact, CoffeeChatSuggestion } from '@/types';
import { CRITICAL_5_CONTACTS, COFFEE_CHAT_SUGGESTIONS } from '@/config/constants';

interface Day1LifeWorkSetupProps {
    user: UserProfile;
    onComplete: () => void;
}

type Phase = 'MISSION' | 'BELONGING' | 'SETUP' | 'CONNECTIONS';

const Day1LifeWorkSetup: React.FC<Day1LifeWorkSetupProps> = ({ user, onComplete }) => {
    const [phase, setPhase] = useState<Phase>('MISSION');

    // Mission State
    const [missionAccepted, setMissionAccepted] = useState(false);

    // Belonging State
    const [imposterSyndromeChecked, setImposterSyndromeChecked] = useState(false);

    // Setup State (simplified for Day 1)
    const [setupSteps, setSetupSteps] = useState([
        { id: 'sso', label: 'Identity & SSO', completed: false },
        { id: 'slack', label: 'Join Communication Channels', completed: false },
        { id: 'cal', label: 'Calendar Sync', completed: false },
    ]);

    // Connections State (from old Day 4/1)
    const [contacts] = useState<Critical5Contact[]>(CRITICAL_5_CONTACTS);
    const [coffeeChats] = useState<CoffeeChatSuggestion[]>(COFFEE_CHAT_SUGGESTIONS);
    const [connectionsMade, setConnectionsMade] = useState<Set<string>>(new Set());

    const handleSetupToggle = (id: string) => {
        setSetupSteps(prev => prev.map(s => s.id === id ? { ...s, completed: true } : s));
    };

    const handleConnectionAck = (id: string) => {
        setConnectionsMade(prev => new Set([...prev, id]));
    };

    const canAdvance = () => {
        if (phase === 'MISSION') return missionAccepted;
        if (phase === 'BELONGING') return imposterSyndromeChecked;
        if (phase === 'SETUP') return setupSteps.every(s => s.completed);
        return true;
    };

    const handleNext = () => {
        if (phase === 'MISSION') setPhase('BELONGING');
        else if (phase === 'BELONGING') setPhase('SETUP');
        else if (phase === 'SETUP') setPhase('CONNECTIONS');
        else onComplete();
    };

    // Renderers
    const renderMission = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-neutral-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider mb-6">
                        <Zap className="w-3 h-3 text-brand-red" />
                        Day 1 Philosophy
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                        It is always <span className="text-brand-red">Day 1</span>.
                    </h2>

                    <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed mb-8">
                        We act with the speed, agility, and customer obsession of a startup.
                        We never get complacent. We never stop inventing.
                        Today is your Day 1.
                    </p>

                    <button
                        onClick={() => setMissionAccepted(true)}
                        className={`
                            px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-3
                            ${missionAccepted
                                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                : 'bg-brand-red text-white hover:bg-red-600 hover:scale-105 active:scale-100'}
                        `}
                    >
                        {missionAccepted ? <Check className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                        {missionAccepted ? 'Mission Accepted' : 'Accept the Mission'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: Globe, title: 'Global Scale', desc: 'Impact millions of users.' },
                    { icon: Shield, title: 'Ownership', desc: 'You own what you build.' },
                    { icon: Heart, title: 'Customer Obsession', desc: 'Start with the customer.' },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                        <item.icon className="w-8 h-8 text-neutral-400 mb-4" />
                        <h3 className="font-bold text-neutral-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-neutral-500">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderBelonging = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">You Belong Here.</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    We hired you for a reason. Not just for your skills, but for your perspective.
                    Don't try to "fit in"—bring your authentic self.
                </p>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-2xl">
                    🧠
                </div>
                <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">The "Imposter Syndrome" Check</h3>
                    <p className="text-blue-800/80 mb-6 leading-relaxed">
                        It's normal to feel like you don't know enough yet. Everyone here started exactly where you are.
                        Your job for the first month is to *learn*, not to deliver perfection.
                    </p>

                    <button
                        onClick={() => setImposterSyndromeChecked(true)}
                        className={`
                            px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2
                            ${imposterSyndromeChecked ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'}
                        `}
                    >
                        {imposterSyndromeChecked ? <Check className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                        {imposterSyndromeChecked ? 'I Understand' : 'I Understand & Accept'}
                    </button>
                </div>
            </div>
        </div>
    );

    const renderSetup = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Digital Access</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    Let's get you connected to the matrix. Three critical steps to get online.
                </p>
            </div>

            <div className="space-y-4">
                {setupSteps.map((step) => (
                    <div
                        key={step.id}
                        onClick={() => handleSetupToggle(step.id)}
                        className={`
                            p-6 rounded-2xl border flex items-center justify-between cursor-pointer transition-all group
                            ${step.completed ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-neutral-200 hover:border-brand-red/30 hover:shadow-md'}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center transition-colors
                                ${step.completed ? 'bg-emerald-200 text-emerald-800' : 'bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200'}
                            `}>
                                {step.completed ? <Check className="w-5 h-5" /> : <div className="w-3 h-3 rounded-full bg-neutral-300" />}
                            </div>
                            <span className={`font-bold text-lg ${step.completed ? 'text-emerald-900' : 'text-neutral-900'}`}>{step.label}</span>
                        </div>

                        {!step.completed && <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-brand-red" />}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderConnections = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Your Starting Cohort</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    You aren't alone. Here are the first 3 people you should reach out to today.
                    Just say "Hi, it's my Day 1."
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contacts.slice(0, 3).map((contact) => (
                    <div key={contact.id} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-start gap-4 hover:border-brand-red/20 transition-all">
                        <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-xl">
                            👋
                        </div>
                        <div>
                            <h4 className="font-bold text-neutral-900">{contact.name}</h4>
                            <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-2">{contact.title}</p>
                            <p className="text-sm text-neutral-600 mb-4">{contact.whyTheyMatter}</p>

                            <button
                                onClick={() => handleConnectionAck(contact.id)}
                                disabled={connectionsMade.has(contact.id)}
                                className={`
                                    px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all
                                    ${connectionsMade.has(contact.id)
                                        ? 'bg-neutral-100 text-neutral-400'
                                        : 'bg-brand-red text-white hover:bg-red-600'}
                                `}
                            >
                                {connectionsMade.has(contact.id) ? 'Connected' : 'Send Hello'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-neutral-50 border-r border-neutral-200 p-6 flex flex-col">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-6">Day 1 Roadmap</h3>
                <div className="space-y-2">
                    {[
                        { id: 'MISSION', label: 'The Mission' },
                        { id: 'BELONGING', label: 'Belonging' },
                        { id: 'SETUP', label: 'Digital Access' },
                        { id: 'CONNECTIONS', label: 'First Hello' },
                    ].map((step, i) => {
                        const isActive = phase === step.id;
                        const isCompleted = ['MISSION', 'BELONGING', 'SETUP', 'CONNECTIONS'].indexOf(phase) > i;

                        return (
                            <button
                                key={step.id}
                                onClick={() => setPhase(step.id as Phase)}
                                className={`
                                    w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between
                                    ${isActive ? 'bg-white shadow-sm text-brand-red ring-1 ring-neutral-200' : isCompleted ? 'text-emerald-600' : 'text-neutral-400 hover:bg-neutral-100'}
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
                    {phase === 'MISSION' && renderMission()}
                    {phase === 'BELONGING' && renderBelonging()}
                    {phase === 'SETUP' && renderSetup()}
                    {phase === 'CONNECTIONS' && renderConnections()}
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
                        {phase === 'CONNECTIONS' ? 'Complete Day 1' : 'Next Step'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Day1LifeWorkSetup;
