import React from 'react';
import {
    AlertTriangle,
    MapPin,
    Heart,
    Shield,
    Check,
} from 'lucide-react';
import { SafetyWellbeingItem } from '../../../types';

interface SafetyWellbeingSectionProps {
    safetyWellbeing: SafetyWellbeingItem[];
    setSafetyWellbeing: React.Dispatch<React.SetStateAction<SafetyWellbeingItem[]>>;
}

const SafetyWellbeingSection: React.FC<SafetyWellbeingSectionProps> = ({
    safetyWellbeing,
    setSafetyWellbeing,
}) => {
    const handleAcknowledgeSafety = (id: string) => {
        setSafetyWellbeing(prev => prev.map(s =>
            s.id === id ? { ...s, acknowledged: true, acknowledgedAt: new Date().toISOString() } : s
        ));
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Institutional Resilience</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Familiarize yourself with emergency response protocols and holistic support systems designed for your safety.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {safetyWellbeing.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 group hover:border-brand-red/20 transition-all">
                        <div className="flex items-center gap-6">
                            <div className={`
                                w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110
                                ${item.acknowledged ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-red/10 text-brand-red'}
                            `}>
                                {item.category === 'EMERGENCY' && <AlertTriangle className="w-7 h-7" />}
                                {item.category === 'EVACUATION' && <MapPin className="w-7 h-7" />}
                                {item.category === 'HEALTH' && <Heart className="w-7 h-7" />}
                                {item.category === 'ACCESSIBILITY' && <Shield className="w-7 h-7" />}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-neutral-900 group-hover:text-brand-red transition-colors">{item.title}</p>
                                <p className="text-xs text-neutral-400 font-medium leading-relaxed mt-1">{item.description}</p>
                            </div>
                            {item.acknowledged ? (
                                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-100">
                                    <Check className="w-3.5 h-3.5" /> Acknowledged
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleAcknowledgeSafety(item.id)}
                                    className="btn-primary py-2 px-6 text-[10px] uppercase font-black tracking-widest"
                                >
                                    Certify
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SafetyWellbeingSection;
