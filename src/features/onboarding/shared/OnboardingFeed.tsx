import React, { useState } from 'react';
import {
    Check,
    ChevronRight,
    Flag,
    HelpCircle,
    Sparkles,
    Play,
    Clock,
    ArrowRight,
} from 'lucide-react';

export interface OnboardingCard {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    status: 'LOCKED' | 'AVAILABLE' | 'COMPLETED' | 'IN_PROGRESS';
    type: 'SETUP' | 'LEARNING' | 'ACTION' | 'CONNECT' | 'REVIEW' | 'CELEBRATION';
    actionLabel?: string;
    secondaryActionLabel?: string;
    onAction?: () => void;
    onSecondaryAction?: () => void;
    onMarkComplete?: () => void;
    progress?: number; // 0-100
    estimatedTime?: string;
    explainer?: string; // "Why is this here?"
}

interface OnboardingFeedProps {
    cards: OnboardingCard[];
    onCardAction: (id: string) => void;
}

const OnboardingFeed: React.FC<OnboardingFeedProps> = ({ cards, onCardAction }) => {
    const [expandedExplainer, setExpandedExplainer] = useState<string | null>(null);

    const getCardColors = (type: OnboardingCard['type']) => {
        switch (type) {
            case 'SETUP': // Administrative / System
                return {
                    bg: 'bg-neutral-50/50',
                    border: 'border-neutral-100 group-hover:border-neutral-300',
                    text: 'text-neutral-600',
                    badge: 'bg-neutral-100 text-neutral-700'
                };
            case 'LEARNING': // Content consumption
                return {
                    bg: 'bg-blue-50/50',
                    border: 'border-blue-100 group-hover:border-blue-300',
                    text: 'text-blue-600',
                    badge: 'bg-blue-100 text-blue-700'
                };
            case 'ACTION': // Interactive tasks
                return {
                    bg: 'bg-emerald-50/50',
                    border: 'border-emerald-100 group-hover:border-emerald-300',
                    text: 'text-emerald-600',
                    badge: 'bg-emerald-100 text-emerald-700'
                };
            case 'CONNECT': // People / Social
                return {
                    bg: 'bg-purple-50/50',
                    border: 'border-purple-100 group-hover:border-purple-300',
                    text: 'text-purple-600',
                    badge: 'bg-purple-100 text-purple-700'
                };
            case 'REVIEW': // Exams / Checks
                return {
                    bg: 'bg-amber-50/50',
                    border: 'border-amber-100 group-hover:border-amber-300',
                    text: 'text-amber-600',
                    badge: 'bg-amber-100 text-amber-700'
                };
            case 'CELEBRATION': // Graduation / Success
                return {
                    bg: 'bg-yellow-50/50',
                    border: 'border-yellow-100 group-hover:border-yellow-300',
                    text: 'text-yellow-600',
                    badge: 'bg-yellow-100 text-yellow-700'
                };
            default:
                return {
                    bg: 'bg-white',
                    border: 'border-neutral-200',
                    text: 'text-neutral-900',
                    badge: 'bg-neutral-100 text-neutral-900'
                };
        }
    };

    return (
        <div className="space-y-5">
            {cards.map((card, index) => {
                const colors = getCardColors(card.type);
                const isCompleted = card.status === 'COMPLETED';
                const isLocked = card.status === 'LOCKED';

                return (
                    <div
                        key={card.id}
                        className={`
                            group relative backdrop-blur-md rounded-2xl border transition-all duration-500
                            ${colors.bg} ${colors.border}
                            ${isCompleted
                                ? 'opacity-60 scale-[0.99] grayscale-[0.5]'
                                : isLocked
                                    ? 'opacity-40 pointer-events-none'
                                    : 'hover:-translate-y-1 hover:shadow-xl shadow-sm animate-slide-up'}
                        `}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Status Stripe */}
                        {!isLocked && !isCompleted && (
                            <div className={`h-1.5 w-full absolute top-0 left-0 ${colors.text.replace('text-', 'bg-')} opacity-20 rounded-t-2xl`} />
                        )}

                        <div className="p-6">
                            {/* Card Header */}
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-4">
                                    <div className={`
                                        w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform
                                        ${isCompleted ? 'bg-emerald-100 text-emerald-600' : colors.badge}
                                    `}>
                                        {isCompleted ? <Check className="w-6 h-6" /> : card.icon}
                                    </div>
                                    <div>
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${colors.text}`}>
                                            {card.type} MODULE
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {card.estimatedTime && (
                                                <span className="flex items-center gap-1 text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
                                                    <Clock className="w-3 h-3" /> {card.estimatedTime}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {card.explainer && (
                                        <button
                                            onClick={() => setExpandedExplainer(expandedExplainer === card.id ? null : card.id)}
                                            className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
                                            title="About this module"
                                        >
                                            <HelpCircle className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Explainer Panel */}
                            {expandedExplainer === card.id && (
                                <div className="mb-5 p-4 rounded-xl bg-white/50 border border-neutral-100 animate-slide-down">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 mt-0.5">
                                            <Sparkles className={`w-3.5 h-3.5 ${colors.text}`} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-neutral-900 uppercase tracking-tighter mb-1">
                                                Context
                                            </p>
                                            <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                                                {card.explainer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Main Content */}
                            <div className="mb-6">
                                <h3 className={`text-xl font-bold mb-2 leading-tight transition-colors ${isCompleted ? 'text-neutral-500 line-through' : 'text-neutral-900 group-hover:text-brand-red'}`}>
                                    {card.title}
                                </h3>
                                <p className="text-neutral-600 text-[15px] leading-relaxed font-medium">
                                    {card.description}
                                </p>
                            </div>

                            {/* Progress Bar (if applicable) */}
                            {typeof card.progress === 'number' && !isCompleted && (
                                <div className="mb-6">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Progress</span>
                                        <span className="text-[10px] font-bold text-brand-red">{card.progress}%</span>
                                    </div>
                                    <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-brand-red transition-all duration-500"
                                            style={{ width: `${card.progress}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-3">
                                {!isCompleted && !isLocked && (
                                    <>
                                        {card.onAction && (
                                            <button
                                                onClick={() => card.onAction?.()}
                                                className="flex-1 py-3 px-6 bg-brand-red hover:bg-red-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-red active:scale-95 translate-y-0 hover:-translate-y-0.5"
                                            >
                                                {card.actionLabel || 'Start Module'}
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        )}
                                        {card.onSecondaryAction && (
                                            <button
                                                onClick={() => card.onSecondaryAction?.()}
                                                className="py-3 px-6 bg-white hover:bg-neutral-50 text-neutral-600 font-bold rounded-xl border border-neutral-200 transition-all active:scale-95"
                                            >
                                                {card.secondaryActionLabel || 'Options'}
                                            </button>
                                        )}
                                    </>
                                )}

                                {isCompleted && (
                                    <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest rounded-xl border border-emerald-100 w-full justify-center">
                                        <Check className="w-4 h-4" /> Module Complete
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Lock Overlay */}
                        {isLocked && (
                            <div className="absolute inset-0 bg-neutral-50/50 backdrop-blur-[1px] rounded-2xl flex items-center justify-center">
                                <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-neutral-200 text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                                    Complete Previous Steps to Unlock
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default OnboardingFeed;
