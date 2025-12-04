"use client";

import React, { useState, useEffect } from "react";
// 1. Import the router hook
import { useRouter } from "next/navigation"; 
import {
  Youtube, Instagram, Facebook, Linkedin,
  BookMarked,
  BarChart3,
  ShoppingBag,
  Layers,
  Zap,
  Palette,
  Monitor,
  Award,
  TrendingUp,
  Clock,
  CheckCircle2,
  Menu,
  X,
  ArrowRight,
  Share2,
  Calculator,
  PlayCircle,
  CheckSquare,
  LayoutDashboard,
  UserX
} from "lucide-react";
import Navbar from "@/components/Navbar";

/* ---------- CONSTANTS ---------- */
const COLORS = {
  primary: "#2563EB",
  primaryDark: "#1E40AF",
  secondary: "#0F172A",
  accent: "#3B82F6",
  background: "#FFFFFF",
  surface: "#F8FAFC",
  border: "#E2E8F0",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
};

const ROADMAP_DATA = {
  1: {
    title: "Foundation & Trust",
    tasks: [
      "Install Judge.me (Free Plan)",
      "Add Trust Badges below Add-to-Cart",
      "Optimize Images (TinyIMG)",
      "Create Size Guides for Apparel",
      "Add Free Shipping Banner",
      "Setup Welcome Email Flow",
    ],
  },
  2: {
    title: "Urgency & Automation",
    tasks: [
      "Setup Abandoned Cart Email Flow (3 emails)",
      "Implement Low Stock Counter (Hurrify)",
      "Add Exit-Intent Popup (10% Off)",
      "Configure 'Back in Stock' Alerts",
      "Enable SMS Recovery (Cartly/Klaviyo)",
      "Add Countdown Timer for Sales (Generic Scarcity)",
    ],
  },
  3: {
    title: "Social Proof & Upsells",
    tasks: [
      "Launch Photo Review Campaign (Incentivized)",
      "Add 'Frequently Bought Together' Widget",
      "Setup Post-Purchase Upsell (Rebuy)",
      "Implement 'Recently Viewed' Slider",
      "Add 'Real-time Purchase' Notifications",
      "Create Product Bundles (Lookbook)",
    ],
  },
  4: {
    title: "Friction & Checkout",
    tasks: [
      "Enable Guest Checkout (Mandatory)",
      "Simplify Checkout Form Fields",
      "Add Local Payment Options (UPI/Wallets)",
      "Implement One-Click Checkout (ShopPay)",
      "Add Security Badges to Checkout Footer",
      "Test Site Speed (Target < 2s)",
    ],
  },
};

/* ---------- SMALL SUB-COMPONENTS ---------- */

const Confetti = ({ active }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-fall rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            backgroundColor: [
              COLORS.primary,
              COLORS.success,
              COLORS.warning,
            ][Math.floor(Math.random() * 3)],
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            animationDuration: `${Math.random() * 1.5 + 1.5}s`,
            animationDelay: `${Math.random() * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
};

const SectionCard = ({ number, title, icon: Icon, description, metrics, time, onClick, status }) => (
  <div
    onClick={onClick}
    className="group relative bg-white rounded-xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
  >
    <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-bl-xl
      ${status === "completed" ? "bg-emerald-100 text-emerald-700" :
      status === "in-progress" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}>
      {status === "completed" ? "Completed" : status === "in-progress" ? "In Progress" : "Not Started"}
    </div>

    <div className="flex justify-between items-start mb-4 mt-2">
      <div className="p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        <Icon size={28} />
      </div>
      <span className="text-xs font-bold text-slate-300 group-hover:text-slate-400">SEC {number}</span>
    </div>

    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>

    <div className="bg-amber-50 border-l-2 border-amber-400 p-2 mb-4">
      <p className="text-xs text-amber-900 font-medium italic">Why It Matters: {description}</p>
    </div>

    <div className="space-y-3">
      {metrics.map((m, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          {m}
        </div>
      ))}
    </div>

    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
        <Clock size={12} /> {time}
      </span>
      <span className="text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
        Explore <ArrowRight size={14} />
      </span>
    </div>
  </div>
);

const FlipCard = ({ title, icon, content, example }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      className="relative w-full h-64 perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-all duration-700 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}>
        <div className="absolute w-full h-full backface-hidden bg-white border border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md">
          <div className="mb-4 p-4 bg-blue-50 rounded-full text-blue-600 text-4xl">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <p className="text-slate-500 text-sm mt-2">Hover to reveal principle</p>
        </div>

        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-900 text-white rounded-xl p-6 flex flex-col justify-center shadow-xl">
          <h4 className="font-bold text-blue-400 mb-2 text-sm uppercase tracking-wide">Psychology Principle</h4>
          <p className="text-sm mb-4 leading-relaxed">{content}</p>
          <div className="bg-slate-800 p-3 rounded text-xs border border-slate-700">
            <span className="text-emerald-400 font-bold block mb-1">Real World Example:</span>
            "{example}"
          </div>
        </div>
      </div>
    </div>
  );
};


/* ---------- MAIN APP ---------- */

const App = () => {
  // 2. Initialize the Router
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("visual");
  const [activeWeek, setActiveWeek] = useState(1);
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  const [traffic, setTraffic] = useState(10000);
  const [convRate, setConvRate] = useState(2.0);
  const [aov, setAov] = useState(2000);
  const [reviewCount, setReviewCount] = useState(50);
  const [frictionToggle, setFrictionToggle] = useState({ guest: false, autoFill: false, minimal: false });

  const [checklist, setChecklist] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  const currentRevenue = traffic * (convRate / 100) * aov;
  const projectedRevenue = traffic * ((convRate + 1.5) / 100) * aov;
  const lift = Math.max(0, Math.round(projectedRevenue - currentRevenue));

  const reviewImpact = reviewCount < 10 ? 0 : reviewCount < 50 ? 1.5 : reviewCount < 100 ? 2.8 : 4.2;
  const frictionTime = 120 - (frictionToggle.guest ? 45 : 0) - (frictionToggle.autoFill ? 20 : 0) - (frictionToggle.minimal ? 15 : 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTask = (id) => {
    setChecklist((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      if (!prev[id]) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1800);
      }
      return newState;
    });
  };

  // 3. Updated Sections Array with 'path' properties
  const sections = [
    { 
      id: 1, 
      title: "Critical Benchmarks", 
      path: "/benchmarks", // Route path
      icon: BarChart3, 
      description: "You can't optimize what you don't measure.", 
      metrics: ["US Conv: 2.9-3.3%", "India Conv: 1.8-2.4%", "Page Speed Targets"], 
      time: "2-3 hours" 
    },
    { 
      id: 2, 
      title: "Homepage Must-Haves", 
      path: "/homepage-essentials",
      icon: Monitor, 
      description: "3-5 seconds to build trust or lose them.", 
      metrics: ["Hero Clarity Test", "Sticky Nav Logic", "Trust Signal Placement"], 
      time: "4-6 hours" 
    },
    { 
      id: 3, 
      title: "Collection Essentials", 
      path: "/collection-strategy",
      icon: Layers, 
      description: "Friction here kills 40% of conversions.", 
      metrics: ["Filter Strategy", "Grid Density (US vs IN)", "Quick View Logic"], 
      time: "5-8 hours" 
    },
    { 
      id: 4, 
      title: "Product Page Power", 
      path: "/product-page-optimization",
      icon: ShoppingBag, 
      description: "Your digital salesperson.", 
      metrics: ["8-12 Image Rule", "Size Guide Strategy", "Objection Handling"], 
      time: "8-10 hours" 
    },
    { 
      id: 5, 
      title: "Design Principles", 
      path: "/design-principles",
      icon: Palette, 
      description: "Design is not decoration; it's engineering.", 
      metrics: ["48px Touch Targets", "Visual Hierarchy", "Color Psychology"], 
      time: "Ongoing" 
    },
    { 
      id: 6, 
      title: "Theme Selection", 
      path: "/theme-selection",
      icon: LayoutDashboard, 
      description: "The foundation of performance.", 
      metrics: ["Turbo vs Prestige", "Mobile-First Logic", "Speed Optimization"], 
      time: "2-4 hours" 
    },
    { 
      id: 7, 
      title: "App Stack ROI", 
      path: "/app-stack",
      icon: Zap, 
      description: "Revenue multipliers, not expenses.", 
      metrics: ["Reviews (Judge.me)", "Urgency (Hurrify)", "Email (Klaviyo)"], 
      time: "4-6 hours" 
    },
    { 
      id: 8, 
      title: "Trust & Badges", 
      path: "/trust-signals",
      icon: Award, 
      description: "Silent salespeople that answer objections.", 
      metrics: ["Badge Hierarchy", "Checkout Trust", "Authority Signals"], 
      time: "2 hours" 
    },
    { 
      id: 9, 
      title: "Elite Strategies", 
      path: "/elite-strategies",
      icon: TrendingUp, 
      description: "What the top 1% do differently.", 
      metrics: ["Visual Excellence", "Frictionless Checkout", "Urgency Balance"], 
      time: "Advanced" 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 relative">

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .rotate-y-180 > .backface-hidden { backface-visibility: hidden; }
        .animate-fall { animation-name: confettiFall; animation-timing-function: linear; animation-iteration-count: 1; }
        @keyframes confettiFall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0.9; }
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Sticky Bookmark / Share Bar */}
      <div className="fixed top-24 right-0 z-50 flex flex-col gap-2 p-2">
        <button
          onClick={() => { alert("Page Bookmarked!"); }}
          className="bg-white p-3 rounded-l-xl shadow-lg border-y border-l border-slate-200 hover:bg-blue-50 hover:text-blue-600 transition-all group"
          title="Bookmark this page"
        >
          <BookMarked size={20} className="text-slate-600 group-hover:text-blue-600" />
        </button>
        <button
          onClick={() => { navigator.clipboard?.writeText(location.href); alert("Link copied to clipboard!"); }}
          className="bg-white p-3 rounded-l-xl shadow-lg border-y border-l border-slate-200 hover:bg-blue-50 hover:text-blue-600 transition-all group"
          title="Share with team"
        >
          <Share2 size={20} className="text-slate-600 group-hover:text-blue-600" />
        </button>
      </div>

     <Navbar />

      {/* Hero */}
      <header className="relative pt-32 pb-24 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-50"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              Interactive CRO Blueprint
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Your 80-20 Fashion <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">E-commerce Playbook</span>
            </h1>

            <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
              Master the 20% of elements that drive 80% of conversions. An interactive command center for Arlox brands.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <button
  onClick={() => document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth", block: "start" })}
  className="px-8 py-4 bg-blue-800 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200/50 flex items-center gap-2"
  aria-controls="roadmap"
>
  Start 30-Day Roadmap <ArrowRight size={20} />
</button>

              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg text-sm text-slate-600">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">A</div>)}
                </div>
                Based on 87+ Top Brands
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Calculator className="text-blue-600" size={20} />
                Potential Impact
              </h3>
              <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">LIVE CALC</span>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Monthly Visitors</label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={traffic}
                  onChange={(e) => setTraffic(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="text-right font-mono font-bold text-slate-900">{traffic.toLocaleString()}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Conv. Rate (%)</label>
                  <input
                    type="number"
                    value={convRate===0?"":convRate}
                    step="0.1"
                    onChange={(e) => setConvRate(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">AOV (₹)</label>
                  <input
                    type="number"
                    value={aov===0?"":aov}
                    step="100"
                    onChange={(e) => setAov(Number(e.target.value))}
                    className="w-full p-2 border border-slate-200 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-slate-500">Projected Monthly Lift</span>
                  <span className="text-2xl font-bold text-emerald-600">+₹{lift.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-[60%] animate-pulse"></div>
                </div>
                <p className="text-xs text-center mt-3 text-slate-400">By optimizing from {convRate}% to {(convRate + 1.5).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">

        {/* HUB */}
        <section id="hub">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Navigation Hub</h2>
              <p className="text-slate-500 max-w-2xl">The comprehensive breakdown. Click a card to dive deep into specific modules.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
              <span className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-500"></span> Completed
              <span className="w-3 h-3 rounded-full bg-blue-100 border border-blue-500 ml-3"></span> In Progress
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((s) => (
              <SectionCard
                key={s.id}
                number={s.id}
                title={s.title}
                icon={s.icon}
                description={s.description}
                metrics={s.metrics}
                time={s.time}
                status={s.id === 1 ? "completed" : s.id === 2 ? "in-progress" : "not-started"}
                // 4. Update OnClick to push to the path defined in the data
                onClick={() => router.push(s.path)}
              />
            ))}
          </div>
        </section>

        {/* ROADMAP */}
        <section id="roadmap" className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">30-Day Execution Roadmap</h2>
                <p className="text-slate-400">Don't do everything at once. Follow the sequence.</p>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 text-sm font-mono">
                Week {activeWeek}: {ROADMAP_DATA[activeWeek].title}
              </div>
            </div>

            <div className="relative mb-16">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-700 -translate-y-1/2 rounded-full"></div>
              <div className="relative z-10 grid grid-cols-4 gap-4">
                {[
                  { week: 1, title: "Foundation", color: "bg-emerald-500", border: "border-emerald-500" },
                  { week: 2, title: "Urgency", color: "bg-blue-500", border: "border-blue-500" },
                  { week: 3, title: "Social Proof", color: "bg-amber-500", border: "border-amber-500" },
                  { week: 4, title: "Checkout", color: "bg-purple-500", border: "border-purple-500" }
                ].map((w) => (
                  <div key={w.week} onClick={() => setActiveWeek(w.week)} className="flex flex-col items-center cursor-pointer group">
                    <div className={`w-12 h-12 rounded-full border-4 ${w.week === activeWeek ? "scale-125 ring-4 ring-white/20" : ""} ${w.border} ${w.week === activeWeek ? w.color : "bg-slate-900"} flex items-center justify-center font-bold text-white shadow-lg z-10 transition-all duration-300`}>
                      {w.week}
                    </div>
                    <div className="mt-4 text-center">
                      <h4 className={`font-bold transition-colors ${w.week === activeWeek ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}>Week {w.week}</h4>
                      <span className={`text-xs uppercase tracking-wider ${w.week === activeWeek ? "text-blue-300" : "text-slate-600"}`}>{w.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md" key={activeWeek}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-3"><CheckSquare className="text-emerald-400" /> Week {activeWeek} Tasks</h3>
                <Confetti active={showConfetti} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {ROADMAP_DATA[activeWeek].tasks.map((task, i) => {
                  const taskId = `w${activeWeek}-t${i}`;
                  return (
                    <div key={taskId} onClick={() => toggleTask(taskId)} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${checklist[taskId] ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-200" : "bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-300"}`}>
                      <div className={`w-6 h-6 rounded border flex items-center justify-center flex-shrink-0 ${checklist[taskId] ? "bg-emerald-500 border-emerald-500" : "border-slate-500"}`}>
                        {checklist[taskId] && <CheckCircle2 size={16} className="text-white" />}
                      </div>
                      <span className={checklist[taskId] ? "line-through opacity-70" : ""}>{task}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* TOOLS / TABS */}
        <section id="tools">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Top Performers Showcase</h2>
            <p className="text-slate-500">Interactive comparison: Average vs. Elite.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg">
            <div className="flex border-b border-slate-100 overflow-x-auto">
              {["visual", "trust", "friction"].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 min-w-[150px] py-4 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === tab ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:bg-slate-50"}`}>
                  {tab === "visual" ? "Visual Excellence" : tab === "trust" ? "Trust Maximization" : "Friction Reduction"}
                </button>
              ))}
            </div>

            <div className="p-8 min-h-[400px] bg-slate-50">
              {/* TAB: VISUAL */}
              {activeTab === "visual" && (
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase">Why it matters</div>
                    <h3 className="text-2xl font-bold text-slate-900">Conversion Impact of Imagery</h3>
                    <p className="text-slate-600 leading-relaxed">Customers cannot touch the product. Your images must bridge that gap. Elite brands provide a "Tactile" visual experience.</p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-slate-200">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center font-bold">X</div>
                        <div>
                          <h4 className="font-bold text-slate-800">The "Average" Mistake</h4>
                          <p className="text-sm text-slate-500">3-4 images, white background only. No context, no texture detail. Returns are 40% higher.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-blue-200 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center font-bold">✓</div>
                        <div>
                          <h4 className="font-bold text-slate-800">The "Elite" Standard</h4>
                          <p className="text-sm text-slate-500">8-12 images + Video. Lifestyle shots, fabric closeups, model stats. Conversion +30%.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden relative mb-4">
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white">
                        <div className="text-center">
                          <PlayCircle size={48} className="mx-auto mb-2 opacity-80" />
                          <span className="font-bold">VIDEO IS NON-NEGOTIABLE</span>
                          <p className="text-sm opacity-70">80% of top brands use video on PDP</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs font-mono text-slate-500">
                      <span>Source: Arlox Internal Data</span>
                      <span className="text-emerald-600 font-bold">Impact: +12% Add to Cart</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: TRUST */}
              {activeTab === "trust" && (
                <div>
                  <div className="text-center max-w-2xl mx-auto mb-10">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">The Review Volume Simulator</h3>
                    <p className="text-slate-600">Drag the slider to see how review count correlates with conversion rate.</p>
                  </div>

                  <div className="bg-white p-10 rounded-2xl border border-slate-200 text-center max-w-3xl mx-auto shadow-sm">
                    <div className="flex items-center justify-center gap-4 mb-8">
                      <div className="text-right">
                        <div className="text-sm text-slate-400 font-bold uppercase">Review Count</div>
                        <div className="text-3xl font-bold text-slate-900">{reviewCount}</div>
                      </div>
                      <ArrowRight className="text-slate-300" />
                      <div className="text-left">
                        <div className="text-sm text-slate-400 font-bold uppercase">Avg. Conversion</div>
                        <div className={`text-5xl font-black transition-colors duration-300 ${reviewImpact > 3 ? "text-emerald-500" : reviewImpact > 2 ? "text-blue-500" : "text-amber-500"}`}>
                          {reviewImpact}%
                        </div>
                      </div>
                    </div>

                    <div className="relative pt-6 pb-2">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={reviewCount}
                        onChange={(e) => setReviewCount(Number(e.target.value))}
                        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono uppercase">
                        <span>Launch (0)</span>
                        <span>Growth (50)</span>
                        <span>Scale (100+)</span>
                        <span>Elite (200+)</span>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-600">
                      {reviewCount < 10 && "🚫 Fewer than 10 reviews creates 'Ghost Town' syndrome. Conversion is suppressed."}
                      {reviewCount >= 10 && reviewCount < 50 && "⚠️ Basic trust established. Conversion baseline reached."}
                      {reviewCount >= 50 && reviewCount < 100 && "✅ Social proof kicking in. Expect ~15% lift in conversion."}
                      {reviewCount >= 100 && "🔥 Elite Trust. 'Bandwagon Effect' drives impulse purchases."}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: FRICTION */}
              {activeTab === "friction" && (
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Checkout Friction Calculator</h3>
                    <p className="text-slate-600 mb-6">Every second spent in checkout increases abandonment probability. Use the toggles to see how optimizing the flow saves time.</p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <UserX className="text-blue-500" />
                          <span className="font-bold text-slate-700">Enable Guest Checkout</span>
                        </div>
                        <button onClick={() => setFrictionToggle(p => ({...p, guest: !p.guest}))} className={`w-12 h-6 rounded-full p-1 transition-colors ${frictionToggle.guest ? "bg-emerald-500" : "bg-slate-300"}`}>
                          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${frictionToggle.guest ? "translate-x-6" : ""}`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Zap className="text-amber-500" />
                          <span className="font-bold text-slate-700">Address Auto-Complete</span>
                        </div>
                        <button onClick={() => setFrictionToggle(p => ({...p, autoFill: !p.autoFill}))} className={`w-12 h-6 rounded-full p-1 transition-colors ${frictionToggle.autoFill ? "bg-emerald-500" : "bg-slate-300"}`}>
                          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${frictionToggle.autoFill ? "translate-x-6" : ""}`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <LayoutDashboard className="text-purple-500" />
                          <span className="font-bold text-slate-700">Minimal Header/Footer</span>
                        </div>
                        <button onClick={() => setFrictionToggle(p => ({...p, minimal: !p.minimal}))} className={`w-12 h-6 rounded-full p-1 transition-colors ${frictionToggle.minimal ? "bg-emerald-500" : "bg-slate-300"}`}>
                          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${frictionToggle.minimal ? "translate-x-6" : ""}`} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 text-white p-8 rounded-2xl text-center shadow-xl">
                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Est. Time to Complete</div>
                    <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center">
                      <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-emerald-500 rounded-full transition-all duration-700" style={{ clipPath: `polygon(0 0, 100% 0, 100% ${frictionTime}%, 0 ${frictionTime}%)` }} />
                      <div>
                        <div className="text-5xl font-mono font-bold">{frictionTime}s</div>
                        <div className="text-xs text-slate-500">Industry Avg: 120s</div>
                      </div>
                    </div>

                    <div className="text-emerald-400 font-bold">You saved {120 - frictionTime} seconds!</div>
                    <p className="text-xs text-slate-500 mt-2">Impact: ~{Math.round((120 - frictionTime) * 0.5)}% decrease in abandonment</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PSYCHOLOGY */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Conversion Psychology</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FlipCard title="Social Proof" icon="👥" content="People assume the actions of others reflect the correct behavior for a given situation. Reduces uncertainty." example='"Priya from Mumbai bought this 2h ago"' />
            <FlipCard title="Scarcity (FOMO)" icon="🔥" content="Items appear more valuable when availability is limited. Triggers loss aversion." example='"Only 3 left in Size M"' />
            <FlipCard title="Loss Aversion" icon="📉" content="The pain of losing is psychologically about twice as powerful as the pleasure of gaining." example='"Save ₹1,050" > "20% Off"' />
            <FlipCard title="Paradox of Choice" icon="😵‍💫" content="Too many choices lead to anxiety and non-action. Limit options to guide decisions." example='Showing 3 "Recommended" products vs 20' />
          </div>
        </section>

      </main>

 {/* Footer */}
<footer className="relative bg-slate-900 text-slate-400 pt-24 pb-12 border-t border-slate-800 overflow-hidden">

  {/* Ambient Glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-10 left-1/3 w-[500px] h-[500px] bg-blue-600/20 blur-[130px] rounded-full"></div>
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[140px] rounded-full"></div>
  </div>

  {/* Floating Wave Decorations */}
  <div className="absolute top-0 left-0 w-full opacity-10">
    <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M0,160 C240,80 480,80 720,140 C960,200 1200,200 1440,120 L1440,0 L0,0 Z"
        fill="url(#gradientWave)"
      />
      <defs>
        <linearGradient id="gradientWave" x1="0" x2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
    </svg>
  </div>

  <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

    {/* BRAND & LOGO BLOCK */}
    <div className="space-y-6">
      <div className="flex items-center gap-3 group">
        {/* Clickable logo */}
        <a href="https://www.arlox.io/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-lg ring-1 ring-white/10 group-hover:scale-105 transition-all">
          <img
            src="/arlox_logo_black.png"
            alt="Arlox Logo"
            className="object-contain w-10 h-10 opacity-95 hover:opacity-100 transition"
          />
        </a>

        <a href="https://www.arlox.io/" target="_blank" rel="noopener noreferrer" className="group-hover:text-blue-400 transition">
          <span className="font-extrabold text-3xl text-white tracking-tight">
            Arlox<span className="text-blue-500">.io</span>
          </span>
        </a>
      </div>

      <p className="max-w-sm text-slate-400 leading-relaxed">
        We help fashion brands unlock 80-20 CRO improvements through world-class UX, psychology-driven design, and data-backed processes.
      </p>

      {/* Social (lucide icons with rounded backgrounds) */}
      <div className="flex items-center gap-3 pt-2">
        <a
          href="https://www.youtube.com/@arlox-io"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Arlox YouTube"
          className="p-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-all shadow-sm hover:shadow-red-500/20"
        >
          <Youtube size={20} />
        </a>

        <a
          href="https://www.instagram.com/arlox.io/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Arlox Instagram"
          className="p-2 rounded-xl bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white transition-all shadow-sm hover:shadow-pink-500/20"
        >
          <Instagram size={20} />
        </a>

        <a
          href="https://www.facebook.com/arlox.io"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Arlox Facebook"
          className="p-2 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-all shadow-sm hover:shadow-blue-500/20"
        >
          <Facebook size={20} />
        </a>

        <a
          href="https://www.linkedin.com/company/arlox-io"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Arlox LinkedIn"
          className="p-2 rounded-xl bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white transition-all shadow-sm hover:shadow-sky-500/20"
        >
          <Linkedin size={20} />
        </a>
      </div>

      <div className="text-xs text-slate-500 pt-4">
        © {new Date().getFullYear()} Arlox.io • Crafted with passion
      </div>
    </div>

    {/* NEWSLETTER BLOCK */}
    <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <h3 className="text-white font-semibold flex items-center gap-3">
        Weekly CRO Sparks
        <span className="text-xs bg-blue-600/30 px-2 py-0.5 rounded-full border border-blue-500/40">NEW</span>
      </h3>

      <p className="text-sm text-slate-400 mt-1 mb-4">One high-impact optimization idea delivered every Friday.</p>

      <div className="flex gap-2">
        <input
          type="email"
          placeholder="you@brand.com"
          className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-bold shadow-blue-600/30">Join</button>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full" />
          Avg Lift:
          <span className="ml-auto font-mono text-emerald-400">+14%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full" />
          Trusted by:
          <span className="ml-auto font-mono">87+ brands</span>
        </div>
      </div>
    </div>

    {/* CTA BLOCK (Talk to Team) */}
    <div className="p-6 rounded-xl bg-gradient-to-b from-slate-800/60 to-slate-900/40 border border-slate-700 shadow-inner">
      <h3 className="text-white font-semibold text-lg mb-3">Want expert eyes on your store?</h3>

      {/* fixed: className (not classname) */}
      <p className="text-sm text-slate-400 mb-5">
        Our team reviews your homepage, PDP, checkout flow & recommends the fastest 80-20 improvements.
      </p>

      <a
        href="https://calendly.com/arlox-/strategy-call-1"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full block text-center py-3 bg-amber-500 hover:bg-amber-400 rounded-lg text-slate-900 font-extrabold text-sm tracking-wide shadow-xl hover:shadow-amber-500/20 transition active:scale-[0.98]"
      >
        Talk to Arlox Team →
      </a>

      <div className="text-xs text-slate-500 mt-4">
        Avg Response: <span className="text-slate-300 font-semibold">5–15 min</span>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="mt-16 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
    Built with ❤️ by Arlox CRO Team
  </div>
</footer>

{/* Mobile Calculator Toggle */}
<div className="md:hidden fixed bottom-4 right-4 z-50">
  <button
    onClick={() => setCalculatorOpen(!calculatorOpen)}
    className="w-14 h-14 bg-blue-600 rounded-full text-white shadow-2xl flex items-center justify-center"
    aria-label="Open calculator"
  >
    <Calculator size={24} />
  </button>
</div>



    </div>
  );
};

export default App;