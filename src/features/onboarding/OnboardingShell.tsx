import React, { useState } from 'react';
import {
    Check,
    Lock,
    RefreshCw,
    Unlock,
    ChevronRight,
} from 'lucide-react';
import { OnboardingDay, UserProfile } from '@/types';
import AppHeader from '@/components/shared/AppHeader';

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

    const days: { day: OnboardingDay; title: string; description: string }[] = [
        { day: 1, title: 'Setup & Access', description: 'System Check' },
        { day: 2, title: 'How We Work', description: 'Team Norms' },
        { day: 3, title: 'Tools & Skills', description: 'Productivity' },
        { day: 4, title: 'Your Team', description: 'Key People' },
        { day: 5, title: 'Ready to Launch', description: 'Completion' },
    ];

    const completedCount = Object.values(user.dayProgress).filter((d: any) => d.completed).length;

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
                return <div className="text-neutral-600 p-8">Select a day to continue</div>;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-neutral-50/30 font-sans selection:bg-red-100 selection:text-brand-red">
            {/* Unified Top Navigation */}
            <AppHeader
                user={user}
                mode="ONBOARDING"
                isOnline={true}
            />

            {/* Journey Stepper (Horizontal) */}
            <div className="bg-white border-b border-neutral-100 shadow-sm sticky top-16 z-40">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-2 md:hidden">
                        <span className="text-xs font-black uppercase tracking-widest text-neutral-500">
                            Day {currentDay} of 5
                        </span>
                        <span className="text-xs font-bold text-brand-red">
                            {Math.round((completedCount / 5) * 100)}% Complete
                        </span>
                    </div>

                    <nav className="flex items-center justify-between relative" aria-label="Onboarding Progress">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-neutral-100 -z-10 hidden md:block" />

                        {days.map((item) => {
                            const status = getDayStatus(item.day);
                            const isActive = status === 'active';
                            const isCompleted = status === 'completed';
                            const isLocked = status === 'locked';

                            return (
                                <button
                                    key={item.day}
                                    onClick={() => !isLocked && setCurrentDay(item.day)}
                                    disabled={isLocked}
                                    className={`
                                        relative group flex flex-col items-center gap-2 transition-all duration-300 md:min-w-[100px]
                                        ${isLocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                                        ${isActive ? 'opacity-100 scale-105' : 'opacity-70 hover:opacity-100'}
                                    `}
                                >
                                    {/* Indicator Dot */}
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm z-10 border-2
                                        ${isActive
                                            ? 'bg-brand-red text-white border-brand-red shadow-red-500/30'
                                            : isCompleted
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                                : 'bg-white text-neutral-400 border-neutral-200'
                                        }
                                    `}>
                                        {isCompleted ? <Check className="w-4 h-4" /> : item.day}
                                    </div>

                                    {/* Label (Desktop) */}
                                    <div className="hidden md:flex flex-col items-center text-center">
                                        <span className={`text-[10px] uppercase font-black tracking-widest ${isActive ? 'text-brand-red' : 'text-neutral-500'}`}>
                                            Day {item.day}
                                        </span>
                                        <span className={`text-[10px] font-bold ${isActive ? 'text-neutral-900' : 'text-neutral-400'}`}>
                                            {item.title}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8 md:py-12 animate-fade-in relative">
                {renderDayContent()}

                {/* Developer / Demo Controls */}
                <div className="mt-12 pt-8 border-t border-neutral-200 flex justify-center gap-6 opacity-50 hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => {
                            if (confirm('Reset prototype state? This will return to Identity Selection.')) {
                                localStorage.clear();
                                window.location.reload();
                            }
                        }}
                        className="text-[10px] font-bold text-neutral-400 hover:text-brand-red uppercase tracking-widest flex items-center gap-2"
                    >
                        <RefreshCw className="w-3 h-3" /> Reset Prototype
                    </button>

                    <button
                        onClick={onUnlockAll}
                        className="text-[10px] font-bold text-neutral-400 hover:text-brand-red uppercase tracking-widest flex items-center gap-2"
                    >
                        <Unlock className="w-3 h-3" /> Unlock All (Demo)
                    </button>
                </div>
            </main>
        </div>
    );
};

export default OnboardingShell;
