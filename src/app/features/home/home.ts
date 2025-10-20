import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map, shareReplay } from 'rxjs';
import { Header } from '../../core/components/header/header';
import { Footer } from '../../core/components/footer/footer';
import { HeroCarousel } from './components/hero-carousel/hero-carousel';
import { ContentService } from '../../shared/content.service';
import { fadeIn, listStagger } from '../../shared/animation';
import { GalleryItem, HomeContent, Client, RecentProject } from '../../shared/types';
import { TypewriterDirective } from '../../shared/directives/typewriter.directive';
import { AnimateCounterDirective } from '../../shared/directives/animate-counter.directive';
import { RevealOnScroll } from '../../shared/directives/reveal-on-scroll';

interface Stat {
  value: string;
  label: string;
  detail?: string;
}

interface FocusArea {
  badge: string;
  title: string;
  copy: string;
}

interface Highlight {
  title: string;
  detail: string;
}

interface Phase {
  title: string;
  copy: string;
  points: string[];
}

@Component({
  selector: 'app-home',
  imports: [
    Footer,
    NgIf,
    NgForOf,
    AsyncPipe,
    RouterLink,
    TypewriterDirective,
    AnimateCounterDirective,
    RevealOnScroll
  ],
  animations: [fadeIn, listStagger],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {
  private readonly content = inject(ContentService);

  readonly home$ = this.content.home$;

  readonly stats: ReadonlyArray<Stat> = [
    {
      value: '1983',
      label: 'Year founded',
      detail: 'Four decades shaping Bangladesh project logistics and industrial support.'
    },
    {
      value: '24/7',
      label: 'Operations coverage',
      detail: 'Dhaka HQ, Chattogram branch and mobile crews coordinate every movement.'
    },
    {
      value: '400+',
      label: 'Heavy moves executed',
      detail: 'Energy, power and industrial assets delivered door-to-door nationwide.'
    },
    {
      value: 'ISO',
      label: 'Integrated management',
      detail: 'Safety-led execution backed by IMS certifications and rigorous training.'
    }
  ];

  readonly focusAreas: ReadonlyArray<FocusArea> = [
    {
      badge: '01',
      title: 'Project logistics leadership',
      copy: 'Route intelligence, lift studies and mobilisation programmes built by in-house engineers.'
    },
    {
      badge: '02',
      title: 'Heavy transport & lifting',
      copy: 'Hydraulic trailers, crawler cranes and rigging crews ready for oversized cargo.'
    },
    {
      badge: '03',
      title: 'Customs & compliance',
      copy: 'Own shipping and clearing licenses keep cargo moving across ports and borders.'
    },
    {
      badge: '04',
      title: 'Workforce & site services',
      copy: 'Certified manpower, warehousing and on-site commissioning support under one programme.'
    }
  ];

  readonly highlights: ReadonlyArray<Highlight> = [
    {
      title: 'Nationwide coverage',
      detail: 'Ports, river terminals and industrial hubs served with local staging yards.'
    },
    {
      title: 'Energy projects delivered',
      detail: 'LNG terminals, grid expansions and refinery upgrades executed end-to-end.'
    },
    {
      title: 'Fleet readiness',
      detail: 'Multi-axle trailers, cranes and support equipment maintained in-house.'
    },
    {
      title: 'Client partners',
      detail: 'EPCs, OEMs and operators rely on Shamolima for critical logistics programmes.'
    }
  ];

  readonly phases: ReadonlyArray<Phase> = [
    {
      title: 'Scope & plan',
      copy: 'Kick off with feasibility studies, corridor surveys and lift engineering tailored to your cargo.',
      points: [
        'Digital route mapping and geotechnical checks',
        'Rigging studies, stability checks and lift diagrams',
        'Multi-agency permitting roadmap with risk registers'
      ]
    },
    {
      title: 'Mobilise assets',
      copy: 'Stage specialised equipment, experienced crews and spares while compliance stays ahead.',
      points: [
        'Hydraulic trailers, cranes and SPMTs dispatched with escorts',
        'Temporary works fabrication and staging yard readiness',
        'IMS-driven toolbox talks and emergency drills'
      ]
    },
    {
      title: 'Execute & monitor',
      copy: 'Live dashboards, route marshals and QHSE checkpoints keep every move controlled.',
      points: [
        'On-site supervisors and lift directors with comms link',
        'Telemetry, weather watch and load monitoring 24/7',
        'Client updates with visuals and KPI scorecards'
      ]
    },
    {
      title: 'Handover & support',
      copy: 'Close out with reinstatement, documentation and crews ready for commissioning tasks.',
      points: [
        'As-built dossiers and photographic records delivered',
        'Site reinstatement and third-party inspections managed',
        'Standby crews for alignment, testing and ramp-up'
      ]
    }
  ];

  readonly heroTags: ReadonlyArray<string> = [
    'Project logistics',
    'Heavy haulage',
    'Customs clearance',
    'Equipment rental'
  ];

  readonly aboutSnippet$ = this.home$.pipe(map((home: HomeContent) => home.aboutSnippet));
  readonly certificates$ = this.home$.pipe(map((home: HomeContent) => home.certificates ?? []));

  readonly galleryItems$ = this.content.gallery$
    .pipe(
      map(gallery => gallery?.items ?? []),
      shareReplay(1)
    );

  readonly spotlight$ = this.galleryItems$.pipe(
    map(items => items.slice(0, 6))
  );

  spotlightIndex = 0;
  private spotlightCount = 0;
  private autoplayHandle: any = null;
  private autoplayPaused = false;
  private spotlightSub: any = null;
  nextSpotlight(total?: number) {
    const count = total ?? 0;
    if (!count) return;
    this.spotlightIndex = (this.spotlightIndex + 1) % count;
  }
  prevSpotlight(total?: number) {
    const count = total ?? 0;
    if (!count) return;
    this.spotlightIndex = (this.spotlightIndex - 1 + count) % count;
  }

  pauseAutoplay() {
    this.autoplayPaused = true;
    if (this.autoplayHandle) {
      clearInterval(this.autoplayHandle);
      this.autoplayHandle = null;
    }
  }

  resumeAutoplay() {
    this.autoplayPaused = false;
    this.startAutoplay();
  }

  private startAutoplay() {
    if (this.autoplayPaused) return;
    if (this.autoplayHandle) {
      clearInterval(this.autoplayHandle);
      this.autoplayHandle = null;
    }
    if (this.spotlightCount < 2) return;
    this.autoplayHandle = setInterval(() => {
      this.nextSpotlight(this.spotlightCount);
    }, 5000);
  }

  // Hero carousel
  heroSlideIndex = 0;
  private heroCarouselHandle: any = null;

  ngOnInit() {
    this.spotlightSub = this.spotlight$.subscribe(slides => {
      this.spotlightCount = slides?.length ?? 0;
      if (this.spotlightCount > 0) {
        this.spotlightIndex = this.spotlightIndex % this.spotlightCount;
      } else {
        this.spotlightIndex = 0;
      }
      this.startAutoplay();
    });

    // Start hero carousel
    this.startHeroCarousel();
  }

  ngOnDestroy() {
    if (this.spotlightSub) {
      this.spotlightSub.unsubscribe?.();
      this.spotlightSub = null;
    }
    if (this.autoplayHandle) {
      clearInterval(this.autoplayHandle);
      this.autoplayHandle = null;
    }
    if (this.heroCarouselHandle) {
      clearInterval(this.heroCarouselHandle);
      this.heroCarouselHandle = null;
    }
  }

  setHeroSlide(index: number) {
    this.heroSlideIndex = index;
    // Reset autoplay when user manually changes slide
    if (this.heroCarouselHandle) {
      clearInterval(this.heroCarouselHandle);
      this.startHeroCarousel();
    }
  }

  private startHeroCarousel() {
    this.heroCarouselHandle = setInterval(() => {
      this.heroSlideIndex = (this.heroSlideIndex + 1) % 3;
    }, 5000); // Change every 5 seconds
  }


  readonly contactEmail$ = this.content.contact$.pipe(
    map(contact =>
      contact?.operationOffice?.email ??
      contact?.headOffice?.email ??
      contact?.branchOffice?.email ??
      'info@shamolima.com'
    )
  );

  // New: clients and recent projects
  readonly clients$ = this.content.clients$; // Client[]
  readonly recentProjects$ = this.content.recentProjects$; // RecentProject[]

  trackByFocus = (_: number, item: FocusArea) => item.badge;

  trackByHighlight = (_: number, item: Highlight) => item.title;

  trackByPhase = (_: number, item: Phase) => item.title;

  trackByTag = (_: number, tag: string) => tag;

  trackByImage = (_: number, item: GalleryItem) => item.image;

  trackByUrl = (_: number, url: string) => url;

  trackByClient = (_: number, c: Client) => c.name;
  trackByProject = (_: number, p: RecentProject) => p.title;
}
