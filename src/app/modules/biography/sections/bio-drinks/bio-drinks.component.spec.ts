import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioDrinksComponent } from './bio-drinks.component';

describe('BioDrinksComponent', () => {
  let component: BioDrinksComponent;
  let fixture: ComponentFixture<BioDrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioDrinksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BioDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
