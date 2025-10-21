import { Component, inject } from '@angular/core';
import { Footer } from '../../core/components/footer/footer';
import { Header } from '../../core/components/header/header';
import { PageHeroCarousel } from '../../shared/components/page-hero-carousel/page-hero-carousel';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { fadeIn, listStagger } from '../../shared/animation';
import { Observable } from 'rxjs';
import { ServiceListItem } from '../../shared/types';
import { ContentService } from '../../shared/content.service';
import { RevealOnScroll } from '../../shared/directives/reveal-on-scroll';
import { AnimateCounterDirective } from '../../shared/directives/animate-counter.directive';

@Component({
  selector: 'app-services',
  imports: [
    Footer,
    PageHeroCarousel,
    RouterLink,
    NgForOf,
    NgIf,
    AsyncPipe,
    DecimalPipe,
    RevealOnScroll,
    AnimateCounterDirective
  ],
  animations: [fadeIn, listStagger],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {
  private content = inject(ContentService);
  ui$ = this.content.ui$;
  services$: Observable<ServiceListItem[]> = this.content.serviceList$;
}
