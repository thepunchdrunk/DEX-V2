import React, { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Flame, BookOpen, Activity, Crown } from 'lucide-react';
import { LeaderboardEntry } from '@/types';
import { MOCK_LEADERBOARD } from '@/config/constants';

interface LeaderboardProps {
    entries?: LeaderboardEntry[];
    currentUserId?: string;
    className?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
    entries = MOCK_LEADERBOARD,
    currentUserId = 'lb-4',
    className = '',
}) => {
    const [sortBy, setSortBy] = useState<'combined' | 'learning' | 'performance'>('combined');

    const sortedEntries = [...entries].sort((a, b) => {
        if (sortBy === 'learning') return b.learningScore - a.learningScore;
        if (sortBy === 'performance') return b.performanceScore - a.performanceScore;
        return b.combinedScore - a.combinedScore;
    }).map((entry, index) => ({ ...entry, rank: index + 1 }));

    const getRankStyles = (rank: number) => {
        if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-amber-200';
        if (rank === 2) return 'bg-gradient-to-r from-slate-50 to-neutral-50 border-slate-200';
        if (rank === 3) return 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200';
        return 'bg-white border-neutral-200';
    };

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Crown className="w-5 h-5 text-amber-500" />;
        if (rank === 2) return <span className="text-sm font-black text-slate-400">2</span>;
        if (rank === 3) return <span className="text-sm font-black text-orange-400">3</span>;
        return <span className="text-sm font-bold text-neutral-400">{rank}</span>;
    };

    const getChangeIcon = (change: string) => {
        if (change === 'UP') return <TrendingUp className="w-3 h-3 text-emerald-500" />;
        if (change === 'DOWN') return <TrendingDown className="w-3 h-3 text-red-400" />;
        return <Minus className="w-3 h-3 text-neutral-300" />;
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-emerald-600';
        if (score >= 80) return 'text-blue-600';
        if (score >= 70) return 'text-amber-600';
        return 'text-neutral-600';
    };

    return (
        <div className={`bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm ${className}`}>
            {/* Header */}
            <div className="p-5 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900">Impact Leaderboard</h3>
                            <p className="text-xs text-neutral-500">Learning × Performance = Impact</p>
                        </div>
                    </div>
                </div>

                {/* Sort Tabs */}
                <div className="flex items-center gap-2 mt-4">
                    {[
                        { key: 'combined', label: 'Impact', icon: <Activity className="w-3 h-3" /> },
                        { key: 'learning', label: 'Learning', icon: <BookOpen className="w-3 h-3" /> },
                        { key: 'performance', label: 'Performance', icon: <TrendingUp className="w-3 h-3" /> },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setSortBy(tab.key as typeof sortBy)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${sortBy === tab.key
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                    : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Column Headers */}
            <div className="px-5 py-2 grid grid-cols-12 gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider border-b border-neutral-100">
                <div className="col-span-1">#</div>
                <div className="col-span-4">Name</div>
                <div className="col-span-2 text-center">Learn</div>
                <div className="col-span-2 text-center">Perf</div>
                <div className="col-span-2 text-center">Impact</div>
                <div className="col-span-1 text-center">🔥</div>
            </div>

            {/* Entries */}
            <div className="divide-y divide-neutral-100">
                {sortedEntries.map((entry) => {
                    const isCurrentUser = entry.id === currentUserId;
                    return (
                        <div
                            key={entry.id}
                            className={`px-5 py-3 grid grid-cols-12 gap-2 items-center transition-all ${isCurrentUser ? 'bg-indigo-50/50 border-l-4 border-l-indigo-500' : ''
                                } ${getRankStyles(entry.rank)} hover:bg-neutral-50`}
                        >
                            {/* Rank */}
                            <div className="col-span-1 flex items-center justify-center w-8 h-8 rounded-lg">
                                {getRankIcon(entry.rank)}
                            </div>

                            {/* Name & Dept */}
                            <div className="col-span-4 flex items-center gap-2 min-w-0">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center text-xs font-bold text-neutral-600 flex-shrink-0">
                                    {entry.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="min-w-0">
                                    <p className={`text-xs font-bold truncate ${isCurrentUser ? 'text-indigo-700' : 'text-neutral-900'}`}>
                                        {entry.name} {isCurrentUser && <span className="text-[9px] text-indigo-500">(You)</span>}
                                    </p>
                                    <div className="flex items-center gap-1">
                                        <p className="text-[10px] text-neutral-400 truncate">{entry.department}</p>
                                        {getChangeIcon(entry.change)}
                                        {entry.changeAmount > 0 && (
                                            <span className={`text-[9px] font-bold ${entry.change === 'UP' ? 'text-emerald-500' : 'text-red-400'}`}>
                                                {entry.changeAmount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Learning Score */}
                            <div className="col-span-2 text-center">
                                <span className={`text-sm font-black ${getScoreColor(entry.learningScore)}`}>
                                    {entry.learningScore}
                                </span>
                            </div>

                            {/* Performance Score */}
                            <div className="col-span-2 text-center">
                                <span className={`text-sm font-black ${getScoreColor(entry.performanceScore)}`}>
                                    {entry.performanceScore}
                                </span>
                            </div>

                            {/* Combined Score */}
                            <div className="col-span-2 text-center">
                                <span className={`text-sm font-black ${getScoreColor(entry.combinedScore)}`}>
                                    {entry.combinedScore}
                                </span>
                            </div>

                            {/* Streak */}
                            <div className="col-span-1 flex items-center justify-center gap-0.5">
                                <Flame className="w-3 h-3 text-orange-400" />
                                <span className="text-[10px] font-bold text-neutral-600">{entry.streak}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer Insight */}
            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-indigo-100">
                <p className="text-xs text-indigo-700 text-center font-medium">
                    💡 Top performers combine <strong>continuous learning</strong> with <strong>high delivery</strong> — proving that learning drives results.
                </p>
            </div>
        </div>
    );
};

export default Leaderboard;
