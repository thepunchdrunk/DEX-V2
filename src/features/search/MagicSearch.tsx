import React, { useState, useEffect, useRef } from 'react';
import {
    Search,
    Sparkles,
    ArrowRight,
    AlertTriangle,
    FileText,
    Ticket,
    Navigation,
    HelpCircle,
    X,
    Loader2,
} from 'lucide-react';
import { MagicSearchResult, MagicAction } from '@/types';

interface MagicSearchProps {
    onClose?: () => void;
}

// Simulated intent classification
const classifyIntent = (query: string): MagicSearchResult | null => {
    const q = query.toLowerCase();

    if (q.includes('sandbox') || q.includes('provision') || q.includes('environment')) {
        return {
            query,
            intent: 'PROVISION',
            confidence: 0.92,
            action: {
                type: 'OPEN_TICKET',
                label: 'Open Provisioning Ticket',
                description: 'Create a new sandbox environment request with your User ID pre-filled.',
                prefilled: {
                    'User ID': 'alex.thompson',
                    'Request Type': 'Sandbox Environment',
                    'Priority': 'Medium',
                },
                requiresConfirmation: true,
            },
        };
    }

    if (q.includes('jira') || q.includes('ticket') || q.includes('issue')) {
        return {
            query,
            intent: 'NAVIGATE',
            confidence: 0.88,
            action: {
                type: 'NAVIGATE',
                label: 'Open Jira Board',
                description: 'Navigate to your assigned Jira board.',
                url: 'https://jira.company.com/board/qa-team',
                requiresConfirmation: false,
            },
        };
    }

    if (q.includes('doc') || q.includes('create') || q.includes('new')) {
        return {
            query,
            intent: 'CREATE',
            confidence: 0.85,
            action: {
                type: 'CREATE_DOCUMENT',
                label: 'Create New Document',
                description: 'Start a new document in Confluence.',
                url: 'https://confluence.company.com/new',
                requiresConfirmation: false,
            },
        };
    }

    if (q.includes('help') || q.includes('how') || q.includes('what')) {
        return {
            query,
            intent: 'HELP',
            confidence: 0.78,
            action: {
                type: 'SHOW_INFO',
                label: 'View Help Article',
                description: 'Show relevant help documentation.',
                requiresConfirmation: false,
            },
        };
    }

    if (q.length > 5) {
        return {
            query,
            intent: 'SEARCH',
            confidence: 0.65,
            action: {
                type: 'SHOW_INFO',
                label: 'Search Knowledge Base',
                description: 'Search for relevant information across all systems.',
                requiresConfirmation: false,
            },
        };
    }

    return null;
};

const MagicSearch: React.FC<MagicSearchProps> = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<MagicSearchResult | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (query.length < 3) {
            setResult(null);
            return;
        }

        const timer = setTimeout(() => {
            setIsProcessing(true);
            // Simulate AI processing
            setTimeout(() => {
                setResult(classifyIntent(query));
                setIsProcessing(false);
            }, 400);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const getIntentIcon = (intent: MagicSearchResult['intent']) => {
        switch (intent) {
            case 'PROVISION':
                return <Ticket className="w-5 h-5" />;
            case 'NAVIGATE':
                return <Navigation className="w-5 h-5" />;
            case 'CREATE':
                return <FileText className="w-5 h-5" />;
            case 'SEARCH':
                return <Search className="w-5 h-5" />;
            case 'HELP':
                return <HelpCircle className="w-5 h-5" />;
        }
    };

    const getIntentColor = (intent: MagicSearchResult['intent']) => {
        switch (intent) {
            case 'PROVISION':
                return 'text-purple-600 bg-purple-50';
            case 'NAVIGATE':
                return 'text-blue-600 bg-blue-50';
            case 'CREATE':
                return 'text-emerald-600 bg-emerald-50';
            case 'SEARCH':
                return 'text-neutral-600 bg-neutral-100';
            case 'HELP':
                return 'text-amber-600 bg-amber-50';
        }
    };

    const handleExecute = () => {
        if (!result) return;

        if (result.action.requiresConfirmation && !showConfirmation) {
            setShowConfirmation(true);
            return;
        }

        // Execute the action

        if (result.action.url) {
            window.open(result.action.url, '_blank');
        }
        setQuery('');
        setResult(null);
        setShowConfirmation(false);
        onClose?.();
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Search Input */}
            <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 transition-transform group-focus-within:scale-110 duration-300">
                    {isProcessing ? (
                        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                    ) : (
                        <Sparkles className="w-5 h-5 text-amber-500" />
                    )}
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Quick Actions — Try "I need a sandbox" or "Open Jira"'
                    className="w-full pl-14 pr-12 py-5 bg-white border border-neutral-200 rounded-2xl text-neutral-900 placeholder-neutral-400 focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all text-lg shadow-sm group-hover:shadow-md"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setResult(null);
                        }}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-red-500 transition-colors"
                        aria-label="Clear search"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Result Preview */}
            {result && !showConfirmation && (
                <div className="mt-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-neutral-200 p-5 animate-slide-up shadow-xl relative overflow-hidden">
                    {/* Brand Accent */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-red opacity-50" />

                    <div className="flex items-start gap-4">
                        {/* Intent Icon */}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${getIntentColor(result.intent)} transition-transform hover:rotate-3 duration-300 shadow-sm`}>
                            {getIntentIcon(result.intent)}
                        </div>

                        {/* Action Details */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                                    {result.intent.replace('_', ' ')}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-100 text-neutral-500 font-medium">
                                    {Math.round(result.confidence * 100)}% Match
                                </span>
                            </div>
                            <h3 className="font-bold text-neutral-900 text-lg mb-1 leading-tight">{result.action.label}</h3>
                            <p className="text-sm text-neutral-600 leading-relaxed mb-4">{result.action.description}</p>

                            {/* Pre-filled Fields */}
                            {result.action.prefilled && (
                                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 mb-4">
                                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Contextual Parameters</p>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                        {Object.entries(result.action.prefilled).map(([key, value]) => (
                                            <div key={key} className="text-xs">
                                                <span className="text-neutral-500">{key}:</span>{' '}
                                                <span className="text-neutral-900 font-semibold">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Execute Button Mobile-First (Full width on small, auto on large) */}
                            <button
                                onClick={handleExecute}
                                className="w-full sm:w-auto px-6 py-3 bg-brand-red hover:bg-red-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-red active:scale-95 translate-y-0 hover:-translate-y-0.5"
                            >
                                Execute Action
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Warning for high-impact actions */}
                    {result.action.requiresConfirmation && (
                        <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs text-amber-600 font-medium">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>This action modified institutional state and requires manual confirmation</span>
                        </div>
                    )}
                </div>
            )}

            {/* Confirmation Modal (Streamlined) */}
            {showConfirmation && result && (
                <div className="mt-4 bg-amber-50 backdrop-blur-md rounded-2xl border border-amber-200 p-6 animate-slide-up shadow-lg">
                    <div className="flex items-center gap-3 text-amber-700 mb-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="font-bold block">Final Confirmation</span>
                            <span className="text-xs text-amber-600/80">Check all data before proceeding</span>
                        </div>
                    </div>
                    <div className="mb-6">
                        <p className="text-neutral-900 font-semibold mb-1">{result.action.label}</p>
                        <p className="text-sm text-neutral-600">{result.action.description}</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleExecute}
                            className="flex-1 py-3 bg-brand-red hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-sm active:scale-95"
                        >
                            Confirm & Execute
                        </button>
                        <button
                            onClick={() => setShowConfirmation(false)}
                            className="px-6 py-3 bg-white hover:bg-neutral-50 text-neutral-600 font-bold rounded-xl transition-all border border-neutral-200 active:scale-95"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Empty State Suggestions */}
            {!query && (
                <div className="mt-8 text-center animate-fade-in">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4">Common Intents</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            'I need a sandbox',
                            'Open my Jira board',
                            'Create a new doc',
                            'How do I request access?',
                        ].map((suggestion) => (
                            <button
                                key={suggestion}
                                onClick={() => setQuery(suggestion)}
                                className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 text-sm font-semibold rounded-xl transition-all active:scale-95 border border-transparent hover:border-neutral-300"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MagicSearch;
