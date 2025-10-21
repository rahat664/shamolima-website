import {Component, inject} from '@angular/core';
import {Footer} from '../../core/components/footer/footer';
import {Header} from '../../core/components/header/header';
import {AsyncPipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {fadeIn, listStagger} from '../../shared/animation';
import {ContentService} from '../../shared/content.service';
import {PageHeroCarousel} from '../../shared/components/page-hero-carousel/page-hero-carousel';
import {RevealOnScroll} from '../../shared/directives/reveal-on-scroll';

@Component({
  selector: 'app-qhse',
  imports: [
    Footer,
    PageHeroCarousel,
    AsyncPipe,
    DecimalPipe,
    NgIf,
    NgForOf,
    RevealOnScroll
  ],
  animations: [fadeIn, listStagger],
  templateUrl: './qhse.html',
  styleUrl: './qhse.scss'
})
export class Qhse {
  private content = inject(ContentService);
  qhse$ = this.content.qhse$;
  ui$ = this.content.ui$;

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100; // Offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  downloadCertificate(imsCertificates: string | undefined) {
    if (imsCertificates) {
      const link = document.createElement('a');
      link.href = imsCertificates;
      link.download = imsCertificates.split('/').pop() || 'certificate.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
