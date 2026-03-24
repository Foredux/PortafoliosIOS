import React from 'react';
import { personalInfo } from '../../data/personalInfo';
import { FiMapPin, FiMail, FiGithub, FiLinkedin, FiBriefcase, FiPhone, FiDownload } from 'react-icons/fi';


export const AboutWindow: React.FC = () => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = personalInfo.cvUrl;
    link.download = 'Cv_EduardoJesusRodriguez.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 md:space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
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
                  parent.style.fontSize = '1.5rem';
                  parent.style.fontWeight = 'bold';
                  parent.style.color = 'white';
                  parent.innerText = 'ER';
                }
              }}
            />
          </div>
          <div>
            <h2 className="text-lg md:text-2xl font-bold text-gray-800 dark:text-white">{personalInfo.name}</h2>
            <p className="text-sm md:text-base text-blue-600 dark:text-blue-400 font-medium">{personalInfo.role}</p>
          </div>
        </div>
        <button
          onClick={handleDownloadCV}
          className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-md text-sm md:text-base w-full sm:w-auto justify-center"
        >
          <FiDownload className="w-3 h-3 md:w-4 md:h-4" />
          <span className="text-xs md:text-sm font-medium">Descargar CV</span>
        </button>
      </div>

      <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{personalInfo.bio}</p>
      </div>

      <div className="space-y-1.5 md:space-y-2">
        <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
          <FiMapPin className="w-3 h-3 md:w-4 md:h-4" />
          <span>{personalInfo.location}</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
          <FiPhone className="w-3 h-3 md:w-4 md:h-4" />
          <a href={`tel:${personalInfo.phone}`} className="hover:text-blue-500 transition-colors">{personalInfo.phone}</a>
        </div>
        <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
          <FiMail className="w-3 h-3 md:w-4 md:h-4" />
          <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-500 transition-colors">{personalInfo.email}</a>
        </div>
       
        <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
          <FiGithub className="w-3 h-3 md:w-4 md:h-4" />
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">GitHub</a>
        </div>
        <div className="flex items-center gap-2 md:gap-3 text-sm md:text-base text-gray-600 dark:text-gray-400">
          <FiLinkedin className="w-3 h-3 md:w-4 md:h-4" />
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">LinkedIn</a>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <FiBriefcase className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-semibold text-gray-800 dark:text-white text-sm md:text-base">Experiencia Profesional</h3>
        </div>
        <div className="space-y-2 md:space-y-3">
          <div className="p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium text-gray-800 dark:text-white text-sm md:text-base">Técnico Informático</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Ayuntamiento de Casariche | Marzo 2021 - Junio 2021</p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">Instalación, actualización y reparación de hardware. Administración de servidores y gestión de cuentas.</p>
          </div>
          <div className="p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium text-gray-800 dark:text-white text-sm md:text-base">Desarrollador Web</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Eviden/Atos | Marzo 2024 - Junio 2024</p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">Desarrollo con Angular y React, implementación de API REST, despliegue de microservicios con Spring Boot.</p>
          </div>
          <div className="p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium text-gray-800 dark:text-white text-sm md:text-base">Desarrollador Web</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Repuestos y Talleres Rodas S.L | Marzo 2025 - Junio 2025</p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">Diseño y mantenimiento web con Prestashop, optimización de tienda online, gestión de productos.</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <FiBriefcase className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-semibold text-gray-800 dark:text-white text-sm md:text-base">Formación Académica</h3>
        </div>
        <div className="space-y-2">
          <div className="p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium text-gray-800 dark:text-white text-sm md:text-base">Grado Superior Desarrollo de Aplicaciones Web</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">IES Velázquez - Sevilla | 2021 - 2023</p>
          </div>
          <div className="p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium text-gray-800 dark:text-white text-sm md:text-base">Grado Medio Sistemas Microinformáticos y Redes</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">IES Herrera - Herrera | 2019 - 2021</p>
          </div>
          <div className="p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium text-gray-800 dark:text-white text-sm md:text-base">Educación Secundaria Obligatoria</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">IES Ostippo - Estepa | 2015 - 2019</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <FiBriefcase className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-semibold text-gray-800 dark:text-white text-sm md:text-base">Cursos y Masters</h3>
        </div>
        <div className="space-y-2">
          <div className="p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium text-gray-800 dark:text-white text-sm md:text-base">Master en React: ReactJS, Hook, Mern, React Component, NodeJS</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Octubre 2024</p>
          </div>
          <div className="p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium text-gray-800 dark:text-white text-sm md:text-base">Curso en Confección y Publicación de páginas web</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Mayo 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};