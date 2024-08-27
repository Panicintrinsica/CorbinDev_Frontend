import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Skill } from '../../../models/skill.model';
import { ProjectLink } from '../../../models/project.model';

import { Router } from '@angular/router';
import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  NgOptimizedImage,
} from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { NamedSkillLevel } from '../../../pipes/skill-named-level.pipe';

import { SkillService } from '../../../services/skill.service';
import { ProjectService } from '../../../services/project.service';

import { ProjectListAnim } from '../../../animations/list.anim';
import { UiSpinnerComponent } from '../../ui/ui-spinner/ui-spinner.component';
import { TagComponent } from '../../ui/ui-tag/tag.component';
import { MatAnchor, MatButton } from '@angular/material/button';

@Component({
  selector: 'ui-skill-dialog',
  standalone: true,
  animations: [ProjectListAnim],
  imports: [
    AsyncPipe,
    NgIf,
    MarkdownComponent,
    NgForOf,
    NgOptimizedImage,
    DatePipe,
    NamedSkillLevel,
    UiSpinnerComponent,
    NgClass,
    TagComponent,
    MatButton,
    MatAnchor,
  ],
  templateUrl: './skill-dialog.component.html',
  styleUrl: './skill-dialog.component.scss',
})
export class SkillDialogComponent {
  skill$: Observable<Skill> | undefined;
  projects$: Observable<ProjectLink[]> | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: string,
    public projectService: ProjectService,
    public skillService: SkillService,
    private router: Router,
    private dialogRef: MatDialogRef<SkillDialogComponent>,
  ) {}

  ngOnInit() {
    this.skill$ = this.skillService.getSkillById(this.data);
    this.projects$ = this.projectService.getProjectsBySkill(this.data);
  }

  goToProject(projectSlug: string) {
    this.router.navigateByUrl(`project/${projectSlug}`).then(() => {});
    this.dialogRef.close();
  }
}
