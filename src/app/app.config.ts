import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideMarkdown} from "ngx-markdown";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideMarkdown(),
    provideAnimations(),
    provideRouter(routes),
    provideAnimations(), provideAnimationsAsync(),

]
};
