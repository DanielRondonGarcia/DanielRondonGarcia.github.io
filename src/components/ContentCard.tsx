import React, { ReactNode } from 'react';

interface ContentCardProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    isTransparent?: boolean;
    maxWidth?: string;
    className?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
    children,
    title,
    subtitle,
    isTransparent = false,
    maxWidth = '4xl',
    className = '',
}) => {
    return (
        <div className={`rounded-lg bg-black text-white min-h-screen p-8 max-w-${maxWidth} mx-auto ${isTransparent ? 'bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg' : ''} p-8 ${className}`}>
            {subtitle && <h2 className="text-2xl font-bold mb-4">{subtitle}</h2>}
            {title && <h1 className="text-5xl font-bold mb-8">{title}</h1>}

            {children}
        </div>
    );
};

export default ContentCard;