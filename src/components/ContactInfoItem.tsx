import React, { ReactNode } from 'react';

interface ContactInfoItemProps {
  icon: string;
  title: string;
  children: ReactNode;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon, title, children }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-2 flex items-center">
        <i className={`fas ${icon} text-[var(--primary-color-500)] mr-2`}></i>
        {title}
      </h3>
      {children}
    </div>
  );
};

export default ContactInfoItem;