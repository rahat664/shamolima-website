import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from '../../../core/components/header/header';
import { AsyncPipe, LowerCasePipe, NgForOf, NgIf } from '@angular/common';
import { Footer } from '../../../core/components/footer/footer';
import { fadeIn, listStagger, scaleIn } from '../../../shared/animation';
import { combineLatest, map, Observable } from 'rxjs';
import { ContentService } from '../../../shared/content.service';
import { ServiceListItem } from '../../../shared/types';

@Component({
  selector: 'app-service-single',
  imports: [
    RouterLink,
    Header,
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

  slug = this.route.snapshot.paramMap.get('slug') ?? '';

  item$: Observable<ServiceListItem | undefined> = this.content.serviceBySlug(this.slug);
  images$: Observable<string[]> = this.content.imagesForService(this.slug);
  shippingBullets$ = this.content.shippingCustomsBullets();

  showShippingBullets$ = combineLatest([this.item$, this.shippingBullets$]).pipe(
    map(([it, bullets]) => (it?.slug === 'shipping-customs' && bullets.length > 0) ? bullets : [])
  );
}
