import React, { useState, useEffect } from 'react';
import {
    Sparkles,
    Zap,
    Shield,
    Check,
    ChevronRight,
    Loader2,
} from 'lucide-react';

interface OnboardingV2Props {
    onComplete: () => void;
    userName?: string;
}

const OnboardingV2: React.FC<OnboardingV2Props> = ({
    onComplete,
    userName = 'Agent',
}) => {
    const [initializing, setInitializing] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleInitialize = () => {
        setInitializing(true);
        // Simulate initialization sequence
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950 to-neutral-950" />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-neutral-900/50 backdrop-blur-2xl border border-neutral-800 rounded-3xl p-8 shadow-2xl shadow-black/50 overflow-hidden">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 ring-1 ring-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                            <Sparkles className="w-8 h-8 text-indigo-400" />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                            Welcome, {userName}
                        </h1>
                        <p className="text-neutral-400 text-lg leading-relaxed">
                            Initialize your workspace to begin the integration capability assessment.
                        </p>
                    </div>

                    {/* Feature List */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                <Zap className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-200 text-sm">Context Engine</h3>
                                <p className="text-xs text-neutral-500">Real-time performance guidance</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
                            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-neutral-200 text-sm">Cognitive Protection</h3>
                                <p className="text-xs text-neutral-500">Load balancing & focus guard</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleInitialize}
                        disabled={initializing}
                        className="w-full relative group overflow-hidden rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 py-4 font-bold text-white shadow-lg shadow-indigo-900/20 ring-1 ring-indigo-400/20"
                    >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            {initializing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Initializing System... {progress}%</span>
                                </>
                            ) : (
                                <>
                                    <span>Initialize Agent System</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </div>

                        {/* Progress Bar Background */}
                        {initializing && (
                            <div
                                className="absolute inset-0 bg-indigo-500 transition-all duration-100 ease-linear origin-left"
                                style={{ width: `${progress}%` }}
                            />
                        )}
                    </button>

                    <div className="mt-6 flex justify-center">
                        <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
                            System Version 2.4.0
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingV2;
