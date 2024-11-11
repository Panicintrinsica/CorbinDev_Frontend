import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiArticleComponent } from './ui-article.component';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideMarkdown } from 'ngx-markdown';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';

describe('UiArticleComponent', () => {
  let component: UiArticleComponent;
  let fixture: ComponentFixture<UiArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMarkdown(),
        provideRouter(routes),
      ],
    }).compileComponents();

    const httpTesting = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(UiArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
