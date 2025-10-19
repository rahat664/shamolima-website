import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgClass, NgStyle, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
  cta?: string;
  ctaLink?: string;
}

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './hero-carousel.html',
  styleUrl: './hero-carousel.scss'
})
export class HeroCarousel implements OnInit, OnDestroy {
  currentSlide = 0;
  private autoplayInterval: any = null;
  private isPaused = false;

  slides: CarouselSlide[] = [
    {
      image: 'assets/images/fleet_yard.jpg',
      title: 'Heavy Equipment Transport',
      subtitle: 'Specialized logistics solutions for oversized cargo and industrial equipment across Bangladesh',
      cta: 'Our Fleet',
      ctaLink: '/fleet'
    },
    {
      image: 'assets/images/generator_transformer.jpg',
      title: 'Power & Energy Projects',
      subtitle: 'Comprehensive handling of transformers, generators and critical infrastructure components',
      cta: 'View Services',
      ctaLink: '/services'
    },
    {
      image: 'assets/images/project_equipment.jpg',
      title: 'Project Logistics Excellence',
      subtitle: 'End-to-end coordination from planning to delivery for complex industrial projects',
      cta: 'Get Started',
      ctaLink: '/quote'
    }
  ];

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  next() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.resetAutoplay();
  }

  prev() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.resetAutoplay();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoplay();
  }

  pauseAutoplay() {
    this.isPaused = true;
  }

  resumeAutoplay() {
    this.isPaused = false;
  }

  private startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, 5000); // Change slide every 5 seconds
  }

  private stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  private resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  trackByIndex(index: number): number {
    return index;
  }
}
