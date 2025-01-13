import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { NamedSkillLevel } from '../../../pipes/skill-named-level.pipe';

import { SkillService } from '../../../services/skill.service';
import { ProjectService } from '../../projects/project.service';

import { ProjectListAnim } from '../../../animations/list.anim';
import { UiSpinnerComponent } from '../../ui/ui-spinner/ui-spinner.component';
import { TagComponent } from '../../ui/ui-tag/tag.component';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'ui-skill-dialog',
  animations: [ProjectListAnim],
  imports: [
    MarkdownComponent,
    DatePipe,
    NamedSkillLevel,
    UiSpinnerComponent,
    TagComponent,
    MatAnchor,
  ],
  templateUrl: './skill-dialog.component.html',
  standalone: true,
  styleUrl: './skill-dialog.component.scss',
})
export class SkillDialogComponent {
  skillService = inject(SkillService);
  projectService = inject(ProjectService);

  skill = this.skillService.skillDetails;
  projects = this.projectService.projectLinks;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: string,
    private router: Router,
    private dialogRef: MatDialogRef<SkillDialogComponent>,
  ) {}

  ngOnInit() {
    this.skillService.fetchSkillDetails(this.data);
    this.projectService.fetchProjectsBySkill(this.data);
  }

  goToProject(projectSlug: string) {
    this.router.navigateByUrl(`project/${projectSlug}`).then(() => {});
    this.dialogRef.close();
  }
}
