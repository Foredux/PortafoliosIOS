import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WelcomeTooltip: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const shown = localStorage.getItem('welcomeShown');
    if (!shown) {
      setTimeout(() => setShow(true), 500);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('welcomeShown', 'true');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-28 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 max-w-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="text-3xl">👋</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 dark:text-white">¡Bienvenido a mi portafolio!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  </p><p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Haz clic en los íconos del <strong>dock inferior</strong> para abrir ventanas con mi información personal, proyectos y habilidades.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  💡 Puedes <strong>arrastrar las ventanas</strong> por la pantalla y cerrarlas con el botón rojo.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-3 text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg font-medium transition-colors"
                >
                  ¡Entendido, empezar!
                </button>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};