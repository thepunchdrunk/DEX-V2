
import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    Play,
    CheckCircle2,
    Lock,
    Sparkles,
    Layout,
    Users,
    MessageSquare,
    Zap,
    BookOpen,
    Trophy,
    GraduationCap,
    Clock,
    Calendar,
    Target,
    ArrowRight
} from 'lucide-react';
import { UserProfile } from '../../types';
import Day1LifeWorkSetup from './day1/Day1LifeWorkSetup';
import Day2Culture from './day2/Day2Culture';
import Day3ToolsWorkflow from './day3/Day3ToolsWorkflow';
import Day4NetworkCollaboration from './day4/Day4NetworkCollaboration';
import Day5Graduation from './day5/Day5Graduation';

interface OnboardingShellProps {
    user: UserProfile;
    onComplete: () => void;
}

const OnboardingShell: React.FC<OnboardingShellProps> = ({ user, onComplete }) => {
    // Determine initial day based on user progress (mock logic)
    const [currentDay, setCurrentDay] = useState(1);
    const [completedDays, setCompletedDays] = useState<number[]>([]);
    const [scrolled, setScrolled] = useState(false);

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
            subtitle: 'Day 1 Philosophy & Belonging',
            icon: Target,
            color: 'text-brand-red',
            bgColor: 'bg-red-50',
            borderColor: 'border-red-100',
            description: 'Understand why we exist and your crucial role in the mission.',
        },
        {
            day: 2,
            title: 'The Toolkit',
            subtitle: 'Systems & Craft',
            icon: Zap,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-100',
            description: 'Master the tools and workflows that power our execution.',
        },
        {
            day: 3,
            title: 'The OS',
            subtitle: 'Freedom & Responsibility',
            icon: Layout,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-100',
            description: 'Learn how to operate with autonomy, trust, and speed.',
        },
        {
            day: 4,
            title: 'Social Capital',
            subtitle: 'Network & Influence',
            icon: Users,
            color: 'text-amber-600',
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-100',
            description: 'Build the relationships you need to get things done.',
        },
        {
            day: 5,
            title: 'Impact Launch',
            subtitle: 'Goals & Commitment',
            icon: RocketEmoji,
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-100',
            description: 'Commit to your first 30 days of impact.',
        },
    ];

    // Helper component for the rocket icon since lucide-react might not have 'Rocket' in all versions or we want a specific style
    function RocketEmoji(props: any) {
        return <span className="text-xl" role="img" aria-label="rocket">🚀</span>;
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] pb-20 font-sans selection:bg-red-100 selection:text-brand-red">
            {/* Sticky Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                            D
                        </div>
                        <span className={`font-bold text-lg tracking-tight transition-colors ${scrolled ? 'text-neutral-900' : 'text-neutral-900'}`}>
                            Onboarding <span className="text-neutral-400 font-medium">Journey</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 text-xs font-bold text-neutral-500 bg-white/50 px-3 py-1.5 rounded-full border border-neutral-200/50 backdrop-blur-sm">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Estimated: 2.5 Hours Left</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-neutral-900 leading-none">{user.name}</p>
                                <p className="text-[10px] text-neutral-500 font-medium leading-none mt-1">{user.role}</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 p-0.5 shadow-sm">
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                    alt={user.name}
                                    className="w-full h-full rounded-full bg-neutral-100"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section with Progress */}
            <div className="pt-28 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight mb-4">
                        Welcome to the <span className="text-brand-red">Team</span>, {user.name.split(' ')[0]}.
                    </h1>
                    <p className="text-lg text-neutral-500 max-w-2xl leading-relaxed">
                        This isn't just onboarding. It's your operating system for high performance.
                        Five days to master our culture, tools, and mission.
                    </p>
                </div>

                {/* Day Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 -z-10 -translate-y-1/2 mx-10" />

                    {days.map((d) => {
                        const isActive = currentDay === d.day;
                        const isCompleted = completedDays.includes(d.day);
                        const isLocked = d.day > currentDay && !isCompleted;
                        const Icon = d.icon;

                        return (
                            <button
                                key={d.day}
                                onClick={() => !isLocked && setCurrentDay(d.day)}
                                disabled={isLocked}
                                className={`
                                    relative flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all duration-300 w-full group
                                    ${isActive
                                        ? `bg-white ${d.borderColor} shadow-lg scale-105 z-10 ring-4 ring-neutral-50`
                                        : isCompleted
                                            ? 'bg-white border-emerald-100 opacity-100 hover:border-emerald-200'
                                            : 'bg-neutral-50 border-transparent opacity-60 grayscale cursor-not-allowed'}
                                `}
                            >
                                <div className={`
                                    w-12 h-12 rounded-xl flex items-center justify-center mb-3 text-xl shadow-sm transition-transform duration-500
                                    ${isActive ? `${d.bgColor} ${d.color} scale-110` : isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-neutral-200 text-neutral-400'}
                                `}>
                                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                                </div>

                                <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${isActive ? d.color : isCompleted ? 'text-emerald-600' : 'text-neutral-400'}`}>
                                    Day 0{d.day}
                                </span>
                                <span className={`text-sm font-bold leading-tight ${isActive || isCompleted ? 'text-neutral-900' : 'text-neutral-400'}`}>
                                    {d.title}
                                </span>

                                {isActive && (
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-neutral-200 rotate-45 transform skew-x-12" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 animate-fade-in-up min-h-[600px]">
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
    );
};

export default OnboardingShell;
