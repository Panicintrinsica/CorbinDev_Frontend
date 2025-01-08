import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioBooksComponent } from './bio-books.component';

describe('BioBooksComponent', () => {
  let component: BioBooksComponent;
  let fixture: ComponentFixture<BioBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BioBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
