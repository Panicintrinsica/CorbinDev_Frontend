import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillListComponent } from './skill-list.component';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('SkillListComponent', () => {
  let component: SkillListComponent;
  let fixture: ComponentFixture<SkillListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const httpTesting = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(SkillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
