
import React from 'react';
import { Block, GRID_COLS, GRID_ROWS } from '../types';

interface GridProps {
  blocks: Block[];
  selectedIds: string[];
  onBlockClick: (id: string) => void;
}

// Ultra-saturated, Dopamine Colors
const COLORS = [
  'bg-rose-500 border-rose-700 text-white',
  'bg-amber-400 border-amber-600 text-white',
  'bg-emerald-500 border-emerald-700 text-white',
  'bg-sky-500 border-sky-700 text-white',
  'bg-indigo-500 border-indigo-700 text-white',
  'bg-fuchsia-500 border-fuchsia-700 text-white',
  'bg-orange-500 border-orange-700 text-white',
  'bg-lime-500 border-lime-700 text-white'
];

const Grid: React.FC<GridProps> = ({ blocks, selectedIds, onBlockClick }) => {
  const cells = Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, index) => {
    const row = Math.floor(index / GRID_COLS);
    const col = index % GRID_COLS;
    const block = blocks.find(b => b.row === row && b.col === col);
    return { row, col, block };
  });

  return (
    <div 
      className="grid gap-2 w-full h-full max-h-[70vh] aspect-[6/10] bg-white p-3 md:p-4 rounded-[2.5rem] border-8 border-indigo-50 shadow-2xl relative overflow-hidden"
      style={{
        gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
      }}
    >
      {cells.map((cell, i) => (
        <div key={i} className="relative w-full h-full">
          {cell.block ? (
            <button
              onClick={() => onBlockClick(cell.block!.id)}
              className={`
                w-full h-full rounded-xl md:rounded-2xl text-xl sm:text-2xl md:text-3xl font-black flex items-center justify-center
                transition-all duration-150 transform active:scale-90 shadow-md
                ${selectedIds.includes(cell.block.id) 
                  ? 'bg-yellow-300 text-slate-900 border-b-8 border-yellow-500 ring-4 ring-yellow-100 -translate-y-2 scale-105 z-20' 
                  : `${COLORS[cell.block.value % COLORS.length]} border-b-4 hover:brightness-110`}
              `}
            >
              {cell.block.value}
            </button>
          ) : (
            <div className="w-full h-full bg-slate-50 rounded-xl md:rounded-2xl border-2 border-dashed border-indigo-50/50" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Grid;
