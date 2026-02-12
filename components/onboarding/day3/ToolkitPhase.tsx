import React, { useState } from 'react';
import {
    Check,
    Zap,
    Lightbulb,
    Sparkles,
} from 'lucide-react';
import { WorkTool, ProductivityTip } from '../../../types';

interface ToolkitPhaseProps {
    tools: WorkTool[];
    setTools: React.Dispatch<React.SetStateAction<WorkTool[]>>;
    tips: ProductivityTip[];
    activeToolId: string | null;
    setActiveToolId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ToolkitPhase: React.FC<ToolkitPhaseProps> = ({
    tools,
    setTools,
    tips,
    activeToolId,
    setActiveToolId,
}) => {
    const handleToolWalkthrough = (toolId: string) => {
        setActiveToolId(toolId);
    };

    const handleCompleteToolWalkthrough = (toolId: string) => {
        setTools(prev => prev.map(t =>
            t.id === toolId ? { ...t, walkthroughCompleted: true } : t
        ));
        setActiveToolId(null);
    };

    return (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Toolkit Architecture</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Institutional velocity is powered by tool proficiency. Master the core applications that define our operational standard.
                </p>
            </div>

            {/* Tool Flow Diagram (Refined) */}
            <div className="bg-neutral-50/50 rounded-[32px] border border-neutral-100 p-10" role="region" aria-label="Core operational data flow">
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-8 text-center" aria-hidden="true">Operational Data Flow</p>
                <div className="flex items-center justify-center gap-6 flex-wrap" role="list">
                    {tools.filter(t => t.category === 'CORE').map((tool, index) => (
                        <React.Fragment key={tool.id}>
                            <div className={`
                                flex flex-col items-center p-6 rounded-2xl border transition-all cursor-pointer group w-32
                                ${tool.walkthroughCompleted
                                    ? 'bg-emerald-50 border-emerald-100 shadow-sm'
                                    : 'bg-white border-neutral-100 shadow-xl shadow-neutral-100/30 hover:shadow-2xl hover:border-brand-red/30'}
                            `}
                                role="listitem"
                                onClick={() => handleToolWalkthrough(tool.id)}
                                aria-label={`${tool.name}${tool.walkthroughCompleted ? ', Certification Complete' : ', Walkthrough Required'}`}
                            >
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform" aria-hidden="true">{tool.icon}</div>
                                <span className="text-[10px] font-black text-neutral-900 uppercase tracking-widest text-center" aria-hidden="true">{tool.name}</span>
                                {tool.walkthroughCompleted && (
                                    <div className="mt-2 p-1 bg-emerald-500 rounded-full" aria-hidden="true">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>
                            {index < tools.filter(t => t.category === 'CORE').length - 1 && (
                                <div className="flex items-center gap-1 opacity-20" aria-hidden="true">
                                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Tool Cards (Premium) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Available Work Tools">
                {tools.map((tool) => (
                    <div
                        key={tool.id}
                        role="listitem"
                        className={`
                            relative bg-white rounded-[32px] border p-8 transition-all group overflow-hidden
                            ${tool.walkthroughCompleted ? 'border-emerald-100 hover:border-emerald-200' : 'border-neutral-100 hover:border-brand-red/20'}
                            ${activeToolId === tool.id ? 'ring-4 ring-brand-red/5' : ''}
                        `}
                    >
                        <div className="flex items-start gap-6">
                            <div className={`
                                w-16 h-16 rounded-[20px] flex items-center justify-center text-3xl shadow-lg shadow-neutral-100
                                ${tool.walkthroughCompleted ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-50 text-neutral-600'}
                            `} aria-hidden="true">
                                {tool.icon}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className="text-lg font-black text-neutral-900 tracking-tight leading-none">{tool.name}</h4>
                                    <span className={`
                                        text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest
                                        ${tool.category === 'CORE' ? 'bg-red-50 text-brand-red' : 'bg-neutral-100 text-neutral-400'}
                                    `}>
                                        {tool.category}
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-500 font-medium leading-relaxed">{tool.purpose}</p>

                                {!tool.walkthroughCompleted && activeToolId !== tool.id && (
                                    <button
                                        onClick={() => handleToolWalkthrough(tool.id)}
                                        aria-label={`Initialize Walkthrough for ${tool.name}`}
                                        className="mt-4 px-4 py-2 bg-brand-red text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-600 transition-colors active:scale-95 shadow-lg shadow-red-500/20"
                                    >
                                        Initialize Walkthrough
                                    </button>
                                )}
                            </div>
                            {tool.walkthroughCompleted && (
                                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100" role="status" aria-label="Walkthrough Certified">
                                    <Check className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                                </div>
                            )}
                        </div>

                        {/* Expanded Tool View (Refined) */}
                        {activeToolId === tool.id && !tool.walkthroughCompleted && (
                            <div className="mt-8 pt-8 border-t border-neutral-50 animate-slide-up" role="region" aria-label={`${tool.name} certification panel`}>
                                <h5 className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-4">Programmable Accelerators</h5>
                                <div className="space-y-3" role="list">
                                    {tool.quickActions.map((action) => (
                                        <div
                                            key={action.id}
                                            role="listitem"
                                            className="flex items-center gap-4 p-4 bg-neutral-50/50 rounded-2xl border border-neutral-100 group/action hover:bg-white transition-all hover:shadow-md"
                                        >
                                            <div className="p-2 bg-white rounded-lg shadow-sm group-hover/action:bg-brand-red group-hover/action:text-white transition-colors" aria-hidden="true">
                                                <Zap className="w-3 h-3" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-bold text-neutral-900">{action.label}</p>
                                                <p className="text-[10px] text-neutral-400 font-medium mt-0.5">{action.description}</p>
                                            </div>
                                            {action.shortcut && (
                                                <kbd className="px-2 py-1 bg-white border border-neutral-100 rounded shadow-sm text-[9px] font-black text-neutral-500 uppercase tracking-widest" aria-label={`Shortcut: ${action.shortcut}`}>
                                                    {action.shortcut}
                                                </kbd>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => handleCompleteToolWalkthrough(tool.id)}
                                    className="mt-6 w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/10"
                                >
                                    <Check className="w-4 h-4" aria-hidden="true" /> Certification Complete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Productivity Tips (Redesigned) */}
            <div className="relative overflow-hidden bg-white rounded-[40px] p-12 border border-neutral-100 shadow-xl shadow-brand-red/5">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Lightbulb className="w-32 h-32" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-brand-red flex items-center justify-center shadow-lg shadow-red-500/20">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-xl font-black tracking-tight text-neutral-900">Institutional Velocity Hacks</h4>
                            <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Direct from Senior Engineering Leadership</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {tips.map((tip) => (
                            <div key={tip.id} className="bg-neutral-50 rounded-3xl p-6 border border-neutral-100 hover:border-brand-red/30 transition-all flex flex-col group">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-2xl group-hover:scale-110 transition-transform">{tools.find(t => t.id === tip.toolId)?.icon}</div>
                                    {tip.shortcutKey && (
                                        <kbd className="px-2 py-1 bg-white border border-neutral-200 rounded text-[9px] font-black text-neutral-500 uppercase tracking-widest shadow-sm">
                                            {tip.shortcutKey}
                                        </kbd>
                                    )}
                                </div>
                                <h5 className="text-sm font-black text-neutral-900 mb-2 leading-tight">{tip.title}</h5>
                                <p className="text-[11px] text-neutral-500 leading-relaxed font-medium mb-4 flex-1">{tip.description}</p>
                                <div className="pt-4 border-t border-neutral-200 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Node: {tip.toolName}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToolkitPhase;
