import React, { useState, useMemo } from 'react';

interface Article {
  title: string;
  category: string;
  image: string;
  link: string;
}

const Articles: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filters = ['ALL', 'DESIGN PATTERNS', 'C#', 'WPF', 'BLAZOR', 'JAVASCRIPT', 'BLOCKCHAIN', 'SOFTWARE ENGINEERING'];

  const articles: Article[] = [
    { title: 'Adapter Design Pattern', category: 'DESIGN PATTERNS', image: '/adapter-pattern.jpg', link: '#' },
    { title: 'Builder Design Pattern', category: 'DESIGN PATTERNS', image: '/builder-pattern.jpg', link: '#' },
    { title: 'Composite Design Pattern', category: 'DESIGN PATTERNS', image: '/composite-pattern.jpg', link: '#' },
    { title: 'Decorator Design Pattern', category: 'DESIGN PATTERNS', image: '/decorator-pattern.jpg', link: '#' },
    { title: 'Facade Design Pattern', category: 'DESIGN PATTERNS', image: '/facade-pattern.jpg', link: '#' },
    { title: 'Singleton Design Pattern', category: 'DESIGN PATTERNS', image: '/singleton-pattern.jpg', link: '#' },
    { title: 'C# Fundamentals', category: 'C#', image: '/csharp-fundamentals.jpg', link: '#' },
    { title: 'WPF MVVM Pattern', category: 'WPF', image: '/wpf-mvvm.jpg', link: '#' },
    { title: 'Blazor WebAssembly', category: 'BLAZOR', image: '/blazor-webassembly.jpg', link: '#' },
    { title: 'JavaScript Promises', category: 'JAVASCRIPT', image: '/js-promises.jpg', link: '#' },
    { title: 'Blockchain Basics', category: 'BLOCKCHAIN', image: '/blockchain-basics.jpg', link: '#' },
    { title: 'Clean Code Principles', category: 'SOFTWARE ENGINEERING', image: '/clean-code.jpg', link: '#' },
  ];

  const filteredArticles = useMemo(() => {
    return activeFilter === 'ALL'
      ? articles
      : articles.filter(article => article.category === activeFilter);
  }, [activeFilter, articles]);

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-[var(--primary-color-500)]">PORTFOLIO</h2>
        <h1 className="text-5xl font-bold mb-12">MY ARTICLES</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                activeFilter === filter
                  ? 'text-[var(--primary-color-500)] text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <div key={index} className="bg-gray-900 overflow-hidden group transition-all duration-300 relative rounded-lg">
              <div className="relative h-48">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[var(--primary-color-500)] text-black px-4 py-2 rounded-full font-semibold hover:text-[var(--primary-color-600)] transition-colors duration-300"
                  >
                    Read More
                  </a>
                </div>
              </div>
              <div className="p-4">
                <span className="text-[var(--primary-color-500)] text-sm font-semibold">{article.category}</span>
                <h3 className="text-xl font-bold mt-2">{article.title}</h3>
              </div>
              {/* Custom shape with two square corners and two rounded corners */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;