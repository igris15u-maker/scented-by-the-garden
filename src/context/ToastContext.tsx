import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, Heart, ShoppingBag } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error' | 'cart' | 'wishlist';
  title: string;
  message?: string;
}

interface ToastContextType {
  showToast: (type: Toast['type'], title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: Toast['type'], title: string, message?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev.slice(-3), { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Render Area */}
      <div 
        role="region"
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#20382D] text-[#F7F3EB] border border-[#B69A68]/40 shadow-2xl p-4 rounded-none flex items-start gap-3 transition-all duration-300 animate-slide-up"
          >
            <div className="text-[#B69A68] mt-0.5 shrink-0">
              {toast.type === 'cart' && <ShoppingBag className="w-5 h-5 text-[#B69A68]" />}
              {toast.type === 'wishlist' && <Heart className="w-5 h-5 text-[#B69A68] fill-[#B69A68]" />}
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#B69A68]" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-[#A6AD98]" />}
            </div>
            <div className="flex-1">
              <h4 className="font-serif text-base tracking-wide font-medium text-[#F7F3EB]">
                {toast.title}
              </h4>
              {toast.message && (
                <p className="text-xs text-[#A6AD98] mt-0.5 leading-relaxed font-sans">
                  {toast.message}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
