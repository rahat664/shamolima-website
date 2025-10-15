export interface SiteInfo { name: string; baseUrl: string; }
export interface HomeContent {
  hero: { headline: string; subhead: string; image: string };
  aboutSnippet: string;
  certificates: string[];
  testimonialsImages?: string[];
}
export interface ServiceListItem { title: string; slug: string; url: string; }
export interface ServicesContent {
  list: ServiceListItem[];
  shippingCustomsBullets?: string[];
  images?: {
    equipmentRental?: string[];
    d2d?: string[];
    powerPlant?: string[];
    lng?: string[];
    oilGas?: string[];
    genericFleet?: string[];
  };
}
export interface AboutContent {
  leaders: string[];
  whatWeDo: string[];
  organogramImage?: string | null;
  pageUrl?: string;
}
export interface QHSEContent {
  goals: string[];
  trainingImages?: string[];
  imsCertificateImage?: string;
  pageUrls?: { goals?: string; training?: string; imsCertificates?: string; };
}
export interface ContactOffice {
  address: string;
  phones: string[];
  email: string;
}
export interface ContactContent {
  operationOffice: ContactOffice;
  headOffice: ContactOffice;
  branchOffice?: ContactOffice;
  chattagramOffice?: ContactOffice;
  pageUrl?: string;
}
export interface GalleryItem { caption: string; image: string; }
export interface GalleryContent {
  workActivitiesPage?: string;
  items: GalleryItem[];
}

export interface RecentProject {
  title: string;
  description: string;
  location: string;
  keyEquipment: string[];
}

export interface Client {
  name: string;
  logo?: string;
}

export interface SiteContent {
  site: SiteInfo;
  home: HomeContent;
  about: AboutContent;
  services: ServicesContent;
  qhse: QHSEContent;
  contact: ContactContent;
  gallery?: GalleryContent;
  clients?: Client[];
  recentProjects?: RecentProject[];
}

export interface Assets {
  logo: string;
  darkLogo?: string;
  imsBadge?: string;
  opcaCertificate?: string;
  isoCertificate?: string;
}

export interface SiteContent {
  site: SiteInfo;
  home: HomeContent;
  about: AboutContent;
  services: ServicesContent;
  qhse: QHSEContent;
  contact: ContactContent;
  gallery?: GalleryContent;
  assets?: Assets; // <-- add
  clients?: Client[];
  recentProjects?: RecentProject[];
}
