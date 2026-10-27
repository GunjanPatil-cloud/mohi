import React from 'react';
import { Chair } from '../types';
import { COMPARISON_FEATURES } from '../data/chairs';
import { ArrowRight } from 'lucide-react';

interface ComparisonMatrixProps {
  chairs: Chair[];
  onSelectChair: (chair: Chair) => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  chairs,
  onSelectChair,
}) => {
  return (
    <section id="compare" className="py-16 lg:py-24 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
          Model Comparison
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-display">
          Compare specifications side-by-side.
        </h2>
        <p className="text-sm text-zinc-600 mt-2">
          Clear, transparent dimensions and mechanical differences to help you select the exact chair for your daily posture.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/75">
              <th className="p-4 sm:p-5 font-semibold text-zinc-500 uppercase tracking-wider w-1/4">
                Specification
              </th>
              {chairs.map((chair) => (
                <th key={chair.id} className="p-4 sm:p-5 w-1/4">
                  <div className="font-bold text-sm sm:text-base text-zinc-950">
                    {chair.name}
                  </div>
                  <div className="text-[11px] text-zinc-500 font-normal mt-0.5 line-clamp-1">
                    {chair.subtitle}
                  </div>
                  <div className="mt-2 text-base font-bold font-mono tabular-nums text-zinc-900">
                    ₹{chair.price.toLocaleString('en-IN')}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {COMPARISON_FEATURES.map((row, idx) => (
              <tr
                key={row.feature}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50/40'}
              >
                <td className="p-4 sm:p-5 font-medium text-zinc-900">
                  {row.feature}
                </td>
                <td className="p-4 sm:p-5 text-zinc-600">{row.one}</td>
                <td className="p-4 sm:p-5 text-zinc-600">{row.flow}</td>
                <td className="p-4 sm:p-5 text-zinc-600">{row.atelier}</td>
              </tr>
            ))}
            {/* Actions Row */}
            <tr className="bg-zinc-50/90 border-t border-zinc-200">
              <td className="p-4 sm:p-5 font-medium text-zinc-700">Actions</td>
              {chairs.map((chair) => (
                <td key={chair.id} className="p-4 sm:p-5">
                  <button
                    onClick={() => onSelectChair(chair)}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span>View {chair.name.replace('Nexlivo ', '')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
