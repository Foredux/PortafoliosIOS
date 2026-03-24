export type WindowType = 'about' | 'projects' | 'contact' | 'skills' | 'settings';

export interface Window {
  id: string;
  type: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized:boolean;
  position: { x: number; y: number };
  zIndex: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
  icon?: string;
}