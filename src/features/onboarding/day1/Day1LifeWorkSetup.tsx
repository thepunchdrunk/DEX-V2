import React, { useState, useEffect } from 'react';
import {
    Check,
    Circle,
    Loader2,
    AlertCircle,
    ChevronRight,
    Laptop,
    Key,
    Shield,
    Calendar,
    Wallet,
    Building2,
    Lock,
    ArrowLeft,
    Sparkles,
    Car,
    Utensils,
    Wifi,
    Receipt,
    Heart,
    FileSignature,
    CheckCircle2,
    Play,
    AlertTriangle,
    MapPin,
} from 'lucide-react';
import {
    UserProfile,
    GreenLightCheck,
    DigitalProfile,
    SystemCheckStatus,
    Day1ModuleId,
    WorkEssential,
    DailyLifeLogistic,
    PayrollBenefitsItem,
    DigitalReadinessItem,
    SafetyWellbeingItem,
    PrivacySettings,
} from '@/types';
import {
    GREEN_LIGHT_CHECKS,
    WORK_ESSENTIALS,
    DAILY_LIFE_LOGISTICS,
    PAYROLL_BENEFITS_ITEMS,
    DIGITAL_READINESS_ITEMS,
    SAFETY_WELLBEING_ITEMS,
} from '@/config/constants';
import OnboardingFeed, { OnboardingCard } from '../shared/OnboardingFeed';

interface Day1LifeWorkSetupProps {
    user: UserProfile;
    onComplete: () => void;
}

const Day1LifeWorkSetup: React.FC<Day1LifeWorkSetupProps> = ({
    user,
    onComplete,
}) => {
    // State for each module
    const [checks, setChecks] = useState<GreenLightCheck[]>(
        GREEN_LIGHT_CHECKS.filter(item => !item.roleCategories || (user.roleCategory && item.roleCategories.includes(user.roleCategory)))
    );
    const [workEssentials, setWorkEssentials] = useState<WorkEssential[]>(
        WORK_ESSENTIALS.filter(item => !item.roleCategories || (user.roleCategory && item.roleCategories.includes(user.roleCategory)))
    );
    const [dailyLogistics, setDailyLogistics] = useState<DailyLifeLogistic[]>(DAILY_LIFE_LOGISTICS);
    const [payrollBenefits, setPayrollBenefits] = useState<PayrollBenefitsItem[]>(PAYROLL_BENEFITS_ITEMS);
    const [digitalReadiness, setDigitalReadiness] = useState<DigitalReadinessItem[]>(
        DIGITAL_READINESS_ITEMS.filter(item => !item.roleCategories || (user.roleCategory && item.roleCategories.includes(user.roleCategory)))
    );
    const [safetyWellbeing, setSafetyWellbeing] = useState<SafetyWellbeingItem[]>(
        SAFETY_WELLBEING_ITEMS.filter(item => !item.roleCategories || (user.roleCategory && item.roleCategories.includes(user.roleCategory)))
    );
    const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
        learningVisibility: 'VISIBLE',
        behaviorTracking: true,
        dataRetentionAcknowledged: false,
        lastUpdated: new Date().toISOString(),
    });

    // Active module state (Focus Mode)
    const [activeModuleId, setActiveModuleId] = useState<Day1ModuleId | null>(null);
    const [activeDemo, setActiveDemo] = useState<string | null>(null);
    const [demoStep, setDemoStep] = useState(0);

    // Simulate system checks
    useEffect(() => {
        const pending = checks.filter((c) => c.status === 'PENDING' || c.status === 'CHECKING');
        if (pending.length === 0) return;

        const timer = setTimeout(() => {
            setChecks((prev) =>
                prev.map((check) => {
                    if (check.status === 'PENDING') {
                        return { ...check, status: 'CHECKING' as SystemCheckStatus };
                    }
                    if (check.status === 'CHECKING') {
                        const pass = Math.random() > 0.1;
                        return { ...check, status: (pass ? 'PASS' : 'FAIL') as SystemCheckStatus };
                    }
                    return check;
                })
            );
        }, 800);

        return () => clearTimeout(timer);
    }, [checks]);

    // Module completion calculations
    const greenLightComplete = checks.every(c => c.status === 'PASS');
    const workEssentialsComplete = workEssentials.every(w => w.completed);
    const dailyLogisticsComplete = dailyLogistics.every(d => d.status === 'COMPLETED');
    const payrollBenefitsComplete = payrollBenefits.every(p => p.completed);
    const digitalReadinessComplete = digitalReadiness.every(d => d.status === 'VERIFIED');
    const safetyWellbeingComplete = safetyWellbeing.every(s => s.acknowledged);
    const privacyComplete = privacySettings.dataRetentionAcknowledged;

    const allModulesComplete =
        greenLightComplete &&
        workEssentialsComplete &&
        dailyLogisticsComplete &&
        payrollBenefitsComplete &&
        digitalReadinessComplete &&
        safetyWellbeingComplete &&
        privacyComplete;

    // handlers
    const handleStartDemo = (itemId: string) => {
        setActiveDemo(itemId);
        setDemoStep(0);
    };

    const handleDemoNext = (item: WorkEssential) => {
        if (item.demoSteps && demoStep < item.demoSteps.length - 1) {
            setDemoStep(prev => prev + 1);
        } else {
            setWorkEssentials(prev => prev.map(w =>
                w.id === item.id ? { ...w, completed: true } : w
            ));
            setActiveDemo(null);
            setDemoStep(0);
        }
    };

    const handleCompleteLogistic = (id: string) => {
        setDailyLogistics(prev => prev.map(d =>
            d.id === id ? { ...d, status: 'COMPLETED' } : d
        ));
    };

    const handleCompletePayroll = (id: string) => {
        setPayrollBenefits(prev => prev.map(p =>
            p.id === id ? { ...p, completed: true, signedAt: p.requiresSignature ? new Date().toISOString() : undefined } : p
        ));
    };

    const handleVerifyDigital = (id: string) => {
        setDigitalReadiness(prev => prev.map(d =>
            d.id === id ? { ...d, status: 'VERIFIED', verifiedAt: new Date().toISOString() } : d
        ));
    };

    const handleAcknowledgeSafety = (id: string) => {
        setSafetyWellbeing(prev => prev.map(s =>
            s.id === id ? { ...s, acknowledged: true, acknowledgedAt: new Date().toISOString() } : s
        ));
    };

    // Sub-renderers for Focused View
    const renderGreenLightModule = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
                {checks.map((check) => (
                    <div
                        key={check.id}
                        className={`
                            flex items-center gap-5 p-5 rounded-2xl border transition-all
                            ${check.status === 'PASS' ? 'bg-white border-neutral-100 shadow-sm' : ''}
                            ${check.status === 'FAIL' ? 'bg-red-50/50 border-red-100' : ''}
                            ${check.status === 'CHECKING' ? 'bg-neutral-50 border-neutral-200' : ''}
                            ${check.status === 'PENDING' ? 'bg-neutral-50/30 border-dashed border-neutral-200' : ''}
                        `}
                    >
                        <div className={`
                            w-10 h-10 rounded-xl flex items-center justify-center text-lg
                            ${check.status === 'PASS' ? 'bg-emerald-50 text-emerald-600' : ''}
                            ${check.status === 'FAIL' ? 'bg-red-100 text-brand-red' : ''}
                            ${check.status === 'CHECKING' ? 'bg-neutral-100 text-neutral-400' : ''}
                            ${check.status === 'PENDING' ? 'bg-white text-neutral-200' : ''}
                        `}>
                            {check.icon}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-sm text-neutral-900">{check.label}</p>
                            <p className="text-xs text-neutral-500">{check.details}</p>
                        </div>
                        {check.status === 'PASS' && <Check className="w-5 h-5 text-emerald-500" />}
                        {check.status === 'FAIL' && <AlertCircle className="w-5 h-5 text-brand-red" />}
                        {check.status === 'CHECKING' && <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" />}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderWorkEssentialsModule = () => (
        <div className="space-y-4">
            {workEssentials.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-neutral-100 p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${item.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-50 text-neutral-500'}`}>
                                {item.category === 'LEAVE' && <Calendar className="w-6 h-6" />}
                                {item.category === 'EXPENSES' && <Receipt className="w-6 h-6" />}
                                {item.category === 'HOLIDAY_CALENDAR' && <Calendar className="w-6 h-6" />}
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900">{item.title}</h4>
                                <p className="text-xs text-neutral-500 mt-1">{item.description}</p>
                            </div>
                        </div>
                        {item.completed && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                    </div>

                    {!item.completed && (
                        <div className="pl-[72px]">
                            {item.interactiveDemo ? (
                                <button
                                    onClick={() => handleStartDemo(item.id)}
                                    className="btn-primary py-2 px-4 text-xs flex items-center gap-2"
                                >
                                    <Play className="w-3 h-3" /> Start Demo
                                </button>
                            ) : (
                                <button
                                    onClick={() => setWorkEssentials(prev => prev.map(w => w.id === item.id ? { ...w, completed: true } : w))}
                                    className="btn-secondary py-2 px-4 text-xs"
                                >
                                    Mark as Complete
                                </button>
                            )}
                        </div>
                    )}

                    {/* Demo Overlay */}
                    {activeDemo === item.id && item.demoSteps && (
                        <div className="mt-6 p-6 bg-neutral-50 rounded-xl border border-neutral-200 animate-slide-down">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-brand-red transition-all duration-500"
                                        style={{ width: `${((demoStep + 1) / item.demoSteps.length) * 100}%` }}
                                    />
                                </div>
                                <span className="text-[10px] font-bold text-neutral-500 uppercase">
                                    Step {demoStep + 1}/{item.demoSteps.length}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-neutral-900 mb-6">{item.demoSteps[demoStep]}</p>
                            <button
                                onClick={() => handleDemoNext(item)}
                                className="w-full py-3 bg-neutral-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
                            >
                                {demoStep < item.demoSteps.length - 1 ? 'Next Step' : 'Finish'}
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const renderDailyLogisticsModule = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dailyLogistics.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-neutral-100 flex flex-col justify-between">
                    <div className="flex items-start gap-4 mb-4">
                        <div className={`p-2.5 rounded-lg ${item.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-50 text-neutral-500'}`}>
                            {item.category === 'COMMUTE' && <Car className="w-5 h-5" />}
                            {item.category === 'PARKING' && <Car className="w-5 h-5" />}
                            {item.category === 'CANTEEN' && <Utensils className="w-5 h-5" />}
                            {item.category === 'FACILITIES' && <Building2 className="w-5 h-5" />}
                            {item.category === 'WIFI_PRINTER' && <Wifi className="w-5 h-5" />}
                        </div>
                        <div>
                            <p className="font-bold text-sm text-neutral-900">{item.title}</p>
                            <p className="text-xs text-neutral-500 mt-1">{item.description}</p>
                        </div>
                    </div>

                    {item.status === 'COMPLETED' ? (
                        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 py-2 px-3 rounded-lg self-start">
                            <Check className="w-3 h-3" /> Configured
                        </div>
                    ) : (
                        <button
                            onClick={() => handleCompleteLogistic(item.id)}
                            className="btn-secondary w-full py-2 text-xs"
                        >
                            {item.actionLabel || 'Configure'}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );

    const renderPayrollBenefitsModule = () => (
        <div className="space-y-4">
            {payrollBenefits.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-neutral-100 flex items-center justify-between group hover:border-brand-red/20 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${item.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                            {item.category === 'PAYROLL' && <Wallet className="w-6 h-6" />}
                            {item.category === 'INSURANCE' && <Heart className="w-6 h-6" />}
                            {item.category === 'DEPENDENT' && <Heart className="w-6 h-6" />}
                            {item.category === 'CLAIMS' && <Receipt className="w-6 h-6" />}
                            {item.category === 'TAX' && <FileSignature className="w-6 h-6" />}
                        </div>
                        <div>
                            <p className="font-bold text-neutral-900">{item.title}</p>
                            <p className="text-xs text-neutral-500">{item.description}</p>
                        </div>
                    </div>
                    {item.completed ? (
                        <div className="bg-emerald-50 text-emerald-600 p-2 rounded-full">
                            <Check className="w-5 h-5" />
                        </div>
                    ) : (
                        <button
                            onClick={() => handleCompletePayroll(item.id)}
                            className="btn-primary py-2 px-6 text-xs"
                        >
                            {item.requiresSignature ? 'Sign' : 'Activate'}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );

    const renderDigitalReadinessModule = () => (
        <div className="space-y-4">
            {digitalReadiness.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${item.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-100 text-neutral-500'}`}>
                            <Key className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-bold text-neutral-900">{item.title}</p>
                            <p className="text-xs text-neutral-500">{item.description}</p>
                        </div>
                    </div>
                    {item.status === 'VERIFIED' ? (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Verified
                        </span>
                    ) : (
                        <button
                            onClick={() => handleVerifyDigital(item.id)}
                            className="btn-primary py-2 px-6 text-xs"
                        >
                            Sync Identity
                        </button>
                    )}
                </div>
            ))}
        </div>
    );

    const renderSafetyWellbeingModule = () => (
        <div className="grid grid-cols-1 gap-4">
            {safetyWellbeing.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${item.acknowledged ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-brand-red'}`}>
                            {item.category === 'EMERGENCY' && <AlertTriangle className="w-6 h-6" />}
                            {item.category === 'EVACUATION' && <MapPin className="w-6 h-6" />}
                            {item.category === 'HEALTH' && <Heart className="w-6 h-6" />}
                            {item.category === 'ACCESSIBILITY' && <Shield className="w-6 h-6" />}
                        </div>
                        <div>
                            <p className="font-bold text-neutral-900">{item.title}</p>
                            <p className="text-xs text-neutral-500">{item.description}</p>
                        </div>
                    </div>
                    {!item.acknowledged && (
                        <button
                            onClick={() => handleAcknowledgeSafety(item.id)}
                            className="btn-secondary py-2 px-6 text-xs hover:bg-red-50 hover:text-brand-red hover:border-red-200"
                        >
                            Acknowledge
                        </button>
                    )}
                    {item.acknowledged && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                </div>
            ))}
        </div>
    );

    const renderPrivacyModule = () => (
        <div className="space-y-8">
            <div className="bg-neutral-900 rounded-2xl p-6 text-white text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-brand-red" />
                <h4 className="text-lg font-bold mb-2">Data Sovereignty</h4>
                <p className="text-sm text-neutral-400 max-w-md mx-auto">
                    Your data is used solely to optimize your onboarding and work experience.
                    We do not sell or share your personal performance metrics with third parties.
                </p>
            </div>

            <button
                onClick={() => setPrivacySettings(prev => ({ ...prev, dataRetentionAcknowledged: true }))}
                disabled={privacySettings.dataRetentionAcknowledged}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all
                    ${privacySettings.dataRetentionAcknowledged
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-brand-red text-white hover:shadow-lg hover:shadow-red-500/20'}
                `}
            >
                {privacySettings.dataRetentionAcknowledged ? 'Privacy Policy Accepted' : 'Accept Privacy & Data Policy'}
            </button>
        </div>
    );

    const renderActiveModule = () => {
        let content = null;
        let title = '';
        let description = '';

        switch (activeModuleId) {
            case 'GREEN_LIGHT':
                title = 'System Check';
                description = 'Verify your hardware, software, and access rights.';
                content = renderGreenLightModule();
                break;
            case 'WORK_ESSENTIALS':
                title = 'My Software';
                description = 'Setup leave, expenses, and other core administrative tasks.';
                content = renderWorkEssentialsModule();
                break;
            case 'DAILY_LOGISTICS':
                title = 'Workplace Info';
                description = 'Transport, parking, and facility access.';
                content = renderDailyLogisticsModule();
                break;
            case 'PAYROLL_BENEFITS':
                title = 'Pay & Benefits';
                description = 'Ensure you get paid and have access to health benefits.';
                content = renderPayrollBenefitsModule();
                break;
            case 'DIGITAL_READINESS':
                title = 'Account Access';
                description = 'Setup MFA, SSO, and email signatures.';
                content = renderDigitalReadinessModule();
                break;
            case 'SAFETY_WELLBEING':
                title = 'Safety Info';
                description = 'Emergency contacts and health resources.';
                content = renderSafetyWellbeingModule();
                break;
            case 'PRIVACY_SETTINGS':
                title = 'Privacy';
                description = 'Manage your data visibility and permissions.';
                content = renderPrivacyModule();
                break;
        }

        return (
            <div className="animate-fade-in">
                <button
                    onClick={() => setActiveModuleId(null)}
                    className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6 font-medium text-sm transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Essentials
                </button>

                <div className="mb-8">
                    <h2 className="text-3xl font-black text-neutral-900 mb-2">{title}</h2>
                    <p className="text-neutral-500 text-lg">{description}</p>
                </div>

                <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-100/50 p-8">
                    {content}
                </div>
            </div>
        );
    };

    // Feed Data Map
    const checkProgress = (curr: number, total: number) => Math.round((curr / total) * 100);

    const feedCards: OnboardingCard[] = [
        {
            id: 'GREEN_LIGHT',
            title: 'System Check',
            description: 'Verify your hardware, software, and facility access.',
            icon: <Laptop className="w-5 h-5" />,
            status: greenLightComplete ? 'COMPLETED' : 'AVAILABLE',
            type: 'SETUP',
            progress: checkProgress(checks.filter(c => c.status === 'PASS').length, checks.length),
            estimatedTime: '5 min',
            onAction: () => setActiveModuleId('GREEN_LIGHT'),
            actionLabel: 'Run Checks',
            explainer: 'We automagically verify your laptop and account access to ensure you are ready to work immediately.'
        },
        {
            id: 'WORK_ESSENTIALS',
            title: 'My Software',
            description: 'Configure leave, expenses, and holiday calendars.',
            icon: <Calendar className="w-5 h-5" />,
            status: workEssentialsComplete ? 'COMPLETED' : 'AVAILABLE',
            type: 'ACTION',
            progress: checkProgress(workEssentials.filter(w => w.completed).length, workEssentials.length),
            estimatedTime: '15 min',
            onAction: () => setActiveModuleId('WORK_ESSENTIALS'),
            actionLabel: 'Configure',
            explainer: 'Set up the boring but necessary admin tasks so you never have to think about them again.'
        },
        {
            id: 'DAILY_LOGISTICS',
            title: 'Workplace Info',
            description: 'Parking, commute, and facility details.',
            icon: <Building2 className="w-5 h-5" />,
            status: dailyLogisticsComplete ? 'COMPLETED' : 'AVAILABLE',
            type: 'SETUP',
            progress: checkProgress(dailyLogistics.filter(d => d.status === 'COMPLETED').length, dailyLogistics.length),
            estimatedTime: '10 min',
            onAction: () => setActiveModuleId('DAILY_LOGISTICS'),
            actionLabel: 'Set Preferences',
        },
        {
            id: 'PAYROLL_BENEFITS',
            title: 'Pay & Benefits',
            description: 'Bank details, tax forms, and insurance setup.',
            icon: <Wallet className="w-5 h-5" />,
            status: payrollBenefitsComplete ? 'COMPLETED' : 'AVAILABLE',
            type: 'SETUP',
            progress: checkProgress(payrollBenefits.filter(p => p.completed).length, payrollBenefits.length),
            estimatedTime: '20 min',
            onAction: () => setActiveModuleId('PAYROLL_BENEFITS'),
            actionLabel: 'Setup Payroll',
        },
        {
            id: 'DIGITAL_READINESS',
            title: 'Account Access',
            description: 'MFA, SSO, and profile configuration.',
            icon: <Key className="w-5 h-5" />,
            status: digitalReadinessComplete ? 'COMPLETED' : 'AVAILABLE',
            type: 'SETUP',
            progress: checkProgress(digitalReadiness.filter(d => d.status === 'VERIFIED').length, digitalReadiness.length),
            estimatedTime: '5 min',
            onAction: () => setActiveModuleId('DIGITAL_READINESS'),
            actionLabel: 'Sync Identity',
        },
        {
            id: 'SAFETY_WELLBEING',
            title: 'Safety Info',
            description: 'Emergency protocols and health resources.',
            icon: <Shield className="w-5 h-5" />,
            status: safetyWellbeingComplete ? 'COMPLETED' : 'AVAILABLE',
            type: 'LEARNING',
            progress: checkProgress(safetyWellbeing.filter(s => s.acknowledged).length, safetyWellbeing.length),
            estimatedTime: '10 min',
            onAction: () => setActiveModuleId('SAFETY_WELLBEING'),
            actionLabel: 'Review Protocols',
        },
        {
            id: 'PRIVACY_SETTINGS',
            title: 'Privacy',
            description: 'Control your data usage and visibility.',
            icon: <Lock className="w-5 h-5" />,
            status: privacyComplete ? 'COMPLETED' : 'AVAILABLE',
            type: 'SETUP',
            estimatedTime: '2 min',
            onAction: () => setActiveModuleId('PRIVACY_SETTINGS'),
            actionLabel: 'Review Settings',
        }
    ];

    if (activeModuleId) {
        return renderActiveModule();
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">
                    Setup & Access
                </h1>
                <p className="text-neutral-500">
                    Let's get the housekeeping out of the way so you can focus on impact.
                </p>
            </div>

            <OnboardingFeed
                cards={feedCards}
                onCardAction={(id) => setActiveModuleId(id as Day1ModuleId)}
            />

            <div className="pt-8 flex justify-center border-t border-neutral-100 mt-8">
                <button
                    onClick={onComplete}
                    disabled={!allModulesComplete}
                    className={`
                        px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2
                        ${allModulesComplete
                            ? 'bg-brand-red text-white shadow-lg hover:shadow-red-500/30 hover:-translate-y-1'
                            : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'}
                    `}
                >
                    {allModulesComplete ? 'Complete Day 1' : `Complete All Modules (${feedCards.filter(c => c.status === 'COMPLETED').length}/7)`}
                    {allModulesComplete && <ChevronRight className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

export default Day1LifeWorkSetup;
