import React, { useState } from 'react';
import { Users, Star, Clock, ArrowRight, Zap, RefreshCw, MessageSquare, ChevronRight } from 'lucide-react';
import { MentorMatch as MentorMatchType } from '../../../types';
import { MOCK_MENTOR_MATCHES } from '../../../constants';

interface MentorMatchProps {
    matches?: MentorMatchType[];
    className?: string;
}

const AVAILABILITY_STYLES: Record<string, { label: string; color: string }> = {
    HIGH: { label: 'Available', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    MEDIUM: { label: 'Limited', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    LOW: { label: 'Waitlist', color: 'bg-red-100 text-red-700 border-red-200' },
};

const MENTOR_TYPE_LABELS: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
    TRADITIONAL: { label: 'Traditional', icon: <Star className="w-3 h-3" />, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    REVERSE: { label: 'Reverse', icon: <RefreshCw className="w-3 h-3" />, color: 'text-violet-600 bg-violet-50 border-violet-200' },
    FLASH: { label: 'Flash', icon: <Zap className="w-3 h-3" />, color: 'text-amber-600 bg-amber-50 border-amber-200' },
};

const MentorMatch: React.FC<MentorMatchProps> = ({
    matches = MOCK_MENTOR_MATCHES,
    className = '',
}) => {
    const [showReverseOnly, setShowReverseOnly] = useState(false);

    const filteredMatches = showReverseOnly
        ? matches.filter(m => m.mentorType === 'REVERSE')
        : matches;

    return (
        <div className={`bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm ${className}`}>
            {/* Header */}
            <div className="p-5 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900">Mentor Match</h3>
                            <p className="text-xs text-neutral-500">AI-matched mentors based on your skill gaps & goals</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 mt-4">
                    <button
                        onClick={() => setShowReverseOnly(false)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${!showReverseOnly
                                ? 'bg-neutral-900 text-white border-neutral-900'
                                : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                            }`}
                    >
                        All Mentors
                    </button>
                    <button
                        onClick={() => setShowReverseOnly(true)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${showReverseOnly
                                ? 'bg-violet-600 text-white border-violet-600'
                                : 'bg-violet-50 text-violet-600 border-violet-200 hover:bg-violet-100'
                            }`}
                    >
                        <RefreshCw className="w-3 h-3" />
                        Reverse Mentoring
                    </button>
                </div>
            </div>

            {/* Mentor Cards */}
            <div className="p-5 space-y-4">
                {filteredMatches.map((mentor, i) => {
                    const typeStyle = MENTOR_TYPE_LABELS[mentor.mentorType];
                    const availStyle = AVAILABILITY_STYLES[mentor.availability];
                    return (
                        <div
                            key={mentor.id}
                            className="group p-5 rounded-2xl border border-neutral-200 hover:border-blue-200 hover:shadow-md bg-white transition-all animate-fade-in-up"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <div className="flex items-start gap-4">
                                {/* Avatar + Match Score */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-lg font-bold text-blue-600">
                                        {mentor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border-2 border-emerald-300 flex items-center justify-center">
                                        <span className="text-[9px] font-black text-emerald-600">{mentor.matchScore}%</span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="text-sm font-bold text-neutral-900">{mentor.name}</h4>
                                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${typeStyle.color}`}>
                                            {typeStyle.icon}
                                            {typeStyle.label}
                                        </span>
                                    </div>
                                    <p className="text-xs text-neutral-500 mt-0.5">{mentor.title} · {mentor.department}</p>

                                    {/* Bio */}
                                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{mentor.bio}</p>

                                    {/* Strengths */}
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                        {mentor.mentorStrengths.map(s => (
                                            <span key={s} className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-medium border border-blue-100">
                                                {s}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Shared Skills */}
                                    {mentor.sharedSkills.length > 0 && (
                                        <div className="flex items-center gap-1.5 mt-2">
                                            <span className="text-[10px] text-neutral-400">Shared:</span>
                                            {mentor.sharedSkills.map(s => (
                                                <span key={s} className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-medium border border-emerald-100">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Footer Stats & CTA */}
                                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
                                        <div className="flex items-center gap-4 text-[10px] text-neutral-400">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {mentor.yearsExperience}yr exp
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                {mentor.menteeCount} mentees
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${availStyle.color}`}>
                                                {availStyle.label}
                                            </span>
                                        </div>
                                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-sm">
                                            <MessageSquare className="w-3 h-3" />
                                            Connect
                                            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer Insight */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100">
                <p className="text-xs text-blue-700 text-center font-medium">
                    🧠 Matches update weekly based on your skill graph changes, completed learning, and career goals.
                </p>
            </div>
        </div>
    );
};

export default MentorMatch;
