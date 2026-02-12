import React, { useState } from 'react';
import {
    ChevronRight,
    Lock,
    Unlock,
    Check,
    Sparkles,
    Menu,
    X,
    Shield,
    Zap,
    Network,
    Flag,
    Rocket,
} from 'lucide-react';
import { OnboardingDay, UserProfile } from '../../types';

// Import Enhanced Day Components (Unified Flow)
import Day1LifeWorkSetup from './day1/Day1LifeWorkSetup';
import Day2Culture from './day2/Day2Culture';
import Day3ToolsWorkflow from './day3/Day3ToolsWorkflow';
import Day4NetworkCollaboration from './day4/Day4NetworkCollaboration';
import Day5Graduation from './day5/Day5Graduation';

interface OnboardingShellProps {
    user: UserProfile;
    onDayComplete: (day: OnboardingDay) => void;
    onGraduate: () => void;
    onUnlockAll?: () => void;
}

const OnboardingShell: React.FC<OnboardingShellProps> = ({
    user,
    onDayComplete,
    onGraduate,
    onUnlockAll,
}) => {
    // All roles start at Day 1
    const initialDay = (user.onboardingDay > 0) ? user.onboardingDay : 1;
    const [currentDay, setCurrentDay] = useState<OnboardingDay>(initialDay as OnboardingDay);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const phases: { day: OnboardingDay; title: string; subtitle: string; icon: React.ReactNode }[] = [
        { day: 1, title: 'Phase 1', subtitle: 'System Uplink', icon: <Zap className="w-4 h-4" /> },
        { day: 2, title: 'Phase 2', subtitle: 'Cultural Sync', icon: <Flag className="w-4 h-4" /> },
        { day: 3, title: 'Phase 3', subtitle: 'Module Calibration', icon: <Shield className="w-4 h-4" /> },
        { day: 4, title: 'Phase 4', subtitle: 'Network Link', icon: <Network className="w-4 h-4" /> },
        { day: 5, title: 'Phase 5', subtitle: 'Deployment', icon: <Rocket className="w-4 h-4" /> },
    ];

    const completedCount = Object.values(user.dayProgress).filter((d: any) => d.completed).length;
    const progressPercent = Math.round((completedCount / 5) * 100);

    const handleDayComplete = (day: OnboardingDay) => {
        onDayComplete(day);
        if (day < 5) {
            setCurrentDay((day + 1) as OnboardingDay);
        }
    };

    const getDayStatus = (day: OnboardingDay) => {
        if (user.dayProgress[day]?.completed) return 'completed';
        if (day === currentDay) return 'active';
        if (day < currentDay) return 'available';
        return 'locked';
    };

    const renderDayContent = () => {
        switch (currentDay) {
            case 1:
                return (
                    <Day1LifeWorkSetup
                        user={user}
                        onComplete={() => handleDayComplete(1)}
                    />
                );
            case 2:
                return (
                    <Day2Culture
                        roleCategory={user.roleCategory || 'DESK'}
                        onComplete={() => handleDayComplete(2)}
                    />
                );
            case 3:
                return (
                    <Day3ToolsWorkflow
                        user={user}
                        onComplete={() => handleDayComplete(3)}
                    />
                );
            case 4:
                return (
                    <Day4NetworkCollaboration
                        user={user}
                        onComplete={() => handleDayComplete(4)}
                    />
                );
            case 5:
                return (
                    <Day5Graduation
                        user={user}
                        onGraduate={onGraduate}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-neutral-50 overflow-hidden font-sans">
            {/* Sidebar - Glassmorphic Elite Style */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-80 bg-white/80 backdrop-blur-xl border-r border-neutral-200 shadow-[4px_0_24px_rgba(0,0,0,0.02)]
                transform transition-transform duration-300 ease-in-out
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                md:relative md:translate-x-0
            `}>
                <div className="flex flex-col h-full p-6">
                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-white shadow-lg">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="font-extrabold text-lg text-neutral-900 tracking-tight">Agent Init</h1>
                                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Protocol v2.0</p>
                            </div>
                        </div>
                    </div>

                    {/* Progress Ring */}
                    <div className="mb-10 px-2">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Sync Status</span>
                            <span className="text-xs font-bold text-neutral-900">{progressPercent}%</span>
                        </div>
                        <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-neutral-900 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {phases.map((phase) => {
                            const status = getDayStatus(phase.day);
                            const isActive = status === 'active';
                            const isCompleted = status === 'completed';
                            const isLocked = status === 'locked';

                            return (
                                <button
                                    key={phase.day}
                                    onClick={() => !isLocked && setCurrentDay(phase.day)}
                                    disabled={isLocked}
                                    className={`
                                        w-full flex items-center gap-4 p-4 rounded-xl text-left border transition-all duration-300 group
                                        ${isActive
                                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-xl shadow-neutral-900/10 scale-[1.02]'
                                            : 'bg-white text-neutral-500 border-transparent hover:bg-neutral-50 hover:text-neutral-900'}
                                        ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                    `}
                                >
                                    <div className={`
                                        w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                                        ${isActive ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-500 group-hover:bg-white group-hover:shadow-sm'}
                                    `}>
                                        {isCompleted ? <Check className="w-4 h-4" /> : isLocked ? <Lock className="w-4 h-4" /> : phase.icon}
                                    </div>

                                    <div className="flex-1">
                                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${isActive ? 'text-white/60' : 'text-neutral-400'}`}>
                                            {phase.title}
                                        </div>
                                        <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-neutral-900'}`}>
                                            {phase.subtitle}
                                        </div>
                                    </div>

                                    {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    {onUnlockAll && (
                        <button
                            onClick={onUnlockAll}
                            className="mt-6 flex items-center justify-center gap-2 p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs font-bold transition-colors"
                        >
                            <Unlock className="w-3 h-3" />
                            <span>Dev: Unlock All Phases</span>
                        </button>
                    )}
                </div>
            </aside>

            {/* Mobile Toggle */}
            <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-lg text-neutral-900"
            >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                />

                <div className="relative z-10 p-6 md:p-12 max-w-5xl mx-auto min-h-screen flex flex-col">
                    <header className="mb-8 md:mb-12 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-[10px] font-bold text-neutral-500 uppercase tracking-widest shadow-sm mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            System Active
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight mb-2">
                            {phases[currentDay - 1].subtitle}
                        </h2>
                        <p className="text-neutral-500 max-w-xl text-lg leading-relaxed">
                            Complete all modules to synchronize with the network.
                        </p>
                    </header>

                    <div className="flex-1 animate-fade-in-up" key={currentDay} style={{ animationDelay: '100ms' }}>
                        {renderDayContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OnboardingShell;
