import React from 'react';
import {
    Check,
    Calendar,
    Target,
    Heart,
} from 'lucide-react';
import { PeerCohort } from '../../../types';

interface CohortPhaseProps {
    cohort: PeerCohort;
    setCohort: React.Dispatch<React.SetStateAction<PeerCohort>>;
}

const CohortPhase: React.FC<CohortPhaseProps> = ({
    cohort,
    setCohort,
}) => {
    const handleConnectPeer = (peerId: string) => {
        setCohort(prev => ({
            ...prev,
            peers: prev.peers.map(p =>
                p.id === peerId ? { ...p, connected: true, connectedAt: new Date().toISOString() } : p
            )
        }));
    };

    return (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Peer Cohort</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    You are part of a high-potential collective. Engaging with your cohort accelerates shared learning and builds a horizontal support network that persists throughout your institutional tenure.
                </p>
            </div>

            {/* Cohort Identity (Premium Overhaul - Light Mode) */}
            <div className="relative bg-white rounded-[40px] p-10 overflow-hidden border border-neutral-100 shadow-xl shadow-brand-red/5">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-[10px] font-black text-brand-red uppercase tracking-[0.3em] mb-2">Authenticated Cohort</p>
                        <h4 className="text-4xl font-black text-neutral-900 tracking-tight mb-2 uppercase">{cohort.cohortName}</h4>
                        <div className="flex items-center gap-4 text-xs font-bold text-neutral-400">
                            <span className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-brand-red" />
                                Commissioned {new Date(cohort.startDate).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                    <div className="flex -space-x-4">
                        {cohort.peers.map((peer, i) => (
                            <div key={peer.id} className="w-14 h-14 rounded-full border-4 border-white bg-neutral-100 flex items-center justify-center text-neutral-600 font-black text-xs shadow-xl ring-1 ring-neutral-100">
                                {peer.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Peer Node Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Peer Node Grid">
                {cohort.peers.map((peer) => (
                    <div
                        key={peer.id}
                        role="listitem"
                        className={`
                            relative bg-white rounded-[32px] border p-8 transition-all group overflow-hidden
                            ${peer.connected ? 'border-emerald-100 bg-emerald-50/5' : 'border-neutral-100 hover:border-brand-red/10 hover:shadow-xl hover:shadow-neutral-100/20'}
                        `}
                    >
                        <div className="flex items-start gap-6">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-400 font-black text-lg shadow-xl group-hover:scale-105 transition-transform" aria-hidden="true">
                                    {peer.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                {peer.connected && (
                                    <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-lg bg-emerald-500 border-2 border-white flex items-center justify-center shadow-lg" aria-hidden="true">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-black text-neutral-900 tracking-tight leading-none uppercase tracking-widest mb-1">{peer.name}</h4>
                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.1em] mb-4">{peer.title} • {peer.department}</p>

                                {peer.sharedInterests && peer.sharedInterests.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5" role="list" aria-label="Shared interests">
                                        {peer.sharedInterests.map((interest, i) => (
                                            <span key={i} role="listitem" className="text-[9px] px-2.5 py-1 bg-neutral-50 text-neutral-500 font-black rounded-lg uppercase tracking-widest border border-neutral-100">
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8">
                            {peer.connected ? (
                                <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest bg-emerald-50 py-3 rounded-2xl justify-center border border-emerald-100" role="status" aria-label="Connection established">
                                    <Check className="w-3 h-3" aria-hidden="true" /> Node Connection Established
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleConnectPeer(peer.id)}
                                    aria-label={`Initialize Connection with ${peer.name}`}
                                    className="w-full py-4 bg-white text-neutral-900 border border-neutral-100 hover:border-brand-red hover:text-brand-red rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-neutral-100/50"
                                >
                                    <Heart className="w-3.5 h-3.5" aria-hidden="true" /> Initialize Connection
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Cohort Sync Events */}
            {cohort.sharedEvents && cohort.sharedEvents.length > 0 && (
                <div className="bg-neutral-50 rounded-[40px] border border-neutral-100 p-10 mt-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-100 shadow-sm flex items-center justify-center text-brand-red">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-lg font-black text-neutral-900 tracking-tight uppercase tracking-widest leading-none">Cohort Assembly Schedule</h4>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Upcoming collective engagements</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {cohort.sharedEvents.map((event) => (
                            <div key={event.id} className="group flex items-center gap-6 p-6 bg-white rounded-[28px] border border-neutral-100 hover:border-brand-red/20 transition-all hover:shadow-lg">
                                <div className="flex flex-col items-center justify-center w-14 h-14 bg-neutral-50 rounded-2xl text-neutral-600 shadow-sm border border-neutral-100 group-hover:bg-brand-red group-hover:text-white transition-colors">
                                    <span className="text-[8px] font-black uppercase tracking-widest opacity-60">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-xl font-black leading-none">{new Date(event.date).getDate()}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-black text-neutral-900 uppercase tracking-widest mb-1">{event.title}</p>
                                    <p className="text-[10px] text-neutral-400 font-bold flex items-center gap-2">
                                        <Target className="w-3 h-3 text-brand-red" />
                                        {event.location}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CohortPhase;
