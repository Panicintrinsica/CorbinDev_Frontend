import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvProjectsComponent } from './cv-projects.component';

describe('CvProjectsComponent', () => {
  let component: CvProjectsComponent;
  let fixture: ComponentFixture<CvProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CvProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
