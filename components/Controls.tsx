
import React from 'react';
import { Language, TRANSLATIONS } from '../types';

interface ControlsProps {
  onReset: () => void;
  lang: Language;
}

const Controls: React.FC<ControlsProps> = ({ onReset, lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="w-full flex gap-4 mt-auto">
      <button 
        onClick={onReset}
        className="flex-1 bg-white hover:bg-slate-50 text-slate-500 font-black py-4 rounded-[1.5rem] transition-all border-4 border-indigo-50 shadow-lg flex items-center justify-center gap-2 active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
        </svg>
        {t.quit}
      </button>
      <button 
        onClick={() => window.location.reload()}
        className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-black py-4 rounded-[1.5rem] transition-all border-b-8 border-sky-700 shadow-xl flex items-center justify-center gap-2 active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
        {t.restart}
      </button>
    </div>
  );
};

export default Controls;
