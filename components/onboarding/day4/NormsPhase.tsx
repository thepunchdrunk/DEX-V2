import React from 'react';
import {
    ChevronRight,
} from 'lucide-react';
import { CollaborationNorm } from '../../../types';

interface NormsPhaseProps {
    norms: CollaborationNorm[];
    onComplete: () => void;
}

const NormsPhase: React.FC<NormsPhaseProps> = ({
    norms,
    onComplete,
}) => {
    return (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Cultural Protocols & Collaboration Norms</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Implicit expectations drive institutional harmony. Aligning with established collaboration norms ensures frictionless integration into high-velocity squad dynamics.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {norms.map((norm) => (
                    <div
                        key={norm.id}
                        className="bg-white rounded-[32px] border border-neutral-100 p-8 transition-all hover:border-brand-red/10 hover:shadow-xl hover:shadow-neutral-100/20 group"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-xl shadow-sm text-neutral-600 group-hover:scale-110 transition-transform">
                                {norm.category === 'COMMUNICATION' && '💬'}
                                {norm.category === 'MEETINGS' && '📅'}
                                {norm.category === 'FEEDBACK' && '📝'}
                                {norm.category === 'WORK_HOURS' && '🕐'}
                                {norm.category === 'COLLABORATION' && '🤝'}
                            </div>
                            <h4 className="text-lg font-black text-neutral-900 tracking-tight uppercase tracking-widest">{norm.title}</h4>
                        </div>
                        <p className="text-xs text-neutral-500 font-medium leading-relaxed mb-8">{norm.description}</p>

                        <div className="space-y-3 bg-neutral-50/50 rounded-2xl p-6 border border-neutral-100/50">
                            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2">Institutional Examples</p>
                            {norm.examples.map((ex, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="mt-1.5 w-1 h-1 rounded-full bg-brand-red shrink-0" />
                                    <span className="text-[11px] text-neutral-600 font-bold leading-relaxed">{ex}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={onComplete}
                className="w-full py-6 bg-brand-red hover:bg-red-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-4 group shadow-xl shadow-red-500/20"
            >
                Transition to Peer Cohort <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default NormsPhase;
