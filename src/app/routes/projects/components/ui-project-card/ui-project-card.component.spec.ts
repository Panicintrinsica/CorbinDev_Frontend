import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiProjectCardComponent } from './ui-project-card.component';

describe('UiProjectComponent', () => {
  let component: UiProjectCardComponent;
  let fixture: ComponentFixture<UiProjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiProjectCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
