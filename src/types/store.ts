export type RoutePath =
  | '/'
  | '/shop'
  | '/about'
  | '/lookbook'
  | '/reviews'
  | '/contact'
  | `/product/${string}`;

export type BagCategory =
  | 'Totes'
  | 'Evening Clutches'
  | 'Structured Satchels'
  | 'Crossbodies'
  | 'Bucket & Hobo';

export type BagOccasion = 'Work' | 'Evening' | 'Weekend' | 'Resort';

export interface ProductGalleryImage {
  id: string;
  src: string;
  label: string;
  caption: string;
  zoomPosition?: string;
}

export interface ProductColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: BagCategory;
  occasion: BagOccasion[];
  colorFamily: string;
  colors: ProductColorOption[];
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  isSignature: boolean;
  stockNote: string;
  shortTag?: string;
  description: string;
  dimensions: string;
  materials: string;
  careInstructions: string;
  gallery: ProductGalleryImage[];
  bestSellerRank: number;
}

export interface Review {
  id: string;
  productSlug: string;
  productName: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  photo?: string;
}

export interface CartItem {
  product: Product;
  color: string;
  quantity: number;
}

export interface LookbookEntry {
  id: string;
  title: string;
  occasion: string;
  location: string;
  narrative: string;
  image: string;
  featuredProductSlug: string;
  stylingNotes: string[];
}

export interface OrderRecord {
  id: string;
  date: string;
  status: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: string;
  paymentMethod: string;
}
