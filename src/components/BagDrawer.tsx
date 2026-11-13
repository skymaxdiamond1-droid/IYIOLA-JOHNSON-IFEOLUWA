import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import type { OrderRecord } from '../types/store';
import { SmartImage } from './SmartImage';

export function BagDrawer() {
  const {
    cart,
    isBagOpen,
    setIsBagOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    promoCode,
    applyPromoCode,
    discountAmount,
    shippingCost,
    cartTotal,
    freeShippingThreshold,
    placeOrder,
    navigate,
    customerProfile,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  const [fullName, setFullName] = useState(customerProfile.name);
  const [email, setEmail] = useState(customerProfile.email);
  const [address, setAddress] = useState('215 Greene Street, Apt 5A');
  const [city, setCity] = useState('New York');
  const [stateCode, setStateCode] = useState('NY');
  const [zip, setZip] = useState('10012');
  const [paymentMethod, setPaymentMethod] = useState('Apple Pay');

  if (!isBagOpen) return null;

  const remainingForFreeShipping = Math.max(
    0,
    freeShippingThreshold - Math.max(0, cartSubtotal - discountAmount),
  );
  const shippingProgress = Math.min(
    100,
    (Math.max(0, cartSubtotal - discountAmount) / freeShippingThreshold) * 100,
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!applyPromoCode(promoInput)) {
      setPromoError('Try code VESPERA15 for 15% off your first US order.');
    } else {
      setPromoInput('');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeOrder({
      fullName,
      email,
      address,
      city,
      state: stateCode,
      zip,
      paymentMethod,
    });
    setConfirmedOrder(order);
    setCheckoutStep('confirmed');
  };

  const closeAndReset = () => {
    setIsBagOpen(false);
    if (checkoutStep === 'confirmed') {
      setCheckoutStep('bag');
      setConfirmedOrder(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-[#3B2820]/45 backdrop-blur-[2px]"
        onClick={closeAndReset}
      />
      <aside
        aria-label="Shopping Bag"
        className="relative z-10 w-full max-w-md bg-[#FAF8F5] h-full flex flex-col shadow-2xl border-l border-[#EAE2DC]"
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#EAE2DC] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-medium text-[#3B2820]">
              {checkoutStep === 'bag' && 'Your Shopping Bag'}
              {checkoutStep === 'checkout' && 'US Express Checkout'}
              {checkoutStep === 'confirmed' && 'Order Confirmed'}
            </h2>
            {checkoutStep === 'bag' && (
              <p className="text-xs text-[#76645C] mt-0.5">
                Dispatched within 24 hours from SoHo, New York
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={closeAndReset}
            aria-label="Close shopping bag"
            className="h-9 w-9 flex items-center justify-center text-[#3B2820] hover:bg-[#EAE2DC] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free US Shipping Meter */}
        {checkoutStep === 'bag' && cart.length > 0 && (
          <div className="px-6 py-3 bg-[#EAE2DC]/50 border-b border-[#EAE2DC]">
            <p className="text-xs font-medium text-[#3B2820] mb-1.5">
              {remainingForFreeShipping === 0
                ? 'Complimentary US Priority Shipping unlocked!'
                : `Add $${remainingForFreeShipping.toFixed(2)} more for Complimentary US Shipping`}
            </p>
            <div className="h-1.5 w-full bg-[#EAE2DC] overflow-hidden">
              <div
                className="h-full bg-[#C5A059] transition-all duration-300"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {checkoutStep === 'confirmed' && confirmedOrder ? (
            <div className="py-6 space-y-5">
              <div className="flex items-start gap-3 p-4 bg-white border border-[#EAE2DC]">
                <CheckCircle2 className="w-6 h-6 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif text-lg font-medium text-[#3B2820]">
                    Order #{confirmedOrder.id} Confirmed
                  </p>
                  <p className="text-xs text-[#76645C] mt-1">{confirmedOrder.status}</p>
                </div>
              </div>
              <div className="bg-white border border-[#EAE2DC] p-4 space-y-3 text-sm">
                <div className="flex justify-between text-xs text-[#76645C]">
                  <span>Shipping To</span>
                  <span className="text-[#3B2820] text-right max-w-[220px]">
                    {confirmedOrder.shippingAddress}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-[#76645C]">
                  <span>Payment Method</span>
                  <span className="text-[#3B2820]">{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="pt-2 border-t border-[#EAE2DC] flex justify-between font-semibold text-[#3B2820] tabular-nums">
                  <span>Total Paid (USD)</span>
                  <span>${confirmedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  closeAndReset();
                  navigate('/shop');
                }}
                className="w-full py-3 bg-[#3B2820] text-[#FAF8F5] text-sm font-medium hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors cursor-pointer"
              >
                Continue Exploring Handbags
              </button>
            </div>
          ) : checkoutStep === 'checkout' ? (
            <form id="express-checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#3B2820] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-[#EAE2DC] focus:outline-none focus:border-[#3B2820]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#3B2820] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-[#EAE2DC] focus:outline-none focus:border-[#3B2820]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#3B2820] mb-1">
                  US Street Address
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-[#EAE2DC] focus:outline-none focus:border-[#3B2820]"
                />
              </div>
              <div className="grid grid-cols-6 gap-2.5">
                <div className="col-span-3">
                  <label className="block text-xs font-medium text-[#3B2820] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-[#EAE2DC] focus:outline-none focus:border-[#3B2820]"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-[#3B2820] mb-1">State</label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    value={stateCode}
                    onChange={(e) => setStateCode(e.target.value.toUpperCase())}
                    className="w-full px-2 py-2.5 text-sm bg-white border border-[#EAE2DC] focus:outline-none focus:border-[#3B2820]"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-[#3B2820] mb-1">ZIP</label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-[#EAE2DC] focus:outline-none focus:border-[#3B2820]"
                  />
                </div>
              </div>
              <div>
                <span className="block text-xs font-medium text-[#3B2820] mb-1.5">
                  Express Payment Method (USD)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {['Apple Pay', 'Shop Pay', 'Credit Card'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2.5 px-2 text-xs font-medium border transition-colors cursor-pointer ${
                        paymentMethod === method
                          ? 'bg-[#3B2820] text-[#FAF8F5] border-[#3B2820]'
                          : 'bg-white text-[#3B2820] border-[#EAE2DC] hover:border-[#C5A059]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCheckoutStep('bag')}
                className="text-xs text-[#76645C] underline hover:text-[#3B2820] cursor-pointer"
              >
                Back to Shopping Bag
              </button>
            </form>
          ) : cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-10 h-10 text-[#C5A059] mb-4" strokeWidth={1.4} />
              <p className="font-serif text-lg text-[#3B2820]">Your shopping bag is empty</p>
              <p className="text-sm text-[#76645C] mt-1 max-w-xs">
                Explore our SoHo launch collection of woven totes, evening clutches, and crossbodies.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsBagOpen(false);
                  navigate('/shop');
                }}
                className="mt-6 px-6 py-3 bg-[#3B2820] text-[#FAF8F5] text-xs font-semibold tracking-wide hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors cursor-pointer"
              >
                Shop the Collection
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.color}`}
                  className="flex gap-4 bg-white border border-[#EAE2DC] p-3"
                >
                  <div
                    onClick={() => {
                      setIsBagOpen(false);
                      navigate(`/product/${item.product.slug}`);
                    }}
                    className="w-24 h-20 shrink-0 bg-[#EAE2DC]/40 overflow-hidden cursor-pointer"
                  >
                    <SmartImage
                      src={item.product.gallery[0].src}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsBagOpen(false);
                            navigate(`/product/${item.product.slug}`);
                          }}
                          className="font-serif text-sm font-medium text-[#3B2820] leading-snug cursor-pointer hover:text-[#A6833E]"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id, item.color)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-[#76645C] hover:text-[#3B2820] p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#76645C] mt-0.5 truncate">{item.color}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center border border-[#EAE2DC]">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.color, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#3B2820] hover:bg-[#EAE2DC]/60 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.color, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#3B2820] hover:bg-[#EAE2DC]/60 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-[#3B2820] tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. VESPERA15)"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-[#EAE2DC] focus:outline-none focus:border-[#3B2820]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-medium bg-[#EAE2DC] text-[#3B2820] hover:bg-[#C5A059] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-[#A6833E] mt-1">{promoError}</p>}
                {promoCode && (
                  <p className="text-[11px] text-[#3B2820] mt-1">
                    Active code: <strong>{promoCode}</strong> (15% off)
                  </p>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer Totals */}
        {cart.length > 0 && checkoutStep !== 'confirmed' && (
          <div className="px-6 py-4 bg-white border-t border-[#EAE2DC] space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#76645C] tabular-nums">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#A6833E] tabular-nums">
                  <span>Discount ({promoCode})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#76645C] tabular-nums">
                <span>US Shipping</span>
                <span>{shippingCost === 0 ? 'Complimentary' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="pt-2 border-t border-[#EAE2DC] flex justify-between font-semibold text-base text-[#3B2820] tabular-nums">
                <span>Total (USD)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {checkoutStep === 'bag' ? (
              <button
                type="button"
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-3.5 px-4 bg-[#3B2820] text-[#FAF8F5] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors cursor-pointer"
              >
                Proceed to US Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="express-checkout-form"
                className="w-full py-3.5 px-4 bg-[#C5A059] text-[#3B2820] text-sm font-semibold hover:bg-[#d4b06a] transition-colors cursor-pointer"
              >
                Complete Order · ${cartTotal.toFixed(2)}
              </button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
