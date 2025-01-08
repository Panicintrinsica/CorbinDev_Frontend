import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioFoodComponent } from './bio-food.component';

describe('BioFoodComponent', () => {
  let component: BioFoodComponent;
  let fixture: ComponentFixture<BioFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioFoodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BioFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
