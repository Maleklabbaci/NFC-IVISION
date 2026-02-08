import React from 'react';
import { 
  Phone, Mail, MapPin, Share2, Download, 
  Instagram, Linkedin, Facebook, MessageCircle, ArrowUpRight, Globe
} from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS, LOGO_URL, SERVICES } from './constants.ts';

function App() {
  const handleDownloadVCard = () => {
    // 1. Préparation rapide des données
    const cleanPhone = CONTACT_INFO.phone.replace(/[^\d+]/g, '');
    // Timestamp pour forcer la mise à jour si le contact existe déjà
    const revDate = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    // 2. Construction du vCard (Standard V3.0 pour compatibilité max iOS/Android)
    const vcardRows = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:iVision Agency',                   // Nom complet affiché
      'N:Agency;iVision;;;',                 // Structure Nom;Prénom...
      'ORG:iVision Agency',                  // Entreprise
      'TITLE:Agence de Marketing Digital',   // Titre
      `TEL;TYPE=WORK,VOICE,PREF:${cleanPhone}`,
      `EMAIL;TYPE=WORK,INTERNET:${CONTACT_INFO.email}`,
      `URL;TYPE=WORK:${SOCIAL_LINKS.website}`,
      // Echappement des virgules dans l'adresse
      `ADR;TYPE=WORK:;;${CONTACT_INFO.address.replace(/,/g, '\\,')};;;;`,
      // Liste des services dans les notes
      `NOTE:Expertise: ${SERVICES.map(s => s.title).join(' • ')}`,
      `REV:${revDate}`,                      // Date de révision
      'END:VCARD'
    ];

    const vcardString = vcardRows.join('\r\n');
    const blob = new Blob([vcardString], { type: 'text/vcard;charset=utf-8' });
    
    // 3. Déclenchement du téléchargement universel
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.setAttribute('download', 'contact-ivision.vcf');
    
    // Ajout au DOM nécessaire pour certains navigateurs mobiles (Firefox Android, etc.)
    document.body.appendChild(link);
    link.click();
    
    // 4. Nettoyage
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'iVision Agency',
          text: 'Découvrez iVision Agency - Marketing Digital',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Erreur lors du partage:', err);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center p-4 font-sans">
        
        {/* Arrière-plan animé fluide (Blobs) */}
        <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Carte Principale Glassmorphism */}
        <div className="w-full max-w-sm z-10 animate-fade-up my-4">
            <div className="backdrop-blur-2xl bg-white/70 rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden relative">
                
                {/* Header Profil */}
                <div className="pt-10 px-6 pb-6 text-center relative">
                    <div className="relative mx-auto w-28 h-28 mb-4 group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full animate-spin blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative w-full h-full bg-white p-1 rounded-full overflow-hidden">
                            <img 
                                src={LOGO_URL} 
                                alt="iVision Logo" 
                                className="w-full h-full object-contain rounded-full bg-white" 
                            />
                        </div>
                    </div>
                    
                    <h1 className="text-2xl font-heading font-bold text-slate-800 tracking-tight">iVision Agency</h1>
                    <p className="text-brand-blue font-medium text-sm mt-1">Marketing Digital & Performance</p>
                    <p className="text-slate-500 text-xs mt-3 px-4 leading-relaxed">
                        Transformez votre vision en réalité digitale. Stratégie, Design & Croissance.
                    </p>
                </div>

                {/* Grille d'Actions Rapides */}
                <div className="grid grid-cols-4 gap-3 px-6 mb-8">
                    {[
                        { icon: Phone, label: "Appel", href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`, color: "bg-green-100 text-green-600" },
                        { icon: Mail, label: "Email", href: `mailto:${CONTACT_INFO.email}`, color: "bg-blue-100 text-blue-600" },
                        { icon: MessageCircle, label: "Chat", href: CONTACT_INFO.whatsapp, color: "bg-emerald-100 text-emerald-600" },
                        { icon: MapPin, label: "Plan", href: `https://maps.google.com/?q=${CONTACT_INFO.address}`, color: "bg-orange-100 text-orange-600" }
                    ].map((item, index) => (
                        <a 
                            key={index} 
                            href={item.href}
                            className="flex flex-col items-center gap-2 group transition-transform hover:-translate-y-1"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300`}>
                                <item.icon size={22} strokeWidth={2} />
                            </div>
                            <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">{item.label}</span>
                        </a>
                    ))}
                </div>

                {/* Social Bar (Filtré) */}
                <div className="px-6 mb-8">
                    <div className="bg-slate-50/80 rounded-2xl p-2 flex justify-center gap-4 items-center backdrop-blur-sm">
                         {[
                            { icon: Instagram, href: SOCIAL_LINKS.instagram, color: "hover:text-pink-600" },
                            { icon: Facebook, href: SOCIAL_LINKS.facebook, color: "hover:text-blue-600" },
                            { icon: Globe, href: SOCIAL_LINKS.website, color: "hover:text-brand-blue" },
                            { icon: Linkedin, href: SOCIAL_LINKS.linkedin, color: "hover:text-blue-700" },
                            { icon: "tiktok", href: SOCIAL_LINKS.tiktok, color: "hover:text-black" }
                        ]
                        .filter(social => social.href && social.href !== "") 
                        .map((social, i) => (
                            <a 
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-3 text-slate-400 ${social.color} hover:bg-white hover:shadow-sm rounded-xl transition-all duration-300 transform hover:scale-110`}
                            >
                                {social.icon === "tiktok" ? (
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                                ) : (
                                    // @ts-ignore
                                    <social.icon size={20} strokeWidth={2.5} />
                                )}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Section Services Compacte */}
                <div className="px-6 pb-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 ml-1">Nos Services</h3>
                    <div className="space-y-3">
                        {SERVICES.map((service, idx) => (
                            <div key={idx} className="group bg-white/60 hover:bg-white p-3 rounded-2xl flex items-center gap-4 transition-all duration-300 border border-transparent hover:border-blue-100 hover:shadow-sm cursor-default">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-brand-blue flex items-center justify-center shadow-sm shrink-0">
                                    <service.icon size={18} strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-slate-800 truncate">{service.title}</h4>
                                    <p className="text-[11px] text-slate-500 truncate">{service.description}</p>
                                </div>
                                <ArrowUpRight size={16} className="text-slate-300 group-hover:text-brand-blue transition-colors shrink-0" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-white/50 backdrop-blur-md border-t border-white/50 flex gap-3">
                    <button 
                        onClick={handleDownloadVCard}
                        className="flex-1 bg-brand-dark text-white text-sm font-bold py-3.5 rounded-2xl shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Download size={18} />
                        Enregistrer
                    </button>
                    <button 
                        onClick={handleShare}
                        className="w-14 bg-white text-slate-700 border border-white/60 py-3.5 rounded-2xl shadow-sm hover:bg-slate-50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center"
                    >
                        <Share2 size={20} />
                    </button>
                </div>
            </div>
            
            <p className="text-center text-[10px] text-slate-400 mt-6 font-medium tracking-wide opacity-70">
                iVision Agency © {new Date().getFullYear()}
            </p>
        </div>
    </div>
  );
}

export default App;