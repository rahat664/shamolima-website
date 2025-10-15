import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GalleryItem { src: string; caption?: string }

@Injectable({ providedIn: 'root' })
export class GalleryService {
  readonly open$ = new BehaviorSubject<boolean>(false);
  readonly items$ = new BehaviorSubject<GalleryItem[]>([]);
  readonly index$ = new BehaviorSubject<number>(0);

  open(items: GalleryItem[], index: number) {
    if (!items || items.length === 0) return;
    const idx = Math.max(0, Math.min(index, items.length - 1));
    this.items$.next(items);
    this.index$.next(idx);
    this.open$.next(true);
  }

  close() {
    this.open$.next(false);
  }

  next() {
    const items = this.items$.value;
    if (!items || items.length === 0) return;
    const idx = (this.index$.value + 1) % items.length;
    this.index$.next(idx);
  }

  prev() {
    const items = this.items$.value;
    if (!items || items.length === 0) return;
    const idx = (this.index$.value - 1 + items.length) % items.length;
    this.index$.next(idx);
  }
}

