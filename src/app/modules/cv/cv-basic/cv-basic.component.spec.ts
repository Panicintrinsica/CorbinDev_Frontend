import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvBasicComponent } from './cv-basic.component';

describe('CvBasicComponent', () => {
  let component: CvBasicComponent;
  let fixture: ComponentFixture<CvBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CvBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
