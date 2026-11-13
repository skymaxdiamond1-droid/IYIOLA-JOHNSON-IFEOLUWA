import React, { useEffect, useState } from 'react';
import {
  Check,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  ZoomIn,
} from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { SmartImage } from '../components/SmartImage';

interface ProductDetailPageProps {
  slug: string;
}

export function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const { navigate, addToCart, wishlist, toggleWishlist, reviews, addReview } = useStore();
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<'dimensions' | 'care' | 'shipping' | null>(
    'dimensions',
  );

  // Write a Review state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [revName, setRevName] = useState('');
  const [revCity, setRevCity] = useState('');
  const [revTitle, setRevTitle] = useState('');
  const [revComment, setRevComment] = useState('');
  const [revRating, setRevRating] = useState(5);

  useEffect(() => {
    setSelectedImageIdx(0);
    setSelectedColorIdx(0);
    setQuantity(1);
    setIsZoomed(false);
  }, [slug]);

  const activeImage = product.gallery[selectedImageIdx] || product.gallery[0];
  const activeColor = product.colors[selectedColorIdx] || product.colors[0];
  const isSaved = wishlist.includes(product.id);

  const productReviews = reviews.filter((r) => r.productSlug === product.slug);
  const relatedBags = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) return;
    addReview({
      productSlug: product.slug,
      productName: product.name,
      author: revName,
      location: revCity || 'New York, NY',
      rating: revRating,
      title: revTitle || 'Love this bag',
      comment: revComment,
      photo: product.gallery[0].src,
    });
    setRevName('');
    setRevCity('');
    setRevTitle('');
    setRevComment('');
    setShowReviewForm(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#76645C] flex items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="hover:text-[#3B2820] cursor-pointer"
        >
          Home
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={() => navigate('/shop', { category: product.category })}
          className="hover:text-[#3B2820] cursor-pointer"
        >
          {product.category}
        </button>
        <span>/</span>
        <span className="text-[#3B2820] font-medium truncate">{product.name}</span>
      </nav>

      {/* Main 2-Column Contiguous PDP Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left: 5+ Image Multi-Angle Gallery with Zoom */}
        <div className="lg:col-span-7 lg:sticky lg:top-28 flex flex-col-reverse sm:flex-row gap-4">
          {/* Vertical Thumbnail Strip */}
          <div className="grid grid-cols-5 sm:flex sm:flex-col gap-2.5 sm:w-20 shrink-0">
            {product.gallery.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                onClick={() => {
                  setSelectedImageIdx(idx);
                  setIsZoomed(false);
                }}
                aria-label={`View ${img.label}`}
                className={`aspect-square overflow-hidden border transition-all cursor-pointer ${
                  selectedImageIdx === idx
                    ? 'border-[#3B2820] ring-1 ring-[#3B2820]'
                    : 'border-[#EAE2DC] opacity-70 hover:opacity-100'
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

          {/* Primary Zoomable Canvas */}
          <div className="flex-1">
            <div
              onClick={() => setIsZoomed((z) => !z)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsZoomed(false)}
              className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE2DC]/40 border border-[#EAE2DC] cursor-zoom-in"
            >
              <img
                src={activeImage.src}
                alt={`${product.name} — ${activeImage.label}`}
                referrerPolicy="no-referrer"
                style={{
                  objectPosition: activeImage.zoomPosition || 'center',
                  transformOrigin: zoomOrigin,
                  transform: isZoomed ? 'scale(1.85)' : 'scale(1)',
                }}
                className="w-full h-full object-cover transition-transform duration-200"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed((z) => !z);
                }}
                aria-label="Toggle image zoom"
                className="absolute bottom-3 right-3 px-3 py-1.5 bg-[#FAF8F5]/95 border border-[#EAE2DC] text-[11px] font-medium text-[#3B2820] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                {isZoomed ? 'Reset Zoom' : 'Click to Zoom'}
              </button>
            </div>
            <div className="mt-2.5 flex items-center justify-between text-xs text-[#76645C]">
              <span>
                <strong className="text-[#3B2820]">{activeImage.label}:</strong>{' '}
                {activeImage.caption}
              </span>
              <span className="tabular-nums shrink-0 ml-2">
                {selectedImageIdx + 1} / {product.gallery.length}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 bg-white border border-[#EAE2DC] p-6 sm:p-8">
          <p className="text-xs tracking-[0.14em] uppercase text-[#A6833E] font-medium">
            {product.category} · {product.occasion.join(' / ')}
          </p>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B2820] mt-1.5">
            {product.name}
          </h1>

          {/* Price & Rating */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EAE2DC]">
            <div className="flex items-baseline gap-2.5 tabular-nums">
              <span className="text-2xl font-semibold text-[#3B2820]">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-[#76645C] line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs text-[#76645C]">USD</span>
            </div>

            <a
              href="#pdp-reviews"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#3B2820] hover:text-[#A6833E]"
            >
              <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
              <span className="tabular-nums">
                {product.rating.toFixed(1)} ({product.reviewCount} US Reviews)
              </span>
            </a>
          </div>

          {/* Stock Status */}
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#3B2820]">
            <Check className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>{product.stockNote}</span>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-[#3B2820]/85 leading-relaxed">{product.description}</p>

          {/* Colorway Selector */}
          <div className="mt-6">
            <span className="block text-xs font-medium text-[#3B2820] mb-2">
              Color / Finish: <strong className="font-semibold">{activeColor.name}</strong>
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              {product.colors.map((color, idx) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColorIdx(idx)}
                  aria-label={color.name}
                  className={`flex items-center gap-2 px-3 py-1.5 border text-xs transition-colors cursor-pointer ${
                    selectedColorIdx === idx
                      ? 'border-[#3B2820] bg-[#FAF8F5] font-semibold text-[#3B2820]'
                      : 'border-[#EAE2DC] text-[#76645C] hover:border-[#3B2820]'
                  }`}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-[#3B2820]/20"
                    style={{ backgroundColor: color.hex }}
                  />
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Picker + Add to Bag */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center border border-[#EAE2DC] bg-[#FAF8F5] h-12">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-11 h-full flex items-center justify-center text-[#3B2820] hover:bg-[#EAE2DC] cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-11 h-full flex items-center justify-center text-[#3B2820] hover:bg-[#EAE2DC] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart(product, activeColor.name, quantity, true)}
                className="flex-1 h-12 px-5 bg-[#3B2820] text-[#FAF8F5] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag — ${(product.price * quantity).toFixed(2)}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Save to wishlist"
                className={`h-12 w-12 flex items-center justify-center border transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-[#3B2820] text-[#FAF8F5] border-[#3B2820]'
                    : 'border-[#EAE2DC] text-[#3B2820] hover:border-[#3B2820]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => addToCart(product, activeColor.name, quantity, true)}
              className="w-full h-11 bg-[#C5A059] text-[#3B2820] text-xs font-semibold tracking-wide hover:bg-[#d4b06a] transition-colors cursor-pointer"
            >
              Buy Now with Apple Pay / Shop Pay
            </button>
          </div>

          {/* US Trust Highlights */}
          <div className="mt-5 grid grid-cols-2 gap-3 py-3.5 border-y border-[#EAE2DC] text-xs text-[#76645C]">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>Free US Shipping $100+</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>30-Day US Returns</span>
            </div>
          </div>

          {/* Expandable Accordions */}
          <div className="divide-y divide-[#EAE2DC]">
            {[
              {
                id: 'dimensions',
                title: 'Dimensions & Materials',
                body: (
                  <div className="space-y-2 text-xs text-[#76645C] leading-relaxed">
                    <p>
                      <strong className="text-[#3B2820]">Dimensions:</strong> {product.dimensions}
                    </p>
                    <p>
                      <strong className="text-[#3B2820]">Materials:</strong> {product.materials}
                    </p>
                  </div>
                ),
              },
              {
                id: 'care',
                title: 'Care Instructions',
                body: (
                  <p className="text-xs text-[#76645C] leading-relaxed">
                    {product.careInstructions}
                  </p>
                ),
              },
              {
                id: 'shipping',
                title: 'US Shipping & Returns',
                body: (
                  <p className="text-xs text-[#76645C] leading-relaxed">
                    Orders placed before 2:00 PM EST ship the same business day from SoHo, New York
                    via USPS Priority Mail or UPS Ground (2–5 business days across the continental
                    US). Enjoy complimentary US shipping on all orders over $100 and hassle-free
                    30-day returns.
                  </p>
                ),
              },
            ].map((acc) => {
              const isOpen = openAccordion === acc.id;
              return (
                <div key={acc.id} className="py-3.5">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenAccordion(isOpen ? null : (acc.id as typeof openAccordion))
                    }
                    className="w-full flex items-center justify-between text-left text-sm font-medium text-[#3B2820] cursor-pointer"
                  >
                    {acc.title}
                    <ChevronDown
                      className={`w-4 h-4 text-[#76645C] transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && <div className="mt-2.5">{acc.body}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Verified Product Reviews */}
      <section id="pdp-reviews" className="mt-16 pt-12 border-t border-[#EAE2DC]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-[#A6833E] font-medium">
              Verified US Buyers
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B2820] mt-1">
              Reviews for {product.name}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowReviewForm((v) => !v)}
            className="px-5 py-2.5 border border-[#3B2820] text-xs font-semibold text-[#3B2820] hover:bg-[#3B2820] hover:text-[#FAF8F5] transition-colors cursor-pointer"
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Review'}
          </button>
        </div>

        {showReviewForm && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-8 bg-white border border-[#EAE2DC] p-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-xs font-medium text-[#3B2820] mb-1">Your Name</label>
              <input
                type="text"
                required
                value={revName}
                onChange={(e) => setRevName(e.target.value)}
                placeholder="e.g. Madison P."
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#EAE2DC]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#3B2820] mb-1">US City &amp; State</label>
              <input
                type="text"
                value={revCity}
                onChange={(e) => setRevCity(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#EAE2DC]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#3B2820] mb-1">Rating</label>
              <select
                value={revRating}
                onChange={(e) => setRevRating(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#EAE2DC]"
              >
                <option value={5}>5 Stars — Exceptional</option>
                <option value={4}>4 Stars — Very Good</option>
                <option value={3}>3 Stars — Good</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#3B2820] mb-1">Review Title</label>
              <input
                type="text"
                value={revTitle}
                onChange={(e) => setRevTitle(e.target.value)}
                placeholder="Headline of your review"
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#EAE2DC]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[#3B2820] mb-1">Review</label>
              <textarea
                rows={3}
                required
                value={revComment}
                onChange={(e) => setRevComment(e.target.value)}
                placeholder="How does the bag feel, fit, and style?"
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#EAE2DC]"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#3B2820] text-[#FAF8F5] text-xs font-semibold hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors cursor-pointer"
              >
                Publish Verified Review
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(productReviews.length > 0 ? productReviews : reviews.slice(0, 2)).map((rev) => (
            <div key={rev.id} className="bg-white border border-[#EAE2DC] p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                  ))}
                </div>
                <span className="text-xs text-[#76645C]">{rev.date}</span>
              </div>
              <h3 className="font-serif text-lg font-medium text-[#3B2820]">{rev.title}</h3>
              <p className="text-sm text-[#3B2820]/80 mt-2 leading-relaxed">{rev.comment}</p>
              <p className="text-xs text-[#76645C] mt-4">
                <strong className="text-[#3B2820]">{rev.author}</strong> — {rev.location} · Verified
                US Purchase
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* You May Also Like */}
      <section className="mt-16 pt-12 border-t border-[#EAE2DC]">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B2820]">
            You May Also Like
          </h2>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="text-xs font-semibold text-[#3B2820] underline hover:text-[#A6833E] cursor-pointer"
          >
            View All Handbags
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedBags.map((bag) => (
            <ProductCard key={bag.id} product={bag} />
          ))}
        </div>
      </section>
    </main>
  );
}
