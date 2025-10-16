import { Component, inject } from '@angular/core';
import { Footer } from '../../core/components/footer/footer';
import { Header } from '../../core/components/header/header';
import { fadeIn, listStagger } from '../../shared/animation';
import { ContentService } from '../../shared/content.service';
import { AsyncPipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [
    Footer,
    Header,
    AsyncPipe,
    DecimalPipe,
    NgIf,
    NgForOf,
    RouterLink
  ],
  animations: [fadeIn, listStagger],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  private content = inject(ContentService);
  about$ = this.content.about$;

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
