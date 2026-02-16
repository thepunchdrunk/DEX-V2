
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
    ArrowRight,
} from 'lucide-react';
import {
    UserProfile,
    ManagerSignoff,
    OnboardingFeedback,
    CompletionStatus
} from '../../../types';

interface Day5GraduationProps {
    user: UserProfile;
    onGraduate: () => void;
}

const Day5Graduation: React.FC<Day5GraduationProps> = ({ user, onGraduate }) => {
    const [phase, setPhase] = useState<'OVERVIEW' | 'PLEDGE' | 'SIGNOFF' | 'FEEDBACK' | 'GRADUATION' | 'TRANSITION'>('OVERVIEW');

    // Mock Data
    const [managerSignoff, setManagerSignoff] = useState<ManagerSignoff>({
        managerId: 'sys-001',
        managerName: 'Sarah Jenkins',
        signedOff: false,
        firstWeekGoals: [], // Unused in this view
        firstMonthGoals: [], // Unused in this view
        welcomeMessage: 'I\'ve seen you crushing it in the sandbox. You are ready. Let\'s make it official.'
    });

    const [feedback, setFeedback] = useState<Partial<OnboardingFeedback>>({
        overallSatisfaction: undefined,
        confidenceLevel: undefined,
        dayRatings: { 1: 5, 2: 5, 3: 5, 4: 5, 5: 5 },
        frictionPoints: [],
        highlights: [],
        suggestions: '',
    });

    const [pledgeSigned, setPledgeSigned] = useState(false);
    const [signoffRequested, setSignoffRequested] = useState(false);
    const [themeTransitionProgress, setThemeTransitionProgress] = useState(0);

    // Completion status matching the new "Culture OS" structure
    const completionStatuses: CompletionStatus[] = [
        { day: 1, dayTitle: 'The Mission', category: 'Purpose', itemsCompleted: 4, itemsTotal: 4, incompleteItems: [] },
        { day: 2, dayTitle: 'The Toolkit', category: 'Systems', itemsCompleted: 4, itemsTotal: 4, incompleteItems: [] },
        { day: 3, dayTitle: 'The OS', category: 'Autonomy', itemsCompleted: 4, itemsTotal: 4, incompleteItems: [] },
        { day: 4, dayTitle: 'Social Capital', category: 'Network', itemsCompleted: 4, itemsTotal: 4, incompleteItems: [] },
        {
            day: 5, dayTitle: 'Impact Launch', category: 'Ownership', itemsCompleted: 0, itemsTotal: 3, incompleteItems: [
                { id: 'pledge', title: 'Impact Pledge' },
                { id: 'signoff', title: 'Manager Approval' },
                { id: 'feedback', title: 'Final Feedback' },
            ]
        },
    ];

    // Theme transition animation
    useEffect(() => {
        if (phase === 'TRANSITION') {
            const interval = setInterval(() => {
                setThemeTransitionProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(onGraduate, 500);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [phase, onGraduate]);

    const requestSignoff = () => {
        setSignoffRequested(true);
        setTimeout(() => {
            setManagerSignoff(prev => ({ ...prev, signedOff: true, signedOffAt: new Date().toISOString() }));
        }, 2000);
    };

    const renderOverviewPhase = () => (
        <div className="space-y-12 animate-fade-in">
            <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-inner">
                    <Rocket className="w-12 h-12 text-emerald-600" />
                </div>
                <h2 className="text-4xl font-bold text-neutral-900 mb-2 tracking-tight">Ready for <span className="text-emerald-600">Liftoff</span>?</h2>
                <p className="text-lg text-neutral-500 max-w-lg mx-auto leading-relaxed">
                    You've installed the OS. You've built the network. Now, you own the outcome.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {completionStatuses.map((status) => {
                    const isFullyComplete = status.itemsCompleted === status.itemsTotal;
                    return (
                        <div key={status.day} className={`relative bg-white rounded-2xl border p-5 text-center transition-all ${isFullyComplete ? 'border-emerald-100 shadow-sm' : 'border-neutral-100'}`}>
                            <div className={`w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center border ${isFullyComplete ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-neutral-50 border-neutral-100 text-neutral-400'}`}>
                                {isFullyComplete ? <Check className="w-6 h-6" /> : <span className="text-sm font-bold">{status.day}</span>}
                            </div>
                            <p className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1">Day 0{status.day}</p>
                            <p className="text-xs text-neutral-400 font-medium truncate">{status.dayTitle}</p>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center">
                <button
                    onClick={() => setPhase('PLEDGE')}
                    className="px-8 py-4 bg-neutral-900 hover:bg-black text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg hover:-translate-y-1"
                >
                    Begin Launch Sequence
                </button>
            </div>
        </div>
    );

    const renderPledgePhase = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">The Impact Pledge</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    We don't do "probation periods." We do Impact periods.
                    Commit to your first 30 days.
                </p>
            </div>

            <div className="bg-white border-2 border-neutral-200 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-50 rounded-bl-full" />

                <div className="relative z-10 space-y-6">
                    <h3 className="font-serif text-3xl text-neutral-900 italic">"I, {user.name}..."</h3>
                    <div className="space-y-4 text-lg text-neutral-600 leading-relaxed">
                        <p>...hereby acknowledge that I have been given the tools, the trust, and the network to succeed.</p>
                        <p>I understand that at [Company], <strong className="text-neutral-900">waiting for permission is a bug, not a feature.</strong></p>
                        <p>In my first 30 days, I commit to shipping one meaningful improvement to our product or process.</p>
                    </div>

                    <div className="pt-8 flex items-center gap-6">
                        <button
                            onClick={() => setPledgeSigned(true)}
                            disabled={pledgeSigned}
                            className={`
                                px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2
                                ${pledgeSigned
                                    ? 'bg-emerald-500 text-white cursor-default'
                                    : 'bg-neutral-900 text-white hover:bg-black hover:scale-105'}
                            `}
                        >
                            {pledgeSigned ? <Check className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                            {pledgeSigned ? 'Signed & Committed' : 'Sign Pledge'}
                        </button>
                        {pledgeSigned && <span className="text-sm font-bold text-emerald-600 animate-fade-in">Recorded on blockchain (mock)</span>}
                    </div>
                </div>
            </div>

            {pledgeSigned && (
                <div className="flex justify-end pt-4">
                    <button onClick={() => setPhase('SIGNOFF')} className="text-neutral-500 hover:text-neutral-900 font-bold text-sm flex items-center gap-2 group">
                        Next: Manager Approval <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}
        </div>
    );

    const renderSignoffPhase = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Clear for Takeoff</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    Get the final green light from your lead.
                </p>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200">
                <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-2xl shadow-sm">
                        👩‍💼
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">{managerSignoff.managerName}</h3>
                        <p className="text-neutral-500 font-medium mb-6">Engineering Lead</p>

                        {!managerSignoff.signedOff ? (
                            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                                <p className="text-neutral-600 mb-6">"Hey! Just waiting for your signal to approve your transition to the main roster."</p>
                                <button
                                    onClick={requestSignoff}
                                    disabled={signoffRequested}
                                    className={`
                                        w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2
                                        ${signoffRequested ? 'bg-neutral-100 text-neutral-400' : 'bg-neutral-900 text-white hover:bg-black'}
                                    `}
                                >
                                    {signoffRequested ? (
                                        <>
                                            <Clock className="w-4 h-4 animate-spin" /> Requesting...
                                        </>
                                    ) : (
                                        'Request Green Light'
                                    )}
                                </button>
                            </div>
                        ) : (
                            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 animate-fade-in">
                                <div className="flex items-center gap-3 mb-4">
                                    <Check className="w-6 h-6 text-emerald-600" />
                                    <span className="font-bold text-emerald-800">APPROVED FOR LAUNCH</span>
                                </div>
                                <p className="text-emerald-900/80 italic">"{managerSignoff.welcomeMessage}"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {managerSignoff.signedOff && (
                <div className="flex justify-end pt-4">
                    <button onClick={() => setPhase('FEEDBACK')} className="text-neutral-500 hover:text-neutral-900 font-bold text-sm flex items-center gap-2 group">
                        Next: Feedback <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}
        </div>
    );

    const renderFeedbackPhase = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">One Last Thing...</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    We iterate on everything. Including this onboarding.
                    Be brutally honest.
                </p>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-200 p-8 shadow-sm">
                <h3 className="font-bold text-neutral-900 mb-6">How was the "Culture OS" experience?</h3>
                <div className="flex gap-4 mb-8">
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                            key={rating}
                            onClick={() => setFeedback(prev => ({ ...prev, overallSatisfaction: rating }))}
                            className={`
                                w-12 h-12 rounded-xl text-lg font-bold transition-all
                                ${feedback.overallSatisfaction === rating
                                    ? 'bg-neutral-900 text-white scale-110 shadow-lg'
                                    : 'bg-neutral-50 text-neutral-400 hover:bg-neutral-100'}
                            `}
                        >
                            {rating}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setPhase('GRADUATION')}
                    disabled={!feedback.overallSatisfaction}
                    className={`
                        w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all
                        ${feedback.overallSatisfaction
                            ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg hover:-translate-y-1'
                            : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                    `}
                >
                    Submit & Launch
                </button>
            </div>
        </div>
    );

    const renderGraduationPhase = () => (
        <div className="text-center animate-fade-in py-12">
            <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <Rocket className="w-16 h-16 text-emerald-600" />
            </div>
            <h2 className="text-5xl font-bold text-neutral-900 mb-6 tracking-tight">You are Live.</h2>
            <p className="text-xl text-neutral-500 max-w-lg mx-auto leading-relaxed mb-12">
                Your sandbox access is revoked. Your production keys are active.
                Go build something amazing.
            </p>
            <button
                onClick={() => setPhase('TRANSITION')}
                className="px-12 py-5 bg-black hover:bg-neutral-900 text-white font-bold text-lg uppercase tracking-wider rounded-2xl shadow-xl transition-all hover:scale-105"
            >
                Enter Dashboard
            </button>
        </div>
    );

    const renderTransitionPhase = () => (
        <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="w-24 h-2 rounded-full bg-neutral-800 overflow-hidden mb-8">
                    <div
                        className="h-full bg-white transition-all duration-75 ease-linear"
                        style={{ width: `${themeTransitionProgress}%` }}
                    />
                </div>
                <h2 className="text-white text-2xl font-bold tracking-tight animate-pulse">Initializing Workspace...</h2>
            </div>
        </div>
    );

    if (phase === 'TRANSITION') return renderTransitionPhase();

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-neutral-50 border-r border-neutral-200 p-6 flex flex-col">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-6">Launch Sequence</h3>
                <div className="space-y-2">
                    {[
                        { id: 'OVERVIEW', label: 'Status Check' },
                        { id: 'PLEDGE', label: 'Impact Pledge' },
                        { id: 'SIGNOFF', label: 'Clearance' },
                        { id: 'FEEDBACK', label: 'Feedback' },
                        { id: 'GRADUATION', label: 'Liftoff' },
                    ].map((step, i) => {
                        const isActive = phase === step.id;
                        const isCompleted = ['OVERVIEW', 'PLEDGE', 'SIGNOFF', 'FEEDBACK', 'GRADUATION'].indexOf(phase) > i;

                        return (
                            <button
                                key={step.id}
                                disabled={!isCompleted && !isActive}
                                onClick={() => isCompleted && setPhase(step.id as any)}
                                className={`
                                    w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between
                                    ${isActive ? 'bg-white shadow-sm text-emerald-600 ring-1 ring-emerald-100' : isCompleted ? 'text-emerald-600' : 'text-neutral-400'}
                                `}
                            >
                                {step.label}
                                {isCompleted && <Check className="w-4 h-4" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                {phase === 'OVERVIEW' && renderOverviewPhase()}
                {phase === 'PLEDGE' && renderPledgePhase()}
                {phase === 'SIGNOFF' && renderSignoffPhase()}
                {phase === 'FEEDBACK' && renderFeedbackPhase()}
                {phase === 'GRADUATION' && renderGraduationPhase()}
            </div>
        </div>
    );
};

export default Day5Graduation;
