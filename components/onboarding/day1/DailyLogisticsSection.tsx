import React from 'react';
import {
    Car,
    Utensils,
    Building2,
    Wifi,
    Check,
} from 'lucide-react';
import { DailyLifeLogistic } from '../../../types';

interface DailyLogisticsSectionProps {
    dailyLogistics: DailyLifeLogistic[];
    setDailyLogistics: React.Dispatch<React.SetStateAction<DailyLifeLogistic[]>>;
}

const DailyLogisticsSection: React.FC<DailyLogisticsSectionProps> = ({
    dailyLogistics,
    setDailyLogistics,
}) => {
    const handleCompleteLogistic = (id: string) => {
        setDailyLogistics(prev => prev.map(d =>
            d.id === id ? { ...d, status: 'COMPLETED' } : d
        ));
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Environmental Logistics</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Personalize your physical operational footprint, from transit protocols to nutritional hubs.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4" role="list" aria-label="Environmental logistics items">
                {dailyLogistics.map((item) => (
                    <div key={item.id} role="listitem" className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 flex items-center gap-6 group hover:border-brand-red/20 transition-all">
                        <div className={`
                            w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110
                            ${item.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-50 text-neutral-400'}
                        `} aria-hidden="true">
                            {item.category === 'COMMUTE' && <Car className="w-7 h-7" />}
                            {item.category === 'PARKING' && <Car className="w-7 h-7" />}
                            {item.category === 'CANTEEN' && <Utensils className="w-7 h-7" />}
                            {item.category === 'FACILITIES' && <Building2 className="w-7 h-7" />}
                            {item.category === 'WIFI_PRINTER' && <Wifi className="w-7 h-7" />}
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-neutral-900 group-hover:text-brand-red transition-colors">{item.title}</p>
                            <p className="text-xs text-neutral-400 font-medium leading-relaxed mt-1">{item.description}</p>
                        </div>
                        {item.status === 'COMPLETED' ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-100" role="status" aria-label="Configuration Synchronized">
                                <Check className="w-3.5 h-3.5" aria-hidden="true" /> Synchronized
                            </div>
                        ) : (
                            <button
                                onClick={() => handleCompleteLogistic(item.id)}
                                aria-label={`${item.actionLabel || 'Configure'} ${item.title}`}
                                className="btn-secondary py-2 px-6 text-[10px] uppercase font-black tracking-widest"
                            >
                                {item.actionLabel || 'Configure'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyLogisticsSection;
