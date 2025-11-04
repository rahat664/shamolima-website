import { Component, inject, signal } from '@angular/core';
import { Header } from '../../core/components/header/header';
import { PageHeroCarousel } from '../../shared/components/page-hero-carousel/page-hero-carousel';
import { Footer } from '../../core/components/footer/footer';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { fadeIn, listStagger, scaleIn } from '../../shared/animation';
import { ContentService } from '../../shared/content.service';
import { Observable, map } from 'rxjs';
import { EmailService } from '../../shared/email.service';

@Component({
  selector: 'app-quote',
  imports: [
    PageHeroCarousel,
    Footer,
    FormsModule,
    RouterLink,
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  animations: [listStagger, fadeIn, scaleIn],
  templateUrl: './quote.html',
  styleUrl: './quote.scss'
})
export class Quote {
  private content = inject(ContentService);
  private emailService = inject(EmailService);

  ui$ = this.content.ui$;
  steps$: Observable<Array<{ n: number; title: string; text: string }>> = this.ui$.pipe(
    // Optional steps supplied via translations; fallback to defaults
    // shape: pages.quote.howItWorksSteps?: Array<{ title: string; text: string }>
    map((ui: any) => {
      const steps = ui?.pages?.quote?.howItWorksSteps as Array<{ title: string; text: string }>|undefined;
      const items = (steps && Array.isArray(steps) && steps.length)
        ? steps
        : [
            { title: 'Tell us your route', text: 'Pickup, drop-off, windows & constraints.' },
            { title: 'We plan the move', text: 'Fleet, permits, escorts & safety.' },
            { title: 'On-time delivery', text: 'Live updates and PoD.' }
          ];
      return items.map((s, i) => ({ n: i + 1, ...s }));
    })
  );

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

  submitting = signal(false);
  submitStatus = signal<{ type: 'success' | 'error', message: string } | null>(null);

  submit(): void {
    if (this.submitting()) return;

    this.submitting.set(true);
    this.submitStatus.set(null);

    this.emailService.sendQuoteRequest(this.model).subscribe({
      next: (response) => {
        this.submitting.set(false);
        if (response.success) {
          this.submitStatus.set({
            type: 'success',
            message: 'Thank you! Your quote request has been submitted successfully. We will review it and get back to you soon.'
          });
          // Reset form
          this.model = {
            name: '',
            email: '',
            phone: '',
            pickup: '',
            dropoff: '',
            date: '',
            cargo: '',
            notes: ''
          };
        } else {
          this.submitStatus.set({
            type: 'error',
            message: response.error || 'Failed to submit quote request. Please try again.'
          });
        }
      },
      error: (error) => {
        this.submitting.set(false);
        console.error('Error submitting quote request:', error);
        this.submitStatus.set({
          type: 'error',
          message: 'An error occurred while submitting your request. Please try again later.'
        });
      }
    });
  }
}
