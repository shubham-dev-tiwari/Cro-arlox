// src/app/dashboard/page.js
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import sections, { HOME_ANCHORS } from "@/lib/sections";
import SectionCard from "@/components/SectionCard";
import FlipCard from "@/components/FlipCard";
import Confetti from "@/components/Confetti";
import { Calculator, ArrowRight, PlayCircle, CheckSquare } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  // small app state for widgets
  const [traffic, setTraffic] = useState(10000);
  const [convRate, setConvRate] = useState(2.0);
  const [aov, setAov] = useState(2000);
  const [activeTab, setActiveTab] = useState("visual");
  const [activeWeek, setActiveWeek] = useState(1);
  const [reviewCount, setReviewCount] = useState(50);
  const [frictionToggle, setFrictionToggle] = useState({ guest: false, autoFill: false, minimal: false });
  const [checklist, setChecklist] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  // derived
  const currentRevenue = Math.round(traffic * (convRate / 100) * aov);
  const projectedRevenue = Math.round(traffic * ((convRate + 1.5) / 100) * aov);
  const lift = Math.max(0, projectedRevenue - currentRevenue);
  const reviewImpact = reviewCount < 10 ? 0 : reviewCount < 50 ? 1.5 : reviewCount < 100 ? 2.8 : 4.2;
  const frictionTime = 120 - (frictionToggle.guest ? 45 : 0) - (frictionToggle.autoFill ? 20 : 0) - (frictionToggle.minimal ? 15 : 0);

  // checklist persistence
  const STORAGE_KEY = "arlox.checklist.v1";
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setChecklist(JSON.parse(raw)); } catch (e) { /* ignore */ }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    // small confetti auto-off safety (in case toggled)
    if (showConfetti) {
      const t = setTimeout(() => setShowConfetti(false), 1800);
      return () => clearTimeout(t);
    }
  }, [showConfetti]);

  const toggleTask = (id) => {
    setChecklist(prev => {
      const newState = { ...prev, [id]: !prev[id] };
      if (!prev[id]) setShowConfetti(true);
      return newState;
    });
  };

  // helper to open a section — prefer homepage anchor if available
  const openSection = (s) => {
    const anchor = HOME_ANCHORS && HOME_ANCHORS[s.id];
    if (anchor) {
      // go to homepage anchor
      router.push(`/homepage#${anchor}`);
    } else {
      // fallback to section detail page
      router.push(`/sections/${s.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 relative">
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      {/* Top nav (simple) */}
      <nav className="fixed w-full z-40 bg-white/90 backdrop-blur-md shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600" />
            <span className="font-bold text-lg">Arlox Dashboard</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#hub" className="hover:text-blue-600">Hub</a>
            <a href="#roadmap" className="hover:text-blue-600">30-Day Roadmap</a>
            <a href="#tools" className="hover:text-blue-600">Tools</a>
            {/* Open the homepage route */}
            <button onClick={() => router.push("/homepage")} className="px-4 py-2 bg-blue-600 text-white rounded-full">Open Home</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative pt-28 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest">
              Interactive CRO Blueprint
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold">Your 80-20 Fashion <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">E-commerce Playbook</span></h1>

            <p className="text-lg text-slate-600 max-w-xl">Master the 20% of elements that drive 80% of conversions. Click any card to open the module.</p>

            <div className="flex gap-4 items-center">
              <button onClick={() => openSection(sections.find(s => s.id === 2))} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2">
                Homepage Must-Haves <ArrowRight size={16} />
              </button>
              <div className="px-3 py-2 bg-slate-50 rounded-lg text-sm text-slate-600">Based on 87+ Top Brands</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2"><Calculator size={18} /> Potential Impact</h3>
              <span className="text-xs font-mono text-slate-400">LIVE CALC</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Monthly Visitors</label>
                <input type="range" min="1000" max="100000" step="1000" value={traffic} onChange={(e) => setTraffic(Number(e.target.value))} className="w-full" />
                <div className="text-right font-mono font-bold">{traffic.toLocaleString()}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">Conv. Rate (%)</label>
                  <input type="number" value={convRate} step="0.1" onChange={(e) => setConvRate(Number(e.target.value))} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">AOV (₹)</label>
                  <input type="number" value={aov} step="100" onChange={(e) => setAov(Number(e.target.value))} className="w-full p-2 border rounded" />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-end">
                  <span className="text-sm text-slate-500">Projected Monthly Lift</span>
                  <span className="text-2xl font-bold text-emerald-600">+₹{lift.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${Math.min(100, Math.round((lift / Math.max(1, currentRevenue)) * 100))}%` }} />
                </div>
                <p className="text-xs text-center mt-2 text-slate-400">By optimizing conversion from {convRate}% to {(convRate + 1.5).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Hub */}
        <section id="hub">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Navigation Hub</h2>
              <p className="text-slate-500">Click a card to open its page (we prefer homepage anchors).</p>
            </div>
            <div className="hidden md:flex items-center gap-3 text-sm text-slate-500">
              <span className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-500" /> Completed
              <span className="w-3 h-3 rounded-full bg-blue-100 border border-blue-500" /> In Progress
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
                // prefer homepage anchor, fallback to section page
                onClick={() => openSection(s)}
              />
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="bg-slate-900 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">30-Day Execution Roadmap</h2>
              <p className="text-slate-300">Follow the sequence — don't do everything at once.</p>
            </div>
            <div className="bg-white/10 px-3 py-2 rounded font-mono">Week {activeWeek}</div>
          </div>

          <div className="mb-6">
            <div className="relative mb-8">
              <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-slate-700 rounded-full"></div>
              <div className="relative z-10 grid grid-cols-4 gap-4">
                {[{week:1,title:"Foundation"},{week:2,title:"Urgency"},{week:3,title:"Social Proof"},{week:4,title:"Checkout"}].map(w => (
                  <div key={w.week} onClick={() => setActiveWeek(w.week)} className="flex flex-col items-center cursor-pointer">
                    <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-white shadow-lg ${w.week === activeWeek ? "scale-110 ring-4 ring-white/20 bg-blue-500 border-blue-500" : "bg-slate-900 border-slate-700"}`}>{w.week}</div>
                    <div className={`mt-3 text-sm ${w.week === activeWeek ? "text-white" : "text-slate-400"}`}>Week {w.week}</div>
                    <div className="text-xs text-slate-400">{w.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2"><CheckSquare className="text-emerald-400" /> Week {activeWeek} Tasks</h3>
                <Confetti active={showConfetti} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {({
                  1: ["Install Judge.me (Free Plan)", "Add Trust Badges below Add-to-Cart", "Optimize Images (TinyIMG)", "Create Size Guides for Apparel", "Add Free Shipping Banner", "Setup Welcome Email Flow"],
                  2: ["Setup Abandoned Cart Email Flow (3 emails)", "Implement Low Stock Counter (Hurrify)", "Add Exit-Intent Popup (10% Off)", "Configure 'Back in Stock' Alerts", "Enable SMS Recovery (Cartly/Klaviyo)", "Add Countdown Timer for Sales (Generic Scarcity)"],
                  3: ["Launch Photo Review Campaign (Incentivized)", "Add 'Frequently Bought Together' Widget", "Setup Post-Purchase Upsell (Rebuy)", "Implement 'Recently Viewed' Slider", "Add 'Real-time Purchase' Notifications", "Create Product Bundles (Lookbook)"],
                  4: ["Enable Guest Checkout (Mandatory)", "Simplify Checkout Form Fields", "Add Local Payment Options (UPI/Wallets)", "Implement One-Click Checkout (ShopPay)", "Add Security Badges to Checkout Footer", "Test Site Speed (Target < 2s)"]
                }[activeWeek] || []).map((task, i) => {
                  const id = `w${activeWeek}-t${i}`;
                  const done = !!checklist[id];
                  return (
                    <div key={id} onClick={() => { setChecklist(prev => ({ ...prev, [id]: !prev[id] })); if (!done) setShowConfetti(true); }} className={`p-4 rounded-xl border cursor-pointer flex items-center gap-4 ${done ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-200" : "bg-slate-800 border-slate-700 text-slate-300"}`}>
                      <div className={`w-6 h-6 rounded flex items-center justify-center ${done ? "bg-emerald-500 text-white" : "border-slate-500"}`}>{done ? "✓" : ""}</div>
                      <div className={done ? "line-through opacity-70" : ""}>{task}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Tools: Tabs */}
        <section id="tools">
          <div className="bg-white border rounded-2xl p-6">
            <div className="flex border-b">
              {["visual", "trust", "friction"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-sm font-bold ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:bg-slate-50"}`}>{tab === "visual" ? "Visual" : tab === "trust" ? "Trust" : "Friction"}</button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === "visual" && (
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="text-xl font-bold">Conversion Impact of Imagery</h3>
                    <p className="text-slate-600">Elite brands provide a "tactile" visual experience — lifestyle + closeups.</p>
                    <div className="mt-4 space-y-4">
                      <div className="p-4 border rounded-lg">
                        <strong>Average</strong>
                        <p className="text-sm text-slate-500">Few images, plain background.</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-blue-50">
                        <strong>Elite</strong>
                        <p className="text-sm text-slate-500">8–12 images + video, model stats, fabric closeups.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="aspect-[4/3] bg-slate-100 rounded-lg mb-4 flex items-center justify-center">
                      <div className="text-center">
                        <PlayCircle size={48} className="opacity-80" />
                        <div className="font-bold mt-2">Video is non-negotiable</div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500"><span>Source: Arlox</span><span className="text-emerald-600 font-bold">Impact: +12% Add to Cart</span></div>
                  </div>
                </div>
              )}

              {activeTab === "trust" && (
                <div className="text-center">
                  <h3 className="text-xl font-bold">Review Volume Simulator</h3>
                  <div className="bg-white p-6 rounded mt-6 max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-6 mb-4">
                      <div className="text-right">
                        <div className="text-xs uppercase text-slate-400">Review Count</div>
                        <div className="text-3xl font-bold">{reviewCount}</div>
                      </div>
                      <div className="text-left">
                        <div className="text-xs uppercase text-slate-400">Avg Conv.</div>
                        <div className={`text-3xl font-black ${reviewImpact > 3 ? "text-emerald-500" : reviewImpact > 2 ? "text-blue-500" : "text-amber-500"}`}>{reviewImpact}%</div>
                      </div>
                    </div>
                    <input type="range" min="0" max="200" value={reviewCount} onChange={(e) => setReviewCount(Number(e.target.value))} className="w-full" />
                    <div className="mt-4 text-sm text-slate-500">
                      {reviewCount < 10 ? "Fewer than 10 reviews suppresses conversion." : reviewCount < 50 ? "Basic trust established." : reviewCount < 100 ? "Social proof kicking in." : "Elite trust achieved."}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "friction" && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold">Checkout Friction Calculator</h3>
                    <p className="text-slate-600">Toggles to reduce checkout time and abandonment.</p>

                    <div className="mt-6 space-y-4">
                      {[
                        { key: "guest", label: "Enable Guest Checkout" },
                        { key: "autoFill", label: "Address Auto-complete" },
                        { key: "minimal", label: "Minimal Header/Footer" }
                      ].map(item => (
                        <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="font-bold">{item.label}</div>
                          <button onClick={() => setFrictionToggle(p => ({ ...p, [item.key]: !p[item.key] }))} className={`w-12 h-6 rounded-full p-1 ${frictionToggle[item.key] ? "bg-emerald-500" : "bg-slate-300"}`}>
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${frictionToggle[item.key] ? "translate-x-6" : ""}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 text-white p-6 rounded-2xl text-center">
                    <div className="text-sm uppercase text-slate-400">Est. Time to Complete</div>
                    <div className="my-4">
                      <div className="text-4xl font-mono font-bold">{frictionTime}s</div>
                      <div className="text-xs text-slate-400">Industry Avg: 120s</div>
                    </div>
                    <div className="text-emerald-400 font-bold">You saved {120 - frictionTime} seconds!</div>
                    <div className="text-xs text-slate-400 mt-2">Impact: ~{Math.round((120 - frictionTime) * 0.5)}% decrease in abandonment</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Psychology */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Conversion Psychology</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FlipCard title="Social Proof" icon="👥" content="People assume others' actions are correct. Reduces uncertainty." example='"Priya from Mumbai bought this 2h ago"' />
            <FlipCard title="Scarcity (FOMO)" icon="🔥" content="Items feel more valuable when scarce." example='"Only 3 left in Size M"' />
            <FlipCard title="Loss Aversion" icon="📉" content="The pain of loss often outweighs the pleasure of gain." example='"Save ₹1,050" vs "20% Off"' />
            <FlipCard title="Paradox of Choice" icon="😵‍💫" content="Too many options cause decision paralysis." example='Show 3 recommended vs 20' />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-sm">© Arlox — internal dashboard</div>
      </footer>
    </div>
  );
}
