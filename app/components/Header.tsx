'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInAboutSection, setIsInAboutSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past about section (white background should stay)
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        const hasPassedAbout = rect.top <= 80;
        setIsInAboutSection(hasPassedAbout);
        setIsScrolled(hasPassedAbout);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? isInAboutSection
              ? 'bg-white shadow-lg'
              : 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center"
            >
              <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                isInAboutSection ? 'text-slate-900' : 'text-white'
              }`}>
                PA
              </h1>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-medium transition-colors duration-300 ${
                    isScrolled && isInAboutSection
                      ? 'text-slate-700 hover:text-blue-600'
                      : isScrolled
                      ? 'text-slate-700 hover:text-blue-600'
                      : 'text-white hover:text-blue-300'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="btn-primary text-sm"
              >
                Get in Touch
              </a>
            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
              aria-label="Open menu"
            >
              <span
                className={`w-6 h-0.5 transition-colors duration-300 ${
                  isScrolled && isInAboutSection ? 'bg-slate-900' : isScrolled ? 'bg-slate-900' : 'bg-white'
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 transition-colors duration-300 ${
                  isScrolled && isInAboutSection ? 'bg-slate-900' : isScrolled ? 'bg-slate-900' : 'bg-white'
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 transition-colors duration-300 ${
                  isScrolled && isInAboutSection ? 'bg-slate-900' : isScrolled ? 'bg-slate-900' : 'bg-white'
                }`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-gradient-to-br from-slate-900 to-indigo-900 transition-transform duration-500 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white"
          aria-label="Close menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Menu Links */}
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-4xl font-bold text-white hover:text-blue-300 transition-all duration-300 transform hover:scale-110"
              style={{
                animation: isMenuOpen ? `slideIn 0.5s ease-out ${index * 0.1}s forwards` : 'none',
                opacity: 0,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-primary text-lg mt-8"
            style={{
              animation: isMenuOpen ? `slideIn 0.5s ease-out ${navLinks.length * 0.1}s forwards` : 'none',
              opacity: 0,
            }}
          >
            Get in Touch
          </a>
        </nav>
      </div>
    </>
  );
}
