import { Component, OnDestroy } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { SkillDialogComponent } from '../../skills/skill-dialog/skill-dialog.component';
import { MatAnchor, MatButton } from '@angular/material/button';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { GoBackDirective } from '../../../directives/go-back.directive';
import { SkillLink } from '../../../models/skill.model';
import { SkillService } from '../../../services/skill.service';
import { SkillListAnim } from '../../../animations/list.anim';
import { TagComponent } from '../../ui/ui-tag/tag.component';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project',
  animations: [SkillListAnim],
  imports: [
    MatButton,
    MatAnchor,
    MarkdownComponent,
    DatePipe,
    GoBackDirective,
    AsyncPipe,
    TagComponent,
  ],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss',
  standalone: true,
})
export class ProjectPageComponent implements OnDestroy {
  project: Project | undefined;
  private projectSub!: Subscription;

  skills$: Observable<SkillLink[]> | undefined;

  constructor(
    projectService: ProjectService,
    skillService: SkillService,
    route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.projectSub = projectService.getProjectBySlug(slug).subscribe({
          next: (projectData) => {
            this.project = projectData;
            this.skills$ = skillService.getSkillsByProject(projectData.id);
          },
          error: (err) => console.error(err),
        });
      }
    });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }

  viewSkill(id: string) {
    this.dialog.open(SkillDialogComponent, {
      data: id,
      autoFocus: false,
      width: '100%',
      maxWidth: '600px',
    });
  }
}
