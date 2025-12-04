"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Smartphone, 
  Zap, 
  CheckCircle, 
  Code, 
  TrendingUp, 
  Layout, 
  Menu, 
  X,
  ChevronRight,
  MessageCircle,
  Instagram,
  Globe,
  DollarSign,
  Copy,
  ArrowRight,
  Triangle
} from 'lucide-react';

// --- BRANDING COMPONENTS ---

const ArloxLogo = () => (
  <div className="flex items-center gap-1">
    {/* Custom Arlox Blue Triangle Logo */}
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3L22 21H2L12 3Z" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span className="font-sans font-bold text-2xl tracking-tight text-gray-900">
      rlox.io
    </span>
  </div>
);

// --- DATA CONSTANTS ---

const THEMES = [
  {
    id: 'turbo',
    name: 'Turbo',
    price: '$380 one-time',
    tagline: 'The Speed Champion for India Premium',
    rating: 9.5,
    idealFor: 'High-traffic, Speed priority, Large catalogs',
    pros: ['Fastest (Smart preloading)', 'Pixel Union Quality', 'Great for large catalogs', 'One-time payment'],
    cons: ['$380 upfront', 'Requires technical knowledge for deep edits', 'Reels need custom code'],
    indiaScore: 'Top Choice',
    features: ['Smart Page Preloading', 'Lazy Loading', 'Mega Menu', 'Predictive Search']
  },
  {
    id: 'booster',
    name: 'Booster Theme',
    price: '$199/yr or $299 life',
    tagline: 'Aggressive Conversion Machine',
    rating: 9,
    idealFor: 'Data-driven brands, CRO focus',
    pros: ['1.1s Load Time', '40+ Built-in CRO tools', 'Save money on apps', 'Mobile First'],
    cons: 'Timers need cultural adaptation, Design can feel "salesy"',
    indiaScore: 'Excellent',
    features: ['Geo-IP Currency', 'Sales Notifications', 'Countdown Timers', 'Direct to Checkout']
  },
  {
    id: 'prestige',
    name: 'Prestige',
    price: '$380 one-time',
    tagline: 'The Luxury Standard',
    rating: 8.5,
    idealFor: 'High-end luxury, Visual storytelling',
    pros: ['Editorial aesthetic', 'Advanced filtering', 'Shop-the-look', 'Official Shopify Theme'],
    cons: 'Pricey upfront, can feel too "Western" without adaptation',
    indiaScore: 'Great',
    features: ['Timeline sections', 'Hotspot images', 'Color swatches', 'Slide-out cart']
  },
  {
    id: 'impulse',
    name: 'Impulse',
    price: '$350 one-time',
    tagline: 'Lifestyle & Mobile Master',
    rating: 8,
    idealFor: 'Contemporary fashion, 80-90% Mobile traffic',
    pros: ['Exceptional mobile UX', 'Visual merchandising tools', 'Promotion features'],
    cons: 'Similar to Prestige, $350 price point',
    indiaScore: 'Very Good',
    features: ['Custom promotion tiles', 'Menu promotions', 'Subcollection display', 'Quick view']
  },
  {
    id: 'dawn',
    name: 'Dawn',
    price: 'Free',
    tagline: 'The Reliable Starter',
    rating: 7,
    idealFor: 'Bootstrapping, Custom Dev Base, Testing',
    pros: ['Free', 'Shopify 2.0 Standard', 'Clean code', 'Massive community support'],
    cons: 'Generic look',
    indiaScore: 'Starter Choice',
    features: ['Drag & Drop sections', 'Media-rich product page', 'Cross-selling', 'Blog']
  }
];

const CODE_SNIPPETS = [
  {
    title: 'Instagram Reels Section (Liquid)',
    desc: 'Custom section to display vertical video content.',
    code: `{% comment %} Create: sections/instagram-reels.liquid {% endcomment %}

<div class="instagram-reels-section">
  <h2>{{ section.settings.heading }}</h2>
  <div class="reels-grid">
    {% for block in section.blocks %}
      <div class="reel-card">
        <a href="{{ block.settings.instagram_url }}" target="_blank">
          <img src="{{ block.settings.thumbnail | img_url: '600x' }}" alt="Reel">
          <div class="play-overlay">▶</div>
        </a>
      </div>
    {% endfor %}
  </div>
</div>`
  },
  {
    title: 'WhatsApp Floating Button',
    desc: 'Critical for India market trust and communication.',
    code: `<a href="https://wa.me/919XXXXXXXXX?text=Hi..." 
   class="whatsapp-float" 
   target="_blank">
  <svg>...</svg>
</a>

<style>
.whatsapp-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #25D366;
  z-index: 100;
  /* Add rest of CSS from guide */
}
</style>`
  },
  {
    title: 'UPI/Prepaid Incentive',
    desc: 'Nudge users towards prepaid to reduce RTO.',
    code: `<div class="prepaid-incentive">
  <div class="incentive-box">
    <span class="icon">💰</span>
    <div class="text">
      <strong>Save ₹100 extra on prepaid orders</strong>
      <p>Use UPI, Cards, or Wallets at checkout</p>
    </div>
  </div>
</div>`
  }
];

// --- COMPONENTS ---

const Header = ({ activeTab, setActiveTab }) => (
  <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
        <div className="flex items-center gap-4">
          <ArloxLogo />
          <div className="hidden md:block w-px h-6 bg-gray-300 mx-2"></div>
          <span className="hidden md:block text-gray-500 font-medium text-sm tracking-wide uppercase">Theme Selector</span>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-1">
          {['Dashboard', 'Decision Tree', 'Themes', 'India Custom', 'Checklist'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                  : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
    {/* Mobile Nav would go here, simplified for this view */}
  </header>
);

const Dashboard = ({ setActiveTab }) => {
  const [visitors, setVisitors] = useState(1000);
  const [conversion, setConversion] = useState(1);
  const [aov, setAov] = useState(2000);

  const monthlyRevenue = visitors * (conversion/100) * aov;
  const improvedRevenue = visitors * ((conversion + 1)/100) * aov;
  const roi = improvedRevenue - monthlyRevenue;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Inline styles for basic animations since Tailwind config might not have them */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>

      <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Your AI-Powered<br/>
            <span className="text-blue-400">Scaling Foundation</span>
          </h1>
          <p className="text-blue-100 max-w-2xl text-lg mb-8 font-light">
            Insights from thousands of fashion e-commerce brands. 
            Prioritize <span className="font-semibold text-white">Speed</span>, <span className="font-semibold text-white">Mobile</span>, and <span className="font-semibold text-white">India-Specific</span> features to scale predictably.
          </p>
          <button 
            onClick={() => setActiveTab('Decision Tree')}
            className="bg-white text-blue-900 font-bold py-4 px-8 rounded-full transition-all hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-900/20 flex items-center gap-2 transform hover:-translate-y-1"
          >
            Start Recommendation Quiz <ArrowRight size={20} className="text-blue-600" />
          </button>
        </div>
        
        {/* Abstract Background Shapes matching Arlox aesthetic */}
        <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 bg-blue-500 blur-3xl rounded-full transform translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute left-0 bottom-0 h-64 w-64 opacity-10 bg-indigo-500 blur-3xl rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* ROI Calculator */}
        <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            Premium Theme ROI
          </h2>
          <div className="grid grid-cols-1 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Monthly Visitors</label>
              <input type="number" value={visitors} onChange={(e) => setVisitors(Number(e.target.value))} className="w-full p-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium text-gray-900" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Conv. Rate (%)</label>
                <input type="number" step="0.1" value={conversion} onChange={(e) => setConversion(Number(e.target.value))} className="w-full p-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">AOV (₹)</label>
                <input type="number" value={aov} onChange={(e) => setAov(Number(e.target.value))} className="w-full p-3 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium text-gray-900" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
            <p className="text-sm text-gray-600 mb-4 font-medium">If a faster theme (Turbo) improves conversion by just <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">1%</span>:</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase mb-1">Extra Monthly Revenue</p>
                <p className="text-3xl font-bold text-gray-900">+₹{roi.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-semibold uppercase mb-1">Pays for Theme in</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.max(0.1, (31500 / roi)).toFixed(1)} Months
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="text-blue-600" size={24} />
            </div>
            Arlox India Principles
          </h2>
          <ul className="space-y-6">
            <li className="flex gap-4 items-start">
              <div className="mt-1 bg-gray-100 p-2 rounded-full">
                <Smartphone className="text-gray-600" size={20} />
              </div>
              <div>
                <strong className="text-gray-900 text-lg">Mobile First is Not Optional</strong>
                <p className="text-gray-500 mt-1 leading-relaxed">80-90% of traffic is mobile. Buttons must be thumb-friendly and layouts responsive.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="mt-1 bg-gray-100 p-2 rounded-full">
                <Instagram className="text-gray-600" size={20} />
              </div>
              <div>
                <strong className="text-gray-900 text-lg">Reels = Trust</strong>
                <p className="text-gray-500 mt-1 leading-relaxed">Video content is the highest trust signal for fashion. If they can't see it moving, they won't buy.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="mt-1 bg-gray-100 p-2 rounded-full">
                <MessageCircle className="text-gray-600" size={20} />
              </div>
              <div>
                <strong className="text-gray-900 text-lg">WhatsApp is Your Support</strong>
                <p className="text-gray-500 mt-1 leading-relaxed">Direct integration reduces RTO by clarifying doubts pre-purchase instantly.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const DecisionTree = ({ setActiveTab }) => {
  const [step, setStep] = useState(0);
  
  const reset = () => {
    setStep(0);
  };

  const questions = [
    {
      id: 0,
      text: "What is your total budget for the website launch?",
      options: [
        { label: "Under ₹50,000 (Budget)", next: 1 },
        { label: "₹50,000 - ₹1,00,000 (Growing)", next: 2 },
        { label: "₹1,00,000+ (Established/Serious)", next: 3 }
      ]
    },
    {
      id: 1,
      text: "Do you have coding/development skills in-house?",
      options: [
        { label: "Yes, we can code", result: "dawn-custom" },
        { label: "No, need plug & play", result: "dawn-apps" }
      ]
    },
    {
      id: 2,
      text: "What is your absolute highest priority?",
      options: [
        { label: "Aggressive Conversion & Sales Data", result: "booster" },
        { label: "Visual Storytelling & Brand Image", result: "impulse" }
      ]
    },
    {
      id: 3,
      text: "Are you prioritizing raw speed or luxury editorial feel?",
      options: [
        { label: "Raw Speed & Scalability (Large Catalog)", result: "turbo" },
        { label: "Luxury Editorial Feel", result: "prestige" }
      ]
    }
  ];

  const results = {
    "dawn-custom": { title: "Dawn (Free) + Custom Code", desc: "Best for keeping costs low while building a unique look.", themeId: 'dawn' },
    "dawn-apps": { title: "Dawn (Free) + Apps", desc: "Use the budget saved on apps for Reviews, Upsells, and Email.", themeId: 'dawn' },
    "booster": { title: "Booster Theme", desc: "Best for maximizing every rupee of ad spend.", themeId: 'booster' },
    "impulse": { title: "Impulse", desc: "Great balance of visuals and mobile performance.", themeId: 'impulse' },
    "turbo": { title: "Turbo", desc: "Arlox's Top Choice for scaling brands in India.", themeId: 'turbo' },
    "prestige": { title: "Prestige", desc: "The choice for high-end designer wear.", themeId: 'prestige' }
  };

  const currentQ = questions.find(q => q.id === step);
  const isResult = typeof step === 'string';

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 overflow-hidden min-h-[500px] flex flex-col border border-gray-100">
        <div className="bg-slate-900 text-white p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-blue-400 font-medium tracking-wide text-xs uppercase">AI Recommendation</span>
          </div>
          <h2 className="text-2xl font-bold">Theme Selector Engine</h2>
        </div>
        
        <div className="p-10 flex-1 flex flex-col justify-center items-center text-center">
          {!isResult ? (
            <div className="w-full animate-fade-in">
              <h3 className="text-3xl font-bold text-gray-900 mb-10 leading-snug">{currentQ.text}</h3>
              <div className="grid gap-4">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (opt.result) {
                        setStep(opt.result);
                      } else {
                        setStep(opt.next);
                      }
                    }}
                    className="p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200 font-medium text-lg text-left flex justify-between group shadow-sm hover:shadow-md"
                  >
                    {opt.label}
                    <div className="bg-gray-100 rounded-full p-1 text-gray-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <ChevronRight size={20} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in w-full">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{results[step].title}</h3>
              <p className="text-gray-500 mb-10 text-xl leading-relaxed max-w-lg mx-auto">{results[step].desc}</p>
              
              <div className="flex gap-4 justify-center items-center">
                <button onClick={reset} className="text-gray-400 hover:text-gray-600 font-medium px-4 py-2">Restart</button>
                <button 
                  onClick={() => setActiveTab('Themes')}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all hover:-translate-y-1"
                >
                  View Analysis
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ThemeExplorer = () => {
  const [selected, setSelected] = useState(THEMES[0]);

  return (
    <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">
      {/* Sidebar List */}
      <div className="lg:col-span-4 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {THEMES.map(theme => (
          <div 
            key={theme.id}
            onClick={() => setSelected(theme)}
            className={`p-5 rounded-2xl cursor-pointer border-2 transition-all duration-200 ${
              selected.id === theme.id 
                ? 'border-blue-600 bg-blue-50/50 shadow-md' 
                : 'border-transparent bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className={`font-bold text-lg ${selected.id === theme.id ? 'text-blue-700' : 'text-gray-900'}`}>{theme.name}</h3>
              <span className="text-xs font-mono font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">{theme.price}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{theme.tagline}</p>
            <div className="flex items-center gap-1">
               <span className="text-blue-500 font-bold flex items-center gap-1">
                 <Zap size={14} fill="currentColor" /> {theme.rating}
               </span>
               <span className="text-xs text-gray-400">/ 10</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Details View */}
      <div className="lg:col-span-8 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-y-auto custom-scrollbar">
        <div className="p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-8 mb-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{selected.name}</h2>
              <p className="text-lg text-blue-600 font-medium">{selected.tagline}</p>
            </div>
            <div className="mt-4 md:mt-0 text-right bg-blue-50 px-6 py-3 rounded-2xl">
              <div className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-1">India Fit Score</div>
              <div className="text-2xl font-bold text-gray-900">{selected.indiaScore}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mb-10">
            <div>
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                <CheckCircle size={20} className="text-green-500" /> Why It Converts
              </h4>
              <ul className="space-y-3">
                {selected.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-gray-700 bg-green-50/50 px-4 py-3 rounded-xl border border-green-100/50">
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
                <X size={20} className="text-red-500" /> Considerations
              </h4>
              <div className="text-sm text-gray-700 bg-red-50/50 px-4 py-3 rounded-xl border border-red-100/50">
                {Array.isArray(selected.cons) ? (
                    <ul className="list-disc pl-4 space-y-1">
                        {selected.cons.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                ) : selected.cons}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">Key Features</h4>
            <div className="flex flex-wrap gap-3">
              {selected.features.map((feat, i) => (
                <span key={i} className="text-sm font-medium bg-gray-50 border border-gray-200 text-gray-600 px-4 py-2 rounded-full">
                  {feat}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold mb-2 flex items-center gap-2 text-blue-300">
                <Globe size={20}/> Best Use Case
              </h4>
              <p className="text-gray-200 text-lg leading-relaxed">{selected.idealFor}</p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10">
              <Layout size={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomizationHub = () => {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl shadow-sm">
        <h3 className="font-bold text-blue-900 text-lg mb-2">Why Customize?</h3>
        <p className="text-blue-800 text-sm leading-relaxed">
          Western themes don't account for India's "Trust Deficit." Features like WhatsApp Chat and UPI offers are critical for reducing CAC and RTO. Use these snippets to bridge the gap.
        </p>
      </div>

      <div className="space-y-6">
        {CODE_SNIPPETS.map((snippet, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg shadow-gray-100">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{snippet.title}</h4>
                <p className="text-sm text-gray-500">{snippet.desc}</p>
              </div>
              <button 
                onClick={() => copyToClipboard(snippet.code, idx)}
                className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-all duration-200 ${
                  copied === idx 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                }`}
              >
                {copied === idx ? <CheckCircle size={14} /> : <Copy size={14}/>}
                {copied === idx ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <div className="bg-[#1e1e1e] p-6 overflow-x-auto">
              <pre className="text-sm text-gray-300 font-mono leading-relaxed">
                {snippet.code}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Checklist = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Set Brand Colors & Fonts", checked: false, category: "Foundation" },
    { id: 2, text: "Upload 20 Test Products", checked: false, category: "Foundation" },
    { id: 3, text: "Create Policies (Return, Ship, Privacy)", checked: false, category: "Foundation" },
    { id: 4, text: "Install Review App (Judge.me/Loox)", checked: false, category: "Conversion" },
    { id: 5, text: "Setup WhatsApp Chat Button", checked: false, category: "Conversion" },
    { id: 6, text: "Configure Klaviyo Abandoned Cart", checked: false, category: "Conversion" },
    { id: 7, text: "Add Instagram Feed/Reels", checked: false, category: "Content" },
    { id: 8, text: "Test Checkout on Mobile (Android)", checked: false, category: "Testing" },
    { id: 9, text: "Verify Shipping Zones & Rates", checked: false, category: "Testing" },
    { id: 10, text: "Google PageSpeed Check (>85 Mobile)", checked: false, category: "Testing" },
  ]);

  const toggle = (id) => {
    setItems(items.map(item => item.id === id ? {...item, checked: !item.checked} : item));
  };

  const progress = Math.round((items.filter(i => i.checked).length / items.length) * 100);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-3xl font-bold text-gray-900">Launch Readiness</h2>
          <span className="font-mono text-2xl font-bold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div className="bg-blue-600 h-3 rounded-full transition-all duration-500 shadow-lg shadow-blue-200" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <div 
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`flex items-center p-5 rounded-2xl border cursor-pointer transition-all duration-200 ${
              item.checked 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-white border-gray-100 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className={`w-6 h-6 rounded-md border-2 mr-5 flex items-center justify-center transition-colors ${
              item.checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'
            }`}>
              {item.checked && <CheckCircle size={16} className="text-white" />}
            </div>
            <div>
              <p className={`font-medium text-lg ${item.checked ? 'text-blue-900/60 line-through' : 'text-gray-900'}`}>
                {item.text}
              </p>
              <span className={`text-xs font-bold uppercase tracking-wider ${item.checked ? 'text-blue-300' : 'text-gray-400'}`}>{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'Dashboard' && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === 'Decision Tree' && <DecisionTree setActiveTab={setActiveTab} />}
        {activeTab === 'Themes' && <ThemeExplorer />}
        {activeTab === 'India Custom' && <CustomizationHub />}
        {activeTab === 'Checklist' && <Checklist />}
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 mt-20 py-10 text-center">
        <div className="flex justify-center items-center gap-2 mb-4 opacity-50 grayscale hover:grayscale-0 transition-all">
          <ArloxLogo />
        </div>
        <p className="text-sm text-gray-500">© 2025 Arlox.io | Built for Fashion E-commerce Excellence.</p>
      </footer>
    </div>
  );
};

export default App;