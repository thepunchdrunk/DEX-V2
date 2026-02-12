import React, { useState } from 'react';
import { Bell, Check, Circle, Sparkles, ArrowRight, ChevronRight, Coffee, Brain, Heart, TrendingUp, Zap } from 'lucide-react';
import { WhisperNudge } from '../../../types';
import { MOCK_WHISPER_NUDGES } from '../../../constants';

interface WhisperCourseProps {
    nudges?: WhisperNudge[];
    className?: string;
}

const CATEGORY_CONFIG: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
    NETWORKING: { icon: <Coffee className="w-4 h-4" />, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
    PRODUCTIVITY: { icon: <Zap className="w-4 h-4" />, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    CULTURE: { icon: <Heart className="w-4 h-4" />, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-200' },
    GROWTH: { icon: <TrendingUp className="w-4 h-4" />, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
    WELLBEING: { icon: <Sparkles className="w-4 h-4" />, color: 'text-violet-600', bg: 'bg-violet-50 border-violet-200' },
};

const WhisperCourse: React.FC<WhisperCourseProps> = ({
    nudges = MOCK_WHISPER_NUDGES,
    className = '',
}) => {
    const [localNudges, setLocalNudges] = useState(nudges);

    const completedCount = localNudges.filter(n => n.completed).length;
    const totalCount = localNudges.length;
    const progressPercent = Math.round((completedCount / totalCount) * 100);

    const handleComplete = (nudgeId: string) => {
        setLocalNudges(prev => prev.map(n =>
            n.id === nudgeId
                ? { ...n, completed: !n.completed, completedAt: n.completed ? undefined : new Date().toISOString() }
                : n
        ));
    };

    return (
        <div className={`bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm ${className}`}>
            {/* Header */}
            <div className="p-5 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                            <Bell className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900">Whisper Course</h3>
                            <p className="text-xs text-neutral-500">Behavioral nudges to accelerate your integration</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-black text-neutral-900">{completedCount}/{totalCount}</div>
                        <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Done</div>
                    </div>
                </div>

                {/* Progress */}
                <div className="mt-4">
                    <div className="w-full h-2.5 rounded-full bg-neutral-100 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-400 to-purple-500 transition-all duration-700"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-1.5">
                        <span className="text-[10px] text-neutral-400">Week 1</span>
                        <span className="text-[10px] text-neutral-400">Week 3+</span>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="p-5">
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-neutral-200" />

                    <div className="space-y-1">
                        {localNudges.map((nudge, i) => {
                            const cat = CATEGORY_CONFIG[nudge.category];
                            const isActive = !nudge.completed && i === localNudges.findIndex(n => !n.completed);
                            return (
                                <div
                                    key={nudge.id}
                                    className={`relative pl-12 py-3 animate-fade-in ${isActive ? '' : ''
                                        }`}
                                    style={{ animationDelay: `${i * 80}ms` }}
                                >
                                    {/* Timeline dot */}
                                    <div className={`absolute left-2.5 top-4 w-4 h-4 rounded-full flex items-center justify-center z-10 ${nudge.completed
                                            ? 'bg-emerald-500'
                                            : isActive
                                                ? 'bg-violet-500 ring-4 ring-violet-100'
                                                : 'bg-neutral-300'
                                        }`}>
                                        {nudge.completed && <Check className="w-2.5 h-2.5 text-white" />}
                                        {isActive && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                                    </div>

                                    {/* Card */}
                                    <div className={`rounded-xl border p-4 transition-all ${nudge.completed
                                            ? 'bg-neutral-50 border-neutral-100 opacity-75'
                                            : isActive
                                                ? 'bg-violet-50/50 border-violet-200 shadow-sm'
                                                : 'bg-white border-neutral-200'
                                        }`}>
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${nudge.completed ? 'text-neutral-400' : cat.color
                                                        }`}>
                                                        Week {nudge.weekNumber} · Day {nudge.dayInWeek}
                                                    </span>
                                                    <span className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${cat.bg}`}>
                                                        {cat.icon}
                                                    </span>
                                                </div>
                                                <h4 className={`text-sm font-bold ${nudge.completed ? 'text-neutral-400 line-through' : 'text-neutral-900'
                                                    }`}>
                                                    {nudge.title}
                                                </h4>
                                                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{nudge.message}</p>

                                                {/* Micro Action */}
                                                <div className={`mt-3 p-2.5 rounded-lg border ${nudge.completed
                                                        ? 'bg-emerald-50 border-emerald-100'
                                                        : 'bg-amber-50 border-amber-100'
                                                    }`}>
                                                    <div className="flex items-start gap-2">
                                                        <ArrowRight className={`w-3 h-3 mt-0.5 flex-shrink-0 ${nudge.completed ? 'text-emerald-500' : 'text-amber-500'
                                                            }`} />
                                                        <span className={`text-xs font-medium ${nudge.completed ? 'text-emerald-700' : 'text-amber-700'
                                                            }`}>
                                                            {nudge.microAction}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Complete button */}
                                            {!nudge.completed && (
                                                <button
                                                    onClick={() => handleComplete(nudge.id)}
                                                    className="flex-shrink-0 mt-1 p-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-all active:scale-95 shadow-sm"
                                                    title="Mark as done"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 border-t border-violet-100">
                <p className="text-xs text-violet-700 text-center font-medium">
                    💡 <strong>Whisper courses</strong> deliver micro-habit nudges over weeks — building lasting behavioral change, not just knowledge.
                </p>
            </div>
        </div>
    );
};

export default WhisperCourse;
