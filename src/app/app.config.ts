import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideAnimations } from '@angular/platform-browser/animations';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import { provideMarkdown} from "ngx-markdown";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideNativeDateAdapter} from "@angular/material/core";
import {AuthInterceptor} from "./interceptors/Auth.Interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideMarkdown(),
    provideAnimations(),
    provideRouter(routes),
    provideAnimations(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
]
};
