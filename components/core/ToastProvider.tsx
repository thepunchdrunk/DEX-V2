import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    message: string;
    variant: ToastVariant;
    duration?: number;
    exiting?: boolean;
}

interface ToastContextType {
    addToast: (message: string, variant?: ToastVariant, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType>({
    addToast: () => { },
});

export const useToast = () => useContext(ToastContext);

const VARIANT_CONFIG: Record<ToastVariant, { icon: React.ElementType; className: string; progressColor: string }> = {
    success: { icon: CheckCircle2, className: 'toast-success', progressColor: '#10B981' },
    error: { icon: XCircle, className: 'toast-error', progressColor: '#EF4444' },
    warning: { icon: AlertTriangle, className: 'toast-warning', progressColor: '#F59E0B' },
    info: { icon: Info, className: 'toast-info', progressColor: '#3B82F6' },
};

const ToastItem: React.FC<{ toast: Toast; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
    const config = VARIANT_CONFIG[toast.variant];
    const Icon = config.icon;
    const duration = toast.duration || 4000;
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (progressRef.current) {
            // Start the progress bar animation
            requestAnimationFrame(() => {
                if (progressRef.current) {
                    progressRef.current.style.width = '0%';
                }
            });
        }
    }, [duration]);

    return (
        <div className={`toast ${config.className} ${toast.exiting ? 'toast-exit' : ''}`} role="alert">
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: config.progressColor }} />
            <p className="text-sm flex-1 font-medium" style={{ color: 'var(--neutral-800)' }}>{toast.message}</p>
            <button
                onClick={() => onDismiss(toast.id)}
                className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors flex-shrink-0"
                aria-label="Dismiss notification"
            >
                <X className="w-4 h-4" />
            </button>
            <div
                ref={progressRef}
                className="toast-progress"
                style={{
                    width: '100%',
                    backgroundColor: config.progressColor,
                    transitionDuration: `${duration}ms`,
                }}
            />
        </div>
    );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, variant: ToastVariant = 'info', duration = 4000) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
        setToasts(prev => [...prev, { id, message, variant, duration }]);

        // Auto dismiss with exit animation
        setTimeout(() => {
            setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 200); // match toast-out duration
        }, duration);
    }, []);

    const dismissToast = useCallback((id: string) => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 200);
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {toasts.length > 0 && (
                <div className="toast-container">
                    {toasts.map(toast => (
                        <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
                    ))}
                </div>
            )}
        </ToastContext.Provider>
    );
};

export default ToastProvider;
