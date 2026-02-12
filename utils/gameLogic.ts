
import { Block, GRID_COLS, MAX_VALUE } from '../types';

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const createNewRow = (rowNumber: number): Block[] => {
  return Array.from({ length: GRID_COLS }).map((_, col) => ({
    id: generateId(),
    value: Math.floor(Math.random() * MAX_VALUE) + 1,
    row: rowNumber,
    col,
  }));
};

export const generateTargetSum = (blocks: Block[]): number => {
  if (blocks.length === 0) return 10;
  
  // Pick 2-4 random blocks from the board to ensure the sum is achievable
  const numToSum = Math.min(blocks.length, Math.floor(Math.random() * 3) + 2);
  const shuffled = [...blocks].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, numToSum);
  return selected.reduce((acc, curr) => acc + curr.value, 0);
};

export const checkTopHit = (blocks: Block[], maxRows: number): boolean => {
  return blocks.some(b => b.row <= 0);
};

export const moveBlocksUp = (blocks: Block[]): Block[] => {
  return blocks.map(b => ({ ...b, row: b.row - 1 }));
};
