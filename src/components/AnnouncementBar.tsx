import React, { useState } from 'react';
import { X, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-zinc-900 text-zinc-300 text-xs py-2 px-4 border-b border-zinc-800 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-6 text-center text-xs tracking-wide">
          <span className="flex items-center gap-1.5 font-medium text-zinc-100">
            <Truck className="w-3.5 h-3.5 text-zinc-400" />
            <span>Complimentary White-Glove In-Room Delivery & Setup</span>
          </span>
          <span className="hidden md:inline text-zinc-600">·</span>
          <span className="hidden md:flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
            <span>60-Day Risk-Free In-Home Trial</span>
          </span>
          <span className="hidden lg:inline text-zinc-600">·</span>
          <span className="hidden lg:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            <span>12-Year Comprehensive Structural Guarantee</span>
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-zinc-400 hover:text-zinc-200 transition-colors p-1"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
