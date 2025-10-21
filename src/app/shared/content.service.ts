import { Injectable, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, shareReplay, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  SiteContent,
  HomeContent,
  ServicesContent,
  ServiceListItem,
  AboutContent,
  QHSEContent,
  ContactContent,
  GalleryContent,
  Assets,
  Client
} from './types';
import { LanguageService } from './language.service';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);
  private languageService = inject(LanguageService);

  // Observable that emits when language changes
  private currentLanguage$ = toObservable(this.languageService.currentLanguage);

  // Load content based on current language
  private content$: Observable<SiteContent> = this.currentLanguage$.pipe(
    switchMap(() => {
      const langFile = this.languageService.getContentFileName();
      const enFile = 'content.json';
      if (langFile === enFile) {
        return this.http.get<SiteContent>(`assets/${enFile}`, { withCredentials: false }).pipe(shareReplay(1));
      }
      return forkJoin([
        this.http.get<SiteContent>(`assets/${enFile}`, { withCredentials: false }),
        this.http.get<SiteContent>(`assets/${langFile}`, { withCredentials: false })
      ]).pipe(
        map(([en, lang]) => deepMerge(en, lang) as SiteContent),
        shareReplay(1)
      );
    }),
    shareReplay(1)
  );

  site$       = this.content$.pipe(map(c => c.site));
  ui$         = this.content$.pipe(map(c => c.ui));
  home$       = this.content$.pipe(map(c => c.home as HomeContent));
  about$      = this.content$.pipe(map(c => c.about as AboutContent));
  services$   = this.content$.pipe(map(c => c.services as ServicesContent));
  serviceList$= this.services$.pipe(map(s => s.list));
  qhse$       = this.content$.pipe(map(c => c.qhse as QHSEContent));
  contact$    = this.content$.pipe(map(c => c.contact as ContactContent));
  gallery$    = this.content$.pipe(map(c => c.gallery as GalleryContent | undefined));
  assets$ = this.content$.pipe(map(c => c.assets as Assets | undefined));
  logo$   = this.assets$.pipe(map(a => a?.logo || '')); // empty string if missing
  clients$ = this.content$.pipe(map(c => {
    const clients = (c as any).clients as any[] | undefined;
    if (!Array.isArray(clients)) return [] as Client[];
    return clients.map((cl: any) => {
      if (typeof cl === 'string') return { name: cl } as Client;
      return { name: cl?.name ?? '', logo: cl?.logo ?? undefined } as Client;
    }).filter(cl => !!cl.name);
  }));
  recentProjects$ = this.content$.pipe(map(c => {
    const rp = (c as any).recentProjects as any[] | undefined;
    if (Array.isArray(rp)) {
      return rp as any as { title: string; description: string; location: string; keyEquipment: string[] }[];
    }
    return [] as any[];
  }));
  darkLogo$ = this.assets$.pipe(map(a => a?.darkLogo || '')); // empty string if missing

  serviceBySlug(slug: string): Observable<ServiceListItem | undefined> {
    return this.serviceList$.pipe(map(list => list.find(i => i.slug === slug)));
  }

  /**
   * Map JSON image groups to a slug. Extend as needed.
   */
  imagesForService(slug: string): Observable<string[]> {
    return this.services$.pipe(map(s => {
      const g = s.images ?? {};
      switch (slug) {
        case 'equipment-rental': return g.equipmentRental ?? [];
        case 'door-to-door-transportation':
        case 'transportation':
        case 'd2d': return g.d2d ?? [];
        case 'power-plant-material-handling':
        case 'power-plant': return g.powerPlant ?? [];
        case 'lng-project':
        case 'oil-gas-lng': return g.lng ?? [];
        case 'oil-gas': return g.oilGas ?? [];
        default: return g.genericFleet ?? [];
      }
    }));
  }

  shippingCustomsBullets(): Observable<string[]> {
    return this.services$.pipe(map(s => s.shippingCustomsBullets ?? []));
  }
}

function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function deepMerge<T>(target: T, source: any): T {
  if (isObject(target) && isObject(source)) {
    const out: any = Array.isArray(target) ? [...(target as any)] : { ...target };
    for (const key of Object.keys(source)) {
      const srcVal = (source as any)[key];
      const tgtVal = (out as any)[key];
      if (isObject(srcVal) && isObject(tgtVal)) {
        (out as any)[key] = deepMerge(tgtVal, srcVal);
      } else {
        (out as any)[key] = srcVal;
      }
    }
    return out as T;
  }
  return source as T;
}
