import { Directive, ElementRef, Input, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { typewriterEffect } from '../typewriter.util';

@Directive({
  selector: '[appTypewriter]',
  standalone: true
})
export class TypewriterDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private cleanup?: () => void;

  @Input() appTypewriter = '';
  @Input() typewriterSpeed = 50;
  @Input() typewriterDelay = 0;
  @Input() typewriterCursor = true;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.appTypewriter) return;

    const prefersReduced = (() => {
      try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
    })();
    const smallScreen = (() => {
      try { return window.matchMedia('(max-width: 480px)').matches; } catch { return false; }
    })();

    if (prefersReduced || smallScreen) {
      const el: HTMLElement = this.elementRef.nativeElement;
      el.textContent = this.appTypewriter;
      return; // no animation on low-motion or small screens
    }

    this.cleanup = typewriterEffect(
      this.elementRef.nativeElement,
      this.appTypewriter,
      {
        speed: this.typewriterSpeed,
        startDelay: this.typewriterDelay,
        showCursor: this.typewriterCursor
      }
    );
  }

  ngOnDestroy(): void {
    if (this.cleanup) {
      this.cleanup();
    }
  }
}
