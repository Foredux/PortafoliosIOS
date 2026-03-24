import React, { useState, useEffect } from 'react';
import { WiFire } from 'react-icons/wi';

export const MenuBar: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const formattedTime = time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const formattedDate = time.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

  return (
    <div className="fixed top-0 left-0 right-0 h-10 bg-white/80 dark:bg-black/50 backdrop-blur-xl flex items-center justify-between px-3 md:px-6 z-50">
      <div className="flex items-center gap-1 md:gap-2">
        <WiFire className="text-xl md:text-2xl text-orange-500" />
        {!isMobile && <span className="font-semibold text-xs md:text-sm dark:text-white">Eduardo Portfolio</span>}
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-1 md:gap-3 text-xs md:text-sm dark:text-white">
          {!isMobile && <span>{formattedDate}</span>}
          <div className="flex items-center gap-0.5 md:gap-1">
            {!isMobile && <span>🔋</span>}
            <span>📶</span>
            <span>🔊</span>
          </div>
          <span className="font-medium">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};