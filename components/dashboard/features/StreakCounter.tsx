import React from 'react';
import { Flame, TrendingUp, AlertTriangle, Award } from 'lucide-react';
import { StreakData } from '../../../types';
import { MOCK_STREAK_DATA } from '../../../constants';

interface StreakCounterProps {
    streak?: StreakData;
    compact?: boolean;
    className?: string;
}

const StreakCounter: React.FC<StreakCounterProps> = ({
    streak = MOCK_STREAK_DATA,
    compact = false,
    className = '',
}) => {
    const nextMilestone = streak.milestones.find(m => m > streak.currentStreak);
    const progressToNext = nextMilestone
        ? Math.round((streak.currentStreak / nextMilestone) * 100)
        : 100;

    const getFlameColor = () => {
        if (streak.isAtRisk) return 'text-amber-400 animate-pulse';
        if (streak.currentStreak >= 30) return 'text-orange-500';
        if (streak.currentStreak >= 7) return 'text-orange-400';
        return 'text-neutral-400';
    };

    const getFlameSize = () => {
        if (streak.currentStreak >= 30) return 'w-6 h-6';
        if (streak.currentStreak >= 7) return 'w-5 h-5';
        return 'w-4 h-4';
    };

    // Compact mode for header
    if (compact) {
        return (
            <div className={`flex items-center gap-1.5 ${className}`} title={`${streak.currentStreak}-day streak`}>
                <Flame className={`${getFlameSize()} ${getFlameColor()} transition-all`} />
                <span className="text-sm font-black text-neutral-900">{streak.currentStreak}</span>
                {streak.isAtRisk && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">!</span>
                )}
            </div>
        );
    }

    // Full mode for dashboard
    return (
        <div className={`bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm ${className}`}>
            {/* Header */}
            <div className="p-5 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <Flame className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-neutral-900">Learning Streak</h3>
                            <p className="text-xs text-neutral-500">Keep the fire alive!</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black text-neutral-900">{streak.currentStreak}</div>
                        <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Days</div>
                    </div>
                </div>
            </div>

            {/* Progress to Next Milestone */}
            {nextMilestone && (
                <div className="px-5 py-4 border-b border-neutral-100 bg-neutral-50/50">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-neutral-500">Next milestone: {nextMilestone} days</span>
                        <span className="text-xs font-bold text-orange-500">{progressToNext}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-200 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-1000"
                            style={{ width: `${progressToNext}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-3 divide-x divide-neutral-100">
                <div className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <div className="text-lg font-black text-neutral-900">{streak.bestStreak}</div>
                    <div className="text-[10px] font-medium text-neutral-400 uppercase">Best</div>
                </div>
                <div className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <Award className="w-3.5 h-3.5 text-purple-500" />
                    </div>
                    <div className="text-lg font-black text-neutral-900">{streak.totalActiveDays}</div>
                    <div className="text-[10px] font-medium text-neutral-400 uppercase">Total</div>
                </div>
                <div className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <Flame className="w-3.5 h-3.5 text-orange-500" />
                    </div>
                    <div className="text-lg font-black text-neutral-900">{streak.milestones.filter(m => m <= streak.currentStreak).length}</div>
                    <div className="text-[10px] font-medium text-neutral-400 uppercase">Milestones</div>
                </div>
            </div>

            {/* At Risk Warning */}
            {streak.isAtRisk && (
                <div className="mx-5 mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <div>
                        <p className="text-xs font-bold text-amber-800">Streak at risk!</p>
                        <p className="text-[10px] text-amber-600">Complete one learning item to keep your {streak.currentStreak}-day streak alive.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StreakCounter;
