import React from 'react';
import Button from './Button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-32">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-blue/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-brand-blue text-sm font-bold tracking-wide uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-blue mr-2 animate-pulse"></span>
              Agence Marketing Digital 360°
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-gray-900 leading-tight">
              Propulsez votre <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-600">
                Vision
              </span> vers le succès.
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Chez <span className="font-bold text-gray-900">iVision Agency</span>, nous transformons les marques grâce à des stratégies digitales innovantes, un design percutant et des campagnes axées sur la performance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView()}>
                Démarrer un projet
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => document.getElementById('services')?.scrollIntoView()}>
                Découvrir nos services
              </Button>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start space-x-8 text-sm font-medium text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Expertise Certifiée
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Support 24/7
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative lg:h-[600px] w-full flex items-center justify-center">
             <div className="relative w-full max-w-lg lg:max-w-none aspect-square lg:aspect-auto h-full bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop" 
                  alt="Team brainstorming strategy" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                {/* Floating Cards */}
                <div className="absolute top-10 left-10 bg-white p-4 rounded-xl shadow-lg animate-[bounce_3s_infinite]">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                           +
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Croissance</p>
                            <p className="font-bold text-gray-900">+150% Leads</p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 right-10 bg-white p-4 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center text-white">
                           iV
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Agence</p>
                            <p className="font-bold text-gray-900">iVision Certified</p>
                        </div>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;