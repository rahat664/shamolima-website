import {Component, HostListener, inject} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {ContentService} from '../../../shared/content.service';
import {LanguageService, Language} from '../../../shared/language.service';
import {filter} from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, NgOptimizedImage, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private router = inject(Router);
  private content = inject(ContentService);
  protected languageService = inject(LanguageService);

  logo$ = this.content.logo$;
  site$ = this.content.site$;
  ui$ = this.content.ui$;
  serviceList$ = this.content.serviceList$;

  servicesMenuOpen = false;
  mobileMenuOpen = false;
  languageMenuOpen = false;


  constructor(){
    // Close menus on navigation
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.servicesMenuOpen = false;
        this.mobileMenuOpen = false;
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

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  toggleLanguageMenu(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.languageMenuOpen = !this.languageMenuOpen;
  }

  closeLanguageMenu() {
    this.languageMenuOpen = false;
  }

  selectLanguage(lang: Language) {
    this.languageService.setLanguage(lang);
    this.closeLanguageMenu();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Close menu when clicking outside
    const target = event.target as HTMLElement;
    if (!target.closest('.tx-nav-item')) {
      this.servicesMenuOpen = false;
    }
    if (!target.closest('.tx-mobile-menu-container') && !target.closest('.tx-burger')) {
      this.mobileMenuOpen = false;
    }
    if (!target.closest('.tx-lang-toggle')) {
      this.languageMenuOpen = false;
    }
  }
}
