import React from 'react';
import {
    ChevronRight,
} from 'lucide-react';
import {
    StakeholderNode,
    UserProfile,
} from '../../../types';

interface StakeholdersPhaseProps {
    stakeholders: StakeholderNode[];
    user: UserProfile;
    onComplete: () => void;
}

const StakeholdersPhase: React.FC<StakeholdersPhaseProps> = ({
    stakeholders,
    user,
    onComplete,
}) => {
    return (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Influence Graph</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Map the interdependencies of your role. Understanding the landscape of institutional influence is critical for navigating complex project lifecycles and achieving consensus.
                </p>
            </div>

            {/* Visual Network Graph (Premium Overhaul - Light Mode) */}
            <div className="bg-white rounded-[40px] border border-neutral-100 p-12 min-h-[500px] relative overflow-hidden shadow-xl shadow-brand-red/5" role="img" aria-label="Influence Network Map showing your core relationships and stakeholders">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} aria-hidden="true" />

                {/* Connection Lines (Simulated with simple CSS) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30" aria-hidden="true">
                    <div className="w-[400px] h-[400px] border border-neutral-200 rounded-full" />
                    <div className="absolute w-[280px] h-[280px] border border-neutral-200 rounded-full" />
                </div>

                {/* Center Node - User */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-brand-red/20 rounded-full blur-2xl group-hover:bg-brand-red/30 transition-all" aria-hidden="true" />
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-neutral-900 font-black text-xl border-4 border-brand-red shadow-2xl relative">
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">Origin Node (You)</p>
                    </div>
                </div>

                {/* Stakeholder Nodes (Sophisticated Mapping) */}
                <div role="list" aria-label="Stakeholder Nodes">
                    {stakeholders.map((node, index) => {
                        const angle = (index / stakeholders.length) * 2 * Math.PI - Math.PI / 2;
                        const radius = node.circle === 'INNER' ? 140 : node.circle === 'MIDDLE' ? 200 : 250;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                            <div
                                key={node.id}
                                role="listitem"
                                aria-label={`${node.name}, ${node.title}. Circle: ${node.circle}`}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group"
                                style={{
                                    top: `calc(50% + ${y}px)`,
                                    left: `calc(50% + ${x}px)`,
                                }}
                            >
                                <div className="absolute -inset-2 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                <div className={`
                                    w-16 h-16 rounded-[24px] flex flex-col items-center justify-center text-[10px] font-black border-2 transition-all duration-500 cursor-pointer shadow-xl relative overflow-hidden group-hover:scale-110 group-hover:-translate-y-1
                                    ${node.circle === 'INNER' ? 'bg-brand-red border-brand-red text-white' : ''}
                                    ${node.circle === 'MIDDLE' ? 'bg-neutral-100 border-neutral-200 text-neutral-600 group-hover:border-neutral-300' : ''}
                                    ${node.circle === 'OUTER' ? 'bg-white border-neutral-100 text-neutral-400 group-hover:border-brand-red/20' : ''}
                                `} aria-hidden="true">
                                    <div className="absolute inset-0 bg-white/40 opacity-50" />
                                    <span className="relative z-10">{node.name.split(' ').map(n => n[0]).join('')}</span>
                                </div>
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" aria-hidden="true">
                                    <div className="bg-white px-3 py-1.5 rounded-lg shadow-2xl border border-neutral-100 whitespace-nowrap">
                                        <p className="text-[10px] font-black text-neutral-900 leading-tight">{node.name}</p>
                                        <p className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest">{node.title}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Legend Intelligence HUD */}
                <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-xl rounded-2xl p-6 text-[10px] border border-neutral-100 shadow-xl z-30" aria-label="Influence frequency legend">
                    <p className="font-black text-neutral-900 uppercase tracking-[0.2em] mb-4" aria-hidden="true">Frequency Mapping</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-brand-red shadow-[0_0_10px_rgba(230,0,0,0.5)]" aria-hidden="true" />
                            <span className="text-neutral-300 font-bold uppercase tracking-widest">High (Daily Link)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" aria-hidden="true" />
                            <span className="text-neutral-400 font-bold uppercase tracking-widest">Mid (Weekly Sync)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" aria-hidden="true" />
                            <span className="text-neutral-500 font-bold uppercase tracking-widest">Low (Strategic Only)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Node Intelligence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stakeholders.map((node) => (
                    <div key={node.id} className="bg-white rounded-[24px] border border-neutral-100 p-5 flex items-center gap-5 hover:border-brand-red/20 transition-all hover:shadow-lg group">
                        <div className={`
                            w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xs font-black shadow-lg shadow-neutral-100 group-hover:scale-105 transition-transform
                            ${node.circle === 'INNER' ? 'bg-brand-red' : ''}
                            ${node.circle === 'MIDDLE' ? 'bg-neutral-800' : ''}
                            ${node.circle === 'OUTER' ? 'bg-neutral-100 text-neutral-500' : ''}
                        `}>
                            {node.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-neutral-900 tracking-tight leading-none mb-1 uppercase tracking-widest">{node.name}</p>
                            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.1em]">{node.title}</p>
                        </div>
                        <div className="px-3 py-1.5 bg-neutral-50 text-neutral-500 rounded-xl text-[9px] font-black uppercase tracking-widest border border-neutral-100 group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red transition-all">
                            {node.interactionType}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={onComplete}
                className="w-full py-6 bg-brand-red hover:bg-red-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-4 group shadow-xl shadow-red-500/20"
            >
                Transition to Operational Rituals <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
};

export default StakeholdersPhase;
