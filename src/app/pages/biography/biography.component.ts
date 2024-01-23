import { Component } from '@angular/core';
import {ServerService} from "../../services/server.service";
import {MatDialog} from "@angular/material/dialog";
import {SkillDialogComponent} from "../../components/skill-dialog/skill-dialog.component";
import {MarkdownComponent} from "ngx-markdown";
import {AsyncPipe, NgClass, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-biography',
  standalone: true,
  imports: [
    MarkdownComponent,
    AsyncPipe,
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './biography.component.html',
  styleUrl: './biography.component.scss'
})
export class BiographyComponent {
  profile$ = this.server.getProfile()
  skills$ = this.server.getDisplayedSkills()
  education$ = this.server.getEducation()

  constructor(private server: ServerService, public dialog: MatDialog) {
  }

  viewSkill(id: string) {
    this.dialog.open(SkillDialogComponent, { data: id, autoFocus: false, width: '100%', maxWidth: '600px'});
  }
}
