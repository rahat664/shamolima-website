import { Component, inject } from '@angular/core';
import { Footer } from '../../../core/components/footer/footer';
import { ContentService } from '../../../shared/content.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { RevealOnScroll } from '../../../shared/directives/reveal-on-scroll';

@Component({
  selector: 'app-about-mobile',
  imports: [
    Footer,
    AsyncPipe,
    NgIf,
    NgForOf,
    RevealOnScroll
  ],
  templateUrl: './about-mobile.html',
  styleUrl: './about-mobile.scss'
})
export class AboutMobile {
  private content = inject(ContentService);
  about$ = this.content.about$;
  home$ = this.content.home$;

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
