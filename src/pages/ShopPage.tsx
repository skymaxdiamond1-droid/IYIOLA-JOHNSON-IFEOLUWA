import { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import type { BagCategory, BagOccasion } from '../types/store';
import { ProductCard } from '../components/ProductCard';

const CATEGORY_OPTIONS: Array<BagCategory | 'All'> = [
  'All',
  'Totes',
  'Evening Clutches',
  'Structured Satchels',
  'Crossbodies',
  'Bucket & Hobo',
];

const OCCASION_OPTIONS: Array<BagOccasion | 'All'> = [
  'All',
  'Work',
  'Evening',
  'Weekend',
  'Resort',
];

const COLOR_FAMILIES = [
  'All',
  'Amethyst & Rose',
  'Obsidian Noir',
  'Terracotta & Chestnut',
  'Ivory & Noir',
  'Warm Ivory',
  'Espresso Brown',
  'Champagne Gold',
  'Camel & Tan',
  'Cognac & Chestnut',
  'Sage & Olive',
];

export function ShopPage() {
  const { shopPreset, clearShopPreset } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<BagCategory | 'All'>(
    shopPreset.category || 'All',
  );
  const [selectedOccasion, setSelectedOccasion] = useState<BagOccasion | 'All'>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'bestselling'>(
    'featured',
  );
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  useEffect(() => {
    if (shopPreset.category) {
      setSelectedCategory(shopPreset.category);
      clearShopPreset();
    }
  }, [shopPreset, clearShopPreset]);

  const filteredProducts = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedOccasion !== 'All' && !p.occasion.includes(selectedOccasion)) return false;
      if (selectedColor !== 'All' && p.colorFamily !== selectedColor) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    if (sortBy === 'price-asc') return [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'bestselling')
      return [...list].sort((a, b) => a.bestSellerRank - b.bestSellerRank);
    return list;
  }, [selectedCategory, selectedOccasion, selectedColor, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedOccasion('All');
    setSelectedColor('All');
    setMaxPrice(200);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedOccasion !== 'All' ||
    selectedColor !== 'All' ||
    maxPrice < 200;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Page Header */}
      <div className="pb-8 border-b border-[#EAE2DC] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.16em] uppercase text-[#A6833E] font-medium">
            Vespera &amp; Co. Collection
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#3B2820] mt-1">
            All Luxury Handbags
          </h1>
          <p className="text-sm text-[#76645C] mt-2 max-w-xl">
            Every silhouette is priced in USD ($) and ships within 24 hours from our SoHo, New York
            fulfillment studio. Complimentary US shipping on orders over $100.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowFiltersMobile((v) => !v)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 border border-[#EAE2DC] bg-white text-xs font-medium text-[#3B2820] cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
          </button>

          <div className="flex items-center gap-2">
            <label htmlFor="shop-sort" className="text-xs text-[#76645C] whitespace-nowrap">
              Sort By:
            </label>
            <select
              id="shop-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 text-xs font-medium bg-white border border-[#EAE2DC] text-[#3B2820] focus:outline-none focus:border-[#3B2820]"
            >
              <option value="featured">Featured</option>
              <option value="bestselling">Best Selling</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar Filters + 3-Col Product Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filter Sidebar */}
        <aside
          className={`lg:col-span-3 space-y-6 ${
            showFiltersMobile ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="bg-white border border-[#EAE2DC] p-5 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-medium text-[#3B2820]">Refine Selection</h2>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs text-[#A6833E] hover:text-[#3B2820] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#76645C] mb-2.5">
                Category
              </h3>
              <div className="space-y-1">
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-2.5 py-1.5 text-sm transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#3B2820] text-[#FAF8F5] font-medium'
                        : 'text-[#3B2820]/80 hover:bg-[#EAE2DC]/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div className="pt-4 border-t border-[#EAE2DC]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#76645C] mb-2.5">
                Occasion
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {OCCASION_OPTIONS.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setSelectedOccasion(occ)}
                    className={`px-3 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
                      selectedOccasion === occ
                        ? 'bg-[#C5A059] text-[#3B2820] border-[#C5A059]'
                        : 'bg-[#FAF8F5] text-[#3B2820]/80 border-[#EAE2DC] hover:border-[#3B2820]'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter ($90 - $200) */}
            <div className="pt-4 border-t border-[#EAE2DC]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#76645C]">
                  Max Price (USD)
                </h3>
                <span className="text-xs font-semibold tabular-nums text-[#3B2820]">
                  $90 – ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min={95}
                max={200}
                step={5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer"
              />
            </div>

            {/* Color Family Filter */}
            <div className="pt-4 border-t border-[#EAE2DC]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#76645C] mb-2.5">
                Color Family
              </h3>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#EAE2DC] text-[#3B2820] focus:outline-none focus:border-[#3B2820]"
              >
                {COLOR_FAMILIES.map((cf) => (
                  <option key={cf} value={cf}>
                    {cf}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-9">
          <div className="flex items-center justify-between text-xs text-[#76645C] mb-4">
            <span>
              Showing <strong className="text-[#3B2820] tabular-nums">{filteredProducts.length}</strong>{' '}
              handbag{filteredProducts.length === 1 ? '' : 's'}
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-[#EAE2DC] p-12 text-center">
              <p className="font-serif text-xl text-[#3B2820]">
                No handbags match your current filters
              </p>
              <p className="text-sm text-[#76645C] mt-1.5">
                Adjust your price range or clear filters to view our full 10-piece collection.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 px-6 py-2.5 bg-[#3B2820] text-[#FAF8F5] text-xs font-semibold hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} showAngleThumbs />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
