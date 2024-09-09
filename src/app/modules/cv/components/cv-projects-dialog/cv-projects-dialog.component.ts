import { Component, Inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { Observable } from 'rxjs';
import { ProjectStub } from '../../../../models/project.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServerService } from '../../../../services/server.service';

@Component({
  selector: 'app-cv-projects-dialog',
  standalone: true,
  imports: [AsyncPipe, MarkdownComponent, NgIf],
  templateUrl: './cv-projects-dialog.component.html',
  styleUrl: './cv-projects-dialog.component.scss',
})
export class CvProjectsDialogComponent {
  projects$: Observable<ProjectStub[]> | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public server: ServerService,
  ) {}

  ngOnInit() {
    this.projects$ = this.server.getProjectStubs();
  }
}
