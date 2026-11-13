import { useState } from 'react';
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import type { Product } from '../types/store';
import { SmartImage } from './SmartImage';

interface ProductCardProps {
  product: Product;
  showAngleThumbs?: boolean;
}

export function ProductCard({ product, showAngleThumbs = false }: ProductCardProps) {
  const { navigate, addToCart, wishlist, toggleWishlist, setQuickViewProduct } = useStore();
  const [activeThumbIdx, setActiveThumbIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = wishlist.includes(product.id);
  const primaryImage = product.gallery[activeThumbIdx] || product.gallery[0];
  const secondaryImage = product.gallery[2] || product.gallery[1] || product.gallery[0];
  const displayImage =
    isHovered && activeThumbIdx === 0 && secondaryImage ? secondaryImage : primaryImage;

  return (
    <article className="group flex flex-col bg-white border border-[#EAE2DC] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(59,40,32,0.14)]">
      {/* Product Image Surface (65-75% visual anchor) */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE2DC]/40 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/product/${product.slug}`)}
      >
        <SmartImage
          src={displayImage.src}
          alt={`${product.name} — ${displayImage.label}`}
          objectPosition={displayImage.zoomPosition}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Top-right subtle affordances: Wishlist & Quick View */}
        <div
          className="absolute top-3 right-3 flex items-center gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setQuickViewProduct(product)}
            aria-label={`Quick view ${product.name}`}
            className="h-9 w-9 flex items-center justify-center bg-[#FAF8F5]/95 text-[#3B2820] border border-[#EAE2DC] hover:border-[#C5A059] hover:text-[#A6833E] transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            className={`h-9 w-9 flex items-center justify-center border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#3B2820] text-[#FAF8F5] border-[#3B2820]'
                : 'bg-[#FAF8F5]/95 text-[#3B2820] border-[#EAE2DC] hover:border-[#C5A059]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {/* Optional Multi-Angle Thumbnail Strip on Shop Grid */}
      {showAngleThumbs && (
        <div className="flex items-center gap-1.5 px-4 pt-3">
          {product.gallery.slice(0, 4).map((img, idx) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveThumbIdx(idx)}
              aria-label={`View ${img.label} for ${product.name}`}
              className={`h-9 w-11 overflow-hidden border transition-all cursor-pointer ${
                activeThumbIdx === idx
                  ? 'border-[#3B2820] ring-1 ring-[#3B2820]'
                  : 'border-[#EAE2DC] opacity-75 hover:opacity-100'
              }`}
            >
              <SmartImage
                src={img.src}
                alt={img.label}
                objectPosition={img.zoomPosition}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Uniform Card Metadata */}
      <div className="flex flex-1 flex-col justify-between p-4 pt-3.5">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-[#76645C] mb-1">
            <span className="truncate">
              {product.category}
              {product.shortTag ? ` · ${product.shortTag}` : ''}
            </span>
            <span className="inline-flex items-center gap-1 shrink-0 tabular-nums text-[#3B2820]">
              <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
              {product.rating.toFixed(1)} ({product.reviewCount})
            </span>
          </div>

          <h3
            onClick={() => navigate(`/product/${product.slug}`)}
            className="font-serif text-[17px] font-medium leading-snug text-[#3B2820] cursor-pointer hover:text-[#A6833E] transition-colors"
          >
            {product.name}
          </h3>
          <p className="text-xs text-[#76645C] mt-1 line-clamp-1">{product.subtitle}</p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#EAE2DC]/70 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="text-[15px] font-semibold text-[#3B2820]">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#76645C] line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => addToCart(product, product.colors[0].name, 1, true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-[#3B2820] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.7} />
            Quick Add
          </button>
        </div>
      </div>
    </article>
  );
}
