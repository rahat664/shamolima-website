import {Component, inject} from '@angular/core';
import {NgForOf} from '@angular/common';
import {ContentService} from '../../../../shared/content.service';
import {listStagger} from '../../../../shared/animation';

@Component({
  selector: 'app-gallery-tabs',
  imports: [
    NgForOf
  ],
  animations: [listStagger],
  templateUrl: './gallery-tabs.html',
  styleUrl: './gallery-tabs.scss'
})
export class GalleryTabs {
  private content = inject(ContentService);
  items = [] as {image: string; caption: string}[];
  tab: 'All' | 'Featured' | 'Projects' = 'All';
  constructor(){ this.content.gallery$?.subscribe(g => this.items = g?.items ?? []); }
}
