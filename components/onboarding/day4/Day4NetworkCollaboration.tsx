import React, { useState } from 'react';
import {
    ChevronRight,
    Check,
} from 'lucide-react';
import {
    UserProfile,
    Critical5Contact,
    StakeholderNode,
    TeamRitual,
    CollaborationNorm,
    PeerCohort,
} from '../../../types';
import {
    CRITICAL_5_CONTACTS,
    STAKEHOLDER_NODES,
    TEAM_RITUALS,
    COLLABORATION_NORMS,
    PEER_COHORT,
} from '../../../constants';

// Modularized Components
import CriticalContactsPhase from './CriticalContactsPhase';
import StakeholdersPhase from './StakeholdersPhase';
import RitualsPhase from './RitualsPhase';
import NormsPhase from './NormsPhase';
import CohortPhase from './CohortPhase';

interface Day4NetworkCollaborationProps {
    user: UserProfile;
    onComplete: () => void;
}

type Phase = 'CRITICAL5' | 'STAKEHOLDERS' | 'RITUALS' | 'NORMS' | 'COHORT' | 'DONE';

const Day4NetworkCollaboration: React.FC<Day4NetworkCollaborationProps> = ({ user, onComplete }) => {
    const [phase, setPhase] = useState<Phase>('CRITICAL5');
    const [contacts, setContacts] = useState<Critical5Contact[]>(CRITICAL_5_CONTACTS);
    const [stakeholders] = useState<StakeholderNode[]>(STAKEHOLDER_NODES);
    const [rituals, setRituals] = useState<TeamRitual[]>(TEAM_RITUALS);
    const [norms] = useState<CollaborationNorm[]>(COLLABORATION_NORMS);
    const [cohort, setCohort] = useState<PeerCohort>(PEER_COHORT);

    // Track completions
    const introDraftsSent = contacts.filter(c => c.introSent).length;
    const ritualsAcknowledged = rituals.filter(r => r.acknowledged).length;

    const canComplete = introDraftsSent >= 3 && ritualsAcknowledged >= 2;

    const handleCompletePhase = (current: Phase, next: Phase) => {
        setPhase(next);
    };

    const handleCompleteDay = () => {
        setPhase('DONE');
        setTimeout(onComplete, 1500);
    };

    const phases_list: { id: Phase; label: string; icon: string }[] = [
        { id: 'CRITICAL5', label: 'Critical 5', icon: '⭐' },
        { id: 'STAKEHOLDERS', label: 'Stakeholders', icon: '🗺️' },
        { id: 'RITUALS', label: 'Rituals', icon: '📅' },
        { id: 'NORMS', label: 'Norms', icon: '📋' },
        { id: 'COHORT', label: 'Cohort', icon: '👥' },
    ];

    const getPhaseIndex = (p: Phase) => phases_list.findIndex(x => x.id === p);

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in selection:bg-red-100 selection:text-brand-red">
            {/* Context Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-brand-red bg-red-50 px-3 py-1 rounded-full uppercase tracking-widest">Phase 04 / 05</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Relational Capital & Synergy</span>
                </div>
                <h1 className="text-4xl font-black text-neutral-900 tracking-tight mb-4 leading-tight">
                    Engineering your <span className="text-brand-red">Network Core</span>
                </h1>
                <p className="text-sm text-neutral-500 max-w-2xl leading-relaxed">
                    Institutional success is a collaborative achievement. Build the critical relational architecture and understand the social protocols that accelerate collective velocity.
                </p>
            </div>

            {/* Phase Navigation (Unified & Premium) */}
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-100/30 p-2 mb-10 flex gap-1 overflow-x-auto no-scrollbar" role="tablist" aria-label="Day 4 Onboarding Phases">
                {phases_list.map((p, i) => {
                    const isActive = phase === p.id;
                    const isCompleted = getPhaseIndex(phase) > i || phase === 'DONE';

                    return (
                        <button
                            key={p.id}
                            onClick={() => (isCompleted || isActive) && phase !== 'DONE' && setPhase(p.id)}
                            role="tab"
                            aria-selected={isActive}
                            aria-label={`${p.label}${isCompleted ? ', Completed' : ''}`}
                            className={`
                                flex-1 min-w-[150px] px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3
                                ${isActive && phase !== 'DONE'
                                    ? 'bg-white border-brand-red text-brand-red shadow-lg shadow-red-500/10 -translate-y-0.5'
                                    : (isCompleted ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-white text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600')}
                            `}
                        >
                            <span className="text-lg" aria-hidden="true">
                                {isCompleted ? <Check className="w-4 h-4" /> : p.icon}
                            </span>
                            {p.label}
                        </button>
                    );
                })}
            </div>

            {/* Focused Relational Content */}
            <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-8 md:p-12 mb-10 min-h-[500px] animate-slide-up">
                <div className="max-w-4xl mx-auto">
                    {phase === 'CRITICAL5' && (
                        <CriticalContactsPhase
                            contacts={contacts}
                            setContacts={setContacts}
                            onComplete={() => handleCompletePhase('CRITICAL5', 'STAKEHOLDERS')}
                        />
                    )}
                    {phase === 'STAKEHOLDERS' && (
                        <StakeholdersPhase
                            stakeholders={stakeholders}
                            user={user}
                            onComplete={() => handleCompletePhase('STAKEHOLDERS', 'RITUALS')}
                        />
                    )}
                    {phase === 'RITUALS' && (
                        <RitualsPhase
                            rituals={rituals}
                            setRituals={setRituals}
                            onComplete={() => handleCompletePhase('RITUALS', 'NORMS')}
                        />
                    )}
                    {phase === 'NORMS' && (
                        <NormsPhase
                            norms={norms}
                            onComplete={() => handleCompletePhase('NORMS', 'COHORT')}
                        />
                    )}
                    {phase === 'COHORT' && (
                        <CohortPhase
                            cohort={cohort}
                            setCohort={setCohort}
                        />
                    )}
                    {phase === 'DONE' && (
                        <div className="text-center py-24 animate-fade-in">
                            <div className="w-24 h-24 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <Check className="w-12 h-12 text-emerald-600" />
                            </div>
                            <h2 className="text-3xl font-black text-neutral-900 mb-4 tracking-tight">Phase 04 Synchronized</h2>
                            <p className="text-neutral-500 max-w-sm mx-auto leading-relaxed">
                                Your relational network is now bridged. Preparing transition to Phase 05: Institutional Graduation...
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Advancement Protocol */}
            {phase !== 'DONE' && phase === 'COHORT' && (
                <div className="flex flex-col items-center gap-6">
                    <button
                        onClick={handleCompleteDay}
                        disabled={!canComplete}
                        className={`
                            w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-4 group
                            ${canComplete
                                ? 'bg-brand-red text-white shadow-xl shadow-red-500/30 hover:shadow-red-500/40 hover:-translate-y-1 active:translate-y-0'
                                : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                        `}
                    >
                        {canComplete ? (
                            <>
                                Finalize Day 04: Proceed to Graduation Ceremony
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        ) : (
                            <>Complete Critical Introductions & Rituals to Proceed</>
                        )}
                    </button>
                    {!canComplete && (
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                            Required: 3/5 Intro Drafts ({introDraftsSent}) & 2/5 Rituals Acknowledged ({ritualsAcknowledged})
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Day4NetworkCollaboration;
