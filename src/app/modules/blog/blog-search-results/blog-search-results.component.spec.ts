import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSearchResultsComponent } from './blog-search-results.component';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('BlogSearchResultsComponent', () => {
  let component: BlogSearchResultsComponent;
  let fixture: ComponentFixture<BlogSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const httpTesting = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(BlogSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
