import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Star, Target, Zap, Crown } from 'lucide-react';
import { questDatabase, getQuestsByCategory } from '../data/quests';
import { Quest, QuestCategory, QuestDifficulty, CategoryItem } from '../types';

const QuestBoard: React.FC = () => {
  const { state, addQuest, completeQuest, gainExperience } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<QuestCategory>('daily');
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const categories: CategoryItem[] = [
    { id: 'daily', name: 'Daily Quests', icon: Clock },
    { id: 'weekly', name: 'Weekly Quests', icon: Star },
    { id: 'achievement', name: 'Achievements', icon: Crown },
    { id: 'special', name: 'Special Quests', icon: Target },
  ];

  const getDifficultyColor = (difficulty: QuestDifficulty): string => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-orange-400';
      case 'legendary': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyBg = (difficulty: QuestDifficulty): string => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/30';
      case 'hard': return 'bg-orange-500/20 border-orange-500/30';
      case 'legendary': return 'bg-red-500/20 border-red-500/30';
      default: return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  const handleAcceptQuest = (quest: Quest): void => {
    const questWithId: Quest = {
      ...quest,
      id: `${quest.id}_${Date.now()}`,
      acceptedAt: new Date().toISOString(),
      progress: 0,
      completed: false,
    };
    addQuest(questWithId);
    setSelectedQuest(null);
  };

  const handleCompleteQuest = (quest: Quest): void => {
    completeQuest(quest);
    gainExperience(quest.experienceReward);
    setSelectedQuest(null);
  };

  const availableQuests = getQuestsByCategory(selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="shadow-card p-6 space-y-6"
    >
      <h2 className="text-2xl font-fantasy font-bold text-center glow-text">Quest Board</h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id as QuestCategory)}
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

      {/* Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="wait">
          {availableQuests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
              className={`quest-card ${getDifficultyBg(quest.difficulty)}`}
              onClick={() => setSelectedQuest(quest)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg text-white">{quest.name}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded ${getDifficultyColor(quest.difficulty)}`}>
                  {quest.difficulty.toUpperCase()}
                </span>
              </div>
              
              <p className="text-shadow-light/80 text-sm mb-4">{quest.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-accent-gold font-bold">{quest.experienceReward} XP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Crown className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 font-bold">{quest.shadowPointsReward} SP</span>
                  </div>
                </div>
                
                {quest.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-400">{quest.duration}m</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Active Quests */}
      {state.quests.active.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-center text-accent-gold">Active Quests</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {state.quests.active.map((quest) => (
              <motion.div
                key={quest.id}
                className="quest-card bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-bold text-white">{quest.name}</h4>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-shadow-light/80 text-sm mb-3">{quest.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-400">In Progress</span>
                  <button
                    onClick={() => handleCompleteQuest(quest)}
                    className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded text-sm font-bold hover:scale-105 transition-transform"
                  >
                    Complete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Quest Details Modal */}
      <AnimatePresence>
        {selectedQuest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedQuest(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`shadow-card p-6 max-w-md w-full ${getDifficultyBg(selectedQuest.difficulty)}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{selectedQuest.name}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded ${getDifficultyColor(selectedQuest.difficulty)}`}>
                  {selectedQuest.difficulty.toUpperCase()}
                </span>
              </div>
              
              <p className="text-shadow-light/80 mb-4">{selectedQuest.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Experience Reward:</span>
                  <span className="text-accent-gold font-bold">{selectedQuest.experienceReward} XP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Shadow Points:</span>
                  <span className="text-purple-400 font-bold">{selectedQuest.shadowPointsReward} SP</span>
                </div>
                {selectedQuest.duration && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Duration:</span>
                    <span className="text-blue-400">{selectedQuest.duration} minutes</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => handleAcceptQuest(selectedQuest)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-accent-gold to-accent-red text-shadow-dark rounded font-bold hover:scale-105 transition-transform"
                >
                  Accept Quest
                </button>
                <button
                  onClick={() => setSelectedQuest(null)}
                  className="px-4 py-2 bg-gradient-to-r from-shadow-gray to-shadow-dark text-shadow-light rounded border border-shadow-purple/30 hover:border-accent-gold/50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestBoard; 