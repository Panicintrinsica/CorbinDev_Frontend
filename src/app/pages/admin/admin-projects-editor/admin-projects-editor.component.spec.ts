import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectsEditorComponent } from './admin-projects-editor.component';

describe('AdminProjectsEditorComponent', () => {
  let component: AdminProjectsEditorComponent;
  let fixture: ComponentFixture<AdminProjectsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjectsEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminProjectsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
