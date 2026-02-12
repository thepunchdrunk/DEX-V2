import React, { useState } from 'react';
import {
    ChevronRight,
    Check,
} from 'lucide-react';
import {
    UserProfile,
    WorkTool,
    FirstTaskSimulation,
    FirstContribution,
    ProductivityTip,
} from '../../../types';
import {
    WORK_TOOLS,
    FIRST_TASK_SIMULATION_QA,
    FIRST_TASK_SIMULATION_FRONTLINE,
    FIRST_TASK_SIMULATION_SALES,
    FIRST_CONTRIBUTIONS,
    PRODUCTIVITY_TIPS,
} from '../../../constants';

// Modularized Components
import ToolkitPhase from './ToolkitPhase';
import SimulatorPhase from './SimulatorPhase';
import ContributionsPhase from './ContributionsPhase';

interface Day3ToolsWorkflowProps {
    user: UserProfile;
    onComplete: () => void;
}

const Day3ToolsWorkflow: React.FC<Day3ToolsWorkflowProps> = ({ user, onComplete }) => {
    const [phase, setPhase] = useState<'TOOLKIT' | 'SIMULATOR' | 'CONTRIBUTIONS' | 'DONE'>('TOOLKIT');

    // Filter tools based on user role
    const relevantTools = WORK_TOOLS.filter(t =>
        !t.roleCategories || (user.roleCategory && t.roleCategories.includes(user.roleCategory))
    );

    const [tools, setTools] = useState<WorkTool[]>(relevantTools);

    // Select simulation based on role
    const getSimulationForRole = () => {
        if (user.roleCategory === 'FRONTLINE') return FIRST_TASK_SIMULATION_FRONTLINE;
        if (user.department === 'Sales' || user.roleCategory === 'REMOTE') return FIRST_TASK_SIMULATION_SALES;
        return FIRST_TASK_SIMULATION_QA;
    };

    const [simulation, setSimulation] = useState<FirstTaskSimulation>(getSimulationForRole());
    const [contributions, setContributions] = useState<FirstContribution[]>(FIRST_CONTRIBUTIONS);
    const [tips] = useState<ProductivityTip[]>(PRODUCTIVITY_TIPS);
    const [activeToolId, setActiveToolId] = useState<string | null>(null);

    // Contributions - need at least 2
    const contributionsStarted = contributions.filter(c => c.status !== 'AVAILABLE').length >= 2;

    const handleCompleteDay = () => {
        setPhase('DONE');
        setTimeout(onComplete, 1500);
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in selection:bg-red-100 selection:text-brand-red">
            {/* Context Header */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-black text-brand-red bg-red-50 px-3 py-1 rounded-full uppercase tracking-widest">Phase 03 / 05</span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Operational Efficiency & Tools</span>
                </div>
                <h1 className="text-4xl font-black text-neutral-900 tracking-tight mb-4 leading-tight">
                    Mastering your <span className="text-brand-red">Operational Stack</span>
                </h1>
                <p className="text-sm text-neutral-500 max-w-2xl leading-relaxed">
                    Institutional velocity is achieved through tool mastery and process fluency. Practice in our risk-free sandbox environment to gain early operational confidence.
                </p>
            </div>

            {/* Phase Navigation (Unified & Premium) */}
            <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-100/30 p-2 mb-10 flex gap-1 overflow-x-auto no-scrollbar" role="tablist" aria-label="Day 3 Onboarding Phases">
                {[
                    { id: 'TOOLKIT', label: 'Work Toolkit', icon: '🛠️' },
                    { id: 'SIMULATOR', label: 'First Task Sandbox', icon: '🎮' },
                    { id: 'CONTRIBUTIONS', label: 'Contribution Matrix', icon: '⭐' },
                ].map((p) => {
                    const isActive = phase === p.id || (phase === 'DONE' && p.id === 'CONTRIBUTIONS');
                    const isCompleted =
                        (p.id === 'TOOLKIT' && (phase === 'SIMULATOR' || phase === 'CONTRIBUTIONS' || phase === 'DONE')) ||
                        (p.id === 'SIMULATOR' && (phase === 'CONTRIBUTIONS' || phase === 'DONE')) ||
                        (p.id === 'CONTRIBUTIONS' && phase === 'DONE');

                    return (
                        <button
                            key={p.id}
                            onClick={() => phase !== 'DONE' && setPhase(p.id as any)}
                            role="tab"
                            aria-selected={isActive}
                            aria-label={`${p.label}${isCompleted ? ', Completed' : ''}`}
                            className={`
                                flex-1 min-w-[160px] px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3
                                ${isActive && phase !== 'DONE'
                                    ? 'bg-white border-brand-red text-brand-red shadow-lg shadow-red-500/10 -translate-y-0.5'
                                    : (isCompleted ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-white text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600')}
                            `}
                        >
                            <span className="text-lg" aria-hidden="true">
                                {isCompleted ? <Check className="w-4 h-4" /> : p.icon}
                            </span>
                            {p.label}
                        </button>
                    );
                })}
            </div>

            {/* Focused Operational Content */}
            <div className="bg-white rounded-[32px] border border-neutral-100 shadow-sm p-8 md:p-12 mb-10 min-h-[500px] animate-slide-up">
                <div className="max-w-4xl mx-auto">
                    {phase === 'TOOLKIT' && (
                        <ToolkitPhase
                            tools={tools}
                            setTools={setTools}
                            tips={tips}
                            activeToolId={activeToolId}
                            setActiveToolId={setActiveToolId}
                        />
                    )}
                    {phase === 'SIMULATOR' && (
                        <SimulatorPhase
                            simulation={simulation}
                            setSimulation={setSimulation}
                            onComplete={() => setPhase('CONTRIBUTIONS')}
                        />
                    )}
                    {phase === 'CONTRIBUTIONS' && (
                        <ContributionsPhase
                            contributions={contributions}
                            setContributions={setContributions}
                        />
                    )}
                    {phase === 'DONE' && (
                        <div className="text-center py-24 animate-fade-in">
                            <div className="w-24 h-24 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <Check className="w-12 h-12 text-emerald-600" />
                            </div>
                            <h2 className="text-3xl font-black text-neutral-900 mb-4 tracking-tight">Phase 03 Calibrated</h2>
                            <p className="text-neutral-500 max-w-sm mx-auto leading-relaxed">
                                You've demonstrated proficiency in your core operational stack. Preparing transition to Network Mapping...
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Advancement Protocol */}
            {phase !== 'DONE' && (
                <div className="flex flex-col items-center gap-6">
                    {phase === 'CONTRIBUTIONS' && (
                        <button
                            onClick={handleCompleteDay}
                            disabled={!contributionsStarted}
                            className={`
                                w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-4 group
                                ${contributionsStarted
                                    ? 'bg-brand-red text-white shadow-xl shadow-red-500/30 hover:shadow-red-500/40 hover:-translate-y-1 active:translate-y-0'
                                    : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                            `}
                        >
                            {contributionsStarted ? (
                                <>
                                    Finalize Day 03: Transition to Network Mapping
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            ) : (
                                <>Initiate at Least 2 Contributions to Proceed ({contributions.filter(c => c.status !== 'AVAILABLE').length}/2)</>
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Day3ToolsWorkflow;
