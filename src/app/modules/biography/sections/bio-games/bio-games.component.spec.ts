import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioGamesComponent } from './bio-games.component';

describe('BioGamesComponent', () => {
  let component: BioGamesComponent;
  let fixture: ComponentFixture<BioGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioGamesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BioGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
