import { Component, inject } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { CvProject, Project } from '../../../../models/project.model';
import { MatDialog } from '@angular/material/dialog';
import { CvProjectsDialogComponent } from '../cv-projects-dialog/cv-projects-dialog.component';
import { ProjectService } from '../../../../services/project.service';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
    selector: 'cv-projects',
    imports: [
        CdkDrag,
        CdkDragHandle,
        CdkDropList,
        DatePipe,
        MatButton,
        MarkdownComponent,
    ],
    templateUrl: './cv-projects.component.html',
    styleUrl: './cv-projects.component.scss'
})
export class CvProjectsComponent {
  projectList!: Project[];

  readonly dialog = inject(MatDialog);

  constructor(private ps: ProjectService) {
    ps.getCvProjectSubject().subscribe({
      next: (value) => {
        this.displayedProjects = value;
      },
    });
  }

  displayedProjects: CvProject[] = [];

  projectDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedProjects,
      event.previousIndex,
      event.currentIndex,
    );
  }

  diffYear(startDate: number, endDate: number) {
    const start = new Date(startDate).getFullYear();
    const end = new Date(endDate).getFullYear();
    return start != end;
  }

  editProjectList() {
    this.dialog.open(CvProjectsDialogComponent);
  }
}
