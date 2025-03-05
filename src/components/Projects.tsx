import React from 'react';
import ContentCard from './ContentCard';


interface ProjectCardProps {
  icon: string;
  title: string;
  description: string;
  url?: string; // Optional URL property
}

const ProjectCard: React.FC<ProjectCardProps> = ({ icon, title, description, url }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-all duration-300 hover:text-[var(--primary-color-500)] group">
    <div className="flex justify-center mb-4">
      <div className="bg-gray-100 dark:bg-gray-800 text-[var(--primary-color-500)] p-4 rounded-lg transition-all duration-300 group-hover:bg-white">
        <i className={`${icon} text-3xl text-gray-800 dark:text-white group-hover:text-[var(--primary-color-500)]`}></i>
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2 text-center text-gray-900 dark:text-white group-hover:text-[var(--primary-color-500)]">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-center group-hover:text-gray-900 dark:group-hover:text-gray-200">{description}</p>
    {url && (
      <div className="mt-4 text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 text-[var(--primary-color-500)] rounded hover:bg-[var(--primary-color-500)] hover:text-white transition-all duration-300"
        >
          View Project
        </a>
      </div>
    )}
  </div>
);

const Projects = () => {
  const projects = [
    {
      icon: "fa-brands fa-dev",
      title: "nextjs-devcontainer",
      description: "🐋 Fully-Dockerised Nextjs - postgress development in Visual Studio Code",
      url: "https://github.com/DanielRondonGarcia/nextjs-devcontainer"
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