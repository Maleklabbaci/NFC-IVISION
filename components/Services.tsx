import React from 'react';
import { SERVICES } from '../constants.ts';
import { ArrowUpRight } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-brand-gray relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-blue font-bold tracking-wider uppercase mb-3">Notre Expertise</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
            Des solutions digitales complètes pour votre croissance
          </h3>
          <p className="text-lg text-gray-600">
            Nous combinons créativité et données pour offrir des services qui propulsent votre entreprise au niveau supérieur.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
            >
              {/* Hover Background Accent */}
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-blue transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300"></div>

              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              
              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-blue transition-colors">
                {service.title}
              </h4>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>

              <a href="#contact" className="inline-flex items-center text-sm font-semibold text-brand-blue hover:text-blue-700">
                En savoir plus <ArrowUpRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;