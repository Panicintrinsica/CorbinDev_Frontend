import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeKeyartComponent } from './home-keyart.component';

describe('HomeKeyartComponent', () => {
  let component: HomeKeyartComponent;
  let fixture: ComponentFixture<HomeKeyartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeKeyartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeKeyartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
