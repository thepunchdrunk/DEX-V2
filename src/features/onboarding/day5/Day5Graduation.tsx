import React, { useState, useEffect } from 'react';
import {
    Check,
    ChevronRight,
    Trophy,
    Star,
    Sparkles,
    Award,
    MessageSquare,
    Target,
    Users,
    Calendar,
    AlertCircle,
    FileText,
    Send,
    ThumbsUp,
    Clock,
    Rocket,
    PartyPopper,
    Heart,
    ArrowLeft,
    CheckCircle2,
    ClipboardList,
} from 'lucide-react';
import {
    UserProfile,
    ManagerSignoff,
    Goal,
    OnboardingFeedback,
    CompletionStatus,
    OnboardingDay,
} from '@/types';
import OnboardingFeed, { OnboardingCard } from '../shared/OnboardingFeed';

interface Day5GraduationProps {
    user: UserProfile;
    onGraduate: () => void;
}

type Phase = 'OVERVIEW' | 'SIGNOFF' | 'FEEDBACK' | 'GRADUATION';

const Day5Graduation: React.FC<Day5GraduationProps> = ({ user, onGraduate }) => {
    // Phase State
    const [activePhase, setActivePhase] = useState<Phase | null>(null);
    const [completedPhases, setCompletedPhases] = useState<Phase[]>([]);

    // Data State
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
        frictionPoints: [],
        highlights: [],
    });

    // UI State
    const [signoffRequested, setSignoffRequested] = useState(false);
    const [frictionInput, setFrictionInput] = useState('');
    const [highlightInput, setHighlightInput] = useState('');
    const [themeTransitionProgress, setThemeTransitionProgress] = useState(0);

    // Derived State
    const allModulesComplete =
        completedPhases.includes('OVERVIEW') &&
        managerSignoff.signedOff &&
        completedPhases.includes('FEEDBACK') &&
        completedPhases.includes('GRADUATION');

    // Handlers
    const completePhase = (phase: Phase) => {
        if (!completedPhases.includes(phase)) {
            setCompletedPhases(prev => [...prev, phase]);
        }
        setActivePhase(null);
    };

    const requestSignoff = () => {
        setSignoffRequested(true);
        setTimeout(() => {
            setManagerSignoff(prev => ({
                ...prev,
                signedOff: true,
                signedOffAt: new Date().toISOString(),
            }));
            completePhase('SIGNOFF');
        }, 2000);
    };

    const handleAddFriction = () => {
        if (frictionInput.trim()) {
            setFeedback(prev => ({
                ...prev,
                frictionPoints: [...(prev.frictionPoints || []), frictionInput.trim()]
            }));
            setFrictionInput('');
        }
    };

    const handleAddHighlight = () => {
        if (highlightInput.trim()) {
            setFeedback(prev => ({
                ...prev,
                highlights: [...(prev.highlights || []), highlightInput.trim()]
            }));
            setHighlightInput('');
        }
    };

    const handleSubmitFeedback = () => {
        completePhase('FEEDBACK');
    };

    const handleGraduation = () => {
        const interval = setInterval(() => {
            setThemeTransitionProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onGraduate, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 20);
    };

    const canSubmitFeedback = feedback.overallSatisfaction && feedback.confidenceLevel;

    // Renderers
    const renderOverviewPhase = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                <h4 className="font-bold text-neutral-900 mb-4">You've reached the finish line!</h4>
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(day => (
                        <div key={day} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            <span className="text-sm text-neutral-600 font-medium">Day {day} Completed</span>
                        </div>
                    ))}
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-brand-red flex items-center justify-center">
                            <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
                        </div>
                        <span className="text-sm text-neutral-900 font-bold">Day 5: Final Review (In Progress)</span>
                    </div>
                </div>
            </div>

            <button onClick={() => completePhase('OVERVIEW')} className="w-full btn-primary py-4">
                Confirm Milestones
            </button>
        </div>
    );

    const renderSignoffPhase = () => (
        <div className="space-y-6 animate-fade-in">
            {!managerSignoff.signedOff ? (
                <div className="text-center py-8">
                    {signoffRequested ? (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
                            <p className="font-bold text-neutral-900">Requesting Approval...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <p className="text-neutral-500 text-sm">Request final approval from your Manager to complete your transition.</p>
                            <button onClick={requestSignoff} className="btn-primary py-4 px-8 w-full">
                                Request Approval
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex items-center gap-4">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    <div>
                        <h4 className="font-bold text-neutral-900">Approval Complete</h4>
                        <p className="text-xs text-neutral-600">Authorized by {managerSignoff.managerName}</p>
                    </div>
                </div>
            )}
        </div>
    );

    const renderFeedbackPhase = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
                <label className="text-sm font-bold text-neutral-900">How would you rate your onboarding experience?</label>
                <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                        <button
                            key={rating}
                            onClick={() => setFeedback(prev => ({ ...prev, overallSatisfaction: rating as any }))}
                            className={`flex-1 py-3 rounded-xl border font-bold transition-all
                                ${feedback.overallSatisfaction === rating
                                    ? 'bg-neutral-900 text-white border-neutral-900'
                                    : 'bg-white text-neutral-500 border-neutral-200 hover:border-brand-red/30'}
                            `}
                        >
                            {rating}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-sm font-bold text-neutral-900">How confident do you feel starting your role?</label>
                <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                        <button
                            key={rating}
                            onClick={() => setFeedback(prev => ({ ...prev, confidenceLevel: rating as any }))}
                            className={`flex-1 py-3 rounded-xl border font-bold transition-all
                                ${feedback.confidenceLevel === rating
                                    ? 'bg-brand-red text-white border-brand-red'
                                    : 'bg-white text-neutral-500 border-neutral-200 hover:border-brand-red/30'}
                            `}
                        >
                            {rating}
                        </button>
                    ))}
                </div>
            </div>

            <button
                onClick={handleSubmitFeedback}
                disabled={!canSubmitFeedback}
                className="w-full btn-primary py-4"
            >
                Submit Feedback
            </button>
        </div>
    );

    const renderGraduationPhase = () => (
        <div className="text-center py-8 space-y-8 animate-fade-in">
            <div className="relative inline-block">
                <Trophy className="w-24 h-24 text-brand-red mx-auto animate-bounce-subtle" />
                <Sparkles className="w-10 h-10 text-amber-400 absolute -top-2 -right-2 animate-spin-slow" />
            </div>

            <div>
                <h2 className="text-3xl font-black text-neutral-900 mb-2">You're Ready, {user.name}!</h2>
                <p className="text-neutral-500 max-w-sm mx-auto">You have successfully completed the onboarding. You are now ready to start.</p>
            </div>

            {themeTransitionProgress > 0 ? (
                <div className="space-y-2">
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-brand-red transition-all duration-100"
                            style={{ width: `${themeTransitionProgress}%` }}
                        />
                    </div>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Initializing Dashboard...</p>
                </div>
            ) : (
                <button
                    onClick={handleGraduation}
                    className="w-full btn-primary py-4 text-xs font-black uppercase tracking-[0.2em]"
                >
                    Launch Dashboard <Rocket className="w-4 h-4 ml-2" />
                </button>
            )}
        </div>
    );

    // Feed Data
    const feedCards: OnboardingCard[] = [
        {
            id: 'OVERVIEW',
            title: 'Final Review',
            description: 'Review your progress.',
            icon: <ClipboardList className="w-5 h-5" />,
            status: completedPhases.includes('OVERVIEW') ? 'COMPLETED' : 'AVAILABLE',
            type: 'ACTION',
            progress: completedPhases.includes('OVERVIEW') ? 100 : 0,
            estimatedTime: '5 min',
            onAction: () => setActivePhase('OVERVIEW'),
            actionLabel: 'Review',
        },
        {
            id: 'SIGNOFF',
            title: 'Manager Approval',
            description: 'Get approval to launch.',
            icon: <Check className="w-5 h-5" />,
            status: completedPhases.includes('SIGNOFF') ? 'COMPLETED' : 'AVAILABLE',
            type: 'ACTION',
            progress: managerSignoff.signedOff ? 100 : 0,
            estimatedTime: '2 min',
            onAction: () => setActivePhase('SIGNOFF'),
            actionLabel: 'Request Approval',
        },
        {
            id: 'FEEDBACK',
            title: 'Feedback',
            description: 'Share your thoughts.',
            icon: <MessageSquare className="w-5 h-5" />,
            status: completedPhases.includes('FEEDBACK') ? 'COMPLETED' : 'AVAILABLE',
            type: 'ACTION',
            progress: completedPhases.includes('FEEDBACK') ? 100 : 0,
            estimatedTime: '3 min',
            onAction: () => setActivePhase('FEEDBACK'),
            actionLabel: 'Give Feedback',
        },
        {
            id: 'GRADUATION',
            title: 'Launch',
            description: 'Start your journey.',
            icon: <Trophy className="w-5 h-5" />,
            status: (completedPhases.includes('OVERVIEW') && managerSignoff.signedOff && completedPhases.includes('FEEDBACK')) ? 'AVAILABLE' : 'LOCKED',
            type: 'CELEBRATION',
            progress: 0,
            estimatedTime: '1 min',
            onAction: () => setActivePhase('GRADUATION'),
            actionLabel: 'Launch',
        }
    ];

    if (activePhase) {
        let content = null;
        let title = '';
        switch (activePhase) {
            case 'OVERVIEW': title = 'Final Review'; content = renderOverviewPhase(); break;
            case 'SIGNOFF': title = 'Manager Approval'; content = renderSignoffPhase(); break;
            case 'FEEDBACK': title = 'Feedback'; content = renderFeedbackPhase(); break;
            case 'GRADUATION': title = 'Launch'; content = renderGraduationPhase(); break;
        }

        return (
            <div className="animate-fade-in">
                {activePhase !== 'GRADUATION' && (
                    <button
                        onClick={() => setActivePhase(null)}
                        className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6 font-medium text-sm transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Overview
                    </button>
                )}

                <h2 className="text-3xl font-black text-neutral-900 mb-6">{title}</h2>
                <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-100/50 p-8">
                    {content}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">
                    Ready to Launch
                </h1>
                <p className="text-neutral-500">
                    You're ready. Let's make it official.
                </p>
            </div>

            <OnboardingFeed
                cards={feedCards}
                onCardAction={(id) => setActivePhase(id as Phase)}
            />
        </div>
    );
};

export default Day5Graduation;
