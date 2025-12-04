"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Globe,
  Smartphone,
  ShieldCheck,
  ShoppingBag,
  Zap,
  Menu,
  Search,
  CheckCircle2,
  LayoutTemplate,
  Truck,
  MessageCircle,
  MapPin,
  Grid,
  Users,
  WifiOff,
} from "lucide-react";

/* -------------------------
   DATA SOURCE (unchanged)
   ------------------------- */
const content = {
  hero: {
    id: "hero",
    tier: "Tier 1",
    title: "Visual Content & Hero",
    icon: <LayoutTemplate className="w-5 h-5" />,
    desc: "First 3-5 seconds of engagement.",
    us: {
      imageStrategy: "High-Res Lifestyle (1920x1080px)",
      layout: "Clean, Cinematic, Full-width. Minimal text overlay.",
      video: "Auto-play, muted, 5-15s loop. Aspirational settings.",
      checklist: [
        "High-resolution hero image/video (min 1920px width)",
        "Lifestyle photography showing product in context",
        "Value prop headline (max 7-10 words)",
        "Primary CTA: High contrast, action-oriented",
        "Minimal sticky top bar",
      ],
      insight:
        "US users prioritize lifestyle context and brand storytelling over dense information.",
    },
    india: {
      imageStrategy: "Mobile-First Vertical (9:16)",
      layout: "Dense, High-Information. Reels-style content integration.",
      video: "Creator-led Reels grid or Vertical Brand Video.",
      checklist: [
        "Mobile-optimized vertical hero (9:16 priority)",
        "File size <450KB (Optimized for 4G)",
        "Local models & relatable scenarios",
        "Dual CTA: 'Shop Now' + 'COD Available' badge",
        "Promotional banners prominent (Sale/Festive)",
      ],
      insight:
        "Premium India users engage heavily with 'Reels' style video content and expect clear deal visibility immediately.",
    },
  },
  nav: {
    id: "nav",
    tier: "Tier 2",
    title: "Info Architecture",
    icon: <Menu className="w-5 h-5" />,
    desc: "Navigation and search hierarchy.",
    us: {
      imageStrategy: "Clean Mega Menu",
      layout: "Logo Left, Menu Center, Icons Right.",
      checklist: [
        "Sticky header (always visible)",
        "Mega menu with visual category tiles",
        "Predictive search with thumbnails",
        "Cart icon with hover preview",
      ],
      insight:
        "Frictionless navigation is key. US users expect standard patterns and predictive search.",
    },
    india: {
      imageStrategy: "Mobile Accordion + Trust Strip",
      layout: "Hamburger Left. Payment Trust Strip visible.",
      checklist: [
        "Sticky header with Payment/Trust strip",
        "Hamburger menu (left) for space efficiency",
        "'Shop by Price' filter prominent",
        "Vernacular search support",
        "WhatsApp support icon in header",
      ],
      insight:
        "Indian users often navigate by price bands or offers first. 'Shop by Price' is a high-click feature.",
    },
  },
  trust: {
    id: "trust",
    tier: "Tier 3",
    title: "Trust & Urgency",
    icon: <ShieldCheck className="w-5 h-5" />,
    desc: "Badges, Security, and Social Proof.",
    us: {
      imageStrategy: "Subtle & Professional",
      layout: "Minimalist badge bar below hero.",
      checklist: [
        "SSL / Security Badges (Norton, McAfee)",
        "Free Shipping Threshold ($75+)",
        "30-Day Free Returns",
        "Press Mentions (Vogue, GQ logos)",
      ],
      insight:
        "Trust is communicated through design quality and recognized third-party logos (Press/Security).",
    },
    india: {
      imageStrategy: "Explicit & Reassuring",
      layout: "Prominent Pincode Check & COD Badges.",
      checklist: [
        "Cash on Delivery Available (Green Check)",
        "Pincode Availability Checker",
        "Easy Returns / Exchange Policy",
        "Whatsapp Support Button",
        "'Pay Online & Save Extra' incentives",
      ],
      insight:
        "Uncertainty is the conversion killer. Pincode checks and COD availability must be visible upfront.",
    },
  },
  body: {
    id: "body",
    tier: "Tier 4",
    title: "Body Strategy",
    icon: <Grid className="w-5 h-5" />,
    desc: "Collections, Categories & Bestsellers.",
    us: {
      imageStrategy: "Clean Carousel & Hover Effects",
      layout: "Horizontal Carousels. 3-4 Column Grids.",
      checklist: [
        "Bestsellers: Horizontal Carousel (8-12 products)",
        "Hover: Show 2nd lifestyle image + Quick View",
        "Collection Hierarchy: New Arrivals > Trending",
        "Category Grid: Lifestyle photos (Model wearing item)",
      ],
      insight:
        "US users prefer browsing via carousels to maintain position. Hover effects are crucial for desktop UX.",
    },
    india: {
      imageStrategy: "Vertical Scroll & Dense Grids",
      layout: "Grid View (No Carousels). 2-Col Mobile.",
      checklist: [
        "Bestsellers: Grid View (Users hate swiping to see options)",
        "Product Tiles: Add to Cart visible (No hover needed)",
        "Collection Hierarchy: Sale/Offers > New Arrivals",
        "Category Grid: 'Starting ₹299' price text on tiles",
        "Stock Scarcity: 'Only 2 Left' indicators",
      ],
      insight:
        "Indian users want to see ALL options at a glance (Grid). Carousels hide products. Show prices upfront.",
    },
  },
  social: {
    id: "social",
    tier: "Tier 5",
    title: "Social Proof",
    icon: <Users className="w-5 h-5" />,
    desc: "UGC, Reviews, and Testimonials.",
    us: {
      imageStrategy: "Curated Aesthetic Feed",
      layout: "Shop Our Instagram Grid. Professional Headshots.",
      checklist: [
        "Section: 'Shop Our Instagram' or 'Style Inspiration'",
        "Testimonials: 3 with professional headshots",
        "Interaction: Click image -> Product Tags",
        "Aesthetic: Cohesive color palette",
      ],
      insight:
        "Social proof in the US is about 'Lifestyle Inspiration'. It must look curated and on-brand.",
    },
    india: {
      imageStrategy: "Real & Raw Validation",
      layout: "Real Customer Photos. City Names.",
      checklist: [
        "Section: 'Real Customers, Real Style'",
        "Testimonials: Real photos (non-pro) + City Name",
        "Content: 'Verified Purchase' badges are mandatory",
        "Influencer: Micro-influencers (relatable)",
        "Purchase Notifications: 'Rahul from Delhi bought...'",
      ],
      insight:
        "In India, 'Raw' = 'Real'. Polished photos can look fake. City names build regional trust.",
    },
  },
  conversion: {
    id: "conversion",
    tier: "Tier 6",
    title: "Conversion Features",
    icon: <ShoppingBag className="w-5 h-5" />,
    desc: "Buttons, Popups, and Offers.",
    us: {
      imageStrategy: "Soft Urgency",
      layout: "Exit-intent popups, Stock indicators.",
      checklist: [
        "Exit-intent popup (10% Off)",
        "Quick View on hover",
        "Subtle stock indicators ('Low Stock')",
        "Countdown only for major holidays",
      ],
      insight:
        "Avoid aggressive countdowns. Use 'Low Stock' to create genuine scarcity without feeling spammy.",
    },
    india: {
      imageStrategy: "High-Velocity Triggers",
      layout: "Sticky Bottom Bar, Direct Buy Buttons.",
      checklist: [
        "Sticky 'Buy Now' / 'Add to Cart' bottom bar",
        "WhatsApp Opt-in for exclusive deals",
        "Bold Urgency ('Only 2 Left', 'Sale Ends in...')",
        "Direct 'Buy Now' skips cart",
      ],
      insight:
        "Premium India users love 'WhatsApp' integration for deals and service. They pay online for specific incentives.",
    },
  },
  mobile: {
    id: "mobile",
    tier: "Tier 7",
    title: "Mobile & Speed",
    icon: <Smartphone className="w-5 h-5" />,
    desc: "Optimizations and Benchmarks.",
    us: {
      imageStrategy: "Progressive Loading",
      layout: "Thumb Zone: Center/Bottom Third.",
      checklist: [
        "Load Time: <3s Mobile",
        "Thumb Zone: Key CTAs in easy reach",
        "Tap Targets: Min 44x44px",
        "Sticky Header + Add to Cart",
      ],
      insight: "US networks are fast, but patience is low. Ensure progressive image loading.",
    },
    india: {
      imageStrategy: "Aggressive Compression",
      layout: "Lite Mode & Offline Indicators.",
      checklist: [
        "Load Time: <3s on 4G (Critical)",
        "Total Page Size: <1.5MB",
        "Offline Indicator: 'Slow connection detected'",
        "One-thumb operation priority",
        "WhatsApp Float Button always visible",
      ],
      insight:
        "Data is cheap but networks can be spotty. Lite modes and aggressive WebP compression are non-negotiable.",
    },
  },
};

/* -------------------------
   Inline subcomponents
   (kept local to avoid import conflicts)
   ------------------------- */
const ChecklistItem = ({ text }) => (
  <div className="flex items-start gap-3 py-2">
    <div className="mt-0.5 text-green-600 shrink-0">
      <CheckCircle2 className="w-4 h-4" />
    </div>
    <span className="text-sm text-slate-700 leading-snug">{text}</span>
  </div>
);

const LivePreview = ({ market, section }) => {
  const isUS = market === "us";
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [section, market]);

  return (
    <div className="mx-auto w-[320px] h-[640px] bg-white rounded-[2rem] border-8 border-slate-900 overflow-hidden shadow-2xl relative flex flex-col">
      {/* Status Bar */}
      <div className="h-6 bg-white w-full flex justify-between px-4 items-center text-[10px] font-medium text-slate-800 border-b border-slate-50 z-20">
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-slate-800 rounded-full opacity-20" />
          <div className="w-3 h-3 bg-slate-800 rounded-full opacity-20" />
          <div className="w-3 h-3 bg-slate-800 rounded-full" />
        </div>
      </div>

      {/* Header */}
      <div className="h-12 border-b flex items-center justify-between px-3 bg-white z-10 shrink-0">
        <div className="flex gap-3">
          <Menu className="w-5 h-5 text-slate-700" />
          <span className="font-bold tracking-wider text-sm">BRAND</span>
        </div>
        <div className="flex gap-3">
          {isUS ? (
            <Search className="w-5 h-5 text-slate-700" />
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              className="w-5 h-5"
              alt="WA"
            />
          )}
          <ShoppingBag className="w-5 h-5 text-slate-700" />
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto hide-scrollbar bg-white relative">
        {/* HERO / TRUST */}
        {(section === "hero" || section === "nav" || section === "trust") && (
          <>
            {isUS ? (
              <div className="h-[400px] bg-slate-100 relative mb-6">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                  <span className="text-xs uppercase tracking-widest">High Res Lifestyle</span>
                </div>
                <div className="absolute bottom-8 left-6 right-6">
                  <h2 className="text-2xl font-serif text-slate-900 mb-2 leading-tight">Effortless Summer Style</h2>
                  <button className="bg-slate-900 text-white px-6 py-3 text-xs font-bold uppercase tracking-wide w-fit">
                    Shop Collection
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-[420px] bg-slate-100 relative mb-2">
                <div className="absolute inset-0 flex items-center justify-center bg-emerald-50 text-emerald-800/30">
                  <span className="text-xs font-bold">9:16 VERTICAL HERO</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">SALE</span>
                    <span className="text-xs font-medium">Ends in 02:14:59</span>
                  </div>
                  <h2 className="text-xl font-bold mb-1">Festive Kurta Set</h2>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg font-bold">₹1,799</span>
                    <span className="text-xs text-emerald-300 font-bold">28% OFF</span>
                  </div>
                </div>
              </div>
            )}

            {!isUS && (
              <div className="bg-emerald-50 px-4 py-2 flex items-center gap-2 border-b border-emerald-100">
                <Zap className="w-3 h-3 text-emerald-700 fill-emerald-700" />
                <span className="text-[10px] font-bold text-emerald-800">Pay online & save extra ₹100</span>
              </div>
            )}

            <div className="p-4 bg-white border-b border-slate-100">
              {!isUS ? (
                <div className="flex gap-2 mb-2">
                  <div className="flex-1 h-8 border rounded px-2 flex items-center text-xs text-slate-400">Enter Pincode</div>
                  <button className="text-xs font-bold text-emerald-700 px-3">CHECK</button>
                </div>
              ) : (
                <div className="flex justify-center gap-6 py-2">
                  <span className="text-[10px] uppercase text-slate-500 flex items-center gap-1"><Truck className="w-3 h-3" /> Free Ship $75+</span>
                  <span className="text-[10px] uppercase text-slate-500 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Secure</span>
                </div>
              )}
            </div>
          </>
        )}

        {/* BODY */}
        {section === "body" && (
          <div className="py-4">
            <div className="px-4 mb-4">
              <h3 className="font-bold text-lg">{isUS ? "New Arrivals" : "Flash Sale"}</h3>
              <div className="w-10 h-1 bg-slate-900 mt-1" />
            </div>

            {isUS ? (
              <div className="flex overflow-x-auto px-4 gap-4 hide-scrollbar pb-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="min-w-[200px] flex flex-col gap-2">
                    <div className="aspect-[3/4] bg-slate-100 relative group">
                      <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="bg-white px-3 py-1 text-[10px] uppercase font-bold tracking-wider">Quick View</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-bold">Classic Linen Shirt</div>
                      <div className="text-xs text-slate-500">$65.00</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 px-2 pb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border border-slate-100 rounded-lg p-2 relative">
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm z-10">50% OFF</div>
                    <div className="aspect-[3/4] bg-slate-100 mb-2 rounded-sm" />
                    <div className="text-[10px] font-bold truncate">Printed Cotton Kurta</div>
                    <div className="flex items-center gap-1 text-[10px] mb-1">
                      <span className="font-bold">₹499</span>
                      <span className="line-through text-slate-400">₹999</span>
                    </div>
                    <button className="w-full bg-emerald-50 text-emerald-800 border border-emerald-100 text-[9px] font-bold py-1.5 rounded">
                      ADD TO CART
                    </button>
                    {i === 1 && <div className="text-[8px] text-red-500 mt-1 font-bold">Only 2 left!</div>}
                  </div>
                ))}
              </div>
            )}

            <div className="px-4 mt-4">
              <h3 className="font-bold text-lg mb-4">Shop Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {["Dresses", "Tops", "Bottoms", "Sale"].map((cat) => (
                  <div key={cat} className="h-24 bg-slate-100 relative flex items-center justify-center">
                    <span className={`font-bold ${!isUS && "text-lg text-emerald-900"}`}>{cat}</span>
                    {!isUS && <span className="absolute bottom-1 text-[8px] text-slate-500">From ₹299</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SOCIAL */}
        {section === "social" && (
          <div className="py-6 px-4">
            <h3 className="text-center font-bold text-lg mb-2">{isUS ? "#ArloxStyle" : "Real Customers"}</h3>
            <p className="text-center text-xs text-slate-500 mb-6">{isUS ? "Tag us to be featured" : "4.8/5 from 45,000+ Reviews"}</p>

            {isUS ? (
              <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="aspect-square bg-slate-100 hover:opacity-90 cursor-pointer" />)}
              </div>
            ) : (
              <div className="flex overflow-x-auto gap-3 pb-4 hide-scrollbar">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="min-w-[200px] border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-slate-200 rounded-full" />
                      <div>
                        <div className="text-xs font-bold">Priya M.</div>
                        <div className="text-[9px] text-slate-500">Mumbai • Verified</div>
                      </div>
                    </div>
                    <div className="h-32 bg-slate-100 rounded mb-2" />
                    <p className="text-[10px] text-slate-600 italic">"Material is exactly as shown. Delivered in 2 days!"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MOBILE & CONVERSION */}
        {(section === "mobile" || section === "conversion") && (
          <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-50">
            <Smartphone className={`w-12 h-12 mb-4 ${isUS ? "text-blue-500" : "text-emerald-600"}`} />
            <h3 className="font-bold text-center mb-2">{isUS ? "Thumb Zone Opt." : "Lite Mode Active"}</h3>

            <div className="w-full bg-white p-4 rounded-lg shadow-sm text-xs space-y-2">
              <div className="flex justify-between">
                <span>Load Time</span>
                <span className="font-bold font-mono">{isUS ? "1.2s" : "2.8s (4G)"}</span>
              </div>
              <div className="flex justify-between">
                <span>Page Size</span>
                <span className="font-bold font-mono">{isUS ? "1.8MB" : "0.9MB"}</span>
              </div>
              {!isUS && (
                <div className="flex items-center gap-2 text-emerald-700 font-bold mt-2 pt-2 border-t">
                  <WifiOff className="w-3 h-3" /> Offline Detection On
                </div>
              )}
            </div>

            {!isUS && (
              <div className="mt-8 flex gap-2">
                <div className="bg-green-100 p-2 rounded-full text-green-700 shadow-sm">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="bg-white px-3 py-2 rounded-lg shadow-sm text-[10px]">
                  Chat with us on WhatsApp
                  <br />
                  <span className="font-bold text-green-700">Get Extra ₹100 Off</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="h-20" />
      </div>

      {/* Sticky Bottom Actions */}
      {isUS ? (
        <div className="p-4 border-t bg-white absolute bottom-0 w-full z-30">
          {section === "conversion" && (
            <div className="absolute bottom-full left-0 w-full bg-slate-900 text-white p-4 text-center">
              <span className="text-xs font-bold uppercase">Get 10% Off Your First Order</span>
            </div>
          )}
          <button className="w-full bg-slate-900 text-white py-3 font-bold text-sm uppercase">
            Add to Cart - $89.00
          </button>
        </div>
      ) : (
        <div className="absolute bottom-0 w-full z-30 flex flex-col shadow-top bg-white">
          <div className="flex border-t border-slate-100">
            <button className="flex-1 bg-white text-emerald-800 py-3 font-bold text-sm border-r border-slate-100 flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </button>
            <button className="flex-1 bg-emerald-800 text-white py-3 font-bold text-sm flex items-center justify-center gap-2">
              BUY NOW <Zap className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------
   Page component (client)
   ------------------------- */
export default function HomePage() {
  const [market, setMarket] = useState("us"); // 'us' or 'india'
  const [activeSection, setActiveSection] = useState("hero");

  const activeData = content[activeSection];
  const marketData = activeData[market];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row">
      {/* LEFT SIDEBAR */}
      <div className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 h-screen sticky top-0">
        <div className="p-6 border-b border-slate-100">
          <h1 className="font-bold text-xl tracking-tight">
            Arlox <span className="text-slate-400 font-normal">Homepage</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium tracking-wide">ECOMMERCE PLAYBOOK</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {Object.values(content).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all ${
                activeSection === item.id ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <span className={`${activeSection === item.id ? (market === "us" ? "text-blue-600" : "text-emerald-600") : "text-slate-400"}`}>
                {item.icon}
              </span>
              {item.title}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Market Context</div>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setMarket("us")}
              className={`flex-1 py-2 text-xs font-bold rounded shadow-sm transition-all ${market === "us" ? "bg-white text-blue-700" : "text-slate-400 hover:text-slate-600"}`}
            >
              🇺🇸 US
            </button>
            <button
              onClick={() => setMarket("india")}
              className={`flex-1 py-2 text-xs font-bold rounded shadow-sm transition-all ${market === "india" ? "bg-emerald-700 text-white" : "text-slate-400 hover:text-slate-600"}`}
            >
              🇮🇳 INDIA
            </button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Guidelines */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-2xl">
            <div className="mb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Homepage Strategy</div>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded border border-slate-200 uppercase tracking-wider">{activeData.tier}</span>
              <h2 className="text-3xl font-bold text-slate-900">{activeData.title}</h2>
            </div>

            <p className="text-slate-500 text-lg mb-8">{activeData.desc}</p>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  {market === "us" ? <Globe className="w-4 h-4 text-blue-500" /> : <MapPin className="w-4 h-4 text-emerald-600" />}
                  {market === "us" ? "US Strategy" : "India Strategy"}
                </h3>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Image Strategy</div>
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-700">{marketData.imageStrategy}</div>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Required Checklist</div>
                  <div className="space-y-1">{marketData.checklist.map((item, idx) => <ChecklistItem key={idx} text={item} />)}</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5 flex gap-4">
              <div className="text-yellow-600 mt-1 shrink-0">
                <Zap className="w-5 h-5 fill-yellow-100" />
              </div>
              <div>
                <h4 className="font-bold text-yellow-900 text-sm mb-1">Strategic Insight</h4>
                <p className="text-sm text-yellow-800/80 leading-relaxed">{marketData.insight}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="w-full lg:w-[400px] bg-slate-50 border-l border-slate-200 p-8 flex flex-col items-center justify-center shrink-0">
          <div className="mb-6 text-center">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Live Homepage Preview</h3>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${market === "us" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>
              {market === "us" ? "US MARKET" : "INDIA PREMIUM"}
            </span>
          </div>

          <LivePreview market={market} section={activeSection} />

          <div className="mt-8 text-center px-6">
            <p className="text-xs text-slate-400">This preview renders the actual layout logic based on the selected market parameters.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
