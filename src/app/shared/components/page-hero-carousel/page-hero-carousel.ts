import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-page-hero-carousel',
  standalone: true,
  imports: [NgFor],
  templateUrl: './page-hero-carousel.html',
  styleUrl: './page-hero-carousel.scss'
})
export class PageHeroCarousel implements OnInit, OnDestroy {
  @Input() images: string[] = [
    'assets/images/fleet_yard.jpg',
    'assets/images/generator_transformer.jpg',
    'assets/images/project_equipment.jpg'
  ];

  currentSlide = 0;
  private autoplayInterval: any = null;

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  private startAutoplay() {
    if (this.images.length <= 1) return;

    this.autoplayInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    }, 5000);
  }

  private stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  toWebp(src: string): string {
    if (!src) return src;
    // Map assets/images/* or assets/work-activities/* to their webp outputs
    const m = src.match(/^(assets\/(?:images|work-activities))\/(.+)$/i);
    if (!m) return '';
    const base = m[2].replace(/\.[^.]+$/, '');
    return `${m[1]}/webp/${base}.webp`;
  }
}
