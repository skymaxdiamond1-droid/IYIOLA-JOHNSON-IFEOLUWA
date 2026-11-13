import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Instagram,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  X,
} from 'lucide-react';
import { STORE_ASSETS } from '../data/assets';
import { INSTAGRAM_GALLERY, PRODUCTS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import type { BagCategory } from '../types/store';
import { ProductCard } from '../components/ProductCard';
import { SmartImage } from '../components/SmartImage';

const CATEGORIES: Array<{
  title: BagCategory;
  subtitle: string;
  image: string;
}> = [
  {
    title: 'Totes',
    subtitle: '13" laptop-ready everyday structure',
    image: STORE_ASSETS.bagAmethystTote,
  },
  {
    title: 'Evening Clutches',
    subtitle: 'Hand-beaded crystal & satin frames',
    image: STORE_ASSETS.bagMidnightClutch,
  },
  {
    title: 'Structured Satchels',
    subtitle: 'Architectural handles & turn-locks',
    image: STORE_ASSETS.bagSedonaSatchel,
  },
  {
    title: 'Crossbodies',
    subtitle: 'Effortless day-to-night hands-free carry',
    image: STORE_ASSETS.bagJolieCrossbody,
  },
];

export function HomePage() {
  const { navigate, reviews, addToCart, showToast } = useStore();
  const [reviewIdx, setReviewIdx] = useState(0);
  const [selectedLook, setSelectedLook] = useState<(typeof INSTAGRAM_GALLERY)[number] | null>(
    null,
  );
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);

  const signatureBags = PRODUCTS.filter((p) => p.isSignature);
  const expandedBags = PRODUCTS.filter((p) => !p.isSignature);

  const visibleReviews = [
    reviews[reviewIdx % reviews.length],
    reviews[(reviewIdx + 1) % reviews.length],
    reviews[(reviewIdx + 2) % reviews.length],
  ];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterDone(true);
    setNewsletterEmail('');
    showToast('Welcome to Vespera & Co.! Code VESPERA15 is ready for 15% off.');
  };

  return (
    <main>
      {/* 1. Full-Width Editorial Hero Banner */}
      <section className="relative w-full min-h-[540px] lg:min-h-[640px] flex items-end overflow-hidden bg-[#3B2820]">
        <SmartImage
          src={STORE_ASSETS.heroEditorial}
          alt="Vespera & Co. SoHo New York Launch Collection on travertine plinth"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#241610]/85 via-[#241610]/35 to-transparent"
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-2xl text-[#FAF8F5]">
            <p className="text-xs tracking-[0.2em] uppercase text-[#C5A059] font-medium mb-3">
              SoHo, New York · Autumn / Winter Atelier
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-medium leading-[1.08] tracking-tight text-[#FAF8F5]">
              Sculpted Silhouettes for Effortless American Luxury
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#FAF8F5]/85 leading-relaxed max-w-xl">
              Discover hand-loomed textiles, faceted crystal evening clutches, and architectural
              everyday totes designed in our Mercer Street studio.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="px-7 py-3.5 bg-[#C5A059] text-[#3B2820] text-sm font-semibold tracking-wide hover:bg-[#d5b36d] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                Shop the New Season
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/lookbook')}
                className="px-6 py-3.5 border border-[#FAF8F5]/50 text-[#FAF8F5] text-sm font-medium hover:bg-[#FAF8F5]/10 transition-colors cursor-pointer"
              >
                Explore the Lookbook
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop by Category Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-[#A6833E] font-medium">
              Curated Silhouettes
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B2820] mt-1">
              Shop by Category
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3B2820] hover:text-[#A6833E] transition-colors cursor-pointer"
          >
            Browse All 10 Handbags
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.title}
              type="button"
              onClick={() => navigate('/shop', { category: cat.title })}
              className="group text-left bg-white border border-[#EAE2DC] overflow-hidden hover:border-[#C5A059] transition-colors cursor-pointer"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#EAE2DC]/40">
                <SmartImage
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-4 flex items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#3B2820] group-hover:text-[#A6833E] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#76645C] mt-0.5">{cat.subtitle}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#76645C] group-hover:text-[#3B2820] shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Signature Collection (4 Launch Anchor Bags) */}
      <section className="bg-[#EAE2DC]/45 border-y border-[#EAE2DC] py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9">
            <div>
              <p className="text-xs tracking-[0.16em] uppercase text-[#A6833E] font-medium">
                Launch Icons
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B2820] mt-1">
                The Signature Collection
              </h2>
            </div>
            <p className="text-sm text-[#76645C] max-w-md">
              Hover any silhouette to preview interior craftsmanship, or select Quick View to
              inspect all 5 studio angles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureBags.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Brand Value Props Bar */}
      <section className="border-b border-[#EAE2DC] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Sparkles, title: 'Designed in NYC', desc: '458 Mercer St. SoHo Studio' },
            { icon: ShieldCheck, title: 'Cruelty-Free Luxury', desc: 'Artisanal weaves & vegan grain' },
            { icon: ArrowLeft, title: '30-Day US Returns', desc: 'Complimentary prepaid labels' },
            { icon: Truck, title: 'Free Shipping $100+', desc: 'Fast US dispatch within 24h' },
          ].map((prop) => (
            <div key={prop.title} className="flex items-center gap-3.5">
              <div className="h-10 w-10 bg-[#FAF8F5] border border-[#EAE2DC] flex items-center justify-center text-[#C5A059] shrink-0">
                <prop.icon className="w-4 h-4" strokeWidth={1.7} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#3B2820]">{prop.title}</p>
                <p className="text-xs text-[#76645C]">{prop.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Expanded Bag Collection Grid (6 More Handbags) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9">
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-[#A6833E] font-medium">
              Complete Atelier Catalog
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B2820] mt-1">
              More From the New York Collection
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/shop')}
            className="px-5 py-2.5 border border-[#3B2820] text-xs font-semibold text-[#3B2820] hover:bg-[#3B2820] hover:text-[#FAF8F5] transition-colors cursor-pointer"
          >
            Filter All Handbags
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {expandedBags.map((product) => (
            <ProductCard key={product.id} product={product} showAngleThumbs />
          ))}
        </div>
      </section>

      {/* 6. Featured Customer Reviews Carousel */}
      <section className="bg-[#EAE2DC]/45 border-y border-[#EAE2DC] py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs tracking-[0.16em] uppercase text-[#A6833E] font-medium">
                4.9 / 5.0 Stars · 246+ Verified US Buyers
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B2820] mt-1">
                Loved Across America
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setReviewIdx((i) => (i - 1 + reviews.length) % reviews.length)}
                aria-label="Previous customer review"
                className="h-10 w-10 border border-[#EAE2DC] bg-white flex items-center justify-center text-[#3B2820] hover:border-[#3B2820] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setReviewIdx((i) => (i + 1) % reviews.length)}
                aria-label="Next customer review"
                className="h-10 w-10 border border-[#EAE2DC] bg-white flex items-center justify-center text-[#3B2820] hover:border-[#3B2820] cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/reviews')}
                className="ml-2 text-xs font-semibold text-[#3B2820] underline hover:text-[#A6833E] cursor-pointer"
              >
                Read All Reviews
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-[#EAE2DC] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]"
                      />
                    ))}
                  </div>
                  <h3 className="font-serif text-lg font-medium text-[#3B2820]">
                    “{rev.title}”
                  </h3>
                  <p className="mt-2.5 text-sm text-[#3B2820]/80 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#EAE2DC] flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-[#3B2820]">{rev.author}</p>
                    <p className="text-[#76645C]">
                      {rev.location} · Verified US Buyer
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(`/product/${rev.productSlug}`)}
                    className="text-[#A6833E] font-medium hover:underline text-right max-w-[130px] truncate cursor-pointer"
                  >
                    {rev.productName}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Styled by You (@vesperaandco) + Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-[#A6833E] font-medium">
              Community Lookbook
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B2820] mt-1">
              Styled by You · @vesperaandco
            </h2>
          </div>
          <a
            href="https://instagram.com/vesperaandco"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#3B2820] hover:text-[#A6833E]"
          >
            <Instagram className="w-4 h-4" />
            Follow @vesperaandco
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {INSTAGRAM_GALLERY.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => setSelectedLook(post)}
              className="group relative aspect-[3/4] overflow-hidden bg-[#EAE2DC] text-left cursor-pointer"
            >
              <SmartImage
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-[#241610]/85 via-[#241610]/40 to-transparent text-[#FAF8F5]">
                <p className="text-xs font-medium">{post.handle}</p>
                <p className="text-[11px] text-[#C5A059] mt-0.5">Shop This Look</p>
              </div>
            </button>
          ))}
        </div>

        {/* 15% Off First Order Banner */}
        <div className="mt-14 bg-[#EAE2DC]/60 border border-[#EAE2DC] p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.16em] uppercase text-[#A6833E] font-medium">
              First Order Invitation
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B2820] mt-1">
              Receive 15% Off Your First Vespera &amp; Co. Bag
            </h3>
            <p className="text-sm text-[#76645C] mt-2 max-w-xl">
              Join our SoHo atelier dispatch for private collection previews, seasonal restock
              alerts, and complimentary US gift packaging invitations.
            </p>
          </div>
          <div className="lg:col-span-5">
            {newsletterDone ? (
              <div className="bg-white border border-[#C5A059] p-4 flex items-center gap-3">
                <Check className="w-5 h-5 text-[#C5A059] shrink-0" />
                <p className="text-sm text-[#3B2820]">
                  Thank you! Enter <strong>VESPERA15</strong> in your shopping bag for 15% off.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 text-sm bg-white border border-[#EAE2DC] focus:outline-none focus:border-[#3B2820]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#3B2820] text-[#FAF8F5] text-xs font-semibold tracking-wide hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Claim 15% Off
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Shop-The-Look Instagram Modal */}
      {selectedLook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#3B2820]/50 backdrop-blur-[2px]"
            onClick={() => setSelectedLook(null)}
          />
          <div className="relative z-10 w-full max-w-2xl bg-[#FAF8F5] border border-[#EAE2DC] shadow-2xl grid grid-cols-1 sm:grid-cols-2 overflow-hidden">
            <button
              type="button"
              onClick={() => setSelectedLook(null)}
              aria-label="Close look popup"
              className="absolute top-3 right-3 z-20 h-9 w-9 bg-white/90 border border-[#EAE2DC] flex items-center justify-center text-[#3B2820] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="aspect-[3/4] bg-[#EAE2DC]">
              <SmartImage
                src={selectedLook.image}
                alt={selectedLook.caption}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-[#A6833E]">{selectedLook.handle}</p>
                <p className="text-sm text-[#3B2820] mt-2 leading-relaxed">
                  {selectedLook.caption}
                </p>
                {(() => {
                  const bag = PRODUCTS.find((p) => p.slug === selectedLook.productSlug);
                  if (!bag) return null;
                  return (
                    <div className="mt-6 p-3.5 bg-white border border-[#EAE2DC]">
                      <p className="text-[11px] text-[#76645C]">Featured Handbag</p>
                      <h4 className="font-serif text-base font-medium text-[#3B2820] mt-0.5">
                        {bag.name}
                      </h4>
                      <p className="text-sm font-semibold tabular-nums text-[#3B2820] mt-1">
                        ${bag.price.toFixed(2)} USD
                      </p>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLook(null);
                            addToCart(bag, bag.colors[0].name, 1, true);
                          }}
                          className="flex-1 py-2 px-3 bg-[#3B2820] text-[#FAF8F5] text-xs font-medium hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors cursor-pointer"
                        >
                          Add to Bag
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLook(null);
                            navigate(`/product/${bag.slug}`);
                          }}
                          className="py-2 px-3 border border-[#EAE2DC] text-xs font-medium text-[#3B2820] hover:border-[#3B2820] cursor-pointer"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
              <p className="text-[11px] text-[#76645C] mt-4">
                Tag @vesperaandco in your NYC or US styling photos to be featured.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
