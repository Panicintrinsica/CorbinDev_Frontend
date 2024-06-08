import {Component, HostBinding, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {finalize, Observable} from "rxjs";
import {Skill} from "../../models/skill.model";
import {ProjectLink, ProjectStub} from "../../models/project.model";
import {ServerService} from "../../services/server.service";
import {Router} from "@angular/router";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MarkdownComponent} from "ngx-markdown";
import {NamedSkillLevel} from "../../pipes/skill-named-level.pipe";
import {UiSpinnerComponent} from "../ui-spinner/ui-spinner.component";
import {SkillService} from "../../services/skill.service";
import {ProjectService} from "../../services/project.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ProjectListAnim} from "../../animations/list.anim";
import {TagComponent} from "../tag/tag.component";

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
  ],
  templateUrl: './skill-dialog.component.html',
  styleUrl: './skill-dialog.component.scss'
})
export class SkillDialogComponent {
  skill$: Observable<Skill> | undefined
  projects$: Observable<ProjectLink[]> | undefined

  constructor
  (@Inject(MAT_DIALOG_DATA)
   public data: string,
   public projectService: ProjectService,
   public skillService: SkillService,
   private router: Router,
   private dialogRef: MatDialogRef<SkillDialogComponent>
  ) {}

  ngOnInit() {
    this.skill$ = this.skillService.getSkillById(this.data)
    this.projects$ = this.projectService.getProjectsBySkill(this.data)
  }

  goToProject(projectSlug: string) {
    this.router.navigateByUrl(`project/${projectSlug}`).then(r => {});
    this.dialogRef.close()
  }

}
