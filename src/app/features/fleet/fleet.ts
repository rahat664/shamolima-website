import { Component, inject } from '@angular/core';
import {Header} from '../../core/components/header/header';
import { PageHeroCarousel } from '../../shared/components/page-hero-carousel/page-hero-carousel';
import {Footer} from '../../core/components/footer/footer';
import {CommonModule} from '@angular/common';
import {listStagger} from '../../shared/animation';
import {RevealOnScroll} from '../../shared/directives/reveal-on-scroll';
import { ContentService } from '../../shared/content.service';

class Truck {
  name: string | undefined;
  size: string | undefined;
  capacityTons: number | undefined;
}

@Component({
  selector: 'app-fleet',
  imports: [
    PageHeroCarousel,
    CommonModule,
    RevealOnScroll
  ],
  animations: [listStagger],
  templateUrl: './fleet.html',
  styleUrl: './fleet.scss'
})
export class Fleet {
  private content = inject(ContentService);
  ui$ = this.content.ui$;
  trucks: Truck[] = [
    { name: 'Mini (7 ft)',   size: '7×5 ft',   capacityTons: 1.0 },
    { name: 'Pickup (8 ft)', size: '8×5 ft',   capacityTons: 1.5 },
    { name: 'Small (10 ft)', size: '10×6 ft',  capacityTons: 2.0 },
    { name: 'Medium (14 ft)',size: '14×7 ft',  capacityTons: 3.0 },
    { name: 'Large (17 ft)', size: '17×7.5 ft',capacityTons: 5.0 },
    { name: 'Covered (20 ft)',size:'20×8 ft',  capacityTons: 8.0 }
  ];
}
