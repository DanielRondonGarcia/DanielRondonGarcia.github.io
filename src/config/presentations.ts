// Configuración de presentaciones de Marp
// Este archivo centraliza la gestión de presentaciones para el componente Articles

export interface PresentationConfig {
  id: string;
  title: string;
  category: string;
  description?: string;
  tags?: string[];
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Lista de presentaciones disponibles
export const presentations: PresentationConfig[] = [
  {
    id: 'git',
    title: 'Fundamentos de GIT',
    category: 'DEVOPS',
    description: 'Fundamentos de GIT',
    tags: ['devops', 'SCM', 'versionamiento'],
    createdAt: '2025-07-24',
    updatedAt: '2024-07-25'
  },
  {
    id: 'afinia_monitoring',
    title: 'AFINIA — Día 4: Configuración de Monitoreo',
    category: 'MONITORING',
    description: 'Configuración de Monitoreo (Infra de Pruebas de Estrés)',
    tags: ['monitoring', 'grafana', 'influxdb', 'kubernetes', 'sre'],
    image: '/images/devops-presentation.svg', // Placeholder image
    createdAt: '2026-02-18',
    updatedAt: '2026-02-18'
  }
];

// Función para obtener todas las presentaciones
export const getAllPresentations = (): PresentationConfig[] => {
  return presentations;
};

// Función para obtener presentaciones por categoría
export const getPresentationsByCategory = (category: string): PresentationConfig[] => {
  return presentations.filter(p => p.category === category);
};

// Función para obtener una presentación por ID
export const getPresentationById = (id: string): PresentationConfig | undefined => {
  return presentations.find(p => p.id === id);
};

// Función para generar la URL de la presentación
export const getPresentationUrl = (id: string): string => {
  return `/slides/${id}.html`;
};

// Función para generar la URL de la imagen de la presentación
export const getPresentationImageUrl = (presentation: PresentationConfig): string => {
  if (presentation.image) return presentation.image;
  return `/images/${presentation.id}.png`;
};

// Función para convertir presentaciones a formato Article
export const presentationsToArticles = () => {
  return presentations.map(presentation => ({
    title: presentation.title,
    category: presentation.category,
    image: getPresentationImageUrl(presentation),
    link: getPresentationUrl(presentation.id),
    type: 'presentation' as const,
    description: presentation.description,
    tags: presentation.tags
  }));
};