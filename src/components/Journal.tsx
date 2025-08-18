import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Edit, Trash2, Calendar, Target, Star } from 'lucide-react';
import { JournalEntry, Goal, CategoryItem } from '../types';

const Journal: React.FC = () => {
  const { state } = useGame();
  const [activeTab, setActiveTab] = useState<string>('progress');
  const [newEntry, setNewEntry] = useState<string>('');
  const [isAddingEntry, setIsAddingEntry] = useState<boolean>(false);

  const tabs: CategoryItem[] = [
    { id: 'progress', name: 'Progress Log', icon: Target },
    { id: 'reflections', name: 'Reflections', icon: BookOpen },
    { id: 'goals', name: 'Goals', icon: Star },
  ];

  const progressEntries: JournalEntry[] = [
    {
      id: 1,
      date: new Date().toISOString(),
      type: 'level_up',
      title: 'Level Up!',
      content: `Reached level ${state.player.level}! Your journey continues...`,
      stats: {
        level: state.player.level,
        experience: state.player.experience,
        shadowPoints: state.player.shadowPoints,
      }
    },
    {
      id: 2,
      date: new Date(Date.now() - 86400000).toISOString(),
      type: 'quest_complete',
      title: 'Quest Completed',
      content: 'Completed "Shadow Meditation" - feeling more focused and centered.',
      stats: {
        questsCompleted: state.quests.completed.length,
        dailyStreak: state.player.dailyStreak,
      }
    },
  ];

  const reflectionEntries: JournalEntry[] = [
    {
      id: 1,
      date: new Date().toISOString(),
      title: 'Today\'s Reflection',
      content: 'Today I focused on improving my mental clarity through meditation. The shadow points system really motivates me to stay consistent with my practice.',
      mood: 'focused',
      tags: ['meditation', 'mental-health', 'consistency']
    },
    {
      id: 2,
      date: new Date(Date.now() - 86400000).toISOString(),
      title: 'Skill Learning Progress',
      content: 'Started learning the "Focus Mastery" skill. It\'s amazing how the gamification makes learning new habits feel exciting rather than daunting.',
      mood: 'excited',
      tags: ['skills', 'learning', 'gamification']
    },
  ];

  const goals: Goal[] = [
    {
      id: 1,
      title: 'Reach Level 10',
      description: 'Continue the journey to become a stronger version of myself',
      progress: Math.min((state.player.level / 10) * 100, 100),
      target: 10,
      current: state.player.level,
      category: 'level',
      completed: state.player.level >= 10,
    },
    {
      id: 2,
      title: 'Learn 5 Skills',
      description: 'Master various abilities across different categories',
      progress: Math.min((state.player.skills.length / 5) * 100, 100),
      target: 5,
      current: state.player.skills.length,
      category: 'skills',
      completed: state.player.skills.length >= 5,
    },
    {
      id: 3,
      title: '7-Day Streak',
      description: 'Maintain consistency for a full week',
      progress: Math.min((state.player.dailyStreak / 7) * 100, 100),
      target: 7,
      current: state.player.dailyStreak,
      category: 'streak',
      completed: state.player.dailyStreak >= 7,
    },
  ];

  const handleAddEntry = (): void => {
    if (newEntry.trim()) {
      // In a real app, this would save to the game state
      setNewEntry('');
      setIsAddingEntry(false);
    }
  };

  const getMoodColor = (mood: string): string => {
    switch (mood) {
      case 'excited': return 'text-yellow-400';
      case 'focused': return 'text-blue-400';
      case 'calm': return 'text-green-400';
      case 'motivated': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const renderProgressLog = (): JSX.Element => (
    <div className="space-y-4">
      {progressEntries.map((entry) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="shadow-card p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-shadow-light/60">
                {new Date(entry.date).toLocaleDateString()}
              </span>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-gradient-to-r from-accent-gold to-accent-red text-shadow-dark font-bold">
              {entry.type?.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          
          <h3 className="font-bold text-lg text-white mb-2">{entry.title}</h3>
          <p className="text-shadow-light/80 mb-3">{entry.content}</p>
          
          {entry.stats && (
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(entry.stats).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-shadow-light/60">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                  <span className="text-accent-gold font-bold">{value}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  const renderReflections = (): JSX.Element => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Your Reflections</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddingEntry(true)}
          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-accent-gold to-accent-red text-shadow-dark rounded font-bold text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Entry
        </motion.button>
      </div>

      {reflectionEntries.map((entry) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="shadow-card p-4"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-shadow-light/60">
                {new Date(entry.date).toLocaleDateString()}
              </span>
            </div>
            <span className={`text-sm font-medium ${getMoodColor(entry.mood || '')}`}>
              {entry.mood}
            </span>
          </div>
          
          <h3 className="font-bold text-lg text-white mb-2">{entry.title}</h3>
          <p className="text-shadow-light/80 mb-3">{entry.content}</p>
          
          <div className="flex flex-wrap gap-1">
            {entry.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded text-purple-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderGoals = (): JSX.Element => (
    <div className="space-y-4">
      {goals.map((goal) => (
        <motion.div
          key={goal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`shadow-card p-4 ${
            goal.completed ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30' : ''
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-lg text-white">{goal.title}</h3>
            {goal.completed && (
              <span className="text-green-400 text-sm font-bold">✓ Completed</span>
            )}
          </div>
          
          <p className="text-shadow-light/80 mb-3">{goal.description}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-shadow-light/60">Progress</span>
              <span className="text-accent-gold font-bold">
                {goal.current} / {goal.target}
              </span>
            </div>
            <div className="stat-bar">
              <motion.div
                className={`h-full ${
                  goal.completed
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                    : 'bg-gradient-to-r from-accent-gold to-accent-red'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="shadow-card p-6 space-y-6"
    >
      <h2 className="text-2xl font-fantasy font-bold text-center glow-text">Journal</h2>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-accent-gold to-accent-red text-shadow-dark border-accent-gold'
                  : 'bg-gradient-to-r from-shadow-gray/50 to-shadow-dark/50 text-shadow-light border-shadow-purple/30 hover:border-accent-gold/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'progress' && renderProgressLog()}
        {activeTab === 'reflections' && renderReflections()}
        {activeTab === 'goals' && renderGoals()}
      </div>

      {/* Add Entry Modal */}
      <AnimatePresence>
        {isAddingEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsAddingEntry(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="shadow-card p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Add Reflection</h3>
              <textarea
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder="Write your thoughts, reflections, or progress notes..."
                className="w-full h-32 p-3 bg-gradient-to-r from-shadow-gray/50 to-shadow-dark/50 border border-shadow-purple/30 rounded text-shadow-light placeholder-shadow-light/50 resize-none"
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleAddEntry}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-accent-gold to-accent-red text-shadow-dark rounded font-bold hover:scale-105 transition-transform"
                >
                  Save Entry
                </button>
                <button
                  onClick={() => setIsAddingEntry(false)}
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

export default Journal; 