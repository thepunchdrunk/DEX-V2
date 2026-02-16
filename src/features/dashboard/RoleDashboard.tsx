import React, { useState, useMemo } from 'react';
import {
    Sparkles,
    TreePine,
    Users,
    Settings,
    Search,
    Bell,
    Wifi,
    WifiOff,
    AlertTriangle,
    RefreshCw,
    BarChart3,
    Compass,
    TrendingUp,
    Sun,
    Moon,
    CloudSun,
} from 'lucide-react';
import { UserProfile, DailyCard, MarketGapCard, SkillBranch } from '@/types';
import { THEME_COLORS, MOCK_DAILY_CARDS, MOCK_MARKET_GAP, MOCK_SKILL_TREE } from '@/config/constants';
import Daily3Feed from './Daily3Feed';
import SkillTree from '../tree/SkillTree';
import MagicSearch from '../search/MagicSearch';
import AnalyticsDashboard from '../analytics/AnalyticsDashboard';
import InsightsHub from './InsightsHub';
import AppHeader from '@/components/shared/AppHeader';

type DashboardView = 'DAILY' | 'SKILLS' | 'INSIGHTS' | 'ANALYTICS' | 'SETTINGS';

interface RoleDashboardProps {
    user: UserProfile;
    isWednesday?: boolean;
    onUpdateUser: (updates: Partial<UserProfile>) => void;
}

const RoleDashboard: React.FC<RoleDashboardProps> = ({ user, isWednesday = false, onUpdateUser }) => {
    const [activeView, setActiveView] = useState<DashboardView>('DAILY');
    const [isOnline, setIsOnline] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [cards, setCards] = useState<DailyCard[]>(
        MOCK_DAILY_CARDS.filter(c => !c.roleCategories || (user.roleCategory && c.roleCategories.includes(user.roleCategory)))
    );

    const navItems: { view: DashboardView; icon: React.ReactNode; label: string }[] = [
        { view: 'DAILY', icon: <Sparkles className="w-4 h-4" />, label: 'Daily 3' },
        { view: 'SKILLS', icon: <TreePine className="w-4 h-4" />, label: 'Skill Graph' },
        { view: 'INSIGHTS', icon: <Compass className="w-4 h-4" />, label: 'Radar' },
        { view: 'ANALYTICS', icon: <TrendingUp className="w-4 h-4" />, label: 'Growth' },
        { view: 'SETTINGS', icon: <Settings className="w-4 h-4" />, label: 'Profile' },
    ];

    // Time-aware greeting
    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return { text: 'Good morning', icon: <Sun className="w-5 h-5 text-amber-400" /> };
        if (hour < 17) return { text: 'Good afternoon', icon: <CloudSun className="w-5 h-5 text-orange-400" /> };
        return { text: 'Good evening', icon: <Moon className="w-5 h-5 text-indigo-400" /> };
    }, []);

    const handleCardAction = (card: DailyCard) => {

        if (card.actionUrl) {
            window.open(card.actionUrl, '_blank');
        }
    };

    const handleCardFlag = (cardId: string) => {
        setCards((prev) =>
            prev.map((c) =>
                c.id === cardId
                    ? { ...c, flagged: true, flagCount: (c.flagCount || 0) + 1 }
                    : c
            )
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-red-100 selection:text-brand-red">
            {/* Top Navigation Bar */}
            {/* Top Navigation Bar via Shared AppHeader */}
            <AppHeader
                user={user}
                mode="DASHBOARD"
                activeView={activeView}
                onViewChange={setActiveView}
                isOnline={isOnline}
                onToggleOnline={() => setIsOnline(!isOnline)}
            />

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto bg-neutral-50/30" role="tabpanel" aria-live="polite">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
                    {/* Daily View */}
                    {activeView === 'DAILY' && (
                        <div className="page-transition">
                            {/* Greeting Banner */}
                            <div className="greeting-banner animate-fade-in">
                                <div className="flex items-center gap-3">
                                    {greeting.icon}
                                    <div>
                                        <h2>{greeting.text}, {user.name.split(' ')[0]}</h2>
                                        <p>Here's what's important for you today.</p>
                                    </div>
                                </div>
                            </div>
                            <Daily3Feed
                                user={user}
                                cards={cards}
                                isWednesday={isWednesday}
                                completedCards={user.onboardingProgress || []}
                                onCardAction={handleCardAction}
                                onCardFlag={handleCardFlag}
                                onMarkComplete={(id) => {
                                    const newProgress = [...(user.onboardingProgress || []), id];
                                    onUpdateUser({ onboardingProgress: newProgress });
                                }}
                            />
                        </div>
                    )}

                    {/* Skills View */}
                    {activeView === 'SKILLS' && (
                        <div className="page-transition">
                            <SkillTree branches={MOCK_SKILL_TREE} />
                        </div>
                    )}

                    {/* Insights View */}
                    {activeView === 'INSIGHTS' && (
                        <div className="page-transition">
                            <InsightsHub />
                        </div>
                    )}

                    {/* Analytics View */}
                    {activeView === 'ANALYTICS' && (
                        <div className="page-transition">
                            <AnalyticsDashboard />
                        </div>
                    )}

                    {/* Settings View */}
                    {activeView === 'SETTINGS' && (
                        <div className="page-transition max-w-2xl mx-auto">
                            <div className="flex items-center justify-between mb-8 border-b border-neutral-200 pb-4">
                                <h1 className="text-3xl font-black text-neutral-900 leading-tight">System Settings</h1>
                                <span className="text-label">Configuration v2.1</span>
                            </div>

                            <div className="space-y-6">
                                {/* Profile Card */}
                                <section className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                                    <h3 className="text-lg font-bold text-neutral-900 mb-5 flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-brand-red" />
                                        Profile Overview
                                    </h3>
                                    <div className="flex items-start gap-5 mb-6">
                                        <div className="avatar avatar-xl shadow-lg">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-lg font-bold text-neutral-900 mb-0.5">{user.name}</p>
                                            <p className="text-sm text-neutral-500 mb-3">{user.jobTitle}</p>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="badge badge-red">{user.department}</span>
                                                <span className="badge badge-neutral">{user.roleCategory || 'DESK'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
                                        <div>
                                            <p className="text-label mb-1.5">Display Name</p>
                                            <p className="text-sm font-semibold text-neutral-800">{user.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-label mb-1.5">Institutional ID</p>
                                            <p className="text-sm font-semibold font-mono text-neutral-800">{user.employeeId}</p>
                                        </div>
                                    </div>
                                </section>

                                {/* Danger Zone */}
                                <section className="p-6 bg-white rounded-2xl border border-red-100 shadow-sm">
                                    <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                        <RefreshCw className="w-5 h-5 text-red-500" />
                                        Danger Zone
                                    </h3>
                                    <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                                        Permanently wipe all session progress, knowledge graph anchors, and locally cached institution state. This action is irreversible.
                                    </p>
                                    <button
                                        onClick={() => {
                                            if (confirm('Reset entire institution state? This will clear all locally stored progress.')) {
                                                localStorage.clear();
                                                window.location.reload();
                                            }
                                        }}
                                        className="btn-destructive w-full"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        Execute Hard Reset
                                    </button>
                                </section>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoleDashboard;
