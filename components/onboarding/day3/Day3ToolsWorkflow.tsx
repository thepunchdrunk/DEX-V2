
import React, { useState } from 'react';
import {
    Heart,
    Shield,
    Zap,
    Briefcase,
    Check,
    ArrowRight,
    Plane,
    CreditCard,
    Clock,
    DollarSign,
    Lock,
    AlertTriangle,
    Coffee,
    MapPin,
    Wifi
} from 'lucide-react';
import { UserProfile } from '../../../types';
import { PAYROLL_BENEFITS_ITEMS, SAFETY_WELLBEING_ITEMS } from '../../../constants';

interface Day3ToolsWorkflowProps {
    user: UserProfile;
    onComplete: () => void;
}

type Phase = 'FREEDOM' | 'FUEL' | 'GUARDRAILS' | 'FRICTIONLESS';

const Day3ToolsWorkflow: React.FC<Day3ToolsWorkflowProps> = ({ user, onComplete }) => {
    const [phase, setPhase] = useState<Phase>('FREEDOM');

    // Freedom State
    const [policyAccepted, setPolicyAccepted] = useState(false);

    // Fuel State
    const [benefitsReviewed, setBenefitsReviewed] = useState<Set<string>>(new Set());

    // Guardrails State
    const [ethicsQuiz, setEthicsQuiz] = useState<string | null>(null);

    // Frictionless State
    const [logistics, setLogistics] = useState({
        commute: false,
        wifi: false,
        access: false
    });

    const canAdvance = () => {
        if (phase === 'FREEDOM') return policyAccepted;
        if (phase === 'FUEL') return benefitsReviewed.size >= 3; // Review at least 3
        if (phase === 'GUARDRAILS') return ethicsQuiz === 'REPORT';
        if (phase === 'FRICTIONLESS') return Object.values(logistics).every(Boolean);
        return true;
    };

    const handleNext = () => {
        if (phase === 'FREEDOM') setPhase('FUEL');
        else if (phase === 'FUEL') setPhase('GUARDRAILS');
        else if (phase === 'GUARDRAILS') setPhase('FRICTIONLESS');
        else onComplete();
    };

    // Renderers
    const renderFreedom = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Freedom & Responsibility</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    We don't have a 50-page expense policy. We have 5 words:
                    <br /><strong className="text-neutral-900">"Act in the company's best interest."</strong>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        icon: CreditCard,
                        title: 'Spending',
                        desc: 'Buy what you need to do your best work. No approval for <$100.'
                    },
                    {
                        icon: Plane,
                        title: 'Travel',
                        desc: 'Book what makes you productive. Don\'t fly first class unless it\'s overnight.'
                    },
                    {
                        icon: Clock,
                        title: 'Time Off',
                        desc: 'No tracked days. Take what you need to recharge. You are responsible for your output.'
                    },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                        <item.icon className="w-8 h-8 text-purple-600 mb-4" />
                        <h3 className="font-bold text-neutral-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-neutral-500">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="bg-purple-50 border border-purple-100 p-8 rounded-3xl flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-purple-900 mb-1">The Trust Pact</h3>
                    <p className="text-purple-800/80 text-sm">I understand that freedom requires discipline.</p>
                </div>
                <button
                    onClick={() => setPolicyAccepted(true)}
                    className={`
                        px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2
                        ${policyAccepted
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-purple-600 border border-purple-200 hover:bg-purple-100'}
                    `}
                >
                    {policyAccepted ? <Check className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                    {policyAccepted ? 'Accepted' : 'Accept'}
                </button>
            </div>
        </div>
    );

    const renderFuel = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">High-Performance Fuel</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    You are an industrial athlete. These benefits exist to keep you at your peak.
                    Review the essentials to proceed.
                </p>
            </div>

            <div className="space-y-3">
                {PAYROLL_BENEFITS_ITEMS.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setBenefitsReviewed(prev => new Set([...prev, item.id]))}
                        className={`
                            p-5 rounded-2xl border cursor-pointer transition-all flex items-center gap-6 group
                            ${benefitsReviewed.has(item.id)
                                ? 'bg-emerald-50 border-emerald-100'
                                : 'bg-white border-neutral-200 hover:border-brand-red/30'}
                        `}
                    >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${benefitsReviewed.has(item.id) ? 'bg-emerald-200 text-emerald-700' : 'bg-neutral-100 text-neutral-400'}`}>
                            {item.category === 'PAYROLL' && <DollarSign className="w-5 h-5" />}
                            {item.category === 'INSURANCE' && <Heart className="w-5 h-5" />}
                            {item.category === 'TAX' && <Briefcase className="w-5 h-5" />}
                            {/* Fallback */}
                            {!['PAYROLL', 'INSURANCE', 'TAX'].includes(item.category) && <Zap className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-neutral-900">{item.title}</h4>
                            <p className="text-xs text-neutral-500">{item.description}</p>
                        </div>
                        {benefitsReviewed.has(item.id) ? <Check className="w-5 h-5 text-emerald-600" /> : <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-brand-red" />}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderGuardrails = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">The Third Rail</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    We move fast, but we never compromise on integrity.
                    These are the few rules that are non-negotiable.
                </p>
            </div>

            <div className="bg-red-50 border border-red-100 p-8 rounded-3xl">
                <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                    <h3 className="text-xl font-bold text-red-900">Ethics Scenario</h3>
                </div>
                <p className="text-red-900/80 mb-6 text-lg font-medium">
                    A vendor offers you tickets to a sold-out concert "just as a thank you."
                    We are currently renegotiating their contract. What do you do?
                </p>

                <div className="grid grid-cols-1 gap-3">
                    {[
                        { id: 'TAKE', label: 'Take them, but promise it won\'t affect the deal.' },
                        { id: 'MANAGER', label: 'Ask your manager if it\'s okay.' },
                        { id: 'REPORT', label: 'Decline and log it in the gift registry.' },
                    ].map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => setEthicsQuiz(opt.id)}
                            className={`
                                w-full text-left p-4 rounded-xl font-medium transition-all flex items-center justify-between border
                                ${ethicsQuiz === opt.id
                                    ? (opt.id === 'REPORT' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-red-600 text-white border-red-600')
                                    : 'bg-white text-red-900 border-red-200 hover:bg-red-100'}
                            `}
                        >
                            {opt.label}
                            {ethicsQuiz === opt.id && (opt.id === 'REPORT' ? <Check className="w-5 h-5" /> : <span className="text-xl">×</span>)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-50 rounded-xl flex items-center gap-3 border border-neutral-200">
                    <Lock className="w-5 h-5 text-neutral-400" />
                    <div>
                        <h4 className="font-bold text-sm text-neutral-900">Data Privacy</h4>
                        <p className="text-xs text-neutral-500">Review Policy</p>
                    </div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl flex items-center gap-3 border border-neutral-200">
                    <Shield className="w-5 h-5 text-neutral-400" />
                    <div>
                        <h4 className="font-bold text-sm text-neutral-900">Security</h4>
                        <p className="text-xs text-neutral-500">2FA Enabled</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderFrictionless = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Zero Friction</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    We've handled the logistics so you can focus on the work.
                </p>
            </div>

            <div className="space-y-4">
                {[
                    { id: 'commute', icon: MapPin, label: 'Commute & Parking', desc: 'Pass assigned to your badge.' },
                    { id: 'wifi', icon: Wifi, label: 'Campus Wi-Fi', desc: 'Auto-connect profile installed.' },
                    { id: 'access', icon: Lock, label: 'Building Access', desc: '24/7 access enabled.' },
                ].map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setLogistics(prev => ({ ...prev, [item.id]: true }))}
                        className={`
                            p-6 rounded-2xl border cursor-pointer transition-all flex items-center justify-between group
                            ${logistics[item.id as keyof typeof logistics]
                                ? 'bg-indigo-50 border-indigo-100'
                                : 'bg-white border-neutral-200 hover:border-brand-red/30'}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${logistics[item.id as keyof typeof logistics] ? 'bg-indigo-200 text-indigo-700' : 'bg-neutral-100 text-neutral-500'}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900">{item.label}</h4>
                                <p className="text-sm text-neutral-500">{item.desc}</p>
                            </div>
                        </div>
                        {logistics[item.id as keyof typeof logistics] ? <Check className="w-6 h-6 text-indigo-600" /> : <div className="w-6 h-6 rounded-full border-2 border-neutral-200" />}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-neutral-50 border-r border-neutral-200 p-6 flex flex-col">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-6">The OS</h3>
                <div className="space-y-2">
                    {[
                        { id: 'FREEDOM', label: 'Freedom & Trust' },
                        { id: 'FUEL', label: 'High-Performance Fuel' },
                        { id: 'GUARDRAILS', label: 'The Third Rail' },
                        { id: 'FRICTIONLESS', label: 'Zero Friction' },
                    ].map((step, i) => {
                        const isActive = phase === step.id;
                        const isCompleted = ['FREEDOM', 'FUEL', 'GUARDRAILS', 'FRICTIONLESS'].indexOf(phase) > i;

                        return (
                            <button
                                key={step.id}
                                onClick={() => setPhase(step.id as Phase)}
                                className={`
                                    w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between
                                    ${isActive ? 'bg-white shadow-sm text-purple-600 ring-1 ring-purple-100' : isCompleted ? 'text-emerald-600' : 'text-neutral-400 hover:bg-neutral-100'}
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
            <div className="flex-1 p-8 md:p-12 flex flex-col">
                <div className="flex-1">
                    {phase === 'FREEDOM' && renderFreedom()}
                    {phase === 'FUEL' && renderFuel()}
                    {phase === 'GUARDRAILS' && renderGuardrails()}
                    {phase === 'FRICTIONLESS' && renderFrictionless()}
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-100 flex justify-end">
                    <button
                        onClick={handleNext}
                        disabled={!canAdvance()}
                        className={`
                            px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all
                            ${canAdvance()
                                ? 'bg-neutral-900 text-white hover:bg-black hover:-translate-y-1 shadow-lg'
                                : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                        `}
                    >
                        {phase === 'FRICTIONLESS' ? 'Complete Day 3' : 'Next Step'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Day3ToolsWorkflow;
