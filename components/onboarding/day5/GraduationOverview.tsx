import React from 'react';
import {
    Check,
    ChevronRight,
    Trophy,
    Rocket,
} from 'lucide-react';
import { CompletionStatus } from '../../../types';

interface GraduationOverviewProps {
    completionStatuses: CompletionStatus[];
    managerSignoff: { signedOff: boolean };
    feedbackSubmitted: boolean;
    onNext: () => void;
}

const GraduationOverview: React.FC<GraduationOverviewProps> = ({
    completionStatuses,
    managerSignoff,
    feedbackSubmitted,
    onNext,
}) => {
    return (
        <div className="space-y-12 animate-fade-in">
            <div className="text-center mb-12">
                <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6 border border-red-100 shadow-inner">
                    <Trophy className="w-12 h-12 text-brand-red" />
                </div>
                <h2 className="text-3xl font-black text-neutral-900 mb-2 tracking-tight">Onboarding <span className="text-brand-red">Review</span></h2>
                <p className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">A quick check of your progress before you start.</p>
            </div>

            {/* Completion Dashboard (Premium) */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4" role="list" aria-label="Onboarding Completion Status">
                {completionStatuses.map((status) => {
                    const isFullyComplete = status.itemsCompleted === status.itemsTotal;
                    return (
                        <div
                            key={status.day}
                            role="listitem"
                            className={`
                                relative bg-white rounded-[32px] border p-6 text-center transition-all group
                                ${isFullyComplete ? 'border-emerald-100 shadow-lg shadow-emerald-100/20' : 'border-neutral-100'}
                            `}
                        >
                            <div className={`
                                w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center border transition-transform duration-500 group-hover:scale-110
                                ${isFullyComplete ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30' : 'bg-neutral-50 border-neutral-100 text-neutral-400'}
                            `} aria-hidden="true">
                                {isFullyComplete ? (
                                    <Check className="w-6 h-6" />
                                ) : (
                                    <span className="text-sm font-black uppercase tracking-widest">{status.day}</span>
                                )}
                            </div>
                            <p className="text-[10px] font-black text-neutral-900 uppercase tracking-widest mb-1 leading-none">Day 0{status.day}</p>
                            <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest truncate">{status.dayTitle}</p>

                            <div className="mt-4 pt-4 border-t border-neutral-50">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${isFullyComplete ? 'text-emerald-600' : 'text-neutral-400'}`} aria-label={`${status.itemsCompleted} of ${status.itemsTotal} items completed`}>
                                    {status.itemsCompleted}/{status.itemsTotal}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Relational Onboarding Protocol - Final Stages (Light Mode) */}
            <div className="bg-white rounded-[40px] border border-neutral-100 p-10 relative overflow-hidden shadow-xl shadow-brand-red/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
                <h3 className="text-xl font-black text-neutral-900 mb-8 flex items-center gap-3">
                    <Rocket className="w-6 h-6 text-brand-red" aria-hidden="true" />
                    Final Calibration Protocol
                </h3>
                <div className="space-y-4" role="list" aria-label="Calibration Steps">
                    {[
                        { step: 1, label: 'Institutional Sign-off', complete: managerSignoff.signedOff, desc: 'Advisor validation of operational goals' },
                        { step: 2, label: 'Strategic Feedback', complete: feedbackSubmitted, desc: 'Contribute to institutional scaling' },
                        { step: 3, label: 'Graduation Ceremony', complete: false, desc: 'Transition to full operational status' }
                    ].map((item) => (
                        <div key={item.step} role="listitem" className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-[28px] group transition-all hover:bg-white/10">
                            <div className={`
                                w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all
                                ${item.complete ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-neutral-50 border-neutral-100 text-neutral-300'}
                            `} aria-hidden="true">
                                {item.complete ? <Check className="w-5 h-5" /> : <span className="text-xs font-black">{item.step}</span>}
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm font-black uppercase tracking-widest ${item.complete ? 'text-emerald-600' : 'text-neutral-900'}`}>
                                    {item.label}
                                </p>
                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">{item.desc}</p>
                            </div>
                            {!item.complete && item.step !== 3 && (
                                <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-brand-red transition-colors" aria-hidden="true" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={onNext}
                className="w-full py-6 bg-brand-red hover:bg-red-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-4 group shadow-xl shadow-red-500/20 hover:-translate-y-1 active:translate-y-0"
            >
                Initiate Graduation Sequence <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default GraduationOverview;
