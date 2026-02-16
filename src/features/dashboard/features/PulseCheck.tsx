import React, { useState } from 'react';
import { MessageCircleHeart, X, TrendingUp, Send } from 'lucide-react';

interface PulseResponse {
    question: string;
    emoji: string;
    score: number; // 1-5
    label: string;
}

const PULSE_QUESTIONS = [
    { id: 'tools', question: 'Do you have the tools you need to do your best work?', emoji: '🔧', category: 'Tools & Tech' },
    { id: 'productive', question: 'Do you feel productive and effective in your role?', emoji: '⚡', category: 'Productivity' },
    { id: 'belonging', question: 'Do you feel a sense of belonging on your team?', emoji: '🤝', category: 'Connection' },
];

const SCORE_OPTIONS = [
    { score: 1, label: 'Struggling', emoji: '😟', color: 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200' },
    { score: 2, label: 'Could be better', emoji: '😐', color: 'bg-orange-100 border-orange-300 text-orange-700 hover:bg-orange-200' },
    { score: 3, label: 'Okay', emoji: '🙂', color: 'bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200' },
    { score: 4, label: 'Good', emoji: '😊', color: 'bg-emerald-100 border-emerald-300 text-emerald-700 hover:bg-emerald-200' },
    { score: 5, label: 'Thriving', emoji: '🤩', color: 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200' },
];

// Historical trend data (mock past responses)
const MOCK_HISTORY = [
    { day: 30, tools: 3, productive: 2, belonging: 3 },
    { day: 60, tools: 4, productive: 3, belonging: 4 },
    { day: 90, tools: 4, productive: 4, belonging: 4 },
];

interface PulseCheckProps {
    daysSinceJoin?: number;
    className?: string;
}

const PulseCheck: React.FC<PulseCheckProps> = ({ daysSinceJoin = 45, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState<PulseResponse[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const handleScore = (score: number) => {
        const q = PULSE_QUESTIONS[currentStep];
        const option = SCORE_OPTIONS.find(o => o.score === score)!;
        const newResponses = [...responses, { question: q.question, emoji: q.emoji, score, label: option.label }];
        setResponses(newResponses);

        if (currentStep < PULSE_QUESTIONS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            setSubmitted(true);
        }
    };

    const reset = () => {
        setIsOpen(false);
        setCurrentStep(0);
        setResponses([]);
        setSubmitted(false);
    };

    // Trend visualization for Profile
    const renderTrend = () => (
        <div className={`p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm ${className}`}>
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center">
                        <MessageCircleHeart className="w-4 h-4 text-pink-600" />
                    </div>
                    Pulse Check
                </h3>
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-xs font-bold text-brand-red hover:text-red-700 transition-colors flex items-center gap-1"
                >
                    <Send className="w-3 h-3" />
                    Take Pulse
                </button>
            </div>

            {/* Trend Chart */}
            <div className="space-y-4">
                {PULSE_QUESTIONS.map((q) => {
                    const key = q.id as keyof typeof MOCK_HISTORY[0];
                    return (
                        <div key={q.id}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-neutral-600 flex items-center gap-1.5">
                                    <span>{q.emoji}</span> {q.category}
                                </span>
                                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> Improving
                                </span>
                            </div>
                            <div className="flex items-end gap-1 h-8">
                                {MOCK_HISTORY.map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                                        <div
                                            className="w-full rounded-sm bg-brand-red/20 hover:bg-brand-red/40 transition-colors relative group"
                                            style={{ height: `${(h[key] as number / 5) * 100}%` }}
                                        >
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-[9px] px-1.5 py-0.5 rounded border border-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm font-bold text-neutral-700 whitespace-nowrap">
                                                {SCORE_OPTIONS[(h[key] as number) - 1]?.emoji} {h[key] as number}/5
                                            </div>
                                        </div>
                                        <span className="text-[8px] text-neutral-400 font-medium">D{h.day}</span>
                                    </div>
                                ))}
                                {/* Current slot */}
                                <div className="flex-1 flex flex-col items-center gap-0.5">
                                    <div className="w-full h-full rounded-sm border-2 border-dashed border-neutral-200 flex items-center justify-center">
                                        <span className="text-[8px] text-neutral-300 font-bold">?</span>
                                    </div>
                                    <span className="text-[8px] text-brand-red font-bold">Now</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <p className="text-[10px] text-neutral-400 mt-4 text-center">
                Google-style 30/90/365 day sentiment tracking
            </p>
        </div>
    );

    // Survey modal
    const renderModal = () => (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-md mx-4 overflow-hidden animate-fade-in-up">
                {/* Header */}
                <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center">
                            <MessageCircleHeart className="w-4 h-4 text-pink-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-neutral-900">Pulse Check</h3>
                            <p className="text-[10px] text-neutral-400">Day {daysSinceJoin} • Quick sentiment check</p>
                        </div>
                    </div>
                    <button onClick={reset} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {!submitted ? (
                    <div className="p-6">
                        {/* Progress dots */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            {PULSE_QUESTIONS.map((_, i) => (
                                <div key={i} className={`w-2 h-2 rounded-full transition-all ${i < currentStep ? 'bg-emerald-400 scale-100'
                                        : i === currentStep ? 'bg-brand-red scale-125'
                                            : 'bg-neutral-200'
                                    }`} />
                            ))}
                        </div>

                        {/* Question */}
                        <div className="text-center mb-6">
                            <span className="text-3xl mb-3 block">{PULSE_QUESTIONS[currentStep].emoji}</span>
                            <p className="text-sm font-bold text-neutral-900 leading-relaxed">
                                {PULSE_QUESTIONS[currentStep].question}
                            </p>
                        </div>

                        {/* Score options */}
                        <div className="flex flex-col gap-2">
                            {SCORE_OPTIONS.map((opt) => (
                                <button
                                    key={opt.score}
                                    onClick={() => handleScore(opt.score)}
                                    className={`w-full p-3 rounded-xl border text-sm font-medium transition-all active:scale-98 ${opt.color}`}
                                >
                                    <span className="mr-2">{opt.emoji}</span>
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="p-6 text-center">
                        <span className="text-4xl block mb-3">✅</span>
                        <h4 className="text-lg font-bold text-neutral-900 mb-2">Thanks for sharing!</h4>
                        <p className="text-sm text-neutral-500 mb-5">Your pulse helps us improve the experience for everyone.</p>

                        <div className="space-y-2 mb-5">
                            {responses.map((r, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                                    <span className="text-xs text-neutral-600">{r.emoji} {PULSE_QUESTIONS[i].category}</span>
                                    <span className="text-xs font-bold">{SCORE_OPTIONS[r.score - 1]?.emoji} {r.label}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={reset}
                            className="w-full py-3 bg-brand-red text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-colors active:scale-95"
                        >
                            Done
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
            {renderTrend()}
            {isOpen && renderModal()}
        </>
    );
};

export default PulseCheck;
