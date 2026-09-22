import React from 'react';
import { Shield, Volume2, VolumeX, Settings, BarChart3, HelpCircle } from 'lucide-react';
import { GameSettings } from '../types';

interface HeaderProps {
  settings: GameSettings;
  onToggleSound: () => void;
  onOpenAdmin: (tab?: 'settings' | 'questions' | 'import' | 'stats') => void;
  onResetToHome?: () => void;
  currentGameProgress?: {
    current: number;
    total: number;
    score: number;
  } | null;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onToggleSound,
  onOpenAdmin,
  onResetToHome,
  currentGameProgress,
}) => {
  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-3 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <div
          onClick={onResetToHome}
          id="header-brand-button"
          className="flex items-center gap-3 cursor-pointer group select-none transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-400 p-0.5 shadow-lg shadow-blue-900/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Shield className="w-6 h-6 text-sky-400 group-hover:text-sky-300 transition-colors" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/50">
                Somogy VMRFK
              </span>
              <span className="text-xs text-slate-400 hidden md:inline">Bűnmegelőzési Osztály</span>
            </div>
            <h1 className="text-sm sm:text-base md:text-lg font-black tracking-tight text-white leading-tight">
              Bűnmegelőzési Szerencsekerék
            </h1>
          </div>
        </div>

        {/* In-Game Mini Score if active */}
        {currentGameProgress && (
          <div className="hidden lg:flex items-center gap-4 bg-slate-800/80 border border-slate-700/80 px-4 py-1.5 rounded-full">
            <div className="text-xs text-slate-300">
              Kérdés: <strong className="text-white text-sm">{currentGameProgress.current} / {currentGameProgress.total}</strong>
            </div>
            <div className="h-3 w-px bg-slate-700" />
            <div className="text-xs text-slate-300">
              Helyes: <strong className="text-emerald-400 text-sm">{currentGameProgress.score}</strong>
            </div>
          </div>
        )}

        {/* Right side controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sound Toggle */}
          <button
            id="header-sound-toggle-btn"
            onClick={onToggleSound}
            title={settings.soundEnabled ? 'Hangok némítása' : 'Hangok bekapcsolása'}
            className={`p-2.5 rounded-xl border transition-all duration-200 active:scale-95 ${
              settings.soundEnabled
                ? 'bg-slate-800/90 hover:bg-slate-700 text-sky-400 border-slate-700 shadow-sm'
                : 'bg-slate-800/40 hover:bg-slate-800 text-slate-500 border-slate-800'
            }`}
            aria-label="Hangkapcsoló"
          >
            {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Quick Daily Stats Button */}
          <button
            id="header-daily-stats-btn"
            onClick={() => onOpenAdmin('stats')}
            title="Napi statisztikák megtekintése"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all duration-200 active:scale-95 text-xs font-semibold"
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Napi statisztika</span>
          </button>

          {/* Admin Gear Button */}
          <button
            id="header-admin-menu-btn"
            onClick={() => onOpenAdmin('settings')}
            title="Adminisztrátori felület (Beállítások, Kérdések, Excel import)"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-900/30 active:scale-95"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden md:inline">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};
