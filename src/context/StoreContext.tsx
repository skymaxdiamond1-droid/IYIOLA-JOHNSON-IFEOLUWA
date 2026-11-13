import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { INITIAL_REVIEWS, PRODUCTS } from '../data/catalog';
import type { BagCategory, CartItem, OrderRecord, Product, Review } from '../types/store';

interface ShopPresetFilter {
  category?: BagCategory | 'All';
  occasion?: string;
}

interface StoreContextValue {
  currentPath: string;
  navigate: (path: string, shopPreset?: ShopPresetFilter) => void;
  shopPreset: ShopPresetFilter;
  clearShopPreset: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color?: string, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  discountAmount: number;
  shippingCost: number;
  cartTotal: number;
  freeShippingThreshold: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'verified'>) => void;

  // Orders & Account
  orders: OrderRecord[];
  placeOrder: (details: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    paymentMethod: string;
  }) => OrderRecord;
  customerProfile: {
    name: string;
    email: string;
    cityState: string;
    isSignedIn: boolean;
  };
  toggleSignIn: (name?: string, email?: string) => void;

  // UI Drawers & Modals
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const FREE_SHIPPING_THRESHOLD = 100;
const STANDARD_US_SHIPPING = 12;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const p = window.location.pathname;
    return p || '/';
  });
  const [shopPreset, setShopPreset] = useState<ShopPresetFilter>({});

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vespera_cart_v1');
      if (saved) {
        const parsed = JSON.parse(saved) as Array<{ productId: string; color: string; quantity: number }>;
        return parsed
          .map((item) => {
            const product = PRODUCTS.find((p) => p.id === item.productId);
            if (!product) return null;
            return { product, color: item.color, quantity: item.quantity };
          })
          .filter((x): x is CartItem => x !== null);
      }
    } catch {
      // Ignore storage read failure
    }
    return [];
  });

  const [promoCode, setPromoCode] = useState<string>('');
  const [wishlist, setWishlist] = useState<string[]>(['prod-amethyst-tote', 'prod-jolie-crossbody']);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const [orders, setOrders] = useState<OrderRecord[]>([
    {
      id: 'VC-1042',
      date: 'November 3, 2026',
      status: 'Shipped via UPS Ground from SoHo, NY — Arriving in 2 Business Days',
      items: [
        {
          product: PRODUCTS[0],
          color: PRODUCTS[0].colors[0].name,
          quantity: 1,
        },
      ],
      subtotal: 148,
      discount: 0,
      shipping: 0,
      total: 148,
      shippingAddress: '742 Madison Ave, Apt 4B, New York, NY 10065',
      paymentMethod: 'Apple Pay',
    },
  ]);

  const [customerProfile, setCustomerProfile] = useState({
    name: 'Claire Vance',
    email: 'claire.vance@example.com',
    cityState: 'New York, NY',
    isSignedIn: true,
  });

  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    try {
      const compact = cart.map((item) => ({
        productId: item.product.id,
        color: item.color,
        quantity: item.quantity,
      }));
      localStorage.setItem('vespera_cart_v1', JSON.stringify(compact));
    } catch {
      // Ignore storage write failure
    }
  }, [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const navigate = (path: string, preset?: ShopPresetFilter) => {
    if (preset) {
      setShopPreset(preset);
    } else if (!path.startsWith('/shop')) {
      setShopPreset({});
    }
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearShopPreset = () => setShopPreset({});

  const addToCart = (product: Product, color?: string, quantity = 1, openDrawer = true) => {
    const selectedColor = color || product.colors[0].name;
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id && i.color === selectedColor);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, color: selectedColor, quantity }];
    });
    if (openDrawer) {
      setIsBagOpen(true);
    } else {
      showToast(`Added ${product.name} to your bag`);
    }
  };

  const removeFromCart = (productId: string, color: string) => {
    setCart((prev) => prev.filter((i) => !(i.product.id === productId && i.color === color)));
  };

  const updateQuantity = (productId: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, color);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId && i.color === color ? { ...i, quantity } : i)),
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const cartSubtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    [cart],
  );

  const applyPromoCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'VESPERA15' || normalized === 'NYC15') {
      setPromoCode(normalized);
      showToast(`Promo code ${normalized} applied (15% off)`);
      return true;
    }
    return false;
  };

  const discountAmount = useMemo(() => {
    if (!promoCode) return 0;
    return Number((cartSubtotal * 0.15).toFixed(2));
  }, [cartSubtotal, promoCode]);

  const discountedSubtotal = Math.max(0, cartSubtotal - discountAmount);
  const shippingCost =
    cart.length === 0 ? 0 : discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_US_SHIPPING;
  const cartTotal = Number((discountedSubtotal + shippingCost).toFixed(2));

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from saved bags' : 'Saved to your wishlist');
      return next;
    });
  };

  const addReview = (review: Omit<Review, 'id' | 'date' | 'verified'>) => {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'November 12, 2026',
      verified: true,
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast('Thank you! Your verified review has been published.');
  };

  const placeOrder = (details: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    paymentMethod: string;
  }): OrderRecord => {
    const orderNumber = `VC-${Math.floor(1050 + Math.random() * 8900)}`;
    const newOrder: OrderRecord = {
      id: orderNumber,
      date: 'November 12, 2026',
      status: 'Confirmed — Preparing Shipment from SoHo Studio, New York',
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingCost,
      total: cartTotal,
      shippingAddress: `${details.address}, ${details.city}, ${details.state} ${details.zip}`,
      paymentMethod: details.paymentMethod,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setPromoCode('');
    return newOrder;
  };

  const toggleSignIn = (name?: string, email?: string) => {
    setCustomerProfile((prev) => {
      if (prev.isSignedIn && !name) {
        return { ...prev, isSignedIn: false };
      }
      return {
        name: name || prev.name,
        email: email || prev.email,
        cityState: 'New York, NY',
        isSignedIn: true,
      };
    });
  };

  return (
    <StoreContext.Provider
      value={{
        currentPath,
        navigate,
        shopPreset,
        clearShopPreset,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        promoCode,
        applyPromoCode,
        discountAmount,
        shippingCost,
        cartTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        wishlist,
        toggleWishlist,
        reviews,
        addReview,
        orders,
        placeOrder,
        customerProfile,
        toggleSignIn,
        isBagOpen,
        setIsBagOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAccountOpen,
        setIsAccountOpen,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
