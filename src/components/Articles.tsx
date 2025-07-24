import ContentCard from './ContentCard';
import React, { useState, useMemo, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { presentationsToArticles } from '../config/presentations';

interface Article {
  title: string;
  category: string;
  image: string;
  link: string;
  type: 'article' | 'presentation';
}

const Articles: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [presentations, setPresentations] = useState<Article[]>([]);

  const filters = ['ALL', 'MONITORING', 'PRESENTATIONS', 'DEVOPS'];

  // Artículos estáticos
  const staticArticles: Article[] = [
    { 
      title: 'Artemis', 
      category: 'MONITORING', 
      image: '/images/artemis.webp', 
      link: 'https://docs.actsis.com/blog/nuevos-paneles',
      type: 'article'
    },
  ];

  // Cargar presentaciones al montar el componente
  useEffect(() => {
    const marpPresentations = presentationsToArticles();
    setPresentations(marpPresentations);
  }, []);

  // Combinar artículos estáticos y presentaciones
  const allArticles = useMemo(() => {
    return [...staticArticles, ...presentations];
  }, [presentations]);

  const filteredArticles = useMemo(() => {
    if (activeFilter === 'ALL') {
      return allArticles;
    }
    if (activeFilter === 'PRESENTATIONS') {
      return allArticles.filter(article => article.type === 'presentation');
    }
    return allArticles.filter(article => article.category === activeFilter);
  }, [activeFilter, allArticles]);

  return (
    <ContentCard subtitle="PORTFOLIO" title="MY ARTICLES">
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${activeFilter === filter
              ? 'bg-[var(--primary-color-500)] text-white dark:text-black'
              : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            category={article.category}
            image={article.image}
            link={article.link}
            type={article.type}
          />
        ))}
      </div>
    </ContentCard>
  );
};

export default Articles;