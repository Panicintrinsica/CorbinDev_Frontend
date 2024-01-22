import {Component, Inject} from '@angular/core';
import {Skill} from "../../../../../corbin.dev - OLD AND BROKEN/src/app/models/skill.model";
import {ProjectStub} from "../../../../../corbin.dev - OLD AND BROKEN/src/app/models/project.model";
import {ServerService} from "../../../../../corbin.dev - OLD AND BROKEN/src/app/services/server.service";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {
  GuiSkillsDialogComponent
} from "../../../../../corbin.dev - OLD AND BROKEN/src/app/components/gui-skill-dialog/gui-skill-dialog.component";

@Component({
  selector: 'ui-skill',
  standalone: true,
  imports: [],
  templateUrl: './ui-skill.component.html',
  styleUrl: './ui-skill.component.scss'
})
export class UiSkillComponent {
  skill$: Observable<Skill> | undefined
  projects$: Observable<ProjectStub[]> | undefined

  constructor
  (@Inject(MAT_DIALOG_DATA) public data: string,
   public server: ServerService,
   private router: Router,
   private dialogRef: MatDialogRef<GuiSkillsDialogComponent>
  ) {}

  ngOnInit() {
    this.skill$ = this.server.getSkillByID(this.data)
    this.projects$ = this.server.getProjectsBySkill(this.data)
  }

  goToProject(project: ProjectStub) {
    this.router.navigateByUrl(`project/${project.slug}`);
    this.dialogRef.close()
  }
}
