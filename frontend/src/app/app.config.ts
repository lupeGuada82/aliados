import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideAnimationsAsync(),
    provideRouter(
      routes,
      withHashLocation(),//es lo que antes se usaba con hashUse:true, para que las rutas funcionen con hash en la url.
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      })
    ),
    provideHttpClient()
  ]
};