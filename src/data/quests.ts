import { Quest, QuestCategory, QuestDifficulty, QuestType } from '../types';

export const questDatabase: Quest[] = [
  // Daily Quests
  {
    id: 'daily_meditation',
    name: 'Shadow Meditation',
    description: 'Practice mindfulness for 10 minutes',
    category: 'daily' as QuestCategory,
    difficulty: 'easy' as QuestDifficulty,
    experienceReward: 25,
    shadowPointsReward: 5,
    requirements: [],
    type: 'meditation' as QuestType,
    duration: 10, // minutes
  },
  {
    id: 'daily_exercise',
    name: 'Physical Training',
    description: 'Complete 30 minutes of workout',
    category: 'daily' as QuestCategory,
    difficulty: 'medium' as QuestDifficulty,
    experienceReward: 50,
    shadowPointsReward: 10,
    requirements: [],
    type: 'exercise' as QuestType,
    duration: 30,
  },
  {
    id: 'daily_reading',
    name: 'Knowledge Absorption',
    description: 'Read for 20 minutes',
    category: 'daily' as QuestCategory,
    difficulty: 'easy' as QuestDifficulty,
    experienceReward: 30,
    shadowPointsReward: 8,
    requirements: [],
    type: 'learning' as QuestType,
    duration: 20,
  },
  {
    id: 'daily_water',
    name: 'Hydration Ritual',
    description: 'Drink 8 glasses of water',
    category: 'daily' as QuestCategory,
    difficulty: 'easy' as QuestDifficulty,
    experienceReward: 20,
    shadowPointsReward: 3,
    requirements: [],
    type: 'health' as QuestType,
    target: 8,
  },

  // Weekly Quests
  {
    id: 'weekly_skill',
    name: 'Skill Mastery',
    description: 'Practice a new skill for 5 hours this week',
    category: 'weekly' as QuestCategory,
    difficulty: 'hard' as QuestDifficulty,
    experienceReward: 200,
    shadowPointsReward: 50,
    requirements: [],
    type: 'learning' as QuestType,
    duration: 300, // 5 hours in minutes
  },
  {
    id: 'weekly_social',
    name: 'Social Connection',
    description: 'Have meaningful conversations with 3 different people',
    category: 'weekly' as QuestCategory,
    difficulty: 'medium' as QuestDifficulty,
    experienceReward: 100,
    shadowPointsReward: 25,
    requirements: [],
    type: 'social' as QuestType,
    target: 3,
  },
  {
    id: 'weekly_creativity',
    name: 'Creative Expression',
    description: 'Create something new (art, writing, music, etc.)',
    category: 'weekly' as QuestCategory,
    difficulty: 'medium' as QuestDifficulty,
    experienceReward: 150,
    shadowPointsReward: 30,
    requirements: [],
    type: 'creativity' as QuestType,
  },

  // Achievement Quests
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak of daily quests',
    category: 'achievement' as QuestCategory,
    difficulty: 'hard' as QuestDifficulty,
    experienceReward: 500,
    shadowPointsReward: 100,
    requirements: ['daily_streak_7'],
    type: 'streak' as QuestType,
    target: 7,
  },
  {
    id: 'streak_30',
    name: 'Month Master',
    description: 'Maintain a 30-day streak of daily quests',
    category: 'achievement' as QuestCategory,
    difficulty: 'legendary' as QuestDifficulty,
    experienceReward: 2000,
    shadowPointsReward: 500,
    requirements: ['daily_streak_30'],
    type: 'streak' as QuestType,
    target: 30,
  },
  {
    id: 'level_10',
    name: 'Decade Warrior',
    description: 'Reach level 10',
    category: 'achievement' as QuestCategory,
    difficulty: 'medium' as QuestDifficulty,
    experienceReward: 1000,
    shadowPointsReward: 200,
    requirements: ['level_10'],
    type: 'level' as QuestType,
    target: 10,
  },
  {
    id: 'level_50',
    name: 'Half-Century Hero',
    description: 'Reach level 50',
    category: 'achievement' as QuestCategory,
    difficulty: 'legendary' as QuestDifficulty,
    experienceReward: 5000,
    shadowPointsReward: 1000,
    requirements: ['level_50'],
    type: 'level' as QuestType,
    target: 50,
  },

  // Special Quests
  {
    id: 'shadow_rank_up',
    name: 'Rank Advancement',
    description: 'Advance your shadow rank',
    category: 'special' as QuestCategory,
    difficulty: 'hard' as QuestDifficulty,
    experienceReward: 300,
    shadowPointsReward: 75,
    requirements: ['shadow_points_100'],
    type: 'rank' as QuestType,
  },
  {
    id: 'skill_combo',
    name: 'Skill Combination',
    description: 'Learn 5 different skills',
    category: 'special' as QuestCategory,
    difficulty: 'hard' as QuestDifficulty,
    experienceReward: 400,
    shadowPointsReward: 80,
    requirements: ['skills_5'],
    type: 'skills' as QuestType,
    target: 5,
  },
];

export const getQuestsByCategory = (category: QuestCategory): Quest[] => {
  return questDatabase.filter(quest => quest.category === category);
};

export const getQuestsByDifficulty = (difficulty: QuestDifficulty): Quest[] => {
  return questDatabase.filter(quest => quest.difficulty === difficulty);
};

export const getRandomDailyQuest = (): Quest => {
  const dailyQuests = getQuestsByCategory('daily');
  return dailyQuests[Math.floor(Math.random() * dailyQuests.length)];
};

export const getAvailableQuests = (playerLevel: number, playerSkills: any[]): Quest[] => {
  return questDatabase.filter(quest => {
    // Check level requirements
    if (quest.requirements.includes('level_10') && playerLevel < 10) return false;
    if (quest.requirements.includes('level_50') && playerLevel < 50) return false;
    
    // Check skill requirements
    if (quest.requirements.includes('skills_5') && playerSkills.length < 5) return false;
    
    return true;
  });
}; 