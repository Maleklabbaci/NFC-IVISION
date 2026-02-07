import React from 'react';
import { LOGO_URL, SOCIAL_LINKS } from '../constants';
import { Instagram, Linkedin, Facebook, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
             <div className="flex items-center mb-4">
              <span className="text-2xl font-heading font-black tracking-tighter text-white">i<span className="text-brand-blue">VISION</span> AGENCY</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Votre partenaire de confiance pour une transformation digitale réussie. Nous donnons vie à vos idées avec passion et expertise.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={SOCIAL_LINKS.instagram} className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href={SOCIAL_LINKS.linkedin} className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href={SOCIAL_LINKS.facebook} className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href={SOCIAL_LINKS.twitter} className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-lg font-bold mb-6">Agence</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-brand-blue transition-colors">Accueil</a></li>
              <li><a href="#about" className="hover:text-brand-blue transition-colors">À propos</a></li>
              <li><a href="#services" className="hover:text-brand-blue transition-colors">Nos Services</a></li>
              <li><a href="#contact" className="hover:text-brand-blue transition-colors">Carrières</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-lg font-bold mb-6">Expertises</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-brand-blue transition-colors">Stratégie Digitale</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Social Ads</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Création de Contenu</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Développement Web</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Restez informé de nos dernières actualités et conseils marketing.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Votre email" 
                className="bg-gray-800 border border-gray-700 text-white rounded px-4 py-2 text-sm focus:outline-none focus:border-brand-blue"
              />
              <button className="bg-brand-blue text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-600 transition-colors">
                S'abonner
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} iVision Agency. Tous droits réservés.</p>
          <p className="flex items-center mt-2 md:mt-0">
            Fait avec <Heart className="w-3 h-3 text-red-500 mx-1 fill-current" /> à Paris
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;