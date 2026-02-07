import { LayoutDashboard, Megaphone, BarChart3, Globe, PenTool, Smartphone } from 'lucide-react';

// Contact Information
export const CONTACT_INFO = {
  phone: "+33 6 12 34 56 78", // Placeholder phone
  email: "contact@ivision-agency.com", // Placeholder email
  address: "123 Avenue du Numérique, 75001 Paris, France",
  whatsapp: "https://wa.me/33612345678",
};

// Social Media Links
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/ivisionagency",
  linkedin: "https://linkedin.com/company/ivisionagency",
  facebook: "https://facebook.com/ivisionagency",
  twitter: "https://twitter.com/ivisionagency",
};

// Logo URL (Using the uploaded logo logic - assuming user replaces this or uses the one they have)
// Ideally, the user would host the image they uploaded. For now, I will use a variable they can swap.
// Since I cannot reference the local upload directly in code without a URL, I will use a placeholder 
// that mimics the style or allow them to paste the URL.
export const LOGO_URL = "https://i.imgur.com/8Qj9K9s.png"; // Based on the user prompt's visual context if available, otherwise generic.

// Services Data
export const SERVICES = [
  {
    title: "Stratégie Digitale",
    description: "Des plans sur mesure pour positionner votre marque et atteindre vos objectifs commerciaux.",
    icon: LayoutDashboard,
  },
  {
    title: "Gestion des Réseaux Sociaux",
    description: "Engagez votre communauté avec du contenu créatif et une gestion proactive sur Instagram, LinkedIn et TikTok.",
    icon: Smartphone,
  },
  {
    title: "Publicité en Ligne (Ads)",
    description: "Campagnes Facebook, Instagram et Google Ads optimisées pour un ROI maximal.",
    icon: Megaphone,
  },
  {
    title: "Création de Site Web",
    description: "Sites vitrines et e-commerce modernes, rapides et optimisés pour le référencement (SEO).",
    icon: Globe,
  },
  {
    title: "Branding & Design",
    description: "Identité visuelle forte, logos et chartes graphiques qui marquent les esprits.",
    icon: PenTool,
  },
  {
    title: "SEO & Analyse",
    description: "Améliorez votre visibilité sur Google et suivez vos performances avec des rapports détaillés.",
    icon: BarChart3,
  },
];