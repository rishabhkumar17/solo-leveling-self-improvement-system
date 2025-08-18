import React from 'react';
import { motion } from 'framer-motion';
import { User, BookOpen, Target, Crown, Trophy, Settings } from 'lucide-react';
import { NavigationProps, TabItem } from '../types';

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabItem[] = [
    { id: 'stats', name: 'Character', icon: User },
    { id: 'quests', name: 'Quests', icon: Target },
    { id: 'skills', name: 'Skills', icon: Crown },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
    { id: 'journal', name: 'Journal', icon: BookOpen },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-shadow-dark/90 to-shadow-gray/90 backdrop-blur-sm border-b border-shadow-purple/30"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-accent-gold to-accent-red rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-shadow-dark" />
            </div>
            <h1 className="text-xl font-fantasy font-bold glow-text">
              Solo Leveling
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-accent-gold to-accent-red text-shadow-dark border-accent-gold'
                      : 'bg-gradient-to-r from-shadow-gray/50 to-shadow-dark/50 text-shadow-light border-shadow-purple/30 hover:border-accent-gold/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gradient-to-r from-shadow-gray/50 to-shadow-dark/50 border border-shadow-purple/30 text-shadow-light hover:text-accent-gold transition-colors"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="grid grid-cols-3 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-accent-gold to-accent-red text-shadow-dark'
                      : 'text-shadow-light hover:bg-shadow-gray/50 hover:text-accent-gold'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{tab.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation; 