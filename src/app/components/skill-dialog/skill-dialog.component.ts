import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Skill} from "../../models/skill.model";
import {ProjectStub} from "../../models/project.model";
import {ServerService} from "../../services/server.service";
import {Router} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MarkdownComponent} from "ngx-markdown";

@Component({
  selector: 'ui-skill-dialog',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    MarkdownComponent,
    NgForOf
  ],
  templateUrl: './skill-dialog.component.html',
  styleUrl: './skill-dialog.component.scss'
})
export class SkillDialogComponent {
  skill$: Observable<Skill> | undefined
  projects$: Observable<ProjectStub[]> | undefined

  constructor
  (@Inject(MAT_DIALOG_DATA) public data: string,
   public server: ServerService,
   private router: Router,
   private dialogRef: MatDialogRef<SkillDialogComponent>
  ) {}

  ngOnInit() {
    this.skill$ = this.server.getSkill(this.data)
    this.projects$ = this.server.getProjectsBySkill(this.data)
  }

  goToProject(project: ProjectStub) {
    this.router.navigateByUrl(`project/${project.slug}`).then(r => {});
    this.dialogRef.close()
  }

}
