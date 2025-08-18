import React from 'react';
import { useGame } from '../context/GameContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Zap, Crown, CheckCircle } from 'lucide-react';
import { NotificationType } from '../types';

const Notifications: React.FC = () => {
  const { state, clearNotification } = useGame();
  const { notifications } = state.system;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'level_up':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'achievement':
        return <Star className="w-5 h-5 text-accent-gold" />;
      case 'quest_complete':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'skill_learned':
        return <Crown className="w-5 h-5 text-purple-400" />;
      default:
        return <Zap className="w-5 h-5 text-blue-400" />;
    }
  };

  const getNotificationStyle = (type: NotificationType): string => {
    switch (type) {
      case 'level_up':
        return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'achievement':
        return 'bg-gradient-to-r from-accent-gold/20 to-yellow-500/20 border-accent-gold/30';
      case 'quest_complete':
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'skill_learned':
        return 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-purple-500/30';
      default:
        return 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/30';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`shadow-card p-4 ${getNotificationStyle(notification.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">
                  {notification.message}
                </p>
                <p className="text-xs text-shadow-light/60 mt-1">
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </p>
              </div>
              
              <button
                onClick={() => clearNotification(notification.id)}
                className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4 text-shadow-light/60" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notifications; 