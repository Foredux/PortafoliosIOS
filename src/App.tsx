import { MenuBar } from './components/desktop/MenuBar';
import { Wallpaper } from './components/desktop/Wallpaper';
import { Dock } from './components/desktop/Dock';
import { Window } from './components/windows/Window';
import { AboutWindow } from './components/windows/AboutWindow';
import { ProjectsWindow } from './components/windows/ProjectsWindow';
import { SkillWindow } from './components/windows/SkillWindow';
import { ContactWindow } from './components/windows/ContactWindow';
import { SettingsWindow } from './components/windows/SettingsWindow';
import { useWindowsStore } from './store/WindowsStore';
import { useWindowFocus } from './hooks/useWindowFocus';

function App() {
  const { windows } = useWindowsStore();
  const { handleFocus } = useWindowFocus();

  const renderWindowContent = (type: string) => {
    switch (type) {
      case 'about':
        return <AboutWindow />;
      case 'projects':
        return <ProjectsWindow />;
      case 'skills':
        return <SkillWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'settings':
        return <SettingsWindow />;
      default:
        return null;
    }
  };

  const openWindows = windows.filter(w => w.isOpen === true && w.isMinimized === false);

  return (
    <div className="h-screen overflow-hidden">
      <MenuBar />
      <Wallpaper>
       
        {openWindows.map((window) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            initialPosition={window.position}
            zIndex={window.zIndex}
            onFocus={() => handleFocus(window.id)}
          >
            {renderWindowContent(window.type)}
          </Window>
        ))}
      </Wallpaper>
      <Dock />
    </div>
  );
}

export default App;