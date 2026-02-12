import React from 'react';
import {
    Star,
    ChevronRight,
} from 'lucide-react';
import { MeetingCultureRule } from '../../../types';

interface MeetingsPhaseProps {
    meetingRules: MeetingCultureRule[];
    onComplete: () => void;
}

const MeetingsPhase: React.FC<MeetingsPhaseProps> = ({
    meetingRules,
    onComplete,
}) => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Meeting Governance</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    We maintain meeting hygiene to protect our collective focus. Follow these fundamental rules of engagement.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4" role="list" aria-label="Meeting Governance Rules">
                {meetingRules.map((rule, index) => (
                    <div key={rule.id} role="listitem" className="bg-white rounded-[24px] border border-neutral-100 shadow-sm p-6 flex items-center gap-6 group hover:border-brand-red/20 transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-white text-brand-red border border-red-100 flex items-center justify-center text-lg font-black italic shadow-lg shadow-red-500/10 group-hover:scale-110 transition-transform" aria-hidden="true">
                            {(index + 1).toString().padStart(2, '0')}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-neutral-900 flex items-center gap-3">
                                {rule.title}
                                <span className="h-1 w-1 bg-brand-red rounded-full" aria-hidden="true" />
                            </h4>
                            <p className="text-xs text-neutral-500 font-medium mt-1 leading-relaxed">{rule.description}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-neutral-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                            <Star className="w-4 h-4 text-brand-red" />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={onComplete}
                className="btn-primary w-full py-6 mt-6 flex items-center justify-center gap-4 group"
            >
                <span className="text-xs uppercase font-black tracking-widest">Sync Meeting Hygiene Protocols</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default MeetingsPhase;
