import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvModernComponent } from './cv-modern.component';

describe('CvModernComponent', () => {
  let component: CvModernComponent;
  let fixture: ComponentFixture<CvModernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvModernComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CvModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
