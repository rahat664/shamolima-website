import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appRevealOnScroll]',
  standalone: true
})
export class RevealOnScroll implements OnInit, OnDestroy{
  @Input('appRevealOnScroll') direction: 'up' | 'right' | 'left' | 'down' | 'fade' | 'zoom' | 'flip' = 'up';
  @Input() delay = 0; // ms
  @Input() threshold = 0.12;
  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLElement>,
    private r: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const node = this.el.nativeElement;
    this.r.addClass(node, 'reveal');
    this.r.addClass(node, this.direction);

    // On the server (SSR), IntersectionObserver is unavailable; reveal immediately to avoid errors
    if (!isPlatformBrowser(this.platformId)) {
      this.r.addClass(node, 'is-revealed');
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (this.delay) node.style.animationDelay = `${this.delay}ms`;
            this.r.addClass(node, 'is-revealed');
            this.observer?.unobserve(node);
          }
        });
      },
      { root: null, threshold: this.threshold, rootMargin: '0px 0px -8% 0px' }
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

}
