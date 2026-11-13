import { useMemo, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SmartImage } from './SmartImage';

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, navigate, addToCart } = useStore();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 4);
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.colorFamily.toLowerCase().includes(q) ||
        p.occasion.some((o) => o.toLowerCase().includes(q)) ||
        p.subtitle.toLowerCase().includes(q),
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div
        className="fixed inset-0 bg-[#3B2820]/45 backdrop-blur-[2px]"
        onClick={() => setIsSearchOpen(false)}
      />
      <div
        role="dialog"
        aria-label="Search Vespera & Co. handbags"
        className="relative z-10 w-full max-w-2xl bg-[#FAF8F5] border border-[#EAE2DC] shadow-2xl overflow-hidden"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#EAE2DC] bg-white">
          <Search className="w-5 h-5 text-[#76645C] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by silhouette, color, or occasion (e.g. Tote, Pearl, Evening)..."
            className="flex-1 text-sm bg-transparent text-[#3B2820] placeholder:text-[#76645C] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="p-1.5 text-[#3B2820] hover:bg-[#EAE2DC] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 max-h-[65vh] overflow-y-auto">
          <div className="flex items-center justify-between text-xs text-[#76645C] mb-3">
            <span>
              {query.trim() ? `${results.length} matching handbags` : 'Signature Launch Collection'}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(false);
                navigate('/shop');
              }}
              className="inline-flex items-center gap-1 text-[#3B2820] font-medium hover:text-[#A6833E] cursor-pointer"
            >
              View All 10 Bags
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {results.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-serif text-base text-[#3B2820]">No handbags matched "{query}"</p>
              <p className="text-xs text-[#76645C] mt-1">
                Try searching "Tote", "Clutch", "Satchel", "Camel", or "Ivory".
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {results.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-2.5 bg-white border border-[#EAE2DC] hover:border-[#C5A059] transition-colors"
                >
                  <div
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigate(`/product/${product.slug}`);
                    }}
                    className="w-20 h-16 shrink-0 bg-[#EAE2DC]/40 overflow-hidden cursor-pointer"
                  >
                    <SmartImage
                      src={product.gallery[0].src}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-[#76645C] truncate">{product.category}</p>
                    <h4
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigate(`/product/${product.slug}`);
                      }}
                      className="font-serif text-sm font-medium text-[#3B2820] truncate cursor-pointer hover:text-[#A6833E]"
                    >
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-semibold tabular-nums text-[#3B2820]">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          addToCart(product, product.colors[0].name, 1, true);
                        }}
                        className="text-[11px] font-medium text-[#A6833E] hover:text-[#3B2820] cursor-pointer"
                      >
                        + Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
