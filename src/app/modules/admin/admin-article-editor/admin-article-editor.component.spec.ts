import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticleEditorComponent } from './admin-article-editor.component';

describe('AdminArticleEditorComponent', () => {
  let component: AdminArticleEditorComponent;
  let fixture: ComponentFixture<AdminArticleEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminArticleEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminArticleEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
