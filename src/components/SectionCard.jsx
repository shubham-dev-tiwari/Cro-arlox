// src/components/SectionCard.jsx
"use client";
import React from "react";
import { Clock, ArrowRight } from "lucide-react";

const SectionCard = ({ number, title, icon: Icon, description, metrics = [], time, onClick, status = "not-started" }) => {
  const statusClass = status === "completed" ? "bg-emerald-100 text-emerald-700" : status === "in-progress" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500";
  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-bl-xl ${statusClass}`}>
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

      <div className="space-y-2">
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
};

export default SectionCard;
