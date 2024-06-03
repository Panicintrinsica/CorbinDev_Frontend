import {Component} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatOption, MatSelect} from "@angular/material/select";
import {ProjectGroups, ProjectTypes} from "../../../constants/project.consts";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {SkillService} from "../../../services/skill.service";
import {NgSelectModule} from "@ng-select/ng-select";
import {BasicSkill} from "../../../models/skill.model";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";


@Component({
  selector: 'app-admin-projects-editor',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelect,
    MatOption,
    MatCheckbox,
    MatButton,
    NgSelectModule,
    AsyncPipe
  ],
  templateUrl: './admin-projects-editor.component.html',
  styleUrl: './admin-projects-editor.component.scss'
})
export class AdminProjectsEditorComponent {
  skillList: Observable<BasicSkill[]>

  constructor(private skillService: SkillService) {
    this.skillList = this.skillService.getSkillList();
  }

  protected readonly ProjectType = ProjectTypes;
  protected readonly ProjectGroups = ProjectGroups;
}
