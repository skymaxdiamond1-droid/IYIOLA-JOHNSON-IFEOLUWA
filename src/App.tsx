/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BagDrawer } from './components/BagDrawer';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { QuickViewModal } from './components/QuickViewModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { LookbookPage } from './pages/LookbookPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';

function StorefrontShell() {
  const { currentPath, toastMessage } = useStore();

  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }
    if (currentPath === '/shop') {
      return <ShopPage />;
    }
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '').split('/')[0];
      return <ProductDetailPage slug={slug} />;
    }
    if (currentPath === '/about') {
      return <AboutPage />;
    }
    if (currentPath === '/lookbook') {
      return <LookbookPage />;
    }
    if (currentPath === '/reviews') {
      return <ReviewsPage />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#3B2820]">
      <Header />
      <div className="flex-1">{renderPage()}</div>
      <Footer />

      {/* Interactive Drawers & Modals */}
      <BagDrawer />
      <SearchModal />
      <AccountModal />
      <QuickViewModal />

      {/* Toast Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-[#3B2820] text-[#FAF8F5] border border-[#C5A059] px-5 py-3 text-xs font-medium shadow-xl"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StorefrontShell />
    </StoreProvider>
  );
}
