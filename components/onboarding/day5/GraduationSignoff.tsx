import React, { useState } from 'react';
import {
    Check,
    ChevronRight,
    AlertCircle,
    Clock,
} from 'lucide-react';
import { ManagerSignoff } from '../../../types';

interface GraduationSignoffProps {
    managerSignoff: ManagerSignoff;
    setManagerSignoff: React.Dispatch<React.SetStateAction<ManagerSignoff>>;
    onNext: () => void;
}

const GraduationSignoff: React.FC<GraduationSignoffProps> = ({
    managerSignoff,
    setManagerSignoff,
    onNext,
}) => {
    const [signoffRequested, setSignoffRequested] = useState(false);

    const requestSignoff = () => {
        setSignoffRequested(true);
        // Simulate manager approval after 2 seconds
        setTimeout(() => {
            setManagerSignoff(prev => ({
                ...prev,
                signedOff: true,
                signedOffAt: new Date().toISOString(),
            }));
        }, 2000);
    };

    return (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Calibration & <span className="text-brand-red">Sign-off</span></h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Formalize your operational transition. Your designated advisor has established primary objectives to ensure your first 30 days are calibrated for high-impact delivery.
                </p>
            </div>

            {/* Advisor Message (Refined) */}
            {managerSignoff.welcomeMessage && (
                <div className="relative bg-neutral-50 rounded-[32px] border border-neutral-100 p-8 overflow-hidden group" role="note" aria-label={`Message from ${managerSignoff.managerName}`}>
                    <div className="absolute top-4 right-8 text-neutral-100 font-black text-6xl select-none group-hover:text-neutral-200 transition-colors" aria-hidden="true">"</div>
                    <div className="flex items-start gap-6 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center text-white font-black text-lg shadow-xl shrink-0" aria-hidden="true">
                            {managerSignoff.managerName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-brand-red uppercase tracking-[0.2em] mb-2" aria-hidden="true">Advisor Recommendation</p>
                            <p className="text-sm text-neutral-700 font-bold leading-relaxed pr-12">{managerSignoff.welcomeMessage}</p>
                            <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mt-4">— {managerSignoff.managerName}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Dual Goal Horizon Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Weekly Horizon */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-2 h-2 rounded-full bg-brand-red" aria-hidden="true" />
                        <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Weekly Horizon</h4>
                    </div>
                    <div role="list" aria-label="Weekly Goals">
                        {managerSignoff.firstWeekGoals.map((goal) => (
                            <div key={goal.id} role="listitem" className="bg-white rounded-[24px] border border-neutral-100 p-5 flex items-center gap-5 hover:border-brand-red/20 transition-all hover:shadow-lg group mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform" aria-hidden="true">
                                    {goal.category === 'LEARNING' && '📚'}
                                    {goal.category === 'DELIVERY' && '✅'}
                                    {goal.category === 'RELATIONSHIP' && '🤝'}
                                    {goal.category === 'PROCESS' && '⚙️'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-black text-neutral-900 tracking-tight leading-none mb-1 uppercase tracking-widest">{goal.title}</p>
                                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.1em] truncate">{goal.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Monthly Horizon */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-2 h-2 rounded-full bg-neutral-900" aria-hidden="true" />
                        <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Monthly Horizon</h4>
                    </div>
                    <div role="list" aria-label="Monthly Goals">
                        {managerSignoff.firstMonthGoals.map((goal) => (
                            <div key={goal.id} role="listitem" className="bg-white rounded-[24px] border border-neutral-100 p-5 flex items-center gap-5 hover:border-brand-red/20 transition-all hover:shadow-lg group mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform" aria-hidden="true">
                                    {goal.category === 'LEARNING' && '📚'}
                                    {goal.category === 'DELIVERY' && '✅'}
                                    {goal.category === 'RELATIONSHIP' && '🤝'}
                                    {goal.category === 'PROCESS' && '⚙️'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-black text-neutral-900 tracking-tight leading-none mb-1 uppercase tracking-widest">{goal.title}</p>
                                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.1em] truncate">{goal.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sign-off Engagement Shell */}
            <div className="mt-12">
                {!managerSignoff.signedOff ? (
                    <div className={`
                        rounded-[32px] p-8 border transition-all duration-500
                        ${signoffRequested ? 'bg-amber-50 border-amber-100 shadow-xl shadow-amber-100/30' : 'bg-neutral-50 border-neutral-100'}
                    `} role="status" aria-busy={signoffRequested} aria-live="polite">
                        <div className="flex items-center justify-between gap-8 flex-wrap md:flex-nowrap">
                            <div className="flex items-center gap-6">
                                {signoffRequested ? (
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg relative" aria-hidden="true">
                                        <Clock className="w-8 h-8 text-amber-500 animate-pulse" />
                                        <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg" aria-hidden="true">
                                        <AlertCircle className="w-8 h-8 text-neutral-300" />
                                    </div>
                                )}
                                <div>
                                    <h4 className={`text-lg font-black tracking-tight leading-none mb-1 uppercase ${signoffRequested ? 'text-amber-900' : 'text-neutral-900'}`}>
                                        {signoffRequested ? 'Calibration in Progress' : 'Final Verification Pending'}
                                    </h4>
                                    <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                                        {signoffRequested
                                            ? `Transmitting final assessment to ${managerSignoff.managerName}...`
                                            : 'Confirming operational readiness for transition to role-specific cockpit.'}
                                    </p>
                                </div>
                            </div>
                            {!signoffRequested && (
                                <button
                                    onClick={requestSignoff}
                                    className="px-8 py-4 bg-neutral-900 hover:bg-brand-red text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-neutral-100/50 hover:-translate-y-1 active:translate-y-0"
                                >
                                    Authorize Calibration
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-emerald-50 rounded-[40px] border border-emerald-100 p-10 flex items-center gap-8 shadow-2xl shadow-emerald-100/30 animate-scale-in" role="status" aria-label="Calibration synced">
                        <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20" aria-hidden="true">
                            <Check className="w-10 h-10" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2" aria-hidden="true">Authenticated Onboarding</p>
                            <h4 className="text-2xl font-black text-neutral-900 tracking-tight leading-none mb-2">Calibration Successfully Synced</h4>
                            <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                                {managerSignoff.managerName} finalized your operational status on {new Date(managerSignoff.signedOffAt!).toLocaleDateString()} at {new Date(managerSignoff.signedOffAt!).toLocaleTimeString()}.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={onNext}
                disabled={!managerSignoff.signedOff}
                className={`
                    w-full py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 group shadow-xl
                    ${managerSignoff.signedOff
                        ? 'bg-neutral-900 text-white hover:bg-neutral-800 hover:-translate-y-1 active:translate-y-0'
                        : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                `}
            >
                Transition to Feedback <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default GraduationSignoff;
