import React, { useState, useEffect } from 'react';
import {
    Check,
    Circle,
    Loader2,
    AlertCircle,
    ChevronRight,
    ChevronDown,
    Laptop,
    Key,
    MapPin,
    Shield,
    Calendar,
    Receipt,
    Car,
    Utensils,
    Building2,
    Wifi,
    Wallet,
    Heart,
    Lock,
    FileSignature,
    AlertTriangle,
    Eye,
    EyeOff,
    Play,
    CheckCircle2,
    Sparkles,
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
} from '../../../types';
import {
    GREEN_LIGHT_CHECKS,
    DAY1_MODULES,
    WORK_ESSENTIALS,
    DAILY_LIFE_LOGISTICS,
    PAYROLL_BENEFITS_ITEMS,
    DIGITAL_READINESS_ITEMS,
    SAFETY_WELLBEING_ITEMS,
} from '../../../constants';

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

    // Active module and demo states
    const [activeModule, setActiveModule] = useState<Day1ModuleId>('GREEN_LIGHT');
    const [activeDemo, setActiveDemo] = useState<string | null>(null);
    const [demoStep, setDemoStep] = useState(0);
    const [profile, setProfile] = useState<DigitalProfile>({
        displayName: user.name,
        pronouns: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        workStyle: 'FLEXIBLE',
        communicationPreference: 'SLACK',
        bio: '',
    });

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

    const moduleProgress: Record<Day1ModuleId, { complete: boolean; progress: number }> = {
        GREEN_LIGHT: {
            complete: greenLightComplete,
            progress: checks.filter(c => c.status === 'PASS').length / checks.length * 100
        },
        WORK_ESSENTIALS: {
            complete: workEssentialsComplete,
            progress: workEssentials.filter(w => w.completed).length / workEssentials.length * 100
        },
        DAILY_LOGISTICS: {
            complete: dailyLogisticsComplete,
            progress: dailyLogistics.filter(d => d.status === 'COMPLETED').length / dailyLogistics.length * 100
        },
        PAYROLL_BENEFITS: {
            complete: payrollBenefitsComplete,
            progress: payrollBenefits.filter(p => p.completed).length / payrollBenefits.length * 100
        },
        DIGITAL_READINESS: {
            complete: digitalReadinessComplete,
            progress: digitalReadiness.filter(d => d.status === 'VERIFIED').length / digitalReadiness.length * 100
        },
        SAFETY_WELLBEING: {
            complete: safetyWellbeingComplete,
            progress: safetyWellbeing.filter(s => s.acknowledged).length / safetyWellbeing.length * 100
        },
        PRIVACY_SETTINGS: {
            complete: privacyComplete,
            progress: privacyComplete ? 100 : 0
        },
    };

    const allModulesComplete = Object.values(moduleProgress).every(m => m.complete);
    const completedModulesCount = Object.values(moduleProgress).filter(m => m.complete).length;

    const getModuleIcon = (id: Day1ModuleId, size = 5) => {
        const iconClass = `w-${size} h-${size}`;
        switch (id) {
            case 'GREEN_LIGHT': return <Sparkles className={iconClass} />;
            case 'WORK_ESSENTIALS': return <Calendar className={iconClass} />;
            case 'DAILY_LOGISTICS': return <Building2 className={iconClass} />;
            case 'PAYROLL_BENEFITS': return <Wallet className={iconClass} />;
            case 'DIGITAL_READINESS': return <Key className={iconClass} />;
            case 'SAFETY_WELLBEING': return <Shield className={iconClass} />;
            case 'PRIVACY_SETTINGS': return <Lock className={iconClass} />;
        }
    };

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

    const renderModuleContent = () => {
        switch (activeModule) {
            case 'GREEN_LIGHT':
                return renderGreenLightModule();
            case 'WORK_ESSENTIALS':
                return renderWorkEssentialsModule();
            case 'DAILY_LOGISTICS':
                return renderDailyLogisticsModule();
            case 'PAYROLL_BENEFITS':
                return renderPayrollBenefitsModule();
            case 'DIGITAL_READINESS':
                return renderDigitalReadinessModule();
            case 'SAFETY_WELLBEING':
                return renderSafetyWellbeingModule();
            case 'PRIVACY_SETTINGS':
                return renderPrivacyModule();
        }
    };

    const renderGreenLightModule = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-black text-neutral-900 tracking-tight">System Synergy Scan</h3>
                    <p className="text-xs text-neutral-400 font-medium mt-1">Real-time verification of your operational environment</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                        {checks.filter(c => c.status === 'PASS').length} / {checks.length} CALIBRATED
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list" aria-label="System certification items">
                {checks.map((check) => (
                    <div
                        key={check.id}
                        role="listitem"
                        aria-label={`${check.label}: ${check.status}. ${check.details}`}
                        className={`
                            group flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300
                            ${check.status === 'PASS' ? 'bg-white border-neutral-100 shadow-sm' : ''}
                            ${check.status === 'FAIL' ? 'bg-red-50/50 border-red-100' : ''}
                            ${check.status === 'CHECKING' ? 'bg-neutral-50 border-neutral-200' : ''}
                            ${check.status === 'PENDING' ? 'bg-neutral-50/30 border-dashed border-neutral-200' : ''}
                        `}
                    >
                        <div className={`
                            w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110
                            ${check.status === 'PASS' ? 'bg-emerald-50 text-emerald-600' : ''}
                            ${check.status === 'FAIL' ? 'bg-brand-red/10 text-brand-red' : ''}
                            ${check.status === 'CHECKING' ? 'bg-neutral-100 text-neutral-400' : ''}
                            ${check.status === 'PENDING' ? 'bg-white text-neutral-200' : ''}
                        `} aria-hidden="true">
                            {check.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold ${check.status === 'PASS' ? 'text-neutral-900' : 'text-neutral-500'}`}>{check.label}</p>
                            <p className="text-[10px] text-neutral-400 font-medium truncate mt-0.5 uppercase tracking-tighter">{check.details}</p>
                        </div>
                        {check.status === 'PASS' && <div className="p-1 bg-emerald-50 rounded-full" aria-hidden="true"><Check className="w-4 h-4 text-emerald-600" /></div>}
                        {check.status === 'FAIL' && <AlertCircle className="w-5 h-5 text-brand-red animate-pulse" aria-hidden="true" />}
                        {check.status === 'CHECKING' && <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" aria-hidden="true" />}
                        {check.status === 'PENDING' && <Circle className="w-5 h-5 text-neutral-200" aria-hidden="true" />}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderWorkEssentialsModule = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Protocols</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Master the internal mechanics of time management, fiscal responsibility, and local institutional traditions.
                </p>
            </div>

            <div className="space-y-4" role="list" aria-label="Institutional protocol items">
                {workEssentials.map((item) => (
                    <div key={item.id} role="listitem" className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden group hover:border-brand-red/20 transition-colors">
                        <div className="p-6 flex items-center gap-6">
                            <div className={`
                                w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105
                                ${item.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-50 text-neutral-400'}
                            `} aria-hidden="true">
                                {item.category === 'LEAVE' && <Calendar className="w-7 h-7" />}
                                {item.category === 'EXPENSES' && <Receipt className="w-7 h-7" />}
                                {item.category === 'HOLIDAY_CALENDAR' && <Calendar className="w-7 h-7" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <p className="font-bold text-neutral-900">{item.title}</p>
                                    {item.completed && <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Validated</span>}
                                </div>
                                <p className="text-xs text-neutral-500 font-medium leading-relaxed">{item.description}</p>
                            </div>

                            {!item.completed && (
                                <div className="flex items-center">
                                    {item.interactiveDemo ? (
                                        <button
                                            onClick={() => handleStartDemo(item.id)}
                                            aria-label={`Start interactive demo for ${item.title}`}
                                            className="btn-primary flex items-center gap-2 py-2 px-6"
                                        >
                                            <Play className="w-3.5 h-3.5" aria-hidden="true" />
                                            <span className="text-[10px] uppercase font-black tracking-widest">Load Demo</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setWorkEssentials(prev => prev.map(w => w.id === item.id ? { ...w, completed: true } : w))}
                                            aria-label={`Complete ${item.title}`}
                                            className="btn-secondary py-2 px-6 text-[10px] uppercase font-black tracking-widest"
                                        >
                                            Complete
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Interactive Simulation Layer */}
                        {activeDemo === item.id && item.demoSteps && (
                            <div className="p-8 bg-neutral-50/50 border-t border-neutral-100 animate-slide-down" role="region" aria-label={`${item.title} Demo Simulation`}>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={demoStep + 1} aria-valuemin={1} aria-valuemax={item.demoSteps.length}>
                                        <div
                                            className="h-full bg-brand-red transition-all duration-1000 ease-out shadow-lg shadow-red-500/20"
                                            style={{ width: `${((demoStep + 1) / item.demoSteps.length) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-black text-brand-red uppercase tracking-widest whitespace-nowrap">
                                        Protocol Step {demoStep + 1} / {item.demoSteps.length}
                                    </span>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm mb-6 flex gap-4 items-start" role="status">
                                    <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                                        <Sparkles className="w-5 h-5 text-brand-red" />
                                    </div>
                                    <p className="text-sm text-neutral-700 font-medium leading-relaxed pt-2">{item.demoSteps[demoStep]}</p>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleDemoNext(item)}
                                        aria-label={demoStep < item.demoSteps.length - 1 ? "Execute Next Action" : "Finalize Simulation"}
                                        className="btn-primary flex items-center gap-3 py-3 px-8 group"
                                    >
                                        <span className="text-xs uppercase font-black tracking-widest">
                                            {demoStep < item.demoSteps.length - 1 ? 'Execute Next Action' : 'Finalize Simulation'}
                                        </span>
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderDailyLogisticsModule = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Environmental Logistics</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Personalize your physical operational footprint, from transit protocols to nutritional hubs.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4" role="list" aria-label="Environmental logistics items">
                {dailyLogistics.map((item) => (
                    <div key={item.id} role="listitem" className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 flex items-center gap-6 group hover:border-brand-red/20 transition-all">
                        <div className={`
                            w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110
                            ${item.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-50 text-neutral-400'}
                        `} aria-hidden="true">
                            {item.category === 'COMMUTE' && <Car className="w-7 h-7" />}
                            {item.category === 'PARKING' && <Car className="w-7 h-7" />}
                            {item.category === 'CANTEEN' && <Utensils className="w-7 h-7" />}
                            {item.category === 'FACILITIES' && <Building2 className="w-7 h-7" />}
                            {item.category === 'WIFI_PRINTER' && <Wifi className="w-7 h-7" />}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-neutral-900 group-hover:text-brand-red transition-colors">{item.title}</p>
                            <p className="text-xs text-neutral-400 font-medium leading-relaxed mt-1">{item.description}</p>
                        </div>
                        {item.status === 'COMPLETED' ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-100" role="status" aria-label="Configuration Synchronized">
                                <Check className="w-3.5 h-3.5" aria-hidden="true" /> Synchronized
                            </div>
                        ) : (
                            <button
                                onClick={() => handleCompleteLogistic(item.id)}
                                aria-label={`${item.actionLabel || 'Configure'} ${item.title}`}
                                className="btn-secondary py-2 px-6 text-[10px] uppercase font-black tracking-widest"
                            >
                                {item.actionLabel || 'Configure'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderPayrollBenefitsModule = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Fiscal & Wellbeing Matrix</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Secure your compensation architecture and activate your holistic health benefits.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4" role="list" aria-label="Fiscal and wellbeing items">
                {payrollBenefits.map((item) => (
                    <div key={item.id} role="listitem" className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 flex items-center gap-6 group hover:border-brand-red/20 transition-all">
                        <div className={`
                            w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110
                            ${item.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-50 text-neutral-400'}
                        `} aria-hidden="true">
                            {item.category === 'PAYROLL' && <Wallet className="w-7 h-7" />}
                            {item.category === 'INSURANCE' && <Heart className="w-7 h-7" />}
                            {item.category === 'DEPENDENT' && <Heart className="w-7 h-7" />}
                            {item.category === 'CLAIMS' && <Receipt className="w-7 h-7" />}
                            {item.category === 'TAX' && <FileSignature className="w-7 h-7" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <p className="font-bold text-neutral-900">{item.title}</p>
                                {item.requiresSignature && !item.completed && (
                                    <span className="text-[9px] px-2 py-0.5 bg-amber-50 text-amber-600 font-black uppercase tracking-widest rounded border border-amber-100 animate-pulse" role="alert">
                                        Signature Required
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-neutral-400 font-medium leading-relaxed">{item.description}</p>
                        </div>
                        {item.completed ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-100" role="status" aria-label={`${item.signedAt ? 'Executed' : 'Active'}`}>
                                <Check className="w-3.5 h-3.5" aria-hidden="true" /> {item.signedAt ? 'Executed' : 'Active'}
                            </div>
                        ) : (
                            <button
                                onClick={() => handleCompletePayroll(item.id)}
                                aria-label={`${item.requiresSignature ? 'Sign Protocol' : 'Activate'} ${item.title}`}
                                className="btn-primary py-2 px-6 text-[10px] uppercase font-black tracking-widest"
                            >
                                {item.requiresSignature ? 'Sign Protocol' : 'Activate'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderDigitalReadinessModule = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Neural Core Authentication</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Initialize your institutional credentials and establish secure neural links to the enterprise core.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4" role="list" aria-label="Digital readiness items">
                {digitalReadiness.map((item) => (
                    <div key={item.id} role="listitem" className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 flex items-center gap-6 group hover:border-brand-red/20 transition-all">
                        <div className={`
                            w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110
                            ${item.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600' : ''}
                            ${item.status === 'FAILED' ? 'bg-brand-red/10 text-brand-red' : ''}
                            ${item.status === 'NOT_STARTED' || item.status === 'IN_PROGRESS' ? 'bg-neutral-50 text-neutral-400' : ''}
                        `} aria-hidden="true">
                            <Key className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-neutral-900 mb-1">{item.title}</p>
                            <p className="text-xs text-neutral-400 font-medium leading-relaxed">{item.description}</p>
                        </div>
                        {item.status === 'VERIFIED' ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-100" role="status" aria-label="Identity Verified">
                                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Identity Verified
                            </div>
                        ) : item.status === 'FAILED' ? (
                            <button
                                onClick={() => handleVerifyDigital(item.id)}
                                aria-label={`Retry Sync for ${item.title}`}
                                className="btn-primary bg-brand-red py-2 px-6 text-[10px] uppercase font-black tracking-widest animate-pulse"
                            >
                                Retry Sync
                            </button>
                        ) : (
                            <button
                                onClick={() => handleVerifyDigital(item.id)}
                                aria-label={`Initialize Sync for ${item.title}`}
                                className="btn-primary py-2 px-6 text-[10px] uppercase font-black tracking-widest"
                            >
                                Initialize Sync
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderSafetyWellbeingModule = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Resilience</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Familiarize yourself with emergency response protocols and holistic support systems designed for your safety.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {safetyWellbeing.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 group hover:border-brand-red/20 transition-all">
                        <div className="flex items-center gap-6">
                            <div className={`
                                w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110
                                ${item.acknowledged ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-red/10 text-brand-red'}
                            `}>
                                {item.category === 'EMERGENCY' && <AlertTriangle className="w-7 h-7" />}
                                {item.category === 'EVACUATION' && <MapPin className="w-7 h-7" />}
                                {item.category === 'HEALTH' && <Heart className="w-7 h-7" />}
                                {item.category === 'ACCESSIBILITY' && <Shield className="w-7 h-7" />}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-neutral-900 group-hover:text-brand-red transition-colors">{item.title}</p>
                                <p className="text-xs text-neutral-400 font-medium leading-relaxed mt-1">{item.description}</p>
                            </div>
                            {item.acknowledged ? (
                                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-100">
                                    <Check className="w-3.5 h-3.5" /> Acknowledged
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleAcknowledgeSafety(item.id)}
                                    className="btn-primary py-2 px-6 text-[10px] uppercase font-black tracking-widest"
                                >
                                    Certify
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderPrivacyModule = () => (
        <div className="space-y-10 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Neural Privacy Protocols</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    DEX operates on a foundation of radical transparency. Control your digital signature and visibility within the ecosystem.
                </p>
            </div>

            {/* Data Collection Notice */}
            <div className="bg-neutral-900 rounded-[32px] p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Shield className="w-24 h-24" />
                </div>
                <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-brand-red">Data Sovereignty Notice</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: 'Personalized Learning', desc: 'Progress data is used ONLY to refine your development roadmap.' },
                        { title: 'Productivity Insights', desc: 'Tool usage patterns help us optimize your workflow environment.' },
                        { title: 'Social Integration', desc: 'Collaboration metrics identify key institutional mentors for you.' }
                    ].map((idx, i) => (
                        <div key={i} className="space-y-2">
                            <p className="text-xs font-bold text-neutral-100">{idx.title}</p>
                            <p className="text-[10px] text-neutral-400 leading-relaxed font-medium">{idx.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Learning Visibility Control */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="font-bold text-neutral-900">Digital Visibility Spectrum</h4>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Select your operational preference</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4" role="radiogroup" aria-label="Digital Visibility Selection">
                    {(['VISIBLE', 'TEAM_ONLY', 'PRIVATE'] as const).map((option) => (
                        <button
                            key={option}
                            onClick={() => setPrivacySettings(prev => ({ ...prev, learningVisibility: option }))}
                            role="radio"
                            aria-checked={privacySettings.learningVisibility === option}
                            aria-label={`${option.replace('_', ' ')} Visibility`}
                            className={`
                                relative py-6 px-4 rounded-2xl flex flex-col items-center justify-center transition-all border-2
                                ${privacySettings.learningVisibility === option
                                    ? 'bg-neutral-900 border-neutral-900 text-white shadow-xl'
                                    : 'bg-white border-neutral-50 text-neutral-400 hover:border-neutral-200'}
                            `}
                        >
                            <div className="mb-3" aria-hidden="true">
                                {option === 'VISIBLE' && <Sparkles className={`w-6 h-6 ${privacySettings.learningVisibility === option ? 'text-brand-red' : ''}`} />}
                                {option === 'TEAM_ONLY' && <Building2 className={`w-6 h-6 ${privacySettings.learningVisibility === option ? 'text-brand-red' : ''}`} />}
                                {option === 'PRIVATE' && <Lock className={`w-6 h-6 ${privacySettings.learningVisibility === option ? 'text-brand-red' : ''}`} />}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest" aria-hidden="true">
                                {option.replace('_', ' ')}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Acknowledge Action */}
            <div className="pt-4">
                {!privacySettings.dataRetentionAcknowledged ? (
                    <button
                        onClick={() => setPrivacySettings(prev => ({
                            ...prev,
                            dataRetentionAcknowledged: true,
                            lastUpdated: new Date().toISOString()
                        }))}
                        className="w-full py-6 bg-brand-red hover:bg-neutral-900 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-red-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                        <Shield className="w-4 h-4" />
                        Acknowledge & Sync Privacy Protocols
                    </button>
                ) : (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-center gap-4 animate-bounce-slow">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Check className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-emerald-900 font-bold text-sm">Privacy calibrated</p>
                            <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-widest mt-0.5">Your settings have been written to the core</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in selection:bg-red-100 selection:text-brand-red">
            {/* Context Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-brand-red bg-red-50 px-3 py-1 rounded-full uppercase tracking-widest">Phase 01 / 05</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Life & Work Architecture</span>
                </div>
                <h1 className="text-4xl font-black text-neutral-900 tracking-tight mb-4 leading-tight">
                    Establishing Your <span className="text-brand-red">Digital Foundation</span>
                </h1>
                <p className="text-sm text-neutral-500 max-w-2xl leading-relaxed">
                    We've curated a series of essential setup protocols to ensure your transition into the ecosystem is seamless, secure, and personalized to your workflow requirements.
                </p>
            </div>

            {/* Sprint Velocity Card */}
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-100/50 p-8 mb-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Sparkles className="w-24 h-24 text-brand-red" />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8" role="status" aria-label="Onboarding Progress Summary">
                    <div>
                        <h2 className="text-lg font-bold text-neutral-900 mb-1">Module Convergence</h2>
                        <p className="text-xs text-neutral-400 font-medium">Progress across your Day 1 essential certifications</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Status</p>
                            <p className="text-sm font-black text-neutral-900" aria-label={`${completedModulesCount} of ${DAY1_MODULES.length} modules complete`}>{completedModulesCount} / {DAY1_MODULES.length} Complete</p>
                        </div>
                        <div className="h-10 w-px bg-neutral-100 hidden md:block" aria-hidden="true" />
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Current Sync</p>
                            <p className="text-sm font-black text-brand-red" aria-label={`${Math.round((completedModulesCount / DAY1_MODULES.length) * 100)} percent synchronization`}>{Math.round((completedModulesCount / DAY1_MODULES.length) * 100)}%</p>
                        </div>
                    </div>
                </div>

                <div className="h-2.5 bg-neutral-50 rounded-full overflow-hidden mb-10 p-0.5" role="progressbar" aria-valuenow={Math.round((completedModulesCount / DAY1_MODULES.length) * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Overall Day 1 progress">
                    <div
                        className="h-full bg-brand-red rounded-full transition-all duration-1000 ease-out shadow-lg shadow-red-500/20"
                        style={{ width: `${(completedModulesCount / DAY1_MODULES.length) * 100}%` }}
                    />
                </div>

                {/* Module Quick Nav (Unified Grid) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3" role="tablist" aria-label="Onboarding Modules">
                    {DAY1_MODULES.map((module) => {
                        const progress = moduleProgress[module.id];
                        const isActive = activeModule === module.id;

                        return (
                            <button
                                key={module.id}
                                onClick={() => setActiveModule(module.id)}
                                role="tab"
                                aria-selected={isActive}
                                aria-label={`${module.title}${progress.complete ? ', Completed' : ''}`}
                                className={`
                                    relative p-4 rounded-2xl flex flex-col items-center justify-center transition-all group
                                    ${isActive
                                        ? 'bg-neutral-900 text-white shadow-xl -translate-y-1'
                                        : 'bg-white border border-neutral-100 hover:border-brand-red/30 hover:bg-neutral-50'}
                                `}
                            >
                                <div className={`
                                    w-10 h-10 rounded-xl mb-3 flex items-center justify-center transition-transform group-hover:scale-110
                                    ${progress.complete
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : (isActive ? 'bg-brand-red text-white' : 'bg-neutral-50 text-neutral-400')}
                                `} aria-hidden="true">
                                    {progress.complete ? <Check className="w-5 h-5" /> : getModuleIcon(module.id, 5)}
                                </div>
                                <p className={`text-[10px] font-bold uppercase tracking-widest truncate w-full text-center ${isActive ? 'text-white' : 'text-neutral-500'}`} aria-hidden="true">
                                    {module.title.split(' ')[0]}
                                </p>

                                {isActive && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-red rounded-full" aria-hidden="true" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Focused Workspace Content */}
            <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-8 md:p-12 mb-10 min-h-[400px] animate-slide-up" role="tabpanel" aria-label={`${activeModule.replace('_', ' ')} Details`}>
                <div className="max-w-3xl mx-auto">
                    {renderModuleContent()}
                </div>
            </div>

            {/* Advancement Protocol */}
            <button
                onClick={onComplete}
                disabled={!allModulesComplete}
                aria-label={allModulesComplete ? "Initialize Next Phase: Company Culture" : `Establish All Protocols to Unlock Phase 02. ${completedModulesCount} of ${DAY1_MODULES.length} complete.`}
                className={`
                    w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-4 group
                    ${allModulesComplete
                        ? 'bg-brand-red text-white shadow-xl shadow-red-500/30 hover:shadow-red-500/40 hover:-translate-y-1 active:translate-y-0'
                        : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                `}
            >
                {allModulesComplete ? (
                    <>
                        Initialize Next Phase: Company Culture
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </>
                ) : (
                    <>Establish All Protocols to Unlock Phase 02 ({completedModulesCount}/{DAY1_MODULES.length})</>
                )}
            </button>
        </div>
    );
};

export default Day1LifeWorkSetup;
