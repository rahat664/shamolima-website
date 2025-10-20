import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { fadeIn } from '../../../shared/animation';
import { ContentService } from '../../../shared/content.service';
import { AsyncPipe, NgIf, NgForOf } from '@angular/common';
import { ContactContent, ContactOffice } from '../../../shared/types';
import { RevealOnScroll } from '../../../shared/directives/reveal-on-scroll';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, AsyncPipe, NgIf, NgForOf, RevealOnScroll],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  animations: [fadeIn]
})
export class Footer {
  currentDate: Date = new Date();
  private content = inject(ContentService);
  darkLogo$ = this.content.darkLogo$;
  site$ = this.content.site$;
  contact$ = this.content.contact$;
  logoBroken = false;
  assets$ = this.content.assets$;

  serviceList$ = this.content.serviceList$;

  offices(c: ContactContent): { title: string; data: ContactOffice }[] {
    const list = [
      { title: 'Corporate Office', data: c.operationOffice },
      { title: 'Head Office', data: c.headOffice },
      { title: 'Chattagram Office', data: c.chattagramOffice ?? c.branchOffice! }
    ];
    return list.filter(x => !!x.data);
  }

  telHref(ph: string): string {
    const cleaned = (ph || '').replace(/[^0-9+]/g, '');
    return `tel:${cleaned}`;
  }

  primaryPhone(c: ContactContent): string {
    return (
      c.operationOffice?.phones?.[0] ||
      c.headOffice?.phones?.[0] ||
      c.branchOffice?.phones?.[0] ||
      c.chattagramOffice?.phones?.[0] ||
      ''
    );
  }

  primaryEmail(c: ContactContent): string {
    return (
      c.operationOffice?.email ||
      c.headOffice?.email ||
      c.branchOffice?.email ||
      c.chattagramOffice?.email ||
      'info@shamolima.com'
    );
  }
}
