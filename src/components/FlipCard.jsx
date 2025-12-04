// src/components/FlipCard.jsx
"use client";
import React, { useState } from "react";

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
          <div className="mb-4 p-4 bg-blue-50 rounded-full text-blue-600 text-4xl">{icon}</div>
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

export default FlipCard;
