// Player Types
export interface Player {
  name: string;
  level: number;
  experience: number;
  experienceToNext: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  strength: number;
  intelligence: number;
  agility: number;
  charisma: number;
  shadowPoints: number;
  shadowRank: ShadowRank;
  skills: Skill[];
  inventory: Item[];
  achievements: Achievement[];
  dailyStreak: number;
  lastLogin: string | null;
}

export type ShadowRank = 'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS';

// Quest Types
export interface Quest {
  id: string;
  name: string;
  description: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  experienceReward: number;
  shadowPointsReward: number;
  requirements: string[];
  type: QuestType;
  duration?: number; // minutes
  target?: number;
  acceptedAt?: string;
  progress?: number;
  completed?: boolean;
}

export type QuestCategory = 'daily' | 'weekly' | 'achievement' | 'special';
export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'legendary';
export type QuestType = 'meditation' | 'exercise' | 'learning' | 'health' | 'social' | 'creativity' | 'streak' | 'level' | 'rank' | 'skills';

// Skill Types
export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  type: SkillType;
  level: number;
  maxLevel: number;
  experience: number;
  experienceToNext: number;
  effects: SkillEffects;
  requirements: SkillRequirements;
  icon: string;
  color: string;
  learnedAt?: string;
}

export type SkillCategory = 'physical' | 'mental' | 'social' | 'shadow';
export type SkillType = 'movement' | 'defense' | 'speed' | 'psychic' | 'memory' | 'concentration' | 'influence' | 'emotional' | 'leadership' | 'elemental' | 'teleportation' | 'summoning';

export interface SkillEffects {
  [key: string]: number;
}

export interface SkillRequirements {
  level?: number;
  strength?: number;
  agility?: number;
  intelligence?: number;
  charisma?: number;
  shadowPoints?: number;
  shadowRank?: ShadowRank;
}

// Achievement Types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: AchievementCategory;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export type AchievementCategory = 'quests' | 'level' | 'skills' | 'streak' | 'shadow';

// Item Types
export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
  effects: ItemEffects;
}

export type ItemType = 'weapon' | 'armor' | 'consumable' | 'material';
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface ItemEffects {
  [key: string]: number;
}

// System Types
export interface System {
  notifications: Notification[];
  isDarkMode: boolean;
  soundEnabled: boolean;
}

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  timestamp: string;
}

export type NotificationType = 'level_up' | 'achievement' | 'quest_complete' | 'skill_learned' | 'info';

// Game State Types
export interface GameState {
  player: Player;
  quests: {
    active: Quest[];
    completed: Quest[];
    available: Quest[];
  };
  system: System;
}

// Action Types
export type GameAction =
  | { type: 'GAIN_EXPERIENCE'; payload: number }
  | { type: 'COMPLETE_QUEST'; payload: Quest }
  | { type: 'ADD_QUEST'; payload: Quest }
  | { type: 'UPDATE_STATS'; payload: Partial<Player> }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'ADD_ACHIEVEMENT'; payload: Achievement }
  | { type: 'UPDATE_SHADOW_RANK' }
  | { type: 'CLEAR_NOTIFICATION'; payload: number };

// Component Props Types
export interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export interface TabItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color?: string;
}

// Journal Types
export interface JournalEntry {
  id: number;
  date: string;
  title: string;
  content: string;
  type?: string;
  stats?: Record<string, number>;
  mood?: string;
  tags?: string[];
}

export interface Goal {
  id: number;
  title: string;
  description: string;
  progress: number;
  target: number;
  current: number;
  category: string;
  completed: boolean;
}

// Utility Types
export type StatName = 'strength' | 'intelligence' | 'agility' | 'charisma' | 'health' | 'mana';

export interface StatItem {
  name: string;
  value: number;
  icon: React.ComponentType<any>;
  color: string;
} 