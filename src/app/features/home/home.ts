import { Component, OnDestroy, OnInit, AfterViewInit, inject } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
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
    AnimateCounterDirective,
    RevealOnScroll,
    NgOptimizedImage
  ],
  animations: [fadeIn, listStagger],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  private readonly content = inject(ContentService);

  readonly home$ = this.content.home$;
  readonly ui$ = this.content.ui$;

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

  // Certificates carousel
  certIndex = 0;
  private certCount = 0;
  private certAutoplayHandle: any = null;
  private certSub: any = null;
  private certTouchStartX = 0;

  nextCert(total?: number) {
    const count = total ?? this.certCount;
    if (!count) return;
    this.certIndex = (this.certIndex + 1) % count;
  }

  prevCert(total?: number) {
    const count = total ?? this.certCount;
    if (!count) return;
    this.certIndex = (this.certIndex - 1 + count) % count;
  }

  pauseCertAutoplay() {
    if (this.certAutoplayHandle) {
      clearInterval(this.certAutoplayHandle);
      this.certAutoplayHandle = null;
    }
  }

  resumeCertAutoplay() {
    this.startCertAutoplay();
  }

  ngOnInit() {
    this.spotlightSub = this.spotlight$.subscribe(slides => {
      this.spotlightCount = slides?.length ?? 0;
      if (this.spotlightCount > 0) {
        this.spotlightIndex = this.spotlightIndex % this.spotlightCount;
      } else {
        this.spotlightIndex = 0;
      }
      setTimeout(() => this.startAutoplay());
    });

    // Start hero carousel after view init
    this.certSub = this.certificates$.subscribe(list => {
      this.certCount = list?.length ?? 0;
      if (this.certCount > 0) {
        this.certIndex = this.certIndex % this.certCount;
      } else {
        this.certIndex = 0;
      }
      setTimeout(() => this.startCertAutoplay());
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.startHeroCarousel());
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
    if (this.certAutoplayHandle) {
      clearInterval(this.certAutoplayHandle);
      this.certAutoplayHandle = null;
    }
    if (this.certSub) {
      this.certSub.unsubscribe?.();
      this.certSub = null;
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
    if (this.prefersReducedMotion() || this.isSmallScreen()) return;
    this.heroCarouselHandle = setInterval(() => {
      this.heroSlideIndex = (this.heroSlideIndex + 1) % 3;
    }, 7000); // Longer interval, less CPU
  }

  private startCertAutoplay() {
    if (this.prefersReducedMotion()) return;
    if (this.certAutoplayHandle) {
      clearInterval(this.certAutoplayHandle);
      this.certAutoplayHandle = null;
    }
    if (this.certCount < 2) return;
    this.certAutoplayHandle = setInterval(() => {
      this.nextCert(this.certCount);
    }, 6000);
  }

  setCert(index: number, total?: number) {
    const count = total ?? this.certCount;
    if (!count) return;
    this.certIndex = ((index % count) + count) % count;
    this.startCertAutoplay();
  }

  onCertTouchStart(e: TouchEvent) {
    try { this.certTouchStartX = e.changedTouches?.[0]?.clientX ?? 0; } catch { this.certTouchStartX = 0; }
  }

  onCertTouchEnd(e: TouchEvent) {
    const endX = e.changedTouches?.[0]?.clientX ?? 0;
    const dx = endX - this.certTouchStartX;
    const threshold = 30;
    if (Math.abs(dx) > threshold) {
      if (dx > 0) this.prevCert(this.certCount); else this.nextCert(this.certCount);
    }
  }

  onCertKey(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.prevCert(this.certCount);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.nextCert(this.certCount);
    }
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

  thumbFor(url: string): string {
    // Use original images directly without optimization
    return url;
  }

  getCertificateAlt(index: number): string {
    const names = ['IMS Badge', 'OPCA Certificate', 'ISO Certificate'];
    return names[index] || 'Certification';
  }

  private prefersReducedMotion(): boolean {
    try { return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
  }
  private isSmallScreen(): boolean {
    try { return typeof window !== 'undefined' && window.matchMedia('(max-width: 480px)').matches; } catch { return false; }
  }
}
