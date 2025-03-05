import React from 'react';

interface NavItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  navItems: NavItem[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  navItems,
  activeSection,
  setActiveSection
}) => {
  return (
    <div
      id="mobile-menu"
      className={`
        fixed top-0 left-0 w-64 backdrop-blur-md backdrop-filter h-full bg-white/80 dark:bg-gray-900/90 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:hidden z-[100] pt-16 px-4 pb-20
      `}
    >
      <ul className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <li key={item.href} className="relative">
            <button
              onClick={() => {
                setActiveSection(item.href);
                setIsMenuOpen(false);
              }}
              className={`
                w-full text-left px-4 py-2 hover:text-[var(--primary-color)] transition-colors
                ${activeSection === item.href ? 'text-[var(--primary-color)]' : 'text-gray-900 dark:text-white'}
              `}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;