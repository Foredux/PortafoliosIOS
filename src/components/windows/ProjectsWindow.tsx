import React, { useState } from 'react';
import { projects } from '../../data/personalInfo';
import { FiGithub, FiExternalLink, FiSearch } from 'react-icons/fi';

export const ProjectsWindow: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 md:w-4 md:h-4" />
        <input
          type="text"
          placeholder="Buscar proyectos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8 md:pl-9 pr-3 md:pr-4 py-1.5 md:py-2 text-sm md:text-base border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-3 md:space-y-4 max-h-[400px] overflow-y-auto">
        {filteredProjects.map((project) => (
          <div key={project.id} className="p-3 md:p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-1 md:mb-2">
              <h3 className="font-semibold text-sm md:text-lg text-gray-800 dark:text-white">{project.title}</h3>
              <div className="flex gap-1 md:gap-2">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1 md:p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <FiGithub className="w-3 h-3 md:w-4 md:h-4 text-gray-600 dark:text-gray-400" />
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-1 md:p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <FiExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-600 dark:text-gray-400" />
                  </a>
                )}
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-1 md:gap-2">
              {project.tech.map((tech, idx) => (
                <span key={idx} className="px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-6 md:py-8 text-sm md:text-base text-gray-500 dark:text-gray-400">
          No se encontraron proyectos
        </div>
      )}
    </div>
  );
};