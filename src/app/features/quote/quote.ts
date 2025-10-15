import { Component } from '@angular/core';
import { Header } from '../../core/components/header/header';
import { Footer } from '../../core/components/footer/footer';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { fadeIn, listStagger, scaleIn } from '../../shared/animation';

@Component({
  selector: 'app-quote',
  imports: [
    Header,
    Footer,
    FormsModule,
    RouterLink,
    NgForOf
  ],
  animations: [listStagger, fadeIn, scaleIn],
  templateUrl: './quote.html',
  styleUrl: './quote.scss'
})
export class Quote {
  steps = [
    { n: 1, title: 'Tell us your route', text: 'Pickup, drop-off, windows & constraints.' },
    { n: 2, title: 'We plan the move', text: 'Fleet, permits, escorts & safety.' },
    { n: 3, title: 'On-time delivery', text: 'Live updates and PoD.' }
  ];

  model = {
    name: '',
    email: '',
    phone: '',
    pickup: '',
    dropoff: '',
    date: '',
    cargo: '',
    notes: ''
  };

  submit(): void {
    // Replace with API integration; for now surface the payload for debugging.
    console.info('Quote request submitted', this.model);
  }
}
