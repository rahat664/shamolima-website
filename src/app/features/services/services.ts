import { Component, inject } from '@angular/core';
import { Footer } from '../../core/components/footer/footer';
import { Header } from '../../core/components/header/header';
import { PageHeroCarousel } from '../../shared/components/page-hero-carousel/page-hero-carousel';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DecimalPipe, NgForOf } from '@angular/common';
import { fadeIn, listStagger } from '../../shared/animation';
import { Observable } from 'rxjs';
import { ServiceListItem } from '../../shared/types';
import { ContentService } from '../../shared/content.service';

@Component({
  selector: 'app-services',
  imports: [
    Footer,
    PageHeroCarousel,
    RouterLink,
    NgForOf,
    AsyncPipe,
    DecimalPipe
  ],
  animations: [fadeIn, listStagger],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {
  private content = inject(ContentService);
  services$: Observable<ServiceListItem[]> = this.content.serviceList$;
}

