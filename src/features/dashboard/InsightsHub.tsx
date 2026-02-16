import React, { useState } from 'react';
import {
    Calendar,
    Users,
    Lightbulb,
    Gamepad2,
    Target,
    Shield,
    Map,
    ChevronRight,
    ChevronLeft,
} from 'lucide-react';
import { MeetingIntelligence, PeerPractice, EnhancedSimulator, DecisionAssist, FocusGuard, CareerHorizon } from './features';

type InsightsTab = 'MEETINGS' | 'PEERS' | 'SIMULATOR' | 'DECISIONS' | 'FOCUS' | 'CAREER';

interface InsightsHubProps {
    className?: string;
}

const TOOL_CARDS = [
    {
        id: 'SIMULATOR' as InsightsTab,
        icon: Gamepad2,
        title: 'Simulator',
        description: 'Practice high-stakes scenarios in a safe environment.',
        action: 'Launch',
        accentColor: 'text-brand-red',
        iconBg: 'bg-brand-red',
        hoverBorder: 'hover:border-brand-red/30',
    },
    {
        id: 'DECISIONS' as InsightsTab,
        icon: Target,
        title: 'Decision Forge',
        description: 'Frameworks for making complex, high-impact choices.',
        action: 'Open',
        accentColor: 'text-purple-600',
        iconBg: 'bg-gradient-to-br from-indigo-400 to-purple-600',
        hoverBorder: 'hover:border-purple-300',
    },
    {
        id: 'PEERS' as InsightsTab,
        icon: Users,
        title: 'Peer Practices',
        description: 'Discover what high-performers are doing differently.',
        action: 'Explore',
        accentColor: 'text-violet-600',
        iconBg: 'bg-gradient-to-br from-violet-400 to-purple-600',
        hoverBorder: 'hover:border-violet-300',
    },
    {
        id: 'CAREER' as InsightsTab,
        icon: Map,
        title: 'Career Horizon',
        description: 'Market trends & career pathing insights.',
        action: 'View',
        accentColor: 'text-purple-600',
        iconBg: 'bg-purple-600',
        hoverBorder: 'hover:border-purple-300',
    },
];

const InsightsHub: React.FC<InsightsHubProps> = ({ className = '' }) => {
    const [activeTool, setActiveTool] = useState<InsightsTab | null>(null);

    // If a tool is open, show full view with back button
    if (activeTool) {
        const activeCard = TOOL_CARDS.find(c => c.id === activeTool);
        return (
            <div className={`space-y-6 ${className}`}>
                {/* Breadcrumb navigation */}
                <div className="flex items-center gap-2 mb-4">
                    <button
                        onClick={() => setActiveTool(null)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all text-sm font-medium active:scale-95"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Radar
                    </button>
                    {activeCard && (
                        <>
                            <span className="text-neutral-300">/</span>
                            <span className="text-sm font-bold text-neutral-900">{activeCard.title}</span>
                        </>
                    )}
                </div>

                <div className="bg-neutral-50 rounded-2xl p-4 md:p-6 border border-neutral-200 min-h-[600px] page-transition">
                    {activeTool === 'MEETINGS' && <MeetingIntelligence />}
                    {activeTool === 'PEERS' && <PeerPractice />}
                    {activeTool === 'SIMULATOR' && <EnhancedSimulator />}
                    {activeTool === 'DECISIONS' && <DecisionAssist />}
                    {activeTool === 'FOCUS' && <FocusGuard />}
                    {activeTool === 'CAREER' && <CareerHorizon />}
                </div>
            </div>
        );
    }

    // Default: Radar & Toolkit Dashboard
    return (
        <div className={`space-y-8 ${className}`}>

            {/* 1. CONTEXT RADAR (Passive Analytics) */}
            <section className="animate-fade-in">
                <div className="flex items-center gap-2 mb-5">
                    <h2 className="text-xl font-bold text-black">My Radar</h2>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-medium">Live Signals</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MeetingIntelligence viewMode="WIDGET" className="cursor-pointer card-interactive" onClick={() => setActiveTool('MEETINGS')} />
                    <FocusGuard viewMode="WIDGET" className="cursor-pointer card-interactive" onClick={() => setActiveTool('FOCUS')} />
                </div>
            </section>

            {/* 2. MY TOOLS (Active Tools) */}
            <section className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <div className="flex items-center gap-2 mb-5">
                    <h2 className="text-xl font-bold text-black">My Tools</h2>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-200 font-medium">On-Demand</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {TOOL_CARDS.map((tool, index) => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id)}
                            className={`group flex flex-col p-5 rounded-2xl bg-white border border-neutral-200 ${tool.hoverBorder} hover:shadow-md text-left transition-all card-interactive animate-fade-in-up`}
                            style={{ animationDelay: `${(index + 1) * 80}ms` }}
                        >
                            <div className={`w-10 h-10 rounded-xl ${tool.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <tool.icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-black mb-1">{tool.title}</h3>
                            <p className="text-xs text-neutral-500 mb-4 flex-1 leading-relaxed">{tool.description}</p>
                            <div className={`flex items-center gap-2 text-xs font-semibold ${tool.accentColor}`}>
                                <span className="uppercase tracking-wider">{tool.action}</span>
                                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default InsightsHub;
