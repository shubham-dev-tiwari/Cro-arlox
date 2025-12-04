"use client";

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronDown, ChevronRight, Star, Heart, ShoppingBag, 
  Filter, ArrowRight, CheckCircle2, AlertCircle, Zap, Smartphone, 
  LayoutGrid, MousePointer2, Truck, CreditCard, ChevronLeft, Search, User,
  Gauge, Timer, Download, Share2, Settings, XCircle, Check, Eye, EyeOff,
  Maximize2, ArrowDown, SlidersHorizontal, ArrowUp, Users, FlaskConical, Beaker
} from 'lucide-react';

// --- Assets & Branding ---
const ArloxLogo = () => (
  <div className="flex items-center gap-2 font-bold text-2xl tracking-tight text-slate-900">
    <div className="relative w-8 h-8 group">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm transition-transform group-hover:scale-110 duration-300">
        <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="#0088FF" strokeWidth="8" />
        <path d="M50 25 L80 82 L20 82 Z" fill="#0088FF" className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </svg>
    </div>
    <span>Arlox.io</span>
  </div>
);

// --- Data & Content ---
const guidelines = {
  US: {
    hero: {
      rule: "NO Collection Banners",
      reason: "US users have high intent. Banners push products below the fold, increasing bounce rate by 15%.",
      layout: "Breadcrumb > Title > Description (Collapsed) > Filters"
    },
    filters: {
      type: "Sidebar (Left, Always Visible)",
      features: [
        "Size: Visual buttons (S, M, L)",
        "Color: 30px circles",
        "Price: Dual-handle slider",
        "Category: Checkboxes with count",
        "Sort: Top-right Dropdown (Featured default)"
      ]
    },
    grid: {
      desktop: "4 products per row (Maximize density)",
      mobile: "2 products per row",
      gap: "Generous (24px)",
      ratio: "3:4 or 1:1"
    },
    tile: {
      badges: "Top-left, minimalist (max 2)",
      interaction: "Hover: Image swap + Quick View",
      price: "Sale price prominent, old price smaller",
      actions: "Hover: Quick View, Wishlist"
    }
  },
  IN: {
    hero: {
      rule: "NO Collection Banners",
      reason: "On mobile (90% traffic), a banner consumes the entire first screen. Users engage 40% less if they don't see products immediately.",
      layout: "Breadcrumb > Title > Horizontal Pills"
    },
    filters: {
      type: "Mobile-First Drawer / Sticky Top Bar",
      features: [
        "Price: Preset buttons (Under ₹999)",
        "Discount: 50% & Above buttons",
        "Size: Large tap targets",
        "Delivery: 'Get it in 3 Days' checkbox",
        "Sort: Sticky Dropdown"
      ]
    },
    grid: {
      desktop: "5 products per row (High density)",
      mobile: "2 products per row",
      gap: "Compact (12px)",
      ratio: "3:4 (Portrait)"
    },
    tile: {
      badges: "Top-left & Top-right, Bold High Contrast",
      interaction: "No hover. Always visible 'Buy Now'",
      price: "Old price above, Sale price bold below",
      actions: "Heart icon, Add to Cart always visible"
    }
  }
};

const checklistItems = {
  high: [
    "NO Hero/Collection Banner Images (Push products up)",
    "Filters load instantly (<0.5s)",
    "Product count updates live",
    "Mobile filter button > 60px height",
    "Sale price 2x larger than original",
    "Stock status visible ('Only 2 Left')",
    "Color swatches update image"
  ],
  medium: [
    "Quick View works without redirect (US)",
    "Sticky Bottom Cart/Filter Bar (IN)",
    "Sort defaults to Best Selling/Featured",
    "Breadcrumbs implemented",
    "Recently viewed visible"
  ]
};

const abTests = [
  {
    month: "Month 1",
    focus: "Structure & Visibility",
    tests: [
      { name: "Grid Density", desc: "3 vs 4 columns (Desktop)" },
      { name: "Filter Position", desc: "Sidebar vs Top Bar" },
      { name: "Product Image", desc: "White BG vs Lifestyle" },
      { name: "Price Display", desc: "Size & Color variations" }
    ]
  },
  {
    month: "Month 2",
    focus: "Interaction & Logic",
    tests: [
      { name: "Sort Default", desc: "Featured vs Best Selling" },
      { name: "Badge Placement", desc: "Top-left vs Top-right" },
      { name: "Mobile Layout", desc: "2 vs 3 columns" },
      { name: "CTA Style", desc: "Add to Cart vs Quick Add" }
    ]
  },
  {
    month: "Month 3",
    focus: "Refinement",
    tests: [
      { name: "Pagination", desc: "Pagination vs Load More" },
      { name: "Filter Style", desc: "Checkbox vs Button vs Swatch" },
      { name: "Product Name", desc: "1 line vs 2 lines" },
      { name: "Wishlist", desc: "Heart Icon vs 'Save' Button" }
    ]
  }
];

// --- Components ---

const SectionTitle = ({ number, title, subtitle, isSpecial }) => (
  <div className="mb-12 relative group">
    <div className={`absolute -left-6 top-0 bottom-0 w-1.5 rounded-full transition-all duration-500 ${isSpecial ? 'bg-gradient-to-b from-orange-500 to-red-500 group-hover:w-2' : 'bg-gradient-to-b from-blue-500 to-blue-200 group-hover:w-2'}`}></div>
    <div className="">
      <div className={`font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2 ${isSpecial ? 'text-orange-600' : 'text-blue-600'}`}>
        <span className={`px-2 py-1 rounded text-[10px] ${isSpecial ? 'bg-orange-100' : 'bg-blue-100'}`}>
          {isSpecial ? 'CRITICAL RULE' : `Tier ${number}`}
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{title}</h2>
      <p className="text-slate-600 text-lg max-w-3xl leading-relaxed font-medium">{subtitle}</p>
    </div>
  </div>
);

const MarketToggle = ({ market, setMarket }) => (
  <div className="flex bg-white p-1.5 rounded-2xl w-fit mb-8 shadow-sm border border-slate-200">
    <button
      onClick={() => setMarket('US')}
      className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-4 ${
        market === 'US' 
          ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-100' 
          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50 scale-95'
      }`}
    >
      <span className="text-3xl">🇺🇸</span> 
      <div className="text-left">
        <div className="text-sm leading-none font-black tracking-wide">US MARKET</div>
        <div className="text-[10px] font-medium opacity-80 mt-1">High Trust • Minimal</div>
      </div>
    </button>
    <button
      onClick={() => setMarket('IN')}
      className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-4 ${
        market === 'IN' 
          ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-100' 
          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50 scale-95'
      }`}
    >
      <span className="text-3xl">🇮🇳</span> 
      <div className="text-left">
        <div className="text-sm leading-none font-black tracking-wide">INDIA MARKET</div>
        <div className="text-[10px] font-medium opacity-80 mt-1">High Urgency • Mobile First</div>
      </div>
    </button>
  </div>
);

// --- COMPONENT: Priority Stack Visualizer ---
const PriorityFilterStack = ({ market }) => {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden relative">
       {/* Header Bar */}
       <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <Filter size={18} className="text-slate-900"/>
             <span className="font-bold text-slate-900 uppercase tracking-wider text-sm">
                {market === 'US' ? 'Sidebar Architecture' : 'Drawer / Sticky Bar'}
             </span>
          </div>
          <div className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded">
             {market === 'US' ? 'Desktop View' : 'Mobile View'}
          </div>
       </div>

       <div className="p-6 md:p-8 space-y-8 bg-white relative">
          {/* Priority 1 */}
          <div className="relative pl-12 group">
             <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-lg z-10">1</div>
                <div className="w-0.5 flex-1 bg-slate-100 group-hover:bg-blue-100 transition-colors my-2"></div>
             </div>
             
             <div className="mb-2 flex items-center gap-2">
                <h4 className="font-bold text-slate-900 text-lg">
                   {market === 'US' ? 'Size' : 'Price (Budget)'}
                </h4>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200 px-1.5 rounded">Highest Impact</span>
             </div>

             {market === 'US' ? (
                // US Priority 1: Size Buttons
                <div className="flex gap-2">
                   {['XS', 'S', 'M', 'L', 'XL'].map((s, i) => (
                      <div key={s} className={`w-10 h-10 flex items-center justify-center rounded border font-medium text-sm transition-all cursor-pointer ${i === 2 ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'}`}>
                         {s}
                      </div>
                   ))}
                </div>
             ) : (
                // IN Priority 1: Price Pills
                <div className="flex flex-wrap gap-2">
                   {['Under ₹499', '₹500-999', '₹1000-1999'].map((p, i) => (
                      <div key={p} className={`px-4 py-2 rounded-full border text-xs font-bold transition-all cursor-pointer ${i === 0 ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600'}`}>
                         {p}
                      </div>
                   ))}
                </div>
             )}
          </div>

          {/* Priority 2 */}
          <div className="relative pl-12 group">
             <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 border-2 border-slate-100 flex items-center justify-center font-bold z-10 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">2</div>
                <div className="w-0.5 flex-1 bg-slate-100 group-hover:bg-blue-100 transition-colors my-2"></div>
             </div>

             <div className="mb-2">
                <h4 className="font-bold text-slate-900 text-lg">
                   {market === 'US' ? 'Color' : 'Discount %'}
                </h4>
             </div>

             {market === 'US' ? (
                // US Priority 2: Color Swatches
                <div className="flex gap-3">
                   {[
                      {c: 'bg-black', n: 'Black'}, 
                      {c: 'bg-blue-600', n: 'Blue'}, 
                      {c: 'bg-emerald-500', n: 'Green'}, 
                      {c: 'bg-red-500', n: 'Red'}, 
                      {c: 'bg-amber-100', n: 'Beige'}
                   ].map((swatch, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full ${swatch.c} ring-2 ring-offset-2 cursor-pointer transition-all hover:scale-110 ${i===1 ? 'ring-slate-300' : 'ring-transparent'}`} title={swatch.n}></div>
                   ))}
                </div>
             ) : (
                // IN Priority 2: Discount Buttons (High Vis)
                <div className="flex gap-3">
                   {['50% OFF', '30% OFF', '20% OFF'].map((d, i) => (
                      <div key={d} className={`px-3 py-1.5 rounded border-2 text-xs font-black transition-all cursor-pointer ${i === 0 ? 'border-red-500 bg-red-50 text-red-600' : 'border-slate-100 bg-white text-slate-400'}`}>
                         {d}
                      </div>
                   ))}
                </div>
             )}
          </div>

          {/* Priority 3 */}
          <div className="relative pl-12 group">
             <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 border-2 border-slate-100 flex items-center justify-center font-bold z-10 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">3</div>
                <div className="w-0.5 flex-1 bg-slate-100 group-hover:bg-blue-100 transition-colors my-2"></div>
             </div>

             <div className="mb-2">
                <h4 className="font-bold text-slate-900 text-lg">
                   {market === 'US' ? 'Price Range' : 'Size (Mobile)'}
                </h4>
             </div>

             {market === 'US' ? (
                // US Priority 3: Slider
                <div className="max-w-[200px] pt-4 pb-2">
                   <div className="h-1 bg-slate-200 rounded relative">
                      <div className="absolute left-1/4 right-1/4 h-full bg-slate-900 rounded"></div>
                      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-900 rounded-full shadow cursor-pointer hover:scale-110 transition-transform"></div>
                      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-900 rounded-full shadow cursor-pointer hover:scale-110 transition-transform"></div>
                   </div>
                   <div className="flex justify-between mt-3 text-xs font-bold text-slate-500">
                      <span>$50</span>
                      <span>$150</span>
                   </div>
                </div>
             ) : (
                // IN Priority 3: Size (Mobile Friendly)
                <div className="flex gap-2">
                   {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                      <div key={s} className="flex-1 aspect-square max-w-[40px] flex items-center justify-center rounded-lg border border-slate-200 bg-white font-bold text-xs text-slate-700 shadow-sm active:bg-slate-50">
                         {s}
                      </div>
                   ))}
                </div>
             )}
          </div>

          {/* Priority 4 - NEW ADDITION */}
          <div className="relative pl-12 group">
             <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 border-2 border-slate-100 flex items-center justify-center font-bold z-10 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">4</div>
             </div>

             <div className="mb-2">
                <h4 className="font-bold text-slate-900 text-lg">
                   {market === 'US' ? 'Category & Brand' : 'Logistics & Sub-Category'}
                </h4>
             </div>

             {market === 'US' ? (
                // US Priority 4: Category Checkboxes
                <div className="space-y-2">
                   <label className="flex items-center gap-2 cursor-pointer">
                      <div className="w-4 h-4 border border-slate-300 rounded bg-blue-600 border-blue-600 flex items-center justify-center text-white"><Check size={10}/></div>
                      <span className="text-sm text-slate-700 font-medium">Dresses (45)</span>
                   </label>
                   <label className="flex items-center gap-2 cursor-pointer opacity-70 hover:opacity-100">
                      <div className="w-4 h-4 border border-slate-300 rounded bg-white hover:border-slate-400"></div>
                      <span className="text-sm text-slate-700 font-medium">Jumpsuits (12)</span>
                   </label>
                </div>
             ) : (
                // IN Priority 4: Delivery & Categories
                <div className="space-y-4">
                   {/* Delivery Speed Filter */}
                   <label className="flex items-center gap-2 cursor-pointer p-2 border border-green-200 bg-green-50 rounded-lg w-fit">
                      <div className="w-4 h-4 border border-green-400 rounded bg-white flex items-center justify-center"></div>
                      <span className="text-xs text-green-800 font-bold flex items-center gap-1"><Truck size={12}/> Get it in 7 Days</span>
                   </label>
                   
                   {/* Category Pills */}
                   <div className="flex flex-wrap gap-2">
                      {['Casual', 'Formal', 'Ethnic', 'Western'].map((c) => (
                         <span key={c} className="px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                            {c}
                         </span>
                      ))}
                   </div>
                </div>
             )}
          </div>
       </div>

       {/* Floating Note */}
       <div className="absolute top-6 right-6 max-w-[150px] text-right hidden md:block">
          <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Why this order?</div>
          <p className="text-xs text-slate-600 leading-tight">
             {market === 'US' 
               ? "US users filter by Fit > Style > Price. They shop visually." 
               : "India users filter by Budget > Value > Fit. Price is the primary constraint."}
          </p>
       </div>
    </div>
  );
};

// --- NEW COMPONENT: Above the Fold Optimizer ---
const AboveTheFoldDemo = ({ market }) => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl">
           <h3 className="font-bold text-orange-900 text-lg mb-2 flex items-center gap-2">
             <AlertCircle size={20}/> The "No Banner" Rule
           </h3>
           <p className="text-orange-800 text-sm leading-relaxed mb-4">
             Collection banners are beautiful, but they destroy conversion. They push products—the thing users want to buy—below the fold.
           </p>
           <div className="flex items-center justify-between bg-white/50 p-4 rounded-lg">
              <span className="text-sm font-bold text-slate-700">Banner Enabled</span>
              <button 
                onClick={() => setShowBanner(!showBanner)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showBanner ? 'bg-red-500' : 'bg-slate-300'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${showBanner ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
           </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
           <div className={`p-4 rounded-xl border transition-all ${showBanner ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100 opacity-50'}`}>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">With Banner</div>
              <div className="text-2xl font-black text-slate-900">0 Products</div>
              <div className="text-xs text-slate-500">Visible immediately on Mobile</div>
           </div>
           <div className={`p-4 rounded-xl border transition-all ${!showBanner ? 'bg-green-50 border-green-200 shadow-md' : 'bg-slate-50 border-slate-100 opacity-50'}`}>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Without Banner</div>
              <div className="text-2xl font-black text-slate-900">4 Products</div>
              <div className="text-xs text-slate-500">Visible immediately on Mobile</div>
           </div>
        </div>
      </div>

      {/* Visual Simulation */}
      <div className="relative mx-auto border-[8px] border-slate-800 rounded-[2.5rem] overflow-hidden bg-white shadow-2xl h-[550px] w-[300px]">
        {/* Status Bar */}
        <div className="h-6 bg-slate-900 w-full"></div>
        
        {/* Header */}
        <div className="bg-white border-b border-slate-100 p-3 flex justify-between items-center sticky top-0 z-20">
           <ChevronLeft size={20} />
           <span className="font-bold text-sm">Summer Dresses</span>
           <Search size={20} />
        </div>

        <div className="overflow-y-auto h-full pb-20 relative bg-slate-50">
           {/* THE BANNER (Toggleable) */}
           <div className={`transition-all duration-500 overflow-hidden relative ${showBanner ? 'h-48' : 'h-0'}`}>
              <div className="absolute inset-0 bg-slate-800 flex items-center justify-center flex-col text-white p-4 text-center">
                 <span className="font-bold text-lg mb-2">Beautiful but Useless</span>
                 <p className="text-xs text-slate-300">I am taking up valuable screen real estate. Users are scrolling past me right now.</p>
                 <div className="mt-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Conversion Killer</div>
              </div>
           </div>

           {/* Filter Bar */}
           <div className="sticky top-0 z-10 bg-white p-2 flex gap-2 border-b border-slate-100 shadow-sm overflow-x-auto whitespace-nowrap hide-scrollbar">
              <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-[10px] font-bold">Filter</span>
              <span className="border px-3 py-1 rounded-full text-[10px]">Price</span>
              <span className="border px-3 py-1 rounded-full text-[10px]">Size</span>
              <span className="border px-3 py-1 rounded-full text-[10px]">Color</span>
           </div>

           {/* Products */}
           <div className="grid grid-cols-2 gap-2 p-2">
              {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="bg-white p-2 rounded shadow-sm">
                    <div className="aspect-[3/4] bg-slate-200 rounded mb-2 relative">
                       {/* Overlay to show visibility */}
                       {showBanner && i <= 2 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs font-bold text-center p-2">
                             Below Fold
                          </div>
                       )}
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded mb-1"></div>
                    <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
                 </div>
              ))}
           </div>
        </div>

        {/* Fold Line Indicator */}
        <div className="absolute top-[80%] left-0 right-0 border-t-2 border-dashed border-red-500 pointer-events-none z-30">
           <span className="absolute -top-3 right-2 bg-red-500 text-white text-[9px] font-bold px-1 rounded">THE FOLD</span>
        </div>
      </div>
    </div>
  )
}

const InteractiveProductCard = ({ market }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOnSale, setIsOnSale] = useState(true);
  const [isLowStock, setIsLowStock] = useState(market === 'IN');

  const usPrice = (
    <div className="flex items-baseline gap-2 mt-2">
      <span className={`${isOnSale ? 'text-red-600' : 'text-slate-900'} font-black text-lg`}>
        {isOnSale ? '$89' : '$129'}
      </span>
      {isOnSale && <span className="text-slate-400 text-sm line-through decoration-slate-300">$129</span>}
    </div>
  );

  const inPrice = (
    <div className="flex flex-col mt-2">
      <div className="flex items-center gap-2">
        <span className="text-slate-900 font-black text-xl">{isOnSale ? '₹999' : '₹1,999'}</span>
        {isOnSale && <span className="text-orange-600 text-[10px] font-bold bg-orange-100 px-1.5 py-0.5 rounded border border-orange-100">-50%</span>}
      </div>
      {isOnSale && <span className="text-slate-400 text-xs line-through decoration-slate-300">MRP ₹1,999</span>}
    </div>
  );

  return (
    <div className="flex flex-col xl:flex-row gap-12 items-center justify-center">
      {/* Product Card Preview */}
      <div className="w-full max-w-[300px] group perspective-1000">
        <div className={`bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 relative ${isHovered && market === 'US' ? 'shadow-2xl -translate-y-1 border-blue-100' : 'hover:shadow-lg shadow-sm'}`}>
          
          {/* Image Area */}
          <div 
            className="relative aspect-[3/4] bg-slate-100 overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main Image */}
            <div className={`w-full h-full transition-opacity duration-500 flex items-center justify-center text-slate-300 bg-slate-50
              ${market === 'US' && isHovered ? 'opacity-0' : 'opacity-100'}`}
            >
              <div className="text-center">
                <div className="mx-auto w-20 h-20 mb-4 rounded-full bg-white shadow-sm flex items-center justify-center">
                  <ShoppingBag size={32} className="text-slate-300"/>
                </div>
                <span className="font-bold text-slate-400 tracking-wide text-sm">Product Front</span>
              </div>
            </div>

            {/* Hover Image (US Only) */}
            {market === 'US' && (
              <div className={`absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-500 transition-opacity duration-500
                ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              >
                 <span className="font-bold tracking-wide text-slate-600">Model Shot (Context)</span>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
              {market === 'US' ? (
                <>
                  <span className="bg-white/95 backdrop-blur text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest text-slate-900 shadow-sm border border-slate-100">New</span>
                  {isOnSale && <span className="bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold px-2.5 py-1 uppercase tracking-widest">Sale</span>}
                </>
              ) : (
                <>
                  {isOnSale && <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm border-l-4 border-red-800">50% OFF</span>}
                  <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm border-l-4 border-green-800">COD ✓</span>
                </>
              )}
            </div>

            {/* India: Low Stock Badge */}
            {market === 'IN' && isLowStock && (
              <div className="absolute top-3 right-3">
                 <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm animate-pulse flex items-center gap-1 border border-white/20">
                    <Timer size={10} /> Only 2 Left!
                  </span>
              </div>
            )}

            {/* US: Hover Actions */}
            {market === 'US' && (
               <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ease-out transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                 <button className="w-full bg-white text-slate-900 py-3 text-xs font-bold uppercase tracking-widest shadow-xl hover:bg-slate-50 border border-slate-100 rounded">
                   Quick View
                 </button>
               </div>
            )}

            {/* Wishlist Button */}
            <button className={`absolute top-3 right-3 p-2.5 rounded-full transition-all duration-300
              ${market === 'US' 
                ? `bg-white/90 hover:bg-white text-slate-400 hover:text-red-500 shadow-sm ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}` 
                : 'bg-white/80 text-slate-600 backdrop-blur-sm'
              }`}>
              <Heart size={18} />
            </button>
          </div>

          {/* Info Area */}
          <div className="p-5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Arlox Basics</div>
            
            <h3 className={`font-bold text-slate-900 leading-snug mb-2 ${market === 'US' ? 'truncate text-base' : 'line-clamp-2 text-sm'}`}>
              Summer Breeze Cotton Linen Blend Dress
            </h3>

            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
              </div>
              <span className="text-xs text-slate-400 font-medium ml-1">
                {market === 'US' ? '(234 Reviews)' : '(2.1K)'}
              </span>
            </div>

            {market === 'US' ? usPrice : inPrice}

            <div className="flex gap-2 mt-4">
               {['bg-slate-900', 'bg-blue-600', 'bg-red-500'].map((color, i) => (
                 <button key={i} className={`w-6 h-6 rounded-full ${color} ring-1 ring-offset-2 transition-all ${i===0 ? 'ring-slate-300 scale-110' : 'ring-transparent hover:scale-110'}`} />
               ))}
               {market === 'US' && <span className="text-[10px] text-slate-400 ml-1 mt-1 font-medium">+2 more</span>}
            </div>
            
            {/* India: Extra Info (Social Proof & Size) */}
            {market === 'IN' && (
              <div className="mt-3 border-t border-slate-100 pt-2 space-y-1">
                 <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                   S, M, L, XL, XXL available
                 </div>
                 <div className="text-[10px] text-purple-700 font-black flex items-center gap-1">
                    <Users size={12} /> 128 people bought recently
                 </div>
              </div>
            )}

            {/* India: Bottom Actions */}
            {market === 'IN' && (
              <div className="mt-3 pt-2 border-t border-slate-100 flex gap-2">
                <button className="flex-1 bg-white border border-slate-200 text-slate-900 py-2.5 text-[10px] font-black uppercase rounded hover:bg-slate-50 transition-colors">
                  Add to Cart
                </button>
                <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 text-[10px] font-black uppercase rounded hover:opacity-90 transition-opacity shadow-md shadow-orange-200">
                  Buy Now
                </button>
              </div>
            )}
            
            {market === 'IN' && (
              <div className="mt-3 flex items-center gap-1.5 text-[10px] text-green-700 font-bold bg-green-50 w-full justify-center py-1 rounded">
                <Truck size={12} /> Free Express Delivery
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Simulator Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl w-full max-w-[280px]">
        <div className="flex items-center gap-2 mb-6 text-slate-900 font-black text-xs uppercase tracking-widest border-b border-slate-100 pb-3">
          <Settings size={14} className="text-blue-500"/> Simulator Controls
        </div>
        
        <div className="space-y-5">
          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm text-slate-600 font-bold group-hover:text-slate-900 transition-colors">Sale Active</span>
            <div onClick={() => setIsOnSale(!isOnSale)} className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${isOnSale ? 'bg-blue-600' : 'bg-slate-200'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${isOnSale ? 'left-6' : 'left-1'}`} />
            </div>
          </label>

          <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm text-slate-600 font-bold group-hover:text-slate-900 transition-colors">Low Stock Urgency</span>
            <div onClick={() => setIsLowStock(!isLowStock)} className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${isLowStock ? 'bg-orange-500' : 'bg-slate-200'}`}>
               <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${isLowStock ? 'left-6' : 'left-1'}`} />
            </div>
          </label>

          <div className="text-[10px] text-slate-400 italic pt-2 border-t border-slate-100">
             Tip: Watch how the price hierarchy changes. India prioritizes discount % over the final price.
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: A/B Test List ---
const ABTestList = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {abTests.map((phase, i) => (
        <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg relative overflow-hidden group hover:border-blue-300 transition-all">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <div className="mb-6">
             <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{phase.month}</div>
             <h3 className="text-xl font-bold text-slate-900">{phase.focus}</h3>
          </div>
          <ul className="space-y-4">
             {phase.tests.map((test, j) => (
                <li key={j} className="flex gap-3">
                   <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 border border-blue-100">{j+1}</div>
                   <div>
                      <div className="font-bold text-sm text-slate-800">{test.name}</div>
                      <div className="text-xs text-slate-500">{test.desc}</div>
                   </div>
                </li>
             ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

const ChecklistItem = ({ text, type }) => {
  const [checked, setChecked] = useState(false);
  
  return (
    <div 
      onClick={() => setChecked(!checked)}
      className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border group ${
        checked 
          ? 'bg-blue-50/80 border-blue-200 shadow-inner' 
          : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-md'
      }`}
    >
      <div className={`mt-0.5 rounded-full p-1 transition-colors duration-300 ${checked ? 'text-white bg-blue-500' : 'text-slate-300 bg-slate-100 group-hover:bg-slate-200'}`}>
        <Check size={14} strokeWidth={4} />
      </div>
      <div className="flex-1">
        <span className={`text-sm block leading-relaxed ${checked ? 'text-slate-900 font-semibold decoration-blue-500/30' : 'text-slate-600 font-medium'}`}>{text}</span>
        {type === 'high' && !checked && (
          <span className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-100">
            <AlertCircle size={10} /> High Impact
          </span>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function ArloxDesignPlaybook() {
  const [activeMarket, setActiveMarket] = useState('US');
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['tier0', 'tier1', 'tier2', 'tier3', 'perf'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= (el.offsetTop - 300)) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 pb-32">
      
      {/* --- Sticky Side Nav --- */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden 2xl:flex flex-col gap-6 z-50">
        {[
          {id: 'tier0', icon: Eye, label: 'Above Fold'},
          {id: 'tier1', icon: Filter, label: 'Filtering'},
          {id: 'tier2', icon: LayoutGrid, label: 'Product Tile'},
          {id: 'tier3', icon: Smartphone, label: 'Mobile UX'},
          {id: 'perf', icon: Zap, label: 'Speed'},
          {id: 'abtest', icon: FlaskConical, label: 'A/B Tests'},
          {id: 'checklist', icon: CheckCircle2, label: 'Checklist'},
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`p-4 rounded-2xl shadow-lg transition-all duration-300 group relative flex items-center justify-center
              ${activeSection === item.id ? 'bg-slate-900 text-white scale-110 ring-4 ring-slate-100' : 'bg-white text-slate-400 hover:text-blue-600 hover:scale-105'}`}
          >
            <item.icon size={22} strokeWidth={activeSection === item.id ? 2.5 : 2} />
            <span className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* --- Hero --- */}
      <div className="pt-24 pb-24 px-6 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest mb-10 shadow-xl shadow-slate-200">
            <Zap size={12} fill="currentColor" className="text-yellow-400" /> Official Arlox.io Standard
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Perfect</span><br/>
            Collection Page
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-12 max-w-3xl mx-auto font-medium">
            Collection pages are the highest intent pages on your site. 
            <br className="hidden md:block"/> We optimize them for speed, clarity, and ruthlessly removing friction.
          </p>
          
          <MarketToggle market={activeMarket} setMarket={setActiveMarket} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        
        {/* --- TIER 0: ABOVE THE FOLD --- */}
        <section id="tier0" className="scroll-mt-32">
          <SectionTitle 
            number="0" 
            title="The Golden Pixel Rule" 
            subtitle="The single biggest conversion killer is a large collection banner image. It wastes valuable real estate and pushes products below the fold."
            isSpecial={true}
          />
          <AboveTheFoldDemo market={activeMarket} />
        </section>

        {/* --- TIER 1: FILTERING (ENHANCED VISUALS) --- */}
        <section id="tier1" className="scroll-mt-32">
          <SectionTitle 
            number="1" 
            title="Filtering Architecture" 
            subtitle={activeMarket === 'US' ? "US users expect desktop precision. Always-visible sidebars reduce clicks." : "India is 90% mobile. Filters must be budget-focused and accessible via sticky bars."}
          />
          
          <div className="grid lg:grid-cols-2 gap-16 items-start">
             {/* New Visual Stack */}
             <PriorityFilterStack market={activeMarket} />
            
            <div className="space-y-8">
               <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  <h3 className="font-bold text-2xl mb-6 flex items-center gap-3">
                    <MousePointer2 className="text-blue-400" size={28} /> Interaction Rules
                  </h3>
                  <div className="space-y-4">
                     <div className="flex gap-4">
                        <CheckCircle2 className="text-green-400 shrink-0 mt-1" />
                        <div>
                           <p className="font-bold text-lg mb-1">{activeMarket === 'US' ? 'Instant Results' : 'Sticky Buttons'}</p>
                           <p className="text-slate-400 text-sm leading-relaxed">
                              {activeMarket === 'US' ? 'Never require an "Apply" button click on desktop. Updates must be sub-500ms.' : 'Filter button must be sticky at the bottom or top. It must be thumb-accessible.'}
                           </p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <CheckCircle2 className="text-green-400 shrink-0 mt-1" />
                        <div>
                           <p className="font-bold text-lg mb-1">{activeMarket === 'US' ? 'Visual Priority' : 'Price First'}</p>
                           <p className="text-slate-400 text-sm leading-relaxed">
                              {activeMarket === 'US' ? 'Size and Color must be visible buttons, not hidden in dropdowns.' : 'Budget is the #1 constraint. Expose price filters as one-tap pills.'}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* --- TIER 2: PRODUCT TILE --- */}
        <section id="tier2" className="scroll-mt-32">
          <SectionTitle 
            number="2" 
            title="The Perfect Product Tile" 
            subtitle="This rectangle is where the money is made. It needs to convey Trust (US) or Value (India) in under 1 second."
          />

          <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-200 relative overflow-hidden">
             <div className="text-center mb-12 relative z-10">
                <span className="bg-white border border-slate-200 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-sm">
                  Interactive Lab
                </span>
             </div>
             <InteractiveProductCard market={activeMarket} />
          </div>
        </section>

        {/* --- TIER 3: MOBILE --- */}
        <section id="tier3" className="scroll-mt-32">
           <SectionTitle 
             number="3" 
             title="Mobile Optimization" 
             subtitle="If it doesn't work on a $150 Android phone on 4G, it doesn't work."
           />
           
           <div className="grid lg:grid-cols-3 gap-16">
              {/* Phone Mockup */}
              <div className="border-[10px] border-slate-900 rounded-[3rem] overflow-hidden bg-white shadow-2xl relative h-[700px] w-full max-w-[360px] mx-auto lg:col-span-1 ring-8 ring-slate-100">
                 {/* Header */}
                 <div className="bg-white border-b border-slate-100 p-4 sticky top-0 z-20 flex justify-between items-center shadow-sm">
                    <ChevronLeft size={24} />
                    <span className="font-bold text-slate-900">Women's Kurtas</span>
                    <div className="flex gap-4">
                       <Search size={22} />
                       <ShoppingBag size={22} />
                    </div>
                 </div>

                 {/* No Banner Area (Just Filters) */}
                 <div className="sticky top-[60px] z-10 bg-white p-3 flex gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar border-b border-slate-50">
                    <button className="flex items-center gap-1.5 bg-slate-900 text-white px-4 py-2 rounded-full font-bold shadow-lg text-xs">
                       <Filter size={12} /> Filter
                    </button>
                    {['Price', 'Size', 'Color', 'Fabric'].map(f => (
                       <button key={f} className="border border-slate-200 bg-white px-4 py-2 rounded-full text-xs font-medium text-slate-700">
                          {f} <ChevronDown size={10} className="inline ml-1"/>
                       </button>
                    ))}
                 </div>

                 {/* Product Grid */}
                 <div className="grid grid-cols-2 gap-3 p-3 pb-32 overflow-y-auto h-full bg-slate-50">
                    {[1,2,3,4,5,6].map(i => (
                       <div key={i} className="bg-white rounded-lg p-2 shadow-sm">
                          <div className="aspect-[3/4] bg-slate-200 rounded mb-2 relative overflow-hidden">
                             {activeMarket === 'IN' && i === 1 && (
                                <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">50% OFF</div>
                             )}
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded mb-1"></div>
                          <div className="h-2 w-2/3 bg-slate-100 rounded mb-3"></div>
                          {activeMarket === 'IN' && (
                             <button className="w-full bg-white border border-slate-200 text-slate-900 text-[10px] font-black py-2 rounded uppercase">
                                Add to Cart
                             </button>
                          )}
                       </div>
                    ))}
                 </div>

                 {/* Sticky Bottom Nav (India Only) */}
                 {activeMarket === 'IN' && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex justify-between items-center z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                       <div className="flex flex-col items-center text-[9px] font-bold text-slate-500 uppercase tracking-wide gap-1">
                          <Heart size={20} className="text-slate-400"/> Wishlist
                       </div>
                       <div className="w-px h-8 bg-slate-200 mx-2"></div>
                       <button className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-bold text-xs shadow-xl flex items-center justify-center gap-2">
                          <ShoppingBag size={14} /> View Cart (2)
                       </button>
                    </div>
                 )}
              </div>

              {/* Rules List */}
              <div className="lg:col-span-2 space-y-8">
                 <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-2xl mb-8">Mobile Navigation Strategy</h3>
                    <div className="grid sm:grid-cols-2 gap-8">
                       <div className="bg-slate-50 p-6 rounded-2xl">
                          <div className="text-xs font-black uppercase tracking-widest text-blue-500 mb-3">Header Area</div>
                          <ul className="space-y-3 text-sm font-medium text-slate-700">
                             <li className="flex items-center gap-2"><Check className="text-green-500" size={16}/> Sticky Header</li>
                             <li className="flex items-center gap-2"><Check className="text-green-500" size={16}/> Back Button (Essential)</li>
                             <li className="flex items-center gap-2"><Check className="text-green-500" size={16}/> Cart Icon with Badge</li>
                          </ul>
                       </div>
                       <div className="bg-slate-50 p-6 rounded-2xl">
                          <div className="text-xs font-black uppercase tracking-widest text-blue-500 mb-3">Sticky Elements</div>
                          <ul className="space-y-3 text-sm font-medium text-slate-700">
                             <li className="flex items-center gap-2"><Check className="text-green-500" size={16}/> Filter Bar (Top or Bottom)</li>
                             <li className="flex items-center gap-2"><Check className="text-green-500" size={16}/> "Add to Cart" Feedback</li>
                             {activeMarket === 'IN' && <li className="flex items-center gap-2"><Check className="text-green-500" size={16}/> Bottom Checkout Bar</li>}
                          </ul>
                       </div>
                    </div>
                 </div>

                 <div className="bg-red-50 p-8 rounded-[2rem] border border-red-100">
                    <h3 className="font-bold text-lg text-red-800 mb-4 flex items-center gap-2">
                       <AlertCircle size={20}/> The 2-Column Rule
                    </h3>
                    <p className="text-red-900/80 leading-relaxed">
                       Never use 1 product per row (too much scrolling) or 3 products per row (images too small). 
                       <span className="font-bold"> 2 products per row is the mathematical optimum</span> for image visibility and scroll depth.
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* --- PERFORMANCE --- */}
        <section id="perf" className="scroll-mt-32">
          <SectionTitle 
             number="4" 
             title="Performance Benchmarks" 
             subtitle="Speed is a feature. Miss these targets and conversion drops 20%."
          />
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden">
             <div className="grid md:grid-cols-3 gap-12 text-center relative z-10">
                <div>
                   <div className="text-6xl font-black mb-2 text-green-400">2.5s</div>
                   <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Max Load Time</div>
                </div>
                <div>
                   <div className="text-6xl font-black mb-2 text-blue-400">50kb</div>
                   <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Max Image Size</div>
                </div>
                <div>
                   <div className="text-6xl font-black mb-2 text-purple-400">0.1s</div>
                   <div className="text-sm font-bold uppercase tracking-widest text-slate-500">Filter Response</div>
                </div>
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[100px] rounded-full"></div>
          </div>
        </section>

        {/* --- A/B TESTS --- */}
        <section id="abtest" className="scroll-mt-32">
          <SectionTitle 
             number="5" 
             title="A/B Test Priority" 
             subtitle="Don't guess. Follow this scientifically proven roadmap for optimization."
          />
          <ABTestList />
        </section>

        {/* --- CHECKLIST --- */}
        <section id="checklist" className="scroll-mt-32">
           <div className="bg-white rounded-[3rem] p-12 border border-slate-200 shadow-xl">
              <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">Launch Readiness Checklist</h2>
              <div className="grid md:grid-cols-2 gap-16">
                 <div>
                    <div className="flex items-center gap-3 mb-6 p-3 bg-red-50 rounded-xl w-fit">
                       <AlertCircle className="text-red-600" size={20} />
                       <span className="text-red-800 font-bold uppercase tracking-widest text-xs">High Priority</span>
                    </div>
                    <div className="space-y-4">
                       {checklistItems.high.map((item, i) => <ChecklistItem key={i} text={item} type="high" />)}
                    </div>
                 </div>
                 <div>
                    <div className="flex items-center gap-3 mb-6 p-3 bg-blue-50 rounded-xl w-fit">
                       <CheckCircle2 className="text-blue-600" size={20} />
                       <span className="text-blue-800 font-bold uppercase tracking-widest text-xs">Medium Priority</span>
                    </div>
                    <div className="space-y-4">
                       {checklistItems.medium.map((item, i) => <ChecklistItem key={i} text={item} type="medium" />)}
                    </div>
                 </div>
              </div>
           </div>
        </section>

      </main>

    </div>
  );
}