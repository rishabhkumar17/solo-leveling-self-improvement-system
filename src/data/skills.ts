import { Skill, SkillCategory, SkillType, SkillEffects, SkillRequirements, ShadowRank } from '../types';

export const skillsDatabase: Skill[] = [
  // Physical Skills
  {
    id: 'shadow_step',
    name: 'Shadow Step',
    description: 'Move silently and quickly between shadows',
    category: 'physical' as SkillCategory,
    type: 'movement' as SkillType,
    level: 1,
    maxLevel: 10,
    experience: 0,
    experienceToNext: 100,
    effects: {
      agility: 2,
      stealth: 1,
    },
    requirements: {
      level: 1,
      agility: 5,
    },
    icon: '👤',
    color: 'from-purple-500 to-blue-500',
  },
  {
    id: 'iron_body',
    name: 'Iron Body',
    description: 'Strengthen your physical resilience',
    category: 'physical' as SkillCategory,
    type: 'defense' as SkillType,
    level: 1,
    maxLevel: 10,
    experience: 0,
    experienceToNext: 150,
    effects: {
      strength: 3,
      health: 10,
    },
    requirements: {
      level: 2,
      strength: 8,
    },
    icon: '🛡️',
    color: 'from-gray-500 to-gray-700',
  },
  {
    id: 'lightning_reflexes',
    name: 'Lightning Reflexes',
    description: 'Enhance your reaction speed and agility',
    category: 'physical' as SkillCategory,
    type: 'speed' as SkillType,
    level: 1,
    maxLevel: 10,
    experience: 0,
    experienceToNext: 120,
    effects: {
      agility: 3,
      reaction: 2,
    },
    requirements: {
      level: 3,
      agility: 10,
    },
    icon: '⚡',
    color: 'from-yellow-400 to-orange-500',
  },

  // Mental Skills
  {
    id: 'mind_reading',
    name: 'Mind Reading',
    description: 'Sense the thoughts and emotions of others',
    category: 'mental' as SkillCategory,
    type: 'psychic' as SkillType,
    level: 1,
    maxLevel: 10,
    experience: 0,
    experienceToNext: 200,
    effects: {
      intelligence: 3,
      charisma: 2,
    },
    requirements: {
      level: 5,
      intelligence: 15,
    },
    icon: '🧠',
    color: 'from-pink-400 to-purple-600',
  },
  {
    id: 'memory_palace',
    name: 'Memory Palace',
    description: 'Create a mental space for perfect recall',
    category: 'mental' as SkillCategory,
    type: 'memory' as SkillType,
    level: 1,
    maxLevel: 10,
    experience: 0,
    experienceToNext: 180,
    effects: {
      intelligence: 4,
      learning: 3,
    },
    requirements: {
      level: 4,
      intelligence: 12,
    },
    icon: '🏛️',
    color: 'from-blue-400 to-indigo-600',
  },
  {
    id: 'focus_mastery',
    name: 'Focus Mastery',
    description: 'Achieve deep concentration and mental clarity',
    category: 'mental' as SkillCategory,
    type: 'concentration' as SkillType,
    level: 1,
    maxLevel: 10,
    experience: 0,
    experienceToNext: 160,
    effects: {
      intelligence: 2,
      productivity: 3,
    },
    requirements: {
      level: 2,
      intelligence: 8,
    },
    icon: '🎯',
    color: 'from-green-400 to-emerald-600',
  },

  // Social Skills
  {
    id: 'charisma_aura',
    name: 'Charisma Aura',
    description: 'Project an irresistible charm and presence',
    category: 'social' as SkillCategory,
    type: 'influence' as SkillType,
    level: 1,
    maxLevel: 10,
    experience: 0,
    experienceToNext: 175,
    effects: {
      charisma: 4,
      persuasion: 2,
    },
    requirements: {
      level: 3,
      charisma: 10,
    },
    icon: '✨',
    color: 'from-yellow-300 to-amber-500',
  },
  {
    id: 'empathy_link',
    name: 'Empathy Link',
    description: 'Connect deeply with others\' emotions',
    category: 'social' as SkillCategory,
    type: 'emotional' as SkillType,
    level: 1,
    maxLevel: 10,
    experience: 0,
    experienceToNext: 190,
    effects: {
      charisma: 3,
      empathy: 3,
    },
    requirements: {
      level: 4,
      charisma: 12,
    },
    icon: '💝',
    color: 'from-pink-300 to-rose-500',
  },
  {
    id: 'leadership_magnetism',
    name: 'Leadership Magnetism',
    description: 'Inspire and lead others naturally',
    category: 'social' as SkillCategory,
    type: 'leadership' as SkillType,
    level: 1,
    maxLevel: 10,
    experience: 0,
    experienceToNext: 250,
    effects: {
      charisma: 5,
      leadership: 3,
    },
    requirements: {
      level: 6,
      charisma: 18,
    },
    icon: '👑',
    color: 'from-yellow-500 to-orange-600',
  },

  // Shadow Skills
  {
    id: 'shadow_manipulation',
    name: 'Shadow Manipulation',
    description: 'Control and shape shadows at will',
    category: 'shadow' as SkillCategory,
    type: 'elemental' as SkillType,
    level: 1,
    maxLevel: 10,
    experience: 0,
    experienceToNext: 300,
    effects: {
      shadowPower: 5,
      intelligence: 2,
    },
    requirements: {
      level: 8,
      shadowPoints: 50,
    },
    icon: '🌑',
    color: 'from-gray-800 to-black',
  },
  {
    id: 'shadow_portal',
    name: 'Shadow Portal',
    description: 'Create portals through shadow dimensions',
    category: 'shadow' as SkillCategory,
    type: 'teleportation' as SkillType,
    level: 1,
    maxLevel: 10,
    experience: 0,
    experienceToNext: 400,
    effects: {
      shadowPower: 8,
      mobility: 5,
    },
    requirements: {
      level: 10,
      shadowPoints: 100,
      shadowRank: 'C',
    },
    icon: '🌀',
    color: 'from-purple-800 to-indigo-900',
  },
  {
    id: 'shadow_army',
    name: 'Shadow Army',
    description: 'Summon and command shadow soldiers',
    category: 'shadow' as SkillCategory,
    type: 'summoning' as SkillType,
    level: 1,
    maxLevel: 10,
    experience: 0,
    experienceToNext: 500,
    effects: {
      shadowPower: 10,
      leadership: 5,
    },
    requirements: {
      level: 15,
      shadowPoints: 200,
      shadowRank: 'B',
    },
    icon: '👥',
    color: 'from-gray-900 to-black',
  },
];

export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return skillsDatabase.filter(skill => skill.category === category);
};

interface PlayerStats {
  strength: number;
  agility: number;
  intelligence: number;
  charisma: number;
}

export const getAvailableSkills = (
  playerLevel: number, 
  playerStats: PlayerStats, 
  shadowPoints: number, 
  shadowRank: ShadowRank
): Skill[] => {
  return skillsDatabase.filter(skill => {
    const reqs = skill.requirements;
    
    if (reqs.level && playerLevel < reqs.level) return false;
    if (reqs.strength && playerStats.strength < reqs.strength) return false;
    if (reqs.agility && playerStats.agility < reqs.agility) return false;
    if (reqs.intelligence && playerStats.intelligence < reqs.intelligence) return false;
    if (reqs.charisma && playerStats.charisma < reqs.charisma) return false;
    if (reqs.shadowPoints && shadowPoints < reqs.shadowPoints) return false;
    if (reqs.shadowRank && shadowRank < reqs.shadowRank) return false;
    
    return true;
  });
};

export const getSkillById = (id: string): Skill | undefined => {
  return skillsDatabase.find(skill => skill.id === id);
};

export const calculateSkillEffects = (skill: Skill, level: number): SkillEffects => {
  const effects: SkillEffects = {};
  Object.keys(skill.effects).forEach(key => {
    effects[key] = skill.effects[key] * level;
  });
  return effects;
}; 