import { Component, inject } from '@angular/core';
import { Footer } from '../../core/components/footer/footer';
import { Header } from '../../core/components/header/header';
import { FormsModule } from '@angular/forms';
import { fadeIn, listStagger } from '../../shared/animation';
import { ContentService } from '../../shared/content.service';
import { ContactContent } from '../../shared/types';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [
    Footer,
    Header,
    FormsModule,
    AsyncPipe,
    NgForOf,
    NgIf
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
      { title: 'Operations Office', badge: 'OPS', data: contact.operationOffice },
      { title: 'Branch Office', badge: 'BR', data: contact.branchOffice },
      { title: 'Chattagram Office', badge: 'CTG', data: contact.chattagramOffice }
    ].filter(office => !!office.data);
  }

  submit(): void {
    // In production, replace with service integration.
    console.info('Contact form submitted', this.model);
  }
}
