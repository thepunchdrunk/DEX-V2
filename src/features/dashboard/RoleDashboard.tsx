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
import InsightsHub from './InsightsHub';
import { StreakCounter, SkillEndorsements, CareerHorizon, PlayerIdentityBadge, FearlessFeedback, ManagerChecklist, AgentDossier } from './features';

type DashboardView = 'DAILY' | 'SKILLS' | 'INSIGHTS' | 'SETTINGS';

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
        { view: 'INSIGHTS', icon: <Compass className="w-4 h-4" />, label: 'Toolkit' },
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
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Brand / Logo Section */}
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-brand-red flex items-center justify-center shadow-lg shadow-red-500/20 active:scale-95 transition-transform">
                            <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black tracking-widest text-neutral-900 leading-none">DEX</span>
                            <span className="text-[10px] text-brand-red font-bold tracking-[0.2em] mt-1 uppercase">Unified Engine</span>
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
                            {MOCK_MARKET_GAP && (
                                <button className="p-1 text-amber-500 hover:scale-110 transition-transform relative" title="Market Gap Alert" aria-label="Market gap alert">
                                    <AlertTriangle className="w-4 h-4" />
                                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500 border-2 border-white animate-pulse" />
                                </button>
                            )}

                            <button
                                onClick={() => setIsOnline(!isOnline)}
                                className={`p-1 transition-all ${isOnline ? 'text-emerald-500' : 'text-brand-red animate-pulse'}`}
                                title={isOnline ? 'Connected to Enterprise Core' : 'Offline Mode Active'}
                                aria-label={isOnline ? 'Online' : 'Offline'}
                            >
                                {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Player Identity Badge */}
                        <div className="hidden sm:block">
                            <PlayerIdentityBadge compact daysSinceJoin={45} />
                        </div>

                        {/* Streak Counter */}
                        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-orange-50 border border-orange-200">
                            <StreakCounter compact />
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 pl-3 ml-1 border-l border-neutral-100">
                            <div className="hidden sm:block text-right">
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider leading-none mb-1">{user.department}</p>
                                <p className="text-xs font-bold text-neutral-900 truncate max-w-[100px]">{user.name}</p>
                            </div>
                            <button
                                className="avatar avatar-md shadow-md hover:scale-105 active:scale-95 transition-transform overflow-hidden relative group"
                                onClick={() => setActiveView('SETTINGS')}
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
                    <nav className="flex items-center gap-1 sm:gap-2" role="tablist" aria-label="Dashboard sections">
                        {navItems.map((item) => (
                            <button
                                key={item.view}
                                role="tab"
                                aria-selected={activeView === item.view}
                                onClick={() => setActiveView(item.view)}
                                className={`
                                    relative py-3.5 px-3 sm:px-4 text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap rounded-lg
                                    flex items-center gap-2
                                    ${activeView === item.view
                                        ? 'text-brand-red'
                                        : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50'}
                                `}
                            >
                                {item.icon}
                                <span className="hidden sm:inline">{item.label}</span>
                                <span className="sm:hidden">{item.label.split(' ')[0]}</span>
                                {activeView === item.view && (
                                    <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-red rounded-full animate-slide-right" />
                                )}
                            </button>
                        ))}
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

                            {/* Manager Quest Board (conditionally shown for manager roles) */}
                            {user.role === 'MANAGER' && (
                                <div className="mt-6">
                                    <ManagerChecklist />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Skills View */}
                    {activeView === 'SKILLS' && (
                        <div className="page-transition space-y-6">
                            <SkillTree branches={MOCK_SKILL_TREE} />
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                                <CareerHorizon />
                                <SkillEndorsements />
                                <FearlessFeedback />
                            </div>
                        </div>
                    )}

                    {/* Insights View */}
                    {activeView === 'INSIGHTS' && (
                        <div className="page-transition">
                            <InsightsHub />
                        </div>
                    )}


                    {/* Settings View (Now Agent Dossier) */}
                    {activeView === 'SETTINGS' && (
                        <div className="page-transition">
                            <AgentDossier user={user} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoleDashboard;
