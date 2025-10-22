export interface SiteInfo { name: string; baseUrl: string; }

export interface UITranslations {
  nav: {
    home: string;
    services: string;
    about: string;
    qhse: string;
    contact: string;
    workActivities: string;
    fleet: string;
    tracking: string;
    quote: string;
  };
  buttons: {
    learnMore: string;
    viewAll: string;
    contactUs: string;
    getQuote: string;
    viewGallery: string;
    readMore: string;
    submitQuote: string;
    trackShipment: string;
    startProjectBrief: string;
    exploreServices: string;
    callProjectDesk: string;
    viewServiceCatalogue: string;
    submitRequest: string;
    sendMessage: string;
    explorCapabilities: string;
    contactOperations: string;
  };
  common: {
    email: string;
    phone: string;
    address: string;
    location: string;
    name: string;
    message: string;
    send: string;
    close: string;
    next: string;
    previous: string;
    loading: string;
    language: string;
  };
  footer: {
    tagline: string;
    callUs: string;
    emailUs: string;
    company: string;
    support: string;
    services: string;
    getQuote: string;
    allRightsReserved: string;
  };
  pages: {
    home: {
      kicker: string;
      heroButtons: {
        startBrief: string;
        exploreServices: string;
      };
      stats: {
        yearsExperience: { value: string; label: string; detail: string; };
        projectsCompleted: { value: string; label: string; detail: string; };
        fleetSize: { value: string; label: string; detail: string; };
        teamSize: { value: string; label: string; detail: string; };
      };
      sections: {
        integratedLogistics: { kicker: string; title: string; };
        whyChoose: string;
        video: { kicker: string; title: string; description: string; };
        spotlight: { kicker: string; title: string; description: string; badge: string; };
        clients: { kicker: string; title: string; tagline: string; };
        howWeDeliver: { kicker: string; title: string; };
        recentProjects: { kicker: string; title: string; badge: string; };
        gallery: { kicker: string; title: string; description: string; note: string; };
      };
      certifications: string;
      needExpertise: string;
      emailPrefix: string;
    };
    quote: {
      kicker: string;
      title: string;
      description: string;
      tags: { heavyLift: string; multimodal: string; customsPorts: string; };
      buttons: { callDesk: string; viewCatalogue: string; };
      stats: {
        responseTime: { value: string; label: string; detail: string; };
        coverage: { value: string; label: string; detail: string; };
      };
      form: {
        namePlaceholder: string;
        emailPlaceholder: string;
        phonePlaceholder: string;
        pickupPlaceholder: string;
        dropoffPlaceholder: string;
        datePlaceholder: string;
        cargoPlaceholder: string;
        notesPlaceholder: string;
        submitButton: string;
        disclaimer: string;
      };
      howItWorks: {
        title: string;
        preferCall: string;
        reachText: string;
      };
      afterSubmission: {
        kicker: string;
        title: string;
        description: string;
        deliverables: {
          title: string;
          route: { title: string; detail: string; };
          equipment: { title: string; detail: string; };
          timeline: { title: string; detail: string; };
        };
      };
    };
    contact: {
      kicker: string;
      title: string;
      description: string;
      tags: { opsDesk: string; dhakaHQ: string; chattagramOffice: string; };
      stats: {
        locations: { value: string; label: string; detail: string; };
        professionals: { value: string; label: string; detail: string; };
        statusUpdates: { value: string; label: string; detail: string; };
      };
      form: {
        namePlaceholder: string;
        emailPlaceholder: string;
        phonePlaceholder: string;
        subjectPlaceholder: string;
        messagePlaceholder: string;
        submitButton: string;
        responseNote: string;
      };
      visitUs: { kicker: string; title: string; };
    };
    tracking: {
      kicker: string;
      title: string;
      description: string;
      tags: { desk: string; alerts: string; visibility: string; };
      stats: {
        status: { value: string; label: string; detail: string; };
        hotline: { value: string; label: string; detail: string; };
      };
      form: {
        trackingIdPlaceholder: string;
        submitButton: string;
        helpText: string;
      };
      assistance: {
        title: string;
        email: { title: string; detail: string; };
        whatsapp: { title: string; detail: string; };
        exception: { title: string; detail: string; };
      };
      dashboards: {
        kicker: string;
        title: string;
        description: string;
        cta: string;
      };
    };
    services: {
      hero: { kicker: string; title: string; description: string };
      tags: { heavyHaulage: string; spmtRigging: string; customsPorts: string; projectSupport: string };
      actions: { planMove: string; talkExpert: string };
      stats: {
        pillars: { label: string; detail: string };
        crawlerCapacity: { label: string; detail: string };
        operationsDesks: { label: string; detail: string };
      };
      capabilities: { kicker: string; title: string; lede: string; cardCopy: string };
      whyItMatters: { kicker: string; title: string; lede: string };
      included: {
        heading: string;
        routeLift: { title: string; detail: string };
        certified: { title: string; detail: string };
        reporting: { title: string; detail: string };
      };
      bundled: { title: string; text: string };
      getStarted: { kicker: string; title: string; lede: string; ctas: { requestQuote: string; talkOps: string } };
    };
    fleet: {
      hero: { kicker: string; title: string; description: string };
      tags: { coveredDeck: string; permitReady: string; gpsTracked: string };
      actions: { requestAvailability: string; exploreEquipmentRental: string };
      stats: {
        payloadRange: { label: string; detail: string };
        coverage: { label: string; detail: string };
      };
      catalogue: { kicker: string; title: string; lede: string };
      trucks: Array<{ name: string; size: string; capacityTons: number }>;
      needSpecialised: { kicker: string; title: string; lede: string };
      dispatch: {
        heading: string;
        dailyAvailability: { title: string; detail: string };
        routeAdvisory: { title: string; detail: string };
        bundledStaffing: { title: string; detail: string };
        cta: string;
      };
    };
    qhse: {
      hero: { kicker: string; title: string; description: string };
      tags: { iso: string; training: string; audits: string; compliance: string };
      actions: { viewGoals: string; trainingFramework: string };
      stats: {
        zero: { label: string; detail: string };
        ims: { label: string; detail: string };
        monitoring: { label: string; detail: string };
      };
      commitments: { kicker: string; title: string };
      training: { kicker: string; title: string };
      certifications: { kicker: string; title: string; lede: string };
      documents: {
        heading: string;
        ims: { title: string; detail: string };
        matrix: { title: string; detail: string };
        erp: { title: string; detail: string };
        downloadIMS: string;
      };
    };
    workActivities: {
      hero: { title: string; lede: string };
      tags: string[];
      stats: Array<{ value: string; label: string; detail?: string }>;
      focusAreas: Array<{ badge: string; title: string; copy: string }>;
      milestones: Array<{ title: string; detail: string }>;
      phases: Array<{ title: string; copy: string; points: string[] }>;
      recentPlaysHeading: string;
      planningCtaTitle: string;
      planningCtaTextPrefix: string;
    };
    logistics: {
      hero: { kicker: string; title: string; description: string };
      viewer: { loading: string; prev: string; next: string };
    };
    serviceSingle: {
      heroKicker: string;
      heroLedePrefix: string;
      heroLedeSuffix: string;
      heroTags: { engineering: string; execution: string; support: string };
      backToServices: string;
      stats: {
        fullScope: { value: string; label: string; detail: string };
        visualRefs: { value: string; label: string; detail: string };
      };
      sidebar: {
        onThisPage: string;
        overview: { title: string; detail: string };
        gallery: { title: string; detail: string };
        scope: { title: string; detail: string };
        cta: string;
      };
      overview: {
        title: string;
        copyPrefix: string;
        copySuffix: string;
        tags: { planning: string; execution: string; support: string };
      };
      gallery: { title: string; subtitle: string; note: string };
      scope: { title: string };
      insight: {
        heading: string;
        combine: { title: string; detail: string };
        share: { title: string; detail: string };
        cta: string;
      };
    };
  };
}
export interface HomeContent {
  hero: { headline: string; subhead: string; image: string };
  heroTags?: string[];
  stats?: Array<{ value: string; label: string; detail?: string }>;
  aboutSnippet: string;
  focusAreas?: Array<{ badge: string; title: string; copy: string }>;
  highlights?: Array<{ title: string; detail: string }>;
  phases?: Array<{ title: string; copy: string; points: string[] }>;
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
  hero: {
    title: string;
    description: string;
    backgroundImage: string;
  };
  timeline: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  leadersTitle?: string;
  leadersHeading?: string;
  leadersDescription?: string;
  customsBrokerage: {
    title: string;
    tagline: string;
    bullets: string[];
  };
  comprehensiveServices: Array<{
    title: string;
    description: string;
  }>;
  freightForwarding: {
    title: string;
    description: string;
    services: Array<{
      title: string;
      description: string;
    }>;
  };
  advantagesTitle?: string;
  advantagesSubheading?: string;
  advantages: Array<{
    title: string;
    description: string;
  }>;
  footerCta?: { title: string; subtitle: string; buttonLabel: string };
  leaders: string[];
  whatWeDo: string[];
  pageIntro?: string;
  missionStatement?: string;
  values?: Array<{
    title: string;
    description: string;
  }>;
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
  lat?: number; // optional latitude for map
  lng?: number; // optional longitude for map
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
  ui: UITranslations;
  home: HomeContent;
  about: AboutContent;
  services: ServicesContent;
  qhse: QHSEContent;
  contact: ContactContent;
  gallery?: GalleryContent;
  assets?: Assets;
  clients?: Client[];
  recentProjects?: RecentProject[];
}
