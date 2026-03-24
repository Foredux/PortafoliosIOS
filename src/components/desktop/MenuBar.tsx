import React, { useState, useEffect } from 'react';
import { WiFire } from 'react-icons/wi';
import { FiBriefcase, FiCheckCircle } from 'react-icons/fi';

export const MenuBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const formattedDate = time.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short'
  });

  const handleOpenContact = () => {
    
    const event = new CustomEvent('openWindow', { detail: { type: 'contact', title: 'Contacto' } });
    window.dispatchEvent(event);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-10 bg-white/80 dark:bg-black/50 backdrop-blur-xl flex items-center justify-between px-6 z-50">
      {/* Lado izquierdo */}
      <div className="flex items-center gap-3">
        <WiFire className="text-2xl text-orange-500" />
        <span className="font-semibold text-sm dark:text-white">Eduardo Rodríguez</span>
        
       
        <button
          onClick={handleOpenContact}
          className="ml-3 flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 hover:bg-green-500/30 rounded-full transition-all duration-200 border border-green-500/30 cursor-pointer"
        >
          <FiCheckCircle className="w-3.5 h-3.5 text-green-500" />
          <span className="text-xs font-medium text-green-600 dark:text-green-400">Disponible</span>
          <FiBriefcase className="w-3 h-3 text-green-500 ml-0.5" />
        </button>
      </div>
      
      {/* Lado derecho */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 text-sm dark:text-white">
          <span>{formattedDate}</span>
          <div className="flex items-center gap-1">
            <span>🔋 98%</span>
            <span>📶</span>
            <span>🔊</span>
          </div>
          <span className="font-medium">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};