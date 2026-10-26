import React, { useState } from 'react';
import { CartItem, OrderConfirmation } from '../types';
import { X, CheckCircle, ShieldCheck, Truck, Lock, CreditCard, DollarSign } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  onOrderCompleted: (order: OrderConfirmation) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  total,
  onOrderCompleted,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
  });

  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: OrderConfirmation = {
        orderId: `NEX-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
        paymentMethod: formData.paymentMethod === 'card' ? 'Credit Card (ending 4242)' : 'Pay on Delivery / COD',
        items: [...items],
        subtotal,
        discount,
        shipping: 0,
        total,
        estimatedDelivery: '3–5 business days (White-glove included)',
      };

      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      onOrderCompleted(newOrder);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-zinc-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-zinc-900" />
            <h3 className="text-sm font-bold text-zinc-900">
              {confirmedOrder ? 'Order Confirmed' : 'Encrypted White-Glove Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer rounded-lg hover:bg-zinc-100"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {confirmedOrder ? (
            /* Order Confirmation Receipt Screen */
            <div className="text-center space-y-6">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-bold text-zinc-950 font-display">
                  Order Successfully Placed
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Confirmation receipt and tracking sent to{' '}
                  <span className="font-semibold text-zinc-800">{confirmedOrder.customerEmail}</span>
                </p>
              </div>

              {/* Receipt Box */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/90 text-left space-y-4">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-zinc-200">
                  <span className="text-zinc-500">Order ID:</span>
                  <span className="font-mono tabular-nums font-bold text-zinc-900">
                    {confirmedOrder.orderId}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-zinc-900 block">
                    Reserved Items:
                  </span>
                  {confirmedOrder.items.map((it) => (
                    <div
                      key={it.cartItemId}
                      className="flex justify-between text-xs text-zinc-600"
                    >
                      <span>
                        {it.quantity}x {it.name} ({it.selectedColor})
                      </span>
                      <span className="font-mono tabular-nums font-medium text-zinc-900">
                        ${it.price * it.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-zinc-200 space-y-1 text-xs">
                  <div className="flex justify-between text-zinc-600">
                    <span>Shipping Address:</span>
                    <span className="text-right text-zinc-800 max-w-xs truncate">
                      {confirmedOrder.shippingAddress}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>Estimated Arrival:</span>
                    <span className="text-emerald-700 font-medium">
                      {confirmedOrder.estimatedDelivery}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-zinc-900 pt-2 border-t border-zinc-200">
                    <span>Total Paid:</span>
                    <span className="font-mono tabular-nums font-bold">
                      ${confirmedOrder.total}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>60-day in-home trial begins on the day of delivery</span>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-zinc-900 text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Return to Storefront
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order summary bar */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-500">Total Due Today: </span>
                  <span className="font-mono tabular-nums font-bold text-zinc-950 text-base">
                    ${total}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Free White-Glove Setup</span>
                </div>
              </div>

              {/* Contact & Shipping Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                  1. Delivery Information
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="px-3.5 py-2.5 text-xs border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="px-3.5 py-2.5 text-xs border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-3.5 py-2.5 text-xs border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone (for delivery scheduling)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="px-3.5 py-2.5 text-xs border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                </div>

                <input
                  type="text"
                  required
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="px-3.5 py-2.5 text-xs border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="px-3.5 py-2.5 text-xs border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3 pt-2 border-t border-zinc-100">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                  2. Payment Method
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                      formData.paymentMethod === 'card'
                        ? 'border-zinc-900 bg-zinc-900 text-white font-medium'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                      formData.paymentMethod === 'cod'
                        ? 'border-zinc-900 bg-zinc-900 text-white font-medium'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>Pay Upon Delivery</span>
                  </button>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-2 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                    <input
                      type="text"
                      placeholder="Card Number"
                      defaultValue="•••• •••• •••• 4242"
                      className="w-full px-3 py-2 text-xs border border-zinc-200 rounded-lg bg-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        defaultValue="12/28"
                        className="px-3 py-2 text-xs border border-zinc-200 rounded-lg bg-white"
                      />
                      <input
                        type="text"
                        placeholder="CVC"
                        defaultValue="842"
                        className="px-3 py-2 text-xs border border-zinc-200 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <span>Place Order (${total})</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
