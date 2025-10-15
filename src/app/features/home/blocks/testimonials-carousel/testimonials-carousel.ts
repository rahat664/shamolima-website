import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {fadeIn} from '../../../../shared/animation';

@Component({
  selector: 'app-testimonials-carousel',
  imports: [
    NgForOf
  ],
  animations: [fadeIn],
  templateUrl: './testimonials-carousel.html',
  styleUrl: './testimonials-carousel.scss'
})
export class TestimonialsCarousel {
  items = [
    { q:'Professional, on-time delivery across a tough route.', n:'Rahman', r:'Operations Lead' },
    { q:'Great coordination at port & site. Smooth clearance.', n:'Karim', r:'Project Manager' },
    { q:'Reliable fleet and safety-first execution.', n:'Anika', r:'Logistics Coordinator' }
  ];
  idx = 0; private t?: any;
  constructor(){ this.t=setInterval(()=>this.idx=(this.idx+1)%this.items.length, 4000); }
  ngOnDestroy(){ if(this.t) clearInterval(this.t); }
}
