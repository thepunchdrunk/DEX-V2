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
} from 'lucide-react';
import {
    UserProfile,
    ManagerSignoff,
    Goal,
    OnboardingFeedback,
    CompletionStatus,
    OnboardingDay,
} from '../../../types';

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
    const [frictionInput, setFrictionInput] = useState('');
    const [highlightInput, setHighlightInput] = useState('');
    const [signoffRequested, setSignoffRequested] = useState(false);
    const [themeTransitionProgress, setThemeTransitionProgress] = useState(0);

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
        // Simulate manager approval after 2 seconds
        setTimeout(() => {
            setManagerSignoff(prev => ({
                ...prev,
                signedOff: true,
                signedOffAt: new Date().toISOString(),
            }));
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
        setFeedback(prev => ({
            ...prev,
            submittedAt: new Date().toISOString(),
            requiresFollowUp: (prev.overallSatisfaction || 5) <= 2,
        }));
        setPhase('GRADUATION');
    };

    const canSubmitFeedback = feedback.overallSatisfaction && feedback.confidenceLevel;

    const renderOverviewPhase = () => (
        <div className="space-y-12 animate-fade-in">
            <div className="text-center mb-12">
                <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6 border border-red-100 shadow-inner">
                    <Trophy className="w-12 h-12 text-brand-red" />
                </div>
                <h2 className="text-3xl font-black text-neutral-900 mb-2 tracking-tight">Institutional Onboarding <span className="text-brand-red">Audit</span></h2>
                <p className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">A strategic verification of your immersion journey. Review your operational milestones before final calibration.</p>
            </div>

            {/* Completion Dashboard (Premium) */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4" role="list" aria-label="Onboarding Completion Status">
                {completionStatuses.map((status) => {
                    const isFullyComplete = status.itemsCompleted === status.itemsTotal;
                    return (
                        <div
                            key={status.day}
                            role="listitem"
                            className={`
                                relative bg-white rounded-[32px] border p-6 text-center transition-all group
                                ${isFullyComplete ? 'border-emerald-100 shadow-lg shadow-emerald-100/20' : 'border-neutral-100'}
                            `}
                        >
                            <div className={`
                                w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center border transition-transform duration-500 group-hover:scale-110
                                ${isFullyComplete ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30' : 'bg-neutral-50 border-neutral-100 text-neutral-400'}
                            `} aria-hidden="true">
                                {isFullyComplete ? (
                                    <Check className="w-6 h-6" />
                                ) : (
                                    <span className="text-sm font-black uppercase tracking-widest">{status.day}</span>
                                )}
                            </div>
                            <p className="text-[10px] font-black text-neutral-900 uppercase tracking-widest mb-1 leading-none">Day 0{status.day}</p>
                            <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest truncate">{status.dayTitle}</p>

                            <div className="mt-4 pt-4 border-t border-neutral-50">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${isFullyComplete ? 'text-emerald-600' : 'text-neutral-400'}`} aria-label={`${status.itemsCompleted} of ${status.itemsTotal} items completed`}>
                                    {status.itemsCompleted}/{status.itemsTotal}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Relational Onboarding Protocol - Final Stages */}
            <div className="bg-neutral-900 rounded-[40px] border border-neutral-800 p-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
                <h3 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                    <Rocket className="w-6 h-6 text-brand-red" aria-hidden="true" />
                    Final Calibration Protocol
                </h3>
                <div className="space-y-4" role="list" aria-label="Calibration Steps">
                    {[
                        { step: 1, label: 'Institutional Sign-off', complete: managerSignoff.signedOff, desc: 'Advisor validation of operational goals' },
                        { step: 2, label: 'Strategic Feedback', complete: !!feedback.submittedAt, desc: 'Contribute to institutional scaling' },
                        { step: 3, label: 'Graduation Ceremony', complete: false, desc: 'Transition to full operational status' }
                    ].map((item) => (
                        <div key={item.step} role="listitem" className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-[28px] group transition-all hover:bg-white/10">
                            <div className={`
                                w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all
                                ${item.complete ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-transparent border-white/20 text-white/40'}
                            `} aria-hidden="true">
                                {item.complete ? <Check className="w-5 h-5" /> : <span className="text-xs font-black">{item.step}</span>}
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm font-black uppercase tracking-widest ${item.complete ? 'text-emerald-400' : 'text-white'}`}>
                                    {item.label}
                                </p>
                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">{item.desc}</p>
                            </div>
                            {!item.complete && item.step !== 3 && (
                                <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-brand-red transition-colors" aria-hidden="true" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => setPhase('SIGNOFF')}
                className="w-full py-6 bg-brand-red hover:bg-red-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-4 group shadow-xl shadow-red-500/20 hover:-translate-y-1 active:translate-y-0"
            >
                Initiate Graduation Sequence <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );

    const renderSignoffPhase = () => (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Calibration & <span className="text-brand-red">Sign-off</span></h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Formalize your operational transition. Your designated advisor has established primary objectives to ensure your first 30 days are calibrated for high-impact delivery.
                </p>
            </div>

            {/* Advisor Message (Refined) */}
            {managerSignoff.welcomeMessage && (
                <div className="relative bg-neutral-50 rounded-[32px] border border-neutral-100 p-8 overflow-hidden group" role="note" aria-label={`Message from ${managerSignoff.managerName}`}>
                    <div className="absolute top-4 right-8 text-neutral-100 font-black text-6xl select-none group-hover:text-neutral-200 transition-colors" aria-hidden="true">"</div>
                    <div className="flex items-start gap-6 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center text-white font-black text-lg shadow-xl shrink-0" aria-hidden="true">
                            {managerSignoff.managerName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-brand-red uppercase tracking-[0.2em] mb-2" aria-hidden="true">Advisor Recommendation</p>
                            <p className="text-sm text-neutral-700 font-bold leading-relaxed pr-12">{managerSignoff.welcomeMessage}</p>
                            <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mt-4">— {managerSignoff.managerName}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Dual Goal Horizon Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Weekly Horizon */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-2 h-2 rounded-full bg-brand-red" aria-hidden="true" />
                        <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Weekly Horizon</h4>
                    </div>
                    <div role="list" aria-label="Weekly Goals">
                        {managerSignoff.firstWeekGoals.map((goal) => (
                            <div key={goal.id} role="listitem" className="bg-white rounded-[24px] border border-neutral-100 p-5 flex items-center gap-5 hover:border-brand-red/20 transition-all hover:shadow-lg group mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform" aria-hidden="true">
                                    {goal.category === 'LEARNING' && '📚'}
                                    {goal.category === 'DELIVERY' && '✅'}
                                    {goal.category === 'RELATIONSHIP' && '🤝'}
                                    {goal.category === 'PROCESS' && '⚙️'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-black text-neutral-900 tracking-tight leading-none mb-1 uppercase tracking-widest">{goal.title}</p>
                                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.1em] truncate">{goal.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Monthly Horizon */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-2 h-2 rounded-full bg-neutral-900" aria-hidden="true" />
                        <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Monthly Horizon</h4>
                    </div>
                    <div role="list" aria-label="Monthly Goals">
                        {managerSignoff.firstMonthGoals.map((goal) => (
                            <div key={goal.id} role="listitem" className="bg-white rounded-[24px] border border-neutral-100 p-5 flex items-center gap-5 hover:border-brand-red/20 transition-all hover:shadow-lg group mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform" aria-hidden="true">
                                    {goal.category === 'LEARNING' && '📚'}
                                    {goal.category === 'DELIVERY' && '✅'}
                                    {goal.category === 'RELATIONSHIP' && '🤝'}
                                    {goal.category === 'PROCESS' && '⚙️'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-black text-neutral-900 tracking-tight leading-none mb-1 uppercase tracking-widest">{goal.title}</p>
                                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.1em] truncate">{goal.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sign-off Engagement Shell */}
            <div className="mt-12">
                {!managerSignoff.signedOff ? (
                    <div className={`
                        rounded-[32px] p-8 border transition-all duration-500
                        ${signoffRequested ? 'bg-amber-50 border-amber-100 shadow-xl shadow-amber-100/30' : 'bg-neutral-50 border-neutral-100'}
                    `} role="status" aria-busy={signoffRequested} aria-live="polite">
                        <div className="flex items-center justify-between gap-8 flex-wrap md:flex-nowrap">
                            <div className="flex items-center gap-6">
                                {signoffRequested ? (
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg relative" aria-hidden="true">
                                        <Clock className="w-8 h-8 text-amber-500 animate-pulse" />
                                        <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg" aria-hidden="true">
                                        <AlertCircle className="w-8 h-8 text-neutral-300" />
                                    </div>
                                )}
                                <div>
                                    <h4 className={`text-lg font-black tracking-tight leading-none mb-1 uppercase ${signoffRequested ? 'text-amber-900' : 'text-neutral-900'}`}>
                                        {signoffRequested ? 'Calibration in Progress' : 'Final Verification Pending'}
                                    </h4>
                                    <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                                        {signoffRequested
                                            ? `Transmitting final assessment to ${managerSignoff.managerName}...`
                                            : 'Confirming operational readiness for transition to role-specific cockpit.'}
                                    </p>
                                </div>
                            </div>
                            {!signoffRequested && (
                                <button
                                    onClick={requestSignoff}
                                    className="px-8 py-4 bg-neutral-900 hover:bg-brand-red text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-neutral-100/50 hover:-translate-y-1 active:translate-y-0"
                                >
                                    Authorize Calibration
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-emerald-50 rounded-[40px] border border-emerald-100 p-10 flex items-center gap-8 shadow-2xl shadow-emerald-100/30 animate-scale-in" role="status" aria-label="Calibration synced">
                        <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20" aria-hidden="true">
                            <Check className="w-10 h-10" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2" aria-hidden="true">Authenticated Onboarding</p>
                            <h4 className="text-2xl font-black text-neutral-900 tracking-tight leading-none mb-2">Calibration Successfully Synced</h4>
                            <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                                {managerSignoff.managerName} finalized your operational status on {new Date(managerSignoff.signedOffAt!).toLocaleDateString()} at {new Date(managerSignoff.signedOffAt!).toLocaleTimeString()}.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={() => setPhase('FEEDBACK')}
                disabled={!managerSignoff.signedOff}
                className={`
                    w-full py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 group shadow-xl
                    ${managerSignoff.signedOff
                        ? 'bg-neutral-900 text-white hover:bg-neutral-800 hover:-translate-y-1 active:translate-y-0'
                        : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                `}
            >
                Transition to Feedback <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );

    const renderFeedbackPhase = () => (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-0">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional <span className="text-brand-red">Feedback</span> Loop</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Contribute to the evolution of our onboarding infrastructure. Your strategic insights directly influence the development of future institutional immersion protocols.
                </p>
            </div>

            {/* Satisfaction & Confidence Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Overall Satisfaction */}
                <div className="bg-white rounded-[32px] border border-neutral-100 p-8 shadow-sm">
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-6">Onboarding Satisfaction</p>
                    <div className="flex items-center justify-between gap-2" role="radiogroup" aria-label="Satisfaction rating">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                                key={rating}
                                role="radio"
                                aria-checked={feedback.overallSatisfaction === rating}
                                aria-label={`${rating} out of 5 satisfaction`}
                                onClick={() => setFeedback(prev => ({ ...prev, overallSatisfaction: rating as 1 | 2 | 3 | 4 | 5 }))}
                                className={`
                                    flex-1 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all border
                                    ${feedback.overallSatisfaction === rating
                                        ? 'bg-neutral-900 border-neutral-900 text-white shadow-xl -translate-y-1'
                                        : 'bg-neutral-50 border-neutral-100 text-neutral-400 hover:bg-white hover:border-brand-red/30'}
                                `}
                            >
                                <span aria-hidden="true">
                                    {rating === 1 && '😔'}
                                    {rating === 2 && '😕'}
                                    {rating === 3 && '😐'}
                                    {rating === 4 && '🙂'}
                                    {rating === 5 && '😄'}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 px-1">
                        <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest">Dissatisfied</span>
                        <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest">Exceptional</span>
                    </div>
                </div>

                {/* Confidence Level */}
                <div className="bg-white rounded-[32px] border border-neutral-100 p-8 shadow-sm">
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-6">Operational Confidence</p>
                    <div className="flex items-center justify-between gap-2" role="radiogroup" aria-label="Confidence rating">
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                                key={rating}
                                role="radio"
                                aria-checked={feedback.confidenceLevel === rating}
                                aria-label={`${rating} out of 5 confidence`}
                                onClick={() => setFeedback(prev => ({ ...prev, confidenceLevel: rating as 1 | 2 | 3 | 4 | 5 }))}
                                className={`
                                    flex-1 h-16 rounded-2xl flex items-center justify-center transition-all border
                                    ${feedback.confidenceLevel === rating
                                        ? 'bg-brand-red border-brand-red text-white shadow-xl -translate-y-1'
                                        : 'bg-neutral-50 border-neutral-100 text-neutral-400 hover:bg-white hover:border-brand-red/30'}
                                `}
                            >
                                <span aria-hidden="true">
                                    {rating === 1 && <Star className="w-6 h-6" />}
                                    {rating === 2 && <Star className="w-6 h-6" />}
                                    {rating === 3 && <Star className="w-6 h-6" />}
                                    {rating === 4 && <Star className="w-6 h-6 fill-current" />}
                                    {rating === 5 && <Sparkles className="w-6 h-6" />}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 px-1">
                        <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest">Uncertain</span>
                        <span className="text-[9px] font-black text-neutral-300 uppercase tracking-widest">Mission Ready</span>
                    </div>
                </div>
            </div>

            {/* Strategic Qualitative Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Friction Points */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] px-2">Operational Friction (Optional)</h4>
                    <div className="relative">
                        <input
                            type="text"
                            value={frictionInput}
                            onChange={(e) => setFrictionInput(e.target.value)}
                            placeholder="Identify institutional bottlenecks..."
                            className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-xs font-bold text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-brand-red focus:bg-white transition-all pr-24"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddFriction()}
                        />
                        <button
                            onClick={handleAddFriction}
                            className="absolute right-2 top-2 bottom-2 px-4 bg-neutral-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-red transition-colors"
                        >
                            Log Point
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Logged friction points">
                        {feedback.frictionPoints?.map((point, i) => (
                            <span key={i} role="listitem" className="px-4 py-2 bg-red-50 text-brand-red border border-red-100 text-[10px] font-black uppercase tracking-widest rounded-xl animate-scale-in">
                                {point}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Highlights */}
                <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] px-2">Institutional Wins (Optional)</h4>
                    <div className="relative">
                        <input
                            type="text"
                            value={highlightInput}
                            onChange={(e) => setHighlightInput(e.target.value)}
                            placeholder="Institutional strengths..."
                            className="w-full px-6 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl text-xs font-bold text-neutral-900 placeholder-neutral-300 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all pr-24"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddHighlight()}
                        />
                        <button
                            onClick={handleAddHighlight}
                            className="absolute right-2 top-2 bottom-2 px-4 bg-neutral-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors"
                        >
                            Log Win
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Logged wins">
                        {feedback.highlights?.map((highlight, i) => (
                            <span key={i} role="listitem" className="px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black uppercase tracking-widest rounded-xl animate-scale-in">
                                {highlight}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={handleSubmitFeedback}
                disabled={!canSubmitFeedback}
                className={`
                    w-full py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 group shadow-xl
                    ${canSubmitFeedback
                        ? 'bg-brand-red text-white hover:bg-red-600 hover:-translate-y-1 active:translate-y-0'
                        : 'bg-neutral-100 text-neutral-300 cursor-not-allowed border border-neutral-200'}
                `}
            >
                Transmit Strategic Feedback <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
        </div>
    );

    const renderGraduationPhase = () => (
        <div className="text-center py-12 space-y-12 animate-fade-in">
            <div className="relative inline-block" role="img" aria-label="Graduation Trophy">
                <div className="w-40 h-40 rounded-full bg-red-50 flex items-center justify-center mx-auto border-2 border-red-100 shadow-2xl relative z-10">
                    <Trophy className="w-20 h-20 text-brand-red animate-bounce-subtle" aria-hidden="true" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-brand-red flex items-center justify-center shadow-xl shadow-red-500/30 z-20 rotate-12" aria-hidden="true">
                    <PartyPopper className="w-8 h-8 text-white" />
                </div>
            </div>

            <div>
                <h2 className="text-4xl font-black text-neutral-900 mb-2 tracking-tight uppercase">Onboarding <span className="text-brand-red">Complete</span></h2>
                <p className="text-sm font-bold text-neutral-400 uppercase tracking-[0.3em]">Institutional Calibration Verified: {user.name}</p>
            </div>

            {/* Badges Earned (Premium Nodes) */}
            <div className="flex items-center justify-center gap-6 flex-wrap" role="list" aria-label="Badges Earned">
                {[
                    { icon: '🚀', label: 'Velocity' },
                    { icon: '🎯', label: 'Precision' },
                    { icon: '🤝', label: 'Synergy' },
                    { icon: '📚', label: 'Fluency' },
                ].map((badge, i) => (
                    <div
                        key={i}
                        role="listitem"
                        className="flex flex-col items-center p-6 bg-white border border-neutral-100 rounded-[28px] shadow-lg shadow-neutral-100/50 hover:shadow-xl hover:-translate-y-2 transition-all w-28 group"
                    >
                        <span className="text-3xl mb-3 group-hover:scale-110 transition-transform" aria-hidden="true">{badge.icon}</span>
                        <span className="text-[10px] font-black text-neutral-900 uppercase tracking-widest">{badge.label}</span>
                    </div>
                ))}
            </div>

            {/* Role Dashboard Teaser (Operational Impact) */}
            <div className="bg-neutral-900 rounded-[48px] border border-neutral-800 p-12 max-w-2xl mx-auto shadow-2xl relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="shrink-0 bg-white/5 p-6 rounded-[32px] border border-white/10">
                        <Rocket className="w-12 h-12 text-brand-red" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white mb-2 uppercase tracking-wide">Role-Specific <span className="text-brand-red">Cockpit</span> Initialized</h3>
                        <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-widest leading-relaxed mb-6">
                            Institutional immersion transitions to operational delivery. Your personalized ecosystem is now active, featuring context-aware intelligence, priority mapping, and strategic growth tracking.
                        </p>
                        <div className="flex items-center gap-3 flex-wrap" role="list" aria-label="Role cockpit features">
                            {['Intelligent Nudges', 'Priority Graph', 'Velocity Analytics'].map((feat, i) => (
                                <span key={i} role="listitem" className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-white uppercase tracking-widest">
                                    {feat}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setPhase('TRANSITION')}
                className="px-12 py-6 bg-brand-red hover:bg-red-600 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl transition-all flex items-center justify-center gap-6 mx-auto shadow-2xl shadow-red-500/20 hover:-translate-y-1 active:translate-y-0 group"
            >
                <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                Activate Daily Protocol
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );

    const renderTransitionPhase = () => (
        <div className="text-center py-24 space-y-12 animate-fade-in">
            <div className="relative inline-block" role="img" aria-label="Calibration icon">
                <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center bg-red-50 border border-red-100 shadow-inner relative z-10">
                    <Sparkles className="w-12 h-12 text-brand-red animate-spin-slow" aria-hidden="true" />
                </div>
                <div className="absolute inset-0 border-2 border-brand-red/20 rounded-full animate-ping scale-110" aria-hidden="true" />
            </div>

            <div className="space-y-4">
                <h2 className="text-3xl font-black text-neutral-900 tracking-tight uppercase">
                    {themeTransitionProgress < 50 ? 'Initializing <span className="text-brand-red">Ecosystem</span>' : 'Calibration <span className="text-brand-red">Finalized</span>'}
                </h2>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] animate-pulse">
                    {themeTransitionProgress < 50
                        ? 'Synthesizing Institutional Context...'
                        : 'Operational Cockpit Ready'}
                </p>
            </div>

            {/* Progress Visualization (Premium) */}
            <div className="max-w-md mx-auto relative px-8" role="progressbar" aria-valuenow={themeTransitionProgress} aria-valuemin={0} aria-valuemax={100} aria-label="Ecosystem activation progress">
                <div className="h-1 bg-neutral-100 rounded-full overflow-hidden mb-4">
                    <div
                        className="h-full transition-all duration-100 bg-brand-red shadow-[0_0_15px_rgba(230,0,0,0.5)]"
                        style={{
                            width: `${themeTransitionProgress}%`,
                        }}
                    />
                </div>
                <div className="flex justify-between items-center text-[9px] font-black text-neutral-300 uppercase tracking-widest" aria-hidden="true">
                    <span>Calibration</span>
                    <span className="text-brand-red">{themeTransitionProgress}%</span>
                    <span>Deployment</span>
                </div>
            </div>
        </div>
    );

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
                                        ? 'bg-neutral-900 text-white shadow-lg -translate-y-0.5'
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
                    {phase === 'OVERVIEW' && renderOverviewPhase()}
                    {phase === 'SIGNOFF' && renderSignoffPhase()}
                    {phase === 'FEEDBACK' && renderFeedbackPhase()}
                    {phase === 'GRADUATION' && renderGraduationPhase()}
                    {phase === 'TRANSITION' && renderTransitionPhase()}
                </div>
            </div>
        </div>
    );
};

export default Day5Graduation;
