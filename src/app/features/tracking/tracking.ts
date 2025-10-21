import { Component, inject } from '@angular/core';
import { Header } from '../../core/components/header/header';
import { Footer } from '../../core/components/footer/footer';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { fadeIn } from '../../shared/animation';
import { PageHeroCarousel } from '../../shared/components/page-hero-carousel/page-hero-carousel';
import { ContentService } from '../../shared/content.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-tracking',
  imports: [
    PageHeroCarousel,
    Footer,
    FormsModule,
    NgIf,
    AsyncPipe,
    RouterLink
  ],
  animations: [fadeIn],
  templateUrl: './tracking.html',
  styleUrl: './tracking.scss'
})
export class Tracking {
  private content = inject(ContentService);
  ui$ = this.content.ui$;
  id = '';
  result = '';
  search() { this.result = this.id ? `Shipment ${this.id}: In transit — ETA 2 days.` : ''; }
}

