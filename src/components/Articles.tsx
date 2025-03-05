import ContentCard from './ContentCard';
import React, { useState, useMemo } from 'react';
import ArticleCard from './ArticleCard';

interface Article {
  title: string;
  category: string;
  image: string;
  link: string;
}

const Articles: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filters = ['ALL', 'MONITORING'];

  const articles: Article[] = [
    { title: 'Artemis', category: 'MONITORING', image: '/images/artemis.webp', link: 'https://docs.actsis.com/blog/nuevos-paneles' },
  ];

  const filteredArticles = useMemo(() => {
    return activeFilter === 'ALL'
      ? articles
      : articles.filter(article => article.category === activeFilter);
  }, [activeFilter, articles]);

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
          />
        ))}
      </div>
    </ContentCard>
  );
};

export default Articles;