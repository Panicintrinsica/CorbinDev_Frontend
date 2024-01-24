import { Component } from '@angular/core';
import {Skill} from "../../models/skill.model";
import {ServerService} from "../../services/server.service";
import {NgClass} from "@angular/common";
import {SkillDialogComponent} from "../skill-dialog/skill-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {SkillSearchPipe} from "../../pipes/skill-search.pipe";

@Component({
  selector: 'ui-skill-list',
  standalone: true,
  imports: [
    NgClass,
    MatSlideToggle,
    FormsModule,
    MatInput,
    MatLabel,
    MatFormField,
    SkillSearchPipe
  ],
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.scss'
})
export class SkillListComponent {


  sortSkills: boolean = false;
  skills: Skill[] = [];

  // Filtered Arrays
  technology: Skill[] = [];
  languages: Skill[] = [];
  infrastructure: Skill[] = [];
  other: Skill[] = [];
  searchInput: string = "";

  constructor(private server: ServerService, public dialog: MatDialog) {

    this.server.getDisplayedSkills().subscribe(skills => {
      this.skills = skills;

      skills.forEach(item => {
        switch(item.category) {
          case 'Technology':
            this.technology.push(item);
            break;
          case 'Language':
            this.languages.push(item);
            break;
          case 'Infrastructure':
            this.infrastructure.push(item);
            break;
          default:
            this.other.push(item);
        }
      });

    });
  }

  viewSkill(id: string) {
    this.dialog.open(SkillDialogComponent, { data: id, autoFocus: false, width: '100%', maxWidth: '600px'});
  }


}
