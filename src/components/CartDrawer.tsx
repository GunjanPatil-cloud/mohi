import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  promoDiscountPercent: number;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  promoDiscountPercent,
  onApplyPromo,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (promoDiscountPercent / 100));
  const total = subtotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const success = onApplyPromo(promoCode.trim());
    if (success) {
      setPromoMessage('Promo code applied: 10% discount');
    } else {
      setPromoMessage('Invalid code. Try "COMFORT10"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-zinc-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-zinc-950 font-display">
              Your Shopping Bag
            </h3>
            <span className="text-xs font-mono tabular-nums bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full font-medium">
              {items.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer rounded-lg hover:bg-zinc-100"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-3">
                <Tag className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-zinc-900">Your bag is empty</p>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                Explore our ergonomic collection and configure a chair tailored to your spine.
              </p>
              <button
                onClick={onClose}
                className="mt-5 px-5 py-2.5 text-xs font-semibold bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Browse Chairs
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartItemId}
                className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex gap-4 items-start"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 object-contain bg-white rounded-xl p-1 border border-zinc-100 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-zinc-900 truncate">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer p-0.5"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[11px] text-zinc-500 mt-0.5 space-y-0.5">
                    <div>Color: {item.selectedColor}</div>
                    {item.frameFinish && <div>Alloy: {item.frameFinish}</div>}
                    {item.hasHeadrest && <div className="text-emerald-700">+ 3D Headrest</div>}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-zinc-200 rounded-lg bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                        className="p-1 text-zinc-500 hover:text-zinc-900 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-mono tabular-nums text-xs font-medium text-zinc-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                        className="p-1 text-zinc-500 hover:text-zinc-900 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono tabular-nums text-xs font-bold text-zinc-950">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-200 bg-white space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Discount code (try COMFORT10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-900 uppercase"
              />
              <button
                type="submit"
                className="px-3 py-2 text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
            {promoMessage && (
              <p className="text-[11px] text-zinc-500">{promoMessage}</p>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-zinc-900 font-medium">
                  ₹{subtotal}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({promoDiscountPercent}%)</span>
                  <span className="font-mono tabular-nums">-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>White-Glove Delivery</span>
                <span className="text-emerald-700 font-medium">Free (₹0)</span>
              </div>
              <div className="pt-2 border-t border-zinc-100 flex justify-between text-sm font-bold text-zinc-950">
                <span>Total</span>
                <span className="font-mono tabular-nums">₹{total}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>60-Day Trial · 12-Year Warranty · Free Returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
