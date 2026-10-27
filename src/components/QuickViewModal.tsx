import React, { useState } from 'react';
import { Chair } from '../types';
import { X, Check, ShieldCheck, RotateCcw, Truck, Plus, Minus } from 'lucide-react';

interface QuickViewModalProps {
  chair: Chair | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (chair: Chair, color: string, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  chair,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !chair) return null;

  const currentColor = chair.colors[selectedColorIndex] || chair.colors[0];

  const handleAdd = () => {
    onAddToCart(chair, currentColor.name, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-zinc-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <span>{chair.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{chair.specs.warranty}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer rounded-lg hover:bg-zinc-100"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Product Image */}
            <div className="relative aspect-square rounded-2xl bg-zinc-50 border border-zinc-100 p-6 flex items-center justify-center">
              <img
                src={chair.image}
                alt={`${chair.name} in ${currentColor.name}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>

            {/* Product Details & Purchase Form */}
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl font-bold text-zinc-950 font-display">
                  {chair.name}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">{chair.subtitle}</p>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-mono tabular-nums text-2xl font-bold text-zinc-900">
                    ₹{chair.price.toLocaleString('en-IN')}
                  </span>
                  {chair.originalPrice && (
                    <span className="font-mono tabular-nums text-sm text-zinc-400 line-through">
                      ₹{chair.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                    In Stock · Ships in 24h
                  </span>
                </div>
              </div>

              {/* Color Selector */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-zinc-700">Upholstery Color:</span>
                  <span className="text-zinc-500 font-medium">{currentColor.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {chair.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                        selectedColorIndex === idx
                          ? 'ring-2 ring-zinc-900 ring-offset-2 scale-110'
                          : 'border-zinc-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-600 leading-relaxed">
                {chair.description}
              </p>

              {/* Quantity & Buy CTA */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 text-zinc-600 hover:text-zinc-900 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 font-mono tabular-nums text-xs font-semibold text-zinc-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 text-zinc-600 hover:text-zinc-900 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag (₹{(chair.price * quantity).toLocaleString('en-IN')})</span>
                  )}
                </button>
              </div>

              {/* Trust badges */}
              <div className="pt-3 border-t border-zinc-100 grid grid-cols-2 gap-2 text-[11px] text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Free White-Glove Setup</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
                  <span>60-Day Trial Window</span>
                </span>
              </div>
            </div>
          </div>

          {/* Technical Specifications Section */}
          <div className="border-t border-zinc-200 pt-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900 mb-3">
              Full Mechanical Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="block text-zinc-400 text-[11px]">Tilt Mechanism</span>
                <span className="font-medium text-zinc-800">{chair.specs.mechanism}</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="block text-zinc-400 text-[11px]">Lumbar System</span>
                <span className="font-medium text-zinc-800">{chair.specs.lumbar}</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="block text-zinc-400 text-[11px]">Armrest Articulation</span>
                <span className="font-medium text-zinc-800">{chair.specs.armrests}</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="block text-zinc-400 text-[11px]">Weight Tolerance</span>
                <span className="font-mono tabular-nums font-medium text-zinc-800">
                  {chair.specs.maxWeight}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="block text-zinc-400 text-[11px]">Seat Elevation Range</span>
                <span className="font-mono tabular-nums font-medium text-zinc-800">
                  {chair.specs.seatHeight}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <span className="block text-zinc-400 text-[11px]">Materials & Sustainability</span>
                <span className="font-medium text-zinc-800">{chair.specs.materials}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
