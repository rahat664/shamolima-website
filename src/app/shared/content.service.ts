import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
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

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);


  // Load once & cache
  private content$: Observable<SiteContent> = this.http
    .get<SiteContent>('assets/content.json', { withCredentials: false })
    .pipe(shareReplay(1));

  site$       = this.content$.pipe(map(c => c.site));
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
    if (Array.isArray(rp)) { return rp as any as { title:string; description:string; location:string; keyEquipment:string[] }[]; }
    const legacy = (c as any).recent_projects as any[] | undefined;
    if (Array.isArray(legacy)) {
      return legacy.map(p => ({
        title: p.title,
        description: p.description,
        location: p.location,
        keyEquipment: p.key_equipment ?? []
      }));
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
