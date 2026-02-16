import React, { useState } from 'react';
import {
    Sparkles,
    Search,
    AlertTriangle,
    Wifi,
    WifiOff,
    Settings,
    TreePine,
    Compass,
    TrendingUp,
} from 'lucide-react';
import { UserProfile } from '@/types';
import MagicSearch from '@/features/search/MagicSearch';
import { MOCK_MARKET_GAP } from '@/config/constants';

type AppMode = 'DASHBOARD' | 'ONBOARDING';
type DashboardView = 'DAILY' | 'SKILLS' | 'INSIGHTS' | 'ANALYTICS' | 'SETTINGS';

interface AppHeaderProps {
    user: UserProfile;
    mode: AppMode;
    activeView?: DashboardView;
    onViewChange?: (view: DashboardView) => void;
    isOnline?: boolean;
    onToggleOnline?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
    user,
    mode,
    activeView = 'DAILY',
    onViewChange,
    isOnline = true,
    onToggleOnline,
}) => {
    const [showSearch, setShowSearch] = useState(false);

    const navItems: { view: DashboardView; icon: React.ReactNode; label: string }[] = [
        { view: 'DAILY', icon: <Sparkles className="w-4 h-4" />, label: 'Daily 3' },
        { view: 'SKILLS', icon: <TreePine className="w-4 h-4" />, label: 'Skill Graph' },
        { view: 'INSIGHTS', icon: <Compass className="w-4 h-4" />, label: 'Radar' },
        { view: 'ANALYTICS', icon: <TrendingUp className="w-4 h-4" />, label: 'Growth' },
        { view: 'SETTINGS', icon: <Settings className="w-4 h-4" />, label: 'Profile' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-100">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Brand / Logo Section */}
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-brand-red flex items-center justify-center shadow-lg shadow-red-500/20 active:scale-95 transition-transform">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black tracking-widest text-neutral-900 leading-none">DEX</span>
                        <span className="text-[10px] text-brand-red font-bold tracking-[0.2em] mt-1 uppercase">
                            {mode === 'ONBOARDING' ? 'Journey Engine' : 'Unified Engine'}
                        </span>
                    </div>
                </div>

                {/* Right Actions & Meta */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Search Launcher - Available in both modes */}
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
                        {mode === 'DASHBOARD' && MOCK_MARKET_GAP && (
                            <button className="p-1 text-amber-500 hover:scale-110 transition-transform relative" title="Market Gap Alert" aria-label="Market gap alert">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500 border-2 border-white animate-pulse" />
                            </button>
                        )}

                        <button
                            onClick={onToggleOnline}
                            className={`p-1 transition-all ${isOnline ? 'text-emerald-500' : 'text-brand-red animate-pulse'}`}
                            title={isOnline ? 'Connected to Enterprise Core' : 'Offline Mode Active'}
                            aria-label={isOnline ? 'Online' : 'Offline'}
                        >
                            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 pl-3 ml-1 border-l border-neutral-100">
                        <div className="hidden sm:block text-right">
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider leading-none mb-1">{user.department}</p>
                            <p className="text-xs font-bold text-neutral-900 truncate max-w-[100px]">{user.name}</p>
                        </div>
                        <button
                            className="avatar avatar-md shadow-md hover:scale-105 active:scale-95 transition-transform overflow-hidden relative group"
                            onClick={() => onViewChange?.('SETTINGS')}
                            aria-label="Open profile settings"
                        >
                            <span className="relative z-10">{user.name.split(' ').map(n => n[0]).join('')}</span>
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Dashboard Sub-Navigation (Tabs) - ONLY IN DASHBOARD MODE */}
            {mode === 'DASHBOARD' && (
                <div className="max-w-5xl mx-auto px-4 sm:px-6 overflow-x-auto no-scrollbar">
                    <nav className="flex items-center gap-1 sm:gap-2" role="tablist" aria-label="Dashboard sections">
                        {navItems.map((item) => (
                            <button
                                key={item.view}
                                role="tab"
                                aria-selected={activeView === item.view}
                                onClick={() => onViewChange?.(item.view)}
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
            )}

            {/* Integrated Magic Search Overlay */}
            {showSearch && (
                <div className="border-t border-neutral-100 bg-neutral-50/50 p-6 animate-slide-down">
                    <MagicSearch onClose={() => setShowSearch(false)} />
                </div>
            )}
        </header>
    );
};

export default AppHeader;
