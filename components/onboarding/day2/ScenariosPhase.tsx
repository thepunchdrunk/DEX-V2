import React, { useState } from 'react';
import {
    MessageSquare,
    Check,
    ThumbsUp,
    Lightbulb,
    ChevronRight,
} from 'lucide-react';
import { RoleBasedScenario } from '../../../types';

interface ScenariosPhaseProps {
    scenarios: RoleBasedScenario[];
    currentScenarioIndex: number;
    setCurrentScenarioIndex: React.Dispatch<React.SetStateAction<number>>;
    onComplete: () => void;
}

const ScenariosPhase: React.FC<ScenariosPhaseProps> = ({
    scenarios,
    currentScenarioIndex,
    setCurrentScenarioIndex,
    onComplete,
}) => {
    const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const currentScenario = scenarios[currentScenarioIndex];

    const handleChoiceSelect = (choiceId: string) => {
        setSelectedChoice(choiceId);
        setShowFeedback(true);
    };

    const handleNextScenario = () => {
        setSelectedChoice(null);
        setShowFeedback(false);

        if (currentScenarioIndex < scenarios.length - 1) {
            setCurrentScenarioIndex((prev) => prev + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-xl font-black text-neutral-900 tracking-tight">Cultural Simulations</h3>
                    <p className="text-xs text-neutral-400 font-medium mt-1">Navigate institutional gravity through real-world scenarios.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-100">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-none pt-0.5">
                        {currentScenarioIndex + 1} / {scenarios.length} SIMULATIONS
                    </span>
                </div>
            </div>

            {/* Tactical Progress Bar */}
            <div className="h-1.5 bg-neutral-50 rounded-full overflow-hidden mb-8" role="progressbar" aria-valuenow={currentScenarioIndex + 1} aria-valuemin={1} aria-valuemax={scenarios.length} aria-label="Cultural simulation progress">
                <div
                    className="h-full bg-brand-red transition-all duration-700 ease-out shadow-sm"
                    style={{ width: `${((currentScenarioIndex + (showFeedback ? 1 : 0)) / scenarios.length) * 100}%` }}
                />
            </div>

            {currentScenario && (
                <div className="bg-white rounded-[32px] border border-neutral-100 shadow-xl shadow-neutral-100/30 p-8 md:p-10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <MessageSquare className="w-24 h-24 text-brand-red" />
                    </div>

                    {/* Scenario Metadata */}
                    <div className="flex items-center gap-4 mb-8">
                        <span className={`
                            px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.1em]
                            ${currentScenario.difficulty === 'EASY' ? 'bg-emerald-50 text-emerald-600' : ''}
                            ${currentScenario.difficulty === 'MEDIUM' ? 'bg-amber-50 text-amber-600' : ''}
                            ${currentScenario.difficulty === 'HARD' ? 'bg-brand-red/10 text-brand-red' : ''}
                        `}>
                            {currentScenario.difficulty} Complexity
                        </span>
                        <div className="h-4 w-px bg-neutral-100" />
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                            {currentScenario.culturalDimension.replace(/_/g, ' ')}
                        </span>
                    </div>

                    <h4 className="text-2xl font-black text-neutral-900 mb-4 tracking-tight leading-tight">{currentScenario.title}</h4>
                    <p className="text-sm text-neutral-500 mb-10 leading-relaxed max-w-2xl">{currentScenario.description}</p>

                    {/* Decision Matrix */}
                    <div className="grid grid-cols-1 gap-4" role="radiogroup" aria-label="Cultural Decision Matrix">
                        {currentScenario.choices.map((choice) => {
                            const isSelected = selectedChoice === choice.id;
                            const showResult = showFeedback && isSelected;

                            return (
                                <button
                                    key={choice.id}
                                    onClick={() => !showFeedback && handleChoiceSelect(choice.id)}
                                    disabled={showFeedback}
                                    role="radio"
                                    aria-checked={isSelected}
                                    aria-label={`${choice.text}${showResult ? `, Feedback: ${choice.feedback}` : ''}`}
                                    className={`
                                        group w-full p-6 rounded-2xl border text-left transition-all relative overflow-hidden
                                        ${!showFeedback ? 'bg-white border-neutral-100 hover:border-brand-red/30 hover:shadow-lg hover:-translate-y-0.5' : ''}
                                        ${isSelected && choice.isRecommended ? 'border-emerald-200 bg-emerald-50/30' : ''}
                                        ${isSelected && !choice.isRecommended ? 'border-amber-200 bg-amber-50/30' : ''}
                                        ${!isSelected && showFeedback ? 'opacity-40 grayscale-[0.5]' : ''}
                                        ${!showFeedback ? 'active:scale-[0.99]' : ''}
                                    `}
                                >
                                    <div className="flex items-start gap-5 relative z-10">
                                        <div className={`
                                            w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all
                                            ${isSelected
                                                ? (choice.isRecommended ? 'border-emerald-500 bg-emerald-500' : 'border-amber-500 bg-amber-500')
                                                : 'border-neutral-200 group-hover:border-brand-red guest-hover:scale-110'}
                                        `} aria-hidden="true">
                                            {isSelected && <Check className="w-4 h-4 text-white stroke-[3px]" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-bold leading-relaxed ${isSelected ? 'text-neutral-900' : 'text-neutral-600 group-hover:text-neutral-900'}`}>
                                                {choice.text}
                                            </p>

                                            {showResult && (
                                                <div className={`
                                                    mt-5 p-5 rounded-2xl flex items-start gap-4 animate-slide-up
                                                    ${choice.isRecommended ? 'bg-white border border-emerald-100 shadow-sm' : 'bg-white border border-amber-100 shadow-sm'}
                                                `} role="status">
                                                    <div className={`
                                                        w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                                                        ${choice.isRecommended ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}
                                                    `} aria-hidden="true">
                                                        {choice.isRecommended ? <ThumbsUp className="w-5 h-5" /> : <Lightbulb className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${choice.isRecommended ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                            {choice.isRecommended ? 'Optimal Protocol' : 'Alternative Insight'}
                                                        </p>
                                                        <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                                                            {choice.feedback}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Subtle background glow for selected state */}
                                    {isSelected && (
                                        <div className={`absolute inset-0 opacity-10 ${choice.isRecommended ? 'bg-emerald-400' : 'bg-amber-400'}`} aria-hidden="true" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Advancment Trigger */}
                    {showFeedback && (
                        <div className="mt-10 pt-10 border-t border-neutral-100 flex justify-end">
                            <button
                                onClick={handleNextScenario}
                                className="btn-primary group flex items-center gap-4 py-4 px-10"
                            >
                                <span className="text-xs uppercase font-black tracking-widest">
                                    {currentScenarioIndex < scenarios.length - 1 ? 'Execute Next Simulation' : 'Transition to Protocols'}
                                </span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ScenariosPhase;
