import React, { useState } from 'react';
import { Check, Instagram, Facebook } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const PAYMENT_METHODS = [
  'Visa',
  'Mastercard',
  'American Express',
  'Discover',
  'PayPal',
  'Apple Pay',
  'Shop Pay',
];

export function Footer() {
  const { navigate, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    showToast('Welcome to Vespera & Co. — Use code VESPERA15 for 15% off!');
    setEmail('');
  };

  return (
    <footer className="bg-[#3B2820] text-[#FAF8F5] border-t border-[#3B2820]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand Bio & NYC Flagship */}
          <div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="font-serif text-2xl font-semibold tracking-tight text-[#FAF8F5] inline-block"
            >
              Vespera &amp; Co.
            </a>
            <p className="mt-4 text-sm text-[#FAF8F5]/75 leading-relaxed max-w-xs">
              Effortless luxury handbags designed in SoHo, New York. Crafted with artisanal weaves,
              hand-set crystals, and cruelty-free leathers for modern American wardrobes.
            </p>
            <div className="mt-5 text-xs text-[#FAF8F5]/65 space-y-1">
              <p>458 Mercer Street, Suite 3B</p>
              <p>New York, NY 10013, USA</p>
              <p>+1 (212) 555-0194 · concierge@vesperaandco.com</p>
            </div>
            {/* Active Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com/vesperaandco"
                target="_blank"
                rel="noreferrer"
                aria-label="Vespera & Co. on Instagram"
                className="h-9 w-9 border border-[#FAF8F5]/25 flex items-center justify-center text-[#FAF8F5]/80 hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@vesperaandco"
                target="_blank"
                rel="noreferrer"
                aria-label="Vespera & Co. on TikTok"
                className="h-9 px-2.5 border border-[#FAF8F5]/25 flex items-center justify-center text-[11px] font-medium text-[#FAF8F5]/80 hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
              >
                TikTok
              </a>
              <a
                href="https://pinterest.com/vesperaandco"
                target="_blank"
                rel="noreferrer"
                aria-label="Vespera & Co. on Pinterest"
                className="h-9 px-2.5 border border-[#FAF8F5]/25 flex items-center justify-center text-[11px] font-medium text-[#FAF8F5]/80 hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
              >
                Pinterest
              </a>
              <a
                href="https://facebook.com/vesperaandco"
                target="_blank"
                rel="noreferrer"
                aria-label="Vespera & Co. NYC on Facebook"
                className="h-9 w-9 border border-[#FAF8F5]/25 flex items-center justify-center text-[#FAF8F5]/80 hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (All 7 Pages) */}
          <div>
            <h4 className="font-serif text-base font-medium text-[#FAF8F5] mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-[#FAF8F5]/75">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                  }}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/shop"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/shop');
                  }}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Shop All Collections
                </a>
              </li>
              <li>
                <a
                  href="/product/amethyst-woven-everyday-tote"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/product/amethyst-woven-everyday-tote');
                  }}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Signature Bag Detail
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/about');
                  }}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  About Our Brand
                </a>
              </li>
              <li>
                <a
                  href="/lookbook"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/lookbook');
                  }}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Lookbook &amp; Style Guide
                </a>
              </li>
              <li>
                <a
                  href="/reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/reviews');
                  }}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Customer Reviews (4.9 ★)
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/contact');
                  }}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Contact, Shipping &amp; FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="font-serif text-base font-medium text-[#FAF8F5] mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-sm text-[#FAF8F5]/75">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  USPS &amp; UPS Shipping Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  30-Day US Returns &amp; Exchanges
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  Track Your Order (#VC-1042)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/about')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  Cruelty-Free Materials Standard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  Privacy Policy &amp; Terms of Use
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div>
            <h4 className="font-serif text-base font-medium text-[#FAF8F5] mb-4">
              Join the SoHo List
            </h4>
            <p className="text-sm text-[#FAF8F5]/75 leading-relaxed mb-4">
              Enjoy 15% off your first US order plus early access to limited-run New York studio
              editions.
            </p>
            {subscribed ? (
              <div className="border border-[#C5A059]/60 bg-[#FAF8F5]/5 px-4 py-3 text-xs text-[#FAF8F5] flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  Code <strong className="text-[#C5A059]">VESPERA15</strong> unlocked for 15% off
                  at checkout.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5]/10 border border-[#FAF8F5]/25 text-[#FAF8F5] placeholder:text-[#FAF8F5]/50 focus:outline-none focus:border-[#C5A059]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold tracking-wide bg-[#C5A059] text-[#3B2820] hover:bg-[#d4b06a] transition-colors cursor-pointer"
                >
                  Unlock 15% Off
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: USD Payment Badges & Copyright */}
        <div className="mt-12 pt-8 border-t border-[#FAF8F5]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <p className="text-xs text-[#FAF8F5]/60">
            © 2026 Vespera &amp; Co. New York LLC. All prices in USD ($).
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="px-2.5 py-1 text-[11px] font-medium border border-[#FAF8F5]/20 text-[#FAF8F5]/80 bg-[#FAF8F5]/5"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
