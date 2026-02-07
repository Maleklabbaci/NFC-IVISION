export interface Service {
  title: string;
  description: string;
  icon: any; // Using any for icon name string storage in JSON
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
}

export interface SocialLinks {
  instagram: string;
  linkedin: string;
  facebook: string;
  tiktok: string;
  website: string;
}

export interface AppData {
  companyName: string;
  tagline: string;
  description: string;
  logoUrl: string;
  contact: ContactInfo;
  social: SocialLinks;
  colors: {
    primary: string;
  };
}