import { Component, inject, Inject, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { ProjectIndexItem } from '../../../../models/project.model';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ServerService } from '../../../../services/server.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ProjectService } from '../../../../services/project.service';

@Component({
  selector: 'app-cv-projects-dialog',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, MatButton],
  templateUrl: './cv-projects-dialog.component.html',
  styleUrl: './cv-projects-dialog.component.scss',
})
export class CvProjectsDialogComponent implements OnDestroy {
  projects$: Observable<ProjectIndexItem[]> | undefined;
  selectedProjects: string[] = [];
  form: FormGroup;
  private subscription: Subscription | undefined;

  readonly dialogRef = inject(MatDialogRef);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public server: ServerService,
    public projectService: ProjectService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({});
    this.loadProjects();
  }

  private loadProjects() {
    this.projects$ = this.projectService.getProjectIndex();
    this.subscription = this.projects$.subscribe((projects) => {
      this.form = this.fb.group({});
      projects.forEach((project) => {
        this.form.addControl(project.id.toString(), this.fb.control(false));
      });
    });
  }

  ngOnDestroy() {
    this.cleanupForm();
    this.subscription?.unsubscribe();
  }

  private cleanupForm() {
    if (this.form) {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.removeControl(key);
      });
    }
  }

  onCheckboxChange(event: Event, projectId: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedProjects.push(projectId);
    } else {
      this.selectedProjects = this.selectedProjects.filter(
        (id) => id !== projectId,
      );
    }
  }

  submitSelectedProjects() {
    this.projectService.getCvProjects(this.selectedProjects);
    this.dialogRef.close();
  }
}
