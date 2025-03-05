import React from 'react';
import ThemeToggle from './ThemeToggle';

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className="md:hidden flex items-center space-x-2">
      <ThemeToggle />
      <button
        id="menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-gray-800 dark:text-white p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
};

export default MobileMenuButton;