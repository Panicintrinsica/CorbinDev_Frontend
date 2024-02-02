import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {cvConfig, CvService} from "../cv.service";
import {Profile} from "../../../models/profile.model";
import {ServerService} from "../../../services/server.service";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {Skill} from "../../../models/skill.model";
import {MarkdownComponent} from "ngx-markdown";
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {Project} from "../../../models/project.model";
import {Education} from "../../../models/education.model";

@Component({
  selector: 'app-cv-modern',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MarkdownComponent,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    DatePipe,
    TitleCasePipe
  ],
  templateUrl: './cv-modern.component.html',
  styleUrl: './cv-modern.component.scss'
})
export class CvModernComponent implements OnDestroy {

  config$: Subscription;
  config: cvConfig = <cvConfig>{};

  skills$: Subscription;
  skills: Skill[] = <Skill[]>{};

  education$: Subscription;
  education: Education[] = <Education[]>{};

  profile$: Subscription;
  profile: Profile = <Profile>{};

  coverLetterText = 'text';

  displayedProjects: Project[] = []

  constructor(private cvs: CvService, private server: ServerService) {
    this.config$ = cvs.getConfig().subscribe({
      next: value => {
        this.config = value
      },
      error: err => {
        this.config = cvs.defaultConfig
        console.log(err)
      }
    });

    this.profile$ = cvs.profile$.subscribe({
      next: value => value ? this.profile = value : {}
    })

    this.skills$ = cvs.skills$.subscribe({
      next: value => value ? this.skills = value : {}
    });

    this.education$ = cvs.education$.subscribe({
      next: value => value ? this.education = value : {}
    });
  }

  ngOnDestroy() {
    this.config$.unsubscribe();
    this.profile$.unsubscribe();
  }

  diffYear(startDate: number, endDate: number) {
    const start = new Date(startDate).getFullYear();
    const end = new Date(endDate).getFullYear();
    return start != end
  }

  projectDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedProjects, event.previousIndex, event.currentIndex);
    this.saveProjectList();
  }

  saveProjectList(){
    localStorage.setItem('CurrentProjectList', JSON.stringify(this.displayedProjects))
  }


}
