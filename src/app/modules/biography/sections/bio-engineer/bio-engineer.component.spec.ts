import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioEngineerComponent } from './bio-engineer.component';

describe('BioEngineerComponent', () => {
  let component: BioEngineerComponent;
  let fixture: ComponentFixture<BioEngineerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioEngineerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BioEngineerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
