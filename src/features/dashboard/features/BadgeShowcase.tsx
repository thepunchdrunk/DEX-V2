import React, { useState } from 'react';
import { Award, Lock, ChevronRight, Star, Filter } from 'lucide-react';
import { Badge, BadgeCategory } from '../../../types';
import { MOCK_BADGES } from '../../../constants';

interface BadgeShowcaseProps {
    badges?: Badge[];
    className?: string;
}

const CATEGORY_LABELS: Record<BadgeCategory, { label: string; color: string }> = {
    ONBOARDING: { label: 'Onboarding', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    MASTERY: { label: 'Mastery', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    COMMUNITY: { label: 'Community', color: 'bg-violet-100 text-violet-700 border-violet-200' },
    STREAK: { label: 'Streak', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    SIMULATOR: { label: 'Simulator', color: 'bg-red-100 text-red-700 border-red-200' },
    LEADERSHIP: { label: 'Leadership', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    EASTER_EGG: { label: '??? Hidden', color: 'bg-neutral-100 text-neutral-600 border-neutral-300' },
};

const TIER_STYLES: Record<string, string> = {
    BRONZE: 'from-amber-600 to-amber-700',
    SILVER: 'from-slate-400 to-slate-500',
    GOLD: 'from-yellow-400 to-amber-500',
    PLATINUM: 'from-indigo-400 to-purple-500',
};

const BadgeShowcase: React.FC<BadgeShowcaseProps> = ({
    badges = MOCK_BADGES,
    className = '',
}) => {
    const [filter, setFilter] = useState<BadgeCategory | 'ALL'>('ALL');
    const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

    const unlockedCount = badges.filter(b => b.isUnlocked).length;
    const filteredBadges = filter === 'ALL'
        ? badges
        : badges.filter(b => b.category === filter);

    const categories = Array.from(new Set(badges.map(b => b.category)));

    return (
        <div className={`bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm ${className}`}>
            {/* Header */}
            <div className="p-5 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <Award className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900">Badge Collection</h3>
                            <p className="text-xs text-neutral-500">{unlockedCount} of {badges.length} earned</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
                        <Star className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs font-bold text-amber-700">{unlockedCount}</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-700"
                            style={{ width: `${(unlockedCount / badges.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Category Filters */}
            <div className="px-5 py-3 border-b border-neutral-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setFilter('ALL')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap border ${filter === 'ALL'
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                        }`}
                >
                    All
                </button>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap border ${filter === cat
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : `${CATEGORY_LABELS[cat].color}`
                            }`}
                    >
                        {CATEGORY_LABELS[cat].label}
                    </button>
                ))}
            </div>

            {/* Badge Grid */}
            <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {filteredBadges.map((badge) => (
                    <button
                        key={badge.id}
                        onClick={() => setSelectedBadge(selectedBadge?.id === badge.id ? null : badge)}
                        className={`group relative flex flex-col items-center p-4 rounded-2xl border transition-all ${badge.isUnlocked
                            ? 'bg-white border-neutral-200 hover:border-amber-300 hover:shadow-md'
                            : 'bg-neutral-50 border-neutral-100 opacity-60'
                            } ${selectedBadge?.id === badge.id ? 'ring-2 ring-amber-400 shadow-md' : ''}`}
                    >
                        {/* Badge Icon */}
                        <div className={`relative w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2 ${badge.isUnlocked
                            ? `bg-gradient-to-br ${TIER_STYLES[badge.tier]} shadow-md`
                            : 'bg-neutral-200'
                            }`}>
                            {badge.isUnlocked ? (
                                <span className="drop-shadow-sm">{badge.icon}</span>
                            ) : (
                                <Lock className="w-5 h-5 text-neutral-400" />
                            )}
                        </div>

                        {/* Badge Name */}
                        <span className={`text-xs font-bold text-center leading-tight ${badge.isUnlocked ? 'text-neutral-900' : 'text-neutral-400'
                            }`}>
                            {badge.name}
                        </span>

                        {/* Tier Label */}
                        <span className={`text-[9px] font-bold uppercase tracking-wider mt-1 ${badge.isUnlocked ? 'text-amber-500' : 'text-neutral-300'
                            }`}>
                            {badge.tier}
                        </span>

                        {/* Progress Bar for locked badges */}
                        {!badge.isUnlocked && badge.progress !== undefined && badge.maxProgress && (
                            <div className="w-full mt-2">
                                <div className="w-full h-1 rounded-full bg-neutral-200 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-amber-400"
                                        style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                                    />
                                </div>
                                <span className="text-[9px] text-neutral-400 mt-0.5 block text-center">{badge.progress}/{badge.maxProgress}</span>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Selected Badge Detail */}
            {selectedBadge && (
                <div className="mx-5 mb-5 p-4 rounded-xl bg-neutral-50 border border-neutral-200 animate-fade-in">
                    <div className="flex items-start gap-3">
                        <span className="text-3xl">{selectedBadge.icon}</span>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-neutral-900">{selectedBadge.name}</h4>
                            <p className="text-xs text-neutral-600 mt-0.5">{selectedBadge.description}</p>
                            <div className="mt-2 flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${CATEGORY_LABELS[selectedBadge.category].color}`}>
                                    {CATEGORY_LABELS[selectedBadge.category].label}
                                </span>
                                <span className="text-[10px] text-neutral-400">
                                    {selectedBadge.isUnlocked
                                        ? `Earned ${new Date(selectedBadge.unlockedAt!).toLocaleDateString()}`
                                        : selectedBadge.criteria}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BadgeShowcase;
