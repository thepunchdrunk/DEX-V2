import React from 'react';
import {
    ChevronRight,
    Trophy,
    Sparkles,
    Rocket,
    PartyPopper,
} from 'lucide-react';
import { UserProfile } from '../../../types';

interface GraduationCeremonyProps {
    user: UserProfile;
    onNext: () => void;
}

const GraduationCeremony: React.FC<GraduationCeremonyProps> = ({
    user,
    onNext,
}) => {
    return (
        <div className="text-center py-12 space-y-12 animate-fade-in">
            <div className="relative inline-block" role="img" aria-label="Graduation Trophy">
                <div className="w-40 h-40 rounded-full bg-red-50 flex items-center justify-center mx-auto border-2 border-red-100 shadow-2xl relative z-10">
                    <Trophy className="w-20 h-20 text-brand-red animate-bounce-subtle" aria-hidden="true" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-brand-red flex items-center justify-center shadow-xl shadow-red-500/30 z-20 rotate-12" aria-hidden="true">
                    <PartyPopper className="w-8 h-8 text-white" />
                </div>
            </div>

            <div>
                <h2 className="text-4xl font-black text-neutral-900 mb-2 tracking-tight uppercase">Onboarding <span className="text-brand-red">Complete</span></h2>
                <p className="text-sm font-bold text-neutral-400 uppercase tracking-[0.3em]">Institutional Calibration Verified: {user.name}</p>
            </div>

            {/* Badges Earned (Premium Nodes) */}
            <div className="flex items-center justify-center gap-6 flex-wrap" role="list" aria-label="Badges Earned">
                {[
                    { icon: '🚀', label: 'Velocity' },
                    { icon: '🎯', label: 'Precision' },
                    { icon: '🤝', label: 'Synergy' },
                    { icon: '📚', label: 'Fluency' },
                ].map((badge, i) => (
                    <div
                        key={i}
                        role="listitem"
                        className="flex flex-col items-center p-6 bg-white border border-neutral-100 rounded-[28px] shadow-lg shadow-neutral-100/50 hover:shadow-xl hover:-translate-y-2 transition-all w-28 group"
                    >
                        <span className="text-3xl mb-3 group-hover:scale-110 transition-transform" aria-hidden="true">{badge.icon}</span>
                        <span className="text-[10px] font-black text-neutral-900 uppercase tracking-widest">{badge.label}</span>
                    </div>
                ))}
            </div>

            {/* Role Dashboard Teaser (Operational Impact - Light Mode) */}
            <div className="bg-white rounded-[48px] border border-neutral-100 p-12 max-w-2xl mx-auto shadow-xl shadow-brand-red/5 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="shrink-0 bg-neutral-50 p-6 rounded-[32px] border border-neutral-100">
                        <Rocket className="w-12 h-12 text-brand-red" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-neutral-900 mb-2 uppercase tracking-wide">Role-Specific <span className="text-brand-red">Cockpit</span> Initialized</h3>
                        <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest leading-relaxed mb-6">
                            Institutional immersion transitions to operational delivery. Your personalized ecosystem is now active, featuring context-aware intelligence, priority mapping, and strategic growth tracking.
                        </p>
                        <div className="flex items-center gap-3 flex-wrap" role="list" aria-label="Role cockpit features">
                            {['Intelligent Nudges', 'Priority Graph', 'Velocity Analytics'].map((feat, i) => (
                                <span key={i} role="listitem" className="px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-full text-[9px] font-black text-neutral-500 uppercase tracking-widest">
                                    {feat}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={onNext}
                className="px-12 py-6 bg-brand-red hover:bg-red-600 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl transition-all flex items-center justify-center gap-6 mx-auto shadow-2xl shadow-red-500/20 hover:-translate-y-1 active:translate-y-0 group"
            >
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Activate Daily Protocol
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default GraduationCeremony;
