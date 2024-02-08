import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {cvConfig, CvService} from "../cv.service";
import {Skill} from "../../../models/skill.model";
import {Education} from "../../../models/education.model";
import {Profile} from "../../../models/profile.model";
import {Project} from "../../../models/project.model";
import {ServerService} from "../../../services/server.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-cv-basic',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './cv-basic.component.html',
  styleUrl: './cv-basic.component.scss'
})
export class CvBasicComponent {
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
