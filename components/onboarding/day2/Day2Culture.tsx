import React, { useState } from 'react';
import {
    ChevronRight,
    Check,
} from 'lucide-react';
import {
    UnwrittenRuleResponse,
    RoleCategory,
    CoffeeChatSuggestion,
} from '../../../types';
import {
    ROLE_BASED_SCENARIOS,
    COMMUNICATION_NORMS,
    MEETING_CULTURE_RULES,
    DECISION_BOUNDARIES,
    ETHICS_MODULES,
    COFFEE_CHAT_SUGGESTIONS,
} from '../../../constants';

// Modularized Components
import ScenariosPhase from './ScenariosPhase';
import CommunicationPhase from './CommunicationPhase';
import MeetingsPhase from './MeetingsPhase';
import DecisionsPhase from './DecisionsPhase';
import EthicsPhase from './EthicsPhase';
import BotPhase from './BotPhase';
import CoffeePhase from './CoffeePhase';

interface Day2CultureProps {
    roleCategory?: RoleCategory;
    onComplete: () => void;
}

type Phase = 'SCENARIOS' | 'COMMUNICATION' | 'MEETINGS' | 'DECISIONS' | 'ETHICS' | 'BOT' | 'COFFEE' | 'DONE';

const Day2Culture: React.FC<Day2CultureProps> = ({ roleCategory = 'DESK', onComplete }) => {
    const [phase, setPhase] = useState<Phase>('SCENARIOS');
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [completedModules, setCompletedModules] = useState<Phase[]>([]);

    // Bot state
    const [botResponses, setBotResponses] = useState<UnwrittenRuleResponse[]>([]);

    // Coffee chat state
    const [coffeeChats, setCoffeeChats] = useState<CoffeeChatSuggestion[]>(COFFEE_CHAT_SUGGESTIONS);

    // Filter scenarios by role
    const scenarios = ROLE_BASED_SCENARIOS.filter(s =>
        s.roleCategory === roleCategory || s.roleCategory === 'DESK'
    ).slice(0, 5);

    const phases: { id: Phase; label: string; icon: React.ReactNode }[] = [
        { id: 'SCENARIOS', label: 'Scenarios', icon: '🎭' },
        { id: 'COMMUNICATION', label: 'Communication', icon: '💬' },
        { id: 'MEETINGS', label: 'Meetings', icon: '📅' },
        { id: 'DECISIONS', label: 'Decisions', icon: '⚖️' },
        { id: 'ETHICS', label: 'Ethics', icon: '🤝' },
        { id: 'BOT', label: 'Ask Anything', icon: '🤖' },
        { id: 'COFFEE', label: 'Coffee Chats', icon: '☕' },
    ];

    const handleCompleteModule = (currentPhase: Phase, nextPhase: Phase) => {
        setCompletedModules(prev => [...prev, currentPhase]);
        setPhase(nextPhase);
    };

    const handleCompleteDay = () => {
        setPhase('DONE');
        setTimeout(onComplete, 1500);
    };

    const canCompleteDay = completedModules.length >= 5; // Need at least 5 modules

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in selection:bg-red-100 selection:text-brand-red">
            {/* Context Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-brand-red bg-red-50 px-3 py-1 rounded-full uppercase tracking-widest">Phase 02 / 05</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Company Culture Architecture</span>
                </div>
                <h1 className="text-4xl font-black text-neutral-900 tracking-tight mb-4 leading-tight">
                    Mastering the <span className="text-brand-red">Unwritten Protocols</span>
                </h1>
                <p className="text-sm text-neutral-500 max-w-2xl leading-relaxed">
                    Institutional excellence is defined by the subtleties of our interactions. Explore the cultural dimensions that make our ecosystem unique and highly effective.
                </p>
            </div>

            {/* Phase Navigation (Unified & Premium) */}
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-100/30 p-2 mb-10 flex gap-1 overflow-x-auto no-scrollbar" role="tablist" aria-label="Culture Onboarding Phases">
                {phases.map((p) => {
                    const isActive = phase === p.id;
                    const isCompleted = completedModules.includes(p.id);

                    return (
                        <button
                            key={p.id}
                            onClick={() => setPhase(p.id)}
                            role="tab"
                            aria-selected={isActive}
                            aria-label={`${p.label}${isCompleted ? ', Completed' : ''}`}
                            className={`
                                flex-1 min-w-[140px] px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3
                                ${isActive
                                    ? 'bg-white border-brand-red text-brand-red shadow-lg shadow-red-500/10 -translate-y-0.5'
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

            {/* Focused Cultural Content */}
            <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-8 md:p-12 mb-10 min-h-[500px] animate-slide-up">
                <div className="max-w-3xl mx-auto">
                    {phase === 'SCENARIOS' && (
                        <ScenariosPhase
                            scenarios={scenarios}
                            currentScenarioIndex={currentScenarioIndex}
                            setCurrentScenarioIndex={setCurrentScenarioIndex}
                            onComplete={() => handleCompleteModule('SCENARIOS', 'COMMUNICATION')}
                        />
                    )}
                    {phase === 'COMMUNICATION' && (
                        <CommunicationPhase
                            communicationNorms={COMMUNICATION_NORMS}
                            onComplete={() => handleCompleteModule('COMMUNICATION', 'MEETINGS')}
                        />
                    )}
                    {phase === 'MEETINGS' && (
                        <MeetingsPhase
                            meetingRules={MEETING_CULTURE_RULES}
                            onComplete={() => handleCompleteModule('MEETINGS', 'DECISIONS')}
                        />
                    )}
                    {phase === 'DECISIONS' && (
                        <DecisionsPhase
                            decisionBoundaries={DECISION_BOUNDARIES}
                            onComplete={() => handleCompleteModule('DECISIONS', 'ETHICS')}
                        />
                    )}
                    {phase === 'ETHICS' && (
                        <EthicsPhase
                            ethicsModules={ETHICS_MODULES}
                            onComplete={() => handleCompleteModule('ETHICS', 'BOT')}
                        />
                    )}
                    {phase === 'BOT' && (
                        <BotPhase
                            botResponses={botResponses}
                            setBotResponses={setBotResponses}
                            onComplete={() => handleCompleteModule('BOT', 'COFFEE')}
                        />
                    )}
                    {phase === 'COFFEE' && (
                        <CoffeePhase
                            coffeeChats={coffeeChats}
                            setCoffeeChats={setCoffeeChats}
                        />
                    )}
                    {phase === 'DONE' && (
                        <div className="text-center py-20 animate-fade-in">
                            <div className="w-24 h-24 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <Check className="w-12 h-12 text-emerald-600" />
                            </div>
                            <h2 className="text-3xl font-black text-neutral-900 mb-4 tracking-tight">Phase 02 Calibrated</h2>
                            <p className="text-neutral-500 max-w-sm mx-auto leading-relaxed">
                                You've successfully integrated the core cultural protocols. Preparing transition to Tools & Workflow...
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Advancement Protocol */}
            {phase !== 'DONE' && (
                <button
                    onClick={handleCompleteDay}
                    disabled={!canCompleteDay}
                    className={`
                        w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-4 group
                        ${canCompleteDay
                            ? 'bg-brand-red text-white shadow-xl shadow-red-500/30 hover:shadow-red-500/40 hover:-translate-y-1 active:translate-y-0'
                            : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                    `}
                >
                    {canCompleteDay ? (
                        <>
                            Initialize Next Phase: Tools & Workflow
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    ) : (
                        <>Complete {5 - completedModules.length} More Modules to Proceed ({completedModules.length}/5)</>
                    )}
                </button>
            )}
        </div>
    );
};

export default Day2Culture;
