import { Component, HostListener } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { GalleryService, GalleryItem } from './gallery.service';

@Component({
  selector: 'app-gallery-overlay',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  template: `
    <ng-container *ngIf="service.open$ | async">
      <div class="global-lightbox" role="dialog" aria-modal="true" (click)="service.close()">
        <div class="global-lightbox__inner" (click)="$event.stopPropagation()">
          <button class="global-lightbox__close" type="button" aria-label="Close" (click)="service.close()">&times;</button>
          <button class="global-lightbox__nav global-lightbox__nav--prev" type="button" aria-label="Previous" (click)="service.prev()">&#10094;</button>
          <img class="global-lightbox__image"
               [src]="current()?.src"
               [alt]="current()?.caption || 'Gallery image'">
          <div class="global-lightbox__caption">{{ current()?.caption }}</div>
          <button class="global-lightbox__nav global-lightbox__nav--next" type="button" aria-label="Next" (click)="service.next()">&#10095;</button>
        </div>
      </div>
    </ng-container>
  `,
  styleUrl: './gallery-overlay.scss'
})
export class GalleryOverlay {
  constructor(public service: GalleryService) {}

  current() {
    const open = this.service.open$.value;
    if (!open) return undefined;
    const items = this.service.items$.value;
    const index = this.service.index$.value;
    return items[index];
  }

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (!this.service.open$.value) return;
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        this.service.close();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.service.next();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        this.service.prev();
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocClick(ev: MouseEvent) {
    const target = ev.target as HTMLElement | null;
    if (!target) return;
    if ((target as HTMLElement).closest('.global-lightbox')) {
      return; // ignore clicks inside overlay
    }
    if (target.tagName?.toLowerCase() !== 'img') return;
    const img = target as HTMLImageElement;
    if (this.shouldIgnore(img)) return;

    const container = this.findGroupContainer(img);
    const all = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
    const filtered = all
      .filter(el => !this.shouldIgnore(el))
      .map(el => ({ src: el.currentSrc || el.src, caption: this.captionFor(el) }))
      .filter(item => !!item.src);

    // Deduplicate by src and compute index
    const seen = new Set<string>();
    const items: GalleryItem[] = [];
    let index = 0;
    for (const it of filtered) {
      const key = it.src;
      if (seen.has(key)) continue;
      if (key === (img.currentSrc || img.src)) index = items.length;
      seen.add(key);
      items.push(it);
    }

    if (items.length) {
      ev.preventDefault();
      this.service.open(items, index);
    }
  }

  private findGroupContainer(el: HTMLElement): HTMLElement {
    // Prefer nearest explicit gallery container, otherwise section/container, fallback body
    let cur: HTMLElement | null = el;
    while (cur && cur !== document.body) {
      if (cur.hasAttribute('data-gallery')) return cur;
      if (cur.classList.contains('section')) return cur;
      if (cur.classList.contains('container')) return cur;
      cur = cur.parentElement;
    }
    return document.body;
  }

  private shouldIgnore(img: HTMLImageElement): boolean {
    const src = (img.currentSrc || img.src || '').toLowerCase();
    const cls = img.className?.toLowerCase?.() || '';
    const alt = img.alt?.toLowerCase?.() || '';
    const parentRole = (img.getAttribute('role') || '').toLowerCase();
    const ariaHidden = (img.getAttribute('aria-hidden') || '').toLowerCase() === 'true';
    const noGallery = img.hasAttribute('data-no-gallery') || cls.includes('no-gallery');
    const isIconish = src.includes('icon') || src.includes('sprite') || src.includes('favicon') || src.endsWith('.svg');
    const isLogo = src.includes('logo') || cls.includes('logo') || alt.includes('logo');
    const isBadge = cls.includes('badge') || cls.includes('avatar') || cls.includes('tag-chip') || cls.includes('icon');
    const isDecorative = parentRole === 'presentation' || ariaHidden;
    const isTiny = img.clientWidth > 0 && img.clientHeight > 0 && (img.clientWidth < 60 || img.clientHeight < 60);
    return noGallery || isLogo || isIconish || isBadge || isDecorative || isTiny;
  }

  private captionFor(img: HTMLImageElement): string {
    const alt = (img.alt || '').trim();
    if (alt) return alt;
    const src = img.currentSrc || img.src || '';
    const file = src.split(/[\\/]/).pop() || '';
    const cleaned = file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim();
    return cleaned || 'Image';
  }
}

