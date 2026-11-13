import { useState } from 'react';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Lookbook', path: '/lookbook' },
  { label: 'About', path: '/about' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Contact', path: '/contact' },
];

export function Header() {
  const {
    currentPath,
    navigate,
    cartCount,
    setIsBagOpen,
    setIsSearchOpen,
    setIsAccountOpen,
  } = useStore();
  const [showBanner, setShowBanner] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    if (path === '/shop' && currentPath.startsWith('/product/')) return true;
    return currentPath === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE2DC]">
      {/* Slim US Free Shipping Announcement Bar */}
      {showBanner && (
        <div className="bg-[#3B2820] text-[#FAF8F5] px-4 h-8 flex items-center justify-center relative text-xs tracking-wide">
          <p className="truncate pr-6">
            Complimentary US Shipping on Orders Over $100 | Fast Dispatch from NYC
          </p>
          <button
            type="button"
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#FAF8F5]/75 hover:text-[#FAF8F5] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Row (3-Zone Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Wordmark + Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden p-2 -ml-2 text-[#3B2820] hover:text-[#C5A059] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              setMobileMenuOpen(false);
            }}
            className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#3B2820] whitespace-nowrap shrink-0"
          >
            Vespera &amp; Co.
          </a>
        </div>

        {/* Zone 2: Single-line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#3B2820]/80"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                }}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors hover:text-[#3B2820] ${
                  active ? 'text-[#3B2820] font-semibold' : ''
                }`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#C5A059]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Search, Account & Shopping Bag */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search handbags"
            className="h-10 w-10 flex items-center justify-center text-[#3B2820] hover:text-[#A6833E] transition-colors cursor-pointer"
          >
            <Search className="w-[18px] h-[18px]" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={() => setIsAccountOpen(true)}
            aria-label="Open customer account"
            className="h-10 w-10 flex items-center justify-center text-[#3B2820] hover:text-[#A6833E] transition-colors cursor-pointer"
          >
            <User className="w-[18px] h-[18px]" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={() => setIsBagOpen(true)}
            aria-label="Open shopping bag"
            className="h-10 px-2.5 flex items-center gap-2 text-sm font-medium text-[#3B2820] hover:text-[#A6833E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.6} />
            <span className="tabular-nums text-xs font-semibold bg-[#EAE2DC] text-[#3B2820] px-2 py-0.5 min-w-[24px] text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-[#EAE2DC] bg-[#FAF8F5] px-4 py-4 space-y-1"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
              className={`block px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? 'bg-[#EAE2DC]/70 text-[#3B2820] font-semibold'
                  : 'text-[#3B2820]/80 hover:bg-[#EAE2DC]/40'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/product/amethyst-woven-everyday-tote"
            onClick={(e) => {
              e.preventDefault();
              navigate('/product/amethyst-woven-everyday-tote');
              setMobileMenuOpen(false);
            }}
            className="block px-3 py-2.5 text-sm font-medium text-[#A6833E]"
          >
            Featured Bag: Amethyst Woven Tote
          </a>
        </nav>
      )}
    </header>
  );
}
