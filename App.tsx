import React, { useState, useEffect, useRef } from 'react';
import { CONTACT_INFO, SOCIAL_LINKS, LOGO_URL } from './constants';
import { AppData } from './types';
import { 
  Phone, Mail, MapPin, Globe, 
  Instagram, Linkedin, Facebook, Twitter, 
  MessageCircle, ExternalLink, ChevronRight, Share2,
  Lock, Save, RotateCcw, X, Edit3, Image as ImageIcon,
  Palette, Type, EyeOff, Download
} from 'lucide-react';

// --- DEFAULT DATA (Factory Settings) ---
const DEFAULT_DATA: AppData = {
  companyName: "iVision Agency",
  tagline: "Agence Marketing Digital",
  description: "Nous propulsons votre marque avec des stratégies digitales innovantes.",
  logoUrl: LOGO_URL,
  contact: {
    phone: CONTACT_INFO.phone,
    email: CONTACT_INFO.email,
    address: CONTACT_INFO.address,
    whatsapp: CONTACT_INFO.whatsapp,
  },
  social: {
    instagram: SOCIAL_LINKS.instagram,
    linkedin: SOCIAL_LINKS.linkedin,
    facebook: SOCIAL_LINKS.facebook,
    twitter: SOCIAL_LINKS.twitter,
    website: "https://ivision-agency.com",
  },
  colors: {
    primary: '#2563EB', // Default Blue
  }
};

const ADMIN_PIN = "0000"; // Default PIN

function App() {
  // --- STATE ---
  const [data, setData] = useState<AppData>(DEFAULT_DATA);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  
  // Secret Sequence State
  const [secretSequence, setSecretSequence] = useState<string[]>([]);

  // --- INITIALIZATION ---
  useEffect(() => {
    const savedData = localStorage.getItem('ivision_card_data');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  // --- HANDLERS ---

  // Secret Access Logic: 3-Step Sequence
  // New Sequence: Logo -> Logo -> Share
  useEffect(() => {
    if (secretSequence.length > 0) {
      const timer = setTimeout(() => {
        setSecretSequence([]);
      }, 2000); // 2 seconds to complete the next step
      return () => clearTimeout(timer);
    }
  }, [secretSequence]);

  const handleSecretTap = (zone: string) => {
    const TARGET_SEQ = ['logo', 'logo', 'share'];
    const newSeq = [...secretSequence, zone];
    
    // Check if the added step matches the expected step at that index
    if (zone === TARGET_SEQ[newSeq.length - 1]) {
      setSecretSequence(newSeq);
      
      if (newSeq.length === TARGET_SEQ.length) {
        setShowPinModal(true);
        setSecretSequence([]);
      }
    } else {
      // If wrong step, reset. 
      // But if the zone matches the start of the sequence, start over with that zone
      setSecretSequence(zone === TARGET_SEQ[0] ? [zone] : []);
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setShowPinModal(false);
      setIsAdminOpen(true);
      setPinInput("");
    } else {
      alert("Code PIN incorrect");
      setPinInput("");
    }
  };

  const handleSave = () => {
    localStorage.setItem('ivision_card_data', JSON.stringify(data));
    alert("Modifications sauvegardées !");
    setIsAdminOpen(false);
  };

  const handleReset = () => {
    if (window.confirm("Voulez-vous vraiment remettre les paramètres par défaut ?")) {
      setData(DEFAULT_DATA);
      localStorage.removeItem('ivision_card_data');
      setIsAdminOpen(false);
    }
  };

  const updateField = (section: keyof AppData, field: string | null, value: string) => {
    setData(prev => {
      if (field && typeof prev[section] === 'object') {
        return {
          ...prev,
          [section]: {
            ...prev[section] as any,
            [field]: value
          }
        };
      }
      return {
        ...prev,
        [section]: value
      };
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.companyName,
          text: data.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      alert("Lien copié dans le presse-papier !");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${data.companyName}
ORG:${data.companyName}
TITLE:${data.tagline}
TEL;TYPE=WORK,VOICE:${data.contact.phone}
EMAIL;TYPE=WORK:${data.contact.email}
URL:${data.social.website || window.location.href}
ADR;TYPE=WORK:;;${data.contact.address};;;;
NOTE:${data.description}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${data.companyName.replace(/\s+/g, '_')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans p-4 md:p-6 transition-colors duration-500"
         style={{ '--brand-color': data.colors.primary } as React.CSSProperties}>
      
      {/* --- PIN MODAL --- */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl border border-gray-100">
            <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform rotate-3">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Accès Sécurisé</h2>
            <p className="text-gray-500 text-sm mb-8">Zone d'administration</p>
            <form onSubmit={handlePinSubmit}>
              <input
                type="password"
                inputMode="numeric"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center text-4xl tracking-[0.5em] font-bold border-b-2 border-gray-200 focus:border-gray-900 outline-none py-4 mb-8 bg-transparent transition-colors placeholder:text-gray-200"
                placeholder="••••"
                maxLength={4}
                autoFocus
              />
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setShowPinModal(false)} className="py-4 text-gray-600 font-bold hover:bg-gray-50 rounded-xl transition-colors">Annuler</button>
                <button type="submit" className="py-4 bg-gray-900 text-white font-bold rounded-xl shadow-xl hover:scale-[1.02] transition-transform">Entrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADMIN PANEL OVERLAY --- */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-40 bg-gray-50/50 backdrop-blur-xl overflow-y-auto animate-in slide-in-from-bottom duration-300">
          <div className="max-w-2xl mx-auto min-h-screen bg-white shadow-2xl border-x border-gray-100">
            {/* Admin Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 p-4 flex justify-between items-center z-50">
              <h2 className="font-bold text-lg flex items-center gap-2 text-gray-900">
                <div className="w-8 h-8 bg-[var(--brand-color)] rounded-lg flex items-center justify-center text-white">
                    <Edit3 size={16} />
                </div>
                Éditeur
              </h2>
              <div className="flex gap-2">
                <button onClick={handleReset} className="p-2.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors" title="Réinitialiser">
                  <RotateCcw size={20} />
                </button>
                <button onClick={() => setIsAdminOpen(false)} className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Editor Content */}
            <div className="p-6 space-y-10 pb-40">
              
              {/* Branding Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 text-gray-900 font-bold text-lg border-b border-gray-100 pb-2">
                    <ImageIcon className="text-[var(--brand-color)]" size={20} />
                    <h3>Identité & Visuel</h3>
                </div>
                
                <div className="space-y-5">
                  <div className="grid gap-1.5">
                    <InputLabel label="Nom de l'entreprise" />
                    <input 
                      value={data.companyName} 
                      onChange={(e) => updateField('companyName', null, e.target.value)}
                      className="admin-input" 
                    />
                  </div>
                  
                  <div className="grid gap-1.5">
                    <InputLabel label="Slogan" />
                    <input 
                      value={data.tagline} 
                      onChange={(e) => updateField('tagline', null, e.target.value)}
                      className="admin-input" 
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <InputLabel label="Bio / Description" />
                    <textarea 
                      value={data.description} 
                      onChange={(e) => updateField('description', null, e.target.value)}
                      className="admin-input min-h-[100px]" 
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <InputLabel label="Lien du Logo" />
                    <div className="flex gap-3 items-start">
                      <div className="w-16 h-16 rounded-2xl border border-gray-200 overflow-hidden bg-gray-50 flex-shrink-0 p-1">
                        <img src={data.logoUrl} className="w-full h-full object-cover rounded-xl" alt="Preview" />
                      </div>
                      <input 
                        value={data.logoUrl} 
                        onChange={(e) => updateField('logoUrl', null, e.target.value)}
                        className="admin-input flex-1"
                        placeholder="https://..." 
                      />
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <InputLabel label="Couleur de marque" />
                    <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-200">
                       <input 
                        type="color"
                        value={data.colors.primary} 
                        onChange={(e) => updateField('colors', 'primary', e.target.value)}
                        className="h-10 w-14 rounded-lg cursor-pointer border-0 p-0"
                      />
                      <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Couleur Principale</p>
                          <p className="text-xs text-gray-500 font-mono uppercase">{data.colors.primary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 text-gray-900 font-bold text-lg border-b border-gray-100 pb-2">
                    <Phone className="text-[var(--brand-color)]" size={20} />
                    <h3>Coordonnées</h3>
                </div>
                <div className="grid gap-5">
                   <div className="grid gap-1.5">
                      <InputLabel label="Téléphone" />
                      <input value={data.contact.phone} onChange={(e) => updateField('contact', 'phone', e.target.value)} className="admin-input" />
                   </div>
                   <div className="grid gap-1.5">
                      <InputLabel label="Email" />
                      <input value={data.contact.email} onChange={(e) => updateField('contact', 'email', e.target.value)} className="admin-input" />
                   </div>
                   <div className="grid gap-1.5">
                      <InputLabel label="Lien WhatsApp" />
                      <input value={data.contact.whatsapp} onChange={(e) => updateField('contact', 'whatsapp', e.target.value)} className="admin-input" placeholder="https://wa.me/..." />
                   </div>
                   <div className="grid gap-1.5">
                      <InputLabel label="Adresse Physique" />
                      <input value={data.contact.address} onChange={(e) => updateField('contact', 'address', e.target.value)} className="admin-input" />
                   </div>
                </div>
              </section>

              {/* Social Section */}
              <section className="space-y-6">
                 <div className="flex items-center gap-2 text-gray-900 font-bold text-lg border-b border-gray-100 pb-2">
                    <Globe className="text-[var(--brand-color)]" size={20} />
                    <h3>Liens Sociaux</h3>
                </div>
                <div className="grid gap-4">
                  <SocialInput icon={Instagram} label="Instagram" value={data.social.instagram} onChange={(v) => updateField('social', 'instagram', v)} />
                  <SocialInput icon={Linkedin} label="LinkedIn" value={data.social.linkedin} onChange={(v) => updateField('social', 'linkedin', v)} />
                  <SocialInput icon={Facebook} label="Facebook" value={data.social.facebook} onChange={(v) => updateField('social', 'facebook', v)} />
                  <SocialInput icon={Twitter} label="Twitter / X" value={data.social.twitter} onChange={(v) => updateField('social', 'twitter', v)} />
                  <SocialInput icon={Globe} label="Site Web" value={data.social.website} onChange={(v) => updateField('social', 'website', v)} />
                </div>
              </section>
            </div>

            {/* Floating Save Button */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent z-50">
               <div className="max-w-2xl mx-auto flex justify-center">
                <button 
                    onClick={handleSave}
                    className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 w-full justify-center sm:w-auto"
                >
                    <Save size={20} />
                    Enregistrer les modifications
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN APP VIEW --- */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
        
        {/* Header / Cover */}
        <div className="h-36 relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: data.colors.primary }}>
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent pointer-events-none"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 rounded-full bg-black/10 blur-2xl pointer-events-none"></div>
          
          <button 
            onClick={() => {
              // Secret Code Step 3 logic: Share button is the trigger
              const isSecretTrigger = secretSequence.length === 2 && secretSequence[0] === 'logo' && secretSequence[1] === 'logo';
              
              handleSecretTap('share');
              
              if (!isSecretTrigger) {
                handleShare();
              }
            }}
            className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors z-20"
            aria-label="Partager"
          >
            <Share2 size={18} />
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-10 relative">
            
          {/* Logo Avatar - SECRET TRIGGER 1 & 2 */}
          <div className="relative -mt-16 mb-4 flex justify-center">
            <button 
              onClick={() => handleSecretTap('logo')}
              className="w-32 h-32 rounded-full bg-white p-1.5 shadow-lg ring-4 ring-white/50 focus:outline-none active:scale-95 transition-transform z-20"
              title="Profile"
            >
              <div className="w-full h-full rounded-full bg-gray-50 overflow-hidden flex items-center justify-center border border-gray-100">
                <img 
                  src={data.logoUrl} 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<span class="text-3xl font-heading font-black text-[${data.colors.primary}]">iV</span>`;
                  }}
                />
              </div>
            </button>
          </div>

          {/* Identity */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-bold text-gray-900 flex items-center justify-center gap-2">
              {data.companyName}
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Disponible"></span>
            </h1>
            <p className="font-medium mb-2 transition-colors duration-500" style={{ color: data.colors.primary }}>{data.tagline}</p>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              {data.description}
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            <QuickAction 
              href={`tel:${data.contact.phone}`} 
              icon={Phone} 
              label="Appeler" 
              colorClass="text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white"
            />
            <QuickAction 
              href={`mailto:${data.contact.email}`} 
              icon={Mail} 
              label="Email" 
              colorClass="text-red-600 bg-red-50 hover:bg-red-600 hover:text-white"
            />
            <QuickAction 
              href={data.contact.whatsapp} 
              icon={MessageCircle} 
              label="WhatsApp" 
              colorClass="text-green-600 bg-green-50 hover:bg-green-600 hover:text-white"
            />
            <QuickAction 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.contact.address)}`} 
              icon={MapPin} 
              label="Venir" 
              colorClass="text-purple-600 bg-purple-50 hover:bg-purple-600 hover:text-white"
            />
          </div>

          {/* Links List */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 pl-1">Nos Réseaux & Liens</div>
            
            {data.social.instagram && (
              <LinkCard 
                href={data.social.instagram}
                icon={Instagram}
                label="Instagram"
                brandColor={data.colors.primary}
                gradient="from-pink-500 via-red-500 to-yellow-500"
              />
            )}
            
            {data.social.linkedin && (
              <LinkCard 
                href={data.social.linkedin}
                icon={Linkedin}
                label="LinkedIn"
                brandColor={data.colors.primary}
                gradient="from-blue-700 to-blue-500"
              />
            )}
            
            {data.social.facebook && (
              <LinkCard 
                href={data.social.facebook}
                icon={Facebook}
                label="Facebook"
                brandColor={data.colors.primary}
                gradient="from-blue-600 to-blue-400"
              />
            )}
            
            {data.social.twitter && (
              <LinkCard 
                href={data.social.twitter}
                icon={Twitter}
                label="Twitter / X"
                brandColor={data.colors.primary}
                gradient="from-gray-900 to-gray-700"
              />
            )}

            {data.social.website && (
               <a 
               href={data.social.website} 
               className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md hover:bg-white transition-all duration-300 mt-6"
               style={{ '--hover-color': data.colors.primary } as React.CSSProperties}
             >
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-700 shadow-sm transition-colors group-hover:text-[var(--hover-color)] group-hover:border-[var(--hover-color)]">
                   <Globe size={20} />
                 </div>
                 <div>
                   <h3 className="font-semibold text-gray-900">Site Web Officiel</h3>
                   <p className="text-xs text-gray-500">Visiter notre site</p>
                 </div>
               </div>
               <ExternalLink size={16} className="text-gray-400 transition-colors group-hover:text-[var(--hover-color)]" />
             </a>
            )}
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-100 text-center">
             <button 
                onClick={handleDownloadVCard}
                className="w-full py-3 rounded-xl bg-gray-900 text-white font-medium shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-6"
             >
                <Download size={18} />
                Enregistrer le contact
             </button>
             <p className="text-xs text-gray-400">© {new Date().getFullYear()} {data.companyName}.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

const InputLabel = ({label}: {label: string}) => (
  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
);

const SocialInput = ({icon: Icon, label, value, onChange}: {icon: any, label: string, value: string, onChange: (v: string) => void}) => (
  <div className="relative group">
    <div className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-[var(--brand-color)] transition-colors">
      <Icon size={18} />
    </div>
    <input 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="admin-input pl-10"
      placeholder={`Lien ${label}`}
    />
  </div>
);

const QuickAction = ({ href, icon: Icon, label, colorClass }: { href: string, icon: any, label: string, colorClass: string }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col items-center gap-2 group"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${colorClass}`}>
      <Icon size={20} />
    </div>
    <span className="text-xs font-medium text-gray-600 group-hover:text-black transition-colors">{label}</span>
  </a>
);

const LinkCard = ({ href, icon: Icon, label, subLabel, gradient, brandColor }: { href: string, icon: any, label: string, subLabel?: string, gradient: string, brandColor: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex items-center justify-between p-1.5 pr-4 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-all duration-300"
    style={{ '--brand-hover': brandColor } as React.CSSProperties}
  >
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-sm`}>
        <Icon size={22} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{label}</h3>
        {subLabel && <p className="text-xs text-gray-500">{subLabel}</p>}
      </div>
    </div>
    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 transition-all group-hover:bg-[var(--brand-hover)] group-hover:text-white">
      <ChevronRight size={16} />
    </div>
  </a>
);

// Inject basic styling for admin inputs
const style = document.createElement('style');
style.textContent = `
  .admin-input {
    width: 100%;
    padding: 0.875rem 1rem;
    border-radius: 0.75rem;
    border: 1px solid #e2e8f0;
    background-color: #f8fafc;
    transition: all 0.2s;
    font-size: 0.95rem;
    color: #1e293b;
  }
  .admin-input:focus {
    outline: none;
    border-color: var(--brand-color, #2563EB);
    background-color: #ffffff;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  }
  .admin-input::placeholder {
    color: #94a3b8;
  }
`;
document.head.appendChild(style);

export default App;