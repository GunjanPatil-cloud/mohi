import React from 'react';
import { ArrowRight, CheckCircle2, Recycle, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenFinder }) => {
  return (
    <section id="home" className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-[#F7F8F3] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Typography, Intent & Trust Badges */}
          <div className="lg:col-span-6 space-y-6">
            {/* Lime Pill Badge matching reference screenshot */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B7E36A] text-[#123C2C] text-xs font-bold tracking-[0.03em] uppercase border border-[#123C2C]/10 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#123C2C]" />
                <span>Next-Generation Sustainable Ergonomics</span>
              </div>
            </div>

            {/* Display Headline */}
            <h1
              className="heading-display text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold tracking-tight text-[#123C2C] leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              Transforming Seating <br className="hidden sm:inline" />
              Into a Better <br className="hidden sm:inline" />
              Tomorrow.
            </h1>

            {/* Description */}
            <p className="text-lead text-[#68736C] max-w-xl text-base sm:text-lg leading-relaxed">
              Discover smarter approaches to ergonomic posture, closed-loop alloy recovery, and sustainable business model scaling with Nexlivo.
            </p>

            {/* Action Buttons matching screenshot */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#chairs"
                className="btn-brand-primary px-7 py-3.5 text-sm sm:text-base cursor-pointer shadow-md inline-flex items-center gap-2"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </a>

              <a
                href="#sustainability-audit"
                className="btn-brand-secondary px-7 py-3.5 text-sm sm:text-base cursor-pointer inline-flex items-center gap-2"
              >
                <span>Sustainability Audit</span>
              </a>
            </div>

            {/* Trust Badges matching reference screenshot */}
            <div className="pt-6 border-t border-[#123C2C]/10 flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#123C2C]">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#218653] flex-shrink-0" />
                <span>Documented Chain of Custody</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#123C2C]">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#218653] flex-shrink-0" />
                <span>Traceable Material Recovery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor with Floating Callout Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[26px] overflow-hidden bg-white border border-[#123C2C]/10 shadow-xl aspect-[16/11] sm:aspect-[4/3] group">
              <img
                src="/src/assets/images/hero_chair_1793035852831.jpg"
                alt="Nexlivo ergonomic office task chair in a tranquil Scandinavian minimalist architectural studio"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
              />

              {/* Floating Overlay Card matching reference screenshot */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/60 shadow-lg flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#218653] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Recycle className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-[0.9375rem] text-[#123C2C] leading-snug">
                    Closed-Loop Circular Economy
                  </div>
                  <div className="text-[0.8125rem] text-[#68736C] leading-snug mt-0.5">
                    Re-engineering recycled aerospace alloys into zero-fatigue ergonomic task chairs.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
