import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectsIndexComponent } from './admin-projects-index.component';

describe('AdminProjectsIndexComponent', () => {
  let component: AdminProjectsIndexComponent;
  let fixture: ComponentFixture<AdminProjectsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProjectsIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminProjectsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
