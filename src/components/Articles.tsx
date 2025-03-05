import ContentCard from './ContentCard';
import React, { useState, useMemo } from 'react';

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
          <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-all duration-300 hover:text-[var(--primary-color-500)] group relative">
            <div className="relative h-48">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={article.link}
                  className="text-white dark:text-gray-900 px-4 py-2 rounded-full font-semibold bg-[var(--primary-color-500)] hover:bg-[var(--primary-color-600)] transition-colors duration-300"
                >
                  Read More
                </a>
              </div>
            </div>
            <div className="p-4">
              <span className="text-[var(--primary-color-500)] text-sm font-semibold">{article.category}</span>
              <h3 className="text-xl font-bold mt-2 text-gray-900 dark:text-white">{article.title}</h3>
            </div>

            {/* Custom shape with two square corners and two rounded corners */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--primary-color-500)]"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--primary-color-500)] rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--primary-color-500)] rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--primary-color-500)]"></div>
            </div>
          </div>
        ))}
      </div>
    </ContentCard>
  );
};

export default Articles;