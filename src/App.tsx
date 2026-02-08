import React from 'react';
import { 
  Phone, Mail, MapPin, Share2, Download, 
  Instagram, Linkedin, Facebook, MessageCircle, ArrowUpRight, Globe,
  LayoutDashboard, Megaphone, PenTool
} from 'lucide-react';

// Données inlinées pour éviter les erreurs de chargement
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
  website: "https://website-i-vision.vercel.app/",
};

const LOGO_URL = "https://i.ibb.co/zHJBDrDT/i-VISIONLOGO.png";

const SERVICES = [
  {
    title: "Marketing digital complet",
    description: "Stratégie 360° pour booster votre visibilité.",
    icon: LayoutDashboard,
  },
  {
    title: "Création de contenu",
    description: "Design & Vidéo pour captiver votre audience.",
    icon: PenTool,
  },
  {
    title: "Sponsoring Meta Ads",
    description: "Campagnes ROIstes Facebook & Instagram.",
    icon: Megaphone,
  },
  {
    title: "Website & E-commerce",
    description: "Sites web performants et modernes.",
    icon: Globe,
  },
];

function App() {
  const handleDownloadVCard = () => {
    try {
      // 1. Préparation des données
      const cleanPhone = CONTACT_INFO.phone.replace(/[^\d+]/g, '');
      const revDate = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

      // 2. Construction de la vCard (Format V3.0 compatible iOS/Android)
      // Utilisation de \r\n pour respecter la norme RFC et compatibilité mobile
      const vcardRows = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'FN:iVision Agency',
        'N:Agency;iVision;;;',
        'ORG:iVision Agency',
        'TITLE:Agence Marketing Digital',
        `TEL;TYPE=WORK,VOICE:${cleanPhone}`,
        `EMAIL;TYPE=WORK:${CONTACT_INFO.email}`,
        `URL;TYPE=WORK:${SOCIAL_LINKS.website}`,
        `ADR;TYPE=WORK:;;${CONTACT_INFO.address.replace(/,/g, '\\,')};;;;`,
        `NOTE:Marketing Digital • Branding • Ads • Web`,
        `REV:${revDate}`,
        'END:VCARD'
      ];

      const vcardString = vcardRows.join('\r\n');
      const blob = new Blob([vcardString], { type: 'text/vcard;charset=utf-8' });
      
      // 3. Téléchargement robuste
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'iVision-Contact.vcf');
      document.body.appendChild(link);
      link.click();
      
      // 4. Nettoyage avec délai plus long pour mobile
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 3000); // 3 secondes pour assurer que le téléchargement démarre sur mobile
    } catch (error) {
      console.error("Erreur vCard:", error);
      alert("Erreur lors du téléchargement. Réessayez.");
    }
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
        console.log('Partage annulé');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié !');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center p-4 font-sans overflow-hidden text-slate-900">
        
        {/* Arrière-plan animé fluide */}
        <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Carte Principale */}
        <div className="w-full max-w-sm z-10 animate-fade-up my-4">
            <div className="backdrop-blur-2xl bg-white/80 rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/60 overflow-hidden relative">
                
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
                    <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="flex flex-col items-center gap-2 group transition-transform hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                            <Phone size={22} strokeWidth={2} />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-800">Appel</span>
                    </a>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="flex flex-col items-center gap-2 group transition-transform hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                            <Mail size={22} strokeWidth={2} />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-800">Email</span>
                    </a>
                    <a href={CONTACT_INFO.whatsapp} className="flex flex-col items-center gap-2 group transition-transform hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                            <MessageCircle size={22} strokeWidth={2} />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-800">Chat</span>
                    </a>
                    <a href={`https://maps.google.com/?q=${CONTACT_INFO.address}`} className="flex flex-col items-center gap-2 group transition-transform hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                            <MapPin size={22} strokeWidth={2} />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 group-hover:text-slate-800">Plan</span>
                    </a>
                </div>

                {/* Social Bar */}
                <div className="px-6 mb-8">
                    <div className="bg-slate-50/80 rounded-2xl p-2 flex justify-center gap-4 items-center backdrop-blur-sm">
                        <a href={SOCIAL_LINKS.instagram} className="p-3 text-slate-400 hover:text-pink-600 hover:bg-white rounded-xl transition-all duration-300 transform hover:scale-110">
                            <Instagram size={20} strokeWidth={2.5} />
                        </a>
                        <a href={SOCIAL_LINKS.facebook} className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all duration-300 transform hover:scale-110">
                            <Facebook size={20} strokeWidth={2.5} />
                        </a>
                        <a href={SOCIAL_LINKS.website} className="p-3 text-slate-400 hover:text-brand-blue hover:bg-white rounded-xl transition-all duration-300 transform hover:scale-110">
                            <Globe size={20} strokeWidth={2.5} />
                        </a>
                        {SOCIAL_LINKS.linkedin && (
                            <a href={SOCIAL_LINKS.linkedin} className="p-3 text-slate-400 hover:text-blue-700 hover:bg-white rounded-xl transition-all duration-300 transform hover:scale-110">
                                <Linkedin size={20} strokeWidth={2.5} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Services */}
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