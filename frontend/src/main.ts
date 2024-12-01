import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled', // Restores scroll position or scrolls to top
      })
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
