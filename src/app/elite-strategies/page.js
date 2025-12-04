"use client";

import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  Menu, 
  User, 
  MessageCircle, 
  Share2, 
  ArrowLeft, 
  Home, 
  ShoppingBag,
  Check,
  Info,
  Play,
  Volume2,
  VolumeX,
  MoreVertical,
  X,
  Ruler,
  Truck,
  ShieldCheck,
  CreditCard,
  AlertTriangle,
  Gift,
  Smartphone,
  MapPin,
  Lock,
  ChevronRight,
  Fingerprint,
  Zap
} from 'lucide-react';

/* --- 1. THEME & COLOR CONFIGURATION --- */
const BRAND_COLORS = [
  { name: 'Midnight Navy', hex: '#1a365d', market: 'US' },
  { name: 'Deep Burgundy', hex: '#7c2d12', market: 'India' },
  { name: 'Forest Green', hex: '#064e3b', market: 'Both' },
  { name: 'Pitch Black', hex: '#0a0a0a', market: 'Both' },
  { name: 'Royal Purple', hex: '#581c87', market: 'Both' },
];

/* --- 2. HELPER COMPONENTS --- */

const MarketToggle = ({ market, setMarket }) => (
  <div className="flex justify-center mb-8">
    <div className="bg-gray-100 p-1 rounded-lg inline-flex relative shadow-inner">
      <div 
        className={`absolute top-1 bottom-1 w-1/2 bg-white shadow-sm rounded-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${market === 'US' ? 'left-1' : 'left-[calc(50%-4px)] translate-x-1'}`}
      />
      <button 
        onClick={() => setMarket('US')}
        className={`relative z-10 px-6 py-2 text-sm font-semibold transition-colors duration-200 ${market === 'US' ? 'text-gray-900' : 'text-gray-500'}`}
      >
        🇺🇸 US Minimalist
      </button>
      <button 
        onClick={() => setMarket('India')}
        className={`relative z-10 px-6 py-2 text-sm font-semibold transition-colors duration-200 ${market === 'India' ? 'text-gray-900' : 'text-gray-500'}`}
      >
        🇮🇳 India Premium
      </button>
    </div>
  </div>
);

const Section = ({ title, description, badge, children }) => (
  <div className="mb-12 border-b border-gray-200 pb-12 last:border-0">
    <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          {title}
          {badge && <span className={`text-xs px-2 py-1 rounded-full uppercase tracking-wider font-bold ${badge === 'Critical' ? 'bg-red-100 text-red-800' : badge === 'New Trend' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>{badge}</span>}
        </h2>
        <p className="text-gray-600 max-w-2xl text-sm md:text-base leading-relaxed">{description}</p>
      </div>
    </div>
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-8 overflow-hidden relative">
      {children}
    </div>
  </div>
);

const ColorPicker = ({ selectedColor, onSelect }) => (
  <div className="flex flex-wrap gap-4 items-center justify-center mb-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide mr-2">Brand Color:</span>
    {BRAND_COLORS.map((c) => (
      <button
        key={c.hex}
        onClick={() => onSelect(c.hex)}
        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 ring-offset-2 ${selectedColor === c.hex ? 'border-gray-900 scale-110 ring-2 ring-blue-200' : 'border-transparent'}`}
        style={{ backgroundColor: c.hex }}
        title={c.name}
      />
    ))}
    <div className="flex items-center gap-2 ml-4 border-l pl-4 border-gray-200">
      <span className="text-xs text-gray-400">Custom:</span>
      <input 
        type="color" 
        value={selectedColor} 
        onChange={(e) => onSelect(e.target.value)}
        className="w-8 h-8 rounded cursor-pointer border-0 p-0"
      />
    </div>
  </div>
);

const ConversionKillerItem = ({ rank, title, problem, solution, severity, market }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
    <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${severity === 'high' ? 'bg-red-100 text-red-600' : severity === 'medium' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'}`}>
      {rank}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${severity === 'high' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
          Impact: {severity === 'high' ? '-40% Conv' : severity === 'medium' ? '-25% Conv' : '-10% Conv'}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-red-50 p-3 rounded text-red-900 border border-red-100">
          <strong className="block text-xs uppercase text-red-400 mb-1">The Mistake (Poor Design)</strong>
          {problem}
        </div>
        <div className="bg-green-50 p-3 rounded text-green-900 border border-green-100">
          <strong className="block text-xs uppercase text-green-400 mb-1">The Optimization ({market})</strong>
          {solution}
        </div>
      </div>
    </div>
  </div>
);

/* --- 3. MAIN COMPONENT --- */

const ConversionDesignSystem = () => {
  const [market, setMarket] = useState('US');
  const [brandColor, setBrandColor] = useState('#1a365d');
  
  // Interactive States
  const [isHovered, setIsHovered] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [showVideoProducts, setShowVideoProducts] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const handleAddToCart = () => {
    setCartLoading(true);
    setTimeout(() => {
      setCartLoading(false);
      setCartSuccess(true);
      setTimeout(() => setCartSuccess(false), 2000);
    }, 1500);
  };

  // Dynamic Theme
  const theme = {
    font: 'font-sans',
    bgColor: market === 'US' ? 'bg-white' : 'bg-[#fafaf9]',
    textColor: market === 'US' ? 'text-gray-900' : 'text-[#1c1917]',
    secondaryText: market === 'US' ? 'text-gray-500' : 'text-[#57534e]',
    h1: market === 'US' ? 'text-3xl md:text-4xl tracking-tight font-semibold' : 'text-2xl md:text-3xl font-bold tracking-normal',
    radius: market === 'US' ? 'rounded-sm' : 'rounded-lg',
  };

  return (
    <div className={`min-h-screen ${theme.font} text-gray-800 p-4 md:p-12 transition-colors duration-500 bg-white`}>
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-3 text-gray-900 tracking-tight">Design for Conversion: 2025 Edition</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Deep-dive comparison of <span className="font-semibold text-gray-900">US Minimalist</span> vs. <span className="font-semibold text-gray-900">India Premium</span> CRO strategies.
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <MarketToggle market={market} setMarket={setMarket} />
            <ColorPicker selectedColor={brandColor} onSelect={setBrandColor} />
          </div>
        </header>

        {/* --- SECTION 1: TYPOGRAPHY & LAYOUT --- */}
        <Section 
          title="1. Typography & Hierarchy" 
          description={market === 'US' ? "US Market: 'Invisible Design'. High x-height fonts (Inter/SF Pro). Generous white space (1.5x) reduces cognitive load." : "India Market: 'Sophisticated Density'. Mobile-first sizing. High contrast (WCAG AAA) for outdoor readability. Poppins/DM Sans preferred."}
          badge="Foundation"
        >
          <div className={`${theme.bgColor} p-8 border border-gray-100 shadow-sm transition-all duration-500 relative`}>
            {market === 'US' && (
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent opacity-50 rounded-bl-full pointer-events-none" />
            )}

            <div className="space-y-8 relative z-10">
              <div>
                <span className={`text-xs font-mono uppercase tracking-widest mb-3 block ${theme.secondaryText}`}>H1 • Product Title</span>
                <h1 className={`${theme.h1} ${theme.textColor} leading-[1.1]`}>
                  {market === 'US' ? 'Premium Cotton Oxford Shirt' : 'Handwoven Silk Blend Kurta'}
                </h1>
                {market === 'India' && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-red-50 text-[#7c2d12] text-[10px] font-bold px-2 py-0.5 rounded border border-red-100">BESTSELLER</span>
                    <span className="text-xs text-gray-500">2.4k bought in past month</span>
                  </div>
                )}
              </div>

              <div>
                <span className={`text-xs font-mono uppercase tracking-widest mb-3 block ${theme.secondaryText}`}>Body Copy • Readability</span>
                <p className={`text-base md:text-lg leading-relaxed max-w-prose ${market === 'US' ? 'text-gray-600 font-light' : 'text-gray-700 font-normal'}`}>
                  {market === 'US' 
                    ? "Crafted from the finest Egyptian cotton, this shirt embodies effortless style. The tailored fit ensures a sharp silhouette while maintaining all-day comfort. Designed for the modern professional who values understated luxury."
                    : "Experience the luxury of pure handwoven silk. Perfect for festive occasions, this kurta features intricate embroidery detail and a comfortable fit suitable for the Indian summer. A masterpiece of authentic craftsmanship that blends tradition with modern style."}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* --- SECTION 2: VERTICAL VIDEO --- */}
        <Section 
          title="2. Vertical Video Commerce" 
          description={market === 'US' ? "US Trend: 'Shoppable Atmosphere'. Clean, muted autoplay. Focus on lifestyle aesthetic. Minimal UI overlay." : "India Trend: 'Reels Economy'. High engagement UI (WhatsApp, Share). Explicit volume controls. 'View Products' drawer is essential."}
          badge="High Impact"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center py-4">
            <div className="relative w-[300px] h-[580px] bg-black rounded-[40px] border-[8px] border-gray-900 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                 <div className={`w-full h-full opacity-60 bg-gradient-to-b ${market === 'US' ? 'from-gray-700 to-gray-900' : 'from-[#3f2e2e] to-[#1a1010]'}`}></div>
                 <Play className="text-white opacity-20 absolute" size={64} />
                 
                 <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    {market === 'US' && (
                      <div className="mb-8 text-center">
                        <h3 className="text-white font-light text-2xl mb-1 tracking-wide">Summer '25</h3>
                        <p className="text-white/80 text-sm mb-6 font-light">Effortless elegance for every day.</p>
                        <button className="bg-white/90 backdrop-blur-md text-black px-8 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-white transition-all">
                          SHOP THE LOOK
                        </button>
                      </div>
                    )}

                    {market === 'India' && (
                      <div className="flex flex-col h-full justify-between pt-12 pb-4">
                        <div className="flex justify-between items-start">
                           <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full bg-white/20"></div>
                             <span className="text-white font-semibold text-sm shadow-black drop-shadow-md">Brand Official <span className="text-blue-400">✓</span></span>
                           </div>
                           <div className="bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm text-xs text-white font-medium border border-white/10">Ad</div>
                        </div>

                        <div className="absolute right-0 bottom-24 flex flex-col gap-6 items-center pr-2">
                          <div className="flex flex-col items-center gap-1">
                            <div className="bg-white/10 p-2 rounded-full backdrop-blur-md"><Heart className="text-white" size={24} /></div>
                            <span className="text-xs text-white">4.2k</span>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="bg-[#25D366] p-2 rounded-full shadow-lg animate-pulse"><Share2 className="text-white" size={24} /></div>
                            <span className="text-xs text-white">Share</span>
                          </div>
                        </div>

                        <div className="pr-12">
                           <p className="text-white text-sm line-clamp-2 mb-3 drop-shadow-md">
                             Perfect for the wedding season! ✨ The Gold Trim Kurta is back in stock. #EthnicWear
                           </p>
                           <button 
                             onClick={() => setShowVideoProducts(!showVideoProducts)}
                             className="w-full bg-white text-black py-3 rounded-lg font-bold text-sm flex items-center justify-between px-4"
                           >
                             <span>View Products (2)</span>
                             <MoreVertical size={16} className="rotate-90" />
                           </button>
                        </div>
                      </div>
                    )}
                 </div>

                 <button 
                   onClick={() => setVideoMuted(!videoMuted)}
                   className="absolute top-6 right-6 bg-black/20 p-2 rounded-full backdrop-blur-sm"
                 >
                   {videoMuted ? <VolumeX size={16} className="text-white" /> : <Volume2 size={16} className="text-white" />}
                 </button>
              </div>

              {market === 'India' && showVideoProducts && (
                <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 transition-transform duration-300 transform translate-y-0 z-20 h-48">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-gray-800">Shop featured</span>
                    <button onClick={() => setShowVideoProducts(false)}><X size={20} /></button>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    <div className="min-w-[100px] border rounded-lg p-2">
                      <div className="h-16 bg-gray-100 rounded mb-2"></div>
                      <div className="text-[10px] font-bold">₹1,799</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1 max-w-sm">
               <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg text-sm text-yellow-800 mb-4">
                 <strong className="block mb-1">💡 CRO Insight:</strong>
                 {market === 'US' 
                   ? "Shoppable videos on product pages increase time-on-site by 47%. Minimal overlays prevent 'banner blindness'."
                   : "Vertical ads have 130% higher engagement. Explicit volume controls reduce immediate bounce rates in public settings."}
               </div>
            </div>
          </div>
        </Section>

        {/* --- SECTION 3: BUTTONS & CTA --- */}
        <Section 
          title="3. Buttons & Interactions" 
          description={market === 'US' ? "US Market: Single primary CTA. Hover states critical for desktop. Speed focus." : "India Market: Dual CTA (Add + Buy Now). Sticky bottom bars essential. Haptic feedback visual cues."}
          badge="Critical"
        >
          <div className="flex flex-col items-center justify-center space-y-12 py-8 bg-gray-50/50">
            <div className="w-full max-w-md">
              <p className="text-xs text-center text-gray-400 mb-4 uppercase tracking-wider">Desktop / Primary Action</p>
              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md ${theme.radius}`}
                style={{
                  backgroundColor: cartSuccess ? (market === 'US' ? '#10b981' : '#15803d') : brandColor,
                  height: '56px',
                  color: 'white',
                  textTransform: market === 'US' ? 'uppercase' : 'none',
                  letterSpacing: market === 'US' ? '1px' : '0px',
                  fontWeight: '600',
                  fontSize: market === 'US' ? '15px' : '17px'
                }}
              >
                {cartLoading ? (
                  <span className="flex items-center gap-2 animate-pulse">Processing...</span>
                ) : cartSuccess ? (
                  <span className="flex items-center gap-2"><Check size={20} /> Added</span>
                ) : (
                  <span className="flex items-center gap-2">
                    {market === 'India' && <ShoppingBag size={18} />}
                    {market === 'US' ? 'Add to Cart' : 'Add to Cart'}
                  </span>
                )}
              </button>
            </div>

            <div className="w-[375px] h-[120px] bg-gray-100 relative overflow-hidden rounded-xl border border-gray-200 shadow-inner">
               <div className="absolute top-4 left-4 right-4 h-20 bg-gray-200 rounded opacity-50 flex items-center justify-center text-gray-400 text-xs">Page Content...</div>
               <div className={`absolute bottom-0 w-full bg-white shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.1)] px-4 py-3 flex items-center gap-3 z-10 ${market === 'India' ? 'pb-4' : ''}`}>
                 {market === 'US' ? (
                   <button 
                    className="w-full text-white h-[48px] rounded font-semibold text-sm uppercase tracking-wide flex justify-between items-center px-6"
                    style={{ backgroundColor: brandColor }}
                   >
                     <span>Add to Cart</span>
                     <span>$129</span>
                   </button>
                 ) : (
                   <>
                    <div className="flex flex-col">
                       <span className="text-[10px] text-gray-500">Total</span>
                       <span className="font-bold text-gray-900">₹2,499</span>
                    </div>
                    <button 
                      className="flex-1 h-[48px] rounded-lg font-bold text-sm border-2"
                      style={{ borderColor: brandColor, color: brandColor, backgroundColor: 'white' }}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className="flex-1 h-[48px] rounded-lg font-bold text-sm text-white shadow-md"
                      style={{ backgroundColor: brandColor }}
                    >
                      Buy Now
                    </button>
                   </>
                 )}
               </div>
            </div>
            
            {market === 'India' && (
              <div className="flex items-center gap-2 text-[#128C7E] bg-[#dcf8c6] px-4 py-2 rounded-full text-sm font-bold border border-[#25D366]">
                <MessageCircle size={18} /> Chat on WhatsApp
              </div>
            )}
          </div>
        </Section>

        {/* --- SECTION 4: PRODUCT CARD --- */}
        <Section 
          title="4. Product Card & Trust" 
          description={market === 'US' ? "US Market: Image-led. Clean price. 'Quick View' overlays reduce friction." : "India Market: Info-led. Discount badges & Star ratings visible to build immediate trust."}
        >
          <div className="flex justify-center bg-gray-100 p-8 rounded-lg">
            <div 
              className={`relative bg-white group cursor-pointer w-[280px] transition-all duration-300 ${market === 'US' ? 'hover:shadow-xl' : 'shadow-md border border-gray-100'}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                 <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-400">Product Image</div>
                 
                 {market === 'US' && (
                   <div className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform">
                     <Heart size={18} className="text-gray-400" />
                   </div>
                 )}

                 {market === 'India' && (
                   <div className="absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm" style={{ backgroundColor: '#d946ef' }}>Trending</div>
                 )}
                 {market === 'India' && (
                   <div className="absolute top-8 left-2 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm mt-1" style={{ backgroundColor: brandColor }}>-28% OFF</div>
                 )}

                 {market === 'US' && (
                   <div className={`absolute bottom-0 w-full p-4 bg-white/95 backdrop-blur-sm transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
                      <button className="w-full text-white text-xs uppercase font-bold py-3 tracking-wide" style={{ backgroundColor: brandColor }}>Quick View</button>
                   </div>
                 )}
              </div>

              <div className={`p-4 ${market === 'India' ? 'pb-4' : ''}`}>
                {market === 'US' ? (
                  <>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Essential Linen Shirt</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">$89.00</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                       <div className="w-3 h-3 rounded-full bg-black border border-gray-200"></div>
                       <div className="w-3 h-3 rounded-full bg-blue-900 border border-gray-200"></div>
                       <div className="w-3 h-3 rounded-full bg-white border border-gray-300"></div>
                    </div>
                  </>
                ) : (
                  <>
                     <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-lg font-bold text-gray-900">₹1,799</span>
                        <span className="text-xs text-gray-500 line-through">₹2,499</span>
                     </div>
                     <h3 className="text-sm text-[#292524] leading-snug mb-2 font-medium">Premium Cotton Silk Blend Kurta</h3>
                     <div className="flex items-center gap-1 mb-2">
                        <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center">4.6 <span className="ml-0.5">★</span></div>
                        <span className="text-xs text-gray-500">(892)</span>
                     </div>
                     <div className="flex items-center gap-1 text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded w-fit">
                        <ShoppingBag size={10} /> Free Delivery
                     </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* --- SECTION 5: MOBILE NAVIGATION --- */}
        <Section 
          title="5. Mobile Navigation" 
          description={market === 'US' ? "US Market: Bottom nav optional. 'Saved' items prominent." : "India Market: WhatsApp integrated. Back button priority. 'Categories' bottom nav."}
        >
          <div className="flex justify-center gap-8 flex-wrap">
             <div className="w-[320px] h-[500px] border-[8px] border-gray-800 rounded-[30px] overflow-hidden bg-white flex flex-col shadow-2xl relative">
                <div className="h-6 bg-gray-900 w-full"></div>
                <div className="h-14 border-b flex items-center px-4 justify-between bg-white shrink-0 sticky top-0 z-10">
                  {market === 'US' ? (
                    <>
                      <Menu size={24} className="text-gray-700" />
                      <span className="font-bold text-lg tracking-tight">BRAND.</span>
                      <div className="flex gap-4"><Search size={24} className="text-gray-700" /><ShoppingCart size={24} className="text-gray-700" /></div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3"><ArrowLeft size={24} className="text-gray-800" /><div className="flex flex-col"><span className="text-sm font-semibold truncate w-32">Silk Kurta...</span></div></div>
                      <div className="flex gap-4"><Share2 size={22} className="text-gray-700" /><ShoppingCart size={22} className="text-gray-700" /></div>
                    </>
                  )}
                </div>
                <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
                   <div className="h-64 bg-gray-200 rounded-lg mb-4 animate-pulse relative overflow-hidden"><div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">Hero Image</div></div>
                   <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                   <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                   {market === 'India' && (
                     <div className="absolute bottom-20 right-4 bg-[#25D366] text-white p-3 rounded-full shadow-lg z-20 hover:scale-105 transition-transform cursor-pointer"><MessageCircle size={28} /></div>
                   )}
                </div>
                <div className="h-16 border-t bg-white flex items-center justify-around pb-2">
                  <div className="flex flex-col items-center gap-1 cursor-pointer"><Home size={20} style={{ color: brandColor }} /><span className="text-[10px] font-bold" style={{ color: brandColor }}>Home</span></div>
                  {market === 'US' ? (
                    <>
                      <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer"><Search size={20} /><span className="text-[10px]">Search</span></div>
                      <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer"><Heart size={20} /><span className="text-[10px]">Saved</span></div>
                    </>
                  ) : (
                    <>
                       <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer"><ShoppingBag size={20} /><span className="text-[10px]">Shop</span></div>
                       <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer"><MoreVertical size={20} /><span className="text-[10px]">Menu</span></div>
                    </>
                  )}
                  <div className="flex flex-col items-center gap-1 text-gray-400 cursor-pointer"><User size={20} /><span className="text-[10px]">Account</span></div>
                </div>
             </div>
          </div>
        </Section>

        {/* --- SECTION 6: FIT ASSURANCE --- */}
        <Section 
          title="6. Fit & Sizing Uncertainty" 
          description="Poor size guides are the #1 cause of returns. Design must bridge the gap between digital and physical."
          badge="Critical"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-6 border rounded-lg ${theme.bgColor}`}>
              <h3 className="font-bold mb-4 flex items-center gap-2"><Ruler size={18} /> The Solution</h3>
              {market === 'US' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm bg-gray-100 p-3 rounded">
                    <span className="text-gray-600">Fit Predictor:</span>
                    <span className="font-bold text-gray-900">82% say "True to Size"</span>
                  </div>
                  <button className="text-sm underline font-medium text-gray-600">What's my size?</button>
                  <p className="text-xs text-gray-500 mt-2">US users trust aggregated data and algorithmic recommendations.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-xs font-mono border rounded p-2 bg-white">
                    <div className="grid grid-cols-4 gap-2 border-b pb-1 font-bold mb-1">
                      <span>Size</span><span>Chest</span><span>Waist</span><span>Len</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-gray-600">
                      <span>M</span><span>40"</span><span>38"</span><span>42"</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#7c2d12] bg-red-50 p-2 rounded border border-red-100">
                    <Truck size={14} /> <span>Easy 7-day returns if it doesn't fit.</span>
                  </div>
                  <p className="text-xs text-gray-500">India users require explicit measurements (inches) and return assurance.</p>
                </div>
              )}
            </div>
            
            <div className="p-6 border rounded-lg bg-red-50 border-red-100 opacity-70">
              <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2"><AlertTriangle size={18} /> Poor Design (Avoid)</h3>
              <ul className="text-sm space-y-2 text-red-800 list-disc pl-4">
                <li>Hidden size chart (in accordion/tabs).</li>
                <li>Generic "S/M/L" without measurements.</li>
                <li>No model stats ("Model is 6'1 wearing M").</li>
                <li>Difficult return policy found only in footer.</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* --- SECTION 7: EXTREME CHECKOUT OPTIMIZATION (UPDATED) --- */}
        <Section 
          title="7. Optimized Checkout Experience" 
          description={market === 'US' ? "USA Strategy: Reduce clicks. Express checkout buttons (Apple Pay/Shop) must be visible immediately. Dynamic 'Free Shipping' bar gamifies the cart." : "India Strategy: Build Trust. OTP Login (No password). Cash on Delivery (COD) toggle. Explicit 'Delivery Date' reduces anxiety."}
          badge="New Trend"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
             
             {/* CHECKOUT UI SIMULATOR */}
             <div className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
                
                {/* 1. Header & Progress */}
                <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                   <div className="flex items-center gap-2">
                     <Lock size={14} className="text-green-600" />
                     <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Secure Checkout</span>
                   </div>
                   {market === 'US' && <span className="text-xs font-bold text-blue-600">Express Mode</span>}
                </div>

                {/* 2. Express Payment (USA) or OTP Login (India) */}
                <div className="p-6 pb-2">
                  {market === 'US' ? (
                     <div className="space-y-3">
                       <div className="grid grid-cols-3 gap-2">
                          <button className="bg-black text-white py-2.5 rounded-lg flex items-center justify-center font-semibold text-sm hover:opacity-80 transition"><span className="mr-1"></span>Pay</button>
                          <button className="bg-[#5A31F4] text-white py-2.5 rounded-lg flex items-center justify-center font-bold text-sm italic hover:opacity-80 transition">Shop</button>
                          <button className="bg-[#FFC439] text-black py-2.5 rounded-lg flex items-center justify-center font-bold text-sm hover:opacity-80 transition">PayPal</button>
                       </div>
                       <div className="relative flex py-2 items-center">
                          <div className="flex-grow border-t border-gray-200"></div>
                          <span className="flex-shrink-0 mx-2 text-gray-400 text-[10px] uppercase">Or pay with card</span>
                          <div className="flex-grow border-t border-gray-200"></div>
                       </div>
                     </div>
                  ) : (
                     <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-4">
                        <h4 className="font-bold text-sm text-blue-900 mb-2 flex items-center gap-2"><Smartphone size={16} /> Quick Login</h4>
                        <div className="flex gap-2">
                           <span className="bg-white border border-gray-300 rounded px-2 py-2 text-sm text-gray-500">+91</span>
                           <input type="text" placeholder="Enter Mobile Number" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                        </div>
                        <button className="w-full mt-2 bg-blue-600 text-white text-xs font-bold py-2 rounded">Send OTP</button>
                     </div>
                  )}
                </div>

                {/* 3. Address & Delivery */}
                <div className="px-6 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-gray-800 text-sm">Shipping Address</h4>
                    {market === 'US' && <span className="text-[10px] text-blue-600 cursor-pointer font-bold">Edit</span>}
                  </div>
                  
                  {market === 'US' ? (
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm text-gray-600 flex gap-3 items-start">
                       <MapPin size={16} className="mt-0.5 text-gray-400" />
                       <div>
                         <p className="font-medium text-gray-900">Jane Doe</p>
                         <p>123 Fashion Ave, Apt 4B</p>
                         <p>New York, NY 10001</p>
                       </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                       <button className="w-full border-2 border-dashed border-gray-300 text-gray-500 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-blue-300 transition text-sm">
                          <MapPin size={16} /> Detect my location
                       </button>
                    </div>
                  )}
                </div>

                {/* 4. Payment Methods (India Focus) */}
                {market === 'India' && (
                   <div className="px-6 py-4">
                      <h4 className="font-bold text-gray-800 text-sm mb-3">Payment Method</h4>
                      <div className="space-y-2">
                         <div 
                           className={`border p-3 rounded-lg flex items-center justify-between cursor-pointer transition ${paymentMethod === 'upi' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                           onClick={() => setPaymentMethod('upi')}
                         >
                            <div className="flex items-center gap-3">
                               <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'upi' ? 'border-green-600' : 'border-gray-400'}`}>
                                  {paymentMethod === 'upi' && <div className="w-2 h-2 bg-green-600 rounded-full"></div>}
                               </div>
                               <div>
                                  <p className="text-sm font-bold text-gray-900">UPI / Cards</p>
                                  <span className="text-[10px] text-green-700 font-bold bg-white px-1 rounded border border-green-200">EXTRA 5% OFF</span>
                               </div>
                            </div>
                         </div>
                         
                         <div 
                           className={`border p-3 rounded-lg flex items-center justify-between cursor-pointer transition ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                           onClick={() => setPaymentMethod('cod')}
                         >
                            <div className="flex items-center gap-3">
                               <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-blue-600' : 'border-gray-400'}`}>
                                  {paymentMethod === 'cod' && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                               </div>
                               <div>
                                  <p className="text-sm font-bold text-gray-900">Cash on Delivery</p>
                                  <p className="text-[10px] text-gray-500">+ ₹50 Handling Fee</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                )}

                {/* 5. Summary & Action */}
                <div className="p-6 bg-gray-50 border-t mt-2">
                   {market === 'US' && (
                     <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-bold text-green-700">Free Shipping Unlocked!</span>
                          <span className="text-gray-400"><span className="text-gray-900 font-bold">$129.00</span> / $100.00</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                           <div className="h-full bg-green-500 w-full"></div>
                        </div>
                     </div>
                   )}

                   {market === 'India' && (
                     <div className="flex items-start gap-2 mb-4">
                        <input type="checkbox" defaultChecked className="mt-1" />
                        <label className="text-xs text-gray-600">
                           Get order updates & delivery pin on <span className="font-bold text-green-600 flex items-center gap-1 inline-flex"><MessageCircle size={10} /> WhatsApp</span>
                        </label>
                     </div>
                   )}

                   <div className="flex justify-between items-center mb-4 text-sm">
                      <span className="text-gray-600">Total to pay</span>
                      <span className="font-bold text-xl">{market === 'US' ? '$129.00' : '₹1,799'}</span>
                   </div>

                   <button 
                     className="w-full py-4 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                     style={{ backgroundColor: brandColor }}
                   >
                      {market === 'US' ? (
                        <>Pay $129.00 <Fingerprint size={20} className="opacity-50" /></>
                      ) : (
                        <>{paymentMethod === 'cod' ? 'Place COD Order' : 'Pay via UPI'}</>
                      )}
                   </button>
                   
                   {market === 'India' && (
                      <p className="text-[10px] text-center text-gray-500 mt-3 flex items-center justify-center gap-1">
                         <Truck size={10} /> Get it by <span className="font-bold text-gray-700">Wed, 14 Oct</span>
                      </p>
                   )}
                </div>
             </div>

             {/* ANNOTATIONS PANEL */}
             <div className="flex-1 space-y-4">
               <h4 className="font-bold text-gray-900 border-b pb-2">Why this design wins:</h4>
               
               {market === 'US' ? (
                 <>
                   <div className="flex gap-3 items-start">
                     <div className="bg-blue-100 p-2 rounded text-blue-700"><Zap size={18} /></div>
                     <div>
                       <h5 className="font-bold text-sm">Express Dominance</h5>
                       <p className="text-xs text-gray-600">Showing Apple/Shop Pay at the top captures 60% of mobile traffic instantly without typing.</p>
                     </div>
                   </div>
                   <div className="flex gap-3 items-start">
                     <div className="bg-green-100 p-2 rounded text-green-700"><Gift size={18} /></div>
                     <div>
                       <h5 className="font-bold text-sm">Gamified Free Shipping</h5>
                       <p className="text-xs text-gray-600">Visual progress bars increase Average Order Value (AOV) by encouraging small add-ons.</p>
                     </div>
                   </div>
                 </>
               ) : (
                 <>
                   <div className="flex gap-3 items-start">
                     <div className="bg-blue-100 p-2 rounded text-blue-700"><Smartphone size={18} /></div>
                     <div>
                       <h5 className="font-bold text-sm">No-Password Login</h5>
                       <p className="text-xs text-gray-600">Mobile OTP login reduces drop-off by 35% compared to email/password forms.</p>
                     </div>
                   </div>
                   <div className="flex gap-3 items-start">
                     <div className="bg-orange-100 p-2 rounded text-orange-700"><AlertTriangle size={18} /></div>
                     <div>
                       <h5 className="font-bold text-sm">Smart COD Toggle</h5>
                       <p className="text-xs text-gray-600">Users love COD, but merchants hate returns. Highlighting "Extra 5% off" for UPI nudges prepaid behavior.</p>
                     </div>
                   </div>
                   <div className="flex gap-3 items-start">
                     <div className="bg-green-100 p-2 rounded text-green-700"><MessageCircle size={18} /></div>
                     <div>
                       <h5 className="font-bold text-sm">WhatsApp Reassurance</h5>
                       <p className="text-xs text-gray-600">Indian users rely on WhatsApp for tracking. This checkbox builds massive trust.</p>
                     </div>
                   </div>
                 </>
               )}
             </div>
          </div>
        </Section>

        {/* --- SECTION 8: CONVERSION KILLERS RANKED --- */}
        <Section 
          title="8. Conversion Killers: Ranked" 
          description="A hierarchical list of design flaws that negatively impact conversion rates, ordered from most critical to least critical."
          badge="Audit Tool"
        >
          <div className="space-y-4">
            <ConversionKillerItem 
              rank="1"
              title="Hidden Costs / Checkout Surprises"
              severity="high"
              market={market}
              problem="Showing shipping, tax, or handling fees only at the final step. Forces users to abandon."
              solution={market === 'US' ? "Free Shipping threshold banner (Spend $20 more). Auto-calculated tax." : "Transparent 'Final Price' on product page. COD handling fee explicit upfront."}
            />
             <ConversionKillerItem 
              rank="2"
              title="Forced Account Creation"
              severity="high"
              market={market}
              problem="Requiring a password/account before checkout. High friction barrier."
              solution={market === 'US' ? "Guest Checkout default. 'Create account later' option." : "Mobile Number Login (OTP) only. No email/password required."}
            />
            <ConversionKillerItem 
              rank="3"
              title="Slow Mobile Performance"
              severity="high"
              market={market}
              problem="Heavy images, layout shifts (CLS), or unclickable buttons on mobile."
              solution={market === 'US' ? "Skeleton loaders, optimized WebP images, 44px min touch targets." : "Aggressive compression, sticky bottom buttons, removal of scroll-jacking."}
            />
            <ConversionKillerItem 
              rank="4"
              title="Lack of Social Proof"
              severity="medium"
              market={market}
              problem="Product looks good but user doubts quality or authenticity."
              solution={market === 'US' ? "Editorial style 'As Seen In Vogue'. Verified Buyer badges." : "User-generated photos gallery. Influencer endorsement videos."}
            />
             <ConversionKillerItem 
              rank="5"
              title="Generic Stock Imagery"
              severity="medium"
              market={market}
              problem="Flat, lifeless photography that doesn't show fabric texture or scale."
              solution={market === 'US' ? "Video on hover. Diverse models. Close-up texture shots." : "Contextual lifestyle shots (Indian weddings/office). 360-degree view."}
            />
            <ConversionKillerItem 
              rank="6"
              title="Poor Search & Filtering"
              severity="low"
              market={market}
              problem="User can't find specific attributes (e.g., 'Cotton', 'Sleeve Length')."
              solution={market === 'US' ? "Predictive search, robust filters (Fabric, Occasion)." : "Visual filters (Icons for categories). Voice search enabled."}
            />
          </div>
        </Section>

      </div>
    </div>
  );
};

export default ConversionDesignSystem;