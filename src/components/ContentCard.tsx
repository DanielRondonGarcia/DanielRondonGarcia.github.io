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
            <div className="relative mb-4">
                {subtitle && (
                    <div className="flex items-center relative mb-2">
                        <h2 className="text-sm uppercase tracking-wider text-gray-400">{subtitle}</h2>
                        <div className="w-[120px] h-[1px] mx-[10px] my-1 bg-[var(--primary-color)]"></div>
                    </div>
                )}
                {title && <h1 className="text-5xl font-bold">{title}</h1>}
            </div>
            {children}
        </div>
    );
};

export default ContentCard;