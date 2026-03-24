import React from 'react';

interface IconProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export const Icon: React.FC<IconProps> = ({ icon, label, onClick, active }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200
        hover:bg-white/20 active:scale-95
        ${active ? 'bg-white/30' : ''}
      `}
      title={label}
    >
      <div className="text-2xl">{icon}</div>
      <span className="text-[10px] font-medium text-white dark:text-gray-200">{label}</span>
    </button>
  );
};