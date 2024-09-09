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
import { Project } from '../../../../models/project.model';
import { ServerService } from '../../../../services/server.service';
import { MatDialog } from '@angular/material/dialog';
import { CvProjectsDialogComponent } from '../cv-projects-dialog/cv-projects-dialog.component';

@Component({
  selector: 'cv-projects',
  standalone: true,
  imports: [CdkDrag, CdkDragHandle, CdkDropList, DatePipe, MatButton],
  templateUrl: './cv-projects.component.html',
  styleUrl: './cv-projects.component.scss',
})
export class CvProjectsComponent {
  projectList!: Project[];

  readonly dialog = inject(MatDialog);

  constructor(private server: ServerService) {
    server.getCVProjects().subscribe({
      next: (value) => {
        this.projectList = value;
        this.displayedProjects = value;
      },
    });
  }

  displayedProjects: Project[] = [];

  projectDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedProjects,
      event.previousIndex,
      event.currentIndex,
    );
    this.saveProjectList();
  }

  saveProjectList() {
    localStorage.setItem(
      'CurrentProjectList',
      JSON.stringify(this.displayedProjects),
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
