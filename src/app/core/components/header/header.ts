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

  servicesMenuOpen = false;
  

  constructor(){
    // Close submenu on navigation
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.servicesMenuOpen = false;
      });
  }

  toggleServicesMenu(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.servicesMenuOpen = !this.servicesMenuOpen;
  }

  closeServicesMenu() {
    this.servicesMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Close menu when clicking outside
    const target = event.target as HTMLElement;
    if (!target.closest('.tx-nav-item')) {
      this.servicesMenuOpen = false;
    }
  }
}
