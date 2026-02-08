import React from 'react';
import { 
  Phone, Mail, MapPin, Share2, Download, 
  Instagram, Linkedin, Facebook, MessageCircle, ArrowUpRight, Globe, Zap,
  LayoutDashboard, Megaphone, PenTool
} from 'lucide-react';

// --- Constantes intégrées pour éviter les erreurs de chargement ---

const CONTACT_INFO = {
  phone: "+213 563 83 94 04",
  email: "contact@ivision.agency",
  address: "Tipaza, Algérie",
  whatsapp: "https://wa.me/213563839404",
};

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/ivision_agency/",
  linkedin: "", 
  facebook: "https://www.facebook.com/agencyivision/",
  tiktok: "", 
  website: "https://ivision.agency",
};

const LOGO_URL = "https://i.ibb.co/zHJBDrDT/i-VISIONLOGO.png";

const SERVICES = [
  {
    title: "Marketing digital complet",
    description: "Une stratégie 360° pour booster votre visibilité et votre croissance en ligne.",
    icon: LayoutDashboard,
  },
  {
    title: "Création de contenu",
    description: "Design graphique et production vidéo pour captiver votre audience.",
    icon: PenTool,
  },
  {
    title: "Sponsoring Meta Ads",
    description: "Campagnes publicitaires performantes sur Facebook et Instagram.",
    icon: Megaphone,
  },
  {
    title: "Website e-commerce",
    description: "Conception de sites web modernes et optimisés pour vendre.",
    icon: Globe,
  },
];

// --- Composant Principal ---

function App() {

  const handleDownloadVCard = async () => {
    // Contenu de la vCard
    const vcardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:iVision Agency',
      'ORG:iVision Agency',
      `TEL;TYPE=WORK,VOICE:${CONTACT_INFO.phone}`,
      `EMAIL;TYPE=WORK:${CONTACT_INFO.email}`,
      `URL:${SOCIAL_LINKS.website}`, 
      `ADR;TYPE=WORK:;;${CONTACT_INFO.address.replace(/,/g, '\\,')};;;;`,
      'END:VCARD'
    ].join('\r\n');

    // Création du fichier pour le partage
    const file = new File([vcardContent], "contact.vcf", { type: "text/vcard" });

    // Tentative de partage natif (Idéal pour Mobile/iOS)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'iVision Agency Contact',
          text: 'Sauvegarder le contact iVision Agency',
        });
        return; // Succès, on arrête ici
      } catch (error) {
        console.log('Partage annulé ou échoué, passage au téléchargement classique', error);
      }
    }

    // Fallback : Téléchargement direct (Desktop/Android ancien)
    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'contact-ivision.vcf');
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
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
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center p-4 font-sans overflow-hidden">
        
        {/* Arrière-plan animé fluide (Blobs) */}
        <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
        </div>

        {/* Carte Principale Glassmorphism - Animation d'entrée Zoom */}
        <div className="w-full max-w-sm z-10 animate-scale-up my-4 perspective-1000">
            <div className="backdrop-blur-2xl bg-white/75 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/60 overflow-hidden relative transform transition-transform duration-500 hover:scale-[1.01]">
                
                {/* Décoration top-right */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20 pointer-events-none"></div>

                {/* Header Profil */}
                <div className="pt-10 px-6 pb-6 text-center relative">
                    <div className="relative mx-auto w-32 h-32 mb-4 group cursor-pointer perspective-1000">
                        {/* Cercle animé rotatif */}
                        <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow opacity-80 blur-sm group-hover:opacity-100 transition duration-500"></div>
                        <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow opacity-40"></div>
                        
                        <div className="relative w-full h-full bg-white p-1.5 rounded-full overflow-hidden shadow-inner transition-transform duration-500 group-hover:scale-105">
                            <img 
                                src={LOGO_URL} 
                                alt="iVision Logo" 
                                className="w-full h-full object-contain rounded-full bg-white" 
                            />
                        </div>
                        {/* Badge Online */}
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full z-20 animate-pulse"></div>
                    </div>
                    
                    <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight animate-slide-up-fade delay-100">
                        iVision Agency
                    </h1>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mt-2 animate-slide-up-fade delay-200">
                        <Zap size={14} className="text-brand-blue fill-current" />
                        <span className="text-brand-blue font-bold text-xs uppercase tracking-wide">Marketing & Tech</span>
                    </div>
                    
                    <p className="text-slate-500 text-sm mt-4 px-2 leading-relaxed animate-slide-up-fade delay-300">
                        Nous transformons vos idées en <span className="text-slate-800 font-semibold">succès digital</span>.
                    </p>
                </div>

                {/* Grille d'Actions Rapides */}
                <div className="grid grid-cols-4 gap-3 px-6 mb-8">
                    {[
                        { icon: Phone, label: "Appel", href: `tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`, color: "bg-green-50 text-green-600 border-green-200", delay: "delay-300" },
                        { icon: Mail, label: "Email", href: `mailto:${CONTACT_INFO.email}`, color: "bg-blue-50 text-blue-600 border-blue-200", delay: "delay-400" },
                        { icon: MessageCircle, label: "Chat", href: CONTACT_INFO.whatsapp, color: "bg-emerald-50 text-emerald-600 border-emerald-200", delay: "delay-500" },
                        { icon: MapPin, label: "Plan", href: `https://maps.google.com/?q=${CONTACT_INFO.address}`, color: "bg-orange-50 text-orange-600 border-orange-200", delay: "delay-700" }
                    ].map((item, index) => (
                        <a 
                            key={index} 
                            href={item.href}
                            className={`flex flex-col items-center gap-2 group animate-pop-in ${item.delay} opacity-0 fill-mode-forwards`}
                            style={{ animationFillMode: 'forwards' }}
                        >
                            <div className={`w-14 h-14 rounded-2xl ${item.color} border flex items-center justify-center shadow-sm group-hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] group-hover:-translate-y-2 group-active:scale-90 transition-all duration-300 relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                <item.icon size={22} strokeWidth={2} className="relative z-10" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-brand-blue transition-colors">{item.label}</span>
                        </a>
                    ))}
                </div>

                {/* Social Bar */}
                <div className="px-6 mb-8 animate-slide-up-fade delay-500 opacity-0" style={{ animationFillMode: 'forwards' }}>
                    <div className="bg-gradient-to-r from-slate-50 to-white border border-white rounded-2xl p-2 flex justify-center gap-2 items-center shadow-inner">
                         {[
                            { icon: Instagram, href: SOCIAL_LINKS.instagram, color: "hover:text-pink-600 hover:bg-pink-50" },
                            { icon: Facebook, href: SOCIAL_LINKS.facebook, color: "hover:text-blue-600 hover:bg-blue-50" },
                            { icon: Globe, href: SOCIAL_LINKS.website, color: "hover:text-brand-blue hover:bg-blue-50" },
                            { icon: Linkedin, href: SOCIAL_LINKS.linkedin, color: "hover:text-blue-700 hover:bg-blue-50" },
                            { icon: "tiktok", href: SOCIAL_LINKS.tiktok, color: "hover:text-black hover:bg-gray-100" }
                        ]
                        .filter(social => social.href && social.href !== "")
                        .map((social, i) => (
                            <a 
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-3 text-slate-400 ${social.color} rounded-xl transition-all duration-300 hover:scale-125 hover:shadow-md active:scale-95`}
                                style={{ transitionDelay: `${i * 50}ms` }}
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

                {/* Section Services */}
                <div className="px-6 pb-6">
                    <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-4 ml-1 flex items-center gap-2 animate-slide-up-fade delay-500 opacity-0" style={{ animationFillMode: 'forwards' }}>
                        <span className="w-8 h-[2px] bg-slate-200 rounded-full"></span>
                        Nos Services
                    </h3>
                    <div className="space-y-3">
                        {SERVICES.map((service, idx) => (
                            <div 
                                key={idx} 
                                className="group bg-white/60 hover:bg-white p-3.5 rounded-2xl flex items-center gap-4 transition-all duration-300 border border-transparent hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5 cursor-default hover:-translate-x-1 animate-slide-up-fade opacity-0"
                                style={{ animationDelay: `${600 + (idx * 150)}ms`, animationFillMode: 'forwards' }}
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-brand-blue flex items-center justify-center shadow-sm shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                    <service.icon size={18} strokeWidth={2} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-brand-blue transition-colors">{service.title}</h4>
                                    <p className="text-[11px] text-slate-500 truncate">{service.description}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                    <ArrowUpRight size={14} className="text-brand-blue" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 bg-white/50 backdrop-blur-md border-t border-white/50 flex gap-3 animate-slide-up-fade opacity-0" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
                    <button 
                        onClick={handleDownloadVCard}
                        className="flex-1 bg-brand-dark text-white text-sm font-bold py-4 rounded-2xl shadow-xl shadow-brand-dark/20 hover:bg-slate-800 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group overflow-hidden relative"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <Download size={18} className="group-hover:animate-bounce" />
                        <span>Enregistrer</span>
                    </button>
                    <button 
                        onClick={handleShare}
                        className="w-16 bg-white text-slate-700 border border-white/60 py-4 rounded-2xl shadow-sm hover:bg-slate-50 hover:text-brand-blue hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center group"
                    >
                        <Share2 size={20} className="group-hover:rotate-12 transition-transform" />
                    </button>
                </div>
            </div>
            
            <p className="text-center text-[10px] text-slate-400 mt-6 font-medium tracking-wide opacity-0 animate-slide-up-fade" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
                iVision Agency © {new Date().getFullYear()}
            </p>
        </div>
    </div>
  );
}

export default App;