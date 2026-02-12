import React from 'react';
import {
    Wallet,
    Heart,
    Receipt,
    FileSignature,
    Check,
} from 'lucide-react';
import { PayrollBenefitsItem } from '../../../types';

interface PayrollBenefitsSectionProps {
    payrollBenefits: PayrollBenefitsItem[];
    setPayrollBenefits: React.Dispatch<React.SetStateAction<PayrollBenefitsItem[]>>;
}

const PayrollBenefitsSection: React.FC<PayrollBenefitsSectionProps> = ({
    payrollBenefits,
    setPayrollBenefits,
}) => {
    const handleCompletePayroll = (id: string) => {
        setPayrollBenefits(prev => prev.map(p =>
            p.id === id ? { ...p, completed: true, signedAt: p.requiresSignature ? new Date().toISOString() : undefined } : p
        ));
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-xl font-black text-neutral-900 tracking-tight">Fiscal & Wellbeing Matrix</h3>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                    Secure your compensation architecture and activate your holistic health benefits.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4" role="list" aria-label="Fiscal and wellbeing items">
                {payrollBenefits.map((item) => (
                    <div key={item.id} role="listitem" className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 flex items-center gap-6 group hover:border-brand-red/20 transition-all">
                        <div className={`
                            w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110
                            ${item.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-neutral-50 text-neutral-400'}
                        `} aria-hidden="true">
                            {item.category === 'PAYROLL' && <Wallet className="w-7 h-7" />}
                            {item.category === 'INSURANCE' && <Heart className="w-7 h-7" />}
                            {item.category === 'DEPENDENT' && <Heart className="w-7 h-7" />}
                            {item.category === 'CLAIMS' && <Receipt className="w-7 h-7" />}
                            {item.category === 'TAX' && <FileSignature className="w-7 h-7" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <p className="font-bold text-neutral-900">{item.title}</p>
                                {item.requiresSignature && !item.completed && (
                                    <span className="text-[9px] px-2 py-0.5 bg-amber-50 text-amber-600 font-black uppercase tracking-widest rounded border border-amber-100 animate-pulse" role="alert">
                                        Signature Required
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-neutral-400 font-medium leading-relaxed">{item.description}</p>
                        </div>
                        {item.completed ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-100" role="status" aria-label={`${item.signedAt ? 'Executed' : 'Active'}`}>
                                <Check className="w-3.5 h-3.5" aria-hidden="true" /> {item.signedAt ? 'Executed' : 'Active'}
                            </div>
                        ) : (
                            <button
                                onClick={() => handleCompletePayroll(item.id)}
                                aria-label={`${item.requiresSignature ? 'Sign Protocol' : 'Activate'} ${item.title}`}
                                className="btn-primary py-2 px-6 text-[10px] uppercase font-black tracking-widest"
                            >
                                {item.requiresSignature ? 'Sign Protocol' : 'Activate'}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PayrollBenefitsSection;
