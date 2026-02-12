import React from 'react';
import {
    MessageSquare,
    Send,
    Check,
    Calendar,
    ThumbsUp,
    ThumbsDown,
    ChevronRight,
    Clock,
} from 'lucide-react';
import { CommunicationNorm } from '../../../types';

interface CommunicationPhaseProps {
    communicationNorms: CommunicationNorm[];
    onComplete: () => void;
}

const CommunicationPhase: React.FC<CommunicationPhaseProps> = ({
    communicationNorms,
    onComplete,
}) => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Communication Protocols</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Institutional velocity is powered by high-fidelity communication. Master our operational channels and response expectations.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list" aria-label="Communication Architecture">
                {communicationNorms.map(norm => (
                    <div key={norm.id} role="listitem" className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 group hover:border-brand-red/20 transition-all">
                        <div className="flex items-center gap-4 mb-5">
                            <div className={`
                                w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110
                                ${norm.channel === 'CHAT' ? 'bg-purple-50 text-purple-600' : ''}
                                ${norm.channel === 'EMAIL' ? 'bg-blue-50 text-blue-600' : ''}
                                ${norm.channel === 'TICKET' ? 'bg-emerald-50 text-emerald-600' : ''}
                                ${norm.channel === 'MEETING' ? 'bg-amber-50 text-amber-600' : ''}
                            `} aria-hidden="true">
                                {norm.channel === 'CHAT' && <MessageSquare className="w-6 h-6" />}
                                {norm.channel === 'EMAIL' && <Send className="w-6 h-6" />}
                                {norm.channel === 'TICKET' && <Check className="w-6 h-6" />}
                                {norm.channel === 'MEETING' && <Calendar className="w-6 h-6" />}
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900">{norm.channel} Architecture</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <Clock className="w-3 h-3 text-neutral-400" aria-hidden="true" />
                                    <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest" aria-label={`Expected response time: ${norm.expectedResponseTime}`}>{norm.expectedResponseTime} Response</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-xs text-neutral-500 mb-6 leading-relaxed font-medium">
                            {norm.useCase}
                        </p>

                        <div className="space-y-3">
                            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/50" role="status" aria-label="Recommended Signal">
                                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                    <ThumbsUp className="w-3 h-3" aria-hidden="true" /> Recommended Signal
                                </p>
                                <p className="text-[11px] text-neutral-600 font-medium leading-relaxed italic">"{norm.examples.good}"</p>
                            </div>
                            <div className="p-4 bg-red-50/50 rounded-xl border border-red-100/50" role="status" aria-label="Antipattern">
                                <p className="text-[9px] font-black text-brand-red uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                    <ThumbsDown className="w-3 h-3" aria-hidden="true" /> Antipattern
                                </p>
                                <p className="text-[11px] text-neutral-600 font-medium leading-relaxed italic">"{norm.examples.bad}"</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={onComplete}
                className="btn-primary w-full py-6 mt-6 flex items-center justify-center gap-4 group"
            >
                <span className="text-xs uppercase font-black tracking-widest">Acknowledge Communication Protocols</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default CommunicationPhase;
