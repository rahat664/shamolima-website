import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from '../../../core/components/header/header';
import { PageHeroCarousel } from '../../../shared/components/page-hero-carousel/page-hero-carousel';
import { AsyncPipe, LowerCasePipe, NgForOf, NgIf } from '@angular/common';
import { Footer } from '../../../core/components/footer/footer';
import { fadeIn, listStagger, scaleIn } from '../../../shared/animation';
import { combineLatest, map, Observable, switchMap, distinctUntilChanged } from 'rxjs';
import { ContentService } from '../../../shared/content.service';
import { ServiceListItem } from '../../../shared/types';

@Component({
  selector: 'app-service-single',
  imports: [
    RouterLink,
    PageHeroCarousel,
    NgForOf,
    Footer,
    AsyncPipe,
    LowerCasePipe,
    NgIf
  ],
  animations: [fadeIn, listStagger, scaleIn],
  templateUrl: './service-single.html',
  styleUrl: './service-single.scss'
})
export class ServiceSingle {
  private route = inject(ActivatedRoute);
  private content = inject(ContentService);
  ui$ = this.content.ui$;

  slug$ = this.route.paramMap.pipe(
    map(params => params.get('slug') ?? ''),
    distinctUntilChanged()
  );

  item$: Observable<ServiceListItem | undefined> = this.slug$.pipe(
    switchMap(slug => this.content.serviceBySlug(slug))
  );
  images$: Observable<string[]> = this.slug$.pipe(
    switchMap(slug => this.content.imagesForService(slug))
  );
  shippingBullets$ = this.content.shippingCustomsBullets();

  showShippingBullets$ = combineLatest([this.item$, this.shippingBullets$]).pipe(
    map(([it, bullets]) => (it?.slug === 'shipping-customs' && bullets.length > 0) ? bullets : [])
  );

  thumbFor(url: string): string {
    if (!url) return url;
    const m1 = url.match(/^(assets\/work-activities)\/(.+)$/i);
    if (m1) {
      const base = m1[2].replace(/\.[^.]+$/,'');
      return `${m1[1]}/thumbs/${base}.webp`;
    }
    const m2 = url.match(/^(assets\/images)\/(.+)$/i);
    if (m2) {
      const base = m2[2].replace(/\.[^.]+$/,'');
      return `${m2[1]}/thumbs/${base}.webp`;
    }
    return url;
  }
}
