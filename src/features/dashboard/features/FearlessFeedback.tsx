import React, { useState } from 'react';
import { MessageSquareWarning, ChevronRight, Send, Star, ArrowRight, Check } from 'lucide-react';

interface FeedbackItem {
    id: string;
    from: string;
    fromInitials: string;
    context: 'meeting' | 'project' | 'code_review' | 'presentation';
    wentWell: string;
    tryNext: string;
    date: string;
    isNew: boolean;
}

const MOCK_FEEDBACK: FeedbackItem[] = [
    {
        id: 'fb1',
        from: 'Sarah Chen',
        fromInitials: 'SC',
        context: 'code_review',
        wentWell: 'Excellent code documentation. The inline comments on the auth module were especially clear.',
        tryNext: 'Consider breaking the utility functions into smaller files for easier testing.',
        date: '2 days ago',
        isNew: true,
    },
    {
        id: 'fb2',
        from: 'Marcus Rivera',
        fromInitials: 'MR',
        context: 'meeting',
        wentWell: 'Great job facilitating the sprint retrospective. Everyone got a chance to speak.',
        tryNext: 'Try timeboxing each agenda item — we ran 10 min over.',
        date: '5 days ago',
        isNew: false,
    },
    {
        id: 'fb3',
        from: 'Anika Patel',
        fromInitials: 'AP',
        context: 'project',
        wentWell: 'The migration plan was thorough and well-communicated to stakeholders.',
        tryNext: 'Earlier risk flagging on the data dependency would have helped downstream teams.',
        date: '1 week ago',
        isNew: false,
    },
];

const CONTEXT_LABELS: Record<string, { label: string; color: string }> = {
    meeting: { label: 'Meeting', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    project: { label: 'Project', color: 'bg-violet-50 text-violet-700 border-violet-200' },
    code_review: { label: 'Code Review', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    presentation: { label: 'Presentation', color: 'bg-amber-50 text-amber-700 border-amber-200' },
};

const PEERS = [
    { name: 'Sarah Chen', initials: 'SC' },
    { name: 'Marcus Rivera', initials: 'MR' },
    { name: 'Anika Patel', initials: 'AP' },
    { name: 'James Kim', initials: 'JK' },
    { name: 'Priya Sharma', initials: 'PS' },
];

interface FearlessFeedbackProps {
    className?: string;
}

const FearlessFeedback: React.FC<FearlessFeedbackProps> = ({ className = '' }) => {
    const [activeTab, setActiveTab] = useState<'received' | 'give'>('received');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [givingTo, setGivingTo] = useState<string | null>(null);
    const [giveContext, setGiveContext] = useState<string>('meeting');
    const [wellText, setWellText] = useState('');
    const [nextText, setNextText] = useState('');
    const [sent, setSent] = useState(false);

    const handleSend = () => {
        setSent(true);
        setTimeout(() => {
            setSent(false);
            setGivingTo(null);
            setWellText('');
            setNextText('');
        }, 2000);
    };

    return (
        <div className={`p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center">
                        <MessageSquareWarning className="w-4 h-4 text-orange-600" />
                    </div>
                    Fearless Feedback
                </h3>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Timely · Open · Honest
                </span>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-neutral-100 rounded-xl mb-5">
                {(['received', 'give'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all capitalize ${activeTab === tab
                                ? 'bg-white text-neutral-900 shadow-sm'
                                : 'text-neutral-500 hover:text-neutral-700'
                            }`}
                    >
                        {tab === 'received' ? `Received (${MOCK_FEEDBACK.length})` : 'Give Feedback'}
                    </button>
                ))}
            </div>

            {activeTab === 'received' && (
                <div className="space-y-3">
                    {MOCK_FEEDBACK.map(fb => {
                        const ctx = CONTEXT_LABELS[fb.context];
                        const isExpanded = expandedId === fb.id;
                        return (
                            <button
                                key={fb.id}
                                onClick={() => setExpandedId(isExpanded ? null : fb.id)}
                                className={`w-full text-left p-4 rounded-xl border transition-all ${isExpanded
                                        ? 'border-neutral-300 bg-neutral-50 shadow-sm'
                                        : 'border-neutral-200 hover:border-neutral-300 hover:shadow-sm bg-white'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-600 shrink-0">
                                        {fb.fromInitials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-sm font-bold text-neutral-900">{fb.from}</span>
                                            {fb.isNew && <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${ctx.color}`}>
                                                {ctx.label}
                                            </span>
                                            <span className="text-[10px] text-neutral-400">{fb.date}</span>
                                        </div>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 text-neutral-300 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                </div>

                                {isExpanded && (
                                    <div className="mt-4 space-y-3 animate-fade-in">
                                        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                                            <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                                                <Star className="w-3 h-3" /> What went well
                                            </p>
                                            <p className="text-xs text-emerald-800 leading-relaxed">{fb.wentWell}</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                                            <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                                                <ArrowRight className="w-3 h-3" /> What to try next
                                            </p>
                                            <p className="text-xs text-amber-800 leading-relaxed">{fb.tryNext}</p>
                                        </div>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {activeTab === 'give' && !givingTo && (
                <div>
                    <p className="text-xs text-neutral-500 mb-4">Select a peer to give structured feedback:</p>
                    <div className="space-y-2">
                        {PEERS.map(peer => (
                            <button
                                key={peer.name}
                                onClick={() => setGivingTo(peer.name)}
                                className="w-full flex items-center gap-3 p-3 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all bg-white text-left"
                            >
                                <div className="w-9 h-9 rounded-xl bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-600">
                                    {peer.initials}
                                </div>
                                <span className="text-sm font-medium text-neutral-900 flex-1">{peer.name}</span>
                                <ChevronRight className="w-4 h-4 text-neutral-300" />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'give' && givingTo && !sent && (
                <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-2 mb-2">
                        <button onClick={() => setGivingTo(null)} className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors">
                            ← Back
                        </button>
                        <span className="text-xs text-neutral-300">|</span>
                        <span className="text-sm font-bold text-neutral-900">Feedback for {givingTo}</span>
                    </div>

                    <div>
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Context</p>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(CONTEXT_LABELS).map(([key, ctx]) => (
                                <button
                                    key={key}
                                    onClick={() => setGiveContext(key)}
                                    className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all ${giveContext === key ? `${ctx.color} border-2` : 'bg-neutral-50 text-neutral-500 border-neutral-200'
                                        }`}
                                >
                                    {ctx.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Star className="w-3 h-3" /> What went well
                        </p>
                        <textarea
                            value={wellText}
                            onChange={e => setWellText(e.target.value)}
                            placeholder="Be specific about what they did well..."
                            className="w-full p-3 rounded-xl border border-neutral-200 text-sm resize-none h-20 focus:outline-none focus:border-brand-red/50 transition-colors placeholder:text-neutral-300"
                        />
                    </div>

                    <div>
                        <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <ArrowRight className="w-3 h-3" /> What to try next time
                        </p>
                        <textarea
                            value={nextText}
                            onChange={e => setNextText(e.target.value)}
                            placeholder="Suggest an improvement constructively..."
                            className="w-full p-3 rounded-xl border border-neutral-200 text-sm resize-none h-20 focus:outline-none focus:border-brand-red/50 transition-colors placeholder:text-neutral-300"
                        />
                    </div>

                    <button
                        onClick={handleSend}
                        disabled={!wellText.trim() || !nextText.trim()}
                        className="w-full py-3 bg-brand-red text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                        Send Fearless Feedback
                    </button>
                </div>
            )}

            {activeTab === 'give' && sent && (
                <div className="text-center py-8 animate-fade-in">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
                        <Check className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900 mb-1">Feedback Sent!</h4>
                    <p className="text-xs text-neutral-500">Timely, open, and honest — just as it should be.</p>
                </div>
            )}
        </div>
    );
};

export default FearlessFeedback;
