import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiNavComponent } from './ui-nav.component';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';

describe('UiNavComponent', () => {
  let component: UiNavComponent;
  let fixture: ComponentFixture<UiNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
      ],
    }).compileComponents();

    const httpTesting = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(UiNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
