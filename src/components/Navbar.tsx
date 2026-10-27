import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenFinder: () => void;
}

const NAV_SECTIONS = [
  { label: 'Home', href: '#home', short: true },
  { label: 'Sustainability Audit', href: '#sustainability-audit', short: false },
  { label: 'Business Model Redesign', href: '#business-model', short: false },
  { label: 'Supply Chain & Operations', href: '#supply-chain', short: false },
  { label: 'Financial Projections', href: '#financial', short: false },
  { label: 'Risk Assessment', href: '#risk-assessment', short: false },
  { label: 'ESG Integration', href: '#esg', short: false },
  { label: 'Team & Culture', href: '#team-culture', short: false },
  { label: 'Final Project', href: '#final-project', short: false },
];

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onOpenFinder }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moduleMenuOpen, setModuleMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const modules = NAV_SECTIONS.filter((s) => !s.short);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fbfbfb]/95 backdrop-blur-md shadow-sm border-b border-zinc-200/80'
          : 'bg-[#fbfbfb]/90 backdrop-blur-md border-b border-zinc-200/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Wordmark */}
        <a
          href="#home"
          className="text-xl font-bold tracking-tight text-zinc-900 font-display uppercase whitespace-nowrap shrink-0"
        >
          NEXLIVO
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-600">
          <a
            href="#home"
            className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
          >
            Home
          </a>

          {/* Modules Dropdown */}
          <div className="relative" onMouseEnter={() => setModuleMenuOpen(true)} onMouseLeave={() => setModuleMenuOpen(false)}>
            <button
              className="flex items-center gap-1 hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-haspopup="true"
              aria-expanded={moduleMenuOpen}
            >
              <span>Modules</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moduleMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {moduleMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2">
                  {modules.map((item, idx) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setModuleMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 transition-colors group"
                    >
                      <span className="w-6 h-6 rounded-lg bg-zinc-100 group-hover:bg-zinc-200 flex items-center justify-center text-[11px] font-bold text-zinc-500 shrink-0 transition-colors">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            href="#chairs"
            className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
          >
            Chairs
          </a>
          <a
            href="#compare"
            className="hover:text-zinc-900 transition-colors whitespace-nowrap shrink-0"
          >
            Compare
          </a>
        </nav>

        {/* Right Actions */}
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
            className="lg:hidden p-2 text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-[#fbfbfb] px-6 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 px-3 rounded-lg text-sm font-semibold text-zinc-900 hover:bg-zinc-100 transition-colors"
          >
            🏠 Home
          </a>
          <div className="pt-2 pb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 px-3">Course Modules</span>
          </div>
          {modules.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 transition-colors"
            >
              <span className="w-5 h-5 rounded-md bg-zinc-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                {idx + 1}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
          <div className="pt-2 border-t border-zinc-100">
            <a
              href="#chairs"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-sm font-medium text-zinc-800 hover:bg-zinc-100 transition-colors"
            >
              Chairs Collection
            </a>
            <a
              href="#compare"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-lg text-sm font-medium text-zinc-800 hover:bg-zinc-100 transition-colors"
            >
              Model Comparison
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
