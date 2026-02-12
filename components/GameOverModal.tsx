
import React from 'react';
import { Language, TRANSLATIONS } from '../types';

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
  onHome: () => void;
  lang: Language;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart, onHome, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="fixed inset-0 bg-indigo-900/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
      <div className="bg-white border-8 border-indigo-100 p-8 rounded-[3.5rem] shadow-2xl max-w-sm w-full text-center relative overflow-hidden transform scale-110">
        <div className="absolute top-4 right-4 text-4xl animate-bounce">🎈</div>
        <div className="absolute top-4 left-4 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🍭</div>
        <div className="absolute bottom-4 left-4 text-3xl animate-pulse">🌟</div>
        
        <div className="text-8xl mb-4 drop-shadow-md">🎉</div>
        <h2 className="text-4xl font-black text-indigo-600 mb-2 title-font">{t.gameOver}</h2>
        <p className="text-slate-500 font-black mb-6">{t.encouragement}</p>
        
        <div className="bg-indigo-50 rounded-[2.5rem] py-10 mb-8 border-4 border-indigo-100 shadow-inner transform -rotate-1">
          <span className="text-indigo-300 text-sm font-black uppercase tracking-widest">{t.score}</span>
          <div className="text-8xl font-black text-indigo-500 mt-2 title-font drop-shadow-sm">
            {score}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={onRestart}
            className="w-full bg-rose-500 hover:bg-rose-400 text-white font-black text-2xl py-6 rounded-[2rem] transition-all shadow-xl shadow-rose-200 active:scale-95 border-b-8 border-rose-700"
          >
            {t.tryAgain}
          </button>
          <button 
            onClick={onHome}
            className="w-full bg-slate-100 hover:bg-white text-slate-500 font-black py-4 rounded-[1.5rem] transition-all active:scale-95 border-b-4 border-slate-200"
          >
            {t.goHome}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
