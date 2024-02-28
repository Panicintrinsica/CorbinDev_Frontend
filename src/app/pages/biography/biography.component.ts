import { Component } from '@angular/core';
import {ServerService} from "../../services/server.service";
import {MatDialog} from "@angular/material/dialog";
import {SkillDialogComponent} from "../../components/skill-dialog/skill-dialog.component";
import {MarkdownComponent} from "ngx-markdown";
import {AsyncPipe, NgClass, TitleCasePipe} from "@angular/common";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {Skill} from "../../models/skill.model";
import {SkillListComponent} from "../../components/skill-list/skill-list.component";

@Component({
  selector: 'app-biography',
  standalone: true,
  imports: [
    MarkdownComponent,
    AsyncPipe,
    NgClass,
    TitleCasePipe,
    MatSlideToggle,
    FormsModule,
    SkillListComponent
  ],
  templateUrl: './biography.component.html',
  styleUrl: './biography.component.scss'
})
export class BiographyComponent {
  profile$ = this.server.getProfile()

  education$ = this.server.getEducation()

  constructor(private server: ServerService) {

  }


}
