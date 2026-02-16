import React, { useState } from 'react';
import { Crosshair, Zap, Clock, Tag, Trophy, ChevronRight, Filter, Star } from 'lucide-react';
import { BountyGig, BountyDifficulty } from '@/types';
import { MOCK_BOUNTY_GIGS } from '@/config/constants';

interface BountyBoardProps {
    bounties?: BountyGig[];
    className?: string;
}

const DIFFICULTY_STYLES: Record<BountyDifficulty, { label: string; color: string; bg: string }> = {
    STARTER: { label: 'Starter', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
    INTERMEDIATE: { label: 'Intermediate', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
    ADVANCED: { label: 'Advanced', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
    EXPERT: { label: 'Expert', color: 'text-red-600', bg: 'bg-red-50 border-red-200' },
};

const BountyBoard: React.FC<BountyBoardProps> = ({
    bounties = MOCK_BOUNTY_GIGS,
    className = '',
}) => {
    const [diffFilter, setDiffFilter] = useState<BountyDifficulty | 'ALL'>('ALL');

    const filteredBounties = diffFilter === 'ALL'
        ? bounties
        : bounties.filter(b => b.difficulty === diffFilter);

    const getDaysLeft = (deadline: string) => {
        const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return days;
    };

    return (
        <div className={`bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm ${className}`}>
            {/* Header */}
            <div className="p-5 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <Crosshair className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900">Bounty Board</h3>
                            <p className="text-xs text-neutral-500">Earn points by completing cross-team projects</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200">
                        <Crosshair className="w-3.5 h-3.5 text-orange-500" />
                        <span className="text-xs font-bold text-orange-700">{bounties.filter(b => b.status === 'OPEN').length} open</span>
                    </div>
                </div>

                {/* Difficulty Filters */}
                <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setDiffFilter('ALL')}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap border ${diffFilter === 'ALL'
                                ? 'bg-neutral-900 text-white border-neutral-900'
                                : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                            }`}
                    >
                        All Levels
                    </button>
                    {(['STARTER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'] as BountyDifficulty[]).map(diff => {
                        const style = DIFFICULTY_STYLES[diff];
                        return (
                            <button
                                key={diff}
                                onClick={() => setDiffFilter(diff)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap border ${diffFilter === diff
                                        ? 'bg-neutral-900 text-white border-neutral-900'
                                        : style.bg
                                    }`}
                            >
                                {style.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Bounty Cards */}
            <div className="p-5 space-y-4">
                {filteredBounties.map((bounty, i) => {
                    const diffStyle = DIFFICULTY_STYLES[bounty.difficulty];
                    const daysLeft = getDaysLeft(bounty.deadline);
                    const isUrgent = daysLeft <= 7;

                    return (
                        <div
                            key={bounty.id}
                            className="group p-5 rounded-2xl border border-neutral-200 hover:border-orange-200 hover:shadow-md bg-white transition-all animate-fade-in-up"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    {/* Title + Difficulty */}
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <h4 className="text-sm font-bold text-neutral-900">{bounty.title}</h4>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${diffStyle.bg}`}>
                                            {diffStyle.label}
                                        </span>
                                    </div>

                                    {/* Posted by */}
                                    <p className="text-xs text-neutral-500">
                                        Posted by <strong>{bounty.postedBy}</strong> · {bounty.postedByDepartment}
                                    </p>

                                    {/* Description */}
                                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{bounty.description}</p>

                                    {/* Required Skills */}
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {bounty.requiredSkills.map(skill => (
                                            <span
                                                key={skill}
                                                className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-medium border border-neutral-200"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Skills You'll Gain */}
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <span className="text-[10px] text-neutral-400">You'll learn:</span>
                                        {bounty.skillsGained.map(skill => (
                                            <span
                                                key={skill}
                                                className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-medium border border-emerald-100"
                                            >
                                                +{skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer Stats */}
                                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
                                        <div className="flex items-center gap-4 text-[10px] text-neutral-400">
                                            <span className="flex items-center gap-1">
                                                <Trophy className="w-3 h-3 text-amber-500" />
                                                <strong className="text-amber-600">{bounty.points} pts</strong>
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                ~{bounty.estimatedHours}h
                                            </span>
                                            <span className={`flex items-center gap-1 font-bold ${isUrgent ? 'text-red-500' : 'text-neutral-400'}`}>
                                                <Zap className="w-3 h-3" />
                                                {daysLeft}d left
                                            </span>
                                        </div>

                                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 transition-all active:scale-95 shadow-sm">
                                            Claim
                                            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 border-t border-orange-100">
                <p className="text-xs text-orange-700 text-center font-medium">
                    🎯 <strong>Bounties</strong> let you learn by doing — earn points, gain skills, and build your reputation across teams.
                </p>
            </div>
        </div>
    );
};

export default BountyBoard;
