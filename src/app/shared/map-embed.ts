import { Component, Input, inject, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-map-embed',
  standalone: true,
  imports: [NgIf, NgStyle],
  templateUrl: './map-embed.html',
  styleUrl: './map-embed.scss'
})
export class MapEmbed implements OnChanges {
  @Input() lat?: number | string | null;
  @Input() lng?: number | string | null;
  @Input() markers?: { lat: number | string; lng: number | string; label?: string }[];
  @Input() zoom = 15;
  @Input() label?: string;
  @Input() provider: 'google' | 'osm' = 'google';
  @Input() showControls = true;
  /**
   * Height ratio as percentage for the responsive container.
   * Default 56.25 (16:9). Example 60 for slightly taller map.
   */
  @Input() heightRatio = 56.25;

  private sanitizer = inject(DomSanitizer);
  loaded = false;
  activeIndex = 0;
  safeSrc: SafeResourceUrl | null = null;
  private lastRawUrl: string | null = null;

  private parseNum(v: number | string | null | undefined): number | null {
    if (v === null || v === undefined) return null;
    if (typeof v === 'number') return Number.isFinite(v) ? v : null;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : null;
  }

  private coordFromInputs(): [number | null, number | null] {
    return [this.parseNum(this.lat), this.parseNum(this.lng)];
  }

  private coordFromMarker(m?: { lat: number | string; lng: number | string } | null): [number | null, number | null] {
    if (!m) return [null, null];
    return [this.parseNum(m.lat), this.parseNum(m.lng)];
  }

  get activeLat(): number | null {
    if (this.markers && this.markers.length) {
      const [lat] = this.coordFromMarker(this.markers[this.activeIndex] ?? null);
      return lat;
    }
    const [lat] = this.coordFromInputs();
    return lat;
  }

  get activeLng(): number | null {
    if (this.markers && this.markers.length) {
      const [, lng] = this.coordFromMarker(this.markers[this.activeIndex] ?? null);
      return lng;
    }
    const [, lng] = this.coordFromInputs();
    return lng;
  }

  get hasCoords(): boolean {
    return this.activeLat !== null && this.activeLng !== null;
  }

  private clamp(n: number, min: number, max: number) { return Math.max(min, Math.min(max, n)); }

  private osmSrc(lat: number, lng: number): string {
    // Approximate bbox around point based on zoom; keep small window
    const z = this.clamp(this.zoom, 3, 18);
    const base = 0.02; // ~ degrees at zoom ~15
    const scale = 15 / z;
    const dLat = base * scale;
    const dLng = dLat / Math.max(Math.cos(lat * Math.PI / 180), 0.1);
    const left = lng - dLng;
    const right = lng + dLng;
    const bottom = lat - dLat;
    const top = lat + dLat;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${left},${bottom},${right},${top}&layer=mapnik&marker=${lat},${lng}`;
  }

  private googleSrc(lat: number, lng: number): string {
    return `https://www.google.com/maps?q=${lat},${lng}&z=${this.zoom}&output=embed`;
  }

  ngOnChanges(_changes: SimpleChanges) {
    this.updateSrc();
  }

  private computeRawUrl(): string | null {
    if (!this.hasCoords) return null;
    const lat = this.activeLat as number;
    const lng = this.activeLng as number;
    return this.provider === 'osm' ? this.osmSrc(lat, lng) : this.googleSrc(lat, lng);
  }

  private updateSrc() {
    const newRaw = this.computeRawUrl();
    if (newRaw !== this.lastRawUrl) {
      this.lastRawUrl = newRaw;
      this.safeSrc = newRaw ? this.sanitizer.bypassSecurityTrustResourceUrl(newRaw) : null;
      this.loaded = false;
    }
  }

  get activeLabel(): string {
    if (this.markers && this.markers.length) {
      const lbl = this.markers[this.activeIndex]?.label;
      if (lbl) return lbl;
    }
    return this.label || 'Map location';
  }

  onFrameLoad() { this.loaded = true; }
  setProvider(p: 'google' | 'osm') { if (this.provider !== p) { this.provider = p; this.updateSrc(); } }
  next() {
    if (!this.markers || this.markers.length < 2) return;
    this.activeIndex = (this.activeIndex + 1) % this.markers.length;
    this.updateSrc();
  }
  prev() {
    if (!this.markers || this.markers.length < 2) return;
    this.activeIndex = (this.activeIndex - 1 + this.markers.length) % this.markers.length;
    this.updateSrc();
  }

  get containerStyle() {
    return { paddingTop: `${this.heightRatio}%` };
  }

  get externalLink(): string | null {
    if (!this.hasCoords) return null;
    const lat = this.activeLat as number;
    const lng = this.activeLng as number;
    return `https://www.google.com/maps/?q=${lat},${lng}`;
  }
}
