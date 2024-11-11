import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvProjectsDialogComponent } from './cv-projects-dialog.component';
import { MatDialog } from '@angular/material/dialog';

describe('CvProjectsDialogComponent', () => {
  let component: CvProjectsDialogComponent;
  let fixture: ComponentFixture<CvProjectsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvProjectsDialogComponent],
    }).compileComponents();

    const dialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(CvProjectsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
