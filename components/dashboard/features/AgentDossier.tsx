import React from 'react';
import {
    Shield,
    Zap,
    Crown,
    Star,
    Rocket,
    Settings,
    RefreshCw,
    Award,
    TrendingUp,
    Target,
    Share2,
    Users
} from 'lucide-react';
import { UserProfile } from '../../../types';
import { MOCK_BADGES, MOCK_SKILL_TREE } from '../../../constants';
import { getPlayerTier, getNextTier, PlayerTier } from './PlayerIdentity';
import { StreakCounter } from './';
import SkillRadar from './charts/SkillRadar';

interface AgentDossierProps {
    user: UserProfile;
}

const AgentDossier: React.FC<AgentDossierProps> = ({ user }) => {
    // Calculate Derived State
    const daysSinceJoin = 45; // Mock data
    const currentTier = getPlayerTier(daysSinceJoin);
    const nextTier = getNextTier(daysSinceJoin);
    const progress = nextTier
        ? Math.round(((daysSinceJoin - currentTier.minDays) / (nextTier.minDays - currentTier.minDays)) * 100)
        : 100;

    const unlockedBadges = MOCK_BADGES.filter(b => b.isUnlocked);
    const totalBadges = MOCK_BADGES.length;

    // Mock "Velocity" Calculation
    const velocityScore = 87; // Out of 100

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
            {/* Header: Identity Card (Glassmorphism Premium) */}
            <div className="relative bg-white rounded-[40px] border border-neutral-100 p-8 md:p-12 overflow-hidden shadow-2xl shadow-brand-red/5">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-red/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    {/* Avatar & Rank */}
                    <div className="shrink-0 flex flex-col items-center">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-[32px] bg-neutral-900 text-white flex items-center justify-center text-5xl font-black shadow-2xl skew-y-3 skew-x-3 transition-transform hover:skew-y-0 hover:skew-x-0 border-4 border-white">
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className={`absolute -bottom-4 -right-4 w-12 h-12 rounded-xl ${currentTier.bgColor} ${currentTier.borderColor} border-2 flex items-center justify-center shadow-lg transform rotate-12`}>
                                <span className={currentTier.color}>{currentTier.icon}</span>
                            </div>
                        </div>
                        <div className={`mt-6 px-4 py-1.5 rounded-full border ${currentTier.bgColor} ${currentTier.borderColor} text-xs font-black uppercase tracking-widest ${currentTier.color}`}>
                            {currentTier.title} Agent
                        </div>
                    </div>

                    {/* Core Stats & Info */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                            <h2 className="text-4xl font-black text-neutral-900 tracking-tight">{user.name}</h2>
                            <span className="hidden md:block w-px h-8 bg-neutral-200" />
                            <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{user.jobTitle} • {user.department}</p>
                        </div>

                        <p className="text-neutral-500 max-w-xl leading-relaxed mb-8">
                            Passionate about building scalable systems and empowering team growth. Focused on backend architecture and distributed systems reliability.
                        </p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <div className="flex items-center gap-3 px-5 py-3 bg-neutral-50 rounded-2xl border border-neutral-100">
                                <TrendingUp className="w-5 h-5 text-emerald-500" />
                                <div>
                                    <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Impact Velocity</div>
                                    <div className="text-lg font-black text-neutral-900">{velocityScore}/100</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-5 py-3 bg-neutral-50 rounded-2xl border border-neutral-100">
                                <Award className="w-5 h-5 text-amber-500" />
                                <div>
                                    <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Achievements</div>
                                    <div className="text-lg font-black text-neutral-900">{unlockedBadges.length} Unlocked</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access Actions */}
                    <div className="flex flex-col gap-3 shrink-0">
                        <button className="p-4 rounded-2xl bg-white border border-neutral-100 hover:border-brand-red/30 hover:shadow-lg transition-all group relative overflow-hidden">
                            <Share2 className="w-5 h-5 text-neutral-400 group-hover:text-brand-red transition-colors" />
                        </button>
                        <button className="p-4 rounded-2xl bg-white border border-neutral-100 hover:border-brand-red/30 hover:shadow-lg transition-all group">
                            <Settings className="w-5 h-5 text-neutral-400 group-hover:text-brand-red transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Rank Progress Bar (Bottom Edge) */}
                {nextTier && (
                    <div className="mt-10 pt-6 border-t border-neutral-100">
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Current Protocol</p>
                                <p className="text-xs font-bold text-neutral-900">Progress to {nextTier.title}</p>
                            </div>
                            <p className="text-2xl font-black text-brand-red">{progress}%</p>
                        </div>
                        <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-brand-red shadow-[0_0_15px_rgba(230,0,0,0.4)] transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p className="text-[10px] text-neutral-400 mt-2 text-right font-medium">
                            {nextTier.minDays - daysSinceJoin} days until promotion
                        </p>
                    </div>
                )}
            </div>

            {/* Dossier Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Column 1: Identity & Stats */}
                <div className="space-y-6">
                    <section className="bg-white rounded-[32px] p-8 border border-neutral-100 shadow-sm">
                        <h3 className="text-sm font-black text-neutral-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Target className="w-4 h-4 text-brand-red" />
                            Core Identity
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Institutional ID</p>
                                <p className="text-sm font-mono font-bold text-neutral-900 bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-100 inline-block">
                                    {user.employeeId}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Role Category</p>
                                <span className="badge badge-neutral">{user.roleCategory || 'DESK'}</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Tenure</p>
                                <p className="text-sm font-bold text-neutral-900">{daysSinceJoin} Days Active</p>
                            </div>
                        </div>
                    </section>

                    <StreakCounter />
                </div>

                {/* Column 2: Mastery & Focus */}
                <div className="space-y-6">
                    <section className="bg-white rounded-[32px] p-8 border border-neutral-100 shadow-sm h-full relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-bl-[100px]" />
                        <h3 className="text-sm font-black text-neutral-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-brand-red" />
                            Skill Signature
                        </h3>

                        {/* Radar Chart (Phase 2) */}
                        <div className="aspect-square rounded-2xl bg-white border border-neutral-100 p-2 relative overflow-hidden mb-6">
                            <SkillRadar branches={MOCK_SKILL_TREE} />
                        </div>

                        <div className="space-y-3">
                            {MOCK_SKILL_TREE.slice(0, 3).map((branch) => {
                                // Helper to count mastered skills in this branch
                                const getSkillCount = (b: any): number => {
                                    let count = b.mastery === 3 ? 1 : 0;
                                    if (b.children) {
                                        b.children.forEach((child: any) => {
                                            count += getSkillCount(child);
                                        });
                                    }
                                    return count;
                                };
                                const masteredCount = getSkillCount(branch);

                                return (
                                    <div key={branch.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-lg">
                                                <Zap className="w-4 h-4 text-brand-red" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-neutral-900">{branch.name}</p>
                                                <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">{masteredCount} Mastered</p>
                                            </div>
                                        </div>
                                        <div className="w-12 h-1 bg-neutral-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-brand-red w-2/3" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* Column 3: Legacy & System */}
                <div className="space-y-6">
                    <section className="bg-white rounded-[32px] p-8 border border-neutral-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black text-neutral-900 uppercase tracking-widest flex items-center gap-2">
                                <Award className="w-4 h-4 text-brand-red" />
                                Recent Honours
                            </h3>
                            <button className="text-[10px] font-bold text-brand-red hover:underline uppercase tracking-wider">View All</button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {unlockedBadges.slice(0, 8).map(badge => (
                                <div key={badge.id} className="aspect-square rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-xl shadow-sm hover:scale-105 transition-transform cursor-help" title={badge.name}>
                                    {badge.icon}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-[32px] p-8 border border-neutral-100 shadow-sm">
                        <h3 className="text-sm font-black text-neutral-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Users className="w-4 h-4 text-brand-red" />
                            Social Capital
                        </h3>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">Network Influence</p>
                                <p className="text-2xl font-black mb-4">Top 15%</p>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px]">
                                            👤
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-[10px] font-bold">+12</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Danger Zone (Subtle) */}
                    <div className="pt-4 border-t border-neutral-200/50">
                        <button
                            onClick={() => {
                                if (confirm('Reset entire institution state? This will clear all locally stored progress.')) {
                                    localStorage.clear();
                                    window.location.reload();
                                }
                            }}
                            className="w-full py-4 text-xs font-bold text-neutral-400 hover:text-red-500 uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-3 h-3" />
                            System Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentDossier;
