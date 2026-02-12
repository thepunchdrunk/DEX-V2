import React, { useState } from 'react';
import {
    Play,
    Calendar,
    Receipt,
    Sparkles,
    ChevronRight,
} from 'lucide-react';
import { WorkEssential } from '../../../types';

interface WorkEssentialsSectionProps {
    workEssentials: WorkEssential[];
    setWorkEssentials: React.Dispatch<React.SetStateAction<WorkEssential[]>>;
}

const WorkEssentialsSection: React.FC<WorkEssentialsSectionProps> = ({
    workEssentials,
    setWorkEssentials,
}) => {
    const [activeDemo, setActiveDemo] = useState<string | null>(null);
    const [demoStep, setDemoStep] = useState(0);

    const handleStartDemo = (itemId: string) => {
        setActiveDemo(itemId);
        setDemoStep(0);
    };

    const handleDemoNext = (item: WorkEssential) => {
        if (item.demoSteps && demoStep < item.demoSteps.length - 1) {
            setDemoStep((prev) => prev + 1);
        } else {
            setWorkEssentials((prev) =>
                prev.map((w) => (w.id === item.id ? { ...w, completed: true } : w))
            );
            setActiveDemo(null);
            setDemoStep(0);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Protocols</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Master the internal mechanics of time management, fiscal responsibility, and local institutional traditions.
                </p>
            </div>

            <div className="space-y-4" role="list" aria-label="Institutional protocol items">
                {workEssentials.map((item) => (
                    <div
                        key={item.id}
                        role="listitem"
                        className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden group hover:border-brand-red/20 transition-colors"
                    >
                        <div className="p-6 flex items-center gap-6">
                            <div
                                className={`
                                w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105
                                ${item.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-50 text-neutral-400'}
                            `}
                                aria-hidden="true"
                            >
                                {item.category === 'LEAVE' && <Calendar className="w-7 h-7" />}
                                {item.category === 'EXPENSES' && <Receipt className="w-7 h-7" />}
                                {item.category === 'HOLIDAY_CALENDAR' && <Calendar className="w-7 h-7" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <p className="font-bold text-neutral-900">{item.title}</p>
                                    {item.completed && (
                                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                                            Validated
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-neutral-500 font-medium leading-relaxed">{item.description}</p>
                            </div>

                            {!item.completed && (
                                <div className="flex items-center">
                                    {item.interactiveDemo ? (
                                        <button
                                            onClick={() => handleStartDemo(item.id)}
                                            aria-label={`Start interactive demo for ${item.title}`}
                                            className="btn-primary flex items-center gap-2 py-2 px-6"
                                        >
                                            <Play className="w-3.5 h-3.5" aria-hidden="true" />
                                            <span className="text-[10px] uppercase font-black tracking-widest">Load Demo</span>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                setWorkEssentials((prev) =>
                                                    prev.map((w) => (w.id === item.id ? { ...w, completed: true } : w))
                                                )
                                            }
                                            aria-label={`Complete ${item.title}`}
                                            className="btn-secondary py-2 px-6 text-[10px] uppercase font-black tracking-widest"
                                        >
                                            Complete
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Interactive Simulation Layer */}
                        {activeDemo === item.id && item.demoSteps && (
                            <div
                                className="p-8 bg-neutral-50/50 border-t border-neutral-100 animate-slide-down"
                                role="region"
                                aria-label={`${item.title} Demo Simulation`}
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className="flex-1 h-1.5 bg-neutral-200 rounded-full overflow-hidden"
                                        role="progressbar"
                                        aria-valuenow={demoStep + 1}
                                        aria-valuemin={1}
                                        aria-valuemax={item.demoSteps.length}
                                    >
                                        <div
                                            className="h-full bg-brand-red transition-all duration-1000 ease-out shadow-lg shadow-red-500/20"
                                            style={{ width: `${((demoStep + 1) / item.demoSteps.length) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-black text-brand-red uppercase tracking-widest whitespace-nowrap">
                                        Protocol Step {demoStep + 1} / {item.demoSteps.length}
                                    </span>
                                </div>

                                <div
                                    className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm mb-6 flex gap-4 items-start"
                                    role="status"
                                >
                                    <div
                                        className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0"
                                        aria-hidden="true"
                                    >
                                        <Sparkles className="w-5 h-5 text-brand-red" />
                                    </div>
                                    <p className="text-sm text-neutral-700 font-medium leading-relaxed pt-2">
                                        {item.demoSteps[demoStep]}
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleDemoNext(item)}
                                        aria-label={
                                            demoStep < item.demoSteps.length - 1
                                                ? 'Execute Next Action'
                                                : 'Finalize Simulation'
                                        }
                                        className="btn-primary flex items-center gap-3 py-3 px-8 group"
                                    >
                                        <span className="text-xs uppercase font-black tracking-widest">
                                            {demoStep < item.demoSteps.length - 1
                                                ? 'Execute Next Action'
                                                : 'Finalize Simulation'}
                                        </span>
                                        <ChevronRight
                                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkEssentialsSection;
