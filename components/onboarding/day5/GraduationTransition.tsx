import React, { useEffect, useState } from 'react';
import {
    Sparkles,
} from 'lucide-react';

interface GraduationTransitionProps {
    onComplete: () => void;
}

const GraduationTransition: React.FC<GraduationTransitionProps> = ({
    onComplete,
}) => {
    const [themeTransitionProgress, setThemeTransitionProgress] = useState(0);

    // Theme transition animation
    useEffect(() => {
        const interval = setInterval(() => {
            setThemeTransitionProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="text-center py-24 space-y-12 animate-fade-in">
            <div className="relative inline-block" role="img" aria-label="Calibration icon">
                <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center bg-red-50 border border-red-100 shadow-inner relative z-10">
                    <Sparkles className="w-12 h-12 text-brand-red animate-spin-slow" aria-hidden="true" />
                </div>
                <div className="absolute inset-0 border-2 border-brand-red/20 rounded-full animate-ping scale-110" aria-hidden="true" />
            </div>

            <div className="space-y-4">
                <h2 className="text-3xl font-black text-neutral-900 tracking-tight uppercase">
                    {themeTransitionProgress < 50 ? 'Initializing <span className="text-brand-red">Ecosystem</span>' : 'Calibration <span className="text-brand-red">Finalized</span>'}
                </h2>
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.4em] animate-pulse">
                    {themeTransitionProgress < 50
                        ? 'Initializing Dashboard...'
                        : 'Operational Cockpit Ready'}
                </p>
            </div>

            {/* Progress Visualization (Premium) */}
            <div className="max-w-md mx-auto relative px-8" role="progressbar" aria-valuenow={themeTransitionProgress} aria-valuemin={0} aria-valuemax={100} aria-label="Ecosystem activation progress">
                <div className="h-1 bg-neutral-100 rounded-full overflow-hidden mb-4">
                    <div
                        className="h-full transition-all duration-100 bg-brand-red shadow-[0_0_15px_rgba(230,0,0,0.5)]"
                        style={{
                            width: `${themeTransitionProgress}%`,
                        }}
                    />
                </div>
                <div className="flex justify-between items-center text-[9px] font-black text-neutral-300 uppercase tracking-widest" aria-hidden="true">
                    <span>Calibration</span>
                    <span className="text-brand-red">{themeTransitionProgress}%</span>
                    <span>Deployment</span>
                </div>
            </div>
        </div>
    );
};

export default GraduationTransition;
