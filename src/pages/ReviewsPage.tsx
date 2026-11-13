import React, { useMemo, useState } from 'react';
import { CheckCircle2, Star } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SmartImage } from '../components/SmartImage';

export function ReviewsPage() {
  const { reviews, addReview, navigate } = useStore();
  const [selectedSlug, setSelectedSlug] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);

  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [productSlug, setProductSlug] = useState(PRODUCTS[0].slug);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const filteredReviews = useMemo(() => {
    if (selectedSlug === 'all') return reviews;
    return reviews.filter((r) => r.productSlug === selectedSlug);
  }, [reviews, selectedSlug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = PRODUCTS.find((p) => p.slug === productSlug) || PRODUCTS[0];
    addReview({
      productSlug: product.slug,
      productName: product.name,
      author,
      location: location || 'Austin, TX',
      rating,
      title,
      comment,
      photo: product.gallery[0].src,
    });
    setAuthor('');
    setLocation('');
    setTitle('');
    setComment('');
    setShowForm(false);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Aggregate Rating Summary Header */}
      <div className="bg-white border border-[#EAE2DC] p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5">
          <p className="text-xs tracking-[0.16em] uppercase text-[#A6833E] font-medium">
            Verified US Community
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#3B2820] mt-1">
            Customer Reviews
          </h1>
          <div className="mt-4 flex items-center gap-4">
            <span className="font-serif text-5xl font-semibold text-[#3B2820] tabular-nums">
              4.9
            </span>
            <div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                ))}
              </div>
              <p className="text-xs text-[#76645C] mt-1">
                Based on <strong className="text-[#3B2820]">246+ Verified US Buyers</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-2 text-xs">
          {[
            { stars: '5 Stars', pct: 92 },
            { stars: '4 Stars', pct: 6 },
            { stars: '3 Stars', pct: 2 },
          ].map((row) => (
            <div key={row.stars} className="flex items-center gap-3">
              <span className="w-14 text-[#76645C] shrink-0">{row.stars}</span>
              <div className="flex-1 h-2 bg-[#EAE2DC]">
                <div className="h-full bg-[#C5A059]" style={{ width: `${row.pct}%` }} />
              </div>
              <span className="w-9 text-right tabular-nums text-[#3B2820]">{row.pct}%</span>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 flex lg:justify-end">
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="w-full lg:w-auto px-6 py-3 bg-[#3B2820] text-[#FAF8F5] text-xs font-semibold tracking-wide hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors cursor-pointer"
          >
            {showForm ? 'Close Review Form' : 'Write a Review'}
          </button>
        </div>
      </div>

      {/* Write Review Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 bg-white border border-[#EAE2DC] p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-xs font-medium text-[#3B2820] mb-1">Your Name</label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Rachel D."
              className="w-full px-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#EAE2DC]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#3B2820] mb-1">US City &amp; State</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Denver, CO"
              className="w-full px-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#EAE2DC]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#3B2820] mb-1">Handbag Purchased</label>
            <select
              value={productSlug}
              onChange={(e) => setProductSlug(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#EAE2DC]"
            >
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#3B2820] mb-1">Star Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full px-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#EAE2DC]"
            >
              <option value={5}>5 Stars — Love It</option>
              <option value={4}>4 Stars — Great Quality</option>
              <option value={3}>3 Stars — Good</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-[#3B2820] mb-1">Review Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              className="w-full px-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#EAE2DC]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-[#3B2820] mb-1">Your Review</label>
            <textarea
              rows={3}
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share details on craftsmanship, size, and styling..."
              className="w-full px-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#EAE2DC]"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="px-6 py-3 bg-[#C5A059] text-[#3B2820] text-xs font-semibold hover:bg-[#d4b06a] transition-colors cursor-pointer"
            >
              Submit Verified Review
            </button>
          </div>
        </form>
      )}

      {/* Filter by Handbag */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedSlug('all')}
          className={`px-3.5 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
            selectedSlug === 'all'
              ? 'bg-[#3B2820] text-[#FAF8F5] border-[#3B2820]'
              : 'bg-white text-[#3B2820] border-[#EAE2DC] hover:border-[#3B2820]'
          }`}
        >
          All Handbags ({reviews.length})
        </button>
        {PRODUCTS.slice(0, 6).map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedSlug(p.slug)}
            className={`px-3.5 py-1.5 text-xs font-medium border transition-colors cursor-pointer ${
              selectedSlug === p.slug
                ? 'bg-[#3B2820] text-[#FAF8F5] border-[#3B2820]'
                : 'bg-white text-[#3B2820] border-[#EAE2DC] hover:border-[#3B2820]'
            }`}
          >
            {p.name.replace('The ', '')}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((rev) => (
          <article
            key={rev.id}
            className="bg-white border border-[#EAE2DC] p-6 flex flex-col justify-between gap-4"
          >
            <div className="flex gap-4">
              {rev.photo && (
                <div
                  onClick={() => navigate(`/product/${rev.productSlug}`)}
                  className="w-24 h-24 shrink-0 bg-[#EAE2DC]/40 overflow-hidden border border-[#EAE2DC] cursor-pointer"
                >
                  <SmartImage
                    src={rev.photo}
                    alt={`${rev.productName} buyer photo`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#76645C]">{rev.date}</span>
                </div>
                <h3 className="font-serif text-lg font-medium text-[#3B2820] mt-1.5">
                  {rev.title}
                </h3>
                <p className="text-sm text-[#3B2820]/85 mt-1.5 leading-relaxed">{rev.comment}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EAE2DC] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-[#3B2820]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-semibold">{rev.author}</span>
                <span className="text-[#76645C]">— {rev.location}</span>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/product/${rev.productSlug}`)}
                className="text-[#A6833E] font-medium hover:underline cursor-pointer"
              >
                {rev.productName}
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
