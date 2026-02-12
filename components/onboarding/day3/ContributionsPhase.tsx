import React from 'react';
import {
    Check,
    AlertCircle,
} from 'lucide-react';
import { FirstContribution } from '../../../types';

interface ContributionsPhaseProps {
    contributions: FirstContribution[];
    setContributions: React.Dispatch<React.SetStateAction<FirstContribution[]>>;
}

const ContributionsPhase: React.FC<ContributionsPhaseProps> = ({
    contributions,
    setContributions,
}) => {
    const handleStartContribution = (id: string) => {
        setContributions(prev => prev.map(c =>
            c.id === id ? { ...c, status: 'IN_PROGRESS' } : c
        ));
    };

    const handleCompleteContribution = (id: string) => {
        setContributions(prev => prev.map(c =>
            c.id === id ? { ...c, status: 'PENDING_CONFIRM' } : c
        ));
    };

    return (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Contribution Matrix</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Small wins drive institutional momentum. Activate nodes in your contribution path to build early operational credibility.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Contribution Path">
                {contributions.map((contribution) => (
                    <div
                        key={contribution.id}
                        role="listitem"
                        className={`
                            relative bg-white rounded-[32px] border p-8 transition-all group overflow-hidden
                            ${contribution.status === 'COMPLETED' ? 'border-emerald-100' : 'border-neutral-100 hover:border-brand-red/20'}
                        `}
                    >
                        <div className="flex items-start gap-6">
                            <div className={`
                                w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-neutral-100
                                ${contribution.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : ''}
                                ${contribution.status === 'PENDING_CONFIRM' ? 'bg-amber-50 text-amber-600' : ''}
                                ${contribution.status === 'IN_PROGRESS' ? 'bg-red-50 text-brand-red' : ''}
                                ${contribution.status === 'AVAILABLE' ? 'bg-neutral-50 text-neutral-400' : ''}
                            `} aria-hidden="true">
                                {contribution.type === 'STANDUP' && '🎤'}
                                {contribution.type === 'DOCUMENT_UPDATE' && '📝'}
                                {contribution.type === 'SHADOW' && '👀'}
                                {contribution.type === 'TASK' && '✅'}
                                {contribution.type === 'CODE_REVIEW' && '🔍'}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-black text-neutral-900 tracking-tight leading-none mb-2">{contribution.title}</h4>
                                <p className="text-xs text-neutral-500 font-medium leading-relaxed mb-6">{contribution.description}</p>

                                {/* Operational Action HUD */}
                                <div className="flex items-center gap-3">
                                    {contribution.status === 'AVAILABLE' && (
                                        <button
                                            onClick={() => handleStartContribution(contribution.id)}
                                            aria-label={`Activate Node: ${contribution.title}`}
                                            className="px-5 py-2.5 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-500/20"
                                        >
                                            Activate Node
                                        </button>
                                    )}
                                    {contribution.status === 'IN_PROGRESS' && (
                                        <button
                                            onClick={() => handleCompleteContribution(contribution.id)}
                                            aria-label={`Commit Change for ${contribution.title}`}
                                            className="px-5 py-2.5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-600/10"
                                        >
                                            Commit Change
                                        </button>
                                    )}
                                    {contribution.status === 'PENDING_CONFIRM' && (
                                        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 text-[9px] font-black uppercase tracking-widest" role="status">
                                            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" /> Awaiting Validation
                                        </div>
                                    )}
                                    {contribution.status === 'COMPLETED' && (
                                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 text-[9px] font-black uppercase tracking-widest" role="status">
                                            <Check className="w-3.5 h-3.5" aria-hidden="true" /> Node Verified
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Design Accent */}
                        <div className={`absolute top-0 right-0 w-1 h-full ${contribution.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-transparent'}`} aria-hidden="true" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContributionsPhase;
