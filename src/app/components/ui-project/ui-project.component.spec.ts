import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiProjectComponent } from './ui-project.component';

describe('UiProjectComponent', () => {
  let component: UiProjectComponent;
  let fixture: ComponentFixture<UiProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiProjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
