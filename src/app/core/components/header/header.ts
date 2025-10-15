import {Component, HostListener, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {ContentService} from '../../../shared/content.service';
import {filter} from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private router = inject(Router);
  private content = inject(ContentService);

  logo$ = this.content.logo$;
  site$ = this.content.site$;
  serviceList$ = this.content.serviceList$;

  elevated = false;
  onHome = false;

  @HostListener('window:scroll') onScroll() {
    this.elevated = (window.scrollY || 0) > 10;
  }

  constructor(){
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => { this.onHome = this.router.url === '/'; });
  }
}
