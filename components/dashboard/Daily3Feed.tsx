import React, { useState, useMemo } from 'react';
import {
    Building2,
    Compass,
    Lightbulb,
    Gamepad2,
    ExternalLink,
    Flag,
    Check,
    TrendingUp,
    TrendingDown,
    Clock,
    HelpCircle,
    X,
    AlertTriangle,
    Calendar,
    Sparkles,
    ChevronRight,
} from 'lucide-react';
import { DailyCard, CardSlot, SimulatorChallenge, MicroSkillCard, ContextAnchorCard } from '../../types';
import { MOCK_SIMULATOR, MONDAY_CONTEXT_ANCHOR, FRIDAY_MICRO_SKILL } from '../../constants';
import { getWeekdayContext, generateCardExplainer } from '../../services/cardSelectionEngine';

interface Daily3FeedProps {
    cards: DailyCard[];
    isWednesday?: boolean;
    onCardAction: (card: DailyCard) => void;
    onCardFlag: (cardId: string, reason?: 'INCORRECT' | 'OUTDATED' | 'INAPPROPRIATE') => void;
    onMarkComplete: (cardId: string) => void;
    completedCards: string[];
    user?: { jobTitle: string; department: string };
}

const Daily3Feed: React.FC<Daily3FeedProps> = ({
    cards,
    isWednesday = false,
    onCardAction,
    onCardFlag,
    onMarkComplete,
    completedCards,
    user = { jobTitle: 'Employee', department: 'General' },
}) => {
    const [showSimulator, setShowSimulator] = useState(false);
    const [expandedExplainer, setExpandedExplainer] = useState<string | null>(null);
    const [showFlagModal, setShowFlagModal] = useState<string | null>(null);

    // Determine day context
    const dayOfWeek = new Date().getDay();
    const weekdayContext = getWeekdayContext(dayOfWeek);

    // Get weekday-specific greeting
    const getGreeting = () => {
        switch (weekdayContext) {
            case 'MONDAY_PLANNING':
                return { title: 'Plan Your Week', subtitle: 'Focus on strategic priorities' };
            case 'WEDNESDAY_SIMULATOR':
                return { title: 'Simulator Wednesday', subtitle: 'Practice makes perfect' };
            case 'FRIDAY_REFLECTION':
                return { title: 'Reflect & Grow', subtitle: 'Celebrate your progress' };
            default:
                return { title: 'Your Daily 3', subtitle: 'Stay focused on what matters' };
        }
    };

    const greeting = getGreeting();

    // Adjust cards based on weekly rhythm
    const displayCards = useMemo(() => {
        let adjustedCards = [...cards];

        // Monday: Use planning-oriented Context Anchor
        if (weekdayContext === 'MONDAY_PLANNING' && adjustedCards.length > 0) {
            adjustedCards[0] = { ...MONDAY_CONTEXT_ANCHOR };
        }

        // Wednesday: Replace Card 3 with Simulator
        if (weekdayContext === 'WEDNESDAY_SIMULATOR' || isWednesday) {
            adjustedCards = [
                ...adjustedCards.slice(0, 2),
                {
                    id: 'simulator-card',
                    slot: 'SIMULATOR' as CardSlot,
                    title: MOCK_SIMULATOR.title,
                    description: MOCK_SIMULATOR.description,
                    source: 'DEX',
                    sourceType: 'SYSTEM' as const,
                    timestamp: new Date().toISOString(),
                    priority: 'MEDIUM' as const,
                    actionLabel: 'Start Challenge',
                    read: false,
                    flagged: false,
                    explainer: 'Wednesday is Simulator Day! This challenge helps build applied judgment.',
                },
            ];
        }

        // Friday: Use reflection-oriented Micro-Skill
        if (weekdayContext === 'FRIDAY_REFLECTION' && adjustedCards.length >= 3) {
            adjustedCards[2] = { ...FRIDAY_MICRO_SKILL };
        }

        return adjustedCards;
    }, [cards, weekdayContext, isWednesday]);

    const getSlotIcon = (slot: CardSlot) => {
        switch (slot) {
            case 'CONTEXT_ANCHOR':
                return <Building2 className="w-5 h-5" />;
            case 'DOMAIN_EDGE':
                return <Compass className="w-5 h-5" />;
            case 'MICRO_SKILL':
                return <Lightbulb className="w-5 h-5" />;
            case 'SIMULATOR':
                return <Gamepad2 className="w-5 h-5" />;
        }
    };

    const getSlotColor = (slot: CardSlot) => {
        switch (slot) {
            case 'CONTEXT_ANCHOR':
                return {
                    bg: 'bg-blue-50/50',
                    border: 'border-blue-100 group-hover:border-blue-300',
                    text: 'text-blue-600',
                    glow: 'shadow-blue-500/5',
                    badge: 'bg-blue-100/50 text-blue-700',
                };
            case 'DOMAIN_EDGE':
                return {
                    bg: 'bg-purple-50/50',
                    border: 'border-purple-100 group-hover:border-purple-300',
                    text: 'text-purple-600',
                    glow: 'shadow-purple-500/5',
                    badge: 'bg-purple-100/50 text-purple-700',
                };
            case 'MICRO_SKILL':
                return {
                    bg: 'bg-emerald-50/50',
                    border: 'border-emerald-100 group-hover:border-emerald-300',
                    text: 'text-emerald-600',
                    glow: 'shadow-emerald-500/5',
                    badge: 'bg-emerald-100/50 text-emerald-700',
                };
            case 'SIMULATOR':
                return {
                    bg: 'bg-red-50/50',
                    border: 'border-red-100 group-hover:border-red-300',
                    text: 'text-brand-red',
                    glow: 'shadow-red-500/5',
                    badge: 'bg-red-100/50 text-brand-red',
                };
        }
    };

    const getSlotLabel = (slot: CardSlot) => {
        switch (slot) {
            case 'CONTEXT_ANCHOR':
                return 'Key Update';
            case 'DOMAIN_EDGE':
                return 'Market Insight';
            case 'MICRO_SKILL':
                return 'Productivity Tip';
            case 'SIMULATOR':
                return 'Simulator';
        }
    };

    const getSlotDescription = (slot: CardSlot) => {
        switch (slot) {
            case 'CONTEXT_ANCHOR':
                return 'Internal Awareness';
            case 'DOMAIN_EDGE':
                return 'External Signal';
            case 'MICRO_SKILL':
                return 'Behavioral Edge';
            case 'SIMULATOR':
                return 'Applied Practice';
        }
    };

    const handleMarkComplete = (cardId: string) => {
        onMarkComplete(cardId);
    };

    const handleFlagSubmit = (cardId: string, reason: 'INCORRECT' | 'OUTDATED' | 'INAPPROPRIATE') => {
        onCardFlag(cardId, reason);
        setShowFlagModal(null);
    };

    // Generate explainer for a card
    const getExplainer = (card: DailyCard): string => {
        if (card.explainer) return card.explainer;
        return generateCardExplainer(card, {
            user: { ...user } as any,
            recentlySeenCardIds: [],
            dayOfWeek,
            currentWorkload: 'MEDIUM',
            recentKPIAlerts: 0,
            pendingDeadlines: 0,
        });
    };

    return (
        <div className="space-y-6">
            {/* Header with Weekly Context */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#E60000] flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-black">{greeting.title}</h1>
                            <p className="text-[#616161] text-sm">{greeting.subtitle}</p>
                        </div>
                    </div>
                    <p className="text-[#9E9E9E] text-sm mt-2">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAFAFA] border border-[#E0E0E0] text-xs text-[#616161]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Refreshes at midnight</span>
                </div>
            </div>

            {/* Cards Grid / Feed */}
            <div className="space-y-5">
                {displayCards.map((card, index) => {
                    const colors = getSlotColor(card.slot);
                    const isCompleted = completedCards.includes(card.id);
                    const isQuarantined = card.isQuarantined || (card.flagCount && card.flagCount >= 3);

                    if (isQuarantined) return null;

                    return (
                        <div
                            key={card.id}
                            className={`
                                group relative backdrop-blur-md rounded-2xl border transition-all duration-500
                                ${colors.bg} ${colors.border}
                                ${isCompleted
                                    ? 'opacity-60 scale-[0.98] grayscale-[0.5]'
                                    : 'hover:-translate-y-1 hover:shadow-xl shadow-sm animate-slide-up'}
                                stagger-${index + 1}
                            `}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Subtle Brand Accent Line */}
                            <div className={`h-1.5 w-full absolute top-0 left-0 ${colors.text.replace('text-', 'bg-')} opacity-20`} />

                            <div className="p-6">
                                {/* Card Header */}
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${colors.badge} flex items-center justify-center shadow-sm transition-transform group-hover:rotate-3`}>
                                            {getSlotIcon(card.slot)}
                                        </div>
                                        <div>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${colors.text}`}>
                                                {getSlotLabel(card.slot)}
                                            </span>
                                            <p className="text-xs font-medium text-neutral-400">
                                                {getSlotDescription(card.slot)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold text-neutral-400 font-mono bg-neutral-100 px-2 py-1 rounded-md">
                                            {index + 1} OF 3
                                        </span>
                                        {/* Why this appeared button */}
                                        <button
                                            onClick={() => setExpandedExplainer(
                                                expandedExplainer === card.id ? null : card.id
                                            )}
                                            className={`
                                                p-2 rounded-lg transition-all
                                                ${expandedExplainer === card.id
                                                    ? `${colors.badge}`
                                                    : 'hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900'}
                                            `}
                                            title="Why this appeared"
                                            aria-expanded={expandedExplainer === card.id}
                                        >
                                            <HelpCircle className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Explainer Panel (Progressive Disclosure) */}
                                {expandedExplainer === card.id && (
                                    <div className="mb-5 p-4 rounded-xl bg-white/50 border border-neutral-100 animate-slide-down">
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 mt-0.5">
                                                <Sparkles className={`w-3.5 h-3.5 ${colors.text}`} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-neutral-900 uppercase tracking-tighter mb-1">
                                                    Personalized Recommendation
                                                </p>
                                                <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                                                    {getExplainer(card)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Main Content */}
                                <div className="mb-5">
                                    <h3 className="text-xl font-bold text-neutral-900 mb-2 leading-tight group-hover:text-brand-red transition-colors">
                                        {card.title}
                                    </h3>
                                    <p className="text-neutral-600 text-[15px] leading-relaxed font-medium">
                                        {card.description}
                                    </p>
                                </div>

                                {/* Context / KPI Row */}
                                <div className="flex items-center justify-between py-4 border-t border-neutral-100/50 mb-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                        <Building2 className="w-3.5 h-3.5" />
                                        <span>{card.source}</span>
                                        {card.sourceType === 'EXTERNAL' && (
                                            <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                                        )}
                                    </div>

                                    {card.slot === 'CONTEXT_ANCHOR' && 'kpiChange' in card && (
                                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-bold ${(card as ContextAnchorCard).kpiChange! >= 0
                                            ? 'bg-emerald-50 text-emerald-600'
                                            : 'bg-red-50 text-brand-red'
                                            }`}>
                                            {(card as ContextAnchorCard).kpiChange! >= 0 ? (
                                                <TrendingUp className="w-3.5 h-3.5" />
                                            ) : (
                                                <TrendingDown className="w-3.5 h-3.5" />
                                            )}
                                            {Math.abs((card as ContextAnchorCard).kpiChange!)}% MOM
                                        </div>
                                    )}
                                </div>

                                {/* Actions Bar */}
                                <div className="flex items-center gap-3">
                                    {!isCompleted && card.actionLabel && (
                                        <button
                                            onClick={() => {
                                                if (card.slot === 'SIMULATOR') {
                                                    setShowSimulator(true);
                                                } else {
                                                    onCardAction(card);
                                                }
                                            }}
                                            className="flex-1 py-3 px-6 bg-brand-red hover:bg-red-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-red active:scale-95 translate-y-0 hover:-translate-y-0.5"
                                        >
                                            {card.actionLabel}
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    )}
                                    {!isCompleted && (
                                        <button
                                            onClick={() => handleMarkComplete(card.id)}
                                            className="p-3 rounded-xl bg-white hover:bg-neutral-50 text-neutral-400 hover:text-neutral-900 transition-all border border-neutral-200 shadow-sm active:scale-95"
                                            title="Archive Card"
                                            aria-label="Mark as complete"
                                        >
                                            <Check className="w-5 h-5" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setShowFlagModal(card.id)}
                                        className={`
                                            p-3 rounded-xl transition-all border shadow-sm active:scale-95
                                            ${card.flagged
                                                ? 'bg-red-50 border-red-200 text-brand-red'
                                                : 'bg-white border-neutral-200 text-neutral-400 hover:text-red-500'}
                                        `}
                                        title="Report Tuning Issue"
                                    >
                                        <Flag className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Completed Tag */}
                                {isCompleted && (
                                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                                        <Check className="w-3.5 h-3.5" />
                                        Archived
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Completion Status */}
            <div className="text-center py-4">
                {completedCards.length === displayCards.length ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F5E9] border border-[#4CAF50]/30 text-[#4CAF50] text-sm">
                        <Check className="w-4 h-4" />
                        All done! New cards arrive at midnight.
                    </div>
                ) : (
                    <div className="text-[#9E9E9E] text-sm">
                        {completedCards.length}/{displayCards.length} cards reviewed
                    </div>
                )}
            </div>

            {/* Flag Modal */}
            {showFlagModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl border border-[#E0E0E0] max-w-sm w-full p-6 animate-fadeIn shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-black">Report Issue</h3>
                            <button
                                onClick={() => setShowFlagModal(null)}
                                className="p-1 rounded-lg hover:bg-gray-100 text-[#616161]"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-[#616161] text-sm mb-4">
                            Why is this card not helpful? Your feedback improves recommendations.
                        </p>
                        <div className="space-y-2">
                            {[
                                { value: 'INCORRECT', label: 'Incorrect information', icon: AlertTriangle },
                                { value: 'OUTDATED', label: 'Outdated content', icon: Clock },
                                { value: 'INAPPROPRIATE', label: 'Not relevant to my role', icon: Flag },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleFlagSubmit(showFlagModal, option.value as any)}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#FAFAFA] hover:bg-gray-100 text-[#616161] hover:text-black transition-all text-sm border border-[#E0E0E0]"
                                >
                                    <option.icon className="w-4 h-4 text-[#9E9E9E]" />
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-[#9E9E9E] mt-4 text-center">
                            3 reports will quarantine this content for review
                        </p>
                    </div>
                </div>
            )}

            {/* Simulator Modal */}
            {showSimulator && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl border border-[#E60000]/30 max-w-2xl w-full max-h-[80vh] overflow-auto animate-fadeIn shadow-xl">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-[#E60000] flex items-center justify-center">
                                    <Gamepad2 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-black">
                                        {MOCK_SIMULATOR.title}
                                    </h2>
                                    <p className="text-sm text-[#616161]">
                                        {MOCK_SIMULATOR.durationMinutes} minute challenge
                                    </p>
                                </div>
                            </div>

                            <p className="text-[#616161] mb-6">{MOCK_SIMULATOR.description}</p>

                            {/* Code Block for Find the Bug */}
                            {MOCK_SIMULATOR.type === 'FIND_THE_BUG' && (
                                <div className="bg-[#1e1e1e] rounded-xl p-4 mb-6 border border-[#333]">
                                    <pre className="text-sm text-gray-300 overflow-x-auto font-mono">
                                        <code>{(MOCK_SIMULATOR.content as any).code}</code>
                                    </pre>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowSimulator(false);
                                        handleMarkComplete('simulator-card');
                                    }}
                                    className="flex-1 py-3 bg-[#E60000] hover:bg-[#CC0000] text-white font-semibold rounded-xl transition-all"
                                >
                                    Submit Answer
                                </button>
                                <button
                                    onClick={() => setShowSimulator(false)}
                                    className="px-6 py-3 bg-[#FAFAFA] hover:bg-gray-100 text-[#616161] font-semibold rounded-xl transition-all border border-[#E0E0E0]"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Daily3Feed;
