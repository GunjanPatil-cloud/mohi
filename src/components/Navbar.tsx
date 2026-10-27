import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenFinder: () => void;
  activeSection?: string;
}

export const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'sustainability-audit', label: 'Sustainability', href: '#sustainability-audit' },
  { id: 'business-model', label: 'Business Model', href: '#business-model' },
  { id: 'supply-chain', label: 'Supply Chain', href: '#supply-chain' },
  { id: 'financial', label: 'Financials', href: '#financial' },
  { id: 'risk-assessment', label: 'Risk & ESG', href: '#risk-assessment' },
  { id: 'final-project', label: 'Final Project', href: '#final-project' },
  { id: 'chairs', label: 'Chairs', href: '#chairs' },
  { id: 'compare', label: 'Compare', href: '#compare' },
];

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenFinder,
  activeSection = 'home',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState(activeSection);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      const scrollPos = window.scrollY + 180;
      for (const link of NAV_LINKS) {
        const id = link.href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setCurrentSection(id);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2E8F0]'
          : 'bg-[#F7F8F3]/95 backdrop-blur-md border-b border-[#E2E8F0]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
        {/* Brand Logo - Styled with green icon badge matching reference screenshot */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home', 'home')}
          className="flex items-center gap-2.5 text-left shrink-0 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#218653] text-white flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
              <path d="M11 19h8.2a1.8 1.8 0 0 0 1.583-.914.8.8 0 0 0-.017-.81L16.5 10" />
              <path d="m14 4-2.5 4.5" />
              <path d="M9.5 8.5 7 4" />
              <path d="m21 16-2 3" />
              <path d="m3 16 2 3" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-extrabold tracking-tight text-[#123C2C] leading-none uppercase">
              Nexlivo
            </span>
            <span className="text-[10px] font-bold text-[#68736C] tracking-[0.06em] uppercase mt-1">
              Resource & Scale
            </span>
          </div>
        </a>

        {/* Center Nav Links - Direct horizontal layout with active green styling */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-6 text-[0.875rem]">
          {NAV_LINKS.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.id)}
                className={`transition-colors py-1 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#218653] font-bold'
                    : 'text-[#18231D] hover:text-[#218653] font-medium'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Compressed Nav Links for Medium/Large Screens */}
        <nav className="hidden md:flex xl:hidden items-center gap-3.5 text-xs">
          {NAV_LINKS.slice(0, 6).map((link) => {
            const isActive = currentSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.id)}
                className={`transition-colors py-1 whitespace-nowrap ${
                  isActive
                    ? 'text-[#218653] font-bold'
                    : 'text-[#18231D] hover:text-[#218653] font-medium'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions matching reference screenshot button hierarchy */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Secondary Action styled like "Admin Portal" */}
          <button
            onClick={onOpenFinder}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E2E8F0] bg-white text-[#123C2C] hover:bg-slate-50 transition-colors shadow-xs text-xs font-semibold cursor-pointer"
            title="Launch 30-Second Ergonomic Fit Finder"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#218653]" />
            <span>Chair Finder</span>
          </button>

          {/* Primary Action styled like "Request a Pickup →" */}
          <button
            onClick={onOpenCart}
            className="px-4 py-2 rounded-lg bg-[#218653] hover:bg-[#1b6d43] text-white text-xs font-semibold shadow-sm transition-all duration-150 inline-flex items-center gap-2 cursor-pointer"
            aria-label="View shopping bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag</span>
            <span className="font-mono text-[11px] bg-white/20 text-white rounded-full px-1.5 py-0.2 font-bold min-w-[20px] text-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#18231D] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#E2E8F0] bg-white px-6 py-5 shadow-xl max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#68736C] px-3 block mb-2">
              Programs & Seating Navigation
            </span>
            {NAV_LINKS.map((link) => {
              const isActive = currentSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href, link.id)}
                  className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm transition-colors ${
                    isActive
                      ? 'bg-[#218653]/10 text-[#218653] font-bold'
                      : 'text-[#18231D] hover:bg-slate-50 font-medium'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#218653]" />}
                </a>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenFinder();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#E2E8F0] text-xs font-semibold text-[#123C2C] hover:bg-slate-50"
            >
              <Sparkles className="w-4 h-4 text-[#218653]" />
              <span>Take Ergonomic Fit Assessment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
