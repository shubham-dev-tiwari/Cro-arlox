// src/components/Confetti.jsx
"use client";
import React from "react";

const COLORS = ["#2563EB", "#10B981", "#F59E0B"];

const Confetti = ({ active = false }) => {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-fall rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${-20 - Math.random() * 40}px`,
            backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
            width: `${6 + Math.random() * 10}px`,
            height: `${6 + Math.random() * 10}px`,
            animationDuration: `${1.6 + Math.random() * 1.6}s`,
            animationDelay: `${Math.random() * 0.8}s`
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0.9; }
        }
        .animate-fall { animation-name: confettiFall; animation-timing-function: linear; animation-fill-mode: forwards; }
      `}</style>
    </div>
  );
};

export default Confetti;
 