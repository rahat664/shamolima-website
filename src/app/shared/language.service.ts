import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'en' | 'ja' | 'zh';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  flagUrl: string;
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Available languages
  readonly languages: LanguageOption[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', flagUrl: 'https://flagcdn.com/w40/gb.png' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', flagUrl: 'https://flagcdn.com/w40/jp.png' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', flagUrl: 'https://flagcdn.com/w40/cn.png' }
  ];

  // Current language signal
  private currentLanguageSignal = signal<Language>('en');

  // Public readonly signal
  readonly currentLanguage = this.currentLanguageSignal.asReadonly();

  // Computed current language option
  readonly currentLanguageOption = computed(() => {
    const code = this.currentLanguageSignal();
    return this.languages.find(l => l.code === code) || this.languages[0];
  });

  constructor() {
    // Load saved language from localStorage (only in browser)
    if (this.isBrowser) {
      const saved = localStorage.getItem('shamolima-language') as Language | null;
      if (saved && this.languages.some(l => l.code === saved)) {
        this.currentLanguageSignal.set(saved);
      }
    }
  }

  setLanguage(lang: Language): void {
    this.currentLanguageSignal.set(lang);
    // Save to localStorage (only in browser)
    if (this.isBrowser) {
      localStorage.setItem('shamolima-language', lang);
    }
  }

  getContentFileName(): string {
    const lang = this.currentLanguageSignal();
    return lang === 'en' ? 'content.json' : `content.${lang}.json`;
  }

  getWorkActivitiesFileName(): string {
    const lang = this.currentLanguageSignal();
    return lang === 'en'
      ? 'work-activities.gallery.json'
      : `work-activities.gallery.${lang}.json`;
  }
}

