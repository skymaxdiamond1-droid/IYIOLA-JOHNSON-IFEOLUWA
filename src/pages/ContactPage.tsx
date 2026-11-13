import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, Mail, MapPin, Package, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const FAQ_ITEMS = [
  {
    q: 'How fast is US shipping and which carriers do you use?',
    a: 'All orders ship from our Mercer Street studio in SoHo, New York within 24 business hours. We dispatch via USPS Priority Mail and UPS Ground (2–5 business days across all 50 US states). Orders over $100 USD qualify for complimentary US shipping; orders under $100 ship for a flat $12 USD.',
  },
  {
    q: 'What is your 30-Day US Return & Exchange Policy?',
    a: 'If your handbag is not an effortless fit, you may return or exchange unused items with original tags and dust bag within 30 days of delivery. We provide a complimentary prepaid USPS/UPS return label for all US orders.',
  },
  {
    q: 'How is US Sales Tax calculated at checkout?',
    a: 'Applicable state and local US sales tax is automatically calculated based on your shipping ZIP code at checkout in USD ($).',
  },
  {
    q: 'Do Vespera & Co. handbags include dust bags and hardware care?',
    a: 'Yes. Every tote, satchel, crossbody, hobo, and evening clutch arrives wrapped in acid-free tissue with a custom woven Vespera & Co. cotton dust bag.',
  },
];

export function ContactPage() {
  const { orders, showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orderNum, setOrderNum] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [trackInput, setTrackInput] = useState('VC-1042');
  const [trackedOrderStatus, setTrackedOrderStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
    showToast('Concierge inquiry received. We respond within 1 business day.');
    setName('');
    setEmail('');
    setOrderNum('');
    setMessage('');
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = trackInput.trim().replace('#', '').toUpperCase();
    const found = orders.find((o) => o.id.toUpperCase() === cleaned);
    if (found) {
      setTrackedOrderStatus(`Order #${found.id} (${found.date}): ${found.status}`);
    } else {
      setTrackedOrderStatus(
        `No active shipment found for #${cleaned}. Try #VC-1042 or place a test order in your Shopping Bag.`,
      );
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="pb-8 border-b border-[#EAE2DC]">
        <p className="text-xs tracking-[0.16em] uppercase text-[#A6833E] font-medium">
          New York Concierge
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#3B2820] mt-1">
          Contact, US Shipping &amp; FAQ
        </h1>
        <p className="text-sm text-[#76645C] mt-2 max-w-xl">
          Speak directly with our SoHo client care specialists regarding sizing, styling, or
          domestic US delivery.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-white border border-[#EAE2DC] p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-medium text-[#3B2820]">Send a Message</h2>
          <p className="text-xs text-[#76645C] mt-1">
            Responses within 1 business day · Mon–Fri, 9:00 AM – 6:00 PM EST
          </p>

          {submitted ? (
            <div className="mt-6 p-6 bg-[#FAF8F5] border border-[#C5A059] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <p className="font-serif text-lg font-medium text-[#3B2820]">
                  Thank You — Inquiry Received
                </p>
                <p className="text-sm text-[#76645C] mt-1">
                  Our SoHo concierge team at concierge@vesperaandco.com will reply to your email
                  shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-[#3B2820] underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#3B2820] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Claire Vance"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#EAE2DC] focus:outline-none focus:border-[#3B2820]"
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
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#EAE2DC] focus:outline-none focus:border-[#3B2820]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#3B2820] mb-1">
                  Order Number (Optional)
                </label>
                <input
                  type="text"
                  value={orderNum}
                  onChange={(e) => setOrderNum(e.target.value)}
                  placeholder="e.g. #VC-1042"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#EAE2DC] focus:outline-none focus:border-[#3B2820]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#3B2820] mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can our New York studio help you?"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#EAE2DC] focus:outline-none focus:border-[#3B2820]"
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3 bg-[#3B2820] text-[#FAF8F5] text-xs font-semibold tracking-wide hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors cursor-pointer"
              >
                Send Concierge Inquiry
              </button>
            </form>
          )}
        </div>

        {/* Right: US Flagship Info & Order Lookup */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#EAE2DC] p-6 space-y-4">
            <h2 className="font-serif text-xl font-medium text-[#3B2820]">
              US Flagship &amp; Client Care
            </h2>
            <div className="space-y-3.5 text-sm text-[#3B2820]/85">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#3B2820]">Flagship Studio</p>
                  <p className="text-xs text-[#76645C]">
                    458 Mercer Street, Suite 3B, New York, NY 10013, USA
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#3B2820]">Customer Care Phone</p>
                  <p className="text-xs text-[#76645C]">
                    +1 (212) 555-0194 (Mon–Fri, 9:00 AM – 6:00 PM EST)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#3B2820]">Concierge Email</p>
                  <p className="text-xs text-[#76645C]">concierge@vesperaandco.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive US Order Tracker */}
          <div className="bg-[#EAE2DC]/50 border border-[#EAE2DC] p-6">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-[#C5A059]" />
              <h3 className="font-serif text-lg font-medium text-[#3B2820]">Track Your US Order</h3>
            </div>
            <p className="text-xs text-[#76645C] mb-3">
              Enter your Vespera &amp; Co. confirmation number (e.g. VC-1042).
            </p>
            <form onSubmit={handleTrackOrder} className="flex gap-2">
              <input
                type="text"
                value={trackInput}
                onChange={(e) => setTrackInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white border border-[#EAE2DC]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#3B2820] text-[#FAF8F5] text-xs font-semibold hover:bg-[#C5A059] hover:text-[#3B2820] transition-colors cursor-pointer"
              >
                Track
              </button>
            </form>
            {trackedOrderStatus && (
              <p className="mt-3 text-xs font-medium text-[#3B2820] bg-white border border-[#EAE2DC] p-3">
                {trackedOrderStatus}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Shipping & Returns FAQ Accordion */}
      <section className="mt-14 pt-12 border-t border-[#EAE2DC]">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B2820] mb-6">
          Shipping, Returns &amp; US Tax FAQ
        </h2>
        <div className="bg-white border border-[#EAE2DC] divide-y divide-[#EAE2DC]">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={item.q} className="px-6 py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 text-sm font-semibold text-[#3B2820] cursor-pointer"
                >
                  {item.q}
                  <ChevronDown
                    className={`w-4 h-4 text-[#76645C] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2.5 text-sm text-[#76645C] leading-relaxed">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
