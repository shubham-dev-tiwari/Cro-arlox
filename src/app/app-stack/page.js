"use client";

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Globe, 
  Zap, 
  Layout, 
  MessageCircle, 
  Star, 
  DollarSign, 
  BarChart3, 
  Settings, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Smartphone, 
  Mail, 
  ShieldCheck,
  Menu,
  X,
  Clock,
  TrendingUp,
  AlertTriangle,
  Layers,
  Rocket
} from 'lucide-react';

// --- Branding & Theme ---
const theme = {
  colors: {
    primary: '#0066FF', // Arlox Bright Blue
    secondary: '#0F172A', // Deep Slate
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#334155',
    textLight: '#64748B',
    success: '#10B981',
    border: '#E2E8F0'
  }
};

// --- DATA STRUCTURES ---

const philosophyData = [
  {
    icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
    title: "Critical Truth",
    desc: "The right app stack is not an expense—it’s a revenue multiplier. A $200/mo app generating $6,000/mo delivers 30x ROI."
  },
  {
    icon: <Zap className="w-6 h-6 text-blue-600" />,
    title: "Strategic Principle",
    desc: "Focus on apps that directly impact conversion, AOV, and retention. Avoid vanity features that add page weight."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
    title: "Budget Framework",
    desc: "Expect 10-30x ROI on properly selected apps. Launch budget: $60-$120/mo. Scale budget: $420-$720/mo."
  }
];

const tiersData = [
  {
    id: 'tier1',
    title: "Tier 1: Reviews & Social Proof",
    impact: "400%+ Higher Conversion",
    desc: "Social proof is the #1 conversion driver. Products with reviews convert at 4-5x the rate.",
    apps: [
      {
        name: "Judge.me",
        tag: "Top Pick",
        cost: "Free / $15 / $49",
        bestFor: "Launch to Scale (0-2000 orders/mo)",
        features: ["Unlimited reviews", "Photo & Video reviews", "Google Shopping integration", "Q&A section"],
        whyWins: "Best value, unlimited reviews, rich snippets, and carousel widgets.",
        india: "SMS review requests (15-20% response vs 5% email), Hinglish supported, 'Value for Money' ratings.",
        us: "Email automation sufficient, detailed fit/quality ratings critical for trust."
      },
      {
        name: "Loox",
        tag: "Visual Heavy",
        cost: "$9.99 - $299",
        bestFor: "Visual-first fashion brands",
        features: ["Instagram-style galleries", "Referral rewards", "Shoppable galleries"],
        whyWins: "Beautiful photo galleries. Discount rewards increase submission 3-4x.",
        india: "Photo reviews are critical for fabric trust. Visuals bridge the 'touch' gap.",
        us: "Instagram import features drive massive engagement for lifestyle brands."
      },
      {
        name: "Yotpo",
        tag: "Enterprise",
        cost: "Free - $500+",
        bestFor: "Established brands (1000+ orders)",
        features: ["Loyalty programs", "SMS bundled", "AI sentiment analysis"],
        whyWins: "Enterprise solution with full ecosystem. Overkill for Launch stage.",
        india: "Integrated loyalty programs drive high repeat purchase rates.",
        us: "Multi-channel syndication (Google, FB, Insta) is powerful for large brands."
      }
    ]
  },
  {
    id: 'tier2',
    title: "Tier 2: Urgency & Scarcity",
    impact: "15-30% Conversion Lift",
    desc: "Triggers FOMO to reduce hesitation. Genuine urgency is key; fake urgency destroys trust.",
    apps: [
      {
        name: "Hurrify",
        tag: "Top Pick",
        cost: "Free / $9.99",
        bestFor: "Flash sales & limited stock",
        features: ["Countdown timers", "Stock counters", "Delivery deadlines"],
        whyWins: "Versatile, minimal design impact. Combines urgency + scarcity.",
        india: "Festival countdowns (Diwali, Rakhi) see 30-40% conversion spikes.",
        us: "Critical for BFCM and Cyber Monday delivery deadlines."
      },
      {
        name: "Urgency Bear",
        tag: "Automation",
        cost: "Free / $9.99",
        bestFor: "Set-it-and-forget-it campaigns",
        features: ["Pre-scheduled campaigns", "Low stock alerts", "Analytics"],
        whyWins: "Clean design, schedule campaigns in advance.",
        india: "Great for scheduling weekend flash sales.",
        us: "Perfect for 'Order by Dec 18 for Xmas' deadlines."
      }
    ]
  },
  {
    id: 'tier3',
    title: "Tier 3: Conversion Optimization",
    impact: "30-50% Return Reduction + 25-40% AOV Increase",
    desc: "The engines: Size/Fit tools, Upsells, and Email/SMS marketing.",
    apps: [
      {
        name: "Kite",
        category: "Size & Fit",
        tag: "Return Killer",
        cost: "$29 - $199",
        bestFor: "ALL Fashion Brands",
        features: ["AI size recommendations", "Return analytics", "Mobile-optimized quiz"],
        whyWins: "Reduces returns by 30-50%. 40x ROI through savings.",
        india: "Critical due to inconsistent sizing standards. Reduces expensive RTOs.",
        us: "Reduces return shipping costs, improves satisfaction."
      },
      {
        name: "Rebuy",
        category: "Upsell",
        tag: "AOV Booster",
        cost: "Free - $499",
        bestFor: "Growing to Scale (300+ orders)",
        features: ["Smart Cart", "AI Recommendations", "Post-purchase upsells"],
        whyWins: "All-in-one personalization. 25-40% AOV increase.",
        india: "'Complete the Look' bundles (Kurti + Dupatta) perform exceptionally.",
        us: "Post-purchase upsells have 40-50% acceptance rate."
      },
      {
        name: "Klaviyo",
        category: "Email/SMS",
        tag: "Gold Standard",
        cost: "Free - Scales",
        bestFor: "ALL Brands (Day 1)",
        features: ["Automated Flows", "Advanced Segmentation", "Predictive Analytics"],
        whyWins: "Drives 30%+ of total revenue. 30-50x ROI.",
        india: "SMS is MASSIVE (98% open rate). COD confirmation SMS reduces RTO.",
        us: "Email is king (personalization drives revenue). SMS for VIPs."
      }
    ]
  },
  {
    id: 'tier4',
    title: "Tier 4: Trust & Security",
    impact: "5-10% Abandonment Reduction",
    desc: "Trust signals remove final purchase hesitation, especially for mobile shoppers.",
    apps: [
      {
        name: "Trust Badges by Elfsight",
        cost: "Free / $5",
        features: ["Payment badges", "Guarantee icons", "Mobile optimized"],
        india: "'100% Original', 'COD Available', '7-Day Returns' badges are critical.",
        us: "Focus on Security (SSL, Norton) and Payment (Afterpay, Klarna) badges."
      }
    ]
  },
  {
    id: 'tier5',
    title: "Tier 5: Site Performance",
    impact: "30-50% Faster Loads",
    desc: "1-second delay = 7% conversion drop. Speed is conversion.",
    apps: [
      {
        name: "TinyIMG",
        tag: "Essential",
        cost: "Free - $24",
        features: ["Image compression", "WebP conversion", "Lazy loading", "SEO fix"],
        whyWins: "Imperceptible quality loss, massive speed gain. 15-30x ROI.",
        india: "CRITICAL for mobile users on 4G networks (<3s load target).",
        us: "Target <2s load time. Google rewards speed with SEO rankings."
      }
    ]
  },
  {
    id: 'tier6',
    title: "Tier 6: Cart Recovery",
    impact: "10-15% Carts Recovered",
    desc: "68-82% of carts are abandoned. Recovering them is pure profit.",
    apps: [
      {
        name: "Recart / Cartly",
        tag: "SMS Focus",
        cost: "$19 - $299",
        features: ["SMS abandoned cart flows", "Two-way conversation", "Klaviyo integration"],
        whyWins: "SMS open rates (95%+) dwarf email.",
        india: "SMS is the dominant recovery channel (18-25% conversion).",
        us: "Use for high-value abandoners. 15-20% conversion."
      }
    ]
  },
  {
    id: 'tier7',
    title: "Tier 7: Personalization",
    impact: "15-30% Conv. Increase",
    desc: "Making the store feel designed for the individual customer.",
    apps: [
      {
        name: "LimeSpot",
        tag: "Top Pick",
        cost: "Free - $239",
        features: ["You May Also Like", "Frequently Bought Together", "Visual Merchandising"],
        whyWins: "Best value personalization. 12-25x ROI.",
        india: "Mobile swipe UX for recommendations is critical.",
        us: "Advanced segmentation based on price sensitivity."
      }
    ]
  }
];

const stacksData = [
  {
    stage: "Launch",
    orders: "0-100/mo",
    cost: "₹5k-8k ($60-95)",
    roi: "15-25x",
    stack: ["Judge.me (Free)", "Klaviyo (Free)", "TinyIMG (Basic)", "Hurrify (Free)", "Free Trust Badge"]
  },
  {
    stage: "Growth",
    orders: "100-500/mo",
    cost: "₹15k-30k ($180-360)",
    roi: "12-20x",
    stack: ["Judge.me (Awesome)", "Klaviyo (Growth)", "TinyIMG (Pro)", "Kite (Standard)", "LimeSpot (Growth)", "Cartly"]
  },
  {
    stage: "Scale",
    orders: "500-2000/mo",
    cost: "₹35k-70k ($420-840)",
    roi: "10-18x",
    stack: ["All Growth Apps (Pro Plans)", "Rebuy (Pro)", "Recart (Growth)", "Checkout Wiz"]
  }
];

const roadmapData = [
  {
    month: "Month 1: Foundation",
    focus: "10-15% Conv. Lift",
    weeks: [
      { title: "Week 1", task: "Install Judge.me, TinyIMG, Trust Badges" },
      { title: "Week 2", task: "Set up Klaviyo (Welcome + Abandoned Cart flows)" },
      { title: "Week 3", task: "Add Hurrify (Urgency) & LimeSpot (Recs)" },
      { title: "Week 4", task: "Image Optimization & PageSpeed Tests" }
    ]
  },
  {
    month: "Month 2: Optimization",
    focus: "+8-12% Lift",
    weeks: [
      { title: "Week 1", task: "Add Kite (Size/Fit), Upgrade Judge.me to Paid" },
      { title: "Week 2", task: "Launch Klaviyo SMS (Cart Recovery)" },
      { title: "Week 3", task: "Install SMS Recovery (Recart/Cartly)" },
      { title: "Week 4", task: "A/B Test Urgency Timers & SMS Copy" }
    ]
  },
  {
    month: "Month 3: Scaling",
    focus: "+10-15% AOV",
    weeks: [
      { title: "Week 1", task: "Install Rebuy (Smart Cart, Upsells)" },
      { title: "Week 2", task: "Add Checkout Wiz & Upgrade Trust Badges" },
      { title: "Week 3", task: "Advanced Klaviyo Segmentation (RFM)" },
      { title: "Week 4", task: "Full Analytics Review & Bottleneck Check" }
    ]
  }
];

// --- COMPONENTS ---

const ArloxLogo = () => (
  <div className="flex items-center gap-2">
    <div className="relative w-8 h-8 flex items-center justify-center">
       <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
         <path d="M50 15 L85 85 L15 85 Z" fill="none" stroke="#0066FF" strokeWidth="8" strokeLinejoin="round" />
       </svg>
    </div>
    <span className="text-xl font-bold text-slate-900 tracking-tight">Arlox.io</span>
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-10">
    <h2 className="text-3xl font-bold text-slate-900 mb-3">{title}</h2>
    <p className="text-slate-500 max-w-2xl mx-auto">{subtitle}</p>
    <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
  </div>
);

const AppCard = ({ app, market }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-all">
    <div className="flex justify-between items-start mb-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-lg font-bold text-slate-900">{app.name}</h4>
          {app.tag && <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{app.tag}</span>}
        </div>
        <p className="text-xs font-semibold text-slate-500">{app.category}</p>
      </div>
      <div className="text-right">
         <span className="block text-sm font-bold text-blue-600">{app.cost}</span>
      </div>
    </div>
    
    <p className="text-sm text-slate-600 mb-4 italic border-l-2 border-blue-200 pl-3">"{app.whyWins}"</p>

    <div className="space-y-3 mb-4">
      {app.features && app.features.slice(0, 3).map((f, i) => (
        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
          <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
          <span>{f}</span>
        </div>
      ))}
    </div>

    <div className={`rounded-lg p-3 text-xs leading-relaxed ${market === 'US' ? 'bg-blue-50 text-blue-800' : 'bg-orange-50 text-orange-800'}`}>
      <span className="font-bold block mb-1 uppercase tracking-wide flex items-center gap-1">
        {market === 'US' ? '🇺🇸 US Insight' : '🇮🇳 India Insight'}
      </span>
      {market === 'US' ? app.us : app.india}
    </div>
  </div>
);

export default function App() {
  const [market, setMarket] = useState('US');
  const [openTier, setOpenTier] = useState('tier1');
  const [completedWeeks, setCompletedWeeks] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleWeek = (monthIdx, weekIdx) => {
    const id = `${monthIdx}-${weekIdx}`;
    if (completedWeeks.includes(id)) {
      setCompletedWeeks(completedWeeks.filter(w => w !== id));
    } else {
      setCompletedWeeks([...completedWeeks, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <ArloxLogo />
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#philosophy" className="hover:text-blue-600 transition-colors">Philosophy</a>
              <a href="#tiers" className="hover:text-blue-600 transition-colors">App Tiers</a>
              <a href="#stacks" className="hover:text-blue-600 transition-colors">Growth Stacks</a>
              <a href="#roadmap" className="hover:text-blue-600 transition-colors">Roadmap</a>
            </div>
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-3">
             <a href="#philosophy" className="block text-slate-600 font-medium">Philosophy</a>
             <a href="#tiers" className="block text-slate-600 font-medium">App Tiers</a>
             <a href="#roadmap" className="block text-slate-600 font-medium">Roadmap</a>
          </div>
        )}
      </nav>

      {/* Hero Header */}
      <header className="bg-white border-b border-slate-200 pt-16 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldCheck className="w-4 h-4" /> Section 7: Revised & Comprehensive
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Must-Have Shopify Apps for <span className="text-blue-600">Maximum Conversion</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            The right app stack isn't an expense—it's a revenue multiplier. 
            We've curated the top apps delivering <span className="font-bold text-slate-900">10-30x ROI</span>.
          </p>

           {/* Market Toggle */}
           <div className="inline-flex bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
              <button
                onClick={() => setMarket('US')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  market === 'US' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span>🇺🇸</span> US Market
              </button>
              <button
                onClick={() => setMarket('INDIA')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  market === 'INDIA' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span>🇮🇳</span> India Premium
              </button>
            </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">

        {/* Philosophy Cards */}
        <section id="philosophy">
          <div className="grid md:grid-cols-3 gap-6">
            {philosophyData.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tiers Accordion */}
        <section id="tiers" className="scroll-mt-24">
          <SectionHeader 
            title="The 7-Tier App Ecosystem" 
            subtitle="Prioritized by impact. Tier 1 & 2 are non-negotiable foundations."
          />
          
          <div className="space-y-4">
            {tiersData.map((tier) => (
              <div key={tier.id} className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${openTier === tier.id ? 'border-blue-300 shadow-md ring-1 ring-blue-100' : 'border-slate-200 shadow-sm'}`}>
                <button 
                  onClick={() => setOpenTier(openTier === tier.id ? null : tier.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${openTier === tier.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {tier.id.replace('tier', '')}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${openTier === tier.id ? 'text-slate-900' : 'text-slate-700'}`}>{tier.title}</h3>
                      <p className="text-sm text-slate-500 font-medium mt-1">
                        Impact: <span className="text-green-600">{tier.impact}</span>
                      </p>
                    </div>
                  </div>
                  {openTier === tier.id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                </button>

                {openTier === tier.id && (
                  <div className="p-6 pt-0 border-t border-slate-100 bg-slate-50/50">
                    <p className="mb-6 text-slate-600 max-w-3xl">{tier.desc}</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tier.apps.map((app, idx) => (
                        <AppCard key={idx} app={app} market={market} />
                      ))}
                    </div>
                    
                    {/* Tier specific metric warning */}
                     {tier.id === 'tier2' && (
                        <div className="mt-6 flex items-start gap-3 bg-red-50 border border-red-100 p-4 rounded-lg">
                           <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                           <div className="text-sm text-red-800">
                              <span className="font-bold block">Critical Warning:</span>
                              Never use fake urgency. Customers will test timers. If a "Sale ends tonight" timer resets tomorrow, trust is destroyed permanently.
                           </div>
                        </div>
                     )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Stacks by Stage */}
        <section id="stacks" className="scroll-mt-24">
          <SectionHeader 
             title="Complete Stacks by Business Stage" 
             subtitle="Don't over-install. Match your app weight to your order volume."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {stacksData.map((stack, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className={`p-6 text-center text-white ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-indigo-600' : 'bg-slate-900'}`}>
                  <h3 className="text-xl font-bold mb-1">{stack.stage} Stage</h3>
                  <p className="opacity-90 font-medium">{stack.orders}</p>
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-center mb-6 text-sm">
                     <div className="text-center">
                        <span className="block text-slate-500 mb-1">Cost</span>
                        <span className="font-bold text-slate-900 block">{stack.cost}</span>
                     </div>
                     <div className="h-8 w-px bg-slate-200"></div>
                     <div className="text-center">
                        <span className="block text-slate-500 mb-1">ROI</span>
                        <span className="font-bold text-green-600 block">{stack.roi}</span>
                     </div>
                  </div>
                  <ul className="space-y-3">
                    {stack.stack.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Roadmap */}
        <section id="roadmap" className="scroll-mt-24 max-w-4xl mx-auto">
          <SectionHeader 
             title="90-Day Implementation Masterplan" 
             subtitle="A phased approach to avoid overwhelming your team and budget."
          />

          <div className="space-y-8">
            {roadmapData.map((phase, mIdx) => (
               <div key={mIdx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
                     <h3 className="font-bold text-slate-900 flex items-center gap-2">
                       <Clock className="w-5 h-5 text-blue-600" />
                       {phase.month}
                     </h3>
                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                       Goal: {phase.focus}
                     </span>
                  </div>
                  <div className="divide-y divide-slate-100">
                     {phase.weeks.map((week, wIdx) => {
                        const weekId = `${mIdx}-${wIdx}`;
                        const isDone = completedWeeks.includes(weekId);
                        return (
                           <div 
                              key={wIdx} 
                              className={`p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors ${isDone ? 'bg-slate-50' : ''}`}
                              onClick={() => toggleWeek(mIdx, wIdx)}
                           >
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                 isDone ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                              }`}>
                                 {isDone && <CheckCircle2 className="w-4 h-4" />}
                              </div>
                              <div className={isDone ? 'opacity-50' : ''}>
                                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-0.5">{week.title}</span>
                                 <span className={`text-sm font-medium ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                                   {week.task}
                                 </span>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>
            ))}
          </div>

          <div className="mt-12 bg-slate-900 text-slate-300 rounded-2xl p-8 text-center">
             <h3 className="text-white text-2xl font-bold mb-4">The Bottom Line</h3>
             <p className="max-w-2xl mx-auto leading-relaxed mb-6">
               Start lean. Scale smart. Track everything. A ₹25,000/month app investment generating ₹3,00,000 in revenue isn't a cost—it's a profit center.
             </p>
             <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-bold transition-colors">
               Review App Tiers
             </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <ArloxLogo />
           <p className="text-slate-500 text-sm mt-4">&copy; {new Date().getFullYear()} Arlox Internal Documentation. v3.0 Comprehensive.</p>
        </div>
      </footer>

    </div>
  );
}