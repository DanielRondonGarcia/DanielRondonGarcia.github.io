import React from 'react';

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
    },
    {
      icon: "fa-virus",
      title: "Covid 19 Tracker",
      description: "Dashboard to show total number of confirmed cases, total number of patients recovered from covid and number of people who lost their lives to covid. This can be filtered by country and can also be filtered by data. It shows high level charts such as donut and line charts for better visualization of data."
    },
    {
      icon: "fa-window-maximize",
      title: "Blazing Blazor",
      description: "Blazor is a feature of ASP.NET, the popular web development framework that extends the .NET developer platform with tools and libraries for building web apps."
    },
    {
      icon: "fa-train",
      title: "Mumbai\\Lucknow Metro",
      description: "The Mumbai Metro is a rapid transit system serving the city of Mumbai and the wider Mumbai Metropolitan Region in Maharashtra, India."
    },
    {
      icon: "fa-desktop",
      title: "CygNet - Canvas",
      description: "Canvas is HMI: Human-Machine Interface application, canvas provides high quality screen design functionality utilizing a wide range of specialized tools & controls."
    },
    {
      icon: "fa-globe",
      title: "Thin Web Client",
      description: "TWC is a web assembly allowing customers to view HMI-based screens and workflows in a web browser."
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">PROJECTS</h2>
        <h1 className="text-5xl font-bold mb-12">MY PROJECTS</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;