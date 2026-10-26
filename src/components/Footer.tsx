import React from 'react';
import { ShieldCheck, RotateCcw, Truck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-zinc-200 pt-16 pb-12 text-zinc-600 text-xs">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Top Trust Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-zinc-100">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-zinc-100 text-zinc-900 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 text-sm">
                White-Glove In-Home Setup
              </h4>
              <p className="text-zinc-500 mt-0.5 leading-relaxed">
                Delivered unboxed and placed in your room of choice. All packaging materials are recycled.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-zinc-100 text-zinc-900 shrink-0">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 text-sm">
                60-Day Risk-Free Trial
              </h4>
              <p className="text-zinc-500 mt-0.5 leading-relaxed">
                Test your chair in your actual work environment. Full refund with complimentary return pickup if not completely enamored.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-zinc-100 text-zinc-900 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 text-sm">
                12-Year Structural Guarantee
              </h4>
              <p className="text-zinc-500 mt-0.5 leading-relaxed">
                Covers cylinder, cast aluminum frame, mechanism, and mesh. Built to endure decades of computational focus.
              </p>
            </div>
          </div>
        </div>

        {/* Links & Brand Columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 items-start">
          <div className="col-span-2 md:col-span-4 space-y-3">
            <a
              href="#"
              className="text-lg font-bold tracking-tight text-zinc-950 font-display uppercase block"
            >
              NEXLIVO
            </a>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">
              Architectural ergonomic seating engineered in Copenhagen. Built with mechanical clarity and sustainable recyclability for creators who sit to build the future.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-2.5">
            <h5 className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">
              Collection
            </h5>
            <ul className="space-y-2">
              <li>
                <a href="#chairs" className="hover:text-zinc-950 transition-colors">
                  Nexlivo One
                </a>
              </li>
              <li>
                <a href="#chairs" className="hover:text-zinc-950 transition-colors">
                  Nexlivo Flow
                </a>
              </li>
              <li>
                <a href="#chairs" className="hover:text-zinc-950 transition-colors">
                  Nexlivo Atelier
                </a>
              </li>
              <li>
                <a href="#configurator" className="hover:text-zinc-950 transition-colors">
                  Customizer
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-2.5">
            <h5 className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">
              Science & Craft
            </h5>
            <ul className="space-y-2">
              <li>
                <a href="#craft" className="hover:text-zinc-950 transition-colors">
                  Synchronous Mechanism
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-zinc-950 transition-colors">
                  8-Zone Tensile Mesh
                </a>
              </li>
              <li>
                <a href="#compare" className="hover:text-zinc-950 transition-colors">
                  Model Comparison
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-zinc-950 transition-colors">
                  Die-Cast Aluminum
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 space-y-3">
            <h5 className="font-semibold text-zinc-900 uppercase tracking-wider text-[11px]">
              Ergonomic Dispatch
            </h5>
            <p className="text-zinc-500 text-xs">
              Receive concise biomechanical research notes and studio releases.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your.email@domain.com"
                className="flex-1 px-3 py-2 text-xs border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
              <button
                type="button"
                onClick={() => alert('Thank you for subscribing to the Ergonomic Dispatch.')}
                className="px-4 py-2 text-xs font-semibold bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Baseline */}
        <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            © {new Date().getFullYear()} Nexlivo Ergonomics Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-700 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-zinc-700 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-zinc-700 transition-colors">
              Warranty Registration
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
