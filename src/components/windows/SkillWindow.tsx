import React, { useState } from 'react';
import { skills } from '../../data/personalInfo';

export const SkillWindow: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');

  const categories = [
    { id: 'all' as const, label: 'Todos', color: 'bg-gray-500' },
    { id: 'frontend' as const, label: 'Frontend', color: 'bg-blue-500' },
    { id: 'backend' as const, label: 'Backend', color: 'bg-green-500' },
    { id: 'tools' as const, label: 'Herramientas', color: 'bg-purple-500' }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <div className="space-y-4 md:space-y-5">
      <div className="flex gap-1 md:gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              px-2 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all
              ${activeCategory === cat.id 
                ? `${cat.color} text-white shadow-md` 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4">
        {filteredSkills.map((skill, index) => (
          <div key={index} className="space-y-1 md:space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm md:text-base text-gray-800 dark:text-white font-medium">{skill.name}</span>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
            </div>
            <div className="h-1.5 md:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 md:mt-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="grid grid-cols-2 gap-3 md:gap-4 text-center">
          <div>
            <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
              {skills.length}
            </div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Tecnologías</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
              {skills.filter(s => s.level >= 80).length}
            </div>
            <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Nivel Avanzado</div>
          </div>
        </div>
      </div>
    </div>
  );
};