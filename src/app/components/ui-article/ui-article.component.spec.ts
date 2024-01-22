import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiArticleComponent } from './ui-article.component';

describe('UiArticleComponent', () => {
  let component: UiArticleComponent;
  let fixture: ComponentFixture<UiArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
