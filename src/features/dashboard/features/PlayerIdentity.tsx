import React from 'react';
import { Shield, Zap, Crown, Star, Rocket } from 'lucide-react';

// Identity tiers based on accumulated activity
export interface PlayerTier {
    title: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    borderColor: string;
    minDays: number;
}

const TIERS: PlayerTier[] = [
    {
        title: 'Explorer',
        icon: <Rocket className="w-3 h-3" />,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        minDays: 0,
    },
    {
        title: 'Practitioner',
        icon: <Zap className="w-3 h-3" />,
        color: 'text-violet-600',
        bgColor: 'bg-violet-50',
        borderColor: 'border-violet-200',
        minDays: 14,
    },
    {
        title: 'Specialist',
        icon: <Shield className="w-3 h-3" />,
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        minDays: 60,
    },
    {
        title: 'Expert',
        icon: <Star className="w-3 h-3" />,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        minDays: 120,
    },
    {
        title: 'Luminary',
        icon: <Crown className="w-3 h-3" />,
        color: 'text-brand-red',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        minDays: 365,
    },
];

export function getPlayerTier(daysSinceJoin: number = 45): PlayerTier {
    let current = TIERS[0];
    for (const tier of TIERS) {
        if (daysSinceJoin >= tier.minDays) current = tier;
    }
    return current;
}

export function getNextTier(daysSinceJoin: number = 45): PlayerTier | null {
    const currentIdx = TIERS.findIndex(t => t === getPlayerTier(daysSinceJoin));
    return currentIdx < TIERS.length - 1 ? TIERS[currentIdx + 1] : null;
}

interface PlayerIdentityBadgeProps {
    daysSinceJoin?: number;
    compact?: boolean;
}

/** Compact badge for header bar */
const PlayerIdentityBadge: React.FC<PlayerIdentityBadgeProps> = ({ daysSinceJoin = 45, compact = false }) => {
    const tier = getPlayerTier(daysSinceJoin);
    const nextTier = getNextTier(daysSinceJoin);

    if (compact) {
        return (
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${tier.bgColor} ${tier.borderColor} border transition-all`}>
                <span className={tier.color}>{tier.icon}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${tier.color}`}>{tier.title}</span>
            </div>
        );
    }

    // Full profile card
    const progress = nextTier
        ? Math.round(((daysSinceJoin - tier.minDays) / (nextTier.minDays - tier.minDays)) * 100)
        : 100;

    return (
        <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-xl ${tier.bgColor} ${tier.borderColor} border flex items-center justify-center`}>
                        <span className={tier.color}>{tier.icon}</span>
                    </span>
                    DEX Identity
                </h3>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${tier.bgColor} ${tier.color} ${tier.borderColor} border`}>
                    {tier.title}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Current Rank</p>
                    <p className="text-sm font-bold text-neutral-900">{tier.title}</p>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Days Active</p>
                    <p className="text-sm font-bold text-neutral-900">{daysSinceJoin}</p>
                </div>
            </div>

            {nextTier && (
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-neutral-500">Progress to <strong className={nextTier.color}>{nextTier.title}</strong></span>
                        <span className="text-xs font-bold text-neutral-400">{progress}%</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${tier.bgColor.replace('bg-', 'bg-').replace('/50', '-500').replace('-50', '-400')}`}
                            style={{ width: `${Math.min(progress, 100)}%`, background: `var(--color-brand-red, #E60012)` }}
                        />
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-2">
                        {nextTier.minDays - daysSinceJoin} days until <strong>{nextTier.title}</strong>
                    </p>
                </div>
            )}

            {!nextTier && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                    <Crown className="w-4 h-4 text-brand-red" />
                    <p className="text-xs font-bold text-brand-red">Maximum rank achieved. You are a DEX Luminary.</p>
                </div>
            )}

            {/* Tier progression timeline */}
            <div className="mt-5 pt-4 border-t border-neutral-100">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-3">Journey Tiers</p>
                <div className="flex items-center gap-1">
                    {TIERS.map((t, i) => {
                        const isReached = daysSinceJoin >= t.minDays;
                        const isCurrent = t.title === tier.title;
                        return (
                            <React.Fragment key={t.title}>
                                <div className={`flex flex-col items-center gap-1 flex-1`}>
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${isCurrent
                                            ? `${t.bgColor} ${t.borderColor} border-2 scale-110 shadow-sm`
                                            : isReached
                                                ? `${t.bgColor} ${t.borderColor} border`
                                                : 'bg-neutral-100 border border-neutral-200 opacity-40'
                                        }`}>
                                        <span className={isReached ? t.color : 'text-neutral-400'}>{t.icon}</span>
                                    </div>
                                    <span className={`text-[8px] font-bold uppercase tracking-wider ${isCurrent ? t.color : isReached ? 'text-neutral-500' : 'text-neutral-300'
                                        }`}>{t.title}</span>
                                </div>
                                {i < TIERS.length - 1 && (
                                    <div className={`h-px flex-1 mt-[-12px] ${isReached ? 'bg-neutral-300' : 'bg-neutral-100'}`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PlayerIdentityBadge;
