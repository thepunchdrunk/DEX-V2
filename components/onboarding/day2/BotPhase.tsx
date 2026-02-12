import React, { useState } from 'react';
import {
    Sparkles,
    Send,
    ChevronRight,
} from 'lucide-react';
import { UnwrittenRuleResponse } from '../../../types';
import { UNWRITTEN_RULES } from '../../../constants';

interface BotPhaseProps {
    botResponses: UnwrittenRuleResponse[];
    setBotResponses: React.Dispatch<React.SetStateAction<UnwrittenRuleResponse[]>>;
    onComplete: () => void;
}

const BotPhase: React.FC<BotPhaseProps> = ({
    botResponses,
    setBotResponses,
    onComplete,
}) => {
    const [botQuestion, setBotQuestion] = useState('');
    const [isTyping, setIsTyping] = useState(false);

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

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Neural Culture Assistant</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Query the institutional knowledge base regarding unwritten protocols and cultural nuances.
                </p>
            </div>

            <div className="bg-white rounded-[40px] border border-neutral-100 shadow-2xl shadow-neutral-100/50 overflow-hidden flex flex-col h-[500px] relative" role="log" aria-live="polite" aria-label="Culture Assistant Chat">
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
                <div className="p-6 bg-white/80 backdrop-blur-xl border-t border-neutral-100">
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
                onClick={onComplete}
                className="btn-primary w-full py-6 mt-6 flex items-center justify-center gap-4 group"
            >
                <span className="text-xs uppercase font-black tracking-widest">Execute Cultural Synchronization</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default BotPhase;
