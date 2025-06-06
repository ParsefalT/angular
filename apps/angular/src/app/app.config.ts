import {
  ApplicationConfig,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from '@tt/auth';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// import {provideStore} from '@ngxs/store'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({
      name: 'tik-talk',
      trace: true,
      connectInZone: true,
    }),
    // {
    // provide: APP_INITIALIZER,
    // useFactory: () => {
    //   console.log("app_initializer")
    // }
    // }
    provideAppInitializer(() => {
      console.log('%c initializer', 'color:red;');
    }),
  ],
};
