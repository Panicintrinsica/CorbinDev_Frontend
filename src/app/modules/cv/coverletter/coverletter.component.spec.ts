import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverletterComponent } from './coverletter.component';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('CoverletterComponent', () => {
  let component: CoverletterComponent;
  let fixture: ComponentFixture<CoverletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const httpTesting = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(CoverletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
