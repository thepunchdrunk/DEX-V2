
import React, { useState } from 'react';
import {
    Terminal,
    GitPullRequest,
    MessageSquare,
    Video,
    Zap,
    Check,
    ArrowRight,
    Command,
    Code,
    Cpu,
    Workflow
} from 'lucide-react';
import { UserProfile } from '../../../types';

interface Day2CultureProps {
    user: UserProfile;
    onComplete: () => void;
}

type Phase = 'STACK' | 'WORKFLOW' | 'COMMUNICATION' | 'PRACTICE';

const Day2Culture: React.FC<Day2CultureProps> = ({ user, onComplete }) => {
    const [phase, setPhase] = useState<Phase>('STACK');

    // Stack State
    const [toolsInstalled, setToolsInstalled] = useState<string[]>([]);

    // Workflow State
    const [workflowQuiz, setWorkflowQuiz] = useState<string | null>(null);

    // Communication State
    const [readManifesto, setReadManifesto] = useState(false);

    // Practice State
    const [practiceCompleted, setPracticeCompleted] = useState(false);

    const tools = [
        { id: 'vscode', name: 'VS Code', icon: Code, desc: 'Our primary IDE with custom extensions.' },
        { id: 'docker', name: 'Docker', icon: Cpu, desc: 'Containerization for local dev.' },
        { id: 'linear', name: 'Linear', icon: Workflow, desc: 'Issue tracking that moves fast.' },
        { id: 'slack', name: 'Slack', icon: MessageSquare, desc: 'Async-first communication.' },
    ];

    const canAdvance = () => {
        if (phase === 'STACK') return toolsInstalled.length === tools.length;
        if (phase === 'WORKFLOW') return workflowQuiz === 'PR';
        if (phase === 'COMMUNICATION') return readManifesto;
        if (phase === 'PRACTICE') return practiceCompleted;
        return true;
    };

    const handleNext = () => {
        if (phase === 'STACK') setPhase('WORKFLOW');
        else if (phase === 'WORKFLOW') setPhase('COMMUNICATION');
        else if (phase === 'COMMUNICATION') setPhase('PRACTICE');
        else onComplete();
    };

    // Renderers
    const renderStack = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">The Stack</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    We don't just use tools; we master them. Install the core suite to unlock your flow state.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tools.map((tool) => (
                    <div
                        key={tool.id}
                        onClick={() => !toolsInstalled.includes(tool.id) && setToolsInstalled(prev => [...prev, tool.id])}
                        className={`
                            p-6 rounded-2xl border cursor-pointer transition-all group
                            ${toolsInstalled.includes(tool.id)
                                ? 'bg-indigo-50 border-indigo-100 shadow-inner'
                                : 'bg-white border-neutral-200 hover:border-indigo-200 hover:shadow-md'}
                        `}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${toolsInstalled.includes(tool.id) ? 'bg-indigo-200 text-indigo-700' : 'bg-neutral-100 text-neutral-500'}`}>
                                <tool.icon className="w-6 h-6" />
                            </div>
                            {toolsInstalled.includes(tool.id) && <Check className="w-6 h-6 text-indigo-600 animate-scale-in" />}
                        </div>
                        <h3 className="font-bold text-lg text-neutral-900 mb-1">{tool.name}</h3>
                        <p className="text-sm text-neutral-500">{tool.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderWorkflow = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">How We Ship</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    We ship small, fast, and often. No long-lived feature branches.
                    Main is always deployable.
                </p>
            </div>

            <div className="bg-neutral-900 rounded-3xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                    <GitPullRequest className="w-6 h-6 text-brand-red" />
                    <h3 className="text-xl font-bold">The Golden Rule</h3>
                </div>
                <p className="text-lg text-neutral-300 leading-relaxed mb-8 border-l-4 border-brand-red pl-6">
                    "If a PR is larger than 400 lines, it's too big. Break it down.
                    Reviewers should be able to understand the change in 5 minutes."
                </p>

                <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <h4 className="font-bold mb-4">Quick Quiz: You have a massive feature to build. What do you do?</h4>
                    <div className="space-y-3">
                        {[
                            { id: 'BIG', label: 'Build it all in one branch over 2 weeks.' },
                            { id: 'PR', label: 'Break it into 5 small PRs behind a feature flag.' },
                            { id: 'MEETING', label: 'Schedule a meeting to discuss it.' },
                        ].map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setWorkflowQuiz(opt.id)}
                                className={`
                                    w-full text-left p-4 rounded-lg font-medium transition-all flex items-center justify-between
                                    ${workflowQuiz === opt.id
                                        ? (opt.id === 'PR' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white')
                                        : 'bg-white/5 hover:bg-white/10'}
                                `}
                            >
                                {opt.label}
                                {workflowQuiz === opt.id && (opt.id === 'PR' ? <Check className="w-5 h-5" /> : <span className="text-xl">×</span>)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderCommunication = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Anti-Meeting Culture</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    We don't present slide decks. We write 6-page memos.
                    We read silently at the start of meetings. We discuss. We decide.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-amber-50 border border-amber-100 p-8 rounded-3xl">
                    <Video className="w-8 h-8 text-amber-600 mb-4" />
                    <h3 className="text-xl font-bold text-amber-900 mb-2">Sync Time</h3>
                    <p className="text-amber-800/80 text-sm leading-relaxed mb-4">
                        Reserved for:
                        <br />• Emotional connection (1:1s)
                        <br />• Complex decision making
                        <br />• Crisis validation
                    </p>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-8 rounded-3xl">
                    <MessageSquare className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Async Time</h3>
                    <p className="text-blue-800/80 text-sm leading-relaxed mb-4">
                        Reserved for:
                        <br />• Status updates
                        <br />• FYI information
                        <br />• Simple feedback
                    </p>
                </div>
            </div>

            <div
                onClick={() => setReadManifesto(true)}
                className={`
                    p-6 rounded-2xl border cursor-pointer transition-all flex items-center gap-6 group
                    ${readManifesto ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-neutral-200 hover:border-brand-red/30'}
                `}
            >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${readManifesto ? 'bg-emerald-100 text-emerald-600' : 'bg-neutral-100 text-neutral-400'}`}>
                    <Command className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-neutral-900">The Communication Manifesto</h4>
                    <p className="text-sm text-neutral-500">Click to acknowledge you've read the guide.</p>
                </div>
                <div className="ml-auto">
                    {readManifesto ? <Check className="w-6 h-6 text-emerald-600" /> : <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-brand-red" />}
                </div>
            </div>
        </div>
    );

    const renderPractice = () => (
        <div className="space-y-8 animate-fade-in relative">
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4 tracking-tight">Your First Contribution</h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                    Don't wait for permission. We've set up a safe sandbox environment.
                    Deploy a "Hello World" change to production right now.
                </p>
            </div>

            <div className="bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-neutral-800">
                <div className="bg-neutral-800 px-6 py-4 flex items-center gap-2 border-b border-neutral-700">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-4 text-xs font-mono text-neutral-400">~/dex/onboarding/mission-control</span>
                </div>
                <div className="p-8 font-mono text-sm">
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <span className="text-brand-red">➜</span>
                            <span className="text-white">git clone dex-v2</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-brand-red">➜</span>
                            <span className="text-white">npm install</span>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-brand-red">➜</span>
                            <div className="flex items-center gap-2">
                                <span className={practiceCompleted ? 'text-emerald-400' : 'text-white animate-pulse'}>
                                    npm run deploy:sandbox
                                </span>
                                {!practiceCompleted && (
                                    <button
                                        onClick={() => setPracticeCompleted(true)}
                                        className="ml-4 px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs text-white uppercase tracking-wider transition-colors"
                                    >
                                        Execute
                                    </button>
                                )}
                            </div>
                        </div>
                        {practiceCompleted && (
                            <div className="text-emerald-400 mt-4 animate-fade-in">
                                {'>'} Deploying to sandbox...
                                <br />{'>'} Build successful
                                <br />{'>'} Visit: https://sandbox.dex-v2.internal
                                <br />{'>'}
                                <br />{'>'} MISSION ACCOMPLISHED.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-neutral-50 border-r border-neutral-200 p-6 flex flex-col">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-6">The Toolkit</h3>
                <div className="space-y-2">
                    {[
                        { id: 'STACK', label: 'Tech Stack' },
                        { id: 'WORKFLOW', label: 'How We Ship' },
                        { id: 'COMMUNICATION', label: 'Meeting Culture' },
                        { id: 'PRACTICE', label: 'First Deploy' },
                    ].map((step, i) => {
                        const isActive = phase === step.id;
                        const isCompleted = ['STACK', 'WORKFLOW', 'COMMUNICATION', 'PRACTICE'].indexOf(phase) > i;

                        return (
                            <button
                                key={step.id}
                                onClick={() => setPhase(step.id as Phase)}
                                className={`
                                    w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between
                                    ${isActive ? 'bg-white shadow-sm text-blue-600 ring-1 ring-blue-100' : isCompleted ? 'text-emerald-600' : 'text-neutral-400 hover:bg-neutral-100'}
                                `}
                            >
                                {step.label}
                                {isCompleted && <Check className="w-4 h-4" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 md:p-12 flex flex-col">
                <div className="flex-1">
                    {phase === 'STACK' && renderStack()}
                    {phase === 'WORKFLOW' && renderWorkflow()}
                    {phase === 'COMMUNICATION' && renderCommunication()}
                    {phase === 'PRACTICE' && renderPractice()}
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-100 flex justify-end">
                    <button
                        onClick={handleNext}
                        disabled={!canAdvance()}
                        className={`
                            px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all
                            ${canAdvance()
                                ? 'bg-neutral-900 text-white hover:bg-black hover:-translate-y-1 shadow-lg'
                                : 'bg-neutral-100 text-neutral-300 cursor-not-allowed'}
                        `}
                    >
                        {phase === 'PRACTICE' ? 'Complete Day 2' : 'Next Step'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Day2Culture;
