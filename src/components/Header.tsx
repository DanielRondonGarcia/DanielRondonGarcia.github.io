import { useEffect, useState } from 'react'

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isScrolled: boolean;
}

export default function Header({ activeSection, setActiveSection, isScrolled }: HeaderProps) {
  const navItems = [
    { href: 'home', label: 'Home' },
    { href: 'about', label: 'About' },
    { href: 'resume', label: 'Resume' },
    { href: 'projects', label: 'Projects' },
    { href: 'articles', label: 'Articles' },
    { href: 'dsa-simplified', label: 'DSA Simplified' },
    { href: 'contact', label: 'Contact' },

  ]
  const renderNavItems = () => (
    <ul className="flex flex-wrap justify-center space-x-4 text-sm">
      {navItems.map((item) => (
        <li key={item.href} className="relative">
          <button
            onClick={() => setActiveSection(item.href)}
            className={`
              hover:text-green-400 transition-colors relative
              ${activeSection === item.href ? 'text-green-400' : 'text-white'}
              group
            `}
          >
            {item.label}
            <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 ${activeSection === item.href ? 'w-full' : 'group-hover:w-full'}`}></span>
          </button>
        </li>
      ))}
    </ul>
  )

  return (
    <header
      className={`
        fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-in-out
        ${activeSection !== 'home' || isScrolled ? 'bg-black' : 'bg-transparent'}
      `}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            {activeSection !== 'home' && (
              <button onClick={() => setActiveSection('home')}>Daniel Rondón García</button>
            )}
          </div>
          {renderNavItems()}
        </div>
      </nav>
    </header>
  )
}