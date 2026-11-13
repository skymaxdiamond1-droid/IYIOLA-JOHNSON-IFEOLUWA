import React, { useState } from 'react';
import { Heart, Package, User, X } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { useStore } from '../context/StoreContext';
import { SmartImage } from './SmartImage';

export function AccountModal() {
  const {
    isAccountOpen,
    setIsAccountOpen,
    customerProfile,
    toggleSignIn,
    wishlist,
    toggleWishlist,
    orders,
    navigate,
    addToCart,
  } = useStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'wishlist' | 'orders'>('profile');
  const [nameInput, setNameInput] = useState(customerProfile.name);
  const [emailInput, setEmailInput] = useState(customerProfile.email);

  if (!isAccountOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    toggleSignIn(nameInput, emailInput);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#3B2820]/45 backdrop-blur-[2px]"
        onClick={() => setIsAccountOpen(false)}
      />
      <div
        role="dialog"
        aria-label="Customer Account"
        className="relative z-10 w-full max-w-xl bg-[#FAF8F5] border border-[#EAE2DC] shadow-2xl overflow-hidden"
      >
        <div className="px-6 py-4 bg-white border-b border-[#EAE2DC] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-[#C5A059]" />
            <h2 className="font-serif text-xl font-medium text-[#3B2820]">Vespera &amp; Co. Account</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsAccountOpen(false)}
            aria-label="Close account modal"
            className="p-1.5 text-[#3B2820] hover:bg-[#EAE2DC] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex border-b border-[#EAE2DC] bg-white px-6 gap-6 text-xs font-medium">
          {[
            { id: 'profile', label: 'Member Profile' },
            { id: 'wishlist', label: `Saved Bags (${savedProducts.length})` },
            { id: 'orders', label: `US Orders (${orders.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-[#C5A059] text-[#3B2820] font-semibold'
                  : 'border-transparent text-[#76645C] hover:text-[#3B2820]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {activeTab === 'profile' && (
            <div>
              {customerProfile.isSignedIn ? (
                <div className="space-y-4">
                  <div className="bg-white border border-[#EAE2DC] p-4 space-y-1">
                    <p className="text-xs text-[#76645C]">Signed in as</p>
                    <p className="font-serif text-lg text-[#3B2820]">{customerProfile.name}</p>
                    <p className="text-sm text-[#76645C]">{customerProfile.email}</p>
                    <p className="text-xs text-[#A6833E] pt-1">
                      US Preferred Member · Complimentary Priority Returns
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSignIn()}
                    className="px-4 py-2 text-xs font-medium border border-[#3B2820] text-[#3B2820] hover:bg-[#3B2820] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSignIn} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#3B2820] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#EAE2DC]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#3B2820] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#EAE2DC]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#3B2820] text-[#FAF8F5] text-xs font-semibold hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-3">
              {savedProducts.length === 0 ? (
                <div className="py-8 text-center">
                  <Heart className="w-8 h-8 text-[#C5A059] mx-auto mb-2" strokeWidth={1.4} />
                  <p className="font-serif text-base text-[#3B2820]">No saved handbags yet</p>
                </div>
              ) : (
                savedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 bg-white border border-[#EAE2DC] p-3"
                  >
                    <div
                      onClick={() => {
                        setIsAccountOpen(false);
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
                      <h4
                        onClick={() => {
                          setIsAccountOpen(false);
                          navigate(`/product/${product.slug}`);
                        }}
                        className="font-serif text-sm font-medium text-[#3B2820] truncate cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <p className="text-xs font-semibold tabular-nums text-[#76645C] mt-0.5">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAccountOpen(false);
                          addToCart(product, product.colors[0].name, 1, true);
                        }}
                        className="px-3 py-1.5 text-xs font-medium bg-[#3B2820] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        className="text-xs text-[#76645C] hover:text-[#3B2820] px-2 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="bg-white border border-[#EAE2DC] p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3B2820] tabular-nums">
                      <Package className="w-4 h-4 text-[#C5A059]" />
                      Order #{order.id}
                    </span>
                    <span className="text-xs text-[#76645C]">{order.date}</span>
                  </div>
                  <p className="text-xs text-[#A6833E] font-medium">{order.status}</p>
                  <p className="text-xs text-[#76645C]">{order.shippingAddress}</p>
                  <div className="pt-2 border-t border-[#EAE2DC] flex items-center justify-between text-xs font-semibold tabular-nums text-[#3B2820]">
                    <span>
                      {order.items.reduce((acc, i) => acc + i.quantity, 0)} item(s) ·{' '}
                      {order.paymentMethod}
                    </span>
                    <span>${order.total.toFixed(2)} USD</span>
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
