import React from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Heart, Zap, Shield, Brain, Users, Crown } from 'lucide-react';
import { StatItem } from '../types';

const PlayerStats: React.FC = () => {
  const { state } = useGame();
  const { player } = state;

  const experiencePercentage = (player.experience / player.experienceToNext) * 100;
  const healthPercentage = (player.health / player.maxHealth) * 100;
  const manaPercentage = (player.mana / player.maxMana) * 100;

  const stats: StatItem[] = [
    { name: 'Strength', value: player.strength, icon: Shield, color: 'text-red-400' },
    { name: 'Intelligence', value: player.intelligence, icon: Brain, color: 'text-blue-400' },
    { name: 'Agility', value: player.agility, icon: Zap, color: 'text-yellow-400' },
    { name: 'Charisma', value: player.charisma, icon: Users, color: 'text-purple-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="shadow-card p-6 space-y-6"
    >
      {/* Player Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-fantasy font-bold glow-text">{player.name}</h2>
        <div className="flex items-center justify-center gap-2">
          <span className="level-badge">Level {player.level}</span>
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full font-bold text-sm">
            Rank {player.shadowRank}
          </span>
        </div>
      </div>

      {/* Experience Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Experience</span>
          <span>{player.experience} / {player.experienceToNext}</span>
        </div>
        <div className="stat-bar">
          <motion.div
            className="stat-fill"
            initial={{ width: 0 }}
            animate={{ width: `${experiencePercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Health and Mana */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Heart className="w-4 h-4 text-red-400" />
            <span>Health</span>
            <span className="ml-auto">{player.health} / {player.maxHealth}</span>
          </div>
          <div className="stat-bar">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-red-600"
              initial={{ width: 0 }}
              animate={{ width: `${healthPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-blue-400" />
            <span>Mana</span>
            <span className="ml-auto">{player.mana} / {player.maxMana}</span>
          </div>
          <div className="stat-bar">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${manaPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gradient-to-r from-shadow-gray/50 to-shadow-dark/50 rounded-lg border border-shadow-purple/20"
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm font-medium">{stat.name}</span>
              </div>
              <span className="text-lg font-bold text-accent-gold">{stat.value}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Shadow Points */}
      <div className="text-center p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg border border-purple-500/30">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-accent-gold" />
          <span className="font-bold text-accent-gold">Shadow Points</span>
        </div>
        <span className="text-2xl font-bold text-white">{player.shadowPoints}</span>
      </div>

      {/* Daily Streak */}
      <div className="text-center p-3 bg-gradient-to-r from-orange-900/50 to-red-900/50 rounded-lg border border-orange-500/30">
        <span className="text-sm text-orange-300">Daily Streak</span>
        <div className="text-xl font-bold text-white">{player.dailyStreak} days</div>
      </div>
    </motion.div>
  );
};

export default PlayerStats; 