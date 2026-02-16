import React, { useState } from 'react';
import {
    ChevronRight,
    Check,
    Lightbulb,
    HelpCircle, // Keep for now if used, or remove if not.
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
    ArrowLeft,
    Download,
    Terminal,
    Star,
} from 'lucide-react';
import {
    UserProfile,
    WorkTool,
    FirstTaskSimulation,
    SimulatorMode,
    FirstContribution,
    ProductivityTip,
} from '@/types';
import {
    WORK_TOOLS,
    FIRST_TASK_SIMULATION_QA,
    FIRST_TASK_SIMULATION_FRONTLINE,
    FIRST_TASK_SIMULATION_SALES,
    FIRST_CONTRIBUTIONS,
    PRODUCTIVITY_TIPS,
} from '@/config/constants';
import OnboardingFeed, { OnboardingCard } from '../shared/OnboardingFeed';

interface Day3ToolsWorkflowProps {
    user: UserProfile;
    onComplete: () => void;
}

type Phase = 'TOOLKIT' | 'SIMULATOR' | 'CONTRIBUTIONS' | 'TIPS';

const Day3ToolsWorkflow: React.FC<Day3ToolsWorkflowProps> = ({ user, onComplete }) => {
    // Phase State
    const [activePhase, setActivePhase] = useState<Phase | null>(null);
    const [completedPhases, setCompletedPhases] = useState<Phase[]>([]);

    // Toolkit State
    const relevantTools = WORK_TOOLS.filter(t =>
        !t.roleCategories || (user.roleCategory && t.roleCategories.includes(user.roleCategory))
    );
    const [tools, setTools] = useState<WorkTool[]>(relevantTools);
    const [activeToolId, setActiveToolId] = useState<string | null>(null);

    // Simulator State
    const getSimulationForRole = () => {
        if (user.roleCategory === 'FRONTLINE') return FIRST_TASK_SIMULATION_FRONTLINE;
        if (user.department === 'Sales' || user.roleCategory === 'REMOTE') return FIRST_TASK_SIMULATION_SALES;
        return FIRST_TASK_SIMULATION_QA;
    };
    const [simulation, setSimulation] = useState<FirstTaskSimulation>(getSimulationForRole());
    const [currentStep, setCurrentStep] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [artifactCreated, setArtifactCreated] = useState(false);

    // Contributions State
    const [contributions, setContributions] = useState<FirstContribution[]>(FIRST_CONTRIBUTIONS);

    // Tips State
    const [tips] = useState<ProductivityTip[]>(PRODUCTIVITY_TIPS);

    // Derived States
    const toolkitComplete = tools.filter(t => t.category === 'CORE').every(t => t.walkthroughCompleted);
    const simulatorComplete = simulation.steps.every(s => s.completed);
    const contributionsStarted = contributions.filter(c => c.status !== 'AVAILABLE').length >= 2;

    const allModulesComplete =
        completedPhases.includes('TOOLKIT') &&
        completedPhases.includes('SIMULATOR') &&
        completedPhases.includes('CONTRIBUTIONS');

    // Handlers
    const handleToolWalkthrough = (toolId: string) => {
        setActiveToolId(toolId);
    };

    const handleCompleteToolWalkthrough = (toolId: string) => {
        setTools(prev => prev.map(t =>
            t.id === toolId ? { ...t, walkthroughCompleted: true } : t
        ));
        setActiveToolId(null);
    };

    const completeToolkit = () => {
        if (!completedPhases.includes('TOOLKIT')) {
            setCompletedPhases(prev => [...prev, 'TOOLKIT']);
        }
        setActivePhase(null);
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

    const completeSimulator = () => {
        if (!completedPhases.includes('SIMULATOR')) {
            setCompletedPhases(prev => [...prev, 'SIMULATOR']);
        }
        setActivePhase(null);
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

    const completeContributions = () => {
        if (!completedPhases.includes('CONTRIBUTIONS')) {
            setCompletedPhases(prev => [...prev, 'CONTRIBUTIONS']);
        }
        setActivePhase(null);
    };

    const renderToolkitPhase = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tools.map((tool) => (
                    <div key={tool.id} className={`bg-white rounded-2xl border p-6 transition-all ${tool.walkthroughCompleted ? 'border-emerald-100' : 'border-neutral-100 hover:border-brand-red/20'}`}>
                        <div className="flex items-start gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${tool.walkthroughCompleted ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-50 text-neutral-600'}`}>
                                {tool.icon}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-neutral-900">{tool.name}</h4>
                                <p className="text-xs text-neutral-500 mt-1">{tool.purpose}</p>
                            </div>
                            {tool.walkthroughCompleted && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                        </div>

                        {!tool.walkthroughCompleted && (
                            <div className="space-y-3">
                                {tool.quickActions.map(qa => (
                                    <div key={qa.id} className="text-xs text-neutral-600 bg-neutral-50 p-2 rounded flex items-center gap-2">
                                        <Zap className="w-3 h-3 text-amber-500" />
                                        {qa.label}
                                    </div>
                                ))}
                                <button
                                    onClick={() => handleCompleteToolWalkthrough(tool.id)}
                                    className="w-full btn-secondary py-2 text-xs mt-2"
                                >
                                    Mark Installed & Configured
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={completeToolkit}
                className="w-full btn-primary py-4"
                disabled={!toolkitComplete}
            >
                {toolkitComplete ? 'All Tools Ready' : 'Install & Configure All Tools'}
            </button>
        </div>
    );

    const renderSimulatorPhase = () => (
        <div className="space-y-8 animate-fade-in">
            {!artifactCreated ? (
                <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800">
                    <div className="bg-neutral-800/50 p-4 border-b border-neutral-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-brand-red" />
                            <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">{simulation.title}</span>
                        </div>
                        <span className="text-[10px] bg-brand-red/10 text-brand-red px-2 py-1 rounded">SAFE MODE</span>
                    </div>

                    <div className="p-8">
                        <div className="space-y-4 mb-8">
                            {simulation.steps.map((step, index) => (
                                <div key={step.id} className={`flex items-start gap-4 ${index > currentStep ? 'opacity-30' : ''}`}>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 
                                        ${step.completed ? 'bg-emerald-500 text-white' : (index === currentStep ? 'bg-brand-red text-white animate-pulse' : 'bg-neutral-700 text-neutral-500')}
                                     `}>
                                        {step.completed ? <Check className="w-3 h-3" /> : index + 1}
                                    </div>
                                    <div className={`text-sm ${index === currentStep ? 'text-white' : 'text-neutral-500'}`}>
                                        {step.instruction}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleSimulatorStep}
                                className="btn-primary py-3 px-8 bg-brand-red hover:bg-red-600 border-none text-white text-xs"
                            >
                                {currentStep < simulation.steps.length - 1 ? 'Execute Step' : 'Finish Simulation'}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-10">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">Simulation Passed</h3>
                    <p className="text-neutral-500 mb-8">You've successfully completed your first task in a safe environment.</p>
                    <button onClick={completeSimulator} className="btn-primary py-3 px-10">Return to Overview</button>
                </div>
            )}
        </div>
    );

    const renderContributionsPhase = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 gap-4">
                {contributions.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-2xl border border-neutral-100 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                                  ${item.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-50 text-neutral-500'}
                              `}>
                                {item.type === 'STANDUP' && '🎤'}
                                {item.type === 'DOCUMENT_UPDATE' && '📝'}
                                {item.type === 'SHADOW' && '👀'}
                                {item.type === 'TASK' && '✅'}
                                {item.type === 'CODE_REVIEW' && '🔍'}
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900">{item.title}</h4>
                                <p className="text-xs text-neutral-500">{item.description}</p>
                            </div>
                        </div>

                        {item.status === 'AVAILABLE' && (
                            <button onClick={() => handleStartContribution(item.id)} className="btn-secondary py-2 px-4 text-xs">Start</button>
                        )}
                        {item.status === 'IN_PROGRESS' && (
                            <button onClick={() => handleCompleteContribution(item.id)} className="btn-primary py-2 px-4 text-xs">Complete</button>
                        )}
                        {item.status === 'PENDING_CONFIRM' && (
                            <span className="text-xs font-bold text-amber-500 px-3 py-1 bg-amber-50 rounded-lg">Pending Validation</span>
                        )}
                        {item.status === 'COMPLETED' && (
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={completeContributions}
                disabled={!contributionsStarted}
                className="w-full btn-primary py-4 mt-4"
            >
                {contributionsStarted ? 'Complete Phase' : 'Start at least 2 contributions'}
            </button>
        </div>
    );

    const renderTipsPhase = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            {tips.map(tip => (
                <div key={tip.id} className="bg-neutral-900 text-white p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl">💡</span>
                        <kbd className="bg-neutral-800 px-2 py-1 rounded text-xs text-neutral-400 font-mono">{tip.shortcutKey}</kbd>
                    </div>
                    <h4 className="font-bold mb-2">{tip.title}</h4>
                    <p className="text-sm text-neutral-400">{tip.description}</p>
                </div>
            ))}
            <button onClick={() => setActivePhase(null)} className="md:col-span-2 btn-secondary py-4 mt-4">Done Reading</button>
        </div>
    );

    // Feed Data
    const checkProgress = (curr: number, total: number) => total > 0 ? Math.round((curr / total) * 100) : 0;

    const feedCards: OnboardingCard[] = [
        {
            id: 'TOOLKIT',
            title: 'My Tools',
            description: 'Setup your core tools.',
            icon: <Zap className="w-5 h-5" />,
            status: completedPhases.includes('TOOLKIT') ? 'COMPLETED' : 'AVAILABLE',
            type: 'SETUP',
            progress: checkProgress(tools.filter(t => t.walkthroughCompleted).length, tools.length),
            estimatedTime: '20 min',
            onAction: () => setActivePhase('TOOLKIT'),
            actionLabel: 'Setup Tools',
        },
        {
            id: 'SIMULATOR',
            title: 'Hands-on Task',
            description: 'Practice with a real-world task.',
            icon: <Target className="w-5 h-5" />,
            status: completedPhases.includes('SIMULATOR') ? 'COMPLETED' : 'AVAILABLE',
            type: 'ACTION',
            progress: artifactCreated ? 100 : 0,
            estimatedTime: '15 min',
            onAction: () => setActivePhase('SIMULATOR'),
            actionLabel: 'Start Task',
        },
        {
            id: 'CONTRIBUTIONS',
            title: 'First Tasks',
            description: 'Make your first impact.',
            icon: <Star className="w-5 h-5" />, // Replaced Users with Star for "Wins"
            status: completedPhases.includes('CONTRIBUTIONS') ? 'COMPLETED' : 'AVAILABLE',
            type: 'ACTION',
            progress: checkProgress(contributions.filter(c => c.status !== 'AVAILABLE').length, contributions.length),
            estimatedTime: 'Flexible',
            onAction: () => setActivePhase('CONTRIBUTIONS'),
            actionLabel: 'View Tasks',
        },
        {
            id: 'TIPS',
            title: 'Quick Tips',
            description: 'Shortcuts and hacks for maximum efficiency.',
            icon: <Lightbulb className="w-5 h-5" />,
            status: 'AVAILABLE',
            type: 'LEARNING',
            estimatedTime: '5 min',
            onAction: () => setActivePhase('TIPS'),
            actionLabel: 'Read Tips',
        }
    ];



    if (activePhase) {
        let content = null;
        let title = '';
        switch (activePhase) {
            case 'TOOLKIT': title = 'My Tools'; content = renderToolkitPhase(); break;
            case 'SIMULATOR': title = 'Hands-on Task'; content = renderSimulatorPhase(); break;
            case 'CONTRIBUTIONS': title = 'First Tasks'; content = renderContributionsPhase(); break;
            case 'TIPS': title = 'Quick Tips'; content = renderTipsPhase(); break;
        }

        return (
            <div className="animate-fade-in">
                <button
                    onClick={() => setActivePhase(null)}
                    className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 mb-6 font-medium text-sm transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Overview
                </button>

                <h2 className="text-3xl font-black text-neutral-900 mb-6">{title}</h2>
                <div className="bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-100/50 p-8">
                    {content}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">
                    Tools & Skills
                </h1>
                <p className="text-neutral-500">
                    Get your environment ready and make your first contribution.
                </p>
            </div>

            <OnboardingFeed
                cards={feedCards}
                onCardAction={(id) => setActivePhase(id as Phase)}
            />

            <div className="pt-8 flex justify-center border-t border-neutral-100 mt-8">
                <button
                    onClick={onComplete}
                    disabled={!allModulesComplete}
                    className={`
                        px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-2
                        ${allModulesComplete
                            ? 'bg-brand-red text-white shadow-lg hover:shadow-red-500/30 hover:-translate-y-1'
                            : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'}
                    `}
                >
                    {allModulesComplete ? 'Complete Day 3' : `Complete All Modules (${completedPhases.length}/3)`}
                    {allModulesComplete && <ChevronRight className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

export default Day3ToolsWorkflow;
