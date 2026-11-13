import { ArrowRight } from 'lucide-react';
import { STORE_ASSETS } from '../data/assets';
import { useStore } from '../context/StoreContext';
import { SmartImage } from '../components/SmartImage';

export function AboutPage() {
  const { navigate } = useStore();

  return (
    <main>
      {/* Editorial Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs tracking-[0.18em] uppercase text-[#A6833E] font-medium">
              Founded in SoHo, New York
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#3B2820] leading-[1.12] mt-2">
              Modern American Elegance, Woven by Hand
            </h1>
            <p className="mt-5 text-base text-[#3B2820]/85 leading-relaxed">
              Vespera &amp; Co. began in a sunlit cast-iron loft on Mercer Street with a single
              conviction: everyday luxury handbags should feel sculptural, tactile, and deeply
              wearable—without compromising ethical material standards.
            </p>
            <p className="mt-4 text-sm text-[#76645C] leading-relaxed">
              Each silhouette is sketched in New York and developed alongside small-batch weaving
              and beadwork ateliers. From multi-tonal bouclé totes engineered to carry a 13-inch
              laptop to hand-set crystal box clutches, every piece balances architectural structure
              with warm, feminine ease.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="px-6 py-3 bg-[#3B2820] text-[#FAF8F5] text-xs font-semibold tracking-wide hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                Explore the Collection
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/lookbook')}
                className="px-6 py-3 border border-[#3B2820] text-xs font-semibold text-[#3B2820] hover:bg-[#EAE2DC]/60 transition-colors cursor-pointer"
              >
                View Style Guide
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] w-full overflow-hidden border border-[#EAE2DC] bg-[#EAE2DC]">
              <SmartImage
                src={STORE_ASSETS.heroEditorial}
                alt="Vespera & Co. SoHo New York Loft Studio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars of Craftsmanship */}
      <section className="bg-[#EAE2DC]/45 border-y border-[#EAE2DC] py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs tracking-[0.16em] uppercase text-[#A6833E] font-medium">
              Atelier Standards
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B2820] mt-1">
              Crafted for Years of Daily Carry
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-[#EAE2DC] overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <SmartImage
                  src={STORE_ASSETS.detailGoldHardware}
                  alt="18k champagne gold filigree clasp and hand-stitching"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-medium text-[#3B2820]">
                  01. Artisanal Weaving &amp; Hardware
                </h3>
                <p className="mt-2.5 text-sm text-[#76645C] leading-relaxed">
                  Our signature woven bodies use multi-ply cotton and bouclé yarns paired with
                  custom-cast 18k champagne-gold tone filigree clasps and solid brass feet.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#EAE2DC] overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <SmartImage
                  src={STORE_ASSETS.detailWovenInterior}
                  alt="Structured suede-touch interior pockets and zipper compartment"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-medium text-[#3B2820]">
                  02. Cruelty-Free Vegan Grain
                </h3>
                <p className="mt-2.5 text-sm text-[#76645C] leading-relaxed">
                  Every strap, rolled handle, and piped edge is cut from supple, animal-free
                  pebbled and nappa vegan leathers finished with hand-painted edge Sealant.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#EAE2DC] overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <SmartImage
                  src={STORE_ASSETS.lifestyleSohoBrunch}
                  alt="Woman carrying Vespera & Co. handbag in SoHo New York"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-medium text-[#3B2820]">
                  03. Thoughtful NYC Utility
                </h3>
                <p className="mt-2.5 text-sm text-[#76645C] leading-relaxed">
                  Designed by women who walk twenty blocks before lunch: reinforced flat bases,
                  padded laptop sleeves, and convertible straps built for real life across the US.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
