import React from 'react';
import {
    Shield,
    Sparkles,
    Building2,
    Lock,
    Check,
} from 'lucide-react';
import { PrivacySettings } from '../../../types';

interface PrivacySettingsSectionProps {
    privacySettings: PrivacySettings;
    setPrivacySettings: React.Dispatch<React.SetStateAction<PrivacySettings>>;
}

const PrivacySettingsSection: React.FC<PrivacySettingsSectionProps> = ({
    privacySettings,
    setPrivacySettings,
}) => {
    return (
        <div className="space-y-10 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Neural Privacy Protocols</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    DEX operates on a foundation of radical transparency. Control your digital signature and visibility within the ecosystem.
                </p>
            </div>

            {/* Data Collection Notice */}
            <div className="bg-white rounded-[32px] p-8 border border-neutral-100 shadow-xl shadow-brand-red/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Shield className="w-24 h-24 text-brand-red" />
                </div>
                <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-brand-red">Data Sovereignty Notice</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: 'Personalized Learning', desc: 'Progress data is used ONLY to refine your development roadmap.' },
                        { title: 'Productivity Insights', desc: 'Tool usage patterns help us optimize your workflow environment.' },
                        { title: 'Social Integration', desc: 'Collaboration metrics identify key institutional mentors for you.' }
                    ].map((idx, i) => (
                        <div key={i} className="space-y-2">
                            <p className="text-xs font-bold text-neutral-900">{idx.title}</p>
                            <p className="text-[10px] text-neutral-500 leading-relaxed font-medium">{idx.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Learning Visibility Control */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h4 className="font-bold text-neutral-900">Digital Visibility Spectrum</h4>
                        <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-1">Select your operational preference</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4" role="radiogroup" aria-label="Digital Visibility Selection">
                    {(['VISIBLE', 'TEAM_ONLY', 'PRIVATE'] as const).map((option) => (
                        <button
                            key={option}
                            onClick={() => setPrivacySettings(prev => ({ ...prev, learningVisibility: option }))}
                            role="radio"
                            aria-checked={privacySettings.learningVisibility === option}
                            aria-label={`${option.replace('_', ' ')} Visibility`}
                            className={`
                                relative py-6 px-4 rounded-2xl flex flex-col items-center justify-center transition-all border-2
                                ${privacySettings.learningVisibility === option
                                    ? 'bg-white border-brand-red text-brand-red shadow-xl shadow-red-500/10'
                                    : 'bg-white border-neutral-50 text-neutral-400 hover:border-neutral-200'}
                            `}
                        >
                            <div className="mb-3" aria-hidden="true">
                                {option === 'VISIBLE' && <Sparkles className={`w-6 h-6 ${privacySettings.learningVisibility === option ? 'text-brand-red' : ''}`} />}
                                {option === 'TEAM_ONLY' && <Building2 className={`w-6 h-6 ${privacySettings.learningVisibility === option ? 'text-brand-red' : ''}`} />}
                                {option === 'PRIVATE' && <Lock className={`w-6 h-6 ${privacySettings.learningVisibility === option ? 'text-brand-red' : ''}`} />}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest" aria-hidden="true">
                                {option.replace('_', ' ')}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Acknowledge Action */}
            <div className="pt-4">
                {!privacySettings.dataRetentionAcknowledged ? (
                    <button
                        onClick={() => setPrivacySettings(prev => ({
                            ...prev,
                            dataRetentionAcknowledged: true,
                            lastUpdated: new Date().toISOString()
                        }))}
                        className="w-full py-6 bg-brand-red hover:bg-red-600 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-red-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                        <Shield className="w-4 h-4" />
                        Acknowledge & Sync Privacy Protocols
                    </button>
                ) : (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-center gap-4 animate-bounce-slow">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                            <Check className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-emerald-900 font-bold text-sm">Privacy calibrated</p>
                            <p className="text-[10px] text-emerald-600 font-medium uppercase tracking-widest mt-0.5">Your settings have been written to the core</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrivacySettingsSection;
