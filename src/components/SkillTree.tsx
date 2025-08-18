import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Brain, Users, Crown, Lock, Star } from 'lucide-react';
import { skillsDatabase, getSkillsByCategory, getAvailableSkills } from '../data/skills';
import { Skill, SkillCategory, CategoryItem } from '../types';

const SkillTree: React.FC = () => {
  const { state, addSkill, updateStats } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('physical');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const categories: CategoryItem[] = [
    { id: 'physical', name: 'Physical', icon: Shield, color: 'text-red-400' },
    { id: 'mental', name: 'Mental', icon: Brain, color: 'text-blue-400' },
    { id: 'social', name: 'Social', icon: Users, color: 'text-purple-400' },
    { id: 'shadow', name: 'Shadow', icon: Crown, color: 'text-purple-600' },
  ];

  const availableSkills = getAvailableSkills(
    state.player.level,
    {
      strength: state.player.strength,
      agility: state.player.agility,
      intelligence: state.player.intelligence,
      charisma: state.player.charisma,
    },
    state.player.shadowPoints,
    state.player.shadowRank
  );

  const categorySkills = getSkillsByCategory(selectedCategory);

  const handleLearnSkill = (skill: Skill): void => {
    const skillWithProgress: Skill = {
      ...skill,
      learnedAt: new Date().toISOString(),
      experience: 0,
    };
    addSkill(skillWithProgress);
    
    // Apply skill effects to player stats
    const effects = skill.effects;
    const statUpdates: Partial<typeof state.player> = {};
    Object.keys(effects).forEach(key => {
      if (key in state.player) {
        (statUpdates as any)[key] = (state.player as any)[key] + effects[key];
      }
    });
    updateStats(statUpdates);
    
    setSelectedSkill(null);
  };

  const canLearnSkill = (skill: Skill): boolean => {
    return availableSkills.some(available => available.id === skill.id);
  };

  const getSkillStatus = (skill: Skill): 'learned' | 'available' | 'locked' => {
    if (state.player.skills.some(s => s.id === skill.id)) {
      return 'learned';
    } else if (canLearnSkill(skill)) {
      return 'available';
    } else {
      return 'locked';
    }
  };

  const getSkillCardStyle = (skill: Skill): string => {
    const status = getSkillStatus(skill);
    switch (status) {
      case 'learned':
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'available':
        return 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/30';
      case 'locked':
        return 'bg-gradient-to-r from-gray-500/20 to-gray-700/20 border-gray-500/30 opacity-50';
      default:
        return 'bg-gradient-to-r from-shadow-gray/50 to-shadow-dark/50 border-shadow-purple/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="shadow-card p-6 space-y-6"
    >
      <h2 className="text-2xl font-fantasy font-bold text-center glow-text">Skill Tree</h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id as SkillCategory)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-accent-gold to-accent-red text-shadow-dark border-accent-gold'
                  : 'bg-gradient-to-r from-shadow-gray/50 to-shadow-dark/50 text-shadow-light border-shadow-purple/30 hover:border-accent-gold/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${category.color}`} />
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="wait">
          {categorySkills.map((skill, index) => {
            const status = getSkillStatus(skill);
            const isLearned = status === 'learned';
            const isAvailable = status === 'available';
            
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                className={`quest-card ${getSkillCardStyle(skill)} ${isAvailable ? 'cursor-pointer' : ''}`}
                onClick={() => isAvailable && setSelectedSkill(skill)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="skill-icon">
                      <span className="text-lg">{skill.icon}</span>
                    </div>
                    <h3 className="font-bold text-lg text-white">{skill.name}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    {isLearned && <Star className="w-4 h-4 text-yellow-400" />}
                    {!isLearned && !isAvailable && <Lock className="w-4 h-4 text-gray-400" />}
                    <span className="text-xs font-bold px-2 py-1 rounded bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      Lv.{skill.level}
                    </span>
                  </div>
                </div>
                
                <p className="text-shadow-light/80 text-sm mb-4">{skill.description}</p>
                
                <div className="space-y-2">
                  <div className="text-xs text-shadow-light/60">
                    <span className="font-bold">Effects:</span>
                    {Object.entries(skill.effects).map(([key, value]) => (
                      <span key={key} className="ml-2 text-accent-gold">
                        +{value} {key}
                      </span>
                    ))}
                  </div>
                  
                  {skill.requirements && (
                    <div className="text-xs text-shadow-light/60">
                      <span className="font-bold">Requirements:</span>
                      {Object.entries(skill.requirements).map(([key, value]) => (
                        <span key={key} className="ml-2 text-blue-400">
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {isLearned && (
                  <div className="mt-3 p-2 bg-green-500/20 rounded text-center">
                    <span className="text-green-400 text-sm font-bold">✓ Learned</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Learned Skills Summary */}
      {state.player.skills.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-center text-accent-gold">Learned Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {state.player.skills.map((skill) => (
              <div
                key={skill.id}
                className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="skill-icon">
                    <span className="text-sm">{skill.icon}</span>
                  </div>
                  <span className="font-bold text-white">{skill.name}</span>
                </div>
                <div className="text-xs text-green-400">
                  Level {skill.level} • {skill.experience} / {skill.experienceToNext} XP
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skill Details Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="shadow-card p-6 max-w-md w-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="skill-icon">
                  <span className="text-2xl">{selectedSkill.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedSkill.name}</h3>
                  <span className="text-sm text-blue-400">Level {selectedSkill.level}</span>
                </div>
              </div>
              
              <p className="text-shadow-light/80 mb-4">{selectedSkill.description}</p>
              
              <div className="space-y-3 mb-6">
                <div>
                  <span className="text-sm font-bold text-accent-gold">Effects:</span>
                  <div className="mt-1 space-y-1">
                    {Object.entries(selectedSkill.effects).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-shadow-light/80">{key}:</span>
                        <span className="text-accent-gold font-bold">+{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {selectedSkill.requirements && (
                  <div>
                    <span className="text-sm font-bold text-blue-400">Requirements:</span>
                    <div className="mt-1 space-y-1">
                      {Object.entries(selectedSkill.requirements).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-shadow-light/80">{key}:</span>
                          <span className="text-blue-400">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => handleLearnSkill(selectedSkill)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-accent-gold to-accent-red text-shadow-dark rounded font-bold hover:scale-105 transition-transform"
                >
                  Learn Skill
                </button>
                <button
                  onClick={() => setSelectedSkill(null)}
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

export default SkillTree; 