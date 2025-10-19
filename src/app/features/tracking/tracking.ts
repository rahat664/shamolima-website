import { Component } from '@angular/core';
import {Header} from '../../core/components/header/header';
import {Footer} from '../../core/components/footer/footer';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {fadeIn} from '../../shared/animation';
import {PageHeroCarousel} from '../../shared/components/page-hero-carousel/page-hero-carousel';

@Component({
  selector: 'app-tracking',
  imports: [
    PageHeroCarousel,
    Footer,
    FormsModule,
    NgIf
  ],
  animations: [fadeIn],
  templateUrl: './tracking.html',
  styleUrl: './tracking.scss'
})
export class Tracking {
  id = '';
  result = '';
  search() { this.result = this.id ? `Shipment ${this.id}: In transit — ETA 2 days.` : ''; }
}
