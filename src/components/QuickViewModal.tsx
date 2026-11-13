import { useState } from 'react';
import { ArrowRight, ShoppingBag, Star, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SmartImage } from './SmartImage';

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, navigate } = useStore();
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  if (!quickViewProduct) return null;

  const activeImage =
    quickViewProduct.gallery[selectedGalleryIdx] || quickViewProduct.gallery[0];
  const activeColor =
    quickViewProduct.colors[selectedColorIdx] || quickViewProduct.colors[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#3B2820]/50 backdrop-blur-[2px]"
        onClick={() => {
          setQuickViewProduct(null);
          setSelectedGalleryIdx(0);
          setSelectedColorIdx(0);
        }}
      />
      <div
        role="dialog"
        aria-label={`Quick view ${quickViewProduct.name}`}
        className="relative z-10 w-full max-w-3xl bg-[#FAF8F5] border border-[#EAE2DC] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        <button
          type="button"
          onClick={() => {
            setQuickViewProduct(null);
            setSelectedGalleryIdx(0);
            setSelectedColorIdx(0);
          }}
          aria-label="Close quick view"
          className="absolute top-3 right-3 z-20 h-9 w-9 flex items-center justify-center bg-white/90 text-[#3B2820] border border-[#EAE2DC] hover:bg-[#EAE2DC] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Multi-Image Preview */}
        <div className="bg-[#EAE2DC]/40 p-4 flex flex-col gap-3">
          <div className="aspect-[4/3] w-full overflow-hidden bg-white">
            <SmartImage
              src={activeImage.src}
              alt={`${quickViewProduct.name} — ${activeImage.label}`}
              objectPosition={activeImage.zoomPosition}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {quickViewProduct.gallery.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setSelectedGalleryIdx(idx)}
                className={`aspect-square overflow-hidden border cursor-pointer ${
                  selectedGalleryIdx === idx
                    ? 'border-[#3B2820] ring-1 ring-[#3B2820]'
                    : 'border-[#EAE2DC] opacity-75 hover:opacity-100'
                }`}
              >
                <SmartImage
                  src={img.src}
                  alt={img.label}
                  objectPosition={img.zoomPosition}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Quick Purchase Details */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs text-[#76645C]">{quickViewProduct.category}</p>
            <h3 className="font-serif text-2xl font-medium text-[#3B2820] mt-1">
              {quickViewProduct.name}
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-baseline gap-2 tabular-nums">
                <span className="text-lg font-semibold text-[#3B2820]">
                  ${quickViewProduct.price.toFixed(2)}
                </span>
                {quickViewProduct.compareAtPrice && (
                  <span className="text-sm text-[#76645C] line-through">
                    ${quickViewProduct.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <span className="text-xs text-[#76645C]">·</span>
              <span className="inline-flex items-center gap-1 text-xs text-[#3B2820] tabular-nums">
                <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                {quickViewProduct.rating.toFixed(1)} ({quickViewProduct.reviewCount} US Reviews)
              </span>
            </div>

            <p className="text-sm text-[#3B2820]/80 leading-relaxed mt-4">
              {quickViewProduct.description}
            </p>

            {/* Colorway Selection */}
            <div className="mt-5">
              <span className="block text-xs font-medium text-[#3B2820] mb-2">
                Colorway: <span className="text-[#76645C]">{activeColor.name}</span>
              </span>
              <div className="flex items-center gap-2">
                {quickViewProduct.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColorIdx(idx)}
                    aria-label={c.name}
                    className={`h-7 w-7 rounded-full border-2 cursor-pointer ${
                      selectedColorIdx === idx
                        ? 'border-[#3B2820] ring-2 ring-[#C5A059]/60'
                        : 'border-white ring-1 ring-[#EAE2DC]'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2.5">
            <button
              type="button"
              onClick={() => {
                addToCart(quickViewProduct, activeColor.name, 1, true);
                setQuickViewProduct(null);
              }}
              className="w-full py-3 px-4 bg-[#3B2820] text-[#FAF8F5] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag — ${quickViewProduct.price.toFixed(2)}
            </button>
            <button
              type="button"
              onClick={() => {
                const slug = quickViewProduct.slug;
                setQuickViewProduct(null);
                navigate(`/product/${slug}`);
              }}
              className="w-full py-2.5 px-4 border border-[#EAE2DC] bg-white text-[#3B2820] text-xs font-medium flex items-center justify-center gap-1.5 hover:border-[#3B2820] transition-colors cursor-pointer"
            >
              View Full Product Details &amp; 5-Angle Gallery
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
