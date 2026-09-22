import React from 'react';
import { PlayerRole } from '../types';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface RoleSelectScreenProps {
  onSelectRole: (role: PlayerRole) => void;
}

export const RoleSelectScreen: React.FC<RoleSelectScreenProps> = ({
  onSelectRole,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] z-10 relative">
      {/* Title & Police Subtitle with customizable logo */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 sm:mb-12 max-w-3xl flex flex-col items-center"
      >
        {/* Replaceable Logo from public folder (/logo.svg or /logo.png) */}
        <div className="mb-4 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Rendőrségi Logó"
            className="w-60 h-60 sm:w-72 sm:h-72 object-contain filter drop-shadow-md hover:scale-80 transition-transform"
            onError={(e) => {
              // Fallback if custom file not found
              const target = e.currentTarget;
              target.style.display = 'none';
            }}
          />
        </div>

        {/* Somogy Megyei Rendőrkapitányság title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight mb-2 drop-shadow-sm">
          Somogy Megyei Rendőr-főkapitányság
        </h1>

        {/* Bűnmegelőzési Szerencsekerék subtitle */}
        <h2 className="text-xl sm:text-3xl font-extrabold text-sky-600 tracking-wide mb-4">
          Bűnmegelőzési Szerencsekerék
        </h2>

        {/* Catchy Slogan */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-amber-50/90 border border-amber-300/80 text-amber-900 text-sm sm:text-base font-bold shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <span>Pörgesd meg a szerencsekereket, és legyél te a bűnmegelőzés bajnoka!</span>
          <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
        </div>
      </motion.div>

      {/* Clean 2-Option Selector with Emojis */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 max-w-2xl">
        {/* GYEREK */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{
            scale: 1.04,
            y: -5,
            transition: { type: 'spring', stiffness: 400, damping: 22 },
          }}
          whileTap={{
            scale: 0.96,
            y: 0,
            transition: { type: 'spring', stiffness: 500, damping: 25 },
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          id="select-child-role-btn"
          onClick={() => onSelectRole('gyerek')}
          className="cursor-pointer rounded-3xl p-8 bg-white/80 backdrop-blur-xl border-2 border-white/90 hover:border-sky-400 shadow-xl shadow-sky-500/10 hover:shadow-2xl hover:shadow-sky-400/25 transition-colors flex flex-col items-center justify-center text-center group select-none"
        >
          {/* Child Emoji - centered with dedicated height to prevent clipping and ensure identical vertical alignment */}
          <motion.div
            whileHover={{ scale: 1.12, rotate: [-1, 2, -1, 0] }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="h-24 sm:h-28 flex items-center justify-center text-7xl sm:text-8xl mb-4 filter drop-shadow-md overflow-visible select-none leading-none"
          >
            🧒
          </motion.div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 group-hover:text-sky-600 transition-colors">
            Gyerek
          </h3>

          <div className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 text-white font-extrabold text-sm shadow-md shadow-sky-400/30 group-hover:shadow-sky-400/50 group-hover:scale-105 transition-all">
            Játék indítása
          </div>
        </motion.div>

        {/* FELNŐTT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{
            scale: 1.04,
            y: -5,
            transition: { type: 'spring', stiffness: 400, damping: 22 },
          }}
          whileTap={{
            scale: 0.96,
            y: 0,
            transition: { type: 'spring', stiffness: 500, damping: 25 },
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          id="select-adult-role-btn"
          onClick={() => onSelectRole('felnot')}
          className="cursor-pointer rounded-3xl p-8 bg-white/80 backdrop-blur-xl border-2 border-white/90 hover:border-indigo-400 shadow-xl shadow-indigo-500/10 hover:shadow-2xl hover:shadow-indigo-400/25 transition-colors flex flex-col items-center justify-center text-center group select-none"
        >
          {/* Adult Emoji - identically centered and aligned */}
          <motion.div
            whileHover={{ scale: 1.12, rotate: [1, -2, 1, 0] }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="h-24 sm:h-28 flex items-center justify-center text-7xl sm:text-8xl mb-4 filter drop-shadow-md overflow-visible select-none leading-none"
          >
            🧑
          </motion.div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
            Felnőtt
          </h3>

          <div className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-extrabold text-sm shadow-md shadow-indigo-400/30 group-hover:shadow-indigo-400/50 group-hover:scale-105 transition-all">
            Játék indítása
          </div>
        </motion.div>
      </div>
    </div>
  );
};
