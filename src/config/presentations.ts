// Configuración de presentaciones de Marp
// Este archivo centraliza la gestión de presentaciones para el componente Articles

export interface PresentationConfig {
  id: string;
  title: string;
  category: string;
  description?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Lista de presentaciones disponibles
export const presentations: PresentationConfig[] = [
  {
    id: 'template',
    title: 'Template',
    category: 'DEVOPS',
    description: 'PLantilla base',
    tags: ['devops', 'ci/cd', 'automation', 'monitoring'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 'kubernetes-basics',
    title: 'Kubernetes Fundamentals',
    category: 'DEVOPS',
    description: 'Fundamentos de Kubernetes, conceptos básicos y arquitectura',
    tags: ['kubernetes', 'containers', 'orchestration', 'devops'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  }
  // Agregar más presentaciones aquí...
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
export const getPresentationImageUrl = (id: string): string => {
  return `/images/${id}.png`;
};

// Función para convertir presentaciones a formato Article
export const presentationsToArticles = () => {
  return presentations.map(presentation => ({
    title: presentation.title,
    category: presentation.category,
    image: getPresentationImageUrl(presentation.id),
    link: getPresentationUrl(presentation.id),
    type: 'presentation' as const,
    description: presentation.description,
    tags: presentation.tags
  }));
};