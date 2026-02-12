import React, { useState } from 'react';
import {
    Check,
} from 'lucide-react';
import {
    UserProfile,
    ManagerSignoff,
    OnboardingFeedback,
    CompletionStatus,
} from '../../../types';

// Modularized Components
import GraduationOverview from './GraduationOverview';
import GraduationSignoff from './GraduationSignoff';
import GraduationFeedback from './GraduationFeedback';
import GraduationCeremony from './GraduationCeremony';
import GraduationTransition from './GraduationTransition';

interface Day5GraduationProps {
    user: UserProfile;
    onGraduate: () => void;
}

const Day5Graduation: React.FC<Day5GraduationProps> = ({ user, onGraduate }) => {
    const [phase, setPhase] = useState<'OVERVIEW' | 'SIGNOFF' | 'FEEDBACK' | 'GRADUATION' | 'TRANSITION'>('OVERVIEW');
    const [managerSignoff, setManagerSignoff] = useState<ManagerSignoff>({
        managerId: 'sys-001',
        managerName: 'Onboarding Advisor',
        signedOff: false,
        firstWeekGoals: [
            { id: 'g1', title: 'Complete Setup', description: 'Ensure all tools are working', category: 'PROCESS', status: 'NOT_STARTED', dueDate: '' },
            { id: 'g2', title: 'First PR', description: 'Submit your first code change', category: 'DELIVERY', status: 'NOT_STARTED', dueDate: '' }
        ],
        firstMonthGoals: [
            { id: 'g3', title: 'Feature Ownership', description: 'Take lead on a small feature', category: 'DELIVERY', status: 'NOT_STARTED', dueDate: '' }
        ],
        welcomeMessage: 'Great job completing your first week! You are ready to transition to your role.'
    });
    const [feedback, setFeedback] = useState<Partial<OnboardingFeedback>>({
        overallSatisfaction: undefined,
        confidenceLevel: undefined,
        dayRatings: { 1: 5, 2: 5, 3: 5, 4: 5, 5: 5 },
        frictionPoints: [],
        highlights: [],
        suggestions: '',
    });

    // Completion status mock data
    const completionStatuses: CompletionStatus[] = [
        { day: 1, dayTitle: 'Life & Work Setup', category: 'Setup', itemsCompleted: 7, itemsTotal: 7, incompleteItems: [] },
        { day: 2, dayTitle: 'Company Culture', category: 'Culture', itemsCompleted: 5, itemsTotal: 5, incompleteItems: [] },
        { day: 3, dayTitle: 'Tools & Workflow', category: 'Skills', itemsCompleted: 4, itemsTotal: 4, incompleteItems: [] },
        { day: 4, dayTitle: 'Network Mapping', category: 'Relationships', itemsCompleted: 5, itemsTotal: 5, incompleteItems: [] },
        {
            day: 5, dayTitle: 'Graduation', category: 'Completion', itemsCompleted: 0, itemsTotal: 3, incompleteItems: [
                { id: 'signoff', title: 'Final Sign-off' },
                { id: 'feedback', title: 'Submit Feedback' },
                { id: 'graduate', title: 'Complete Graduation' },
            ]
        },
    ];

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in selection:bg-red-100 selection:text-brand-red">
            {/* Context Header (Day 5 - Graduation) */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-brand-red bg-red-50 px-3 py-1 rounded-full uppercase tracking-widest">Phase 05 / 05</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Institutional Calibration & Graduation</span>
                </div>
                <h1 className="text-4xl font-black text-neutral-900 tracking-tight mb-4 leading-tight">
                    Final <span className="text-brand-red">Operational Handover</span>
                </h1>
                <p className="text-sm text-neutral-500 max-w-2xl leading-relaxed">
                    Institutional immersion is complete. Validate your calibration, provides strategic feedback, and transition to your full roles with complete operational confidence.
                </p>
            </div>

            {/* Phase Navigation (Unified & Premium) */}
            {phase !== 'TRANSITION' && (
                <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-100/30 p-2 mb-10 flex gap-1 overflow-x-auto no-scrollbar" role="tablist" aria-label="Graduation phases">
                    {[
                        { id: 'OVERVIEW', label: 'Overview', icon: '📊' },
                        { id: 'SIGNOFF', label: 'Sign-off', icon: '✍️' },
                        { id: 'FEEDBACK', label: 'Feedback', icon: '💬' },
                        { id: 'GRADUATION', label: 'Complete', icon: '🎓' },
                    ].map((p, i) => {
                        const isActive = phase === p.id;
                        const isPast =
                            (p.id === 'OVERVIEW' && phase !== 'OVERVIEW') ||
                            (p.id === 'SIGNOFF' && (phase === 'FEEDBACK' || phase === 'GRADUATION' || phase === 'TRANSITION')) ||
                            (p.id === 'FEEDBACK' && (phase === 'GRADUATION' || phase === 'TRANSITION')) ||
                            (p.id === 'GRADUATION' && phase === 'TRANSITION');

                        return (
                            <button
                                key={p.id}
                                onClick={() => !isActive && phase !== 'TRANSITION' && setPhase(p.id as any)}
                                role="tab"
                                aria-selected={isActive}
                                aria-label={`${p.label}${isPast ? ', Completed' : ''}`}
                                className={`
                                    flex-1 min-w-[150px] px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3
                                    ${isActive
                                        ? 'bg-white border-brand-red text-brand-red shadow-lg shadow-red-500/10 -translate-y-0.5'
                                        : (isPast ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-white text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600')}
                                `}
                            >
                                <span className="text-lg" aria-hidden="true">
                                    {isPast ? <Check className="w-4 h-4" /> : p.icon}
                                </span>
                                {p.label}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Focused Graduation Content */}
            <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-8 md:p-12 mb-10 min-h-[500px] animate-slide-up">
                <div className="max-w-4xl mx-auto">
                    {phase === 'OVERVIEW' && (
                        <GraduationOverview
                            completionStatuses={completionStatuses}
                            managerSignoff={managerSignoff}
                            feedbackSubmitted={!!feedback.submittedAt}
                            onNext={() => setPhase('SIGNOFF')}
                        />
                    )}
                    {phase === 'SIGNOFF' && (
                        <GraduationSignoff
                            managerSignoff={managerSignoff}
                            setManagerSignoff={setManagerSignoff}
                            onNext={() => setPhase('FEEDBACK')}
                        />
                    )}
                    {phase === 'FEEDBACK' && (
                        <GraduationFeedback
                            feedback={feedback}
                            setFeedback={setFeedback}
                            onNext={() => setPhase('GRADUATION')}
                        />
                    )}
                    {phase === 'GRADUATION' && (
                        <GraduationCeremony
                            user={user}
                            onNext={() => setPhase('TRANSITION')}
                        />
                    )}
                    {phase === 'TRANSITION' && (
                        <GraduationTransition
                            onComplete={onGraduate}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Day5Graduation;
