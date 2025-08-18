import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Trophy, Lock, Star, Target, Zap, Crown } from 'lucide-react';
import { Achievement, AchievementCategory, CategoryItem } from '../types';

const Achievements: React.FC = () => {
  const { state } = useGame();
  const { player } = state;

  const achievements: Achievement[] = [
    {
      id: 'first_quest',
      name: 'First Steps',
      description: 'Complete your first quest',
      icon: Target,
      category: 'quests',
      unlocked: state.quests.completed.length > 0,
      progress: Math.min(state.quests.completed.length, 1),
      maxProgress: 1,
    },
    {
      id: 'quest_master',
      name: 'Quest Master',
      description: 'Complete 10 quests',
      icon: Trophy,
      category: 'quests',
      unlocked: state.quests.completed.length >= 10,
      progress: state.quests.completed.length,
      maxProgress: 10,
    },
    {
      id: 'level_5',
      name: 'Rising Star',
      description: 'Reach level 5',
      icon: Star,
      category: 'level',
      unlocked: player.level >= 5,
      progress: Math.min(player.level, 5),
      maxProgress: 5,
    },
    {
      id: 'level_10',
      name: 'Decade Warrior',
      description: 'Reach level 10',
      icon: Crown,
      category: 'level',
      unlocked: player.level >= 10,
      progress: Math.min(player.level, 10),
      maxProgress: 10,
    },
    {
      id: 'skill_learner',
      name: 'Skill Learner',
      description: 'Learn your first skill',
      icon: Zap,
      category: 'skills',
      unlocked: player.skills.length > 0,
      progress: Math.min(player.skills.length, 1),
      maxProgress: 1,
    },
    {
      id: 'skill_master',
      name: 'Skill Master',
      description: 'Learn 5 different skills',
      icon: Crown,
      category: 'skills',
      unlocked: player.skills.length >= 5,
      progress: player.skills.length,
      maxProgress: 5,
    },
    {
      id: 'streak_3',
      name: 'Consistent',
      description: 'Maintain a 3-day streak',
      icon: Target,
      category: 'streak',
      unlocked: player.dailyStreak >= 3,
      progress: Math.min(player.dailyStreak, 3),
      maxProgress: 3,
    },
    {
      id: 'streak_7',
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: Trophy,
      category: 'streak',
      unlocked: player.dailyStreak >= 7,
      progress: Math.min(player.dailyStreak, 7),
      maxProgress: 7,
    },
    {
      id: 'shadow_points_50',
      name: 'Shadow Collector',
      description: 'Earn 50 shadow points',
      icon: Crown,
      category: 'shadow',
      unlocked: player.shadowPoints >= 50,
      progress: Math.min(player.shadowPoints, 50),
      maxProgress: 50,
    },
    {
      id: 'shadow_points_100',
      name: 'Shadow Master',
      description: 'Earn 100 shadow points',
      icon: Crown,
      category: 'shadow',
      unlocked: player.shadowPoints >= 100,
      progress: Math.min(player.shadowPoints, 100),
      maxProgress: 100,
    },
  ];

  const categories: CategoryItem[] = [
    { id: 'all', name: 'All', icon: Trophy },
    { id: 'quests', name: 'Quests', icon: Target },
    { id: 'level', name: 'Level', icon: Star },
    { id: 'skills', name: 'Skills', icon: Zap },
    { id: 'streak', name: 'Streak', icon: Target },
    { id: 'shadow', name: 'Shadow', icon: Crown },
  ];

  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="shadow-card p-6 space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-fantasy font-bold glow-text">Achievements</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-gold">{unlockedCount}</div>
            <div className="text-sm text-shadow-light/60">Unlocked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{totalCount}</div>
            <div className="text-sm text-shadow-light/60">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {Math.round((unlockedCount / totalCount) * 100)}%
            </div>
            <div className="text-sm text-shadow-light/60">Complete</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id as AchievementCategory | 'all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-accent-gold to-accent-red text-shadow-dark border-accent-gold'
                  : 'bg-gradient-to-r from-shadow-gray/50 to-shadow-dark/50 text-shadow-light border-shadow-purple/30 hover:border-accent-gold/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement, index) => {
          const Icon = achievement.icon;
          const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
          
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`quest-card ${
                achievement.unlocked
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 achievement-unlocked'
                  : 'bg-gradient-to-r from-gray-500/20 to-gray-700/20 border-gray-500/30 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-accent-gold to-yellow-500'
                      : 'bg-gradient-to-r from-gray-500 to-gray-700'
                  }`}>
                    {achievement.unlocked ? (
                      <Icon className="w-5 h-5 text-shadow-dark" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-white">{achievement.name}</h3>
                </div>
                {achievement.unlocked && (
                  <Star className="w-5 h-5 text-yellow-400" />
                )}
              </div>
              
              <p className="text-shadow-light/80 text-sm mb-4">{achievement.description}</p>
              
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-shadow-light/60">Progress</span>
                  <span className={achievement.unlocked ? 'text-green-400' : 'text-shadow-light/60'}>
                    {achievement.progress} / {achievement.maxProgress}
                  </span>
                </div>
                <div className="stat-bar">
                  <motion.div
                    className={`h-full ${
                      achievement.unlocked
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                        : 'bg-gradient-to-r from-gray-500 to-gray-600'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                  />
                </div>
              </div>

              {achievement.unlocked && (
                <div className="mt-3 p-2 bg-green-500/20 rounded text-center">
                  <span className="text-green-400 text-sm font-bold">✓ Unlocked</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400 mb-2">No Achievements Found</h3>
          <p className="text-gray-500">Try selecting a different category or complete more tasks to unlock achievements.</p>
        </div>
      )}
    </motion.div>
  );
};

export default Achievements; 