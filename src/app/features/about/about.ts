import { Component, inject, signal, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Footer } from '../../core/components/footer/footer';
import { ContentService } from '../../shared/content.service';
import { AboutMobile } from './about-mobile/about-mobile';
import { RevealOnScroll } from '../../shared/directives/reveal-on-scroll';

@Component({
  selector: 'app-about',
  imports: [
    Footer,
    AsyncPipe,
    NgIf,
    NgForOf,
    AboutMobile,
    RevealOnScroll
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit, OnDestroy {
  private content = inject(ContentService);
  private platformId = inject(PLATFORM_ID);

  about$ = this.content.about$;
  home$ = this.content.home$;

  isMobile = signal(false);
  private resizeListener?: () => void;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      this.resizeListener = () => this.checkScreenSize();
      window.addEventListener('resize', this.resizeListener);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private checkScreenSize(): void {
    this.isMobile.set(window.innerWidth < 768);
  }

  initials(name: string | null | undefined): string {
    if (!name) {
      return '';
    }
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase() ?? '')
      .join('');
  }
}
