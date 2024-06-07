import {Component, OnDestroy} from '@angular/core';
import {Project} from "../../../models/project.model";
import {ServerService} from "../../../services/server.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Observable, Subscription} from "rxjs";
import {SkillDialogComponent} from "../../../components/skill-dialog/skill-dialog.component";
import {MatAnchor, MatButton} from "@angular/material/button";
import {AsyncPipe, DatePipe, NgClass} from "@angular/common";
import {MarkdownComponent} from "ngx-markdown";
import {GoBackDirective} from "../../../directives/go-back.directive";
import {SkillLink} from "../../../models/skill.model";
import {SkillService} from "../../../services/skill.service";
import {ProjectListAnim, SkillListAnim} from "../../../animations/list.anim";

@Component({
  selector: 'app-project',
  standalone: true,
  animations: [SkillListAnim],
  imports: [
    MatButton,
    RouterLink,
    MatAnchor,
    NgClass,
    MarkdownComponent,
    DatePipe,
    GoBackDirective,
    AsyncPipe
  ],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss'
})
export class ProjectPageComponent implements OnDestroy {
  project: Project | undefined
  private projectSub!: Subscription;

  skills$: Observable<SkillLink[]> | undefined;

  constructor(
    server: ServerService,
    skillService: SkillService,
    route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    route.paramMap.subscribe(params => {
      const slug = params.get('slug')
      if(slug){
        this.projectSub = server.getProjectBySlug(slug).subscribe({
          next: projectData => {
            this.project = projectData
            this.skills$ = skillService.getSkillsByProject(projectData.id)
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
