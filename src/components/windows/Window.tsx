import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { FiX, FiMinus, FiMaximize2 } from 'react-icons/fi';
import { useWindowsStore } from '../../store/WindowsStore';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  initialPosition: { x: number; y: number };
  zIndex: number;
  onFocus: () => void;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  initialPosition,
  zIndex,
  onFocus
}) => {
  const { closeWindow, minimizeWindow, updatePosition } = useWindowsStore();
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const x = useMotionValue(initialPosition.x);
  const y = useMotionValue(initialPosition.y);
  
  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    x.set(initialPosition.x);
    y.set(initialPosition.y);
  }, [initialPosition.x, initialPosition.y, x, y]);

  // Manejador para arrastrar solo desde el header
  const handleDragStart = () => {
    setIsDragging(true);
    onFocus();
  };

  const handleDragEnd = () => { 
    setIsDragging(false);
    const newX = x.get();
    const newY = y.get();
    
    const windowWidth = windowRef.current?.offsetWidth || 300;
    // const windowHeight = windowRef.current?.offsetHeight || 400;
    const maxX = window.innerWidth - windowWidth;
    const maxY = window.innerHeight - 80;
    
    const clampedX = Math.max(0, Math.min(newX, maxX));
    const clampedY = Math.max(40, Math.min(newY, maxY));
    
    if (clampedX !== newX || clampedY !== newY) {
      x.set(clampedX);
      y.set(clampedY);
    }
    
    updatePosition(id, { x: clampedX, y: clampedY });
  };

  // Manejador táctil solo para el header en móvil
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMaximized) return;
    e.stopPropagation();
    
    const touch = e.touches[0];
    const startX = touch.clientX - x.get();
    const startY = touch.clientY - y.get();
    
    let lastX = x.get();
    let lastY = y.get();
    
    const onTouchMove = (moveEvent: TouchEvent) => {
      moveEvent.preventDefault();
      const newX = moveEvent.touches[0].clientX - startX;
      const newY = moveEvent.touches[0].clientY - startY;
      
      const maxX = window.innerWidth - (windowRef.current?.offsetWidth || 300);
      const maxY = window.innerHeight - 80;
      
      lastX = Math.max(0, Math.min(newX, maxX));
      lastY = Math.max(40, Math.min(newY, maxY));
      
      x.set(lastX);
      y.set(lastY);
    };
    
    const onTouchEnd = () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      updatePosition(id, { x: lastX, y: lastY });
    };
    
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
  };

  const handleClose = () => closeWindow(id);
  const handleMinimize = () => minimizeWindow(id);
  const handleMaximize = () => {
    if (isMaximized) {
      setIsMaximized(false);
    } else {
      setIsMaximized(true);
    }
  };

  const getWindowSize = () => {
    if (isMaximized) {
      return {
        width: '100%',
        height: 'calc(100% - 80px)',
        borderRadius: '0px',
      };
    }
    if (isMobile) {
      return {
        width: 'calc(100% - 32px)',
        maxWidth: 'calc(100% - 32px)',
        height: 'auto',
        maxHeight: '70vh',
        borderRadius: '16px',
      };
    }
    return {
      width: '480px',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '80vh',
      borderRadius: '16px',
    };
  };

  const windowSize = getWindowSize();

  return (
    <motion.div
      ref={windowRef}
      drag={!isMaximized && !isMobile ? true : false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        left: 0,
        top: 40,
        right: window.innerWidth - (windowRef.current?.offsetWidth || 300),
        bottom: window.innerHeight - 80
      }}
      dragListener={!isMaximized && !isMobile}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      dragControls={undefined}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      style={{ 
        x: !isMaximized ? x : 0,
        y: !isMaximized ? y : 40,
        zIndex,
        position: 'fixed',
        width: windowSize.width,
        maxWidth: windowSize.maxWidth,
      }}
      animate={{
        width: windowSize.width,
        height: windowSize.height,
        borderRadius: windowSize.borderRadius,
      }}
      transition={{ duration: 0.2 }}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
    >
      <div 
        className={`
          bg-white dark:bg-gray-900 shadow-2xl overflow-hidden
          border border-gray-200 dark:border-gray-700
          ${isMaximized ? 'rounded-none' : 'rounded-xl'}
          ${isDragging ? 'shadow-2xl' : 'shadow-xl'}
        `}
        style={{
          width: '100%',
          height: '100%',
          maxHeight: windowSize.maxHeight,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header arrastrable - SOLO AQUÍ se puede arrastrar */}
        <div 
          ref={headerRef}
          className="window-header flex items-center px-3 md:px-4 py-2.5 md:py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0"
          style={{ 
            cursor: isMaximized ? 'default' : (isMobile ? 'grab' : 'grab'),
            touchAction: isMobile ? 'none' : 'auto'
          }}
          onMouseDown={!isMaximized && !isMobile ? undefined : undefined}
          onTouchStart={!isMaximized && isMobile ? handleTouchStart : undefined}
        >
          {/* Botones estilo macOS */}
          <div className="flex items-center gap-1.5 md:gap-2 mr-3 md:mr-4">
            <button
              onClick={handleClose}
              className="group relative w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center z-10"
              aria-label="Cerrar"
            >
              <FiX className="w-1.5 h-1.5 md:w-2 md:h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={handleMinimize}
              className="group relative w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center z-10"
              aria-label="Minimizar"
            >
              <FiMinus className="w-1.5 h-1.5 md:w-2 md:h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={handleMaximize}
              className="group relative w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center z-10"
              aria-label="Maximizar"
            >
              <FiMaximize2 className="w-1.5 h-1.5 md:w-2 md:h-2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
          
          {/* Título */}
          <h3 className="flex-1 text-center font-semibold text-gray-800 dark:text-gray-200 select-none text-xs md:text-sm truncate">
            {title}
          </h3>
          
          <div className="w-[48px] md:w-[52px]"></div>
        </div>
        
        {/* Contenido con scroll - SEPARADO del drag */}
        <div 
          ref={contentRef}
          className="p-3 md:p-5 overflow-y-auto flex-1"
          style={{ 
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
          onTouchStart={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};