import { Component, inject } from '@angular/core';
import { Footer } from '../../core/components/footer/footer';
import { Header } from '../../core/components/header/header';
import { PageHeroCarousel } from '../../shared/components/page-hero-carousel/page-hero-carousel';
import { FormsModule } from '@angular/forms';
import { fadeIn, listStagger } from '../../shared/animation';
import { ContentService } from '../../shared/content.service';
import { ContactContent } from '../../shared/types';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MapEmbed } from '../../shared/map-embed';
import { RevealOnScroll } from '../../shared/directives/reveal-on-scroll';

@Component({
  selector: 'app-contact',
  imports: [
    Footer,
    PageHeroCarousel,
    FormsModule,
    MapEmbed,
    AsyncPipe,
    NgForOf,
    NgIf,
    RevealOnScroll
  ],
  animations: [listStagger, fadeIn],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  private content = inject(ContentService);
  contact$ = this.content.contact$;

  model = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  offices(contact: ContactContent) {
    return [
      { title: 'Head Office', badge: 'HQ', data: contact.headOffice },
      { title: 'Corporate Office', badge: 'OPS', data: contact.operationOffice },
      { title: 'Branch Office', badge: 'BR', data: contact.branchOffice },
      { title: 'Chattagram Office', badge: 'CTG', data: contact.chattagramOffice }
    ].filter(office => !!office.data);
  }

  mapMarkers(c: ContactContent) {
    const candidates = [
      { label: 'Head Office', data: c.headOffice },
      { label: 'Corporate Office', data: c.operationOffice },
      { label: 'Branch Office', data: c.branchOffice },
      { label: 'Chattagram Office', data: c.chattagramOffice }
    ];
    return candidates
      .filter(x => !!x.data && (x.data as any).lat != null && (x.data as any).lng != null)
      .map(x => ({ lat: (x.data as any).lat, lng: (x.data as any).lng, label: x.label }));
  }

  submit(): void {
    // In production, replace with service integration.
    console.info('Contact form submitted', this.model);
  }
}
