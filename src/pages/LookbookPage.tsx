import { ArrowRight, Instagram, ShoppingBag } from 'lucide-react';
import { LOOKBOOK_ENTRIES, PRODUCTS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SmartImage } from '../components/SmartImage';

export function LookbookPage() {
  const { navigate, addToCart } = useStore();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Header */}
      <div className="pb-8 border-b border-[#EAE2DC] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.16em] uppercase text-[#A6833E] font-medium">
            Seasonal Styling Guide
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#3B2820] mt-1">
            The New York Lookbook
          </h1>
          <p className="text-sm text-[#76645C] mt-2 max-w-xl">
            From Sunday brunch on Mercer Street to candlelit black-tie evenings—explore how our
            signature silhouettes style across every occasion.
          </p>
        </div>

        <a
          href="https://instagram.com/vesperaandco"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#EAE2DC] bg-white text-xs font-semibold text-[#3B2820] hover:border-[#3B2820] transition-colors"
        >
          <Instagram className="w-4 h-4 text-[#C5A059]" />
          @vesperaandco
        </a>
      </div>

      {/* Editorial Lookbook Entries */}
      <div className="mt-10 space-y-14">
        {LOOKBOOK_ENTRIES.map((look, index) => {
          const bag = PRODUCTS.find((p) => p.slug === look.featuredProductSlug) || PRODUCTS[0];
          const isReversed = index % 2 === 1;

          return (
            <section
              key={look.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-[#EAE2DC] p-5 sm:p-8"
            >
              <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#EAE2DC]">
                  <SmartImage
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-5 ${isReversed ? 'lg:order-1' : ''}`}>
                <div>
                  <p className="text-xs text-[#A6833E] font-medium">
                    0{index + 1}. {look.occasion} · {look.location}
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B2820] mt-1">
                    {look.title}
                  </h2>
                  <p className="mt-3 text-sm text-[#3B2820]/85 leading-relaxed">
                    {look.narrative}
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-[#76645C] border-t border-[#EAE2DC] pt-4">
                  {look.stylingNotes.map((note) => (
                    <li key={note} className="flex items-start gap-2">
                      <span className="text-[#C5A059] font-bold">·</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>

                {/* Shop This Bag Module */}
                <div className="p-4 bg-[#FAF8F5] border border-[#EAE2DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div
                      onClick={() => navigate(`/product/${bag.slug}`)}
                      className="w-16 h-14 shrink-0 overflow-hidden bg-white border border-[#EAE2DC] cursor-pointer"
                    >
                      <SmartImage
                        src={bag.gallery[0].src}
                        alt={bag.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[11px] text-[#76645C]">Featured Piece</p>
                      <h3
                        onClick={() => navigate(`/product/${bag.slug}`)}
                        className="font-serif text-base font-medium text-[#3B2820] cursor-pointer hover:text-[#A6833E]"
                      >
                        {bag.name}
                      </h3>
                      <p className="text-xs font-semibold tabular-nums text-[#3B2820]">
                        ${bag.price.toFixed(2)} USD
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => addToCart(bag, bag.colors[0].name, 1, true)}
                      className="px-4 py-2.5 bg-[#3B2820] text-[#FAF8F5] text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Bag
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/product/${bag.slug}`)}
                      className="px-3.5 py-2.5 border border-[#EAE2DC] bg-white text-xs font-medium text-[#3B2820] inline-flex items-center gap-1 hover:border-[#3B2820] cursor-pointer"
                    >
                      Shop This Bag
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
