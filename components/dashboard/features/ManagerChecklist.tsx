import React, { useState } from 'react';
import { ClipboardList, Check, ChevronDown, TrendingUp, Users, Calendar, MessageCircle, Target } from 'lucide-react';

interface ManagerQuest {
    id: string;
    title: string;
    description: string;
    stat: string;
    icon: React.ReactNode;
    impact: string;
    completed: boolean;
}

const INITIAL_QUESTS: ManagerQuest[] = [
    {
        id: 'q1',
        title: 'Role & Responsibilities Discussion',
        description: 'Have a 1:1 conversation about expectations, success metrics, and the first 90-day roadmap.',
        stat: 'Managers who do this see 31% faster ramp-up',
        icon: <Target className="w-4 h-4" />,
        impact: 'Clarity',
        completed: false,
    },
    {
        id: 'q2',
        title: 'Assign a Peer Buddy',
        description: 'Pair the new hire with an experienced colleague who can answer the "silly" questions they won\'t ask you.',
        stat: 'Buddy-paired hires integrate 2.5x faster',
        icon: <Users className="w-4 h-4" />,
        impact: 'Safety',
        completed: false,
    },
    {
        id: 'q3',
        title: 'Schedule Monthly Check-ins',
        description: 'Set up recurring 1:1s for the first 6 months. Focus on Growth, Blockers, and Belonging — not just tasks.',
        stat: 'Regular check-ins reduce early attrition by 40%',
        icon: <Calendar className="w-4 h-4" />,
        impact: 'Retention',
        completed: false,
    },
    {
        id: 'q4',
        title: 'Introduce to 3 Cross-Functional Partners',
        description: 'Connect the new hire with people outside the immediate team they\'ll need to collaborate with.',
        stat: 'Cross-team connections boost first-quarter output by 25%',
        icon: <MessageCircle className="w-4 h-4" />,
        impact: 'Network',
        completed: false,
    },
    {
        id: 'q5',
        title: 'Solicit Feedback at 2 Weeks',
        description: 'Proactively ask: "What\'s working? What\'s confusing? What do you wish you\'d known sooner?"',
        stat: 'Early feedback loops improve satisfaction scores by 35%',
        icon: <TrendingUp className="w-4 h-4" />,
        impact: 'Trust',
        completed: false,
    },
];

interface ManagerChecklistProps {
    className?: string;
}

const ManagerChecklist: React.FC<ManagerChecklistProps> = ({ className = '' }) => {
    const [quests, setQuests] = useState<ManagerQuest[]>(INITIAL_QUESTS);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const completedCount = quests.filter(q => q.completed).length;
    const totalQuests = quests.length;
    const progressPercent = Math.round((completedCount / totalQuests) * 100);

    const toggleComplete = (id: string) => {
        setQuests(prev => prev.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
    };

    return (
        <div className={`p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                        <ClipboardList className="w-4 h-4 text-indigo-600" />
                    </div>
                    Manager Onboarding Quests
                </h3>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${completedCount === totalQuests
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                    }`}>
                    {completedCount}/{totalQuests}
                </span>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">New Hire Success Score</span>
                    <span className={`text-xs font-bold ${progressPercent >= 80 ? 'text-emerald-600' : 'text-neutral-500'}`}>
                        {progressPercent}%
                    </span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-700 ${progressPercent >= 80 ? 'bg-emerald-500' : progressPercent >= 40 ? 'bg-amber-400' : 'bg-brand-red'
                            }`}
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                {completedCount === totalQuests && (
                    <p className="text-[10px] font-bold text-emerald-600 mt-2 animate-fade-in">
                        🎉 All quests complete! Your new hire is set up for success.
                    </p>
                )}
            </div>

            {/* Quest list */}
            <div className="space-y-2">
                {quests.map((quest, index) => {
                    const isExpanded = expandedId === quest.id;
                    return (
                        <div
                            key={quest.id}
                            className={`rounded-xl border transition-all ${quest.completed
                                    ? 'border-emerald-200 bg-emerald-50/50'
                                    : isExpanded
                                        ? 'border-neutral-300 bg-neutral-50 shadow-sm'
                                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                                }`}
                        >
                            <div className="flex items-center gap-3 p-4">
                                {/* Checkbox */}
                                <button
                                    onClick={() => toggleComplete(quest.id)}
                                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all active:scale-90 ${quest.completed
                                            ? 'bg-emerald-500 border-emerald-500'
                                            : 'border-neutral-300 hover:border-brand-red'
                                        }`}
                                >
                                    {quest.completed && <Check className="w-3.5 h-3.5 text-white" />}
                                </button>

                                {/* Content */}
                                <button
                                    onClick={() => setExpandedId(isExpanded ? null : quest.id)}
                                    className="flex-1 text-left"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm font-bold ${quest.completed ? 'text-emerald-700 line-through' : 'text-neutral-900'}`}>
                                            {quest.title}
                                        </span>
                                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${quest.completed
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                : 'bg-neutral-100 text-neutral-500 border-neutral-200'
                                            }`}>
                                            {quest.impact}
                                        </span>
                                    </div>
                                </button>

                                <ChevronDown className={`w-4 h-4 text-neutral-300 transition-transform shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>

                            {isExpanded && (
                                <div className="px-4 pb-4 pl-[52px] space-y-3 animate-fade-in">
                                    <p className="text-xs text-neutral-600 leading-relaxed">{quest.description}</p>
                                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                                        <TrendingUp className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                        <span className="text-[10px] font-bold text-blue-700">{quest.stat}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <p className="text-[10px] text-neutral-400 mt-5 text-center leading-relaxed">
                Based on Google's Project Oxygen research — the manager's involvement is the #1 predictor of new hire success.
            </p>
        </div>
    );
};

export default ManagerChecklist;
