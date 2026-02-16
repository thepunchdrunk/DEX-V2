import React, { useState } from 'react';
import {
    ChevronRight,
    Check,
    Users,
    Network,
    Mail,
    Calendar,
    Star,
    Heart,
    Clock,
    MessageSquare,
    Send,
    Coffee,
    Sparkles,
    Target,
    ChevronDown,
    ChevronUp,
    User,
    Building,
    Eye,
    ArrowLeft,
    CheckCircle2,
    Map,
    Info,
} from 'lucide-react';
import {
    UserProfile,
    Critical5Contact,
    StakeholderNode,
    TeamRitual,
    CollaborationNorm,
    PeerCohort,
} from '@/types';
import {
    CRITICAL_5_CONTACTS,
    STAKEHOLDER_NODES,
    TEAM_RITUALS,
    COLLABORATION_NORMS,
    PEER_COHORT,
} from '@/config/constants';
import OnboardingFeed, { OnboardingCard } from '../shared/OnboardingFeed';

interface Day4NetworkCollaborationProps {
    user: UserProfile;
    onComplete: () => void;
}

type Phase = 'CRITICAL5' | 'STAKEHOLDERS' | 'RITUALS' | 'NORMS' | 'COHORT' | 'DONE';

const Day4NetworkCollaboration: React.FC<Day4NetworkCollaborationProps> = ({ user, onComplete }) => {
    // Phase State
    const [activePhase, setActivePhase] = useState<Phase | null>(null);
    const [completedPhases, setCompletedPhases] = useState<Phase[]>([]);

    // Data State
    const [contacts, setContacts] = useState<Critical5Contact[]>(CRITICAL_5_CONTACTS);
    const [stakeholders] = useState<StakeholderNode[]>(STAKEHOLDER_NODES);
    const [rituals, setRituals] = useState<TeamRitual[]>(TEAM_RITUALS);
    const [norms] = useState<CollaborationNorm[]>(COLLABORATION_NORMS);
    const [cohort, setCohort] = useState<PeerCohort>(PEER_COHORT);

    // UI State
    const [expandedContact, setExpandedContact] = useState<string | null>(null);
    const [messageInputs, setMessageInputs] = useState<Record<string, string>>({});

    // Track completions
    const introDraftsSent = contacts.filter(c => c.introSent).length;
    const ritualsAcknowledged = rituals.filter(r => r.acknowledged).length;
    const cohortConnected = cohort.peers.filter(p => p.connected).length;

    // Derived Completion State
    const critical5Complete = introDraftsSent >= 3;
    const ritualsComplete = ritualsAcknowledged >= 2;
    const cohortComplete = cohortConnected >= 1; // At least one connection

    const allModulesComplete =
        completedPhases.includes('CRITICAL5') &&
        completedPhases.includes('RITUALS') &&
        completedPhases.includes('COHORT') &&
        // Stakeholders and Norms are "read only" or soft completions, we can assume them done if visited or explicitly marked
        completedPhases.includes('STAKEHOLDERS') &&
        completedPhases.includes('NORMS');


    // Handlers
    const handleSendIntro = (contactId: string) => {
        setContacts(prev => prev.map(c =>
            c.id === contactId ? { ...c, introSent: true, introSentAt: new Date().toISOString() } : c
        ));
    };

    const handleAcknowledgeRitual = (ritualId: string) => {
        setRituals(prev => prev.map(r =>
            r.id === ritualId ? { ...r, acknowledged: true } : r
        ));
    };

    const handleConnectPeer = (peerId: string) => {
        setCohort(prev => ({
            ...prev,
            peers: prev.peers.map(p =>
                p.id === peerId ? { ...p, connected: true, connectedAt: new Date().toISOString() } : p
            )
        }));
    };

    const completePhase = (phase: Phase) => {
        if (!completedPhases.includes(phase)) {
            setCompletedPhases(prev => [...prev, phase]);
        }
        setActivePhase(null);
    };

    // Renderers
    const renderCritical5Phase = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 gap-4">
                {contacts.map((contact) => (
                    <div key={contact.id} className={`bg-white rounded-2xl border p-6 transition-all ${contact.introSent ? 'border-emerald-100 bg-emerald-50/10' : 'border-neutral-100'}`}>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-lg font-bold">
                                {contact.name.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-neutral-900">{contact.name}</h4>
                                <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">{contact.title} • {contact.relationship}</p>
                                <p className="text-xs text-neutral-600 mb-4">{contact.whyTheyMatter}</p>

                                {!contact.introSent ? (
                                    <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 space-y-3">
                                        <p className="text-xs font-medium text-neutral-500 italic">"{messageInputs[contact.id] || contact.introTemplate}"</p>
                                        <button
                                            onClick={() => handleSendIntro(contact.id)}
                                            className="btn-primary py-2 px-4 text-xs w-full"
                                        >
                                            <Send className="w-3 h-3 mr-2" /> Send Intro
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold bg-emerald-50 px-3 py-2 rounded-lg inline-flex">
                                        <Check className="w-3 h-3" /> Intro Sent
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => completePhase('CRITICAL5')}
                disabled={!critical5Complete}
                className="w-full btn-primary py-4 mt-4"
            >
                {critical5Complete ? 'Complete Key People' : `Send at least 3 Intros (${introDraftsSent}/3)`}
            </button>
        </div>
    );

    const renderStakeholdersPhase = () => (
        <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stakeholders.map(node => (
                    <div key={node.id} className="bg-white border border-neutral-100 rounded-2xl p-6 hover:shadow-lg transition-all">
                        <div className="flex items-center gap-4 mb-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                                 ${node.circle === 'INNER' ? 'bg-brand-red' : node.circle === 'MIDDLE' ? 'bg-neutral-800' : 'bg-neutral-400'}
                             `}>
                                {node.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900">{node.name}</h4>
                                <p className="text-xs text-neutral-500">{node.title}</p>
                            </div>
                        </div>
                        <div className="mt-2 text-xs bg-neutral-50 inline-block px-2 py-1 rounded text-neutral-600 font-medium">
                            {node.interactionType}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => completePhase('STAKEHOLDERS')} className="w-full btn-primary py-4">
                Done Reviewing Chart
            </button>
        </div>
    );

    const renderRitualsPhase = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 gap-4">
                {rituals.map(ritual => (
                    <div key={ritual.id} className="bg-white rounded-2xl border border-neutral-100 p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center">
                                {ritual.type === 'STANDUP' && '📊'}
                                {ritual.type === 'RETROSPECTIVE' && '🔄'}
                                {ritual.type === 'PLANNING' && '📋'}
                                {ritual.type === 'SOCIAL' && '🎉'}
                                {ritual.type === 'REVIEW' && '👀'}
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900">{ritual.name}</h4>
                                <p className="text-xs text-neutral-500">{ritual.frequency} • {ritual.duration}</p>
                            </div>
                        </div>
                        {ritual.acknowledged ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                        ) : (
                            <button onClick={() => handleAcknowledgeRitual(ritual.id)} className="btn-secondary py-2 px-4 text-xs">
                                Add to Calendar
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={() => completePhase('RITUALS')}
                disabled={!ritualsComplete}
                className="w-full btn-primary py-4 mt-4"
            >
                {ritualsComplete ? 'Complete Meetings Setup' : `Add at least 2 Rituals (${ritualsAcknowledged}/2)`}
            </button>
        </div>
    );

    const renderNormsPhase = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {norms.map(norm => (
                    <div key={norm.id} className="bg-white rounded-2xl border border-neutral-100 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center text-sm">
                                {norm.category === 'COMMUNICATION' && '💬'}
                                {norm.category === 'MEETINGS' && '📅'}
                                {norm.category === 'FEEDBACK' && '📝'}
                                {norm.category === 'WORK_HOURS' && '🕐'}
                                {norm.category === 'COLLABORATION' && '🤝'}
                            </div>
                            <h4 className="font-bold text-neutral-900 text-sm uppercase tracking-wide">{norm.title}</h4>
                        </div>
                        <p className="text-xs text-neutral-500 mb-4 leading-relaxed">{norm.description}</p>
                        <ul className="space-y-2">
                            {norm.examples.map((ex, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-neutral-600">
                                    <div className="w-1 h-1 rounded-full bg-brand-red mt-1.5 shrink-0" />
                                    {ex}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <button onClick={() => completePhase('NORMS')} className="w-full btn-primary py-4 mt-4">
                Acknowledged Norms
            </button>
        </div>
    );

    const renderCohortPhase = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="bg-neutral-900 rounded-2xl p-6 text-white mb-6">
                <h4 className="text-2xl font-black mb-1">{cohort.cohortName}</h4>
                <p className="text-neutral-400 text-sm">Joined {new Date(cohort.startDate).toLocaleDateString()}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cohort.peers.map(peer => (
                    <div key={peer.id} className="bg-white border border-neutral-100 rounded-2xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-700">
                                {peer.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-neutral-900">{peer.name}</h4>
                                <p className="text-xs text-neutral-500">{peer.title}</p>
                            </div>
                        </div>
                        {peer.connected ? (
                            <div className="w-full py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2">
                                <Check className="w-4 h-4" /> Connected
                            </div>
                        ) : (
                            <button onClick={() => handleConnectPeer(peer.id)} className="w-full btn-secondary py-2 text-xs">
                                Connect
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={() => completePhase('COHORT')}
                disabled={!cohortComplete}
                className="w-full btn-primary py-4 mt-4"
            >
                {cohortComplete ? 'Done Connecting' : 'Connect with at least 1 Peer'}
            </button>
        </div>
    );

    // Feed Data
    const checkProgress = (curr: number, total: number) => Math.min(Math.round((curr / total) * 100), 100);

    const feedCards: OnboardingCard[] = [
        {
            id: 'CRITICAL5',
            title: 'Key People',
            description: 'Meet the 5 people who matter most.',
            icon: <Star className="w-5 h-5" />,
            status: completedPhases.includes('CRITICAL5') ? 'COMPLETED' : 'AVAILABLE',
            type: 'ACTION',
            progress: checkProgress(introDraftsSent, 3), // Target 3 intros
            estimatedTime: '20 min',
            onAction: () => setActivePhase('CRITICAL5'),
            actionLabel: 'Connect',
        },
        {
            id: 'STAKEHOLDERS',
            title: 'Org Chart',
            description: 'Understand who does what.',
            icon: <Map className="w-5 h-5" />,
            status: completedPhases.includes('STAKEHOLDERS') ? 'COMPLETED' : 'AVAILABLE',
            type: 'LEARNING',
            estimatedTime: '10 min',
            onAction: () => setActivePhase('STAKEHOLDERS'),
            actionLabel: 'Explore Chart',
        },
        {
            id: 'RITUALS',
            title: 'Team Meetings',
            description: 'Add key meetings to your calendar.',
            icon: <Calendar className="w-5 h-5" />,
            status: completedPhases.includes('RITUALS') ? 'COMPLETED' : 'AVAILABLE',
            type: 'ACTION',
            progress: checkProgress(ritualsAcknowledged, 2),
            estimatedTime: '5 min',
            onAction: () => setActivePhase('RITUALS'),
            actionLabel: 'Sync Calendar',
        },
        {
            id: 'NORMS',
            title: 'Collaboration Guide',
            description: 'How we work together.',
            icon: <Info className="w-5 h-5" />,
            status: completedPhases.includes('NORMS') ? 'COMPLETED' : 'AVAILABLE',
            type: 'LEARNING',
            estimatedTime: '10 min',
            onAction: () => setActivePhase('NORMS'),
            actionLabel: 'Read Guide',
        },
        {
            id: 'COHORT',
            title: 'New Hires Group',
            description: 'Connect with others starting today.',
            icon: <Users className="w-5 h-5" />,
            status: completedPhases.includes('COHORT') ? 'COMPLETED' : 'AVAILABLE',
            type: 'CONNECT',
            progress: checkProgress(cohortConnected, 1),
            estimatedTime: '15 min',
            onAction: () => setActivePhase('COHORT'),
            actionLabel: 'Meet Group',
        }
    ];



    if (activePhase) {
        let content = null;
        let title = '';
        switch (activePhase) {
            case 'CRITICAL5': title = 'Key People'; content = renderCritical5Phase(); break;
            case 'STAKEHOLDERS': title = 'Org Chart'; content = renderStakeholdersPhase(); break;
            case 'RITUALS': title = 'Team Meetings'; content = renderRitualsPhase(); break;
            case 'NORMS': title = 'Collaboration Guide'; content = renderNormsPhase(); break;
            case 'COHORT': title = 'New Hires Group'; content = renderCohortPhase(); break;
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
                    Your Team
                </h1>
                <p className="text-neutral-500">
                    Connect with your key people and new hires.
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
                    {allModulesComplete ? 'Complete Day 4' : `Complete All Modules (${completedPhases.length}/5)`}
                    {allModulesComplete && <ChevronRight className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

export default Day4NetworkCollaboration;
