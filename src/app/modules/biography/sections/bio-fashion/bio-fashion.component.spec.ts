import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioFashionComponent } from './bio-fashion.component';

describe('BioFashionComponent', () => {
  let component: BioFashionComponent;
  let fixture: ComponentFixture<BioFashionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioFashionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BioFashionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
