
import React from 'react';
import { GameMode, Language, TRANSLATIONS } from '../types';

interface HeaderProps {
  target: number;
  current: number;
  score: number;
  mode: GameMode;
  timeLeft: number;
  lang: Language;
}

const Header: React.FC<HeaderProps> = ({ target, current, score, mode, timeLeft, lang }) => {
  const isTimeMode = mode === GameMode.TIME;
  const progress = isTimeMode ? (timeLeft / 10) * 100 : 0;
  const t = TRANSLATIONS[lang];

  return (
    <header className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center bg-white p-4 rounded-[2rem] border-4 border-indigo-100 shadow-xl">
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{t.score}</span>
          <span className="text-3xl font-black text-indigo-600 drop-shadow-sm">✨ {score}</span>
        </div>
        
        <div className="flex flex-col items-center px-4 md:px-8 border-x-4 border-indigo-50">
          <span className="text-xs font-black text-rose-500 uppercase tracking-widest">{t.target}</span>
          <span className="text-6xl font-black text-rose-500 title-font drop-shadow-md">{target}</span>
        </div>

        <div className="flex flex-col items-center hidden sm:flex">
          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{t.currentModeLabel}</span>
          <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border-2 border-emerald-100">
            {mode === GameMode.CLASSIC ? t.classicLabel : t.timeLabel}
          </span>
        </div>
      </div>

      <div className="relative h-16 bg-white rounded-[1.5rem] border-4 border-sky-100 overflow-hidden flex items-center justify-center px-6 shadow-lg">
        <div 
           className="absolute left-0 top-0 h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 transition-all duration-300 ease-out opacity-25"
           style={{ width: `${(current / target) * 100}%`, maxWidth: '100%' }}
        />
        <div className="relative z-10 font-black text-3xl flex items-center gap-4">
          <span className={`transition-all duration-200 ${current > target ? "text-rose-600 scale-125 rotate-3" : "text-sky-600"}`}>
            {current}
          </span>
          <span className="text-sky-200">/</span>
          <span className="text-slate-400 opacity-60">{target}</span>
        </div>
      </div>

      {isTimeMode && (
        <div className="w-full h-4 bg-slate-100 rounded-full border-2 border-white shadow-inner overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 linear shadow-inner ${timeLeft < 4 ? 'bg-gradient-to-r from-rose-400 to-orange-400' : 'bg-gradient-to-r from-sky-400 to-emerald-400'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
