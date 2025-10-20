import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations, provideNoopAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withInMemoryScrolling(
      {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'}
    )),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()), provideClientHydration(withEventReplay())
  ]
};
