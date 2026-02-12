import React from 'react';
import {
    Key,
    CheckCircle2,
} from 'lucide-react';
import { DigitalReadinessItem } from '../../../types';

interface DigitalReadinessSectionProps {
    digitalReadiness: DigitalReadinessItem[];
    setDigitalReadiness: React.Dispatch<React.SetStateAction<DigitalReadinessItem[]>>;
}

const DigitalReadinessSection: React.FC<DigitalReadinessSectionProps> = ({
    digitalReadiness,
    setDigitalReadiness,
}) => {
    const handleVerifyDigital = (id: string) => {
        setDigitalReadiness(prev => prev.map(d =>
            d.id === id ? { ...d, status: 'VERIFIED', verifiedAt: new Date().toISOString() } : d
        ));
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Neural Core Authentication</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Initialize your institutional credentials and establish secure neural links to the enterprise core.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4" role="list" aria-label="Digital readiness items">
                {digitalReadiness.map((item) => (
                    <div key={item.id} role="listitem" className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 flex items-center gap-6 group hover:border-brand-red/20 transition-all">
                        <div className={`
                            w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110
                            ${item.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600' : ''}
                            ${item.status === 'FAILED' ? 'bg-brand-red/10 text-brand-red' : ''}
                            ${item.status === 'NOT_STARTED' || item.status === 'IN_PROGRESS' ? 'bg-neutral-50 text-neutral-400' : ''}
                        `} aria-hidden="true">
                            <Key className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-neutral-900 mb-1">{item.title}</p>
                            <p className="text-xs text-neutral-400 font-medium leading-relaxed">{item.description}</p>
                        </div>
                        {item.status === 'VERIFIED' ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-100" role="status" aria-label="Identity Verified">
                                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Identity Verified
                            </div>
                        ) : item.status === 'FAILED' ? (
                            <button
                                onClick={() => handleVerifyDigital(item.id)}
                                aria-label={`Retry Sync for ${item.title}`}
                                className="btn-primary bg-brand-red py-2 px-6 text-[10px] uppercase font-black tracking-widest animate-pulse"
                            >
                                Retry Sync
                            </button>
                        ) : (
                            <button
                                onClick={() => handleVerifyDigital(item.id)}
                                aria-label={`Initialize Sync for ${item.title}`}
                                className="btn-primary py-2 px-6 text-[10px] uppercase font-black tracking-widest"
                            >
                                Initialize Sync
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DigitalReadinessSection;
