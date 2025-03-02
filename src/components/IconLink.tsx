import React from 'react';
import Link from 'next/link';

interface IconLinkProps {
  href: string;
  icon: string;
  className?: string;
  iconClassName?: string;
}

const IconLink: React.FC<IconLinkProps> = ({ 
  href, 
  icon, 
  className = "text-white hover:text-[var(--primary-color-500)]", 
  iconClassName = "w-5 h-5 fill-current" 
}) => {
  return (
    <Link href={href} target='_blank' className={className}>
      <svg className={iconClassName} viewBox="0 0 24 24">
        <path d={icon} />
      </svg>
    </Link>
  );
};

export default IconLink;