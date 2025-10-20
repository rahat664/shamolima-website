import { Directive, ElementRef, Input, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { animateCount } from '../counter.util';

@Directive({
  selector: '[appAnimateCounter]',
  standalone: true
})
export class AnimateCounterDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private hasAnimated = false;

  @Input() appAnimateCounter = '';
  @Input() counterDuration = 2000;
  @Input() counterDelay = 0;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && this.appAnimateCounter) {
      // Set initial value to 0 for numeric values
      const value = this.appAnimateCounter;
      const numericMatch = value.match(/\d+/);

      if (numericMatch) {
        this.elementRef.nativeElement.textContent = '0';
      }

      // Create intersection observer
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !this.hasAnimated) {
              this.hasAnimated = true;
              this.animateValue();
            }
          });
        },
        { threshold: 0.3 }
      );

      this.observer.observe(this.elementRef.nativeElement);
    }
  }

  private animateValue(): void {
    const value = this.appAnimateCounter;
    const element = this.elementRef.nativeElement;

    // Extract numeric value and suffix
    const numericMatch = value.match(/(\d+)([+]?)$/);

    if (numericMatch) {
      const targetValue = parseInt(numericMatch[1], 10);
      const suffix = numericMatch[2] || '';

      setTimeout(() => {
        // Create a wrapper for animateCount that handles suffix
        if (suffix) {
          // Custom animation for values with suffix
          const start = performance.now();
          const from = 0;
          const step = (t: number): void => {
            const progress = Math.min(1, (t - start) / this.counterDuration);
            const current = Math.floor(from + (targetValue - from) * (1 - Math.pow(1 - progress, 3)));
            element.textContent = current.toString() + suffix;
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        } else {
          // Use the original animateCount function for simple numbers
          animateCount(element, targetValue, this.counterDuration);
        }
      }, this.counterDelay);
    } else {
      // For non-numeric values (like "ISO", "24/7"), just fade them in
      setTimeout(() => {
        element.style.opacity = '0';
        element.textContent = value;
        element.style.transition = 'opacity 0.6s ease-in';
        requestAnimationFrame(() => {
          element.style.opacity = '1';
        });
      }, this.counterDelay);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
