import React from 'react';
import ContentCard from './ContentCard';


interface ProjectCardProps {
  icon: string;
  title: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ icon, title, description }) => (
  <div className="bg-gray-900 p-6 rounded-lg transition-all duration-300 hover:text-[var(--primary-color-500)] group">
    <div className="flex justify-center mb-4">
      <div className="bg-gray-800 text-[var(--primary-color-500)] p-4 rounded-lg transition-all duration-300 group-hover:bg-white">
        <i className={`fas ${icon} text-3xl text-white group-hover:text-[var(--primary-color-500)]`}></i>
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2 text-center group-hover:text-[var(--primary-color-500)]">{title}</h3>
    <p className="text-gray-400 text-center group-hover:text-gray-200">{description}</p>
  </div>
);

const Projects = () => {
  const projects = [
    {
      icon: "fa-chart-line",
      title: "Stock Marker Charts",
      description: "A web based application allowing users to use Candlestick, OHLC (Open-High-Low-Close) charts on stocks from NASDAQ."
    }
  ];

  return (
    <ContentCard subtitle="PROJECTS" title="MY PROJECTS">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </ContentCard>
  );
};

export default Projects;