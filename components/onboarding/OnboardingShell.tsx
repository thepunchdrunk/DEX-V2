import React, { useState } from 'react';
import {
    ChevronRight,
    Lock,
    Unlock,
    Check,
    Sparkles,
    LayoutDashboard,
    RefreshCw,
    Menu,
    X,
} from 'lucide-react';
import { OnboardingDay, UserProfile } from '../../types';
import { THEME_COLORS } from '../../constants';

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

    const days: { day: OnboardingDay; title: string; description: string }[] = [
        { day: 1, title: 'Setup & Essentials', description: 'Everything to function comfortably' },
        { day: 2, title: 'Company Culture', description: 'Learn our unwritten rules' },
        { day: 3, title: 'Tools & Workflow', description: 'How you get work done' },
        { day: 4, title: 'Team Connections', description: 'Connect with your Critical 5' },
        { day: 5, title: 'Completion Day', description: 'Complete your journey' },
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
                return <div className="text-neutral-600 p-8">Select a day to continue</div>;
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-sans selection:bg-red-100 selection:text-brand-red">
            {/* Sidebar: Day Navigation Area */}
            <aside className="w-80 border-r border-neutral-100 bg-neutral-50/50 backdrop-blur-xl p-8 flex flex-col hidden md:flex">
                {/* Brand Header */}
                <div className="mb-10 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-brand-red flex items-center justify-center shadow-lg shadow-red-500/20">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <span className="text-sm font-black tracking-widest text-neutral-900 leading-none">DEX</span>
                        <p className="text-[10px] font-bold text-brand-red uppercase tracking-widest mt-1">Journey Engine</p>
                    </div>
                </div>

                {/* Progress Overview */}
                <div className="mb-10 p-5 bg-white rounded-2xl border border-neutral-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Sparkles className="w-12 h-12 text-brand-red" />
                    </div>

                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-label mb-1">Current Velocity</p>
                            <p className="text-2xl font-black text-neutral-900 leading-none">
                                {completedCount}<span className="text-neutral-300 mx-1">/</span>5
                            </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${progressPercent >= 80 ? 'text-emerald-600 bg-emerald-50' : 'text-brand-red bg-red-50'
                            }`}>
                            {progressPercent}%
                        </span>
                    </div>

                    {/* Modern Progress Bar */}
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${progressPercent >= 80 ? 'bg-emerald-500' : 'bg-brand-red shadow-red'
                                }`}
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>

                    {/* Completion message */}
                    {progressPercent === 100 && (
                        <p className="text-[10px] font-bold text-emerald-600 mt-3 animate-fade-in">
                            🎉 All days complete! Ready to graduate.
                        </p>
                    )}
                </div>

                {/* Navigation List */}
                <nav className="space-y-1.5 flex-1 relative" role="navigation" aria-label="Onboarding progress">
                    {/* Vertical connector line */}
                    <div className="absolute left-4 top-2 bottom-2 w-px bg-neutral-100" />
                    {/* Completed segment overlay */}
                    {completedCount > 0 && (
                        <div
                            className="absolute left-4 top-2 w-px bg-emerald-300 transition-all duration-700"
                            style={{ height: `${Math.min((completedCount / 5) * 100, 95)}%` }}
                        />
                    )}

                    {days.map((item) => {
                        const status = getDayStatus(item.day);
                        const isActive = status === 'active';
                        const isLocked = status === 'locked';
                        const isCompleted = status === 'completed';

                        return (
                            <button
                                key={item.day}
                                onClick={() => !isLocked && setCurrentDay(item.day)}
                                disabled={isLocked}
                                aria-current={isActive ? 'step' : undefined}
                                className={`
                                    relative w-full p-4 pl-12 rounded-2xl text-left transition-all duration-200 group
                                    ${isActive
                                        ? 'bg-neutral-900 text-white shadow-xl translate-x-1'
                                        : 'hover:bg-white hover:shadow-md text-neutral-600'
                                    }
                                    ${isLocked ? 'opacity-40 grayscale cursor-not-allowed' : 'cursor-pointer'}
                                `}
                            >
                                {/* Connector Dot */}
                                <div className={`
                                    absolute left-[13px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 transition-all z-10
                                    ${isActive ? 'bg-brand-red border-white scale-125' : 'bg-white border-neutral-200'}
                                    ${isCompleted ? 'bg-emerald-500 border-white animate-celebrate' : ''}
                                `} />

                                {/* Active indicator bar */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-red rounded-r-full" />
                                )}

                                <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-brand-red' : 'text-neutral-400 group-hover:text-neutral-900'}`}>
                                            Day {item.day}
                                        </span>
                                        {isCompleted && (
                                            <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                                                <Check className="h-3 w-3 text-emerald-600" />
                                            </div>
                                        )}
                                        {isLocked && <Lock className="h-3 w-3 opacity-30" />}
                                    </div>
                                    <div className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-neutral-900'}`}>
                                        {item.title}
                                    </div>
                                    <div className={`text-[10px] truncate ${isActive ? 'text-neutral-400' : 'text-neutral-400'}`}>
                                        {item.description}
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </nav>

                {/* Sidebar Footer: Advanced Actions */}
                <div className="mt-8 pt-8 border-t border-neutral-100 flex flex-col gap-3">
                    <button
                        onClick={() => {
                            if (confirm('Reset prototype state? This will return to Identity Selection.')) {
                                localStorage.clear();
                                window.location.reload();
                            }
                        }}
                        className="text-[10px] font-bold text-neutral-400 hover:text-brand-red uppercase tracking-widest flex items-center gap-2 px-2 transition-colors"
                    >
                        <RefreshCw className="w-3 h-3" /> Hard Reset System
                    </button>

                    <button
                        onClick={onUnlockAll}
                        className="text-[10px] font-bold text-neutral-400 hover:text-brand-red uppercase tracking-widest flex items-center gap-2 px-2 transition-colors"
                    >
                        <Unlock className="w-3 h-3" /> Unlock All Days (Demo)
                    </button>

                    {/* User Profile Hook */}
                    <div className="mt-4 flex items-center gap-4 bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
                        <div className="avatar avatar-md shadow-md">
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-neutral-900 truncate leading-none mb-1">{user.name}</p>
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter truncate">{user.jobTitle}</p>
                        </div>
                        <span className="badge badge-red text-[8px]">{user.roleCategory || 'DESK'}</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area: Journey Viewports */}
            <main className="flex-1 overflow-y-auto relative bg-white">
                <div className="relative z-10 min-h-full">
                    {/* Mobile Navigation Header */}
                    <div className="md:hidden bg-white/80 backdrop-blur-xl p-5 sticky top-0 z-20 border-b border-neutral-100 flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="w-9 h-9 rounded-lg bg-brand-red flex items-center justify-center hover:bg-[#CC0000] transition-colors active:scale-95"
                                aria-label="Open navigation menu"
                            >
                                <Menu className="h-4 w-4 text-white" />
                            </button>
                            <div>
                                <span className="text-sm font-black text-neutral-900 uppercase tracking-widest block leading-none">Day {currentDay}</span>
                                <span className="text-[10px] text-neutral-400 font-medium">{days[currentDay - 1]?.title}</span>
                            </div>
                        </div>
                        <div className="text-[10px] font-bold text-neutral-400 bg-neutral-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
                            {completedCount}/5
                        </div>
                    </div>

                    {/* Mobile Drawer Overlay */}
                    {mobileMenuOpen && (
                        <div className="fixed inset-0 z-50 md:hidden">
                            {/* Backdrop */}
                            <div
                                className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in"
                                onClick={() => setMobileMenuOpen(false)}
                            />
                            {/* Drawer — now uses proper slide-in-left instead of scaleX */}
                            <aside className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl p-6 flex flex-col animate-slide-in-left overflow-y-auto">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-xl bg-brand-red flex items-center justify-center shadow-lg shadow-red-500/20">
                                            <Sparkles className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-sm font-black tracking-widest text-neutral-900">DEX</span>
                                    </div>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors"
                                        aria-label="Close navigation menu"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Progress bar in mobile */}
                                <div className="mb-6 p-4 bg-neutral-50 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Progress</span>
                                        <span className="text-[10px] font-bold text-brand-red">{progressPercent}%</span>
                                    </div>
                                    <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-brand-red rounded-full transition-all duration-500"
                                            style={{ width: `${progressPercent}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Day Links */}
                                <nav className="space-y-2 flex-1" role="navigation" aria-label="Onboarding days">
                                    {days.map((item) => {
                                        const status = getDayStatus(item.day);
                                        const isActive = status === 'active';
                                        const isCompleted = status === 'completed';
                                        const isLocked = status === 'locked';
                                        return (
                                            <button
                                                key={item.day}
                                                onClick={() => {
                                                    if (!isLocked) {
                                                        setCurrentDay(item.day);
                                                        setMobileMenuOpen(false);
                                                    }
                                                }}
                                                disabled={isLocked}
                                                aria-current={isActive ? 'step' : undefined}
                                                className={`
                                                    w-full p-4 rounded-xl text-left transition-all
                                                    ${isActive
                                                        ? 'bg-red-50 border border-brand-red/20 text-brand-red'
                                                        : isCompleted
                                                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                                                            : isLocked
                                                                ? 'opacity-40 cursor-not-allowed'
                                                                : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700'}
                                                `}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${isCompleted ? 'bg-emerald-500 text-white'
                                                        : isActive ? 'bg-brand-red text-white'
                                                            : 'bg-neutral-200 text-neutral-500'
                                                        }`}>
                                                        {isCompleted ? <Check className="w-4 h-4" /> : item.day}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold">{item.title}</p>
                                                        <p className="text-xs opacity-70">{item.description}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </nav>
                            </aside>
                        </div>
                    )}

                    <div key={currentDay} className="page-transition py-8 sm:py-12">
                        {renderDayContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OnboardingShell;
