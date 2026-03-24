import React from 'react';
import { personalInfo } from '../../data/personalInfo';
import { FiMail, FiGithub, FiLinkedin, FiPhone, FiDownload, FiMapPin, FiCopy, FiCheck } from 'react-icons/fi';
import { useState } from 'react';

export const ContactWindow: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = personalInfo.cvUrl;
    link.download = 'Cv_EduardoJesusRodriguez.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5">
      {/* Foto de perfil - sin aumento */}
      <div className="flex justify-center">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-xl border-4 border-white dark:border-gray-700">
          <img 
            src={personalInfo.photoUrl} 
            alt={personalInfo.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';
                parent.style.backgroundColor = '#3b82f6';
                parent.style.fontSize = '2rem';
                parent.style.fontWeight = 'bold';
                parent.style.color = 'white';
                parent.innerText = personalInfo.name.charAt(0);
              }
            }}
          />
        </div>
      </div>

      {/* Nombre y rol */}
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">{personalInfo.name}</h2>
        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm md:text-base">{personalInfo.role}</p>
      </div>

      {/* Información de contacto detallada */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-3">
            <FiMapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">{personalInfo.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg group">
          <div className="flex items-center gap-3">
            <FiPhone className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 dark:text-gray-300">{personalInfo.phone}</span>
          </div>
          <button
            onClick={() => copyToClipboard(personalInfo.phone, 'phone')}
            className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Copiar teléfono"
          >
            {copiedPhone ? (
              <FiCheck className="w-4 h-4 text-green-500" />
            ) : (
              <FiCopy className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg group">
          <div className="flex items-center gap-3">
            <FiMail className="w-5 h-5 text-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">{personalInfo.email}</span>
          </div>
          <button
            onClick={() => copyToClipboard(personalInfo.email, 'email')}
            className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Copiar email"
          >
            {copiedEmail ? (
              <FiCheck className="w-4 h-4 text-green-500" />
            ) : (
              <FiCopy className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Redes sociales - sin efecto de aumento */}
      <div className="grid grid-cols-3 gap-3">
        <a
          href={`mailto:${personalInfo.email}`}
          className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FiMail className="w-6 h-6 text-blue-500" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Email</span>
        </a>
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FiGithub className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          <span className="text-xs text-gray-600 dark:text-gray-400">GitHub</span>
        </a>
        <a
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FiLinkedin className="w-6 h-6 text-blue-700" />
          <span className="text-xs text-gray-600 dark:text-gray-400">LinkedIn</span>
        </a>
      </div>

      {/* Botón descargar CV */}
      <button
        onClick={handleDownloadCV}
        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
      >
        <FiDownload className="w-4 h-4" />
        <span className="font-medium">Descargar CV</span>
      </button>

      {/* Mensaje de contacto alternativo */}
      <div className="text-center pt-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          📱 Disponible para oportunidades laborales
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          ⏱️ Respuesta en menos de 24 horas
        </p>
      </div>
    </div>
  );
};