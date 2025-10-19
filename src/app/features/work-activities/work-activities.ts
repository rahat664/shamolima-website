import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Observable, combineLatest, map, shareReplay } from 'rxjs';
import { Header } from '../../core/components/header/header';
import { PageHeroCarousel } from '../../shared/components/page-hero-carousel/page-hero-carousel';
import { Footer } from '../../core/components/footer/footer';
import { fadeIn, listStagger } from '../../shared/animation';
import { ContentService } from '../../shared/content.service';
import { GalleryItem } from '../../shared/types';

type LegacyGalleryItem = { src?: string; caption?: string | null };

type Stat = { value: string; label: string; detail?: string };
type FocusArea = { badge: string; title: string; copy: string };
type Milestone = { title: string; detail: string };
type Phase = { title: string; copy: string; points: string[] };

@Component({
  selector: 'app-work-activities',
  imports: [ Footer, NgForOf, AsyncPipe, NgIf, RouterLink, PageHeroCarousel],
  animations: [fadeIn, listStagger],
  templateUrl: './work-activities.html',
  styleUrl: './work-activities.scss'
})
export class WorkActivities implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private content = inject(ContentService);

  readonly stats: ReadonlyArray<Stat> = [
    {
      value: '25+',
      label: 'Years leading heavy lift & transport in Bangladesh',
      detail: 'Deep experience across ports, refineries, LNG terminals and grid upgrades.'
    },
    {
      value: '420+',
      label: 'Complex rigging & haulage moves executed',
      detail: 'Crawler cranes, gantries, SPMTs and hydraulic trailers mobilised for critical cargo.'
    },
    {
      value: '1,200 km+',
      label: 'Route surveys & corridor readiness delivered',
      detail: 'Road strengthening, barge studies and multimodal logistics engineered in-house.'
    },
    {
      value: '24/7',
      label: 'Field supervision & maintenance coverage',
      detail: 'Execution teams backed by mechanics, riggers and compliance specialists on rotation.'
    }
  ];

  readonly focusAreas: ReadonlyArray<FocusArea> = [
    {
      badge: '01',
      title: 'Pre-project intelligence',
      copy: 'Feasibility studies, corridor assessments and digital twins that de-risk every move before mobilisation.'
    },
    {
      badge: '02',
      title: 'Lift engineering',
      copy: 'Autodesk lift plans, rigging studies and SPMT calculations signed-off by certified engineers.'
    },
    {
      badge: '03',
      title: 'Integrated transport',
      copy: 'Heavy trailers, barges, staging yards and customs clearance orchestrated as one programme.'
    },
    {
      badge: '04',
      title: 'Site execution',
      copy: 'Erection crews, alignment teams and commissioning support that stay on-site until handover.'
    }
  ];

  readonly milestoneList: ReadonlyArray<Milestone> = [
    {
      title: 'Water bath heater install',
      detail: '150T crawler crane lift-in and tie-in for a gas processing facility in Narayanganj.'
    },
    {
      title: 'Heat exchanger haul',
      detail: '80T exchanger transported door-to-door on multi-axle trailers with escorted convoys.'
    },
    {
      title: 'Transformer relocation',
      detail: 'SPMT roll-off and precision placement for a grid substation expansion in the north zone.'
    },
    {
      title: 'LNG terminal modules',
      detail: 'Jetty-to-site multimodal delivery with barge handling, staging yard and final alignment.'
    }
  ];

  readonly deliveryPhases: ReadonlyArray<Phase> = [
    {
      title: 'Scope & design',
      copy: 'We kick off with feasibility studies, corridor intelligence and engineered lift studies tailored to your cargo envelope.',
      points: [
        'Concept studies, risk registers and stakeholder alignment workshops',
        'Lift diagrams, rigging calculus and stability checks for all critical lifts',
        'Permit roadmaps and corridor readiness plans vetted with authorities'
      ]
    },
    {
      title: 'Mobilise & prep',
      copy: 'Specialised gear, crews and spares are staged while permits, temporary works and HSE drills go live.',
      points: [
        'Transport permits, port handling windows and escort coordination',
        'Temporary bridging, stooling, saddles and engineered steelwork fabrication',
        'Toolbox talks, competency refreshers and emergency response simulations'
      ]
    },
    {
      title: 'Execute & monitor',
      copy: 'Operations are choreographed with live dashboards, telemetry, HSE checkpoints and daily client reporting.',
      points: [
        'On-site execution supervisors, lift directors and route marshals',
        'Load monitoring, weather watch and ground pressure tracking in real time',
        'Daily progress visuals and KPI dashboards for project stakeholders'
      ]
    },
    {
      title: 'Turnover & support',
      copy: 'We close-out with documentation, route reinstatement and support for commissioning or future phases.',
      points: [
        'As-built dossiers, photographic records and QA filings',
        'Route reinstatement, third-party inspections and punch-list closure',
        'Demobilisation sequencing with readiness for follow-on scopes'
      ]
    }
  ];

  archive$: Observable<GalleryItem[]> = this.http
    .get<LegacyGalleryItem[]>('assets/data/work-activities.gallery.json')
    .pipe(
      map(items => {
        const seen = new Set<string>();
        return items
          .map(item => {
            const image = (item.src ?? '').trim();
            const caption = (item.caption ?? '').trim();
            return { image, caption: caption || fileNameFromPath(image) } as GalleryItem;
          })
          .filter(({ image }) => {
            if (!image) {
              return false;
            }
            if (seen.has(image)) {
              return false;
            }
            seen.add(image);
            return true;
          });
      }),
      shareReplay(1)
    );

  spotlight$: Observable<GalleryItem[]> = combineLatest([
    this.content.gallery$,
    this.archive$
  ]).pipe(
    map(([gallery, archive]) => {
      const curated = (gallery?.items ?? []).filter(item => item.image && item.caption);
      const list = curated.length ? curated : archive;
      return list.slice(0, 6);
    }),
    shareReplay(1)
  );

  legacyUrl$ = this.content.gallery$.pipe(map(gallery => gallery?.workActivitiesPage ?? null));

  contactEmail$ = this.content.contact$.pipe(
    map(contact =>
      contact?.operationOffice?.email ??
      contact?.headOffice?.email ??
      contact?.branchOffice?.email ??
      'info@shamolima.com'
    )
  );

  trackByImage = (_: number, item: GalleryItem) => item.image;

  // Global lightbox handles image viewing sitewide.

  // Spotlight carousel state
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
  }
}

function fileNameFromPath(path: string): string {
  const file = path.split(/[\\/]/).pop() ?? '';
  const cleaned = file
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleaned) {
    return 'Work activity';
  }
  return cleaned.replace(/\b(\w)/g, (_, char: string) => char.toUpperCase());
}
