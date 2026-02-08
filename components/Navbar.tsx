import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { LOGO_URL, CONTACT_INFO } from '../constants.ts';
import Button from './Button.tsx';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'À propos', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Bar for contact info */}
      <div className="bg-brand-dark text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm font-medium">
          <div className="flex space-x-6">
            <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center hover:text-brand-blue transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              {CONTACT_INFO.email}
            </a>
            <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center hover:text-brand-blue transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              {CONTACT_INFO.phone}
            </a>
          </div>
          <div className="flex space-x-4">
             <span className="opacity-80">Lundi - Vendredi: 9h - 18h</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-white py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              {/* Using an img tag for the logo as requested, with fallback text */}
              <img 
                src={LOGO_URL} 
                alt="iVision Agency Logo" 
                className="h-10 md:h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback if image fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<span class="text-3xl font-heading font-black tracking-tighter">i<span class="text-brand-blue">VISION</span></span>';
                }}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href}
                  className="font-sans font-medium text-gray-700 hover:text-brand-blue transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <Button size="sm" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
                Devis Gratuit
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-900 hover:text-brand-blue focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl">
            <div className="px-4 pt-4 pb-8 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-2 text-lg font-medium text-gray-900 hover:text-brand-blue hover:bg-blue-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <Button fullWidth onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView();
                }}>
                  Nous Contacter
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;