import React, { useState, useEffect } from 'react';
import { useWindowsStore } from '../../store/WindowsStore';
import { 
  FiUser, FiFolder, FiMail, FiCode, FiSettings, FiGithub
} from 'react-icons/fi';

interface DockItem {
  type: 'about' | 'projects' | 'contact' | 'skills' | 'settings' | 'github';
  icon: React.ReactNode;
  label: string;
  title: string;
  isExternal?: boolean;
  url?: string;
}

export const Dock: React.FC = () => {
  const { openWindow } = useWindowsStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const dockItems: DockItem[] = [
    { type: 'about', icon: <FiUser />, label: isMobile ? '' : 'Sobre', title: 'Sobre Mí' },
    { type: 'projects', icon: <FiFolder />, label: isMobile ? '' : 'Proy', title: 'Mis Proyectos' },
    { type: 'skills', icon: <FiCode />, label: isMobile ? '' : 'Skills', title: 'Tecnologías' },
    { type: 'contact', icon: <FiMail />, label: isMobile ? '' : 'Contacto', title: 'Contacto' },
    { type: 'settings', icon: <FiSettings />, label: isMobile ? '' : 'Ajus', title: 'Configuración' },
    { type: 'github', icon: <FiGithub />, label: isMobile ? '' : 'Git', title: 'GitHub', isExternal: true, url: 'https://github.com/Foredux' }
  ];

  const handleClick = (item: DockItem) => {
    if (item.isExternal && item.url) {
      window.open(item.url, '_blank');
    } else {
      openWindow(item.type as any, item.title);
    }
  };

  return (
    <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl px-2 py-1.5 flex items-center gap-1 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        {dockItems.map((item) => (
          <button
            key={item.type}
            onClick={() => handleClick(item)}
            className="flex flex-col items-center justify-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-200 hover:bg-gray-200/50 dark:hover:bg-gray-800/50 active:scale-95"
            title={item.title}
          >
            <div className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">
              {item.icon}
            </div>
            {item.label && (
              <span className="text-[9px] font-medium text-gray-600 dark:text-gray-400">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};