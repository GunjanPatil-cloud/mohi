import React, { useState } from 'react';
import { CHAIRS } from './data/chairs';
import { Chair, CartItem, OrderConfirmation } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ChairCatalog } from './components/ChairCatalog';
import { ChairConfigurator } from './components/ChairConfigurator';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { ChairFinderModal } from './components/ChairFinderModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CourseModules } from './components/CourseModules';
import { Check } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewChair, setQuickViewChair] = useState<Chair | null>(null);
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add standard chair to cart
  const handleAddToCart = (chair: Chair, color: string, quantity = 1) => {
    const cartItemId = `${chair.id}-${color}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          chairId: chair.id,
          name: chair.name,
          price: chair.price,
          selectedColor: color,
          frameFinish: 'Standard Anodized Alloy',
          hasHeadrest: false,
          quantity,
          image: chair.image,
        },
      ];
    });

    showToast(`Added ${chair.name} (${color}) to bag`);
  };

  // Add customized chair to cart from configurator
  const handleAddToCartCustom = (customItem: Omit<CartItem, 'cartItemId'>) => {
    const cartItemId = `${customItem.chairId}-${customItem.selectedColor}-${customItem.frameFinish}-${customItem.hasHeadrest ? 'headrest' : 'nohead'}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...customItem,
          cartItemId,
        },
      ];
    });

    showToast(`Added customized ${customItem.name} to bag`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleApplyPromo = (code: string) => {
    if (code.toUpperCase() === 'COMFORT10') {
      setPromoDiscountPercent(10);
      showToast('10% discount applied to your order');
      return true;
    }
    return false;
  };

  const handleOrderCompleted = (order: OrderConfirmation) => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (promoDiscountPercent / 100));
  const finalTotal = subtotal - discountAmount;

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfb] text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Top Bar (Top Bar Contract: wordmark, 4 nav links, bag button) */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFinder={() => setIsFinderOpen(true)}
      />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <div id="home">
          <Hero onOpenFinder={() => setIsFinderOpen(true)} />
        </div>

        {/* 4. Course Modules (Sustainability to Final Project) */}
        <div className="border-t border-zinc-100 bg-gradient-to-b from-zinc-50/50 to-white">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center space-y-2 mb-2">
              <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">Curriculum</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 font-display">
                Sustainable Scaling Program
              </h2>
              <p className="text-sm text-zinc-500 max-w-2xl mx-auto">
                A comprehensive 8-module journey from startup sustainability audit to a full investor-ready scaling strategy.
              </p>
            </div>
          </div>
          <CourseModules />
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200" />

        {/* 4. Curated Chairs Collection */}
        <ChairCatalog
          chairs={CHAIRS}
          onQuickView={(chair) => setQuickViewChair(chair)}
          onAddToCart={handleAddToCart}
        />

        {/* 5. Interactive Studio Configurator */}
        <ChairConfigurator
          chairs={CHAIRS}
          onAddToCartCustom={handleAddToCartCustom}
        />

        {/* 6. Engineering & Craftsmanship Deep Dive */}
        <CraftsmanshipSection />

        {/* 7. Side-by-Side Model Comparison Matrix */}
        <ComparisonMatrix
          chairs={CHAIRS}
          onSelectChair={(chair) => setQuickViewChair(chair)}
        />

        {/* 8. Attributable Reviews & Verified Feedback */}
        <ReviewsSection />
      </main>

      {/* 9. Architectural Footer */}
      <Footer />

      {/* Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        promoDiscountPercent={promoDiscountPercent}
        onApplyPromo={handleApplyPromo}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        chair={quickViewChair}
        isOpen={!!quickViewChair}
        onClose={() => setQuickViewChair(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 30-Second Chair Finder Assessment Modal */}
      <ChairFinderModal
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
        chairs={CHAIRS}
        onSelectChair={(chair) => setQuickViewChair(chair)}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal & Order Confirmation Receipt */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={subtotal}
        discount={discountAmount}
        total={finalTotal}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Subtle Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 border border-zinc-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
