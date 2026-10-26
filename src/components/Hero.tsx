import React from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

interface HeroProps {
  onOpenFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenFinder }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-widest">
              <span>Architectural Ergonomics</span>
              <span aria-hidden="true">·</span>
              <span>Designed in Scandinavia</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 font-display leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Ergonomics reduced to pure intention.
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
              Engineered with aerospace-grade die-cast aluminum and 8-zone tensile mesh. Built to eliminate lumbar compression and fatigue during all-day focus—without the clutter of traditional office seating.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#chairs"
                className="px-6 py-3.5 text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm text-center"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenFinder}
                className="px-5 py-3.5 text-sm font-medium text-zinc-800 bg-white hover:bg-zinc-50 border border-zinc-300 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <Sparkles className="w-4 h-4 text-zinc-700" />
                <span>Find Your Ergonomic Fit</span>
              </button>
            </div>

            {/* Quiet Unboxed Proof Points */}
            <div className="pt-6 border-t border-zinc-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-zinc-600">
              <div className="space-y-1">
                <span className="block font-semibold text-zinc-900 font-mono tabular-nums text-sm">
                  12 Years
                </span>
                <span className="text-zinc-500">Structural Warranty</span>
              </div>
              <div className="space-y-1">
                <span className="block font-semibold text-zinc-900 font-mono tabular-nums text-sm">
                  60 Days
                </span>
                <span className="text-zinc-500">In-Home Risk-Free Trial</span>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="block font-semibold text-zinc-900 font-mono tabular-nums text-sm">
                  4.9 / 5.0
                </span>
                <span className="text-zinc-500">Verified Ergonomic Rating</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] group">
              <img
                src="/src/assets/images/hero_chair_1793035852831.jpg"
                alt="Nexlivo ergonomic office task chair in a tranquil Scandinavian minimalist architectural studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
              />

              {/* Quiet Architectural Callout Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-4 rounded-xl border border-zinc-200/90 shadow-md">
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                  <span className="font-medium text-zinc-900">Nexlivo One</span>
                  <span className="font-mono tabular-nums text-zinc-700 font-semibold">$640</span>
                </div>
                <p className="text-xs text-zinc-600 leading-snug">
                  Shown in Obsidian with brushed aluminum star base.
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-zinc-500">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Complimentary White-Glove Setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
