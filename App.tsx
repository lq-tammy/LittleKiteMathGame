
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { GameMode, GameState, Block, GRID_ROWS, INITIAL_ROWS, TIME_LIMIT, Language, TRANSLATIONS } from './types';
import { createNewRow, generateTargetSum, checkTopHit, moveBlocksUp } from './utils/gameLogic';
import Header from './components/Header';
import Grid from './components/Grid';
import Controls from './components/Controls';
import GameOverModal from './components/GameOverModal';
import ModeSelector from './components/ModeSelector';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [lang, setLang] = useState<Language>('zh');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const t = TRANSLATIONS[lang];

  const startNewGame = (mode: GameMode) => {
    let initialBlocks: Block[] = [];
    for (let i = 0; i < INITIAL_ROWS; i++) {
      const row = createNewRow(GRID_ROWS - 1 - i);
      initialBlocks = [...initialBlocks, ...row];
    }
    const target = generateTargetSum(initialBlocks);
    setGameState({
      blocks: initialBlocks,
      targetSum: target,
      currentSum: 0,
      selectedIds: [],
      score: 0,
      gameOver: false,
      mode,
      timeLeft: TIME_LIMIT,
      level: 1,
    });
  };

  const handleBlockClick = (id: string) => {
    if (!gameState || gameState.gameOver) return;
    setGameState(prev => {
      if (!prev) return null;
      const isSelected = prev.selectedIds.includes(id);
      const clickedBlock = prev.blocks.find(b => b.id === id);
      if (!clickedBlock) return prev;

      let newSelectedIds: string[];
      let newCurrentSum: number;
      if (isSelected) {
        newSelectedIds = prev.selectedIds.filter(sid => sid !== id);
        newCurrentSum = prev.currentSum - clickedBlock.value;
      } else {
        newSelectedIds = [...prev.selectedIds, id];
        newCurrentSum = prev.currentSum + clickedBlock.value;
      }

      if (newCurrentSum === prev.targetSum) {
        const remainingBlocks = prev.blocks.filter(b => !newSelectedIds.includes(b.id));
        let updatedBlocks = remainingBlocks;
        if (prev.mode === GameMode.CLASSIC) {
          updatedBlocks = moveBlocksUp(updatedBlocks);
          const newRow = createNewRow(GRID_ROWS - 1);
          updatedBlocks = [...updatedBlocks, ...newRow];
        }
        const isGameOver = checkTopHit(updatedBlocks);
        const newTarget = generateTargetSum(updatedBlocks);
        return {
          ...prev,
          blocks: updatedBlocks,
          selectedIds: [],
          currentSum: 0,
          targetSum: newTarget,
          score: prev.score + (newSelectedIds.length * 10),
          gameOver: isGameOver,
          timeLeft: TIME_LIMIT,
        };
      }
      return { ...prev, selectedIds: newSelectedIds, currentSum: newCurrentSum };
    });
  };

  useEffect(() => {
    if (gameState?.mode === GameMode.TIME && !gameState.gameOver) {
      timerRef.current = setInterval(() => {
        setGameState(prev => {
          if (!prev) return null;
          if (prev.timeLeft <= 0) {
            const updatedBlocks = moveBlocksUp(prev.blocks);
            const newRow = createNewRow(GRID_ROWS - 1);
            const finalBlocks = [...updatedBlocks, ...newRow];
            const isGameOver = checkTopHit(finalBlocks);
            return {
              ...prev,
              blocks: finalBlocks,
              selectedIds: [],
              currentSum: 0,
              timeLeft: TIME_LIMIT,
              gameOver: isGameOver
            };
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState?.mode, gameState?.gameOver]);

  const encouragement = useMemo(() => {
    if (!gameState || gameState.gameOver) return null;
    const highestRow = Math.min(...gameState.blocks.map(b => b.row));
    const isRowWarning = highestRow <= 2;
    const isTimeWarning = gameState.mode === GameMode.TIME && gameState.timeLeft <= 3;
    
    if (isRowWarning) return { text: t.rowWarning, type: 'warning' };
    if (isTimeWarning) return { text: t.timeWarning, type: 'time' };
    return null;
  }, [gameState, lang]);

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-slate-900 flex flex-col items-center relative overflow-hidden">
      {/* Dopamine Decorative Background Shapes */}
      <div className="absolute top-[-5%] left-[-10%] w-64 h-64 bg-rose-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-[-5%] right-[-10%] w-96 h-96 bg-sky-200/30 rounded-full blur-3xl" />
      <div className="absolute top-[40%] right-[-5%] w-32 h-32 bg-yellow-200/30 rounded-full blur-2xl" />

      {/* Language Switcher - Floating */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')}
          className="bg-white/80 backdrop-blur-sm border-2 border-indigo-100 px-4 py-2 rounded-full font-bold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-all flex items-center gap-2"
        >
          <span>🌐</span>
          {lang === 'zh' ? 'English' : '中文'}
        </button>
      </div>

      {!gameState && (
        <div className="absolute top-10 left-10 text-6xl animate-float opacity-30 pointer-events-none">🦜</div>
      )}
      {!gameState && (
        <div className="absolute bottom-20 right-10 text-6xl animate-float opacity-30 pointer-events-none" style={{ animationDelay: '1s' }}>🐦</div>
      )}

      <div className="w-full max-w-lg h-screen flex flex-col px-4 py-6 md:py-10 z-10">
        {!gameState ? (
          <ModeSelector onSelect={startNewGame} lang={lang} />
        ) : (
          <>
            <Header 
              target={gameState.targetSum} 
              current={gameState.currentSum} 
              score={gameState.score}
              mode={gameState.mode}
              timeLeft={gameState.timeLeft}
              lang={lang}
            />
            
            {/* Real-time Encouragement Toast */}
            <div className={`h-10 mt-2 flex items-center justify-center transition-all duration-300 ${encouragement ? 'opacity-100' : 'opacity-0'}`}>
              {encouragement && (
                <div className={`px-5 py-1.5 rounded-full font-black text-sm shadow-md border-2 animate-bounce ${encouragement.type === 'warning' ? 'bg-amber-400 border-amber-500 text-white' : 'bg-rose-500 border-rose-600 text-white'}`}>
                  <span>{encouragement.type === 'warning' ? '⚠️ ' : '⚡ '}</span>
                  {encouragement.text}
                </div>
              )}
            </div>

            <div className="flex-1 w-full flex flex-col justify-center items-center py-4 overflow-hidden">
              <Grid 
                blocks={gameState.blocks} 
                selectedIds={gameState.selectedIds} 
                onBlockClick={handleBlockClick} 
              />
            </div>

            <Controls onReset={() => setGameState(null)} lang={lang} />
          </>
        )}
      </div>

      {gameState?.gameOver && (
        <GameOverModal 
          score={gameState.score} 
          onRestart={() => startNewGame(gameState.mode)} 
          onHome={() => setGameState(null)}
          lang={lang}
        />
      )}
    </div>
  );
};

export default App;
