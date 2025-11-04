import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  pickup: string;
  dropoff: string;
  date: string;
  cargo: string;
  notes: string;
}

export interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private http = inject(HttpClient);

  /**
   * Submit contact form data to the API
   */
  sendContactForm(data: ContactFormData): Observable<EmailResponse> {
    return this.http.post<EmailResponse>('/api/contact', data);
  }

  /**
   * Submit quote request form data to the API
   */
  sendQuoteRequest(data: QuoteFormData): Observable<EmailResponse> {
    return this.http.post<EmailResponse>('/api/quote', data);
  }
}
