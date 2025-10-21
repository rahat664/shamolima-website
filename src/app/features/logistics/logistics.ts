import {Component, ElementRef, ViewChild, AfterViewInit, inject} from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Header } from '../../core/components/header/header';
import { Footer } from '../../core/components/footer/footer';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import {PageHeroCarousel} from '../../shared/components/page-hero-carousel/page-hero-carousel';
import { ContentService } from '../../shared/content.service';

@Component({
  selector: 'app-logistics',
  standalone: true,
  imports: [NgIf, AsyncPipe, Header, Footer, PageHeroCarousel],
  templateUrl: './logistics.html',
  styleUrl: './logistics.scss'
})
export class Logistics implements AfterViewInit {
  private content = inject(ContentService);
  ui$ = this.content.ui$;
  @ViewChild('pdfCanvas') pdfCanvas!: ElementRef<HTMLCanvasElement>;
  error: string | null = null;
  loading = true;
  rendering = false;
  page = 1;
  total = 0;
  private pdf: PDFDocumentProxy | null = null;
  private scale = 1.5;

  async ngAfterViewInit() {
    // Set worker before loading PDF
    try {
      const workerUrl = new URL('assets/pdfjs/pdf.worker.min.mjs', document.baseURI).toString();
      GlobalWorkerOptions.workerSrc = workerUrl;
      console.log('PDF.js worker set to:', workerUrl);
    } catch (err) {
      console.error('Failed to set PDF.js worker:', err);
    }

    const url = new URL('logistics.pdf', document.baseURI).toString();
    console.log('Loading PDF from:', url);
    await this.loadPdf(url);
  }

  private async loadPdf(url: string) {
    this.loading = true;
    this.error = null;
    try {
      const loadingTask = getDocument({
        url,
        disableRange: true,
        disableStream: true,
        disableAutoFetch: true
      });
      this.pdf = await loadingTask.promise;
      this.total = this.pdf.numPages;
      this.page = 1;
      await this.renderPage(this.page);
    } catch (err: any) {
      console.warn('PDF.js direct load failed, trying manual fetch...', err);
      // Fallback: fetch the PDF ourselves and pass binary data
      try {
        const resp = await fetch(url, { cache: 'no-cache', method: 'GET' });
        if (!resp.ok || resp.status === 204) {
          throw new Error(`HTTP ${resp.status}`);
        }
        const data = await resp.arrayBuffer();
        if (!data || data.byteLength === 0) throw new Error('Empty PDF response');
        const loadingTask2 = getDocument({
          data,
          disableRange: true,
          disableStream: true,
          disableAutoFetch: true
        });
        this.pdf = await loadingTask2.promise;
        this.total = this.pdf.numPages;
        this.page = 1;
        await this.renderPage(this.page);
      } catch (fallbackErr: any) {
        console.error('Failed to load PDF (fallback)', fallbackErr);
        const status = fallbackErr?.message || fallbackErr?.status || 'unknown error';
        this.error = `Unable to load assets/logistics.pdf (${status}). Please ensure the file exists and is publicly accessible.`;
      }
    } finally {
      this.loading = false;
    }
  }

  async next() {
    if (!this.pdf || this.page >= this.total || this.rendering) return;
    this.page += 1;
    await this.renderPage(this.page);
  }

  async prev() {
    if (!this.pdf || this.page <= 1 || this.rendering) return;
    this.page -= 1;
    await this.renderPage(this.page);
  }

  private async renderPage(pageNum: number) {
    if (!this.pdf) return;
    this.rendering = true;
    try {
      const page = await this.pdf.getPage(pageNum);
      const canvas = this.pdfCanvas.nativeElement;
      const viewport = page.getViewport({ scale: this.scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvas, viewport }).promise;
    } finally {
      this.rendering = false;
    }
  }
}
