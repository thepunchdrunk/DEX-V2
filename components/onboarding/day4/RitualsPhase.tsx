import React from 'react';
import {
    ChevronRight,
    Check,
    Calendar,
    Clock,
    Users,
} from 'lucide-react';
import { TeamRitual } from '../../../types';

interface RitualsPhaseProps {
    rituals: TeamRitual[];
    setRituals: React.Dispatch<React.SetStateAction<TeamRitual[]>>;
    onComplete: () => void;
}

const RitualsPhase: React.FC<RitualsPhaseProps> = ({
    rituals,
    setRituals,
    onComplete,
}) => {
    const ritualsAcknowledged = rituals.filter(r => r.acknowledged).length;

    const handleAcknowledgeRitual = (ritualId: string) => {
        setRituals(prev => prev.map(r =>
            r.id === ritualId ? { ...r, acknowledged: true } : r
        ));
    };

    return (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Sync Protocols</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Recurring rituals define the heartbeat of high-performance squads. Synchronize your internal clock with the team's operational rhythm to maintain collective alignment.
                </p>
            </div>

            <div className="space-y-4" role="list" aria-label="Team Operational Rituals">
                {rituals.map((ritual) => (
                    <div
                        key={ritual.id}
                        role="listitem"
                        className={`
                            group relative bg-white rounded-[32px] border p-8 transition-all overflow-hidden
                            ${ritual.acknowledged ? 'border-emerald-100 bg-emerald-50/10' : 'border-neutral-100 hover:border-brand-red/10 hover:shadow-xl hover:shadow-neutral-100/30'}
                        `}
                    >
                        <div className="flex items-start gap-8">
                            <div className={`
                                w-16 h-16 rounded-[20px] flex items-center justify-center text-3xl shadow-lg transition-transform duration-500 group-hover:scale-110
                                ${ritual.type === 'STANDUP' ? 'bg-blue-50 text-blue-600 shadow-blue-100' : ''}
                                ${ritual.type === 'RETROSPECTIVE' ? 'bg-purple-50 text-purple-600 shadow-purple-100' : ''}
                                ${ritual.type === 'PLANNING' ? 'bg-amber-50 text-amber-600 shadow-amber-100' : ''}
                                ${ritual.type === 'SOCIAL' ? 'bg-pink-50 text-pink-600 shadow-pink-100' : ''}
                                ${ritual.type === 'REVIEW' ? 'bg-emerald-50 text-emerald-600 shadow-emerald-100' : ''}
                            `} aria-hidden="true">
                                {ritual.type === 'STANDUP' && '📊'}
                                {ritual.type === 'RETROSPECTIVE' && '🔄'}
                                {ritual.type === 'PLANNING' && '📋'}
                                {ritual.type === 'SOCIAL' && '🎉'}
                                {ritual.type === 'REVIEW' && '👀'}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-xl font-black text-neutral-900 tracking-tight leading-none uppercase tracking-widest">{ritual.name}</h4>
                                    <span className="text-[10px] px-2.5 py-1 bg-neutral-900 text-white font-black rounded-lg uppercase tracking-widest" aria-label={`Frequency: ${ritual.frequency}`}>
                                        {ritual.frequency}
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-500 font-medium leading-relaxed mb-6">{ritual.description}</p>

                                <div className="flex items-center gap-6 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                                    <div className="flex items-center gap-2" aria-label={`Duration: ${ritual.duration}`}>
                                        <div className="p-1.5 bg-neutral-50 rounded-lg" aria-hidden="true"><Clock className="w-3 h-3 text-neutral-900" /></div>
                                        {ritual.duration}
                                    </div>
                                    <div className="flex items-center gap-2" aria-label={`Participants: ${ritual.participants.length} Operatives`}>
                                        <div className="p-1.5 bg-neutral-50 rounded-lg" aria-hidden="true"><Users className="w-3 h-3 text-neutral-900" /></div>
                                        {ritual.participants.length} Operatives
                                    </div>
                                </div>

                                {/* Participation Intelligence */}
                                <div className="mt-8 p-6 bg-neutral-50 rounded-[24px] border border-neutral-100 relative group/intel" role="note" aria-label="Operational expectations">
                                    <div className="absolute top-4 left-4 w-1 h-8 bg-brand-red rounded-full" aria-hidden="true" />
                                    <p className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-2 pl-4" aria-hidden="true">Operational Expectations</p>
                                    <p className="text-xs text-neutral-600 font-bold leading-relaxed pl-4">{ritual.newHireExpectations}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-4">
                                {ritual.acknowledged ? (
                                    <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20 animate-fade-in" role="status" aria-label="Added to calendar">
                                        <Check className="w-4 h-4" aria-hidden="true" /> Added to Sync
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleAcknowledgeRitual(ritual.id)}
                                        aria-label={`Synchronize Calendar for ${ritual.name}`}
                                        className="px-6 py-3 bg-white text-neutral-900 border border-neutral-100 hover:border-brand-red hover:text-brand-red rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-neutral-100/50 transition-all hover:-translate-y-1 active:translate-y-0 group/btn"
                                    >
                                        <div className="flex items-center gap-3" aria-hidden="true">
                                            <Calendar className="w-4 h-4" />
                                            Synchronize Calendar
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-neutral-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-1000"
                            style={{ width: `${(ritualsAcknowledged / rituals.length) * 100}%` }}
                        />
                    </div>
                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                        {ritualsAcknowledged} / {rituals.length} PROTOCOLS SYNCED
                    </span>
                </div>
                <button
                    onClick={onComplete}
                    disabled={ritualsAcknowledged < 2}
                    className={`
                        px-10 py-4 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center gap-3
                        ${ritualsAcknowledged >= 2
                            ? 'bg-brand-red text-white shadow-xl hover:-translate-y-1 active:translate-y-0 shadow-red-500/20'
                            : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                    `}
                >
                    Transition to Norms <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default RitualsPhase;
