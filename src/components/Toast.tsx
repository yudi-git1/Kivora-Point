// ============================================
// FILE: components/Toast.tsx
// ============================================

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

export function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-emerald-400" />,
    error: <XCircle className="h-5 w-5 text-red-400" />,
    info: <Info className="h-5 w-5 text-blue-400" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
  };

  const colors = {
    success: 'border-emerald-500/30 bg-emerald-500/10',
    error: 'border-red-500/30 bg-red-500/10',
    info: 'border-blue-500/30 bg-blue-500/10',
    warning: 'border-yellow-500/30 bg-yellow-500/10',
  };

  return (
    <div
      className={cn(
        'fixed top-20 right-4 z-50 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur transition-all duration-300',
        colors[type],
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      )}
    >
      {icons[type]}
      <span className="text-foreground">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          if (onClose) setTimeout(onClose, 300);
        }}
        className="ml-2 rounded p-1 hover:bg-white/10 transition"
      >
        <X className="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  );
}