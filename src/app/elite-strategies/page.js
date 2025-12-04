"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  Loader2,
  Check,
  Lock,
  ShieldCheck,
  Binary
} from 'lucide-react';

const CollectionComingSoon = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('IDLE');
  const [gridItems, setGridItems] = useState([]);
  const containerRef = useRef(null);
  
  // Neumorphic Shadow Styles
  const neuFlat = "shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]";
  const neuPressed = "shadow-[inset_6px_6px_10px_rgb(163,177,198,0.6),inset_-6px_-6px_10px_rgba(255,255,255,0.5)]";
  const neuBtn = "shadow-[6px_6px_10px_rgb(163,177,198,0.6),-6px_-6px_10px_rgba(255,255,255,0.5)] active:shadow-[inset_4px_4px_8px_rgb(163,177,198,0.6),inset_-4px_-4px_8px_rgba(255,255,255,0.5)]";

  // Generate random grid blocks
  useEffect(() => {
    const items = Array.from({ length: 48 }).map((_, i) => ({
      id: i,
      width: Math.random() > 0.8 ? 'col-span-2' : 'col-span-1',
      height: Math.random() > 0.8 ? 'row-span-2' : 'row-span-1',
      // Neumorphism relies less on opacity and more on state (pressed vs flat)
      isPressed: Math.random() > 0.7, 
      delay: Math.random() * 5
    }));
    setGridItems(items);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt rotation (subtle for neumorphism)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3; 
    const rotateY = ((x - centerX) / centerX) * 3;

    setMousePos({ x, y, rotateX, rotateY });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('LOADING');
    setTimeout(() => setStatus('SUCCESS'), 1500);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#e0e5ec] text-slate-600 font-sans relative overflow-hidden flex flex-col items-center justify-center cursor-default selection:bg-slate-300 perspective-1000"
      onMouseMove={handleMouseMove}
    >
      {/* --- LAYER 1: THE TACTILE GRID (Base) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="grid grid-cols-8 md:grid-cols-12 gap-6 p-8 h-full w-full transform scale-105">
          {gridItems.map((item) => (
            <div 
              key={item.id} 
              className={`${item.width} ${item.height} rounded-2xl transition-all duration-1000 ${item.isPressed ? neuPressed : neuFlat}`}
              style={{ 
                animation: `breathe 6s infinite ${item.delay}s alternate` 
              }}
            />
          ))}
        </div>
      </div>

      {/* --- FLOATING HUDS --- */}
      <div className={`absolute top-10 left-10 hidden md:flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 py-2 rounded-full ${neuFlat}`}>
        <Binary size={14} className="text-slate-500" /> System: Neu_Grid_v9
      </div>
      <div className={`absolute bottom-10 right-10 hidden md:flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 py-2 rounded-full ${neuFlat}`}>
        Coords: {Math.round(mousePos.x)}, {Math.round(mousePos.y)}
      </div>

      {/* --- CONTENT CARD (3D TILT) --- */}
      <div 
        className="relative z-20 transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.rotateX || 0}deg) rotateY(${mousePos.rotateY || 0}deg)`
        }}
      >
        <div className={`bg-[#e0e5ec] p-12 rounded-[3rem] max-w-2xl w-full mx-6 text-center group relative overflow-hidden ${neuFlat} border border-white/20`}>
          
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-slate-500 text-[10px] font-black uppercase tracking-widest mb-10 ${neuPressed}`}>
            <ShieldCheck size={14} className="text-blue-500" /> Elite Access Only
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-slate-700 drop-shadow-sm">
            ELITE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-800">COLLECTIONS</span>
          </h1>

          <p className="text-slate-500 text-lg mb-12 leading-relaxed max-w-lg mx-auto font-medium">
            Architecting high-density <span className="text-slate-800">tactile interfaces</span> and <span className="text-slate-800">soft-touch filtering</span> systems. 
            <br/><span className="text-xs uppercase tracking-widest opacity-50 mt-3 block">Status: Molding Geometry...</span>
          </p>

          {/* Waitlist Form */}
          <div className="max-w-md mx-auto relative z-30">
            {status === 'SUCCESS' ? (
              <div className={`text-green-600 p-5 rounded-2xl flex items-center justify-center gap-3 animate-fade-in ${neuPressed}`}>
                <Check size={22} />
                <span className="font-bold text-sm tracking-wide">ACCESS CODE GRANTED</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative group/input flex gap-4">
                <div className={`relative flex-1 rounded-2xl ${neuPressed}`}>
                  <input 
                    type="email" 
                    placeholder="Enter agent ID (email)" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'LOADING'}
                    className="w-full bg-transparent border-none rounded-2xl px-6 py-4 focus:outline-none focus:ring-0 transition-all placeholder:text-slate-400 text-slate-700 font-mono text-sm h-full"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={status === 'LOADING' || !email}
                  className={`bg-[#e0e5ec] text-slate-600 hover:text-blue-600 disabled:text-slate-300 font-bold rounded-2xl w-16 h-14 flex items-center justify-center transition-all ${neuBtn}`}
                >
                  {status === 'LOADING' ? <Loader2 size={20} className="animate-spin" /> : <ChevronRight size={24} />}
                </button>
              </form>
            )}
            <p className="mt-8 text-[10px] text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <Lock size={12} /> Secure Encryption Active
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes breathe {
          0% { transform: scale(1); }
          100% { transform: scale(0.98); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        body { background-color: #e0e5ec; }
      `}</style>
    </div>
  );
};

export default CollectionComingSoon;