import React, { useState } from 'react';
import { Chair } from '../types';
import { Eye, Plus, Check } from 'lucide-react';

interface ChairCardProps {
  chair: Chair;
  onQuickView: (chair: Chair) => void;
  onAddToCart: (chair: Chair, color: string) => void;
}

export const ChairCard: React.FC<ChairCardProps> = ({ chair, onQuickView, onAddToCart }) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const currentColor = chair.colors[selectedColorIndex] || chair.colors[0];

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(chair, currentColor.name);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div
      onClick={() => onQuickView(chair)}
      className="group relative flex flex-col bg-white border border-zinc-200/90 rounded-2xl overflow-hidden hover:border-zinc-300 hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Product Image Area (70% visual focus) */}
      <div className="relative aspect-[4/3] bg-zinc-50 overflow-hidden flex items-center justify-center p-4">
        {!imageError ? (
          <img
            src={chair.image}
            alt={`${chair.name} ergonomic chair in ${currentColor.name}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-104"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 text-zinc-400">
            <span className="text-sm font-medium text-zinc-500">{chair.name}</span>
            <span className="text-xs text-zinc-400">{currentColor.name}</span>
          </div>
        )}

        {/* Quick View overlay button */}
        <div className="absolute inset-0 bg-zinc-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3.5 py-1.5 text-xs font-medium text-zinc-900 bg-white/95 backdrop-blur-sm rounded-md shadow-sm flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Card Content & Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata (Zero-Pill rule) */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1.5">
            <span>{chair.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{chair.specs.warranty}</span>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-base font-semibold text-zinc-900 group-hover:text-zinc-700 transition-colors">
            {chair.name}
          </h3>
          <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{chair.subtitle}</p>
        </div>

        {/* Color Swatches */}
        <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between gap-4">
          <div
            className="flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            {chair.colors.map((color, idx) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColorIndex(idx)}
                title={color.name}
                aria-label={`Select ${color.name}`}
                className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                  selectedColorIndex === idx
                    ? 'ring-2 ring-zinc-900 ring-offset-2 scale-110'
                    : 'border-zinc-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
            <span className="text-[11px] text-zinc-400 ml-1 truncate max-w-[90px]">
              {currentColor.name}
            </span>
          </div>

          {/* Pricing & Add Action */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="font-mono tabular-nums text-base font-bold text-zinc-900">
                ${chair.price}
              </span>
              {chair.originalPrice && (
                <span className="block font-mono tabular-nums text-xs text-zinc-400 line-through">
                  ${chair.originalPrice}
                </span>
              )}
            </div>

            <button
              onClick={handleAdd}
              type="button"
              className={`p-2 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center justify-center ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm'
              }`}
              title="Add to Bag"
              aria-label={`Add ${chair.name} to bag`}
            >
              {justAdded ? (
                <Check className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
