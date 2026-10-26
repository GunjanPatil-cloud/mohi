import React, { useState, useMemo } from 'react';
import { Chair } from '../types';
import { ChairCard } from './ChairCard';
import { SlidersHorizontal } from 'lucide-react';

interface ChairCatalogProps {
  chairs: Chair[];
  onQuickView: (chair: Chair) => void;
  onAddToCart: (chair: Chair, color: string) => void;
}

export const ChairCatalog: React.FC<ChairCatalogProps> = ({
  chairs,
  onQuickView,
  onAddToCart,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'task' | 'active' | 'executive'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredChairs = useMemo(() => {
    let result = [...chairs];

    if (activeFilter !== 'all') {
      result = result.filter((chair) => chair.category === activeFilter);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [chairs, activeFilter, sortBy]);

  return (
    <section id="chairs" className="py-16 lg:py-24 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-zinc-200">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
            Curated Collection
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 font-display">
            Engineered for all-day focus.
          </h2>
          <p className="text-sm text-zinc-600 mt-2 max-w-xl">
            Each chair is built around a distinct human biomechanic profile. Choose the balance of active movement, lumbar contouring, or executive comfort that fits your workstyle.
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-lg border border-zinc-200">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              All Chairs
            </button>
            <button
              onClick={() => setActiveFilter('task')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === 'task'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Task Mesh
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === 'active'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Active Flex
            </button>
            <button
              onClick={() => setActiveFilter('executive')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                activeFilter === 'executive'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Executive Leather
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-white border border-zinc-200 text-xs font-medium text-zinc-700 py-2 pl-3 pr-8 rounded-lg cursor-pointer hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              aria-label="Sort products by"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredChairs.map((chair) => (
          <ChairCard
            key={chair.id}
            chair={chair}
            onQuickView={onQuickView}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};
