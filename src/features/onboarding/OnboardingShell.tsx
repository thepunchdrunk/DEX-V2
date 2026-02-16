
import React, { useState, useEffect } from 'react';
import {
    Sparkles,
    CheckCircle2,
    Target,
    Zap,
    Layout,
    Users,
    Rocket,
    Clock,
    Search,
    Wifi,
    WifiOff,
    AlertTriangle,
    Bell
} from 'lucide-react';
import { UserProfile } from '../../types';
import Day1LifeWorkSetup from './day1/Day1LifeWorkSetup';
import Day2Culture from './day2/Day2Culture';
import Day3ToolsWorkflow from './day3/Day3ToolsWorkflow';
import Day4NetworkCollaboration from './day4/Day4NetworkCollaboration';
import Day5Graduation from './day5/Day5Graduation';
import { PlayerIdentityBadge, StreakCounter } from '../dashboard/features';
import MagicSearch from '../search/MagicSearch';

interface OnboardingShellProps {
    user: UserProfile;
    onComplete: () => void;
}

const OnboardingShell: React.FC<OnboardingShellProps> = ({ user, onComplete }) => {
    // Determine initial day based on user progress (mock logic)
    const [currentDay, setCurrentDay] = useState(1);
    const [completedDays, setCompletedDays] = useState<number[]>([]);
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [isOnline, setIsOnline] = useState(true);

    // Handle scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDayComplete = (day: number) => {
        if (!completedDays.includes(day)) {
            setCompletedDays([...completedDays, day]);
        }
        if (day < 5) {
            setTimeout(() => setCurrentDay(day + 1), 1000); // Auto-advance with delay
        } else {
            onComplete();
        }
    };

    const days = [
        {
            day: 1,
            title: 'The Mission',
            icon: <Target className="w-4 h-4" />,
            label: 'Day 1',
        },
        {
            day: 2,
            title: 'The Toolkit',
            icon: <Zap className="w-4 h-4" />,
            label: 'Day 2',
        },
        {
            day: 3,
            title: 'The OS',
            icon: <Layout className="w-4 h-4" />,
            label: 'Day 3',
        },
        {
            day: 4,
            title: 'Social Capital',
            icon: <Users className="w-4 h-4" />,
            label: 'Day 4',
        },
        {
            day: 5,
            title: 'Impact Launch',
            icon: <Rocket className="w-4 h-4" />,
            label: 'Day 5',
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-red-100 selection:text-brand-red">
            {/* Top Navigation Bar (Dashboard Style) */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Brand / Logo Section */}
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-brand-red flex items-center justify-center shadow-lg shadow-red-500/20 active:scale-95 transition-transform">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black tracking-widest text-neutral-900 leading-none">DEX</span>
                            <span className="text-[10px] text-brand-red font-bold tracking-[0.2em] mt-1 uppercase">Onboarding</span>
                        </div>
                    </div>

                    {/* Right Actions & Meta */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Search Launcher */}
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className={`p-2.5 rounded-xl transition-all flex items-center gap-2 group ${showSearch ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-500 hover:bg-neutral-50'
                                }`}
                            aria-label="Search and Actions"
                        >
                            <Search className={`w-5 h-5 transition-transform ${showSearch ? 'scale-110' : 'group-hover:scale-110'}`} />
                            <span className="text-xs font-bold hidden sm:block text-neutral-400">⌘K</span>
                        </button>

                        <div className="w-px h-6 bg-neutral-100 mx-1 hidden sm:block"></div>

                        {/* Status Monitor */}
                        <div className="flex items-center gap-2 bg-neutral-50/80 px-3 py-1.5 rounded-xl border border-neutral-100/50">
                            <button
                                onClick={() => setIsOnline(!isOnline)}
                                className={`p-1 transition-all ${isOnline ? 'text-emerald-500' : 'text-brand-red animate-pulse'}`}
                                title={isOnline ? 'Connected to Enterprise Core' : 'Offline Mode Active'}
                                aria-label={isOnline ? 'Online' : 'Offline'}
                            >
                                {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                            </button>
                        </div>

                         <div className="hidden md:flex items-center gap-2 text-xs font-bold text-neutral-500 bg-neutral-50 px-3 py-1.5 rounded-full border border-neutral-200/50">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Est: 2.5 Hours Left</span>
                        </div>


                        {/* User Profile */}
                        <div className="flex items-center gap-3 pl-3 ml-1 border-l border-neutral-100">
                            <div className="hidden sm:block text-right">
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider leading-none mb-1">{user.department}</p>
                                <p className="text-xs font-bold text-neutral-900 truncate max-w-[100px]">{user.name}</p>
                            </div>
                            <button
                                className="avatar avatar-md shadow-md hover:scale-105 active:scale-95 transition-transform overflow-hidden relative group"
                                aria-label="Open profile settings"
                            >
                                <span className="relative z-10">{user.name.split(' ').map(n => n[0]).join('')}</span>
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sub-Navigation (Tabs) */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 overflow-x-auto no-scrollbar">
                    <nav className="flex items-center gap-1 sm:gap-2" role="tablist" aria-label="Onboarding days">
                        {days.map((item) => {
                            const isActive = currentDay === item.day;
                            const isCompleted = completedDays.includes(item.day);
                            const isLocked = item.day > currentDay && !isCompleted;

                            return (
                                <button
                                    key={item.day}
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => !isLocked && setCurrentDay(item.day)}
                                    disabled={isLocked}
                                    className={`
                                    relative py-3.5 px-3 sm:px-4 text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap rounded-lg
                                    flex items-center gap-2
                                    ${isActive
                                            ? 'text-brand-red'
                                            : isCompleted
                                                ? 'text-emerald-600 hover:bg-emerald-50'
                                                : 'text-neutral-400 opacity-60 cursor-not-allowed'}
                                `}
                                >
                                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : item.icon}
                                    <span className="hidden sm:inline">{item.label}: {item.title}</span>
                                    <span className="sm:hidden">{item.label}</span>
                                    {isActive && (
                                        <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-red rounded-full animate-slide-right" />
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Integrated Magic Search Overlay */}
                {showSearch && (
                    <div className="border-t border-neutral-100 bg-neutral-50/50 p-6 animate-slide-down">
                        <MagicSearch onClose={() => setShowSearch(false)} />
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto bg-neutral-50/30" role="tabpanel" aria-live="polite">
                <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in-up">
                    {currentDay === 1 && (
                        <Day1LifeWorkSetup user={user} onComplete={() => handleDayComplete(1)} />
                    )}
                    {currentDay === 2 && (
                        <Day2Culture user={user} onComplete={() => handleDayComplete(2)} />
                    )}
                    {currentDay === 3 && (
                        <Day3ToolsWorkflow user={user} onComplete={() => handleDayComplete(3)} />
                    )}
                    {currentDay === 4 && (
                        <Day4NetworkCollaboration user={user} onComplete={() => handleDayComplete(4)} />
                    )}
                    {currentDay === 5 && (
                        <Day5Graduation user={user} onGraduate={() => handleDayComplete(5)} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default OnboardingShell;
