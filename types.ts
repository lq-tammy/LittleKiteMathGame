
export enum GameMode {
  CLASSIC = 'CLASSIC',
  TIME = 'TIME'
}

export type Language = 'zh' | 'en';

export interface Block {
  id: string;
  value: number;
  row: number;
  col: number;
}

export interface GameState {
  blocks: Block[];
  targetSum: number;
  currentSum: number;
  selectedIds: string[];
  score: number;
  gameOver: boolean;
  mode: GameMode;
  timeLeft: number; 
  level: number;
}

export const GRID_COLS = 6;
export const GRID_ROWS = 10;
export const MAX_VALUE = 9;
export const INITIAL_ROWS = 4;
export const TIME_LIMIT = 10;

export const TRANSLATIONS = {
  zh: {
    title: "小鸢算术",
    subtitle: "快乐加减，聪明大脑",
    score: "得分",
    target: "目标",
    mode: "模式",
    easyMode: "轻松练习",
    easyDesc: "慢慢思考，适合刚开始学的小朋友",
    challengeMode: "小小挑战",
    challengeDesc: "要在倒计时结束前算好哦！快快快！",
    howToPlay: "📖 怎么玩呢？",
    step1: "看上方的数字，那是你的“目标”。",
    step2: "点击方块，让它们的数字加起来等于“目标”。",
    step3: "不要让方块碰到最顶上哦！加油！",
    gameOver: "游戏结束",
    encouragement: "没关系哦！你已经很棒啦！",
    tryAgain: "再次挑战！🚀",
    goHome: "休息一下 🏠",
    quit: "不玩啦",
    restart: "重新开始",
    rowWarning: "加油！小鸢相信你可以的！",
    timeWarning: "别着急，就差一点点啦！",
    currentModeLabel: "当前玩法",
    classicLabel: "轻松模式",
    timeLabel: "小小挑战"
  },
  en: {
    title: "Little Kite Math",
    subtitle: "Happy Sums, Smart Brain",
    score: "Score",
    target: "Target",
    mode: "Mode",
    easyMode: "Easy Practice",
    easyDesc: "Take your time, perfect for beginners!",
    challengeMode: "Mini Challenge",
    challengeDesc: "Finish before time runs out! Hurry!",
    howToPlay: "📖 How to play?",
    step1: "Look at the number at the top. That's your goal.",
    step2: "Click blocks to make them add up to the goal.",
    step3: "Don't let blocks reach the top! You can do it!",
    gameOver: "Game Over",
    encouragement: "That's okay! You did amazing!",
    tryAgain: "Try Again! 🚀",
    goHome: "Go Home 🏠",
    quit: "Quit",
    restart: "Restart",
    rowWarning: "Keep going! Little Kite believes in you!",
    timeWarning: "Don't worry, almost there!",
    currentModeLabel: "Mode",
    classicLabel: "Easy",
    timeLabel: "Challenge"
  }
};
