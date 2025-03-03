import { useEffect, useState } from 'react'

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
              ${activeSection === item.href ? 'text-[var(--primary-color)]' : 'text-white'}
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
    <header
      className={`
        fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-in-out
        ${activeSection !== 'home' && !isScrolled 
          ? 'bg-black' 
          : isScrolled 
            ? 'bg-black/70 backdrop-blur-md' 
            : 'bg-transparent'}
      `}
    >
      <nav className="container max-w-4xl mx-auto px-4 md:px-0 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            {activeSection !== 'home' && (
              <button onClick={() => setActiveSection('home')}>{process.env.NEXT_PUBLIC_NAME}</button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            id="menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            {renderNavItems()}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`
            fixed top-0 left-0 h-full w-64 bg-black/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:hidden z-50 pt-16 px-4
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
                    ${activeSection === item.href ? 'text-[var(--primary-color)]' : 'text-white'}
                  `}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}