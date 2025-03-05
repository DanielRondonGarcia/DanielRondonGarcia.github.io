import React from 'react';

interface ArticleCardProps {
  title: string;
  category: string;
  image: string;
  link: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, category, image, link }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-all duration-300 hover:text-[var(--primary-color-500)] group relative">
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-lg" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={link}
            className="text-white dark:text-gray-900 px-4 py-2 rounded-full font-semibold bg-[var(--primary-color-500)] hover:bg-[var(--primary-color-600)] transition-colors duration-300"
          >
            Read More
          </a>
        </div>
      </div>
      <div className="p-4">
        <span className="text-[var(--primary-color-500)] text-sm font-semibold">{category}</span>
        <h3 className="text-xl font-bold mt-2 text-gray-900 dark:text-white">{title}</h3>
      </div>

      {/* Custom shape with two square corners and two rounded corners */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--primary-color-500)]"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--primary-color-500)] rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--primary-color-500)] rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--primary-color-500)]"></div>
      </div>
    </div>
  );
};

export default ArticleCard;