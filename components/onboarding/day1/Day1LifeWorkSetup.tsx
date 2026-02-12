import React, { useState, useEffect } from 'react';
import {
    Sparkles,
    Calendar,
    Receipt,
    Wallet,
    Key,
    Shield,
    Lock,
    ChevronRight,
    Check,
    Building2,
} from 'lucide-react';
import {
    UserProfile,
    GreenLightCheck,
    Day1ModuleId,
    WorkEssential,
    DailyLifeLogistic,
    PayrollBenefitsItem,
    DigitalReadinessItem,
    SafetyWellbeingItem,
    PrivacySettings,
    SystemCheckStatus,
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

// Imported modular components
import GreenLightSection from './GreenLightSection';
import WorkEssentialsSection from './WorkEssentialsSection';
import DailyLogisticsSection from './DailyLogisticsSection';
import PayrollBenefitsSection from './PayrollBenefitsSection';
import DigitalReadinessSection from './DigitalReadinessSection';
import SafetyWellbeingSection from './SafetyWellbeingSection';
import PrivacySettingsSection from './PrivacySettingsSection';

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

    // Active module state
    const [activeModule, setActiveModule] = useState<Day1ModuleId>('GREEN_LIGHT');

    // Simulate system checks (Hoisted state logic for GreenLight)
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

    const renderModuleContent = () => {
        switch (activeModule) {
            case 'GREEN_LIGHT':
                return <GreenLightSection checks={checks} />;
            case 'WORK_ESSENTIALS':
                return <WorkEssentialsSection workEssentials={workEssentials} setWorkEssentials={setWorkEssentials} />;
            case 'DAILY_LOGISTICS':
                return <DailyLogisticsSection dailyLogistics={dailyLogistics} setDailyLogistics={setDailyLogistics} />;
            case 'PAYROLL_BENEFITS':
                return <PayrollBenefitsSection payrollBenefits={payrollBenefits} setPayrollBenefits={setPayrollBenefits} />;
            case 'DIGITAL_READINESS':
                return <DigitalReadinessSection digitalReadiness={digitalReadiness} setDigitalReadiness={setDigitalReadiness} />;
            case 'SAFETY_WELLBEING':
                return <SafetyWellbeingSection safetyWellbeing={safetyWellbeing} setSafetyWellbeing={setSafetyWellbeing} />;
            case 'PRIVACY_SETTINGS':
                return <PrivacySettingsSection privacySettings={privacySettings} setPrivacySettings={setPrivacySettings} />;
            default:
                return null;
        }
    };

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
                                        ? 'bg-white border-brand-red text-brand-red shadow-lg shadow-red-500/10 -translate-y-1'
                                        : 'bg-white border-neutral-100 hover:border-brand-red/30 hover:bg-neutral-50'}
                                `}
                            >
                                <div className={`
                                    w-10 h-10 rounded-xl mb-3 flex items-center justify-center transition-transform group-hover:scale-110
                                    ${progress.complete
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : (isActive ? 'bg-red-50 text-brand-red' : 'bg-neutral-50 text-neutral-400')}
                                `} aria-hidden="true">
                                    {progress.complete ? <Check className="w-5 h-5" /> : getModuleIcon(module.id, 5)}
                                </div>
                                <p className={`text-[10px] font-bold uppercase tracking-widest truncate w-full text-center ${isActive ? 'text-brand-red' : 'text-neutral-500'}`} aria-hidden="true">
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
