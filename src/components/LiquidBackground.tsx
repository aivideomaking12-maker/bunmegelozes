import React from 'react';

export const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* User replaceable background image from /public/background.svg or background.png */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: "url('/background.svg')",
          backgroundColor: '#F0F9FF',
        }}
      />

      {/* Glassmorphic Liquid Ambient Layers with gentle floating motion */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-sky-400/30 to-indigo-300/30 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-28 w-[32rem] h-[32rem] rounded-full bg-gradient-to-bl from-pink-300/25 via-amber-200/25 to-sky-300/25 blur-3xl animate-float-reverse" />
      <div className="absolute -bottom-32 left-1/4 w-[36rem] h-[36rem] rounded-full bg-gradient-to-tr from-teal-300/25 via-emerald-200/20 to-sky-400/20 blur-3xl animate-float-slow" />

      {/* Floating Animated Clouds */}
      {/* Cloud 1 */}
      <div
        className="absolute top-12 -left-48 w-72 opacity-80 animate-cloud-move-1 drop-shadow-md"
        style={{ animationDuration: '45s' }}
      >
        <svg viewBox="0 0 200 120" className="w-full text-white/90 fill-current">
          <path d="M 30,80 A 25,25 0 0,1 55,45 A 35,35 0 0,1 115,35 A 30,30 0 0,1 160,55 A 25,25 0 0,1 165,80 A 15,15 0 0,1 150,95 L 35,95 A 15,15 0 0,1 30,80 Z" />
        </svg>
      </div>

      {/* Cloud 2 */}
      <div
        className="absolute top-44 -left-64 w-96 opacity-60 animate-cloud-move-2 drop-shadow-sm"
        style={{ animationDuration: '65s', animationDelay: '-20s' }}
      >
        <svg viewBox="0 0 240 130" className="w-full text-white/80 fill-current">
          <path d="M 40,90 A 30,30 0 0,1 70,50 A 45,45 0 0,1 150,40 A 35,35 0 0,1 200,65 A 30,30 0 0,1 210,95 A 18,18 0 0,1 190,110 L 45,110 A 18,18 0 0,1 40,90 Z" />
        </svg>
      </div>

      {/* Cloud 3 */}
      <div
        className="absolute bottom-28 -left-52 w-80 opacity-70 animate-cloud-move-3 drop-shadow-sm"
        style={{ animationDuration: '55s', animationDelay: '-10s' }}
      >
        <svg viewBox="0 0 200 120" className="w-full text-white/85 fill-current">
          <path d="M 35,80 A 25,25 0 0,1 60,45 A 35,35 0 0,1 120,38 A 28,28 0 0,1 165,58 A 22,22 0 0,1 170,82 L 35,82 Z" />
        </svg>
      </div>

      {/* Light Sparkles & Soft Sunshine Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40 pointer-events-none" />
    </div>
  );
};
