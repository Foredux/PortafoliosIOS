import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

interface ParticlesBackgroundProps {
  darkMode?: boolean;
}

export const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({ darkMode = false }) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Particles loaded", container);
  }, []);

  const particlesColor = darkMode ? "#ffffff" : "#ffffff";
  const particlesOpacity = darkMode ? 0.3 : 0.4;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // Efecto al pasar el ratón
            },
            onClick: {
              enable: true,
              mode: "push", // Añade partículas al hacer clic
            },
          },
        },
        particles: {
          color: {
            value: particlesColor,
          },
          links: {
            color: particlesColor,
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80, // Cantidad de partículas
          },
          opacity: {
            value: particlesOpacity,
            random: true,
            anim: {
              enable: true,
              speed: 0.5,
              opacity_min: 0.1,
              sync: false,
            },
          },
          shape: {
            type: "circle", // Forma de las partículas
          },
          size: {
            value: { min: 1, max: 3 },
            random: true,
            anim: {
              enable: true,
              speed: 1,
              size_min: 0.5,
              sync: false,
            },
          },
        },
        detectRetina: true,
      }}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};