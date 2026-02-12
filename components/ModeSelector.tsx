
import React from 'react';
import { GameMode, Language, TRANSLATIONS } from '../types';

interface ModeSelectorProps {
  onSelect: (mode: GameMode) => void;
  lang: Language;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ onSelect, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="flex flex-col items-center justify-between h-full w-full py-10">
      <div className="text-center relative">
        <div className="text-8xl mb-4 animate-float">🦜</div>
        <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-rose-500 mb-2 title-font tracking-tight">
          {t.title}
        </h1>
        <p className="text-white font-black bg-indigo-500 px-6 py-2 rounded-full inline-block shadow-lg border-4 border-indigo-200 transform -rotate-2">
          {t.subtitle}
        </p>
      </div>

      <div className="w-full flex flex-col gap-6 px-4">
        <button 
          onClick={() => onSelect(GameMode.CLASSIC)}
          className="group relative bg-white hover:bg-emerald-50 p-6 rounded-[2.5rem] border-4 border-emerald-100 transition-all hover:scale-[1.05] hover:border-emerald-300 shadow-2xl shadow-emerald-100"
        >
          <div className="flex flex-col items-center text-center gap-1 relative z-10">
            <span className="text-3xl font-black text-emerald-600 title-font flex items-center gap-2">
              {t.easyMode} 🎈
            </span>
            <span className="text-slate-500 text-sm font-bold">{t.easyDesc}</span>
          </div>
        </button>

        <button 
          onClick={() => onSelect(GameMode.TIME)}
          className="group relative bg-white hover:bg-rose-50 p-6 rounded-[2.5rem] border-4 border-rose-100 transition-all hover:scale-[1.05] hover:border-rose-300 shadow-2xl shadow-rose-100"
        >
          <div className="flex flex-col items-center text-center gap-1 relative z-10">
            <span className="text-3xl font-black text-rose-500 title-font flex items-center gap-2">
              {t.challengeMode} ⚡
            </span>
            <span className="text-slate-500 text-sm font-bold">{t.challengeDesc}</span>
          </div>
        </button>
      </div>

      <div className="w-full p-6 bg-yellow-400 rounded-[2rem] border-4 border-white shadow-2xl relative overflow-hidden transform rotate-1">
        <div className="absolute -right-4 -top-4 text-5xl opacity-20">⭐</div>
        <h3 className="text-xl font-black text-white mb-3 flex items-center gap-2 drop-shadow-sm">
          {t.howToPlay}
        </h3>
        <ul className="text-sm text-yellow-900 space-y-3 font-black">
          <li className="flex gap-3 items-center">
            <span className="bg-white text-yellow-600 rounded-full w-8 h-8 flex items-center justify-center shrink-0 shadow-sm text-lg">1</span>
            {t.step1}
          </li>
          <li className="flex gap-3 items-center">
            <span className="bg-white text-yellow-600 rounded-full w-8 h-8 flex items-center justify-center shrink-0 shadow-sm text-lg">2</span>
            {t.step2}
          </li>
          <li className="flex gap-3 items-center">
            <span className="bg-white text-yellow-600 rounded-full w-8 h-8 flex items-center justify-center shrink-0 shadow-sm text-lg">3</span>
            {t.step3}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ModeSelector;
