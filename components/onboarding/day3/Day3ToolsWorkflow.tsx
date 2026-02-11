import React, { useState } from 'react';
import {
    ChevronRight,
    Check,
    Lightbulb,
    HelpCircle,
    Play,
    Pause,
    RotateCcw,
    Sparkles,
    FileText,
    AlertCircle,
    CheckCircle2,
    Target,
    Zap,
    BookOpen,
    Send,
    Eye,
} from 'lucide-react';
import {
    UserProfile,
    WorkTool,
    FirstTaskSimulation,
    SimulatorMode,
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
    const [currentStep, setCurrentStep] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [artifactCreated, setArtifactCreated] = useState(false);

    // Toolkit completion
    const toolkitComplete = tools.filter(t => t.category === 'CORE').every(t => t.walkthroughCompleted);

    // Simulator completion
    const simulatorComplete = simulation.steps.every(s => s.completed);

    // Contributions - need at least 2
    const contributionsStarted = contributions.filter(c => c.status !== 'AVAILABLE').length >= 2;

    const handleToolWalkthrough = (toolId: string) => {
        setActiveToolId(toolId);
    };

    const handleCompleteToolWalkthrough = (toolId: string) => {
        setTools(prev => prev.map(t =>
            t.id === toolId ? { ...t, walkthroughCompleted: true } : t
        ));
        setActiveToolId(null);
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

    const handleStartContribution = (id: string) => {
        setContributions(prev => prev.map(c =>
            c.id === id ? { ...c, status: 'IN_PROGRESS' } : c
        ));
    };

    const handleCompleteContribution = (id: string) => {
        setContributions(prev => prev.map(c =>
            c.id === id ? { ...c, status: 'PENDING_CONFIRM' } : c
        ));
    };

    const handleCompleteDay = () => {
        setPhase('DONE');
        setTimeout(onComplete, 1500);
    };

    const toggleSimulatorMode = () => {
        setSimulation(prev => ({
            ...prev,
            mode: prev.mode === 'GUIDED' ? 'CONFIDENCE' : 'GUIDED'
        }));
    };

    const renderToolkitPhase = () => (
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
                                        className="mt-4 px-4 py-2 bg-neutral-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-red transition-colors active:scale-95"
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
            <div className="relative overflow-hidden bg-neutral-900 rounded-[40px] p-12 text-white shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                    <Lightbulb className="w-32 h-32" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-brand-red flex items-center justify-center shadow-lg shadow-red-500/20">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-xl font-black tracking-tight">Institutional Velocity Hacks</h4>
                            <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1">Direct from Senior Engineering Leadership</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {tips.map((tip) => (
                            <div key={tip.id} className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:border-brand-red/30 transition-all flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-2xl">{tools.find(t => t.id === tip.toolId)?.icon}</div>
                                    {tip.shortcutKey && (
                                        <kbd className="px-2 py-1 bg-white/10 border border-white/10 rounded text-[9px] font-black text-white/50 uppercase tracking-widest">
                                            {tip.shortcutKey}
                                        </kbd>
                                    )}
                                </div>
                                <h5 className="text-sm font-black text-white mb-2 leading-tight">{tip.title}</h5>
                                <p className="text-[11px] text-neutral-400 leading-relaxed font-medium mb-4 flex-1">{tip.description}</p>
                                <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Node: {tip.toolName}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSimulatorPhase = () => (
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

            {/* Simulator Environment (Premium Terminal Style) */}
            <div className="bg-neutral-900 rounded-[40px] border border-neutral-800 shadow-2xl overflow-hidden relative">
                {/* Internal UI Signal */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-50" />

                {/* Simulator Header */}
                <div className="p-8 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50 backdrop-blur-xl">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center">
                            <Target className="w-7 h-7 text-brand-red" />
                        </div>
                        <div>
                            <h4 className="text-white font-black tracking-tight">{simulation.title}</h4>
                            <div className="flex items-center gap-3 mt-1">
                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-none">Status: Operational</p>
                                <span className="h-1 w-1 bg-neutral-700 rounded-full" />
                                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-none">Security: Locked</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] text-neutral-500 font-black uppercase tracking-[0.2em] mb-1">Execution Index</p>
                        <div className="text-2xl font-black text-white italic tabular-nums">
                            {simulation.steps.filter(s => s.completed).length}<span className="text-neutral-700 mx-1">/</span>{simulation.steps.length}
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
                                onClick={() => setPhase('CONTRIBUTIONS')}
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

    const renderContributionsPhase = () => (
        <div className="space-y-12 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Contribution Matrix</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Small wins drive institutional momentum. Activate nodes in your contribution path to build early operational credibility.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list" aria-label="Contribution Path">
                {contributions.map((contribution) => (
                    <div
                        key={contribution.id}
                        role="listitem"
                        className={`
                            relative bg-white rounded-[32px] border p-8 transition-all group overflow-hidden
                            ${contribution.status === 'COMPLETED' ? 'border-emerald-100' : 'border-neutral-100 hover:border-brand-red/20'}
                        `}
                    >
                        <div className="flex items-start gap-6">
                            <div className={`
                                w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-neutral-100
                                ${contribution.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : ''}
                                ${contribution.status === 'PENDING_CONFIRM' ? 'bg-amber-50 text-amber-600' : ''}
                                ${contribution.status === 'IN_PROGRESS' ? 'bg-red-50 text-brand-red' : ''}
                                ${contribution.status === 'AVAILABLE' ? 'bg-neutral-50 text-neutral-400' : ''}
                            `} aria-hidden="true">
                                {contribution.type === 'STANDUP' && '🎤'}
                                {contribution.type === 'DOCUMENT_UPDATE' && '📝'}
                                {contribution.type === 'SHADOW' && '👀'}
                                {contribution.type === 'TASK' && '✅'}
                                {contribution.type === 'CODE_REVIEW' && '🔍'}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-black text-neutral-900 tracking-tight leading-none mb-2">{contribution.title}</h4>
                                <p className="text-xs text-neutral-500 font-medium leading-relaxed mb-6">{contribution.description}</p>

                                {/* Operational Action HUD */}
                                <div className="flex items-center gap-3">
                                    {contribution.status === 'AVAILABLE' && (
                                        <button
                                            onClick={() => handleStartContribution(contribution.id)}
                                            aria-label={`Activate Node: ${contribution.title}`}
                                            className="px-5 py-2.5 bg-neutral-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-red transition-all active:scale-95 shadow-lg shadow-neutral-900/10"
                                        >
                                            Activate Node
                                        </button>
                                    )}
                                    {contribution.status === 'IN_PROGRESS' && (
                                        <button
                                            onClick={() => handleCompleteContribution(contribution.id)}
                                            aria-label={`Commit Change for ${contribution.title}`}
                                            className="px-5 py-2.5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-600/10"
                                        >
                                            Commit Change
                                        </button>
                                    )}
                                    {contribution.status === 'PENDING_CONFIRM' && (
                                        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-100 text-[9px] font-black uppercase tracking-widest" role="status">
                                            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" /> Awaiting Validation
                                        </div>
                                    )}
                                    {contribution.status === 'COMPLETED' && (
                                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 text-[9px] font-black uppercase tracking-widest" role="status">
                                            <Check className="w-3.5 h-3.5" aria-hidden="true" /> Node Verified
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Design Accent */}
                        <div className={`absolute top-0 right-0 w-1 h-full ${contribution.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-transparent'}`} aria-hidden="true" />
                    </div>
                ))}
            </div>
        </div>
    );

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
                                    ? 'bg-neutral-900 text-white shadow-lg -translate-y-0.5'
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
                    {phase === 'TOOLKIT' && renderToolkitPhase()}
                    {phase === 'SIMULATOR' && renderSimulatorPhase()}
                    {phase === 'CONTRIBUTIONS' && renderContributionsPhase()}
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
