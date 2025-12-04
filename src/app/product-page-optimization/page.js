"use client";

import React, { useState } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Camera, 
  Layout, 
  ShieldCheck, 
  CreditCard, 
  Clock, 
  Users, 
  ShoppingBag, 
  Truck, 
  Ruler, 
  ChevronDown, 
  Star, 
  Heart, 
  Share2, 
  CheckCircle,
  AlertCircle,
  Menu,
  PlayCircle,
  MessageCircle,
  HelpCircle,
  Flame,
  Instagram,
  Leaf,
  Scissors
} from 'lucide-react';

const ProductPageStrategy = () => {
  const [market, setMarket] = useState('US'); // 'US' or 'IN'
  const [activeTier, setActiveTier] = useState(1);
  const [activeTab, setActiveTab] = useState('guide'); // 'guide' or 'checklist'

  // Data based on the provided text
  const tiers = [
    { id: 1, title: 'Visual Content', icon: Camera, desc: 'Gallery, Video & Reels' },
    { id: 2, title: 'Info Architecture', icon: Layout, desc: 'USP Bullets & Hierarchy' },
    { id: 3, title: 'Detailed Info', icon: Menu, desc: 'Story, Sustainability & Size' },
    { id: 4, title: 'Trust & Urgency', icon: ShieldCheck, desc: 'Badges & Security' },
    { id: 5, title: 'Social Proof', icon: Users, desc: 'Reviews & Ratings' },
    { id: 6, title: 'Upsell/Cross-sell', icon: ShoppingBag, desc: 'Bundles & Curated Lists' },
    { id: 7, title: 'Size & Fit', icon: Ruler, desc: 'Guides & Finders' },
    { id: 8, title: 'Mobile Specific', icon: Smartphone, desc: 'Sticky Elements & Quick Actions' },
  ];

  const content = {
    US: {
      1: {
        images: "8-10 High-Res Images (2000px+)",
        layout: "Vertical Thumbnail Strip (Left)",
        keyShots: ["Front", "Back", "Side (45°)", "Detail (Texture)", "Lifestyle", "Scale Ref"],
        video: "Brand: 30-90s, 1080p, Muted Auto-play. UGC: Optional in reviews.",
        tech: "WebP, <300KB, 3-4x Zoom",
        model: "Ht 5'9\" | Bust 32\" | Wearing Small"
      },
      2: {
        price: "$89.00 (Sale: $129 $89)",
        title: "Concise H1 (24-32px)",
        usps: ["✓ Premium organic cotton blend", "✓ Flattering A-line silhouette", "✓ Wrinkle-resistant fabric", "✓ Made in USA"],
        cta: "Add to Cart (60% width), Wishlist icon",
        shipping: "Free shipping over $75",
        stock: "In Stock - Ships in 2 days"
      },
      3: {
        material: "Enhanced: GSM spec, texture details, sustainability credentials.",
        shipping: "Specific timeframes (5-7 days), Return process steps, Instant store credit.",
        style: "Style Guide: 3-4 outfit images (Office, Weekend, Date Night).",
        qa: "Customer Q&A: Helpfulness votes, 'Ask a Question' button."
      },
      4: {
        trust: "Secure Checkout, Sustainably Made",
        payment: "PayPal, Apple Pay, Shop Pay",
        urgency: "Subtle ('Only 3 left', Delivery countdown)",
        badges: "100% Satisfaction, Free Returns"
      },
      5: {
        reviews: "Verified Purchaser, Fit Rating (TTS)",
        display: "Write a Review, Photo Reviews",
        content: "Detailed text, body stats of reviewer"
      },
      6: {
        upsell: "Frequently Bought Together (Bundle Discount)",
        similar: "Carousel, Hover to 2nd image, Logic: Same Category/Complementary"
      },
      8: {
        sticky: "Header + Bottom Bar (Price | Size | Add to Cart)",
        gallery: "Full-screen horizontal swipe, Pinch-to-zoom",
        fab: "Wishlist heart (right side)"
      }
    },
    IN: {
      1: {
        images: "8-12 High-Res Premium Images",
        layout: "Thumbnail Strip (Bottom) + Main Preview",
        keyShots: ["Front (Clean)", "Model (Indian)", "Side Profile", "Fabric Drape", "Lifestyle (Café/Event)", "Flat Lay"],
        video: "Brand: 30-60s Premium (1080p). Reels: 6-9 Grid (CRITICAL PRIORITY).",
        tech: "WebP Optimized, Quality > Speed for Premium",
        model: "Ht 5'6\" | Size M | Body: Athletic | Ready to Wear: Yes"
      },
      2: {
        price: "₹2,499 (28% OFF) - Prepaid Incentive",
        title: "Product Title + Designer Name",
        usps: ["✓ Premium imported fabric", "✓ Handcrafted details", "✓ Sustainable production", "✓ Ready to wear"],
        cta: "Add to Cart AND Buy Now (Skip Cart)",
        shipping: "Pincode, Prepaid Save ₹100, COD +₹50",
        stock: "Low stock in Size M - 4 left"
      },
      3: {
        material: "Premium: 100% Cotton (180 GSM), Artisan Support (15 families), Water Saved metrics.",
        shipping: "Prepaid Priority, Eco-friendly packaging, Store credit bonus (5%).",
        style: "Styling Inspiration: Festive, Brunch, Office looks with pricing.",
        qa: "Premium Q&A: Weather suitability, Ironing needs, Sizing advice."
      },
      4: {
        trust: "Trusted by 45,000+, 7-Day Easy Returns",
        payment: "UPI (Preferred), Cards, Wallets, Pay Later",
        urgency: "Authentic Scarcity ('Limited Edition', 'Low Stock')",
        badges: "Sustainably Crafted, Secure Payment"
      },
      5: {
        reviews: "4.6★ (2.8K ratings), Focus on Quality & Fit",
        display: "Trusted by 45,000+ customers",
        content: "Fit feedback % (89% True to Size)"
      },
      6: {
        upsell: "Complete the Look (Curated Outfit)",
        similar: "Grid (2 col mobile), Price ±₹500, Aesthetic Match"
      },
      8: {
        sticky: "Top Bar + Sticky Price/CTA",
        quickAction: "WhatsApp Us | Check Delivery (No Wishlist)",
        actions: "One-Tap: WhatsApp, Call, Inline Pincode"
      }
    }
  };

  const checklistItems = [
    { text: "8-12 high-quality product images (Premium)", priority: "Must-Have" },
    { text: "Instagram Reels section (6-9 videos)", priority: "Must-Have" },
    { text: "4 USP bullets (Quality/Sustainability focus)", priority: "Must-Have" },
    { text: "Prepaid incentive ('Save ₹100')", priority: "Must-Have" },
    { text: "WhatsApp contact button (Prominent)", priority: "Must-Have" },
    { text: "Detailed Sustainability Story (Artisans/Eco)", priority: "Must-Have" },
    { text: "Ready-to-wear / Body Type callouts", priority: "Must-Have" },
    { text: "Fabric longevity & care info", priority: "Must-Have" },
    { text: "Styling Guide (3 curated looks)", priority: "High Impact" },
    { text: "Customer Q&A section", priority: "High Impact" },
    { text: "Store credit bonus (5%) for returns", priority: "High Impact" },
    { text: "'You Might Also Love' (Curated)", priority: "Must-Have" }
  ];

  const renderMockup = () => {
    const isUS = market === 'US';
    return (
      <div className="bg-white border rounded-xl shadow-lg overflow-hidden max-w-md mx-auto font-sans text-gray-800 relative">
        {/* Mock Header */}
        <div className="h-12 border-b flex items-center justify-between px-4 bg-white sticky top-0 z-10">
          <Menu size={20} />
          <span className="font-bold text-lg">{isUS ? 'BRAND' : 'LABEL'}</span>
          <div className="flex gap-3">
            <Share2 size={20} />
            <ShoppingBag size={20} />
          </div>
        </div>

        {/* Product Image Area */}
        <div className="relative bg-gray-100 aspect-[3/4] flex items-center justify-center group">
          <div className="text-gray-400 flex flex-col items-center">
            <Camera size={48} />
            <span className="text-xs mt-2 font-medium">{isUS ? 'High Res (2000px)' : 'Premium Quality (2000px)'}</span>
            <span className="text-[10px] text-gray-500 mt-1">{isUS ? 'Vertical Thumbs Left' : 'Clean Swipe + Pinch Zoom'}</span>
          </div>
          
          {/* Market Specific Image Overlay */}
          {!isUS && (
            <div className="absolute top-4 left-4 flex flex-col gap-2">
               {/* Clean premium badge instead of loud discount */}
               <span className="bg-white/90 backdrop-blur text-xs font-medium px-3 py-1 uppercase tracking-wide">New Season</span>
            </div>
          )}
          
          {/* Gallery Dots/Thumbs */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
            {!isUS && <div className="ml-2 text-[10px] font-medium bg-black/10 px-2 rounded-full">1/10</div>}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-4 pb-32">
          {/* Title & Brand */}
          <div>
            <h3 className="text-gray-500 text-xs uppercase tracking-wide mb-1 flex justify-between">
              {isUS ? 'Brand Name' : <span>Handcrafted • Artisan Made</span>}
              {!isUS && <span className="text-green-700 font-medium flex items-center gap-1"><Leaf size={10}/> Sustainable</span>}
            </h3>
            <h1 className="text-xl font-serif font-medium leading-tight text-gray-900">
              {isUS ? 'Signature Cotton Midi Dress' : 'Hand-Block Printed Pure Cotton Kurta'}
            </h1>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-2 text-sm">
            <div className="flex text-yellow-500">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill={isUS ? "currentColor" : "#e5e7eb"} />
            </div>
            <span className="text-gray-600 text-xs">
              {isUS ? '4.8 (1,234 reviews)' : '4.6 (2,847 ratings) | 89% True to Size'}
            </span>
          </div>

          {/* NEW: USP Bullet Points (Clean Checkmarks for both) */}
          <div className="my-3 text-sm space-y-1.5">
             {content[market][2].usps.map((usp, i) => (
                <div key={i} className="flex items-start gap-2">
                   <span className="text-gray-900 font-bold">✓</span>
                   <span className="text-gray-700 leading-tight">
                      {usp.substring(2)}
                   </span>
                </div>
             ))}
          </div>

          {/* Price */}
          <div className="border-t border-b py-3">
            <div className="flex items-baseline gap-3">
              <span className="text-xl font-medium">
                {isUS ? '$89.00' : '₹1,799'}
              </span>
              <span className="text-gray-400 line-through text-sm">
                {isUS ? '$129.00' : '₹2,499'}
              </span>
              <span className={`${isUS ? 'text-red-600' : 'text-red-800'} text-sm font-medium`}>
                {isUS ? 'Save $40' : '[28% OFF]'}
              </span>
            </div>
            {!isUS && (
              <div className="mt-2 flex flex-col gap-1">
                 <span className="text-xs text-green-700 font-medium bg-green-50 px-2 py-1 inline-block rounded w-fit">
                    Pay online & save extra ₹100
                 </span>
                 <span className="text-[10px] text-gray-500">Inclusive of all taxes | Free shipping</span>
              </div>
            )}
          </div>

          {/* Size & Fit */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Size: Select Size</span>
                <span className="text-sm text-gray-500 underline decoration-dotted">
                  {isUS ? 'Size Guide' : 'Detailed Size Chart'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', !isUS && 'XXL'].filter(Boolean).map(size => (
                  <button key={size} className="border border-gray-300 rounded-sm px-4 py-2 text-sm hover:border-black hover:bg-gray-50 transition-all min-w-[3rem]">
                    {size}
                  </button>
                ))}
              </div>
              
              {/* Model / Fit Info */}
              <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                 {isUS ? (
                    <p>Model is 5'9" wearing Small</p>
                 ) : (
                    <div className="space-y-1">
                       <p><strong>Model:</strong> 5'6" | Wearing M | Athletic Build</p>
                       <p className="flex items-center gap-1 text-green-700"><Scissors size={10}/> Ready to Wear: Yes (Pre-stitched)</p>
                       <p className="italic text-gray-500">Styling Tip: Size up for oversized look</p>
                    </div>
                 )}
              </div>
            </div>
          </div>

          {/* Delivery / Pincode */}
          {!isUS ? (
            <div className="bg-white pt-2">
               <p className="text-xs text-red-700 mb-1 font-medium">Low stock in Size M - 4 left</p>
               <div className="flex gap-2 mb-2">
                  <input type="text" placeholder="Enter Pincode" className="border-b border-gray-300 py-1 text-sm w-full focus:outline-none focus:border-black" />
                  <button className="text-black text-xs font-bold uppercase">Check</button>
               </div>
               <div className="text-[10px] text-gray-500 flex gap-4">
                  <span>Free delivery (Prepaid)</span>
                  <span>COD available (+₹50)</span>
               </div>
            </div>
          ) : (
             <div className="text-sm space-y-1">
               <p className="flex items-center gap-2 text-green-700 font-medium"><CheckCircle size={14}/> In Stock - Ships within 2 days</p>
               <p className="flex items-center gap-2 text-gray-600"><Truck size={14}/> Free shipping over $75</p>
             </div>
          )}

           {/* Instagram Reels Section (Critical for India Premium) */}
           {!isUS && (
              <div className="mt-8 border-t pt-4">
                 <h4 className="font-serif text-lg mb-1 text-center">See It Styled ✨</h4>
                 <p className="text-xs text-center text-gray-500 mb-3">Real people. Real style.</p>
                 <div className="grid grid-cols-3 gap-2">
                    {[1,2,3].map(i => (
                       <div key={i} className="aspect-[9/16] bg-gray-900 rounded-lg relative overflow-hidden group cursor-pointer">
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                             <PlayCircle className="text-white/90 w-8 h-8" />
                          </div>
                          <div className="absolute bottom-1 left-1 right-1 text-[8px] text-white/90 truncate">
                             @creator_name
                          </div>
                       </div>
                    ))}
                 </div>
                 <button className="w-full text-xs font-bold mt-2 text-gray-600 uppercase tracking-wide">Load More Reels</button>
              </div>
           )}

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 text-center text-[10px] text-gray-500 border-t pt-6 mt-4">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={14} />
              <span>{isUS ? 'Secure Checkout' : 'Trusted by 45,000+ Customers'}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Leaf size={14} />
              <span>{isUS ? 'Sustainably Made' : 'Sustainably Crafted'}</span>
            </div>
          </div>
        </div>

        {/* Sticky Mobile Elements */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
           {/* India Quick Actions Bar - NO WISHLIST */}
           {!isUS && (
              <div className="flex border-b text-xs text-gray-800 font-medium">
                 <button className="flex-1 py-3 border-r flex items-center justify-center gap-2 bg-green-50 text-green-800">
                    <MessageCircle size={14}/> WhatsApp Us
                 </button>
                 <button className="flex-1 py-3 flex items-center justify-center gap-2 hover:bg-gray-50">
                    <Truck size={14}/> Check Delivery
                 </button>
              </div>
           )}
           
           {/* CTA Bar */}
           <div className={`p-3 flex gap-3 ${!isUS ? 'flex-col sm:flex-row' : ''}`}>
            {!isUS && (
              <button className="flex-1 bg-white border border-black text-black py-3 font-medium rounded-sm text-sm uppercase tracking-wide hover:bg-gray-50">
                 Add to Cart
              </button>
            )}
            <button className={`flex-1 ${!isUS ? 'bg-black' : 'bg-black'} text-white py-3 font-medium rounded-sm shadow-md uppercase text-sm tracking-wide`}>
              {isUS ? 'Add to Cart' : 'Buy Now'}
            </button>
            {isUS && (
              <button className="p-3 border rounded hover:bg-gray-50">
                <Heart size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 p-4 lg:p-8 font-sans">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">Product Page Strategy</h1>
           <p className="text-gray-500 mt-1">Premium Fashion Focus: Trust + Storytelling + Social Proof</p>
        </div>
        
        {/* Market Toggle */}
        <div className="bg-white p-1 rounded-lg border shadow-sm flex">
          <button 
            onClick={() => setMarket('US')}
            className={`px-6 py-2 rounded-md font-bold transition-all ${market === 'US' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            🇺🇸 US Market
          </button>
          <button 
             onClick={() => setMarket('IN')}
             className={`px-6 py-2 rounded-md font-bold transition-all ${market === 'IN' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            🇮🇳 India (Premium)
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar - Nav */}
        <div className="lg:col-span-3 space-y-2">
           <div className="flex bg-white rounded-lg p-1 border mb-4 lg:hidden">
              <button onClick={() => setActiveTab('guide')} className={`flex-1 py-2 rounded font-medium ${activeTab === 'guide' ? 'bg-gray-100' : ''}`}>Guide</button>
              <button onClick={() => setActiveTab('checklist')} className={`flex-1 py-2 rounded font-medium ${activeTab === 'checklist' ? 'bg-gray-100' : ''}`}>Checklist</button>
           </div>

           <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
             {tiers.map((tier) => (
               <button
                 key={tier.id}
                 onClick={() => { setActiveTier(tier.id); setActiveTab('guide'); }}
                 className={`w-full flex items-center gap-3 px-4 py-4 text-left border-b last:border-0 hover:bg-gray-50 transition-colors ${activeTier === tier.id ? 'bg-gray-100 border-l-4 border-l-black' : ''}`}
               >
                 <tier.icon size={20} className={activeTier === tier.id ? 'text-black' : 'text-gray-400'} />
                 <div>
                   <span className={`block text-sm font-bold ${activeTier === tier.id ? 'text-black' : 'text-gray-700'}`}>{tier.title}</span>
                   <span className="block text-xs text-gray-500">{tier.desc}</span>
                 </div>
               </button>
             ))}
           </div>
           
           <div className="hidden lg:block bg-yellow-50 rounded-xl p-4 border border-yellow-100">
              <h3 className="font-bold flex items-center gap-2 mb-2"><AlertCircle size={16} className="text-yellow-600"/> Insight</h3>
              <p className="text-sm text-gray-700">
                {market === 'US' 
                  ? "US users prioritize lifestyle context. Use 'How to Wear' style guides." 
                  : "Premium India users ignore 'Wishlists' but love 'WhatsApp'. They pay online for incentives."}
              </p>
           </div>
        </div>

        {/* Center - Content Guide (if active) */}
        {activeTab === 'guide' && (
          <>
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                   <span className="bg-gray-100 text-gray-800 font-bold px-3 py-1 rounded text-sm">Tier {activeTier}</span>
                   <h2 className="text-xl font-bold">{tiers.find(t => t.id === activeTier).title}</h2>
                </div>
                
                <div className="space-y-6">
                  {/* Dynamic Content Rendering based on Tier */}
                  {activeTier === 1 && (
                    <>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><Camera size={16}/> Image Strategy</h4>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded">{content[market][1].images}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded">
                           <span className="block text-xs font-bold text-gray-800 uppercase mb-1">Layout</span>
                           <p className="text-sm">{content[market][1].layout}</p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded">
                           <span className="block text-xs font-bold text-purple-800 uppercase mb-1">Video</span>
                           <p className="text-sm">{content[market][1].video}</p>
                        </div>
                      </div>
                      <div className="p-3 border rounded">
                        <span className="block text-xs font-bold text-gray-500 uppercase mb-1">Model Info</span>
                        <p className="text-sm font-medium">{content[market][1].model}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">Required Shots</h4>
                        <ul className="space-y-1">
                          {content[market][1].keyShots.map((shot, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle size={14} className="mt-1 text-green-600 shrink-0"/> {shot}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {activeTier === 2 && (
                    <>
                      <div className="p-4 bg-gray-50 rounded-lg border">
                        <h4 className="font-bold mb-3">Price & Title Display</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Price Format</span>
                            <span className="font-mono font-medium">{content[market][2].price}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">CTA Button</span>
                            <span className="font-mono font-medium text-right">{content[market][2].cta}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                           <CheckCircle size={16} className={market === 'US' ? "text-green-600" : "text-black"}/> 
                           USP Bullet Points
                        </h4>
                        <ul className="text-sm space-y-1 mb-4 bg-gray-50 p-3 rounded">
                           {content[market][2].usps.map((u,i) => <li key={i}>{u}</li>)}
                        </ul>

                        <h4 className="font-bold mb-2">Critical Elements</h4>
                         <ul className="space-y-2 text-sm">
                           <li className="flex items-center gap-2"><Truck size={14} className="text-gray-400"/> {content[market][2].shipping}</li>
                           <li className="flex items-center gap-2"><Layout size={14} className="text-gray-400"/> {content[market][2].stock}</li>
                         </ul>
                      </div>
                    </>
                  )}

                  {activeTier === 3 && (
                     <div className="space-y-4">
                        <div className="bg-indigo-50 p-3 rounded">
                           <h4 className="font-bold text-indigo-900 mb-1">Detailed Story & Fabric</h4>
                           <p className="text-sm text-indigo-800">{content[market][3].material}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded border">
                           <h4 className="font-bold text-gray-900 mb-1">Shipping & Returns Strategy</h4>
                           <p className="text-sm text-gray-700">{content[market][3].shipping}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                           <div className="p-3 border rounded">
                              <h4 className="font-bold text-sm mb-1">Style Guide</h4>
                              <p className="text-xs text-gray-600">{content[market][3].style}</p>
                           </div>
                           <div className="p-3 border rounded">
                              <h4 className="font-bold text-sm mb-1">Customer Q&A</h4>
                              <p className="text-xs text-gray-600">{content[market][3].qa}</p>
                           </div>
                        </div>
                     </div>
                  )}

                  {activeTier === 8 && (
                     <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                           <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2"><Smartphone size={16}/> Sticky Elements</h4>
                           <p className="text-sm text-blue-800">{content[market][8].sticky}</p>
                        </div>
                        {market === 'IN' && (
                           <div className="bg-green-50 p-4 rounded-lg">
                              <h4 className="font-bold text-green-900 mb-2">Quick Actions Bar (Premium India)</h4>
                              <p className="text-sm text-green-800 font-medium">{content[market][8].quickAction}</p>
                              <p className="text-xs mt-2 text-green-700">Replaces Wishlist with WhatsApp for instant high-value support.</p>
                           </div>
                        )}
                        <div className="p-3 border rounded">
                           <h4 className="font-bold text-sm mb-1">Image Gallery UX</h4>
                           <p className="text-xs text-gray-600">{content[market][8].gallery || "Lazy load, tap to zoom"}</p>
                        </div>
                     </div>
                  )}

                  {/* Fallback for other tiers */}
                  {[4, 5, 6, 7].includes(activeTier) && (
                    <div className="space-y-4">
                      {activeTier === 4 && (
                        <>
                           <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
                             <h4 className="font-bold text-green-900 mb-2">Trust Signals</h4>
                             <p className="text-sm text-green-800">{content[market][4].trust}</p>
                           </div>
                           <div>
                              <h4 className="font-bold mb-2">Urgency Tactics</h4>
                              <p className="text-sm text-gray-600">{content[market][4].urgency}</p>
                           </div>
                        </>
                      )}
                      {activeTier === 5 && (
                        <div className="bg-white">
                           <h4 className="font-bold mb-2">Review Strategy</h4>
                           <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                             <li>Focus: <strong>{content[market][5].reviews}</strong></li>
                             <li>Display: {content[market][5].display}</li>
                             <li>Content: {content[market][5].content}</li>
                           </ul>
                        </div>
                      )}
                      {activeTier === 6 && (
                        <div className="bg-white space-y-3">
                           <div className="p-3 border rounded-lg bg-yellow-50">
                              <h4 className="font-bold text-sm">Upsell Strategy</h4>
                              <p className="text-sm">{content[market][6].upsell}</p>
                           </div>
                           <div className="p-3 border rounded-lg">
                              <h4 className="font-bold text-sm">"You Might Also Love" Logic</h4>
                              <p className="text-sm">{content[market][6].similar}</p>
                           </div>
                        </div>
                      )}
                      {activeTier === 7 && (
                        <div className="text-center py-8 text-gray-500">
                           <p>Refer to Tier 7 in text for Fit Finder details.</p>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Right - Live Mockup */}
            <div className="lg:col-span-4">
               <div className="sticky top-4">
                 <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 text-center">
                    Live {market === 'US' ? 'US' : 'Premium India'} Implementation
                 </h3>
                 {renderMockup()}
                 <div className="mt-4 text-xs text-gray-400 text-center">
                   Interactive Preview • Updates based on Market selection
                 </div>
               </div>
            </div>
          </>
        )}

        {/* Tab: Checklist View (Full Width) */}
        {activeTab === 'checklist' && (
          <div className="lg:col-span-9 bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold mb-6">Critical Product Page Checklist</h2>
            <div className="grid md:grid-cols-2 gap-4">
               {checklistItems.map((item, idx) => (
                 <label key={idx} className="flex items-start gap-3 p-3 border rounded hover:bg-gray-50 cursor-pointer group">
                   <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                   <div>
                     <span className="block text-sm font-medium text-gray-900 group-hover:text-blue-700">{item.text}</span>
                     <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-1 ${item.priority === 'Must-Have' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                       {item.priority}
                     </span>
                   </div>
                 </label>
               ))}
            </div>
            <div className="mt-8 p-4 bg-gray-100 rounded text-sm text-gray-600">
              <strong>Common Pitfall:</strong> {market === 'US' ? 'No USP bullets above price misses quick value communication.' : 'Using "Wishlist" buttons for Premium India. Replace with direct WhatsApp support to close high-value sales.'}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductPageStrategy;