import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './services/http.interceptor';
//PrimeNG Providers
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';


const defaultColors = {  
    200: '#000000', 
    500: '#272727ff',  
};
const myColorPage = {
    ...Aura,
    semantic: {
        ...Aura.semantic,
        primary: defaultColors,
    }
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),

    providePrimeNG({
      theme: {
        preset: myColorPage,

      },
      ripple: true
    }),
    provideAnimations(),
  ]
};
