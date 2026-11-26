import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeatureComponent } from './home-feature.component';

describe('HomeFeatureComponent', () => {
  let component: HomeFeatureComponent;
  let fixture: ComponentFixture<HomeFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeFeatureComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('card', {
      title: 'Card', body: '', color: 'blue', isAlternate: false, route: '', images: [], logos: [],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
