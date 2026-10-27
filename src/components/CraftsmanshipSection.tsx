import React from 'react';
import craftImage from '../assets/images/chair_craft_1793035869710.jpg';
import { ShieldCheck, Cpu, RefreshCw, Feather } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  const pillars = [
    {
      icon: Cpu,
      title: 'Harmonic Synchronous 4:1 Ratio',
      description:
        'When you recline 16°, the seat pan articulates exactly 4°. This golden mechanical ratio keeps feet resting flat on the floor, preventing circulation cut-off behind the knees.',
    },
    {
      icon: Feather,
      title: '8-Zone Tensile Polymer Mesh',
      description:
        'Engineered with micro-variable warp tension. Firm support along the sacrum cradles the lumbar spine, while softer perimeter zones eliminate pressure points.',
    },
    {
      icon: ShieldCheck,
      title: 'Die-Cast Aluminum Monocoque',
      description:
        'Precision milled from aircraft-grade structural alloy. Tested to withstand 300,000 cycles without creak, play, or mechanical hysteresis.',
    },
    {
      icon: RefreshCw,
      title: '100% Modular & Circular',
      description:
        'Zero permanent adhesive bonds. Every mechanical component, caster, armpad, and mesh panel is serviceable and replaceable in minutes with a single hex key.',
    },
  ];

  return (
    <section id="craft" className="py-16 lg:py-24 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
            Engineering Provenance
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-display">
            Mechanical honesty over ornamental gimmicks.
          </h2>
          <p className="text-base text-zinc-600 mt-3 leading-relaxed">
            Most chairs disguise cheap stamped metal under bulbous plastic casings. Nexlivo exposes its mechanical soul: tactile knurled rotary tension dials, self-lubricating bronze bushings, and clean structural casting.
          </p>
        </div>

        {/* Feature Split with Macro Detail Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Macro Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm aspect-[16/10] group">
              <img
                src={craftImage}
                alt="Close-up detail of Nexlivo knurled aluminum tension adjustment dial and precision synchronous mechanism"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute bottom-3 left-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[11px] text-zinc-300 border border-zinc-800">
                <span>Detail: Micro-Knurled Rotary Recline Tension Control</span>
              </div>
            </div>
          </div>

          {/* 4 Architectural Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 hover:border-zinc-300 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-zinc-200 flex items-center justify-center mb-3 text-zinc-900 shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900 mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
