import { useCallback } from 'react';
import { useWindowsStore } from '../store/WindowsStore';

export const useWindowFocus = () => {
  const { focusWindow } = useWindowsStore();

  const handleFocus = useCallback((id: string) => {
    focusWindow(id);
  }, [focusWindow]);

  return { handleFocus };
};