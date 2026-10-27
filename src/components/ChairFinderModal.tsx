import React, { useState } from 'react';
import { Chair } from '../types';
import { X, Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';

interface ChairFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  chairs: Chair[];
  onSelectChair: (chair: Chair) => void;
  onAddToCart: (chair: Chair, color: string) => void;
}

export const ChairFinderModal: React.FC<ChairFinderModalProps> = ({
  isOpen,
  onClose,
  chairs,
  onSelectChair,
  onAddToCart,
}) => {
  const [step, setStep] = useState<number>(1);
  const [hours, setHours] = useState<string>('9+');
  const [focus, setFocus] = useState<string>('lumbar');
  const [style, setStyle] = useState<string>('mesh');

  if (!isOpen) return null;

  // Determine best chair match
  const getRecommendedChair = (): { chair: Chair; reason: string } => {
    if (focus === 'luxury' || style === 'leather') {
      const chair = chairs.find((c) => c.id === 'nexlivo-atelier') || chairs[0];
      return {
        chair,
        reason:
          'Based on your preference for material warmth and refined executive luxury, the Atelier combines hand-oiled walnut, full-grain Italian leather, and silent knee-tilt comfort.',
      };
    }
    if (focus === 'active' || style === 'light') {
      const chair = chairs.find((c) => c.id === 'nexlivo-flow') || chairs[0];
      return {
        chair,
        reason:
          'Your dynamic working routine benefits from the Flow’s torsional spine that twists naturally with your upper body during creative multitasking.',
      };
    }
    // Default / All-day task
    const chair = chairs.find((c) => c.id === 'nexlivo-one') || chairs[0];
    return {
      chair,
      reason:
        'For 9+ hours of intensive computational focus and maximum lower back relief, the Nexlivo One’s independent 8-zone mesh and 4:1 harmonic synchronous tilt eliminates lumbar fatigue.',
    };
  };

  const recommendation = getRecommendedChair();

  const resetQuiz = () => {
    setStep(1);
    setHours('9+');
    setFocus('lumbar');
    setStyle('mesh');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-zinc-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900">
                Ergonomic Chair Matcher
              </h3>
              <p className="text-[11px] text-zinc-500">
                {step <= 3 ? `Question ${step} of 3` : 'Your Personalized Recommendation'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer rounded-lg hover:bg-zinc-100"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-zinc-900">
                How many hours do you spend seated at your desk each day?
              </h4>
              <div className="space-y-2.5">
                {[
                  { id: '3-5', label: '3 to 5 hours', desc: 'Periodic check-ins and light creative work' },
                  { id: '6-8', label: '6 to 8 hours', desc: 'Standard professional working day' },
                  { id: '9+', label: '9+ hours (Intensive)', desc: 'Extended engineering, writing, or design sessions' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setHours(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                      hours === item.id
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:border-zinc-300'
                    }`}
                  >
                    <div className="font-semibold">{item.label}</div>
                    <div className={hours === item.id ? 'text-zinc-300 text-[11px]' : 'text-zinc-500 text-[11px]'}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full mt-4 py-3 bg-zinc-900 text-white font-medium text-xs rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-zinc-900">
                What is your primary ergonomic concern?
              </h4>
              <div className="space-y-2.5">
                {[
                  { id: 'lumbar', label: 'Lower back relief & spinal decompression', desc: 'Targeted support to prevent slouching and tailbone fatigue' },
                  { id: 'active', label: 'Free, dynamic posture and mobility', desc: 'Flexibility to move, lean, and reach across multiple screens' },
                  { id: 'luxury', label: 'Executive presence with all-day comfort', desc: 'Premium natural materials that age gracefully in a high-end office' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFocus(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                      focus === item.id
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:border-zinc-300'
                    }`}
                  >
                    <div className="font-semibold">{item.label}</div>
                    <div className={focus === item.id ? 'text-zinc-300 text-[11px]' : 'text-zinc-500 text-[11px]'}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setStep(1)}
                  className="py-3 px-4 bg-zinc-100 text-zinc-700 font-medium text-xs rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-zinc-900 text-white font-medium text-xs rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-zinc-900">
                Which aesthetic best integrates into your room?
              </h4>
              <div className="space-y-2.5">
                {[
                  { id: 'mesh', label: 'Monochrome High-Tech Breathable Mesh', desc: 'Precision industrial look, clean dark obsidian or slate' },
                  { id: 'light', label: 'Minimalist Scandinavian Ash & Mist', desc: 'Calm, architectural, bright and airy profile' },
                  { id: 'leather', label: 'Cognac Saddle Leather & Molded Walnut', desc: 'Mid-century luxury heirloom materials' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setStyle(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                      style === item.id
                        ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:border-zinc-300'
                    }`}
                  >
                    <div className="font-semibold">{item.label}</div>
                    <div className={style === item.id ? 'text-zinc-300 text-[11px]' : 'text-zinc-500 text-[11px]'}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setStep(2)}
                  className="py-3 px-4 bg-zinc-100 text-zinc-700 font-medium text-xs rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 py-3 bg-zinc-900 text-white font-medium text-xs rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>See Your Perfect Match</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              {/* Product Match Card */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src={recommendation.chair.image}
                  alt={recommendation.chair.name}
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 object-contain shrink-0"
                />
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    Recommended Model
                  </div>
                  <h4 className="text-lg font-bold text-zinc-950 font-display">
                    {recommendation.chair.name}
                  </h4>
                  <div className="font-mono tabular-nums text-sm font-semibold text-zinc-900 mb-1">
                    ₹{recommendation.chair.price}
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {recommendation.reason}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    onAddToCart(recommendation.chair, recommendation.chair.colors[0]?.name || 'Standard');
                    onClose();
                  }}
                  className="w-full py-3 bg-zinc-900 text-white font-semibold text-xs rounded-xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Add Recommended Chair to Bag (₹{recommendation.chair.price})</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onSelectChair(recommendation.chair);
                      onClose();
                    }}
                    className="flex-1 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-medium text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    View Complete Specs
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="py-2.5 px-4 text-zinc-500 hover:text-zinc-800 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
