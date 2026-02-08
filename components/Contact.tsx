import React from 'react';
import Button from './Button.tsx';
import { CONTACT_INFO, SOCIAL_LINKS } from '../constants.ts';
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-dark rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          {/* Contact Info Side */}
          <div className="lg:w-2/5 p-10 lg:p-16 bg-brand-blue text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-black/10 blur-xl"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-heading font-bold mb-6">Parlons de votre projet</h3>
              <p className="text-blue-100 mb-10 text-lg">
                Prêt à faire décoller votre business ? Remplissez le formulaire ou contactez-nous directement via nos coordonnées.
              </p>

              <div className="space-y-6 mb-12">
                <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center text-white hover:text-blue-200 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 group-hover:bg-white/30">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-medium">{CONTACT_INFO.phone}</span>
                </a>
                
                <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center text-white hover:text-blue-200 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4 group-hover:bg-white/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-medium">{CONTACT_INFO.email}</span>
                </a>

                <div className="flex items-center text-white group">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-medium">{CONTACT_INFO.address}</span>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <h4 className="text-sm font-bold uppercase tracking-wider mb-4">Suivez-nous</h4>
                <div className="flex space-x-4">
                  <a href={SOCIAL_LINKS.instagram} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white hover:text-brand-blue flex items-center justify-center transition-all duration-300">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href={SOCIAL_LINKS.linkedin} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white hover:text-brand-blue flex items-center justify-center transition-all duration-300">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={SOCIAL_LINKS.facebook} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white hover:text-brand-blue flex items-center justify-center transition-all duration-300">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-10 lg:p-16 bg-white">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="Votre numéro"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email professionnel</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="nom@entreprise.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Service souhaité</label>
                <select 
                  id="subject" 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                >
                  <option>Stratégie Marketing</option>
                  <option>Gestion Réseaux Sociaux</option>
                  <option>Publicité (Ads)</option>
                  <option>Création Site Web</option>
                  <option>Branding</option>
                  <option>Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                  placeholder="Décrivez brièvement votre projet..."
                ></textarea>
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto">
                <Send className="w-4 h-4 mr-2" />
                Envoyer le message
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;