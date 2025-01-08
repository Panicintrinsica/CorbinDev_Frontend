import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioMusicComponent } from './bio-music.component';

describe('BioMusicComponent', () => {
  let component: BioMusicComponent;
  let fixture: ComponentFixture<BioMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioMusicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BioMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
