import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Tag, CheckCircle, Video, ChevronRight } from 'lucide-react';
import { OfficeHoursSlot } from '@/types';
import { MOCK_OFFICE_HOURS } from '@/config/constants';

interface OfficeHoursProps {
    slots?: OfficeHoursSlot[];
    className?: string;
}

const OfficeHours: React.FC<OfficeHoursProps> = ({
    slots = MOCK_OFFICE_HOURS,
    className = '',
}) => {
    const [localSlots, setLocalSlots] = useState(slots);

    const handleRegister = (slotId: string) => {
        setLocalSlots(prev => prev.map(s =>
            s.id === slotId
                ? {
                    ...s,
                    isRegistered: !s.isRegistered,
                    registeredCount: s.isRegistered ? s.registeredCount - 1 : s.registeredCount + 1,
                }
                : s
        ));
    };

    const formatDateTime = (dateTime: string) => {
        const d = new Date(dateTime);
        return {
            day: d.toLocaleDateString('en-US', { weekday: 'short' }),
            date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        };
    };

    const getCapacityColor = (registered: number, capacity: number) => {
        const ratio = registered / capacity;
        if (ratio >= 0.9) return 'text-red-500';
        if (ratio >= 0.7) return 'text-amber-500';
        return 'text-emerald-500';
    };

    return (
        <div className={`bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm ${className}`}>
            {/* Header */}
            <div className="p-5 border-b border-neutral-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-neutral-900">Office Hours</h3>
                            <p className="text-xs text-neutral-500">Drop-in sessions with domain experts</p>
                        </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
                        {localSlots.length} upcoming
                    </span>
                </div>
            </div>

            {/* Sessions */}
            <div className="divide-y divide-neutral-100">
                {localSlots.map((slot, i) => {
                    const dt = formatDateTime(slot.dateTime);
                    const capacityColor = getCapacityColor(slot.registeredCount, slot.capacity);
                    const isFull = slot.registeredCount >= slot.capacity;

                    return (
                        <div
                            key={slot.id}
                            className="p-5 hover:bg-neutral-50/50 transition-all animate-fade-in"
                            style={{ animationDelay: `${i * 60}ms` }}
                        >
                            <div className="flex items-start gap-4">
                                {/* Date Badge */}
                                <div className="flex-shrink-0 w-16 text-center">
                                    <div className="w-16 rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden">
                                        <div className="bg-brand-red text-white text-[10px] font-bold py-0.5 uppercase">
                                            {dt.day}
                                        </div>
                                        <div className="py-2">
                                            <div className="text-lg font-black text-neutral-900">{dt.date.split(' ')[1]}</div>
                                            <div className="text-[10px] text-neutral-400 font-medium">{dt.date.split(' ')[0]}</div>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-bold text-neutral-500 mt-1.5">{dt.time}</div>
                                </div>

                                {/* Session Info */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-neutral-900">{slot.topic}</h4>
                                    <p className="text-xs text-neutral-500 mt-0.5">
                                        with <strong>{slot.expertName}</strong> · {slot.expertTitle}
                                    </p>
                                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">{slot.description}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {slot.topicTags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 text-[10px] font-medium border border-teal-100"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100">
                                        <div className="flex items-center gap-3 text-[10px] text-neutral-400">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {slot.duration} min
                                            </span>
                                            <span className={`flex items-center gap-1 font-bold ${capacityColor}`}>
                                                <Users className="w-3 h-3" />
                                                {slot.registeredCount}/{slot.capacity} spots
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Video className="w-3 h-3" />
                                                Virtual
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => handleRegister(slot.id)}
                                            disabled={isFull && !slot.isRegistered}
                                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${slot.isRegistered
                                                    ? 'bg-teal-100 text-teal-700 border border-teal-200'
                                                    : isFull
                                                        ? 'bg-neutral-100 text-neutral-400 border border-neutral-200 cursor-not-allowed'
                                                        : 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'
                                                }`}
                                        >
                                            {slot.isRegistered ? (
                                                <>
                                                    <CheckCircle className="w-3 h-3" />
                                                    Registered
                                                </>
                                            ) : isFull ? (
                                                'Full'
                                            ) : (
                                                <>
                                                    Register
                                                    <ChevronRight className="w-3 h-3" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-t border-teal-100">
                <p className="text-xs text-teal-700 text-center font-medium">
                    🎙️ <strong>Want to host?</strong> Share your expertise by publishing your own office hours.
                </p>
            </div>
        </div>
    );
};

export default OfficeHours;
