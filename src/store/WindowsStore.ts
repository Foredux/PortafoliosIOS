import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Window, WindowType } from '../types/window';

interface WindowsStore {
  windows: Window[];
  nextZIndex: number;
  openWindow: (type: WindowType, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  closeAllWindows: () => void;
  organizeWindows: () => void;
}

export const useWindowsStore = create<WindowsStore>((set, get) => ({
  windows: [],
  nextZIndex: 10,

  openWindow: (type, title) => {
    set((state) => {
      const existingOpen = state.windows.find(w => w.type === type && w.isOpen === true && !w.isMinimized);
      
      if (existingOpen) {
        return {
          windows: state.windows.map(w =>
            w.id === existingOpen.id
              ? { ...w, zIndex: state.nextZIndex, isMinimized: false }
              : w
          ),
          nextZIndex: state.nextZIndex + 1
        };
      }

      const existingMinimized = state.windows.find(w => w.type === type && w.isMinimized === true);
      if (existingMinimized) {
        return {
          windows: state.windows.map(w =>
            w.id === existingMinimized.id
              ? { ...w, isMinimized: false, isOpen: true, zIndex: state.nextZIndex }
              : w
          ),
          nextZIndex: state.nextZIndex + 1
        };
      }

      const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
      const newWindow: Window = {
        id: uuidv4(),
        type,
        title,
        isOpen: true,
        isMinimized: false,
        position: isMobile 
          ? { x: 16, y: 80 }
          : { x: 80 + Math.random() * 100, y: 60 + Math.random() * 80 },
        zIndex: state.nextZIndex
      };

      return {
        windows: [...state.windows, newWindow],
        nextZIndex: state.nextZIndex + 1
      };
    });
  },

  closeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isOpen: false, isMinimized: false } : w
      )
    }));
  },

  minimizeWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: true } : w
      )
    }));
  },

  restoreWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: false, zIndex: state.nextZIndex } : w
      ),
      nextZIndex: state.nextZIndex + 1
    }));
  },

  focusWindow: (id) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: state.nextZIndex } : w
      ),
      nextZIndex: state.nextZIndex + 1
    }));
  },

  updatePosition: (id, position) => {
    set((state) => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, position } : w
      )
    }));
  },

  closeAllWindows: () => {
    set((state) => ({
      windows: state.windows.map(w => ({ ...w, isOpen: false, isMinimized: false }))
    }));
  },

  organizeWindows: () => {
    const openWindows = get().windows.filter(w => w.isOpen && !w.isMinimized);
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    
    if (isMobile) {
      openWindows.forEach((window, index) => {
        get().updatePosition(window.id, { x: 0, y: 40 + index * 20 });
      });
    } else {
      let x = 50;
      let y = 60;
      openWindows.forEach((window) => {
        get().updatePosition(window.id, { x, y });
        x += 40;
        y += 40;
        if (x > 400) {
          x = 50;
          y += 80;
        }
      });
    }
  }
}));