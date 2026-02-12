import React from 'react';
import {
    Check,
    Circle,
    Loader2,
    AlertCircle,
    Sparkles,
} from 'lucide-react';
import { GreenLightCheck } from '../../../types';

interface GreenLightSectionProps {
    checks: GreenLightCheck[];
}

const GreenLightSection: React.FC<GreenLightSectionProps> = ({ checks }) => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-black text-neutral-900 tracking-tight">System Synergy Scan</h3>
                    <p className="text-xs text-neutral-400 font-medium mt-1">Real-time verification of your operational environment</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                        {checks.filter(c => c.status === 'PASS').length} / {checks.length} CALIBRATED
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list" aria-label="System certification items">
                {checks.map((check) => (
                    <div
                        key={check.id}
                        role="listitem"
                        aria-label={`${check.label}: ${check.status}. ${check.details}`}
                        className={`
                            group flex items-center gap-5 p-5 rounded-2xl border transition-all duration-300
                            ${check.status === 'PASS' ? 'bg-white border-neutral-100 shadow-sm' : ''}
                            ${check.status === 'FAIL' ? 'bg-red-50/50 border-red-100' : ''}
                            ${check.status === 'CHECKING' ? 'bg-neutral-50 border-neutral-200' : ''}
                            ${check.status === 'PENDING' ? 'bg-neutral-50/30 border-dashed border-neutral-200' : ''}
                        `}
                    >
                        <div className={`
                            w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-110
                            ${check.status === 'PASS' ? 'bg-emerald-50 text-emerald-600' : ''}
                            ${check.status === 'FAIL' ? 'bg-brand-red/10 text-brand-red' : ''}
                            ${check.status === 'CHECKING' ? 'bg-neutral-100 text-neutral-400' : ''}
                            ${check.status === 'PENDING' ? 'bg-white text-neutral-200' : ''}
                        `} aria-hidden="true">
                            {check.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`text-sm font-bold ${check.status === 'PASS' ? 'text-neutral-900' : 'text-neutral-500'}`}>{check.label}</p>
                            <p className="text-[10px] text-neutral-400 font-medium truncate mt-0.5 uppercase tracking-tighter">{check.details}</p>
                        </div>
                        {check.status === 'PASS' && <div className="p-1 bg-emerald-50 rounded-full" aria-hidden="true"><Check className="w-4 h-4 text-emerald-600" /></div>}
                        {check.status === 'FAIL' && <AlertCircle className="w-5 h-5 text-brand-red animate-pulse" aria-hidden="true" />}
                        {check.status === 'CHECKING' && <Loader2 className="w-5 h-5 text-neutral-400 animate-spin" aria-hidden="true" />}
                        {check.status === 'PENDING' && <Circle className="w-5 h-5 text-neutral-200" aria-hidden="true" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GreenLightSection;
