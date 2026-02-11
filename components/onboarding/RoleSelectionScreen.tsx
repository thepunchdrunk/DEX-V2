import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../../types';
import { Briefcase, Globe, Sparkles, CheckCircle2, ChevronRight, Unlock, Settings } from 'lucide-react';

interface RoleSelectionScreenProps {
    onSelectRole: (roleData: Partial<UserProfile>) => void;
}

const ROLES = [
    {
        id: 'sr-eng',
        title: 'Senior Software Engineer',
        department: 'Engineering',
        roleCategory: 'DESK',
        role: 'EMPLOYEE',
        icon: Unlock,
        description: 'Leading technical implementation, architecture design, and high-quality code delivery.',
        gradient: 'from-[#E60000]/10 to-[#E60000]/5',
        iconBg: 'bg-[#E60000]',
        personaTag: 'Technical Lead',
        highlightTask: 'System Architecture PR',
        shortcut: '1',
    },
    {
        id: 'remote-eng',
        title: 'Cloud Architect',
        department: 'Engineering',
        roleCategory: 'REMOTE',
        role: 'EMPLOYEE',
        icon: Globe,
        description: 'Designs cloud infrastructure from anywhere, prioritizing async collaboration.',
        gradient: 'from-[#8B5CF6]/10 to-[#8B5CF6]/5',
        iconBg: 'bg-[#8B5CF6]',
        personaTag: 'Global IC',
        highlightTask: 'Deploy Cloud Stack',
        shortcut: '2',
    },
    {
        id: 'customer-success',
        title: 'Customer Success',
        department: 'Sales',
        roleCategory: 'REMOTE',
        role: 'EMPLOYEE',
        icon: Sparkles,
        description: 'Manages client relationships and ensures customer satisfaction remotely.',
        gradient: 'from-[#3B82F6]/10 to-[#3B82F6]/5',
        iconBg: 'bg-[#3B82F6]',
        personaTag: 'Client IC',
        highlightTask: 'Log Client Discovery',
        shortcut: '3',
    },
] as const;

const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onSelectRole }) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const selectRole = useCallback((role: typeof ROLES[number]) => {
        onSelectRole({
            jobTitle: role.title,
            department: role.department,
            roleCategory: role.roleCategory as any,
            role: role.role as any,
        });
    }, [onSelectRole]);

    // Keyboard shortcuts (1, 2, 3)
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const idx = parseInt(e.key) - 1;
            if (idx >= 0 && idx < ROLES.length && !e.metaKey && !e.ctrlKey && !e.altKey) {
                selectRole(ROLES[idx]);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [selectRole]);

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-radial from-[#E60000]/[0.03] to-transparent" />
                <div className="absolute -bottom-1/3 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-radial from-[#8B5CF6]/[0.03] to-transparent" />
            </div>

            <div className="relative z-10 max-w-4xl w-full">
                {/* Hero Header */}
                <div className="text-center mb-14 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-neutral-200 shadow-sm mb-8">
                        <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em]">New Journey Starting</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-black mb-5 leading-[1.1] tracking-tight">
                        Welcome to <span className="text-brand-red">DEX</span>
                    </h1>
                    <p className="text-base md:text-lg text-neutral-600 max-w-md mx-auto leading-relaxed">
                        Select your role to personalize your onboarding experience —{' '}
                        <br className="hidden sm:inline" />
                        every journey is uniquely crafted.
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
                    {ROLES.map((role, index) => (
                        <button
                            key={role.id}
                            onClick={() => selectRole(role)}
                            onMouseEnter={() => setHoveredId(role.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className={`
                                group relative bg-white hover:bg-gradient-to-br ${role.gradient}
                                border border-neutral-200 hover:border-brand-red/30
                                rounded-2xl p-7 transition-all duration-300 text-left
                                hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-red/5
                                focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2
                                animate-fade-in-up active:scale-[0.98]
                            `}
                            style={{ animationDelay: `${index * 120 + 200}ms` }}
                            aria-label={`Select ${role.title} role. Press ${role.shortcut} for quick select.`}
                        >
                            {/* Keyboard Shortcut Badge */}
                            <div className="absolute top-5 right-5 w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-[11px] font-bold text-neutral-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-focus-visible:opacity-100">
                                {role.shortcut}
                            </div>

                            {/* Icon */}
                            <div className={`${role.iconBg} w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                <role.icon className="w-6 h-6 text-white" />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-black mb-2 group-hover:text-brand-red transition-colors duration-200">
                                {role.title}
                            </h3>
                            <p className="text-sm text-neutral-600 leading-relaxed mb-5">
                                {role.description}
                            </p>

                            {/* Meta Tags */}
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="badge badge-red">
                                    {role.personaTag}
                                </span>
                                <span className="badge badge-neutral">
                                    {role.department}
                                </span>
                            </div>

                            {/* Key Task Highlight */}
                            <div className="flex items-center gap-2 text-xs text-brand-red font-medium bg-red-50 px-3 py-2.5 rounded-lg border border-brand-red/10">
                                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>Key: {role.highlightTask}</span>
                            </div>

                            {/* Hover Arrow */}
                            <div className="absolute top-7 right-5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                <ChevronRight className="w-5 h-5 text-brand-red" />
                            </div>

                            {/* Selection Check */}
                            <div className="absolute bottom-7 right-6 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                                <CheckCircle2 className="w-5 h-5 text-brand-red" />
                            </div>
                        </button>
                    ))}
                </div>

                {/* Footer Hint */}
                <div className="text-center mt-10 animate-fade-in" style={{ animationDelay: '700ms' }}>
                    <p className="inline-flex items-center gap-2 text-xs text-neutral-400">
                        <Settings className="w-3.5 h-3.5" />
                        You can always reset your profile later from Settings
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RoleSelectionScreen;
