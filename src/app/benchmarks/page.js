"use client";

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Smartphone, 
  Monitor, 
  ShoppingCart, 
  Zap, 
  Globe, 
  ArrowRight, 
  DollarSign, 
  Percent,
  Activity,
  Award,
  Calendar,
  AlertTriangle,
  BarChart2,
  Layers
} from 'lucide-react';

// --- Components ---

const Section = ({ title, children, className = "" }) => (
  <div className={`mb-12 ${className}`}>
    <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
      {title}
    </h2>
    {children}
  </div>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${className}`}>
    {children}
  </div>
);

const StatCard = ({ icon: Icon, label, value, subtext, trend, highlight = false }) => (
  <Card className={`${highlight ? 'border-blue-500 ring-1 ring-blue-100' : ''}`}>
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${highlight ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600'}`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="inline-flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide mb-1">{label}</h3>
    <div className="text-2xl font-bold text-slate-900 mb-2">{value}</div>
    {subtext && <p className="text-sm text-slate-400 leading-snug">{subtext}</p>}
  </Card>
);

const ProgressBar = ({ label, value, max, color = "bg-blue-600", secondaryLabel }) => {
  const width = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{secondaryLabel}</span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out`} 
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const ComparisonTable = ({ data, market }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="p-4 border-b border-slate-200 bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">Metric</th>
          <th className="p-4 border-b border-slate-200 bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">Baseline (Good)</th>
          <th className="p-4 border-b border-slate-200 bg-slate-50 text-blue-600 text-xs font-bold uppercase tracking-wider">Target (Great)</th>
          <th className="p-4 border-b border-slate-200 bg-slate-50 text-blue-800 text-xs font-bold uppercase tracking-wider">Arloxian (Best)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
            <td className="p-4 font-medium text-slate-700">{row.metric}</td>
            <td className="p-4 text-slate-600">{row.good}</td>
            <td className="p-4 text-slate-900 font-semibold">{row.great}</td>
            <td className="p-4 text-blue-600 font-bold bg-blue-50/50">{row.best}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Data Constants ---

const DATA = {
  USA: {
    conversion: {
      industry: "2.9% - 3.3%",
      top: "4.0% - 5.2%",
      arlox: "5.5% - 7.0%",
      mobile: "1.8% - 2.5%",
      desktop: "3.5% - 4.8%"
    },
    traffic: {
      mobileShare: 70, // avg of 65-75
      desktopShare: 25, // avg of 20-30
      mobileRev: "45-55%",
      desktopRev: "40-50%"
    },
    aov: [
      { type: "Fast Fashion", value: "$45 - $75" },
      { type: "Mid-Market", value: "$80 - $150" },
      { type: "Premium", value: "$150 - $350" },
      { type: "Luxury", value: "$350+" }
    ],
    speed: {
      target: "< 2s",
      optimal: "< 1.5s",
      mobile: "< 3s",
      penalty: "Conversion drops 7% per sec > 3s"
    },
    cart: {
      abandonment: "68% - 72%",
      topAbandonment: "55% - 62%",
      addToCart: "8% - 12%",
      checkout: "28% - 32%"
    },
    goodVsGreat: [
      { metric: "Conversion Rate", good: "2.5-3.0%", great: "4.0-5.0%", best: "6.0%+" },
      { metric: "Mobile CR", good: "1.8-2.2%", great: "3.0-3.5%", best: "4.5%+" },
      { metric: "AOV", good: "$75-90", great: "$120-150", best: "$180+" },
      { metric: "Cart Abandonment", good: "70-75%", great: "60-65%", best: "<58%" },
      { metric: "Return Customer Rate", good: "25-30%", great: "40-50%", best: "55%+" },
      { metric: "Page Load (Desktop)", good: "<3s", great: "<2s", best: "<1.5s" },
      { metric: "Page Load (Mobile)", good: "<4s", great: "<3s", best: "<2s" },
    ],
    seasons: [
      { 
        name: "Black Friday / Cyber Monday", 
        months: "Nov",
        traffic: "150-250%", 
        revenue: "200-300%",
        cpm: "+80% to +120%",
        roas: "High Vol (Lower Margin)",
        convLift: "+80% to +100%",
        strategy: "Scale Aggressively"
      },
      { 
        name: "Holiday Season", 
        months: "Nov-Dec",
        traffic: "180-220%", 
        revenue: "Peak",
        cpm: "+40% to +60%",
        roas: "Stable / High",
        convLift: "+40% to +60%",
        strategy: "Focus on Gifting / Bundles"
      },
      { 
        name: "Back-to-School", 
        months: "Aug-Sep",
        traffic: "130-150%", 
        revenue: "High",
        cpm: "+20% to +35%",
        roas: "Moderate",
        convLift: "+20%",
        strategy: "Category Specific Push"
      },
      { 
        name: "Spring/Summer Launch", 
        months: "Mar-Apr",
        traffic: "120-140%", 
        revenue: "Moderate",
        cpm: "Normal / +10%",
        roas: "High Efficiency",
        convLift: "+15%",
        strategy: "New Arrivals / Full Price"
      }
    ],
    cost: {
      cac: "$25 - $60",
      cacPremium: "$80 - $150",
      ltv: "$150 - $400",
      ratio: "3:1 (Min) / 5:1 (Opt)",
      returns: "25% - 35%"
    },
    mvp: {
      conv: 2.5,
      aov: 75,
      cart: 75,
      repeat: 25
    }
  },
  INDIA: {
    conversion: {
      industry: "1.8% - 2.4%",
      top: "2.8% - 3.8%",
      arlox: "4.0% - 5.5%",
      mobile: "1.5% - 2.2%",
      desktop: "2.5% - 3.8%"
    },
    traffic: {
      mobileShare: 85, // avg of 80-90
      desktopShare: 12, // avg of 8-15
      mobileRev: "75-85%",
      desktopRev: "15-25%"
    },
    aov: [
      { type: "Fast Fashion", value: "₹800 - ₹1,500" },
      { type: "Mid-Market", value: "₹1,500 - ₹3,500" },
      { type: "Premium", value: "₹3,500 - ₹8,000" },
      { type: "Luxury", value: "₹8,000+" }
    ],
    speed: {
      target: "< 3s",
      optimal: "< 1.5s",
      mobile: "< 4s",
      penalty: "Conversion drops 10% per sec > 4s"
    },
    cart: {
      abandonment: "75% - 82%",
      topAbandonment: "65% - 72%",
      addToCart: "6% - 10%",
      checkout: "22% - 28%",
      cod: "40% - 60% of Orders"
    },
    goodVsGreat: [
      { metric: "Conversion Rate", good: "1.8-2.2%", great: "2.8-3.5%", best: "4.5%+" },
      { metric: "Mobile CR", good: "1.5-1.9%", great: "2.5-3.2%", best: "4.0%+" },
      { metric: "AOV", good: "₹1,200-1,800", great: "₹2,500-3,500", best: "₹4,500+" },
      { metric: "Cart Abandonment", good: "78-82%", great: "68-72%", best: "<65%" },
      { metric: "Return Customer Rate", good: "18-25%", great: "35-42%", best: "48%+" },
      { metric: "Page Load (Mobile)", good: "<4s", great: "<3s", best: "<2.5s" },
      { metric: "COD Conversion", good: "45-60%", great: "35-45%", best: "<30% (Shift Prepaid)" },
    ],
    seasons: [
      { 
        name: "Diwali Festive", 
        months: "Oct-Nov",
        traffic: "200-300%", 
        revenue: "2.5x - 4x",
        cpm: "+50% to +80%",
        roas: "High (Vol Driven)",
        convLift: "+80% to +120%",
        strategy: "High Budget Scale"
      },
      { 
        name: "Marketplace Sales", 
        months: "Jan, Aug, Oct",
        traffic: "180-250%", 
        revenue: "High Vol",
        cpm: "+40% (Competition)",
        roas: "Moderate",
        convLift: "+50% to +70%",
        strategy: "Ride the Wave"
      },
      { 
        name: "Wedding Season", 
        months: "Nov-Feb",
        traffic: "140-180%", 
        revenue: "High AOV",
        cpm: "+20% to +30%",
        roas: "Very High (AOV Driven)",
        convLift: "+30% to +40%",
        strategy: "Premium / Ethnic Focus"
      },
      { 
        name: "End of Season Sale", 
        months: "Jan, Jul",
        traffic: "160-200%", 
        revenue: "Clearance Vol",
        cpm: "Moderate",
        roas: "High Efficiency",
        convLift: "+60% (Discount Driven)",
        strategy: "Clear Inventory"
      }
    ],
    cost: {
      cac: "₹200 - ₹600",
      cacPremium: "₹800 - ₹1,500",
      ltv: "₹3,000 - ₹8,000",
      ratio: "4:1 (Min) / 6:1 (Opt)",
      returns: "18% - 28%"
    },
    mvp: {
      conv: 1.8,
      aov: 1500,
      cart: 80,
      repeat: 20
    }
  }
};

const COMPARISON = [
  { metric: "Mobile Traffic", us: "65-75%", ind: "80-90%", implication: "India: Mobile-first is non-negotiable" },
  { metric: "Conversion Rate", us: "2.9-3.3%", ind: "1.8-2.4%", implication: "India: Higher friction, lower trust baseline" },
  { metric: "AOV", us: "$80-150", ind: "₹1,500-3,500", implication: "India: Focus on volume, smaller baskets" },
  { metric: "COD Usage", us: "<5%", ind: "40-60%", implication: "India: Must offer COD, impacts cash flow" },
  { metric: "Cart Abandonment", us: "68-72%", ind: "75-82%", implication: "India: Higher abandonment = Needs WhatsApp Recovery" },
  { metric: "Return Rate", us: "25-35%", ind: "18-28%", implication: "India: Lower returns but harder to build loyalty" },
  { metric: "SMS Effectiveness", us: "9-12% conv", ind: "12-18% conv", implication: "India: SMS/WhatsApp 2X more critical than email" },
  { metric: "Social Commerce", us: "10-18%", ind: "22-35%", implication: "India: Instagram/FB shopping crucial" },
  { metric: "Payment Options", us: "3-5 methods", ind: "8-12 methods", implication: "India: UPI, Paytm, COD, Wallets essential" }
];

// --- Main Application ---

export default function ArloxBenchmarks() {
  const [market, setMarket] = useState("USA");
  const [activeTab, setActiveTab] = useState("overview"); // overview, compare, strategy

  // Profitability Calculator State
  const [calcConv, setCalcConv] = useState("");
  const [calcAov, setCalcAov] = useState("");
  const [calcCart, setCalcCart] = useState("");
  const [calcRepeat, setCalcRepeat] = useState("");

  const currentData = DATA[market];

  // Helper to check if inputs meet MVP
  const checkMVP = (val, target, type) => {
    if (!val) return "neutral";
    const num = parseFloat(val);
    if (type === 'min') return num >= target ? "pass" : "fail"; // For Conv, AOV, Repeat
    if (type === 'max') return num <= target ? "pass" : "fail"; // For Cart Abandon
    return "neutral";
  };

  const ArloxLogo = () => (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 relative">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="#2563EB" strokeWidth="8" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="text-2xl font-bold tracking-tight text-slate-800">
        Arlox<span className="text-slate-400">.io</span>
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* Inline styles for custom animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>

      {/* Navigation / Header */}
      <nav className="border-b border-slate-100 sticky top-0 z-50 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <ArloxLogo />
          
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`text-sm font-medium transition-colors ${activeTab === 'overview' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Benchmarks
            </button>
            <button 
              onClick={() => setActiveTab("compare")}
              className={`text-sm font-medium transition-colors ${activeTab === 'compare' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Market Comparison
            </button>
            <button 
              onClick={() => setActiveTab("strategy")}
              className={`text-sm font-medium transition-colors ${activeTab === 'strategy' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Strategy & Costs
            </button>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setMarket("USA")}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                market === "USA" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              USA Market
            </button>
            <button
              onClick={() => setMarket("INDIA")}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                market === "INDIA" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              India Market
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16 md:py-24 overflow-hidden relative">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Scientific Scaling <span className="text-blue-400">Benchmarks</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Data-driven insights from managing thousands of fashion e-commerce brands. 
            Calibrate your {market} store against Arlox's top performers.
          </p>
          <div className="mt-8 flex justify-center gap-4 text-sm font-mono text-blue-300">
            <span className="flex items-center gap-2"><Activity size={16}/> LIVE DATA MODE: {market}</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* --- TAB: OVERVIEW --- */}
        {activeTab === 'overview' && (
          <div className="animate-fadeIn">
            
            {/* KPI Grid */}
            <Section title="Performance Benchmarks">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard 
                  icon={TrendingUp} 
                  label="Industry Conv. Rate" 
                  value={currentData.conversion.industry} 
                  subtext="Average across all stores"
                />
                <StatCard 
                  icon={Award} 
                  label="Arlox Standard" 
                  value={currentData.conversion.arlox} 
                  subtext="90th Percentile Performance"
                  highlight={true}
                  trend="Best in Class"
                />
                <StatCard 
                  icon={Smartphone} 
                  label="Mobile Conversion" 
                  value={currentData.conversion.mobile} 
                  subtext={`Traffic Share: ${currentData.traffic.mobileShare}%`}
                />
                 <StatCard 
                  icon={Monitor} 
                  label="Desktop Conversion" 
                  value={currentData.conversion.desktop} 
                  subtext={`Traffic Share: ${currentData.traffic.desktopShare}%`}
                />
              </div>

              {/* Traffic & Device Split Visual */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="h-full">
                  <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Smartphone className="text-blue-500"/> Traffic & Device Split
                  </h3>
                  
                  <div className="space-y-8">
                    <div>
                      <ProgressBar 
                        label="Mobile Traffic" 
                        value={currentData.traffic.mobileShare} 
                        max={100} 
                        secondaryLabel={`${currentData.traffic.mobileShare}% of total sessions`}
                      />
                       <p className="text-xs text-slate-500 mt-1">
                        Revenue Share: <span className="font-medium text-slate-700">{currentData.traffic.mobileRev}</span> (High volume, lower conversion)
                      </p>
                    </div>

                    <div>
                      <ProgressBar 
                        label="Desktop Traffic" 
                        value={currentData.traffic.desktopShare} 
                        max={100} 
                        color="bg-indigo-500"
                        secondaryLabel={`${currentData.traffic.desktopShare}% of total sessions`}
                      />
                       <p className="text-xs text-slate-500 mt-1">
                        Revenue Share: <span className="font-medium text-slate-700">{currentData.traffic.desktopRev}</span> (Lower volume, higher conversion)
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="h-full">
                   <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Zap className="text-yellow-500"/> Page Speed Mandates
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3">
                      <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" size={20}/>
                      <div>
                        <span className="font-bold text-red-700">Crucial Warning</span>
                        <p className="text-sm text-red-600 mt-1">{currentData.speed.penalty}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-xl text-center">
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Target Load</div>
                        <div className="text-xl font-bold text-slate-800">{currentData.speed.target}</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-xl text-center border border-green-100">
                        <div className="text-xs text-green-600 uppercase font-bold mb-1">Optimal</div>
                        <div className="text-xl font-bold text-green-700">{currentData.speed.optimal}</div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <h4 className="text-sm font-semibold mb-2">Cart & Checkout Funnel</h4>
                       <div className="flex justify-between text-sm mb-1 text-slate-600">
                        <span>Add-to-Cart</span>
                        <span className="font-mono font-medium">{currentData.cart.addToCart}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1 text-slate-600">
                        <span>Cart Abandonment</span>
                        <span className="font-mono font-medium text-red-500">{currentData.cart.abandonment}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-600">
                        <span>Checkout Completion</span>
                        <span className="font-mono font-medium">{currentData.cart.checkout}</span>
                      </div>
                      {currentData.cart.cod && (
                         <div className="flex justify-between text-sm mt-1 text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                          <span>COD Orders</span>
                          <span className="font-mono">{currentData.cart.cod}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </Section>

            {/* Deep Dive Tables */}
            <Section title={`Good vs. Great: ${market} Standards`}>
              <Card className="overflow-hidden p-0">
                <ComparisonTable data={currentData.goodVsGreat} market={market} />
              </Card>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                 {currentData.aov.map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                      <div className="text-xs text-slate-500 font-bold uppercase mb-1">{item.type}</div>
                      <div className="font-bold text-slate-800">{item.value}</div>
                    </div>
                 ))}
              </div>
            </Section>

            {/* Minimum Viable Calculator */}
            <Section title="Profitability Health Check">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-1">
                    <h3 className="text-2xl font-bold mb-4">Are you viable?</h3>
                    <p className="text-slate-400 mb-6">
                      Enter your store's metrics to compare against the Minimum Viable Performance Targets for the {market} market. 
                      Falling below these often indicates scaling issues.
                    </p>
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <h4 className="font-bold text-blue-400 mb-2">Targets for Profitability:</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex justify-between"><span>Conv Rate:</span> <span>&gt; {currentData.mvp.conv}%</span></li>
                        <li className="flex justify-between"><span>AOV:</span> <span>&gt; {market === 'USA' ? '$' : '₹'}{currentData.mvp.aov}</span></li>
                        <li className="flex justify-between"><span>Abandonment:</span> <span>&lt; {currentData.mvp.cart}%</span></li>
                        <li className="flex justify-between"><span>Repeat Rate:</span> <span>&gt; {currentData.mvp.repeat}%</span></li>
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Conversion Rate (%)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          placeholder="e.g. 2.1"
                          className="w-full bg-slate-700 border-none rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500"
                          value={calcConv}
                          onChange={(e) => setCalcConv(e.target.value)}
                        />
                        {calcConv && (
                           <div className={`absolute right-3 top-3 px-2 py-0.5 text-xs rounded font-bold uppercase ${
                             checkMVP(calcConv, currentData.mvp.conv, 'min') === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                           }`}>
                             {checkMVP(calcConv, currentData.mvp.conv, 'min')}
                           </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">AOV ({market === 'USA' ? '$' : '₹'})</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          placeholder="e.g. 85"
                          className="w-full bg-slate-700 border-none rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500"
                          value={calcAov}
                          onChange={(e) => setCalcAov(e.target.value)}
                        />
                         {calcAov && (
                           <div className={`absolute right-3 top-3 px-2 py-0.5 text-xs rounded font-bold uppercase ${
                             checkMVP(calcAov, currentData.mvp.aov, 'min') === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                           }`}>
                             {checkMVP(calcAov, currentData.mvp.aov, 'min')}
                           </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Cart Abandonment (%)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          placeholder="e.g. 70"
                          className="w-full bg-slate-700 border-none rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500"
                          value={calcCart}
                          onChange={(e) => setCalcCart(e.target.value)}
                        />
                         {calcCart && (
                           <div className={`absolute right-3 top-3 px-2 py-0.5 text-xs rounded font-bold uppercase ${
                             checkMVP(calcCart, currentData.mvp.cart, 'max') === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                           }`}>
                             {checkMVP(calcCart, currentData.mvp.cart, 'max')}
                           </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-1">Repeat Customer Rate (%)</label>
                       <div className="relative">
                        <input 
                          type="number" 
                          placeholder="e.g. 20"
                          className="w-full bg-slate-700 border-none rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500"
                          value={calcRepeat}
                          onChange={(e) => setCalcRepeat(e.target.value)}
                        />
                         {calcRepeat && (
                           <div className={`absolute right-3 top-3 px-2 py-0.5 text-xs rounded font-bold uppercase ${
                             checkMVP(calcRepeat, currentData.mvp.repeat, 'min') === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                           }`}>
                             {checkMVP(calcRepeat, currentData.mvp.repeat, 'min')}
                           </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* --- TAB: COMPARE --- */}
        {activeTab === 'compare' && (
           <div className="animate-fadeIn">
             <Section title="US vs India: Strategic Differences">
               <div className="grid grid-cols-1 gap-6">
                 {COMPARISON.map((item, index) => (
                   <Card key={index} className="flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-200 transition-colors">
                     <div className="w-full md:w-1/4">
                       <h3 className="font-bold text-slate-800">{item.metric}</h3>
                     </div>
                     <div className="flex-1 grid grid-cols-2 gap-4">
                       <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                         <div className="text-xs text-slate-400 uppercase font-bold mb-1">USA</div>
                         <div className="font-semibold text-slate-700">{item.us}</div>
                       </div>
                       <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                         <div className="text-xs text-orange-400 uppercase font-bold mb-1">India</div>
                         <div className="font-semibold text-slate-700">{item.ind}</div>
                       </div>
                     </div>
                     <div className="w-full md:w-1/3 pl-0 md:pl-4 border-l border-slate-100 italic text-slate-500 text-sm">
                       "{item.implication}"
                     </div>
                   </Card>
                 ))}
               </div>
             </Section>
           </div>
        )}

        {/* --- TAB: STRATEGY --- */}
        {activeTab === 'strategy' && (
          <div className="animate-fadeIn space-y-12">
            
            {/* Seasonal Map (UPDATED) */}
            <Section title="Seasonal Impact & Media Buying">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentData.seasons.map((season, idx) => (
                  <Card key={idx} className="relative overflow-hidden group border-l-4 border-l-blue-500">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                         <h3 className="text-xl font-bold text-slate-800">{season.name}</h3>
                         <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block mt-1">{season.months}</span>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-full">
                        <Calendar className="text-slate-400" size={24} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-xs text-slate-500 font-bold uppercase">Traffic</div>
                        <div className="font-bold text-slate-900">{season.traffic}</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                        <div className="text-xs text-green-600 font-bold uppercase">Revenue</div>
                        <div className="font-bold text-green-700">{season.revenue}</div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex justify-between items-center text-sm">
                         <span className="text-slate-500 flex items-center gap-2">
                           <Layers size={14}/> CPM Impact
                         </span>
                         <span className={`font-mono font-bold ${season.cpm.includes('+') && !season.cpm.includes('Normal') ? 'text-red-600' : 'text-slate-700'}`}>
                           {season.cpm}
                         </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                         <span className="text-slate-500 flex items-center gap-2">
                           <BarChart2 size={14}/> ROAS Trend
                         </span>
                         <span className="font-mono font-bold text-blue-600">
                           {season.roas}
                         </span>
                      </div>
                       <div className="flex justify-between items-center text-sm">
                         <span className="text-slate-500 flex items-center gap-2">
                           <TrendingUp size={14}/> Conv. Rate Lift
                         </span>
                         <span className="font-mono font-bold text-green-600">
                           {season.convLift}
                         </span>
                      </div>
                    </div>

                    <div className="mt-4 bg-slate-800 text-white text-xs p-3 rounded-lg flex items-center gap-2">
                      <Zap size={14} className="text-yellow-400" />
                      <span className="font-semibold">Ad Strategy: {season.strategy}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </Section>

            {/* Costs */}
            <Section title="Cost Structure Reality Check">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <Card className="bg-slate-900 text-white border-none">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <DollarSign className="text-green-400" /> Unit Economics
                    </h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                        <span className="text-slate-400">CAC (Standard)</span>
                        <span className="font-mono font-bold text-lg">{currentData.cost.cac}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                        <span className="text-slate-400">CAC (Premium)</span>
                        <span className="font-mono font-bold text-lg">{currentData.cost.cacPremium}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                        <span className="text-slate-400">Lifetime Value (LTV)</span>
                        <span className="font-mono font-bold text-lg text-green-400">{currentData.cost.ltv}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                         <span className="text-slate-400">Target LTV:CAC Ratio</span>
                         <span className="font-mono font-bold text-yellow-400">{currentData.cost.ratio}</span>
                      </div>
                    </div>
                 </Card>

                 <Card>
                   <h3 className="text-xl font-bold mb-6 text-slate-800">Operational Realities</h3>
                   <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="font-semibold text-slate-700 mb-1">Return Rate</h4>
                        <div className="text-2xl font-bold text-slate-900">{currentData.cost.returns}</div>
                        <p className="text-sm text-slate-500 mt-1">
                          {market === 'USA' ? 'Higher than India due to easy return policies.' : 'Lower than US, but harder to build loyalty.'}
                        </p>
                      </div>
                      
                      {market === 'INDIA' && (
                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                          <h4 className="font-semibold text-orange-800 mb-1">RTO (Return to Origin)</h4>
                          <div className="text-2xl font-bold text-orange-900">15-30%</div>
                          <p className="text-sm text-orange-700 mt-1">Specifically on COD orders. Major profitability leak.</p>
                        </div>
                      )}
                   </div>
                 </Card>
               </div>
            </Section>

            {/* Critical Success Factors */}
             <Section title="Priority Hierarchy">
               <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                 <h3 className="font-bold text-blue-900 mb-6 text-xl">Critical Success Factors for {market}</h3>
                 <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {market === 'USA' ? (
                      <>
                        {[
                          "Mobile experience (65-75% traffic)",
                          "Page speed (<2s = 30% higher conversion)",
                          "Trust signals (reviews, badges, security)",
                          "Free shipping threshold (expected standard)",
                          "Easy returns (30-day minimum)",
                          "Multiple payment options (5+ methods)",
                          "Personalization (AI recommendations)",
                          "Email marketing (25% revenue attribution)"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                            <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">{i+1}</div>
                            <span className="text-slate-700 font-medium">{item}</span>
                          </li>
                        ))}
                      </>
                    ) : (
                      <>
                        {[
                          "Mobile-first everything (80-90% traffic)",
                          "COD option (40-60% choose this)",
                          "Multiple payment options (UPI, wallets, COD)",
                          "Page speed (<3s on slower connections)",
                          "SMS/WhatsApp marketing (higher engagement)",
                          "Social commerce (Insta/FB shopping)",
                          "Trust building (Influencer video, COD)",
                          "Vernacular support (regional languages)"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                            <div className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">{i+1}</div>
                            <span className="text-slate-700 font-medium">{item}</span>
                          </li>
                        ))}
                      </>
                    )}
                 </ul>
               </div>
             </Section>
          </div>
        )}
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6 opacity-75 grayscale hover:grayscale-0 transition-all">
             <ArloxLogo />
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Arlox.io. Internal Use Only. <br/>
            Benchmarks updated for 2024-2025 Fiscal Year.
          </p>
        </div>
      </footer>
    </div>
  );
}