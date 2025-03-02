import React, { ReactNode } from 'react';

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  period?: string;
  location?: string;
  children?: ReactNode;
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ 
  title, 
  subtitle, 
  period, 
  location, 
  children,
  isLast = false
}) => {
  return (
    <div className="relative pl-8 mb-6 last:mb-0">
      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5 w-4 h-4 bg-green-400 rounded-full z-10"></div>
      
      {/* Timeline line - only show for non-last items */}
      {!isLast && <div className="absolute left-1.5 top-5 bottom-0 w-0.5 bg-gray-700 h-full"></div>}
      
      {/* Content */}
      <div>
        <h4 className="text-xl font-bold text-green-400 mb-2">{title}</h4>
        {period && <p className="font-bold">{period}</p>}
        {location && <p>{location}</p>}
        {subtitle && <p className="mb-2">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
};

interface TimelineProps {
  title: string;
  children: ReactNode;
}

const Timeline: React.FC<TimelineProps> = ({ title, children }) => {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="relative">
        {/* Continuous timeline line */}
        <div className="absolute left-1.5 top-6 bottom-0 w-0.5 bg-gray-700 h-[calc(100%-1.5rem)]"></div>
        {children}
      </div>
    </div>
  );
};

export default Timeline;