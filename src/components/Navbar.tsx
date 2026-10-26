import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenFinder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenFinder }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#fbfbfb]/90 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-zinc-900 font-display uppercase whitespace-nowrap shrink-0"
        >
          NEXLIVO
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
          <a
            href="#chairs"
            className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
          >
            Chairs
          </a>
          <a
            href="#configurator"
            className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
          >
            Customizer
          </a>
          <a
            href="#craft"
            className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
          >
            Engineering
          </a>
          <a
            href="#compare"
            className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
          >
            Compare
          </a>
          <button
            onClick={onOpenFinder}
            className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 cursor-pointer text-zinc-600"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-700" />
            <span>Chair Matcher</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            className="relative px-4 py-2 text-xs font-semibold tracking-wide text-zinc-900 bg-zinc-100 hover:bg-zinc-200/90 rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 border border-zinc-200"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4 text-zinc-800" />
            <span>Bag</span>
            <span className="font-mono tabular-nums text-xs bg-zinc-900 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-[#fbfbfb] px-6 py-4 space-y-3">
          <a
            href="#chairs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-800 hover:text-zinc-950"
          >
            Chairs Collection
          </a>
          <a
            href="#configurator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-800 hover:text-zinc-950"
          >
            Interactive Customizer
          </a>
          <a
            href="#craft"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-800 hover:text-zinc-950"
          >
            Engineering & Craft
          </a>
          <a
            href="#compare"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-zinc-800 hover:text-zinc-950"
          >
            Model Comparison
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenFinder();
            }}
            className="w-full text-left py-2 text-sm font-medium text-zinc-900 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Find Your Ergonomic Fit</span>
          </button>
        </div>
      )}
    </header>
  );
};
