import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSkillsEditorComponent } from './admin-skills-editor.component';

describe('AdminSkillsEditorComponent', () => {
  let component: AdminSkillsEditorComponent;
  let fixture: ComponentFixture<AdminSkillsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSkillsEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSkillsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
