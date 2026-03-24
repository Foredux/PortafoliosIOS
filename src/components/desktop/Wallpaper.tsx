import React from 'react';
import { ParticlesBackground } from './ParticlesBackground';

interface WallpaperProps {
  children: React.ReactNode;
}

export const Wallpaper: React.FC<WallpaperProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      <ParticlesBackground />
      
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>
      
      <div className="relative z-10 pt-10 pb-24 px-3 md:px-6 min-h-screen">
        {children}
      </div>
    </div>
  );
};