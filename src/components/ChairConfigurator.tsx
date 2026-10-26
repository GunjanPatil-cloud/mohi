import React, { useState } from 'react';
import { Chair, CartItem } from '../types';
import { Check, Shield, RotateCcw, Wrench } from 'lucide-react';

interface ChairConfiguratorProps {
  chairs: Chair[];
  onAddToCartCustom: (item: Omit<CartItem, 'cartItemId'>) => void;
}

export const ChairConfigurator: React.FC<ChairConfiguratorProps> = ({
  chairs,
  onAddToCartCustom,
}) => {
  const [selectedChairId, setSelectedChairId] = useState<string>('nexlivo-one');
  const [selectedColor, setSelectedColor] = useState<string>('Obsidian Black');
  const [frameFinish, setFrameFinish] = useState<{ name: string; price: number }>({
    name: 'Brushed Silver Aluminum',
    price: 0,
  });
  const [hasHeadrest, setHasHeadrest] = useState<boolean>(false);
  const [reclineAngle, setReclineAngle] = useState<number>(105);
  const [lumbarTension, setLumbarTension] = useState<'soft' | 'balanced' | 'firm'>('balanced');
  const [armrestMode, setArmrestMode] = useState<'straight' | 'inward' | 'relaxed'>('straight');
  const [added, setAdded] = useState(false);

  const currentChair = chairs.find((c) => c.id === selectedChairId) || chairs[0];

  // Recalculate price
  const basePrice = currentChair.price;
  const finishPrice = frameFinish.price;
  const headrestPrice = hasHeadrest ? 49 : 0;
  const totalPrice = basePrice + finishPrice + headrestPrice;

  // Posture label based on angle
  const getPostureLabel = (angle: number) => {
    if (angle <= 95) return 'Upright Active Focus (90°–95°)';
    if (angle <= 112) return 'Balanced Computing Posture (100°–112°)';
    if (angle <= 125) return 'Creative Ideation & Review (115°–125°)';
    return 'Deep Lumbar Decompression (130°–135°)';
  };

  const handleAddCustom = () => {
    onAddToCartCustom({
      chairId: currentChair.id,
      name: currentChair.name,
      price: totalPrice,
      selectedColor,
      frameFinish: frameFinish.name,
      hasHeadrest,
      quantity: 1,
      image: currentChair.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section id="configurator" className="py-16 lg:py-24 bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
            Studio Configurator
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display text-white">
            Tailor every contact point to your spine.
          </h2>
          <p className="text-sm text-zinc-400 mt-3">
            Select your architectural model, upholstery finish, mechanical resistance, and specialized ergonomic add-ons.
          </p>
        </div>

        {/* 2-Column Split: Visual Preview on Left, Tactile Controls on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {/* Left: Dynamic Visual Showcase */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-6">
            {/* Visual Frame */}
            <div className="relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 flex items-center justify-center border border-zinc-800/80 overflow-hidden">
              <img
                src={currentChair.image}
                alt={`${currentChair.name} in ${selectedColor}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-2xl transition-all duration-300"
                style={{
                  transform: `rotate(${(reclineAngle - 105) * 0.12}deg)`,
                }}
              />

              {/* Dynamic Overlay HUD */}
              <div className="absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-700/60 text-[11px] text-zinc-300">
                <span className="text-zinc-400">Recline Mode: </span>
                <span className="font-medium text-white">{getPostureLabel(reclineAngle)}</span>
              </div>

              {hasHeadrest && (
                <div className="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-700/60 text-[11px] text-emerald-400">
                  + Headrest Active
                </div>
              )}
            </div>

            {/* Quick Live Diagnostics */}
            <div className="w-full grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                <span className="block text-zinc-400 text-[11px]">Lumbar Resistance</span>
                <span className="font-semibold text-zinc-200 capitalize">{lumbarTension}</span>
              </div>
              <div className="bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                <span className="block text-zinc-400 text-[11px]">Synchronous Angle</span>
                <span className="font-mono tabular-nums font-semibold text-zinc-200">
                  {reclineAngle}° Tilt
                </span>
              </div>
              <div className="bg-zinc-900/80 p-3 rounded-xl border border-zinc-800">
                <span className="block text-zinc-400 text-[11px]">Frame Alloy</span>
                <span className="font-semibold text-zinc-200 truncate block">
                  {frameFinish.name.split(' ')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Tactile Control Panel */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Model Selector */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
                1. Select Chair Model
              </label>
              <div className="grid grid-cols-3 gap-2">
                {chairs.map((chair) => (
                  <button
                    key={chair.id}
                    onClick={() => {
                      setSelectedChairId(chair.id);
                      setSelectedColor(chair.colors[0]?.name || 'Standard');
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium text-center transition-all cursor-pointer border ${
                      selectedChairId === chair.id
                        ? 'bg-zinc-100 text-zinc-900 border-white shadow-sm font-semibold'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    <span className="block truncate">{chair.name.replace('Nexlivo ', '')}</span>
                    <span className="font-mono tabular-nums text-[11px] block mt-0.5 opacity-80">
                      ${chair.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Color Finish */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold uppercase tracking-wider text-zinc-400">
                  2. Colorway & Upholstery
                </span>
                <span className="text-zinc-300 font-medium">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2">
                {currentChair.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    className={`h-9 flex-1 rounded-xl flex items-center justify-center gap-2 px-3 border transition-all cursor-pointer text-xs ${
                      selectedColor === color.name
                        ? 'border-white bg-zinc-800 text-white ring-1 ring-white'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 border border-zinc-700"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="truncate">{color.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Frame Finish */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
                3. Chassis & Frame Alloy
              </label>
              <div className="space-y-2">
                {[
                  { name: 'Brushed Silver Aluminum', price: 0 },
                  { name: 'Matte Obsidian Anodized', price: 35 },
                  { name: 'Polished Mirror Chrome', price: 60 },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setFrameFinish(item)}
                    className={`w-full py-2.5 px-3.5 rounded-xl text-xs flex items-center justify-between border transition-all cursor-pointer ${
                      frameFinish.name === item.name
                        ? 'bg-zinc-800 border-white text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="font-mono tabular-nums text-zinc-400">
                      {item.price === 0 ? 'Included' : `+$${item.price}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Ergonomic Adjustments (Interactive Sliders) */}
            <div className="space-y-3 pt-2 border-t border-zinc-800/80">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">
                4. Ergonomic Recline & Tension Calibrator
              </label>

              {/* Angle Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Recline Angle</span>
                  <span className="font-mono tabular-nums text-white">{reclineAngle}°</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="135"
                  value={reclineAngle}
                  onChange={(e) => setReclineAngle(Number(e.target.value))}
                  className="w-full accent-white h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Lumbar Tension Selector */}
              <div>
                <span className="text-xs text-zinc-400 block mb-1.5">Lumbar Firmness</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['soft', 'balanced', 'firm'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setLumbarTension(mode)}
                      className={`py-1.5 text-xs rounded-lg capitalize transition-colors cursor-pointer border ${
                        lumbarTension === mode
                          ? 'bg-zinc-800 border-zinc-500 text-white'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Headrest Toggle */}
              <div
                onClick={() => setHasHeadrest(!hasHeadrest)}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border ${
                      hasHeadrest ? 'bg-white border-white text-zinc-950' : 'border-zinc-600'
                    }`}
                  >
                    {hasHeadrest && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <span className="text-xs font-medium text-white block">
                      3D Articulated Cervical Headrest
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Eliminates neck fatigue during deep recline
                    </span>
                  </div>
                </div>
                <span className="font-mono tabular-nums text-xs text-zinc-400">+$49</span>
              </div>
            </div>

            {/* Total Calculation & Add to Cart */}
            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-zinc-400 block uppercase tracking-wider">
                  Configured Total
                </span>
                <span className="font-mono tabular-nums text-2xl font-bold text-white">
                  ${totalPrice}
                </span>
              </div>

              <button
                onClick={handleAddCustom}
                className={`flex-1 py-3.5 px-6 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white hover:bg-zinc-200 text-zinc-950 shadow-md'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <span>Add Configured Chair to Bag</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
