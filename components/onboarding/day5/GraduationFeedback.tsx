import React, { useState } from 'react';
import {
    Send,
    Star,
    Sparkles,
} from 'lucide-react';
import { OnboardingFeedback } from '../../../types';

interface GraduationFeedbackProps {
    feedback: Partial<OnboardingFeedback>;
    setFeedback: React.Dispatch<React.SetStateAction<Partial<OnboardingFeedback>>>;
    onNext: () => void;
}

const GraduationFeedback: React.FC<GraduationFeedbackProps> = ({
    feedback,
    setFeedback,
    onNext,
}) => {
    const [frictionInput, setFrictionInput] = useState('');
    const [highlightInput, setHighlightInput] = useState('');

    const handleAddFriction = () => {
        if (frictionInput.trim()) {
            setFeedback(prev => ({
                ...prev,
                frictionPoints: [...(prev.frictionPoints || []), frictionInput.trim()]
            }));
            setFrictionInput('');
        }
    };

    const handleAddHighlight = () => {
        if (highlightInput.trim()) {
            setFeedback(prev => ({
                ...prev,
                highlights: [...(prev.highlights || []), highlightInput.trim()]
            }));
            setHighlightInput('');
        }
    };

    const handleSubmitFeedback = () => {
        setFeedback(prev => ({
            ...prev,
            submittedAt: new Date().toISOString(),
            requiresFollowUp: (prev.overallSatisfaction || 5) <= 2,
        }));
        onNext();
    };

    const canSubmitFeedback = feedback.overallSatisfaction && feedback.confidenceLevel;

    return (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional <span className="text-brand-red">Feedback</span> Loop</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Contribute to the evolution of our onboarding infrastructure. Your strategic insights directly influence the development of future institutional immersion protocols.
                </p>
            </div>

            {/* Satisfaction & Confidence Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Overall Satisfaction */}
                <div className="bg-white rounded-[32px] border border-neutral-100 p-8 shadow-sm">
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-6">Onboarding Satisfaction</p>
                    <div className="flex items-center justify-between gap-2" role="radiogroup" aria-label="Satisfaction rating">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                                key={rating}
                                role="radio"
                                aria-checked={feedback.overallSatisfaction === rating}
                                aria-label={`${rating} out of 5 satisfaction`}
                                onClick={() => setFeedback(prev => ({ ...prev, overallSatisfaction: rating as 1 | 2 | 3 | 4 | 5 }))}
                                className={`
                                    flex-1 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all border
                                    ${feedback.overallSatisfaction === rating
                                        ? 'bg-neutral-900 border-neutral-900 text-white shadow-xl -translate-y-1'
                                        : 'bg-neutral-50 border-neutral-100 text-neutral-400 hover:bg-white hover:border-brand-red/30'}
                                `}
                            >
                                <span aria-hidden="true">
                                    {rating === 1 && '😔'}
                                    {rating === 2 && '😕'}
                                    {rating === 3 && '😐'}
                                    {rating === 4 && '🙂'}
                                    {rating === 5 && '😄'}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 px-1">
                        <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest">Dissatisfied</span>
                        <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest">Exceptional</span>
                    </div>
                </div>

                {/* Confidence Level */}
                <div className="bg-white rounded-[32px] border border-neutral-100 p-8 shadow-sm">
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-6">Operational Confidence</p>
                    <div className="flex items-center justify-between gap-2" role="radiogroup" aria-label="Confidence rating">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                                key={rating}
                                role="radio"
                                aria-checked={feedback.confidenceLevel === rating}
                                aria-label={`${rating} out of 5 confidence`}
                                onClick={() => setFeedback(prev => ({ ...prev, confidenceLevel: rating as 1 | 2 | 3 | 4 | 5 }))}
                                className={`
                                    flex-1 h-16 rounded-2xl flex items-center justify-center transition-all border
                                    ${feedback.confidenceLevel === rating
                                        ? 'bg-brand-red border-brand-red text-white shadow-xl -translate-y-1'
                                        : 'bg-neutral-50 border-neutral-100 text-neutral-400 hover:bg-white hover:border-brand-red/30'}
                                `}
                            >
                                <span aria-hidden="true">
                                    {rating === 1 && <Star className="w-6 h-6" />}
                                    {rating === 2 && <Star className="w-6 h-6" />}
                                    {rating === 3 && <Star className="w-6 h-6" />}
                                    {rating === 4 && <Star className="w-6 h-6 fill-current" />}
                                    {rating === 5 && <Sparkles className="w-6 h-6" />}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 px-1">
                        <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest">Uncertain</span>
                        <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest">Mission Ready</span>
                    </div>
                </div>
            </div>

            {/* Strategic Qualitative Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Friction Points */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] px-2">Operational Friction (Optional)</h4>
                    <div className="relative">
                        <input
                            type="text"
                            value={frictionInput}
                            onChange={(e) => setFrictionInput(e.target.value)}
                            placeholder="Identify institutional bottlenecks..."
                            className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-xs font-bold text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-brand-red focus:bg-white transition-all pr-24"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddFriction()}
                        />
                        <button
                            onClick={handleAddFriction}
                            className="absolute right-2 top-2 bottom-2 px-4 bg-neutral-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-red transition-colors"
                        >
                            Log Point
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Logged friction points">
                        {feedback.frictionPoints?.map((point, i) => (
                            <span key={i} role="listitem" className="px-4 py-2 bg-red-50 text-brand-red border border-red-100 text-[10px] font-black uppercase tracking-widest rounded-xl animate-scale-in">
                                {point}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Highlights */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] px-2">Institutional Wins (Optional)</h4>
                    <div className="relative">
                        <input
                            type="text"
                            value={highlightInput}
                            onChange={(e) => setHighlightInput(e.target.value)}
                            placeholder="Institutional strengths..."
                            className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-xs font-bold text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all pr-24"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddHighlight()}
                        />
                        <button
                            onClick={handleAddHighlight}
                            className="absolute right-2 top-2 bottom-2 px-4 bg-neutral-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors"
                        >
                            Log Win
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Logged wins">
                        {feedback.highlights?.map((highlight, i) => (
                            <span key={i} role="listitem" className="px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black uppercase tracking-widest rounded-xl animate-scale-in">
                                {highlight}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={handleSubmitFeedback}
                disabled={!canSubmitFeedback}
                className={`
                    w-full py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 group shadow-xl
                    ${canSubmitFeedback
                        ? 'bg-brand-red text-white hover:bg-red-600 hover:-translate-y-1 active:translate-y-0'
                        : 'bg-neutral-100 text-neutral-300 cursor-not-allowed border border-neutral-200'}
                `}
            >
                Transmit Strategic Feedback <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>
    );
};

export default GraduationFeedback;
