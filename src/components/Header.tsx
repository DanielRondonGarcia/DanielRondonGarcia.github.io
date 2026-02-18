import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';
import MobileMenuButton from './MobileMenuButton';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isScrolled: boolean;
}

export default function Header({ activeSection, setActiveSection, isScrolled }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { href: 'home', label: 'Home' },
    { href: 'about', label: 'About' },
    { href: 'resume', label: 'Resume' },
    { href: 'projects', label: 'Projects' },
    { href: 'articles', label: 'Articles' },
    { href: 'AI', label: 'AI' },
    { href: 'contact', label: 'Contact' },

  ]
  const renderNavItems = () => (
    <ul className="flex flex-wrap justify-center space-x-4 text-sm">
      {navItems.map((item) => (
        <li key={item.href} className="relative">
          <button
            onClick={() => setActiveSection(item.href)}
            className={`
              hover:text-[var(--primary-color)] transition-colors relative 
              ${activeSection === item.href ? 'text-[var(--primary-color)]' : activeSection === 'home' ? 'text-[var(--text-primary)]' : ''}
              group
            `}
          >
            {item.label}
            <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary-color)] transition-all duration-300 ${activeSection === item.href ? 'w-full' : 'group-hover:w-full'}`}></span>
          </button>
        </li>
      ))}
    </ul>
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('mobile-menu');
      const button = document.getElementById('menu-button');
      
      if (menu && button && !menu.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`
          fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-in-out
          ${activeSection !== 'home' ? 'backdrop-blur-md backdrop-filter bg-white/10 dark:bg-black/20 shadow-lg' : ''}
        `}
      >
        <nav className="container max-w-4xl mx-auto px-4 md:px-0 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              {activeSection !== 'home' && (
                <button onClick={() => setActiveSection('home')} className="hover:text-[var(--primary-color)] transition-colors">{typeof process.env.NEXT_PUBLIC_NAME === 'string' ? process.env.NEXT_PUBLIC_NAME.replace(/"/g, '').trim() : 'Your Name'}</button>
              )}
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {renderNavItems()}
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button */}
            <MobileMenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </div>
        </nav>
      </header>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        navItems={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </>
  );
}