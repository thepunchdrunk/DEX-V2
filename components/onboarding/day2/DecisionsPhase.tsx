import React from 'react';
import {
    Sparkles,
    Users,
    Shield,
    ChevronRight,
} from 'lucide-react';
import { DecisionBoundary } from '../../../types';

interface DecisionsPhaseProps {
    decisionBoundaries: DecisionBoundary[];
    onComplete: () => void;
}

const DecisionsPhase: React.FC<DecisionsPhaseProps> = ({
    decisionBoundaries,
    onComplete,
}) => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Autonomy & Escalation Boundaries</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Understand your decision-making perimeter and when to synchronize with institutional leadership.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Decision Boundaries">
                {decisionBoundaries.map((boundary) => (
                    <div key={boundary.id} role="listitem" className={`
                        relative bg-white rounded-[32px] border p-8 transition-all group overflow-hidden
                        ${boundary.scope === 'INDEPENDENT' ? 'border-emerald-100 hover:border-emerald-300' : ''}
                        ${boundary.scope === 'MANAGER_APPROVAL' ? 'border-blue-100 hover:border-blue-300' : ''}
                        ${boundary.scope === 'CROSS_TEAM' ? 'border-amber-100 hover:border-amber-300' : ''}
                        ${boundary.scope === 'EXECUTIVE' ? 'border-red-100 hover:border-red-300' : ''}
                    `}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`
                                w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm
                                ${boundary.scope === 'INDEPENDENT' ? 'bg-emerald-50 text-emerald-600' : ''}
                                ${boundary.scope === 'MANAGER_APPROVAL' ? 'bg-blue-50 text-blue-600' : ''}
                                ${boundary.scope === 'CROSS_TEAM' ? 'bg-amber-50 text-amber-600' : ''}
                                ${boundary.scope === 'EXECUTIVE' ? 'bg-brand-red/10 text-brand-red' : ''}
                            `} aria-hidden="true">
                                {boundary.scope === 'INDEPENDENT' && <Sparkles className="w-6 h-6" />}
                                {boundary.scope === 'MANAGER_APPROVAL' && <Users className="w-6 h-6" />}
                                {boundary.scope === 'CROSS_TEAM' && <Users className="w-6 h-6" />}
                                {boundary.scope === 'EXECUTIVE' && <Shield className="w-6 h-6" />}
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-neutral-900 uppercase tracking-tight">{boundary.title}</h4>
                                <p className={`text-[10px] font-black uppercase tracking-[0.1em] mt-0.5 ${boundary.scope === 'EXECUTIVE' ? 'text-brand-red' : 'text-neutral-400'
                                    }`}>
                                    {boundary.scope.replace(/_/g, ' ')} PERIMETER
                                </p>
                            </div>
                        </div>

                        <ul className="space-y-3 mb-8" aria-label={`Examples of ${boundary.title}`}>
                            {boundary.examples.map((ex, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 mt-1.5" aria-hidden="true" />
                                    <span className="text-xs text-neutral-600 font-medium leading-relaxed">{ex}</span>
                                </li>
                            ))}
                        </ul>

                        {boundary.escalationPath && (
                            <div className="pt-6 border-t border-neutral-50 flex items-center gap-3">
                                <div className="p-2 bg-neutral-50 rounded-lg" aria-hidden="true">
                                    <ChevronRight className="w-3 h-3 text-neutral-400 rotate-90" />
                                </div>
                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-relaxed">
                                    <span className="text-neutral-900">Escalation Path:</span> {boundary.escalationPath}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={onComplete}
                className="btn-primary w-full py-6 mt-6 flex items-center justify-center gap-4 group"
            >
                <span className="text-xs uppercase font-black tracking-widest">Internalize Decision Matrix</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default DecisionsPhase;
