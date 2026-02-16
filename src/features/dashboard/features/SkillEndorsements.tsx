import React, { useState } from 'react';
import { ThumbsUp, User, MessageSquare, TrendingUp, Sparkles, Plus } from 'lucide-react';
import { SkillEndorsement } from '../../../types';
import { MOCK_ENDORSEMENTS } from '../../../constants';

interface SkillEndorsementsProps {
    endorsements?: SkillEndorsement[];
    className?: string;
}

const SkillEndorsements: React.FC<SkillEndorsementsProps> = ({
    endorsements = MOCK_ENDORSEMENTS,
    className = '',
}) => {
    const [showAll, setShowAll] = useState(false);

    // Group endorsements by skill
    const bySkill = endorsements.reduce<Record<string, SkillEndorsement[]>>((acc, e) => {
        if (!acc[e.skillName]) acc[e.skillName] = [];
        acc[e.skillName].push(e);
        return acc;
    }, {});

    const displayedEndorsements = showAll ? endorsements : endorsements.slice(0, 3);

    return (
        <div className={`bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm ${className}`}>
            {/* Header */}
            <div className="p-5 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <ThumbsUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900">Skill Endorsements</h3>
                            <p className="text-xs text-neutral-500">{endorsements.length} peers vouched for your skills</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-all">
                        <Plus className="w-3 h-3" />
                        Endorse a peer
                    </button>
                </div>
            </div>

            {/* Skill Summary Pills */}
            <div className="px-5 py-3 border-b border-neutral-100 flex flex-wrap gap-2">
                {Object.entries(bySkill).map(([skill, list]) => (
                    <div
                        key={skill}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200"
                    >
                        <TrendingUp className="w-3 h-3 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-700">{skill}</span>
                        <span className="text-[10px] font-bold bg-emerald-500 text-white px-1.5 py-0.5 rounded-full">{list.length}</span>
                    </div>
                ))}
            </div>

            {/* Endorsement Cards */}
            <div className="p-5 space-y-3">
                {displayedEndorsements.map((endorsement, i) => (
                    <div
                        key={endorsement.id}
                        className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100 hover:border-emerald-200 transition-all animate-fade-in-up"
                        style={{ animationDelay: `${i * 60}ms` }}
                    >
                        {/* Avatar */}
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-emerald-600" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-neutral-900">{endorsement.endorserName}</span>
                                <span className="text-[10px] text-neutral-400">•</span>
                                <span className="text-[10px] text-neutral-400">{endorsement.endorserTitle}</span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                                <Sparkles className="w-3 h-3 text-emerald-500" />
                                <span className="text-xs font-semibold text-emerald-700">{endorsement.skillName}</span>
                            </div>
                            {endorsement.message && (
                                <div className="mt-2 flex items-start gap-1.5">
                                    <MessageSquare className="w-3 h-3 text-neutral-300 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-neutral-600 italic leading-relaxed">&ldquo;{endorsement.message}&rdquo;</p>
                                </div>
                            )}
                            <span className="text-[10px] text-neutral-300 mt-1 block">
                                {new Date(endorsement.endorsedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More */}
            {endorsements.length > 3 && (
                <div className="px-5 pb-5">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="w-full py-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                        {showAll ? 'Show Less' : `View all ${endorsements.length} endorsements`}
                    </button>
                </div>
            )}
        </div>
    );
};

export default SkillEndorsements;
