import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSkillsIndexComponent } from './admin-skills-index.component';

describe('AdminSkillsIndexComponent', () => {
  let component: AdminSkillsIndexComponent;
  let fixture: ComponentFixture<AdminSkillsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSkillsIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSkillsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
