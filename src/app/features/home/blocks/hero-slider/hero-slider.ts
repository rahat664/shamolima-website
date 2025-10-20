import { Component, inject } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentService } from '../../../../shared/content.service';
import { heroPop } from '../../../../shared/animation';

export type Slide = {
  title: string;
  sub: string;
  image: string;
  cta?: { text: string; link: string }[];
};

@Component({
  selector: 'app-hero-slider',
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  animations: [heroPop],
  templateUrl: './hero-slider.html',
  styleUrl: './hero-slider.scss'
})
export class HeroSlider {
  private readonly content = inject(ContentService);

  slides: Slide[] = [];
  idx = 0;
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.content.home$
      .pipe(takeUntilDestroyed())
      .subscribe(home => {
        const hero = home.hero.image;
        this.slides = [
          { title: home.hero.headline, sub: home.hero.subhead, image: hero, cta: [{ text: 'Explore More', link: '/services' }] },
          { title: 'Deliver Packages in any Way', sub: home.hero.subhead, image: hero, cta: [{ text: 'Get a Quote', link: '/quote' }] },
          { title: 'Transportation Services around the Country', sub: home.hero.subhead, image: hero, cta: [{ text: 'Track Shipment', link: '/tracking' }] }
        ];
        this.idx = 0;
        this.restartTimer();
      });
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  go(i: number): void {
    if (!this.slides.length) {
      return;
    }
    const length = this.slides.length;
    this.idx = ((i % length) + length) % length;
    this.restartTimer();
  }

  get activeSlide(): Slide | null {
    return this.slides[this.idx] ?? null;
  }

  trackByIdx(index: number): number {
    return index;
  }

  private restartTimer(): void {
    this.stopTimer();
    this.startTimer();
  }

  private startTimer(): void {
    if (this.slides.length <= 1) {
      return;
    }
    if (this.prefersReducedMotion() || this.isSmallScreen()) return;
    this.timer = setInterval(() => {
      this.idx = (this.idx + 1) % this.slides.length;
    }, 5000);
  }

  private stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  toWebp(src: string): string {
    if (!src) return src;
    const m = src.match(/^(assets\/(?:images|work-activities))\/(.+)$/i);
    if (!m) return '';
    const base = m[2].replace(/\.[^.]+$/, '');
    return `${m[1]}/webp/${base}.webp`;
  }

  private prefersReducedMotion(): boolean {
    try { return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
  }
  private isSmallScreen(): boolean {
    try { return typeof window !== 'undefined' && window.matchMedia('(max-width: 480px)').matches; } catch { return false; }
  }
}
