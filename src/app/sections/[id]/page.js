// src/app/sections/[id]/page.js
import React from "react";
import Link from "next/link";
import { sections } from "@/lib/sections";
import { ArrowLeft } from "lucide-react";

/**
 * Important: your homepage lives at /homepage (my-spa/src/app/homepage).
 * We provide both:
 *  - Open Live Home -> /homepage
 *  - Open section anchor -> /homepage#<anchor> (if mapping exists)
 */

const HOME_ANCHORS = {
  1: "benchmarks",
  2: "hero",
  3: "collections",
  4: "product",
  5: "design",
  6: "theme",
  7: "app-stack",
  8: "trust",
  9: "elite"
};

export default function SectionPage({ params }) {
  const id = Number(params.id);
  const section = sections.find(s => s.id === id);

  if (!section) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Section not found</h1>
          <p className="text-slate-500 mt-2">No section exists for id {params.id}</p>
          <Link href="/dashboard" className="inline-block mt-4 text-blue-600">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const Icon = section.icon;
  const anchor = HOME_ANCHORS[id];
  const homepagePath = "/homepage"; // <- your homepage route

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-600 mb-6"><ArrowLeft size={16} /> Back to Dashboard</Link>

        <div className="bg-white rounded-2xl p-8 shadow border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600"><Icon size={28} /></div>
            <div>
              <h1 className="text-3xl font-bold">{section.title}</h1>
              <p className="text-slate-500 mt-1">{section.description}</p>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase mb-2">Metrics / Focus Areas</h3>
              <ul className="space-y-2">
                {section.metrics.map((m, i) => <li key={i} className="text-sm text-slate-600">• {m}</li>)}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase mb-2">Estimated Time</h3>
              <div className="text-lg font-semibold text-slate-900">{section.time}</div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-sm font-bold text-slate-700 uppercase mb-2">Suggested Tasks & Resources</h4>
            <p className="text-sm text-slate-600">This page is a template. Add checklists, templates, and links to your homepage anchors (e.g., <code>{homepagePath}#hero</code>).</p>
            <div className="mt-4 flex gap-3">
              {/* Open the homepage (root of your SPA) */}
              <a href={homepagePath} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Open Live Home</a>

              {/* If we have an anchor mapping, provide a direct anchor link */}
              {anchor ? (
                <a href={`${homepagePath}#${anchor}`} className="px-4 py-2 border rounded-lg">Jump to {anchor}</a>
              ) : null}

              <Link href="/dashboard" className="px-4 py-2 border rounded-lg">Back to Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
