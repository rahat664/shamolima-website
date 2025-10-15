import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AsyncPipe, DecimalPipe, NgForOf} from '@angular/common';
import {ContentService} from '../../../../shared/content.service';
import {listStagger} from '../../../../shared/animation';

@Component({
  selector: 'app-services-strip',
  imports: [
    RouterLink,
    NgForOf,
    DecimalPipe,
    AsyncPipe
  ],
  templateUrl: './service-strip.html',
  styleUrl: './service-strip.scss',
  animations: [listStagger]
})
export class ServiceStrip {
  private content = inject(ContentService);
  services$ = this.content.serviceList$;
}
