import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSkillComponent } from './ui-skill.component';

describe('UiSkillComponent', () => {
  let component: UiSkillComponent;
  let fixture: ComponentFixture<UiSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSkillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
