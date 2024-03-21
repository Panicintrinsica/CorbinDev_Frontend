import {Component, OnDestroy} from '@angular/core';
import {Project} from "../../models/project.model";
import {ServerService} from "../../services/server.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {SkillDialogComponent} from "../../components/skill-dialog/skill-dialog.component";
import {MatAnchor, MatButton} from "@angular/material/button";
import {DatePipe, NgClass} from "@angular/common";
import {MarkdownComponent} from "ngx-markdown";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatAnchor,
    NgClass,
    MarkdownComponent,
    DatePipe
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnDestroy {
  project: Project | undefined
  private projectSub!: Subscription;

  constructor(server: ServerService, route: ActivatedRoute, public dialog: MatDialog) {
    route.paramMap.subscribe(params => {
      const slug = params.get('slug')
      if(slug){
        this.projectSub = server.getProjectBySlug(slug).subscribe({
          next: value => {
            this.project = value
          },
          error: err => console.error(err)
        })
      }
    });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe()
  }

  viewSkill(id: string) {
    this.dialog.open(SkillDialogComponent, { data: id, autoFocus: false, width: '100%', maxWidth: '600px'});
  }


}
