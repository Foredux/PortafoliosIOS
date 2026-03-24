import { Project, Skill } from '../types/window';

export const personalInfo = {
  name: 'Eduardo Jesús Rodríguez',
  role: 'Desarrollador Full Stack',
  location: 'España',
  email: 'edustp18@gmail.com',
  phone: '+34 610828808',
  github: 'https://github.com/Foredux',
  linkedin: 'https://www.linkedin.com/in/eduardo-jes%C3%BAs-rodr%C3%ADguez-castellano-aa791820b/',

  cvUrl: '/Cv_EduardoJesusRodriguez.pdf',
  photoUrl: '/foto-perfil.png',
  bio: 'Desarrollador Full Stack con experiencia en Angular, React, Spring Boot y tecnologías web. Apasionado por crear aplicaciones dinámicas, funcionales y optimizadas. Con formación especializada en desarrollo web y experiencia en entornos profesionales.',
  experience: [
    '🚀 Desarrollador Web en Eviden/Atos (2024) - Aplicaciones con Angular, React, API REST y Spring Boot',
    '🛠️ Desarrollador Web en Repuestos y Talleres Rodas S.L (2025) - Diseño y mantenimiento con Prestashop',
    '💻 Técnico Informático en Ayuntamiento de Casariche (2021) - Instalación, mantenimiento y administración de servidores',
    '📱 Master en React: ReactJS, Hook, Mern, NodeJS (2024)',
    '🌐 Curso en Confección y Publicación de páginas web (2025)'
  ]
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'iOS Portfolio',
    description: 'Portafolio interactivo con estilo iOS, ventanas flotantes, dock animado y soporte táctil. Proyecto personal que demuestra habilidades en React, TypeScript y animaciones.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Zustand'],
    github: 'https://github.com/tuusuario/ios-portfolio',
    
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    description: 'Dashboard interactivo con gráficos en tiempo real, filtros avanzados y exportación de datos. Desarrollado durante mi experiencia profesional.',
    tech: ['React', 'TypeScript', 'Recharts', 'Tailwind', 'API REST'],
    github: 'https://github.com/',
    
  },
  {
    id: 3,
    title: 'E-commerce Prestashop',
    description: 'Tienda online optimizada para Repuestos y Talleres Rodas S.L. Gestión de productos, mejora de experiencia de usuario y mantenimiento continuo.',
    tech: ['Prestashop', 'PHP', 'MySQL', 'HTML/CSS', 'JavaScript'],
    demo: 'https://repuestosytalleresrodas.com/'
  },
  {
    id: 4,
    title: 'Microservicios Spring Boot',
    description: 'Despliegue de microservicios utilizando Spring Boot para aplicaciones empresariales. Integración con frontend en Angular y React.',
    tech: ['Spring Boot', 'Java', 'API REST', 'Angular', 'React'],
    github: 'https://github.com/'
  }
];

export const skills: Skill[] = [
  { name: 'React', level: 50, category: 'frontend' },
  { name: 'TypeScript', level: 45, category: 'frontend' },
  { name: 'Angular', level: 50, category: 'frontend' },
  { name: 'Next.js', level: 30, category: 'frontend' },
  { name: 'Tailwind CSS', level: 40, category: 'frontend' },
  { name: 'Node.js', level: 45, category: 'backend' },
  { name: 'Spring Boot', level: 40, category: 'backend' },
  { name: 'Java', level: 60, category: 'backend' },
  { name: 'PHP', level: 60, category: 'backend' },
  { name: 'API REST', level: 30, category: 'backend' },
  { name: 'Git/GitHub', level: 40, category: 'tools' },
  { name: 'Prestashop', level: 40, category: 'tools' },
  { name: 'MySQL', level: 50, category: 'tools' }
];