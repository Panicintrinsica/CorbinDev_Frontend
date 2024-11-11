import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographyComponent } from './biography.component';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('BiographyComponent', () => {
  let component: BiographyComponent;
  let fixture: ComponentFixture<BiographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const httpTesting = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(BiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
