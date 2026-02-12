import React from 'react';
import {
    Shield,
    Check,
    AlertCircle,
    ChevronRight,
} from 'lucide-react';
import { EthicsModule } from '../../../types';

interface EthicsPhaseProps {
    ethicsModules: EthicsModule[];
    onComplete: () => void;
}

const EthicsPhase: React.FC<EthicsPhaseProps> = ({
    ethicsModules,
    onComplete,
}) => {
    return (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Integrity Matrix</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    We are governed by radical transparency and mutual respect. Familiarize yourself with our ethics and inclusion framework.
                </p>
            </div>

            {ethicsModules.map((module) => (
                <div key={module.id} className="space-y-6" role="region" aria-label={`${module.title} category`}>
                    <div className="flex items-center gap-4">
                        <div className="h-0.5 flex-1 bg-neutral-50" aria-hidden="true" />
                        <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] px-4">{module.title}</h4>
                        <div className="h-0.5 flex-1 bg-neutral-50" aria-hidden="true" />
                    </div>

                    <div className="grid grid-cols-1 gap-4" role="list">
                        {module.scenarios.map((scenario) => (
                            <div key={scenario.id} role="listitem" className="bg-white rounded-[24px] border border-neutral-100 shadow-sm p-8 group hover:border-brand-red/20 transition-all">
                                <div className="flex items-start gap-6 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/5 transition-colors" aria-hidden="true">
                                        <Shield className="w-6 h-6 text-neutral-400 group-hover:text-brand-red transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1.5 leading-none">Contextual Situation</p>
                                        <p className="text-sm font-bold text-neutral-900 leading-relaxed">{scenario.situation}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100/50" role="status" aria-label="Protocol Execution">
                                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <Check className="w-3 h-3" aria-hidden="true" /> Protocol Execution
                                        </p>
                                        <p className="text-xs text-neutral-600 font-medium leading-relaxed">{scenario.correctAction}</p>
                                    </div>
                                    <div className="bg-neutral-50/50 rounded-2xl p-6 border border-neutral-100/50" role="status" aria-label="Reporting Path">
                                        <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <AlertCircle className="w-3 h-3" aria-hidden="true" /> Reporting Path
                                        </p>
                                        <p className="text-xs text-neutral-600 font-medium leading-relaxed italic">{scenario.reportingPath}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <button
                onClick={onComplete}
                className="btn-primary w-full py-6 mt-6 flex items-center justify-center gap-4 group"
            >
                <span className="text-xs uppercase font-black tracking-widest">Acknowledge Institutional Conduct</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default EthicsPhase;
