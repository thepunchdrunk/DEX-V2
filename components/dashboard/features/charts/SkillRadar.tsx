import React from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip
} from 'recharts';
import { SkillBranch } from '../../../../types';

interface SkillRadarProps {
    branches: SkillBranch[];
}

const SkillRadar: React.FC<SkillRadarProps> = ({ branches }) => {
    // Transform data for Radar Chart
    // We want to show "Mastery" or "Health" per branch.
    // Let's use average mastery (0-3 scale normalized to 0-100) or count of mastered skills.

    const data = branches.map(branch => {
        // Flatten children to get all skills in this branch
        const getAllSkills = (b: any): any[] => {
            let skills = [b];
            if (b.children) {
                b.children.forEach((child: any) => {
                    skills = [...skills, ...getAllSkills(child)];
                });
            }
            return skills;
        };

        const allSkills = getAllSkills(branch);
        // Filter out the branch node itself if it's just a category container (optional)
        // Calculate score
        // Mastery: 0=Seed, 1=Sprout, 2=Growing, 3=Mastered.
        // Max score = allSkills.length * 3
        const totalPossible = allSkills.length * 3;
        const currentScore = allSkills.reduce((acc, s) => acc + (s.mastery || 0), 0);
        const normalizedScore = totalPossible > 0 ? Math.round((currentScore / totalPossible) * 100) : 0;

        return {
            subject: branch.name,
            A: normalizedScore,
            fullMark: 100,
        };
    });

    return (
        <div className="w-full h-full min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#e5e5e5" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#525252', fontSize: 10, fontWeight: 'bold' }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Skill Mastery"
                        dataKey="A"
                        stroke="#E60012"
                        strokeWidth={2}
                        fill="#E60012"
                        fillOpacity={0.2}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        itemStyle={{ color: '#E60012', fontWeight: 'bold' }}
                        cursor={false}
                    />
                </RadarChart>
            </ResponsiveContainer>

            {/* Overlay Stats */}
            <div className="absolute bottom-0 right-0 p-2 bg-white/90 backdrop-blur-sm rounded-lg border border-neutral-100 shadow-sm text-[10px] font-bold text-neutral-400">
                Avg. Mastery: {Math.round(data.reduce((acc, d) => acc + d.A, 0) / data.length)}%
            </div>
        </div>
    );
};

export default SkillRadar;
