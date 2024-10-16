import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSearchResultsComponent } from './project-search-results.component';

describe('ProjectSearchResultsComponent', () => {
  let component: ProjectSearchResultsComponent;
  let fixture: ComponentFixture<ProjectSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSearchResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
