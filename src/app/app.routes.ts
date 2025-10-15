import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home').then(m => m.Home) },
  { path: 'services', loadComponent: () => import('./features/services/services').then(m => m.Services) },
  { path: 'services/:slug', loadComponent: () => import('./features/services/service-single/service-single').then(m => m.ServiceSingle) },
  { path: 'fleet', loadComponent: () => import('./features/fleet/fleet').then(m => m.Fleet) },
  { path: 'about', loadComponent: () => import('./features/about/about').then(m => m.About) },
  { path: 'qhse', loadComponent: () => import('./features/qhse/qhse').then(m => m.Qhse) },
  { path: 'tracking', loadComponent: () => import('./features/tracking/tracking').then(m => m.Tracking) },
  { path: 'quote', loadComponent: () => import('./features/quote/quote').then(m => m.Quote) },
  { path: 'contact', loadComponent: () => import('./features/contact/contact').then(m => m.Contact) },
  { path: 'work-activities', loadComponent: () => import('./features/work-activities/work-activities').then(m => m.WorkActivities) },
  { path: '**', redirectTo: '' }
];
