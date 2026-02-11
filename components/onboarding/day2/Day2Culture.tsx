import React, { useState } from 'react';
import {
    ChevronRight,
    Check,
    MessageSquare,
    Users,
    Calendar,
    Scale,
    Heart,
    Coffee,
    AlertCircle,
    Lightbulb,
    BookOpen,
    Flag,
    ThumbsUp,
    ThumbsDown,
    Send,
    Clock,
    Star,
    Sparkles,
    Shield,
} from 'lucide-react';
import {
    RoleBasedScenario,
    CommunicationNorm,
    MeetingCultureRule,
    DecisionBoundary,
    EthicsModule,
    CoffeeChatSuggestion,
    UnwrittenRuleResponse,
    RoleCategory,
} from '../../../types';
import {
    ROLE_BASED_SCENARIOS,
    COMMUNICATION_NORMS,
    MEETING_CULTURE_RULES,
    DECISION_BOUNDARIES,
    ETHICS_MODULES,
    COFFEE_CHAT_SUGGESTIONS,
    UNWRITTEN_RULES,
} from '../../../constants';

interface Day2CultureProps {
    roleCategory?: RoleCategory;
    onComplete: () => void;
}

type Phase = 'SCENARIOS' | 'COMMUNICATION' | 'MEETINGS' | 'DECISIONS' | 'ETHICS' | 'BOT' | 'COFFEE' | 'DONE';

const Day2Culture: React.FC<Day2CultureProps> = ({ roleCategory = 'DESK', onComplete }) => {
    const [phase, setPhase] = useState<Phase>('SCENARIOS');
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
    const [completedModules, setCompletedModules] = useState<Phase[]>([]);

    // Bot state
    const [botQuestion, setBotQuestion] = useState('');
    const [botResponses, setBotResponses] = useState<UnwrittenRuleResponse[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    // Coffee chat state
    const [coffeeChats, setCoffeeChats] = useState<CoffeeChatSuggestion[]>(COFFEE_CHAT_SUGGESTIONS);

    // Filter scenarios by role
    const scenarios = ROLE_BASED_SCENARIOS.filter(s =>
        s.roleCategory === roleCategory || s.roleCategory === 'DESK'
    ).slice(0, 5);

    const currentScenario = scenarios[currentScenarioIndex];

    const phases: { id: Phase; label: string; icon: React.ReactNode }[] = [
        { id: 'SCENARIOS', label: 'Scenarios', icon: '🎭' },
        { id: 'COMMUNICATION', label: 'Communication', icon: '💬' },
        { id: 'MEETINGS', label: 'Meetings', icon: '📅' },
        { id: 'DECISIONS', label: 'Decisions', icon: '⚖️' },
        { id: 'ETHICS', label: 'Ethics', icon: '🤝' },
        { id: 'BOT', label: 'Ask Anything', icon: '🤖' },
        { id: 'COFFEE', label: 'Coffee Chats', icon: '☕' },
    ];

    const handleChoiceSelect = (choiceId: string) => {
        setSelectedChoice(choiceId);
        setShowFeedback(true);
    };

    const handleNextScenario = () => {
        if (currentScenario) {
            setCompletedScenarios(prev => [...prev, currentScenario.id]);
        }
        setSelectedChoice(null);
        setShowFeedback(false);

        if (currentScenarioIndex < scenarios.length - 1) {
            setCurrentScenarioIndex(prev => prev + 1);
        } else {
            setCompletedModules(prev => [...prev, 'SCENARIOS']);
            setPhase('COMMUNICATION');
        }
    };

    const handleCompleteModule = (currentPhase: Phase, nextPhase: Phase) => {
        setCompletedModules(prev => [...prev, currentPhase]);
        setPhase(nextPhase);
    };

    const handleBotSubmit = () => {
        if (!botQuestion.trim()) return;

        setIsTyping(true);
        const question = botQuestion;
        setBotQuestion('');

        // Find matching rule or generate response
        setTimeout(() => {
            const matchingRule = UNWRITTEN_RULES.find(r =>
                r.keywords.some(k => question.toLowerCase().includes(k.toLowerCase()))
            );

            const response: UnwrittenRuleResponse = matchingRule
                ? {
                    question,
                    answer: matchingRule.answer,
                    confidenceLevel: 'HIGH',
                    sourceName: 'Company Culture Guide',
                    flaggedCount: 0,
                    isQuarantined: false,
                }
                : {
                    question,
                    answer: "I'm not entirely sure about this. It might vary by team. I'd suggest asking your buddy or manager for clarification.",
                    confidenceLevel: 'LOW',
                    flaggedCount: 0,
                    isQuarantined: false,
                };

            setBotResponses(prev => [...prev, response]);
            setIsTyping(false);
        }, 1500);
    };

    const handleScheduleCoffee = (id: string) => {
        setCoffeeChats(prev => prev.map(c =>
            c.id === id ? { ...c, scheduled: true, scheduledAt: new Date().toISOString() } : c
        ));
    };

    const handleCompleteDay = () => {
        setPhase('DONE');
        setTimeout(onComplete, 1500);
    };

    const canCompleteDay = completedModules.length >= 5; // Need at least 5 modules

    const renderScenariosPhase = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-xl font-black text-neutral-900 tracking-tight">Cultural Simulations</h3>
                    <p className="text-xs text-neutral-400 font-medium mt-1">Navigate institutional gravity through real-world scenarios.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-none pt-0.5">
                        {currentScenarioIndex + 1} / {scenarios.length} SIMULATIONS
                    </span>
                </div>
            </div>

            {/* Tactical Progress Bar */}
            <div className="h-1.5 bg-neutral-50 rounded-full overflow-hidden mb-8" role="progressbar" aria-valuenow={currentScenarioIndex + 1} aria-valuemin={1} aria-valuemax={scenarios.length} aria-label="Cultural simulation progress">
                <div
                    className="h-full bg-brand-red transition-all duration-700 ease-out shadow-sm"
                    style={{ width: `${((currentScenarioIndex + (showFeedback ? 1 : 0)) / scenarios.length) * 100}%` }}
                />
            </div>

            {currentScenario && (
                <div className="bg-white rounded-[32px] border border-neutral-100 shadow-xl shadow-neutral-100/30 p-8 md:p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <MessageSquare className="w-24 h-24 text-brand-red" />
                    </div>

                    {/* Scenario Metadata */}
                    <div className="flex items-center gap-4 mb-8">
                        <span className={`
                            px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.1em]
                            ${currentScenario.difficulty === 'EASY' ? 'bg-emerald-50 text-emerald-600' : ''}
                            ${currentScenario.difficulty === 'MEDIUM' ? 'bg-amber-50 text-amber-600' : ''}
                            ${currentScenario.difficulty === 'HARD' ? 'bg-brand-red/10 text-brand-red' : ''}
                        `}>
                            {currentScenario.difficulty} Complexity
                        </span>
                        <div className="h-4 w-px bg-neutral-100" />
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                            {currentScenario.culturalDimension.replace(/_/g, ' ')}
                        </span>
                    </div>

                    <h4 className="text-2xl font-black text-neutral-900 mb-4 tracking-tight leading-tight">{currentScenario.title}</h4>
                    <p className="text-sm text-neutral-500 mb-10 leading-relaxed max-w-2xl">{currentScenario.description}</p>

                    {/* Decision Matrix */}
                    <div className="grid grid-cols-1 gap-4" role="radiogroup" aria-label="Cultural Decision Matrix">
                        {currentScenario.choices.map((choice) => {
                            const isSelected = selectedChoice === choice.id;
                            const showResult = showFeedback && isSelected;

                            return (
                                <button
                                    key={choice.id}
                                    onClick={() => !showFeedback && handleChoiceSelect(choice.id)}
                                    disabled={showFeedback}
                                    role="radio"
                                    aria-checked={isSelected}
                                    aria-label={`${choice.text}${showResult ? `, Feedback: ${choice.feedback}` : ''}`}
                                    className={`
                                        group w-full p-6 rounded-2xl border text-left transition-all relative overflow-hidden
                                        ${!showFeedback ? 'bg-white border-neutral-100 hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-0.5' : ''}
                                        ${isSelected && choice.isRecommended ? 'border-emerald-200 bg-emerald-50/30' : ''}
                                        ${isSelected && !choice.isRecommended ? 'border-amber-200 bg-amber-50/30' : ''}
                                        ${!isSelected && showFeedback ? 'opacity-40 grayscale-[0.5]' : ''}
                                        ${!showFeedback ? 'active:scale-[0.99]' : ''}
                                    `}
                                >
                                    <div className="flex items-start gap-5 relative z-10">
                                        <div className={`
                                            w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all
                                            ${isSelected
                                                ? (choice.isRecommended ? 'border-emerald-500 bg-emerald-500' : 'border-amber-500 bg-amber-500')
                                                : 'border-neutral-200 group-hover:border-brand-red guest-hover:scale-110'}
                                        `} aria-hidden="true">
                                            {isSelected && <Check className="w-4 h-4 text-white stroke-[3px]" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-bold leading-relaxed ${isSelected ? 'text-neutral-900' : 'text-neutral-600 group-hover:text-neutral-900'}`}>
                                                {choice.text}
                                            </p>

                                            {showResult && (
                                                <div className={`
                                                    mt-5 p-5 rounded-2xl flex items-start gap-4 animate-slide-up
                                                    ${choice.isRecommended ? 'bg-white border border-emerald-100 shadow-sm' : 'bg-white border border-amber-100 shadow-sm'}
                                                `} role="status">
                                                    <div className={`
                                                        w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                                                        ${choice.isRecommended ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}
                                                    `} aria-hidden="true">
                                                        {choice.isRecommended ? <ThumbsUp className="w-5 h-5" /> : <Lightbulb className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${choice.isRecommended ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                            {choice.isRecommended ? 'Optimal Protocol' : 'Alternative Insight'}
                                                        </p>
                                                        <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                                                            {choice.feedback}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Subtle background glow for selected state */}
                                    {isSelected && (
                                        <div className={`absolute inset-0 opacity-10 ${choice.isRecommended ? 'bg-emerald-400' : 'bg-amber-400'}`} aria-hidden="true" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Advancment Trigger */}
                    {showFeedback && (
                        <div className="mt-10 pt-10 border-t border-neutral-100 flex justify-end">
                            <button
                                onClick={handleNextScenario}
                                className="btn-primary group flex items-center gap-4 py-4 px-10"
                            >
                                <span className="text-xs uppercase font-black tracking-widest">
                                    {currentScenarioIndex < scenarios.length - 1 ? 'Execute Next Simulation' : 'Transition to Protocols'}
                                </span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    const renderCommunicationPhase = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Communication Protocols</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Institutional velocity is powered by high-fidelity communication. Master our operational channels and response expectations.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list" aria-label="Communication Architecture">
                {COMMUNICATION_NORMS.map(norm => (
                    <div key={norm.id} role="listitem" className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 group hover:border-brand-red/20 transition-all">
                        <div className="flex items-center gap-4 mb-5">
                            <div className={`
                                w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110
                                ${norm.channel === 'CHAT' ? 'bg-purple-50 text-purple-600' : ''}
                                ${norm.channel === 'EMAIL' ? 'bg-blue-50 text-blue-600' : ''}
                                ${norm.channel === 'TICKET' ? 'bg-emerald-50 text-emerald-600' : ''}
                                ${norm.channel === 'MEETING' ? 'bg-amber-50 text-amber-600' : ''}
                            `} aria-hidden="true">
                                {norm.channel === 'CHAT' && <MessageSquare className="w-6 h-6" />}
                                {norm.channel === 'EMAIL' && <Send className="w-6 h-6" />}
                                {norm.channel === 'TICKET' && <Check className="w-6 h-6" />}
                                {norm.channel === 'MEETING' && <Calendar className="w-6 h-6" />}
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900">{norm.channel} Architecture</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <Clock className="w-3 h-3 text-neutral-400" aria-hidden="true" />
                                    <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest" aria-label={`Expected response time: ${norm.expectedResponseTime}`}>{norm.expectedResponseTime} Response</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-neutral-500 mb-6 leading-relaxed font-medium">
                            {norm.useCase}
                        </p>

                        <div className="space-y-3">
                            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/50" role="status" aria-label="Recommended Signal">
                                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                    <ThumbsUp className="w-3 h-3" aria-hidden="true" /> Recommended Signal
                                </p>
                                <p className="text-[11px] text-neutral-600 font-medium leading-relaxed italic">"{norm.examples.good}"</p>
                            </div>
                            <div className="p-4 bg-red-50/50 rounded-xl border border-red-100/50" role="status" aria-label="Antipattern">
                                <p className="text-[9px] font-black text-brand-red uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                    <ThumbsDown className="w-3 h-3" aria-hidden="true" /> Antipattern
                                </p>
                                <p className="text-[11px] text-neutral-600 font-medium leading-relaxed italic">"{norm.examples.bad}"</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => handleCompleteModule('COMMUNICATION', 'MEETINGS')}
                className="btn-primary w-full py-6 mt-6 flex items-center justify-center gap-4 group"
            >
                <span className="text-xs uppercase font-black tracking-widest">Acknowledge Communication Protocols</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );

    const renderMeetingsPhase = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Meeting Governance</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    We maintain meeting hygiene to protect our collective focus. Follow these fundamental rules of engagement.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4" role="list" aria-label="Meeting Governance Rules">
                {MEETING_CULTURE_RULES.map((rule, index) => (
                    <div key={rule.id} role="listitem" className="bg-white rounded-[24px] border border-neutral-100 shadow-sm p-6 flex items-center gap-6 group hover:border-brand-red/20 transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-lg font-black italic shadow-lg shadow-neutral-900/10 group-hover:bg-brand-red transition-colors" aria-hidden="true">
                            {(index + 1).toString().padStart(2, '0')}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-3">
                                {rule.title}
                                <span className="h-1 w-1 bg-brand-red rounded-full" aria-hidden="true" />
                            </h4>
                            <p className="text-xs text-neutral-500 font-medium mt-1 leading-relaxed">{rule.description}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-neutral-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                            <Star className="w-4 h-4 text-brand-red" />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => handleCompleteModule('MEETINGS', 'DECISIONS')}
                className="btn-primary w-full py-6 mt-6 flex items-center justify-center gap-4 group"
            >
                <span className="text-xs uppercase font-black tracking-widest">Sync Meeting Hygiene Protocols</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );

    const renderDecisionsPhase = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Autonomy & Escalation Boundaries</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Understand your decision-making perimeter and when to synchronize with institutional leadership.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Decision Boundaries">
                {DECISION_BOUNDARIES.map((boundary) => (
                    <div key={boundary.id} role="listitem" className={`
                        relative bg-white rounded-[32px] border p-8 transition-all group overflow-hidden
                        ${boundary.scope === 'INDEPENDENT' ? 'border-emerald-100 hover:border-emerald-300' : ''}
                        ${boundary.scope === 'MANAGER_APPROVAL' ? 'border-blue-100 hover:border-blue-300' : ''}
                        ${boundary.scope === 'CROSS_TEAM' ? 'border-amber-100 hover:border-amber-300' : ''}
                        ${boundary.scope === 'EXECUTIVE' ? 'border-red-100 hover:border-red-300' : ''}
                    `}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`
                                w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm
                                ${boundary.scope === 'INDEPENDENT' ? 'bg-emerald-50 text-emerald-600' : ''}
                                ${boundary.scope === 'MANAGER_APPROVAL' ? 'bg-blue-50 text-blue-600' : ''}
                                ${boundary.scope === 'CROSS_TEAM' ? 'bg-amber-50 text-amber-600' : ''}
                                ${boundary.scope === 'EXECUTIVE' ? 'bg-brand-red/10 text-brand-red' : ''}
                            `} aria-hidden="true">
                                {boundary.scope === 'INDEPENDENT' && <Sparkles className="w-6 h-6" />}
                                {boundary.scope === 'MANAGER_APPROVAL' && <Users className="w-6 h-6" />}
                                {boundary.scope === 'CROSS_TEAM' && <Users className="w-6 h-6" />}
                                {boundary.scope === 'EXECUTIVE' && <Shield className="w-6 h-6" />}
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-neutral-900 uppercase tracking-tight">{boundary.title}</h4>
                                <p className={`text-[10px] font-black uppercase tracking-[0.1em] mt-0.5 ${boundary.scope === 'EXECUTIVE' ? 'text-brand-red' : 'text-neutral-400'
                                    }`}>
                                    {boundary.scope.replace(/_/g, ' ')} PERIMETER
                                </p>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8" aria-label={`Examples of ${boundary.title}`}>
                            {boundary.examples.map((ex, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 mt-1.5" aria-hidden="true" />
                                    <span className="text-xs text-neutral-600 font-medium leading-relaxed">{ex}</span>
                                </li>
                            ))}
                        </ul>

                        {boundary.escalationPath && (
                            <div className="pt-6 border-t border-neutral-50 flex items-center gap-3">
                                <div className="p-2 bg-neutral-50 rounded-lg" aria-hidden="true">
                                    <ChevronRight className="w-3 h-3 text-neutral-400 rotate-90" />
                                </div>
                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-relaxed">
                                    <span className="text-neutral-900">Escalation Path:</span> {boundary.escalationPath}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={() => handleCompleteModule('DECISIONS', 'ETHICS')}
                className="btn-primary w-full py-6 mt-6 flex items-center justify-center gap-4 group"
            >
                <span className="text-xs uppercase font-black tracking-widest">Internalize Decision Matrix</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );

    const renderEthicsPhase = () => (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Integrity Matrix</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    We are governed by radical transparency and mutual respect. Familiarize yourself with our ethics and inclusion framework.
                </p>
            </div>

            {ETHICS_MODULES.map((module) => (
                <div key={module.id} className="space-y-6" role="region" aria-label={`${module.title} category`}>
                    <div className="flex items-center gap-4">
                        <div className="h-0.5 flex-1 bg-neutral-50" aria-hidden="true" />
                        <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] px-4">{module.title}</h4>
                        <div className="h-0.5 flex-1 bg-neutral-50" aria-hidden="true" />
                    </div>

                    <div className="grid grid-cols-1 gap-4" role="list">
                        {module.scenarios.map((scenario) => (
                            <div key={scenario.id} role="listitem" className="bg-white rounded-[24px] border border-neutral-100 shadow-sm p-8 group hover:border-brand-red/20 transition-all">
                                <div className="flex items-start gap-6 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/5 transition-colors" aria-hidden="true">
                                        <Shield className="w-6 h-6 text-neutral-400 group-hover:text-brand-red transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1.5 leading-none">Contextual Situation</p>
                                        <p className="text-sm font-bold text-neutral-900 leading-relaxed">{scenario.situation}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100/50" role="status" aria-label="Protocol Execution">
                                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Check className="w-3 h-3" aria-hidden="true" /> Protocol Execution
                                        </p>
                                        <p className="text-xs text-neutral-600 font-medium leading-relaxed">{scenario.correctAction}</p>
                                    </div>
                                    <div className="bg-neutral-50/50 rounded-2xl p-6 border border-neutral-100/50" role="status" aria-label="Reporting Path">
                                        <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <AlertCircle className="w-3 h-3" aria-hidden="true" /> Reporting Path
                                        </p>
                                        <p className="text-xs text-neutral-600 font-medium leading-relaxed italic">{scenario.reportingPath}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <button
                onClick={() => handleCompleteModule('ETHICS', 'BOT')}
                className="btn-primary w-full py-6 mt-6 flex items-center justify-center gap-4 group"
            >
                <span className="text-xs uppercase font-black tracking-widest">Acknowledge Institutional Conduct</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );

    const renderBotPhase = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Neural Culture Assistant</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Query the institutional knowledge base regarding unwritten protocols and cultural nuances.
                </p>
            </div>

            <div className="bg-neutral-900 rounded-[40px] border border-neutral-800 shadow-2xl overflow-hidden flex flex-col h-[500px] relative" role="log" aria-live="polite" aria-label="Culture Assistant Chat">
                {/* Internal UI elements */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-50" aria-hidden="true" />

                {/* Chat History */}
                <div className="flex-1 p-8 overflow-y-auto space-y-6 no-scrollbar">
                    {botResponses.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-30 select-none" aria-hidden="true">
                            <div className="w-20 h-20 rounded-3xl bg-neutral-800 flex items-center justify-center mb-6">
                                <Sparkles className="w-10 h-10 text-brand-red" />
                            </div>
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-white underline underline-offset-8 decoration-brand-red/50">Awaiting Signal</p>
                            <p className="text-[10px] text-neutral-400 mt-6 max-w-[200px] leading-relaxed">Try: "Institutional dress code" or "Remote work velocity"</p>
                        </div>
                    )}
                    {botResponses.map((response, i) => (
                        <div key={i} className="animate-slide-up space-y-3">
                            {/* User Query */}
                            <div className="flex justify-end">
                                <div className="bg-brand-red text-white px-6 py-3 rounded-2xl rounded-tr-none text-xs font-bold shadow-lg shadow-red-500/20 max-w-[80%]" aria-label="Your question">
                                    {response.question}
                                </div>
                            </div>
                            {/* Bot Insight */}
                            <div className="flex justify-start">
                                <div className="bg-neutral-800 border border-neutral-700 text-neutral-100 px-6 py-4 rounded-2xl rounded-tl-none max-w-[90%] shadow-xl" aria-label="Assistant's answer">
                                    <p className="text-sm leading-relaxed">{response.answer}</p>
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-neutral-700">
                                        <div className={`
                                            flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest
                                            ${response.confidenceLevel === 'HIGH' ? 'bg-emerald-500/10 text-emerald-400' : ''}
                                            ${response.confidenceLevel === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400' : ''}
                                            ${response.confidenceLevel === 'LOW' ? 'bg-brand-red/10 text-brand-red' : ''}
                                        `}>
                                            {response.confidenceLevel} Confidence
                                        </div>
                                        {response.sourceName && (
                                            <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">Source: {response.sourceName}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start" aria-label="Assistant is typing...">
                            <div className="bg-neutral-800 border border-neutral-700 px-6 py-4 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" aria-hidden="true" />
                                <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse delay-75" aria-hidden="true" />
                                <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse delay-150" aria-hidden="true" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Matrix */}
                <div className="p-6 bg-neutral-900/80 backdrop-blur-xl border-t border-neutral-800">
                    <div className="relative group">
                        <input
                            type="text"
                            value={botQuestion}
                            onChange={(e) => setBotQuestion(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleBotSubmit()}
                            placeholder="Interrogate cultural database..."
                            aria-label="Interrogate cultural database"
                            className="w-full pl-6 pr-16 py-4 bg-neutral-800 border border-neutral-700 rounded-2xl text-white placeholder-neutral-500 text-xs font-medium focus:outline-none focus:border-brand-red/50 focus:ring-4 focus:ring-brand-red/5 transition-all"
                        />
                        <button
                            onClick={handleBotSubmit}
                            disabled={!botQuestion.trim() || isTyping}
                            aria-label="Send Query"
                            className="absolute right-2 top-2 bottom-2 px-4 bg-brand-red hover:bg-red-500 disabled:bg-neutral-700 text-white rounded-xl transition-all flex items-center justify-center active:scale-95"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <button
                onClick={() => handleCompleteModule('BOT', 'COFFEE')}
                className="btn-primary w-full py-6 mt-6 flex items-center justify-center gap-4 group"
            >
                <span className="text-xs uppercase font-black tracking-widest">Execute Cultural Synchronization</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );

    const renderCoffeePhase = () => (
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
                                <div className="w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-neutral-900/20 group-hover:bg-brand-red transition-colors" aria-hidden="true">
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
                                    className="w-full py-5 bg-neutral-900 hover:bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-neutral-900/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
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

            {/* Focused Cultural Content */}
            <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-8 md:p-12 mb-10 min-h-[500px] animate-slide-up">
                <div className="max-w-3xl mx-auto">
                    {phase === 'SCENARIOS' && renderScenariosPhase()}
                    {phase === 'COMMUNICATION' && renderCommunicationPhase()}
                    {phase === 'MEETINGS' && renderMeetingsPhase()}
                    {phase === 'DECISIONS' && renderDecisionsPhase()}
                    {phase === 'ETHICS' && renderEthicsPhase()}
                    {phase === 'BOT' && renderBotPhase()}
                    {phase === 'COFFEE' && renderCoffeePhase()}
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
