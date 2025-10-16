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
  servicesMenuOpen = false;

  private setOnHome(url: string) {
    // Normalize URL to ignore query strings and fragments
    try {
      const [path] = url.split('?')[0].split('#');
      this.onHome = path === '/';
    } catch {
      this.onHome = url === '/' || url.startsWith('/?') || url.startsWith('/#');
    }
  }

  @HostListener('window:scroll') onScroll() {
    this.elevated = (window.scrollY || 0) > 10;
  }

  constructor(){
    // Set initial state on construction
    this.setOnHome(this.router.url);

    // Update on navigation end (use urlAfterRedirects for accuracy)
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e) => {
        const nav = e as NavigationEnd;
        this.setOnHome(nav.urlAfterRedirects || this.router.url);
        this.servicesMenuOpen = false; // Close submenu on navigation
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
