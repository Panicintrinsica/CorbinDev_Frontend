import { Component } from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MarkdownComponent} from "ngx-markdown";
import {Observable, tap} from "rxjs";
import {Project} from "../../models/project.model";
import {ServerService} from "../../services/server.service";
import {MatDialog} from "@angular/material/dialog";
import {SkillDialogComponent} from "../../components/skill-dialog/skill-dialog.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {UiProjectComponent} from "../../components/ui-project/ui-project.component";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatAnchor,
    DatePipe,
    MarkdownComponent,
    NgClass,
    AsyncPipe,
    MatTabGroup,
    MatTab,
    UiProjectComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  project$: Observable<Project[]>

  professional: Project[] = []
  personal: Project[] = []
  openSource: Project[] = []

  constructor(public dialog: MatDialog, private server: ServerService) {
    this.project$ = this.server.getProjects().pipe(tap((result) => {
      this.professional = filterProjects(result, 'professional')
      this.personal = filterProjects(result, 'personal')
      this.openSource = filterProjects(result, 'openSource')
    }))
  }


}

function filterProjects(array: Project[], filter: string){
  return array.filter((x => x.category === filter))
}
