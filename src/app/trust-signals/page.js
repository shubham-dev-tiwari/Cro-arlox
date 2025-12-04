"use client";

import React, { useState } from 'react';
import { 
    ShieldCheck, 
    Star, 
    Flame, 
    Clock, 
    Tag, 
    Truck, 
    RefreshCw, 
    Phone, 
    CheckCircle2, 
    AlertTriangle, 
    Layers, 
    CreditCard, 
    Leaf, 
    Search, 
    ChevronRight, 
    Check 
} from 'lucide-react';

// --- Data Configuration ---

const BADGE_DATA = {
    bestseller: {
        title: "Bestseller Badge",
        type: "Social Proof",
        icon: Star,
        us: { text: "⭐ Bestseller", color: "bg-amber-100 text-amber-800 border-amber-200", style: "Minimal, subtle gold" },
        in: { text: "🔥 Top Seller", color: "bg-yellow-400 text-black font-bold shadow-sm", style: "Prominent, energetic" },
        impact: "15-25% lift",
        placement: "Top-left of product image"
    },
    newArrival: {
        title: "New Arrival",
        type: "Social Proof / Novelty",
        icon: Clock,
        us: { text: "NEW", color: "bg-slate-800 text-white text-xs tracking-widest", style: "Minimal, gray/navy" },
        in: { text: "✨ Just In", color: "bg-teal-500 text-white font-bold", style: "Bright teal/green" },
        impact: "8-15% lift",
        placement: "Top-right of product image"
    },
    sale: {
        title: "Sale / % Off",
        type: "Value",
        icon: Tag,
        us: { text: "-30%", color: "bg-red-500 text-white", style: "Clean red/orange pill" },
        in: { text: "30% OFF", color: "bg-red-600 text-white font-bold border-2 border-white shadow-md", style: "BOLD red, explicit savings" },
        impact: "20-35% lift",
        placement: "Top-left (Priority #1)"
    },
    lowStock: {
        title: "Low Stock",
        type: "Scarcity",
        icon: Flame,
        us: { text: "Only 4 left", color: "text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded", style: "Subtle orange text" },
        in: { text: "🔥 Only 3 Left in Your Size!", color: "bg-red-50 text-red-600 border border-red-200 font-bold px-3 py-1 rounded", style: "Prominent red badge with emoji" },
        impact: "18-30% lift (<10 units)",
        placement: "Below size selector"
    },
    exclusive: {
        title: "Exclusive",
        type: "Scarcity / Prestige",
        icon: Layers,
        us: { text: "Limited Edition", color: "bg-black text-white font-serif italic border border-gold-400", style: "Elegant black/gold serif" },
        in: { text: "💎 Exclusive Collection", color: "bg-rose-900 text-amber-100 border border-amber-200", style: "Premium burgundy/gold" },
        impact: "12-20% lift (Premium items)",
        placement: "Top-right"
    },
    sustainable: {
        title: "Sustainable",
        type: "Value / Ethics",
        icon: Leaf,
        us: { text: "🌿 Sustainable", color: "bg-green-50 text-green-700 border border-green-200", style: "Minimal green leaf" },
        in: { text: "♻️ Eco-Friendly Fashion", color: "bg-green-100 text-green-800 font-medium", style: "Clear green badge" },
        impact: "15-25% lift (Target demo)",
        placement: "Below title"
    }
};

const TRUST_ICONS_US = ['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Afterpay'];
const TRUST_ICONS_IN = ['Visa', 'Mastercard', 'RuPay', 'UPI', 'Paytm', 'PhonePe'];

// --- Components ---

const BadgePreview = ({ badgeKey, market }) => {
    const badge = BADGE_DATA[badgeKey];
    const data = badge[market];
    
    return (
        <div className="flex flex-col items-center gap-2 p-4 border border-slate-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{badge.title}</span>
            <div className={`px-3 py-1.5 rounded-md text-sm ${data.color} inline-flex items-center gap-1.5`}>
                {data.text}
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">{data.style}</p>
        </div>
    );
};

const PsychologyCard = ({ icon: Icon, title, desc, examples, color }) => (
    <div className={`relative overflow-hidden p-6 rounded-xl border ${color} bg-white hover:shadow-lg transition-all group`}>
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${color.replace('border-', 'bg-').replace('200', '50')}`}>
                <Icon className={`w-6 h-6 ${color.replace('border-', 'text-').replace('200', '600')}`} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Principle</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm mb-4 leading-relaxed">{desc}</p>
        <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2">Examples:</p>
            <div className="flex flex-wrap gap-2">
                {examples.map((ex, i) => (
                    <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">{ex}</span>
                ))}
            </div>
        </div>
    </div>
);

const ProductMockup = ({ market }) => {
    const currency = market === 'us' ? '$' : '₹';
    const price = market === 'us' ? '84' : '2,450';
    const oldPrice = market === 'us' ? '$120' : '₹3,500';
    
    return (
        <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center">
                <div className="w-4 h-4 rounded-full bg-slate-200"></div>
                <div className="text-xs font-mono text-slate-400">myshopify.com</div>
                <div className="w-4 h-4 rounded-full bg-slate-200"></div>
            </div>

            {/* Product Image Area */}
            <div className="relative aspect-[4/5] bg-slate-100 flex items-center justify-center group">
                <span className="text-slate-300 font-medium">Product Image</span>
                
                {/* Dynamic Badges */}
                <div className="absolute top-2 left-2 z-10 animate-fade-in">
                    {market === 'us' ? (
                        <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-sm">-30%</span>
                    ) : (
                        <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold border-2 border-white shadow-sm">30% OFF</span>
                    )}
                </div>
                
                {/* New Arrival - Top Right */}
                <div className="absolute top-2 right-2 z-10 animate-fade-in">
                    {market === 'us' ? (
                        <span className="bg-slate-800 text-white px-2 py-1 text-[10px] tracking-widest">NEW</span>
                    ) : (
                        <span className="bg-teal-500 text-white px-2 py-1 text-xs font-bold rounded-sm">✨ Just In</span>
                    )}
                </div>
            </div>

            {/* Details */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">Essential Linen Shirt</h3>
                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                            <span className="text-slate-400 text-xs ml-1">(1.2k)</span>
                        </div>
                    </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-bold text-red-600">{currency}{price}</span>
                    <span className="text-sm text-slate-400 line-through decoration-slate-400">{oldPrice}</span>
                    {market === 'in' && <span className="text-xs text-green-600 font-medium">Save ₹1,050</span>}
                </div>

                {/* Low Stock Indicator */}
                <div className="mb-4">
                     {market === 'us' ? (
                        <p className="text-xs text-orange-600 font-medium">Only 4 left in stock</p>
                    ) : (
                        <p className="text-xs text-red-600 font-bold bg-red-50 inline-block px-2 py-1 rounded border border-red-100">🔥 Hurry! Only 2 Left in Size M</p>
                    )}
                </div>

                {/* CTA */}
                <button className="w-full bg-black text-white py-3 rounded-lg font-medium mb-4 hover:bg-slate-800 transition-colors">
                    Add to Cart
                </button>

                {/* Trust Badges Row */}
                <div className="flex flex-wrap justify-center gap-3 py-3 border-t border-slate-100 bg-slate-50/50 -mx-5 px-5">
                    <div className="flex items-center gap-1.5" title="Secure Checkout">
                        <ShieldCheck className="w-4 h-4 text-slate-500" />
                        <span className="text-[10px] font-medium text-slate-600 uppercase">Secure</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Easy Returns">
                        <RefreshCw className="w-4 h-4 text-slate-500" />
                        <span className="text-[10px] font-medium text-slate-600 uppercase">{market === 'us' ? '30-Day Returns' : '7-Day Return'}</span>
                    </div>
                    <div className="flex items-center gap-1.5" title="Free Shipping">
                        <Truck className="w-4 h-4 text-slate-500" />
                        <span className="text-[10px] font-medium text-slate-600 uppercase">Free Ship</span>
                    </div>
                    {market === 'in' && (
                        <div className="flex items-center gap-1.5" title="WhatsApp Support">
                            <Phone className="w-4 h-4 text-green-600" />
                            <span className="text-[10px] font-medium text-slate-600 uppercase">Support</span>
                        </div>
                    )}
                </div>
                
                {/* Payment Icons */}
                <div className="mt-4 flex justify-center gap-2 opacity-60 grayscale hover:grayscale-0 transition-all">
                    {(market === 'us' ? TRUST_ICONS_US : TRUST_ICONS_IN).slice(0, 5).map(icon => (
                        <div key={icon} className="h-4 w-8 bg-slate-200 rounded flex items-center justify-center text-[6px] font-bold text-slate-500">
                            {icon}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ChecklistItem = ({ text }) => {
    const [checked, setChecked] = useState(false);
    return (
        <div 
            onClick={() => setChecked(!checked)} 
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer border transition-all select-none
            ${checked ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-100 hover:border-slate-300'}`}
        >
            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors
                ${checked ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300'}`}>
                {checked && <Check className="w-3.5 h-3.5 text-white" />}
            </div>
            <span className={`text-sm ${checked ? 'text-indigo-900 font-medium' : 'text-slate-600'}`}>{text}</span>
        </div>
    );
};

const TrustSignalsPage = () => {
    const [market, setMarket] = useState('us');

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900 font-sans pb-20">
            
            <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold tracking-tighter">AR</div>
                        <div className="h-4 w-px bg-slate-200 mx-2"></div>
                        <h1 className="font-semibold text-slate-900 hidden sm:block">Module 8: Badges & Trust Signals</h1>
                        <h1 className="font-semibold text-slate-900 sm:hidden">Module 8</h1>
                    </div>
                    
                    {/* Market Toggle */}
                    <div className="bg-slate-100 p-1 rounded-lg flex items-center">
                        <button 
                            onClick={() => setMarket('us')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${market === 'us' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            🇺🇸 USA Market
                        </button>
                        <button 
                            onClick={() => setMarket('in')}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${market === 'in' ? 'bg-white shadow-sm text-orange-700' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            🇮🇳 India Market
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 pt-12">
                
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide mb-4">
                        Psychology-Driven Guide
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Badges are <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Micro-Conversions</span>.
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Strategic badge placement increases conversion by <span className="font-bold text-slate-900">12-28%</span>. Each badge answers an unspoken objection and removes friction.
                    </p>
                </div>

                {/* Psychology Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    <PsychologyCard 
                        icon={Star}
                        title="Social Proof"
                        desc="“Others love this, you will too.” Triggers herd mentality and reduces decision anxiety."
                        examples={['Bestseller', 'Reviews']}
                        color="border-yellow-200 bg-yellow-50"
                    />
                    <PsychologyCard 
                        icon={Flame}
                        title="Scarcity"
                        desc="“This might disappear.” Triggers fear of missing out (FOMO) and immediate action."
                        examples={['Low Stock', 'Limited Ed.']}
                        color="border-orange-200 bg-orange-50"
                    />
                    <PsychologyCard 
                        icon={Tag}
                        title="Value"
                        desc="“I’m getting a deal.” Triggers loss aversion and rationalizes the purchase."
                        examples={['Sale', 'Free Shipping']}
                        color="border-red-200 bg-red-50"
                    />
                    <PsychologyCard 
                        icon={ShieldCheck}
                        title="Security"
                        desc="“My money is safe.” Reduces risk perception at the critical point of payment."
                        examples={['SSL', 'Money-Back']}
                        color="border-blue-200 bg-blue-50"
                    />
                </div>

                {/* Interactive Section: Tier 1 & Mockup */}
                <div className="flex flex-col lg:flex-row gap-12 mb-20">
                    
                    {/* Left: Badge Configurations */}
                    <div className="flex-1 space-y-10">
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">1</span>
                                Tier 1: Product Badges
                            </h3>
                            <p className="text-slate-600 mb-6">Drive urgency and highlight value on collection & product pages.</p>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <BadgePreview badgeKey="bestseller" market={market} />
                                <BadgePreview badgeKey="sale" market={market} />
                                <BadgePreview badgeKey="newArrival" market={market} />
                                <BadgePreview badgeKey="lowStock" market={market} />
                                <BadgePreview badgeKey="exclusive" market={market} />
                                <BadgePreview badgeKey="sustainable" market={market} />
                            </div>
                        </div>

                        <div className="bg-indigo-900 rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                    Critical Rule
                                </h4>
                                <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                                    Always show original price with strikethrough + savings amount. "35% OFF" outperforms generic "Sale" by 12%.
                                </p>
                                <div className="bg-white/10 rounded-lg p-3 font-mono text-sm">
                                    {market === 'us' ? '"$120 $84 (Save $36)"' : '"₹3,500 ₹2,450 (Save ₹1,050 - 30% OFF)"'}
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
                        </div>
                    </div>

                    {/* Right: Live Mockup */}
                    <div className="w-full lg:w-96 shrink-0">
                        <div className="sticky top-24">
                            <div className="text-center mb-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Implementation Preview</span>
                                <p className="text-xs text-slate-500 mt-1">Updates based on market toggle</p>
                            </div>
                            <ProductMockup market={market} />
                            
                            <div className="mt-6 space-y-3">
                                <h4 className="font-bold text-slate-900 text-sm">Tier 2: Trust Signals (Below CTA)</h4>
                                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                                    <div className="flex items-center gap-2 p-2 bg-white border border-slate-100 rounded">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        Secure Checkout
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-white border border-slate-100 rounded">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        {market === 'us' ? '30-Day Returns' : 'Easy Returns'}
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-white border border-slate-100 rounded">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                        Money-Back Guarantee
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-white border border-slate-100 rounded">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                        {market === 'us' ? '24/7 Support' : 'WhatsApp Support'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tier 3 & Strategy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">2</span>
                            Implementation Roadmap
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">W1</div>
                                <div>
                                    <h5 className="font-bold text-slate-900">Essential Product Badges</h5>
                                    <p className="text-sm text-slate-600 mt-1">Add Sale/% Off (automated), Bestseller (top 20%), and New Arrival badges.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold shrink-0">W2</div>
                                <div>
                                    <h5 className="font-bold text-slate-900">Urgency & Scarcity</h5>
                                    <p className="text-sm text-slate-600 mt-1">Install stock countdowns. Configure "Low Stock" trigger at &lt;10 units.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center font-bold shrink-0">W3</div>
                                <div>
                                    <h5 className="font-bold text-slate-900">Trust Badge Row</h5>
                                    <p className="text-sm text-slate-600 mt-1">Add row below "Add to Cart": Security, Returns, Shipping, Payment Icons.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-6">Interactive Checklist</h3>
                        <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Product Page (Must-Have)</h4>
                            <ChecklistItem text="Sale/% Off badge (if discounted)" />
                            <ChecklistItem text="Bestseller badge (if top 20% by sales)" />
                            <ChecklistItem text="Low Stock badge (if <10 units)" />
                            <ChecklistItem text={`Trust badge row (Secure, Returns, Support)`} />
                            
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">Collection Page</h4>
                            <ChecklistItem text="Sale/% Off badge (primary)" />
                            <ChecklistItem text="Review stars + count (below name)" />
                        </div>
                    </div>
                </div>

                {/* Footer / Summary */}
                <div className="border-t border-slate-200 pt-10 pb-20 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Final Takeaway</h3>
                    <p className="max-w-2xl mx-auto text-slate-600 mb-8">
                        Badges are silent salespeople. Strategic implementation creates a 12-28% conversion increase with near-zero cost.
                        Your badges are working 24/7—make sure they’re telling the right story.
                    </p>
                    <div className="inline-block px-4 py-2 bg-slate-100 rounded text-sm text-slate-500 font-mono">
                        Arlox Design System v2.4
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TrustSignalsPage;