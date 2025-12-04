// src/lib/sections.js
import {
  BarChart3,
  Monitor,
  Layers,
  ShoppingBag,
  Palette,
  LayoutDashboard,
  Zap,
  Award,
  TrendingUp
} from "lucide-react";

export const sections = [
  { id: 1, title: "Critical Benchmarks", icon: BarChart3, description: "You can't optimize what you don't measure.", metrics: ["US Conv: 2.9-3.3%", "India Conv: 1.8-2.4%", "Page Speed Targets"], time: "2-3 hours" },
  { id: 2, title: "Homepage Must-Haves", icon: Monitor, description: "3-5 seconds to build trust or lose them.", metrics: ["Hero Clarity Test", "Sticky Nav Logic", "Trust Signal Placement"], time: "4-6 hours" },
  { id: 3, title: "Collection Essentials", icon: Layers, description: "Friction here kills 40% of conversions.", metrics: ["Filter Strategy", "Grid Density (US vs IN)", "Quick View Logic"], time: "5-8 hours" },
  { id: 4, title: "Product Page Power", icon: ShoppingBag, description: "Your digital salesperson.", metrics: ["8-12 Image Rule", "Size Guide Strategy", "Objection Handling"], time: "8-10 hours" },
  { id: 5, title: "Design Principles", icon: Palette, description: "Design is not decoration; it's engineering.", metrics: ["48px Touch Targets", "Visual Hierarchy", "Color Psychology"], time: "Ongoing" },
  { id: 6, title: "Theme Selection", icon: LayoutDashboard, description: "The foundation of performance.", metrics: ["Turbo vs Prestige", "Mobile-First Logic", "Speed Optimization"], time: "2-4 hours" },
  { id: 7, title: "App Stack ROI", icon: Zap, description: "Revenue multipliers, not expenses.", metrics: ["Reviews (Judge.me)", "Urgency (Hurrify)", "Email (Klaviyo)"], time: "4-6 hours" },
  { id: 8, title: "Trust & Badges", icon: Award, description: "Silent salespeople that answer objections.", metrics: ["Badge Hierarchy", "Checkout Trust", "Authority Signals"], time: "2 hours" },
  { id: 9, title: "Elite Strategies", icon: TrendingUp, description: "What the top 1% do differently.", metrics: ["Visual Excellence", "Frictionless Checkout", "Urgency Balance"], time: "Advanced" }
];

// Map of section id -> homepage anchor id (string used after #)
export const HOME_ANCHORS = {
  1: "benchmarks",
  2: "homepage-must-haves",
  3: "collection-essentials",
  4: "product-page-power",
  5: "design-principles",
  6: "theme-selection",
  7: "app-stack-roi",
  8: "trust-badges",
  9: "elite-strategies"
};

export default sections;
