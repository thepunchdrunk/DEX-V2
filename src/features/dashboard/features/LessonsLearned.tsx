import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, Tag, AlertTriangle, PenTool, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { LessonLearned } from '@/types';
import { MOCK_LESSONS_LEARNED } from '@/config/constants';

interface LessonsLearnedProps {
    lessons?: LessonLearned[];
    className?: string;
}

const CATEGORY_STYLES: Record<string, { label: string; color: string; icon: string }> = {
    TECHNICAL: { label: 'Technical', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: '🔧' },
    PROCESS: { label: 'Process', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: '⚙️' },
    COMMUNICATION: { label: 'Communication', color: 'bg-teal-100 text-teal-700 border-teal-200', icon: '💬' },
    LEADERSHIP: { label: 'Leadership', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: '👑' },
    PROJECT: { label: 'Project', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: '📋' },
};

const LessonsLearned: React.FC<LessonsLearnedProps> = ({
    lessons = MOCK_LESSONS_LEARNED,
    className = '',
}) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [localLessons, setLocalLessons] = useState(lessons);

    const handleUpvote = (lessonId: string) => {
        setLocalLessons(prev => prev.map(l =>
            l.id === lessonId
                ? { ...l, isUpvoted: !l.isUpvoted, upvotes: l.isUpvoted ? l.upvotes - 1 : l.upvotes + 1 }
                : l
        ));
    };

    return (
        <div className={`bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm ${className}`}>
            {/* Header */}
            <div className="p-5 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
                            <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900">Lessons Learned</h3>
                            <p className="text-xs text-neutral-500">Real stories of failure that made us stronger</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold hover:bg-rose-100 transition-all">
                        <Plus className="w-3 h-3" />
                        Share Story
                    </button>
                </div>
            </div>

            {/* Stories */}
            <div className="divide-y divide-neutral-100">
                {localLessons.map((lesson, i) => {
                    const isExpanded = expandedId === lesson.id;
                    const cat = CATEGORY_STYLES[lesson.category];
                    return (
                        <div
                            key={lesson.id}
                            className="animate-fade-in"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            {/* Summary Row */}
                            <button
                                onClick={() => setExpandedId(isExpanded ? null : lesson.id)}
                                className="w-full text-left p-5 hover:bg-neutral-50/50 transition-colors"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">{cat.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <h4 className="text-sm font-bold text-neutral-900">{lesson.title}</h4>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${cat.color}`}>
                                                {cat.label}
                                            </span>
                                        </div>
                                        <p className="text-xs text-neutral-500">
                                            by <strong>{lesson.authorName}</strong>, {lesson.authorTitle} · {lesson.authorDepartment}
                                        </p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center gap-1 text-xs text-neutral-400">
                                                <ThumbsUp className="w-3 h-3" />
                                                <span>{lesson.upvotes}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-neutral-400">
                                                <Tag className="w-3 h-3" />
                                                <span>{lesson.tags.slice(0, 3).join(', ')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {isExpanded ? (
                                        <ChevronUp className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                                    )}
                                </div>
                            </button>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <div className="px-5 pb-5 animate-fade-in">
                                    {/* Full Story */}
                                    <div className="ml-10 space-y-4">
                                        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                                            <h5 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                <MessageCircle className="w-3 h-3" />
                                                What Happened
                                            </h5>
                                            <p className="text-sm text-neutral-700 leading-relaxed">{lesson.story}</p>
                                        </div>

                                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                                            <h5 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                <PenTool className="w-3 h-3" />
                                                Key Takeaway
                                            </h5>
                                            <p className="text-sm text-emerald-800 leading-relaxed font-medium">{lesson.takeaway}</p>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {lesson.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 text-[10px] font-medium"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleUpvote(lesson.id);
                                                }}
                                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lesson.isUpvoted
                                                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                        : 'bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-150'
                                                    }`}
                                            >
                                                <ThumbsUp className={`w-3.5 h-3.5 ${lesson.isUpvoted ? 'fill-blue-500' : ''}`} />
                                                {lesson.isUpvoted ? 'Upvoted' : 'Upvote'} · {lesson.upvotes}
                                            </button>
                                            <span className="text-[10px] text-neutral-300">
                                                Posted {new Date(lesson.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 border-t border-rose-100">
                <p className="text-xs text-rose-700 text-center font-medium">
                    🌱 <strong>Psychological safety first:</strong> Sharing failures openly makes the entire organization smarter.
                </p>
            </div>
        </div>
    );
};

export default LessonsLearned;
