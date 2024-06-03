import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ServerService} from "../../services/server.service";
import {Skill} from "../../models/skill.model";
import {ProjectStub} from "../../models/project.model";
import {SkillDialogComponent} from "../skill-dialog/skill-dialog.component";

@Component({
  selector: 'ui-skill',
  standalone: true,
  imports: [],
  templateUrl: './ui-skill.component.html',
  styleUrl: './ui-skill.component.scss'
})
export class UiSkillComponent implements OnInit {
  skill$: Observable<Skill> | undefined
  projects$: Observable<ProjectStub[]> | undefined

  constructor
  (@Inject(MAT_DIALOG_DATA) public data: string,
   public server: ServerService,
   private router: Router,
   private dialogRef: MatDialogRef<SkillDialogComponent>
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
