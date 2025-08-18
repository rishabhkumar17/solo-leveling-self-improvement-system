import React, { useState } from 'react';
import { GameProvider } from './context/GameContext';
import Navigation from './components/Navigation';
import PlayerStats from './components/PlayerStats';
import QuestBoard from './components/QuestBoard';
import SkillTree from './components/SkillTree';
import Achievements from './components/Achievements';
import Journal from './components/Journal';
import Notifications from './components/Notifications';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('stats');

  const renderContent = (): JSX.Element => {
    switch (activeTab) {
      case 'stats':
        return <PlayerStats />;
      case 'quests':
        return <QuestBoard />;
      case 'skills':
        return <SkillTree />;
      case 'achievements':
        return <Achievements />;
      case 'journal':
        return <Journal />;
      case 'settings':
        return <Settings />;
      default:
        return <PlayerStats />;
    }
  };

  const Settings: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="shadow-card p-6 space-y-6"
    >
      <h2 className="text-2xl font-fantasy font-bold text-center glow-text">Settings</h2>
      
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-shadow-gray/50 to-shadow-dark/50 rounded-lg border border-shadow-purple/30">
          <h3 className="text-lg font-bold text-white mb-3">Game Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-shadow-light">Sound Effects</span>
              <button className="px-3 py-1 bg-gradient-to-r from-accent-gold to-accent-red text-shadow-dark rounded font-bold text-sm">
                ON
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-shadow-light">Dark Mode</span>
              <button className="px-3 py-1 bg-gradient-to-r from-accent-gold to-accent-red text-shadow-dark rounded font-bold text-sm">
                ON
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-shadow-light">Notifications</span>
              <button className="px-3 py-1 bg-gradient-to-r from-accent-gold to-accent-red text-shadow-dark rounded font-bold text-sm">
                ON
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-shadow-gray/50 to-shadow-dark/50 rounded-lg border border-shadow-purple/30">
          <h3 className="text-lg font-bold text-white mb-3">Data Management</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded font-bold hover:scale-105 transition-transform">
              Export Progress
            </button>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded font-bold hover:scale-105 transition-transform">
              Import Progress
            </button>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded font-bold hover:scale-105 transition-transform">
              Reset Progress
            </button>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-shadow-gray/50 to-shadow-dark/50 rounded-lg border border-shadow-purple/30">
          <h3 className="text-lg font-bold text-white mb-3">About</h3>
          <p className="text-shadow-light/80 text-sm">
            Solo Leveling - Self Improvement System v1.0.0
          </p>
          <p className="text-shadow-light/60 text-xs mt-2">
            A gamified self-improvement system inspired by Solo Leveling.
            Transform your personal growth journey into an epic adventure.
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-shadow-dark via-shadow-gray to-shadow-blue">
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Notifications />
      </div>
    </GameProvider>
  );
};

export default App; 