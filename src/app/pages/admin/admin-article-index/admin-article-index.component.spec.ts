import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticleIndexComponent } from './admin-article-index.component';

describe('AdminArticleIndexComponent', () => {
  let component: AdminArticleIndexComponent;
  let fixture: ComponentFixture<AdminArticleIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminArticleIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminArticleIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
