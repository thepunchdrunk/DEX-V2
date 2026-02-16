import React, { useState } from 'react';
import {
    ChevronRight,
    Check,
    MessageSquare,
    Users,
    Calendar,
    Scale,
    Shield,
    Lightbulb,
    ThumbsUp,
    ThumbsDown,
    Send,
    Clock,
    Star,
    Sparkles,
    ArrowLeft,
    Coffee,
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
} from '@/types';
import {
    ROLE_BASED_SCENARIOS,
    COMMUNICATION_NORMS,
    MEETING_CULTURE_RULES,
    DECISION_BOUNDARIES,
    ETHICS_MODULES,
    COFFEE_CHAT_SUGGESTIONS,
    UNWRITTEN_RULES,
} from '@/config/constants';
import OnboardingFeed, { OnboardingCard } from '../shared/OnboardingFeed';

interface Day2CultureProps {
    roleCategory?: RoleCategory;
    onComplete: () => void;
}

type Phase = 'SCENARIOS' | 'COMMUNICATION' | 'MEETINGS' | 'DECISIONS' | 'ETHICS' | 'BOT' | 'COFFEE';

const Day2Culture: React.FC<Day2CultureProps> = ({ roleCategory = 'DESK', onComplete }) => {
    // State
    const [activePhase, setActivePhase] = useState<Phase | null>(null);
    const [completedModules, setCompletedModules] = useState<Phase[]>([]);

    // Scenario State
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);

    // Bot State
    const [botQuestion, setBotQuestion] = useState('');
    const [botResponses, setBotResponses] = useState<UnwrittenRuleResponse[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    // Coffee State
    const [coffeeChats, setCoffeeChats] = useState<CoffeeChatSuggestion[]>(COFFEE_CHAT_SUGGESTIONS);

    // Filter scenarios by role
    const scenarios = ROLE_BASED_SCENARIOS.filter(s =>
        s.roleCategory === roleCategory || s.roleCategory === 'DESK'
    ).slice(0, 5);

    const currentScenario = scenarios[currentScenarioIndex];

    // handlers
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
            if (!completedModules.includes('SCENARIOS')) {
                setCompletedModules(prev => [...prev, 'SCENARIOS']);
            }
            setActivePhase(null); // Return to feed
        }
    };

    const handleCompleteModule = (phase: Phase) => {
        if (!completedModules.includes(phase)) {
            setCompletedModules(prev => [...prev, phase]);
        }
        setActivePhase(null); // Return to feed
    };

    const handleBotSubmit = () => {
        if (!botQuestion.trim()) return;

        setIsTyping(true);
        const question = botQuestion;
        setBotQuestion('');

        setTimeout(() => {
            const matchingRule = UNWRITTEN_RULES.find(r =>
                r.keywords.some(k => question.toLowerCase().includes(k.toLowerCase()))
            );

            const response: UnwrittenRuleResponse = matchingRule
                ? {
                    question,
                    answer: matchingRule.answer,
                    confidenceLevel: 'HIGH',
                    sourceName: 'Team Handbook',
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
        }, 1200);
    };

    const handleScheduleCoffee = (id: string) => {
        setCoffeeChats(prev => prev.map(c =>
            c.id === id ? { ...c, scheduled: true, scheduledAt: new Date().toISOString() } : c
        ));
    };

    const allModulesComplete =
        completedModules.includes('SCENARIOS') &&
        completedModules.includes('COMMUNICATION') &&
        completedModules.includes('MEETINGS') &&
        completedModules.includes('DECISIONS') &&
        completedModules.includes('ETHICS') &&
        completedModules.includes('COFFEE');

    // Renderers
    const renderScenariosPhase = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-xl font-bold text-neutral-900">Practice Scenarios</h3>
                    <p className="text-neutral-500 text-sm">Real-world situations to practice our norms.</p>
                </div>
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    {currentScenarioIndex + 1} / {scenarios.length}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-brand-red transition-all duration-500"
                    style={{ width: `${((currentScenarioIndex + (showFeedback ? 1 : 0)) / scenarios.length) * 100}%` }}
                />
            </div>

            {currentScenario && (
                <div className="bg-white rounded-2xl border border-neutral-100 p-8 shadow-sm">
                    <span className={`inline-block px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest mb-4
                        ${currentScenario.difficulty === 'EASY' ? 'bg-emerald-50 text-emerald-600' : ''}
                        ${currentScenario.difficulty === 'MEDIUM' ? 'bg-amber-50 text-amber-600' : ''}
                        ${currentScenario.difficulty === 'HARD' ? 'bg-red-50 text-brand-red' : ''}
                     `}>
                        {currentScenario.difficulty}
                    </span>

                    <h4 className="text-xl font-bold text-neutral-900 mb-4">{currentScenario.title}</h4>
                    <p className="text-neutral-600 mb-8 leading-relaxed">{currentScenario.description}</p>

                    <div className="space-y-3">
                        {currentScenario.choices.map((choice) => {
                            const isSelected = selectedChoice === choice.id;
                            const showResult = showFeedback && isSelected;

                            return (
                                <button
                                    key={choice.id}
                                    onClick={() => !showFeedback && handleChoiceSelect(choice.id)}
                                    disabled={showFeedback}
                                    className={`
                                        w-full p-6 float-left text-left rounded-xl border transition-all relative overflow-hidden
                                        ${!showFeedback ? 'hover:border-neutral-300 hover:bg-neutral-50' : ''}
                                        ${isSelected && choice.isRecommended ? 'bg-emerald-50 border-emerald-200 ring-1 ring-emerald-200' : ''}
                                        ${isSelected && !choice.isRecommended ? 'bg-amber-50 border-amber-200 ring-1 ring-amber-200' : ''}
                                        ${!isSelected && showFeedback ? 'opacity-50 grayscale border-neutral-100' : 'bg-white border-neutral-200'}
                                    `}
                                >
                                    <div className="flex gap-4">
                                        <div className={`
                                            w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5
                                            ${isSelected
                                                ? (choice.isRecommended ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-amber-500 bg-amber-500 text-white')
                                                : 'border-neutral-300'}
                                        `}>
                                            {isSelected && <Check className="w-3.5 h-3.5" />}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-bold ${isSelected ? 'text-neutral-900' : 'text-neutral-600'}`}>{choice.text}</p>
                                            {showResult && (
                                                <div className="mt-4 pt-4 border-t border-black/5 animate-slide-down">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        {choice.isRecommended
                                                            ? <ThumbsUp className="w-4 h-4 text-emerald-600" />
                                                            : <Lightbulb className="w-4 h-4 text-amber-600" />
                                                        }
                                                        <span className={`text-xs font-black uppercase tracking-widest ${choice.isRecommended ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                            {choice.isRecommended ? 'Correct Approach' : 'Alternative View'}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-neutral-600 leading-relaxed font-medium">{choice.feedback}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {showFeedback && (
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleNextScenario}
                                className="btn-primary py-3 px-8 flex items-center gap-2"
                            >
                                {currentScenarioIndex < scenarios.length - 1 ? 'Next Scenario' : 'Complete Module'}
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    const renderCommunicationPhase = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COMMUNICATION_NORMS.map(norm => (
                    <div key={norm.id} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`p-3 rounded-xl ${norm.channel === 'CHAT' ? 'bg-purple-50 text-purple-600' :
                                norm.channel === 'EMAIL' ? 'bg-blue-50 text-blue-600' :
                                    norm.channel === 'TICKET' ? 'bg-emerald-50 text-emerald-600' :
                                        'bg-amber-50 text-amber-600'
                                }`}>
                                {norm.channel === 'CHAT' && <MessageSquare className="w-6 h-6" />}
                                {norm.channel === 'EMAIL' && <Send className="w-6 h-6" />}
                                {norm.channel === 'TICKET' && <Check className="w-6 h-6" />}
                                {norm.channel === 'MEETING' && <Calendar className="w-6 h-6" />}
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900">{norm.channel}</h4>
                                <span className="text-[10px] bg-neutral-100 px-2 py-0.5 rounded text-neutral-500 font-bold uppercase tracking-wider">
                                    {norm.expectedResponseTime}
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-neutral-600 mb-6 min-h-[40px]">{norm.useCase}</p>

                        <div className="space-y-3">
                            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                                    <ThumbsUp className="w-3 h-3" /> Do This
                                </p>
                                <p className="text-xs text-neutral-700 italic">"{norm.examples.good}"</p>
                            </div>
                            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                                <p className="text-[10px] font-black text-brand-red uppercase tracking-widest mb-1 flex items-center gap-1">
                                    <ThumbsDown className="w-3 h-3" /> Avoid This
                                </p>
                                <p className="text-xs text-neutral-700 italic">"{norm.examples.bad}"</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => handleCompleteModule('COMMUNICATION')}
                className="w-full btn-primary py-4 mt-6"
            >
                Acknowledge Guidelines
            </button>
        </div>
    );

    const renderMeetingsPhase = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 gap-4">
                {MEETING_CULTURE_RULES.map((rule, index) => (
                    <div key={rule.id} className="bg-white p-6 rounded-2xl border border-neutral-100 flex items-start gap-5">
                        <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold shrink-0">
                            {index + 1}
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-neutral-900 mb-1">{rule.title}</h4>
                            <p className="text-neutral-500 text-sm leading-relaxed">{rule.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => handleCompleteModule('MEETINGS')}
                className="w-full btn-primary py-4 mt-6"
            >
                I Understand Meeting Etiquette
            </button>
        </div>
    );

    const renderDecisionsPhase = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DECISION_BOUNDARIES.map((boundary) => (
                    <div key={boundary.id} className="bg-white p-6 rounded-2xl border border-neutral-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-lg ${boundary.scope === 'INDEPENDENT' ? 'bg-emerald-50 text-emerald-600' :
                                boundary.scope === 'EXECUTIVE' ? 'bg-red-50 text-brand-red' :
                                    'bg-blue-50 text-blue-600'
                                }`}>
                                <Scale className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-neutral-900">{boundary.title}</h4>
                        </div>

                        <ul className="space-y-2 mb-4">
                            {boundary.examples.map((ex, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-1.5 shrink-0" />
                                    {ex}
                                </li>
                            ))}
                        </ul>

                        {boundary.escalationPath && (
                            <div className="pt-4 border-t border-neutral-100">
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Escalation</p>
                                <p className="text-xs text-neutral-900 font-bold mt-1">{boundary.escalationPath}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={() => handleCompleteModule('DECISIONS')}
                className="w-full btn-primary py-4 mt-6"
            >
                Acknowledge Decision Framework
            </button>
        </div>
    );

    const renderEthicsPhase = () => (
        <div className="space-y-8 animate-fade-in">
            {ETHICS_MODULES.map((module) => (
                <div key={module.id} className="space-y-4">
                    <h3 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2">{module.title}</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {module.scenarios.map((scenario) => (
                            <div key={scenario.id} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
                                <div className="flex gap-4 items-start mb-4">
                                    <Shield className="w-6 h-6 text-neutral-400 shrink-0" />
                                    <div>
                                        <p className="font-bold text-neutral-900 mb-1">Scenario</p>
                                        <p className="text-sm text-neutral-600 leading-relaxed">{scenario.situation}</p>
                                    </div>
                                </div>
                                <div className="bg-emerald-50 rounded-lg p-4 ml-10 border border-emerald-100">
                                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-1 flex items-center gap-2">
                                        <Check className="w-3 h-3" /> Correct Action
                                    </p>
                                    <p className="text-sm text-emerald-900">{scenario.correctAction}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <button
                onClick={() => handleCompleteModule('ETHICS')}
                className="w-full btn-primary py-4 mt-6"
            >
                Commit to Code of Conduct
            </button>
        </div>
    );

    const renderBotPhase = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-neutral-900 rounded-3xl p-6 min-h-[400px] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Sparkles className="w-32 h-32 text-white" />
                </div>

                <div className="space-y-4 overflow-y-auto max-h-[300px] pr-2 no-scrollbar">
                    {botResponses.length === 0 && (
                        <div className="text-center text-neutral-500 mt-20">
                            <p className="text-sm">Ask about dress code, remote work, or anything else.</p>
                        </div>
                    )}
                    {botResponses.map((res, i) => (
                        <div key={i} className="space-y-2 animate-slide-up">
                            <div className="flex justify-end">
                                <div className="bg-brand-red text-white py-2 px-4 rounded-xl rounded-tr-none text-sm font-medium">
                                    {res.question}
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="bg-neutral-800 text-neutral-100 py-3 px-5 rounded-xl rounded-tl-none text-sm leading-relaxed border border-neutral-700 shadow-lg max-w-[90%]">
                                    {res.answer}
                                    <div className="mt-2 pt-2 border-t border-neutral-700 flex items-center justify-between">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${res.confidenceLevel === 'HIGH' ? 'text-emerald-400' : 'text-amber-400'
                                            }`}>
                                            {res.confidenceLevel} Confidence
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-neutral-800 py-3 px-5 rounded-xl rounded-tl-none flex gap-1">
                                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce" />
                                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce delay-75" />
                                <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce delay-150" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative mt-4">
                    <input
                        type="text"
                        value={botQuestion}
                        onChange={(e) => setBotQuestion(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleBotSubmit()}
                        placeholder="Ask a question..."
                        className="w-full bg-neutral-800 border-none rounded-xl py-3 pl-4 pr-12 text-white placeholder-neutral-500 focus:ring-2 focus:ring-brand-red transition-all"
                    />
                    <button
                        onClick={handleBotSubmit}
                        disabled={!botQuestion.trim() || isTyping}
                        className="absolute right-2 top-2 p-1 bg-brand-red rounded-lg text-white hover:bg-opacity-80 transition-colors disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <button
                onClick={() => handleCompleteModule('BOT')}
                className="w-full btn-secondary py-4"
            >
                Finished Asking Questions
            </button>
        </div>
    );

    const renderCoffeePhase = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 gap-4">
                {coffeeChats.map((chat) => (
                    <div key={chat.id} className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm relative overflow-hidden group">
                        <div className="flex gap-5 relative z-10">
                            <div className="w-16 h-16 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-xl font-black shrink-0">
                                {chat.personName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-neutral-900">{chat.personName}</h4>
                                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{chat.personTitle}</p>
                                <p className="mt-3 text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg italic">
                                    "{chat.reason}"
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            {chat.scheduled ? (
                                <span className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg">
                                    <Check className="w-4 h-4" /> Scheduled
                                </span>
                            ) : (
                                <button
                                    onClick={() => handleScheduleCoffee(chat.id)}
                                    className="btn-primary py-2 px-6 text-xs flex items-center gap-2"
                                >
                                    <Coffee className="w-4 h-4" /> Schedule Chat
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => handleCompleteModule('COFFEE')}
                className="w-full btn-primary py-4 mt-6"
            >
                Complete Networking Step
            </button>
        </div>
    );

    const checkStatus = (phase: Phase) => completedModules.includes(phase) ? 'COMPLETED' : 'AVAILABLE';

    // Feed Data Map
    const feedCards: OnboardingCard[] = [
        {
            id: 'SCENARIOS',
            title: 'Practice Scenarios',
            description: 'Navigate real-world scenarios to understand our decision-making style.',
            icon: <Scale className="w-5 h-5" />,
            status: checkStatus('SCENARIOS'),
            type: 'ACTION',
            progress: completedModules.includes('SCENARIOS') ? 100 : 0,
            estimatedTime: '10 min',
            onAction: () => setActivePhase('SCENARIOS'),
            actionLabel: 'Start Practice',
        },
        {
            id: 'COMMUNICATION',
            title: 'Communication Guide',
            description: 'Best practices for chat, email, and meetings.',
            icon: <MessageSquare className="w-5 h-5" />,
            status: checkStatus('COMMUNICATION'),
            type: 'LEARNING',
            estimatedTime: '5 min',
            onAction: () => setActivePhase('COMMUNICATION'),
            actionLabel: 'Review Guide',
        },
        {
            id: 'MEETINGS',
            title: 'Meeting Norms',
            description: 'Guidelines for productive meetings.',
            icon: <Users className="w-5 h-5" />,
            status: checkStatus('MEETINGS'),
            type: 'LEARNING',
            estimatedTime: '5 min',
            onAction: () => setActivePhase('MEETINGS'),
            actionLabel: 'View Norms',
        },
        {
            id: 'DECISIONS',
            title: 'Decision Making',
            description: 'Know when to decide and when to ask.',
            icon: <Scale className="w-5 h-5" />,
            status: checkStatus('DECISIONS'),
            type: 'LEARNING',
            estimatedTime: '8 min',
            onAction: () => setActivePhase('DECISIONS'),
            actionLabel: 'Learn Framework',
        },
        {
            id: 'ETHICS',
            title: 'Core Values & Ethics',
            description: 'Our core values and coding standards.',
            icon: <Shield className="w-5 h-5" />,
            status: checkStatus('ETHICS'),
            type: 'REVIEW',
            estimatedTime: '5 min',
            onAction: () => setActivePhase('ETHICS'),
            actionLabel: 'Read Policy',
        },
        {
            id: 'BOT',
            title: 'Team Handbook Bot',
            description: 'Ask any questions about how we work.',
            icon: <Sparkles className="w-5 h-5" />,
            status: checkStatus('BOT'),
            type: 'ACTION',
            estimatedTime: 'Flexible',
            onAction: () => setActivePhase('BOT'),
            actionLabel: 'Ask Question',
        },
        {
            id: 'COFFEE',
            title: 'Intro Chats',
            description: 'Connect with your Key People.',
            icon: <Coffee className="w-5 h-5" />,
            status: checkStatus('COFFEE'),
            type: 'CONNECT',
            progress: completedModules.includes('COFFEE') ? 100 : 0,
            estimatedTime: '5 min',
            onAction: () => setActivePhase('COFFEE'),
            actionLabel: 'Find People',
        }
    ];

    if (activePhase) {
        let content = null;
        let title = '';

        switch (activePhase) {
            case 'SCENARIOS': title = 'Practice Scenarios'; content = renderScenariosPhase(); break;
            case 'COMMUNICATION': title = 'Communication Guide'; content = renderCommunicationPhase(); break;
            case 'MEETINGS': title = 'Meeting Norms'; content = renderMeetingsPhase(); break;
            case 'DECISIONS': title = 'Decision Making'; content = renderDecisionsPhase(); break;
            case 'ETHICS': title = 'Core Values & Ethics'; content = renderEthicsPhase(); break;
            case 'BOT': title = 'Team Handbook Bot'; content = renderBotPhase(); break;
            case 'COFFEE': title = 'Intro Chats'; content = renderCoffeePhase(); break;
        }

        return (
            <div className="animate-fade-in">
                <button
                    onClick={() => setActivePhase(null)}
                    className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6 font-medium text-sm transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Culture Overview
                </button>

                <h2 className="text-3xl font-black text-neutral-900 mb-6">{title}</h2>
                <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-100/50 p-8">
                    {content}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">
                    How We Work
                </h1>
                <p className="text-neutral-500 max-w-lg mx-auto">
                    Master our team norms, understand our core values, and build your early network.
                </p>
            </div>

            <OnboardingFeed
                cards={feedCards}
                onCardAction={(id) => setActivePhase(id as Phase)}
            />

            <div className="pt-8 flex justify-center border-t border-neutral-100 mt-8">
                <button
                    onClick={onComplete}
                    disabled={!allModulesComplete}
                    className={`
                        px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2
                        ${allModulesComplete
                            ? 'bg-brand-red text-white shadow-lg hover:shadow-red-500/30 hover:-translate-y-1'
                            : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'}
                    `}
                >
                    {allModulesComplete ? 'Complete Day 2' : `Complete All Modules (${feedCards.filter(c => completedModules.includes(c.id as Phase)).length}/7)`}
                    {allModulesComplete && <ChevronRight className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

export default Day2Culture;
