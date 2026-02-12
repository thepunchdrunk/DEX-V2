import React, { useState } from 'react';
import {
    Target,
    Check,
    Lightbulb,
    HelpCircle,
    ChevronRight,
    Sparkles,
    CheckCircle2,
    FileText,
    Eye,
} from 'lucide-react';
import { FirstTaskSimulation } from '../../../types';

interface SimulatorPhaseProps {
    simulation: FirstTaskSimulation;
    setSimulation: React.Dispatch<React.SetStateAction<FirstTaskSimulation>>;
    onComplete: () => void;
}

const SimulatorPhase: React.FC<SimulatorPhaseProps> = ({
    simulation,
    setSimulation,
    onComplete,
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [artifactCreated, setArtifactCreated] = useState(false);

    const toggleSimulatorMode = () => {
        setSimulation(prev => ({
            ...prev,
            mode: prev.mode === 'GUIDED' ? 'CONFIDENCE' : 'GUIDED'
        }));
    };

    const handleSimulatorStep = () => {
        if (currentStep < simulation.steps.length - 1) {
            setSimulation(prev => ({
                ...prev,
                steps: prev.steps.map((s, i) =>
                    i === currentStep ? { ...s, completed: true, validationResult: 'PASS' } : s
                )
            }));
            setCurrentStep(prev => prev + 1);
            setShowHint(false);
        } else {
            // Complete the simulation
            setSimulation(prev => ({
                ...prev,
                steps: prev.steps.map((s, i) =>
                    i === currentStep ? { ...s, completed: true, validationResult: 'PASS' } : s
                ),
                completedAt: new Date().toISOString(),
                artifactId: 'QA-SANDBOX-001',
                artifactPreview: 'Bug: Login button unresponsive on mobile',
            }));
            setArtifactCreated(true);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Sandbox Simulator</h3>
                    <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                        Execute operational protocols in a zero-risk environment. Errors are logged as learning nodes.
                    </p>
                </div>
                <div className="flex items-center p-1 bg-neutral-100 rounded-2xl border border-neutral-100 shadow-inner">
                    <button
                        onClick={toggleSimulatorMode}
                        className={`
                            px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                            ${simulation.mode === 'GUIDED'
                                ? 'bg-white text-brand-red shadow-md'
                                : 'text-neutral-400 hover:text-neutral-600'}
                        `}
                    >
                        Guided Node
                    </button>
                    <button
                        onClick={toggleSimulatorMode}
                        className={`
                            px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                            ${simulation.mode === 'CONFIDENCE'
                                ? 'bg-neutral-900 text-white shadow-md'
                                : 'text-neutral-400 hover:text-neutral-600'}
                        `}
                    >
                        Confidence Mode
                    </button>
                </div>
            </div>

            {/* Simulator Environment (Premium Terminal Style - Light Mode) */}
            <div className="bg-white rounded-[40px] border border-neutral-100 shadow-2xl shadow-neutral-100/50 overflow-hidden relative">
                {/* Internal UI Signal */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-50" />

                {/* Simulator Header */}
                <div className="p-8 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50 backdrop-blur-xl">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
                            <Target className="w-7 h-7 text-brand-red" />
                        </div>
                        <div>
                            <h4 className="text-neutral-900 font-black tracking-tight">{simulation.title}</h4>
                            <div className="flex items-center gap-3 mt-1">
                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-none">Status: Operational</p>
                                <span className="h-1 w-1 bg-neutral-700 rounded-full" />
                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-none">Security: Locked</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] text-neutral-400 font-black uppercase tracking-[0.2em] mb-1">Execution Index</p>
                        <div className="text-2xl font-black text-neutral-900 italic tabular-nums">
                            {simulation.steps.filter(s => s.completed).length}<span className="text-neutral-300 mx-1">/</span>{simulation.steps.length}
                        </div>
                    </div>
                </div>

                {/* Simulation Matrix */}
                <div className="p-10">
                    {!artifactCreated ? (
                        <>
                            {/* Execution Steps */}
                            <div className="space-y-4 mb-10" role="list" aria-label="Simulation Steps">
                                {simulation.steps.map((step, index) => (
                                    <div
                                        key={step.id}
                                        role="listitem"
                                        className={`
                                            relative flex items-start gap-6 p-6 rounded-3xl transition-all overflow-hidden border
                                            ${index === currentStep ? 'bg-white/5 border-brand-red/20 shadow-lg shadow-brand-red/5' : 'border-transparent'}
                                            ${step.completed ? 'opacity-40' : ''}
                                            ${index > currentStep && !step.completed ? 'opacity-20 pointer-events-none' : ''}
                                        `}
                                    >
                                        <div className={`
                                            w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-xs transition-colors
                                            ${step.completed ? 'bg-emerald-500 text-white' : ''}
                                            ${index === currentStep && !step.completed ? 'bg-brand-red text-white animate-pulse' : ''}
                                            ${index > currentStep && !step.completed ? 'bg-neutral-800 text-neutral-600' : ''}
                                        `} aria-hidden="true">
                                            {step.completed ? <Check className="w-5 h-5" /> : index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-medium leading-relaxed ${index === currentStep ? 'text-white' : 'text-neutral-400'}`}>
                                                {step.instruction}
                                            </p>

                                            {/* Guided Context */}
                                            {index === currentStep && simulation.mode === 'GUIDED' && step.hint && showHint && (
                                                <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl animate-slide-up" role="complementary" aria-label="Step Hint">
                                                    <div className="flex items-center gap-2 mb-1.5 font-black text-[9px] text-amber-500 uppercase tracking-widest">
                                                        <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" /> Intelligence Node
                                                    </div>
                                                    <p className="text-xs text-amber-200/80 leading-relaxed font-medium">{step.hint}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Status HUD Element */}
                                        {index === currentStep && (
                                            <div className="absolute top-0 right-0 h-full w-1 bg-brand-red" aria-hidden="true" />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Control Interface */}
                            <div className="flex items-center gap-4">
                                {simulation.mode === 'GUIDED' && simulation.steps[currentStep]?.hint && !showHint && (
                                    <button
                                        onClick={() => setShowHint(true)}
                                        className="px-6 py-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all flex items-center gap-3 border border-neutral-700"
                                    >
                                        <HelpCircle className="w-4 h-4" /> Request Signal
                                    </button>
                                )}
                                <button
                                    onClick={handleSimulatorStep}
                                    className="flex-1 py-5 bg-brand-red hover:bg-red-500 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-red-500/10 active:scale-95"
                                >
                                    {currentStep < simulation.steps.length - 1 ? (
                                        <>EXECUTE PROTOCOL: STEP {currentStep + 1} <ChevronRight className="w-5 h-5" /></>
                                    ) : (
                                        <>INITIALIZE ARTIFACT GENERATION <Sparkles className="w-5 h-5" /></>
                                    )}
                                </button>
                            </div>
                        </>
                    ) : (
                        /* Post-Execution Matrix */
                        <div className="text-center py-10 animate-fade-in">
                            <div className="w-24 h-24 rounded-[32px] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-500/20">
                                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                            </div>
                            <h4 className="text-2xl font-black text-white tracking-tight mb-3">Protocol Success: Artifact Committed</h4>
                            <p className="text-neutral-400 text-sm mb-10 max-w-sm mx-auto font-medium">
                                Your operational simulation is now verified and logged in the institutional sandbox.
                            </p>

                            {/* Artifact Committed View */}
                            <div className="bg-neutral-800/50 backdrop-blur-xl rounded-[32px] p-8 mb-10 text-left border border-neutral-700 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <FileText className="w-24 h-24 text-white" />
                                </div>
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-brand-red/10 rounded-xl border border-brand-red/20">
                                        <FileText className="w-6 h-6 text-brand-red" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest leading-none mb-1">Committed Artifact</p>
                                        <p className="text-sm font-bold text-white tracking-tight">
                                            {simulation.artifactType} <span className="text-neutral-500 mx-2">|</span> ID: {simulation.artifactId}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-5 bg-neutral-900 rounded-2xl border border-neutral-700 flex items-center justify-between">
                                    <p className="text-xs text-neutral-300 font-medium italic">"{simulation.artifactPreview}"</p>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                                        <Eye className="w-3.5 h-3.5" /> Review Pending
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={onComplete}
                                className="px-10 py-5 bg-white text-neutral-900 font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:bg-neutral-100 transition-all flex items-center justify-center gap-4 mx-auto shadow-2xl active:scale-95"
                            >
                                Continue to Contribution Matrix <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SimulatorPhase;
