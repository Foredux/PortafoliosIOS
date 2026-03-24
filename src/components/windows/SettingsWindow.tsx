import React, { useState, useEffect } from 'react';
import { FiMoon, FiSun, FiMonitor } from 'react-icons/fi';

export const SettingsWindow: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [notifications, setNotifications] = useState(true);
  const [animations, setAnimations] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const isDark = newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="space-y-4 md:space-y-5">
      <div className="space-y-2 md:space-y-3">
        <h3 className="font-semibold text-gray-800 dark:text-white text-sm md:text-base">Apariencia</h3>
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          <button onClick={() => handleThemeChange('light')} className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg border transition-all ${theme === 'light' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
            <FiSun className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
            <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Claro</span>
          </button>
          <button onClick={() => handleThemeChange('dark')} className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg border transition-all ${theme === 'dark' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
            <FiMoon className="w-4 h-4 md:w-5 md:h-5 text-indigo-500" />
            <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Oscuro</span>
          </button>
          <button onClick={() => handleThemeChange('system')} className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 rounded-lg border transition-all ${theme === 'system' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
            <FiMonitor className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
            <span className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Sistema</span>
          </button>
        </div>
      </div>

      <div className="space-y-2 md:space-y-3 border-t border-gray-200 dark:border-gray-700 pt-3 md:pt-4">
        <h3 className="font-semibold text-gray-800 dark:text-white text-sm md:text-base">Preferencias</h3>
        <div className="flex items-center justify-between py-1 md:py-2">
          <div>
            <p className="text-sm md:text-base text-gray-800 dark:text-white">Notificaciones</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Recibir alertas y actualizaciones</p>
          </div>
          <button onClick={() => setNotifications(!notifications)} className={`w-9 md:w-11 h-5 md:h-6 rounded-full transition-colors ${notifications ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
            <div className={`w-4 md:w-5 h-4 md:h-5 rounded-full bg-white transform transition-transform ${notifications ? 'translate-x-4 md:translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between py-1 md:py-2">
          <div>
            <p className="text-sm md:text-base text-gray-800 dark:text-white">Animaciones</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Efectos visuales y transiciones</p>
          </div>
          <button onClick={() => setAnimations(!animations)} className={`w-9 md:w-11 h-5 md:h-6 rounded-full transition-colors ${animations ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700'}`}>
            <div className={`w-4 md:w-5 h-4 md:h-5 rounded-full bg-white transform transition-transform ${animations ? 'translate-x-4 md:translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 md:pt-4 text-center text-xs md:text-sm text-gray-500 dark:text-gray-400">
        <p>iOS Portfolio v1.0.0</p>
        <p className="mt-0.5 md:mt-1">Hecho con React + TypeScript</p>
      </div>
    </div>
  );
};