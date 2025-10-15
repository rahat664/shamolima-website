import { Component, inject } from '@angular/core';
import { Footer } from '../../core/components/footer/footer';
import { Header } from '../../core/components/header/header';
import { AsyncPipe, DecimalPipe, NgForOf, NgIf } from '@angular/common';
import { fadeIn, listStagger } from '../../shared/animation';
import { ContentService } from '../../shared/content.service';

@Component({
  selector: 'app-qhse',
  imports: [
    Footer,
    Header,
    AsyncPipe,
    DecimalPipe,
    NgIf,
    NgForOf
  ],
  animations: [fadeIn, listStagger],
  templateUrl: './qhse.html',
  styleUrl: './qhse.scss'
})
export class Qhse {
  private content = inject(ContentService);
  qhse$ = this.content.qhse$;
}
