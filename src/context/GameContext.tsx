import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { GameState, GameAction, Player, Quest, Skill, Achievement } from '../types';

const GameContext = createContext<{
  state: GameState;
  gainExperience: (amount: number) => void;
  completeQuest: (quest: Quest) => void;
  addQuest: (quest: Quest) => void;
  updateStats: (stats: Partial<Player>) => void;
  addSkill: (skill: Skill) => void;
  addAchievement: (achievement: Achievement) => void;
  clearNotification: (id: number) => void;
} | undefined>(undefined);

const initialState: GameState = {
  player: {
    name: 'Shadow Monarch',
    level: 1,
    experience: 0,
    experienceToNext: 100,
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    strength: 10,
    intelligence: 10,
    agility: 10,
    charisma: 10,
    shadowPoints: 0,
    shadowRank: 'F',
    skills: [],
    inventory: [],
    achievements: [],
    dailyStreak: 0,
    lastLogin: null,
  },
  quests: {
    active: [],
    completed: [],
    available: [],
  },
  system: {
    notifications: [],
    isDarkMode: true,
    soundEnabled: true,
  }
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'GAIN_EXPERIENCE':
      const newExp = state.player.experience + action.payload;
      let newLevel = state.player.level;
      let newExpToNext = state.player.experienceToNext;
      
      if (newExp >= state.player.experienceToNext) {
        newLevel += 1;
        newExpToNext = Math.floor(state.player.experienceToNext * 1.5);
        return {
          ...state,
          player: {
            ...state.player,
            level: newLevel,
            experience: newExp - state.player.experienceToNext,
            experienceToNext: newExpToNext,
            maxHealth: state.player.maxHealth + 10,
            health: state.player.maxHealth + 10,
            maxMana: state.player.maxMana + 5,
            mana: state.player.maxMana + 5,
            strength: state.player.strength + 2,
            intelligence: state.player.intelligence + 2,
            agility: state.player.agility + 2,
            charisma: state.player.charisma + 2,
          },
          system: {
            ...state.system,
            notifications: [...state.system.notifications, {
              id: Date.now(),
              type: 'level_up',
              message: `Level Up! You are now level ${newLevel}!`,
              timestamp: new Date().toISOString()
            }]
          }
        };
      }
      
      return {
        ...state,
        player: {
          ...state.player,
          experience: newExp
        }
      };

    case 'COMPLETE_QUEST':
      const quest = action.payload;
      return {
        ...state,
        player: {
          ...state.player,
          experience: state.player.experience + quest.experienceReward,
          shadowPoints: state.player.shadowPoints + quest.shadowPointsReward,
        },
        quests: {
          ...state.quests,
          active: state.quests.active.filter(q => q.id !== quest.id),
          completed: [...state.quests.completed, quest]
        }
      };

    case 'ADD_QUEST':
      return {
        ...state,
        quests: {
          ...state.quests,
          active: [...state.quests.active, action.payload]
        }
      };

    case 'UPDATE_STATS':
      return {
        ...state,
        player: {
          ...state.player,
          ...action.payload
        }
      };

    case 'ADD_SKILL':
      return {
        ...state,
        player: {
          ...state.player,
          skills: [...state.player.skills, action.payload]
        }
      };

    case 'ADD_ACHIEVEMENT':
      return {
        ...state,
        player: {
          ...state.player,
          achievements: [...state.player.achievements, action.payload]
        },
        system: {
          ...state.system,
          notifications: [...state.system.notifications, {
            id: Date.now(),
            type: 'achievement',
            message: `Achievement Unlocked: ${action.payload.name}`,
            timestamp: new Date().toISOString()
          }]
        }
      };

    case 'UPDATE_SHADOW_RANK':
      const ranks: Array<'F' | 'E' | 'D' | 'C' | 'B' | 'A' | 'S' | 'SS' | 'SSS'> = ['F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS'];
      const currentRankIndex = ranks.indexOf(state.player.shadowRank);
      const newRankIndex = Math.min(currentRankIndex + 1, ranks.length - 1);
      
      return {
        ...state,
        player: {
          ...state.player,
          shadowRank: ranks[newRankIndex]
        }
      };

    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        system: {
          ...state.system,
          notifications: state.system.notifications.filter(n => n.id !== action.payload)
        }
      };

    default:
      return state;
  }
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load game state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('soloLevelingGame');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        Object.keys(parsedState).forEach(key => {
          if (parsedState[key]) {
            dispatch({ type: 'UPDATE_STATS', payload: parsedState[key] });
          }
        });
      } catch (error) {
        console.error('Error loading saved game state:', error);
      }
    }
  }, []);

  // Save game state to localStorage
  useEffect(() => {
    localStorage.setItem('soloLevelingGame', JSON.stringify(state.player));
  }, [state.player]);

  const gainExperience = (amount: number) => {
    dispatch({ type: 'GAIN_EXPERIENCE', payload: amount });
  };

  const completeQuest = (quest: Quest) => {
    dispatch({ type: 'COMPLETE_QUEST', payload: quest });
  };

  const addQuest = (quest: Quest) => {
    dispatch({ type: 'ADD_QUEST', payload: quest });
  };

  const updateStats = (stats: Partial<Player>) => {
    dispatch({ type: 'UPDATE_STATS', payload: stats });
  };

  const addSkill = (skill: Skill) => {
    dispatch({ type: 'ADD_SKILL', payload: skill });
  };

  const addAchievement = (achievement: Achievement) => {
    dispatch({ type: 'ADD_ACHIEVEMENT', payload: achievement });
  };

  const clearNotification = (id: number) => {
    dispatch({ type: 'CLEAR_NOTIFICATION', payload: id });
  };

  const value = {
    state,
    gainExperience,
    completeQuest,
    addQuest,
    updateStats,
    addSkill,
    addAchievement,
    clearNotification,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}; 