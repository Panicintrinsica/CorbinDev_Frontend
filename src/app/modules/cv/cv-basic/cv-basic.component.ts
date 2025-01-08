import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { cvConfig, CvService } from '../cv.service';
import { Skill } from '../../../models/skill.model';
import { Education } from '../../../models/education.model';
import { ServerService } from '../../../services/server.service';
import { AsyncPipe, DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { Detail } from '../../../models/detail.model';
import { ContentBlock } from '../../../models/content.model';
import { getContentBody, getDetail } from '../../../utilities';
import { MarkdownComponent } from 'ngx-markdown';
import { MatButton } from '@angular/material/button';
import { CvProjectsComponent } from '../components/cv-projects/cv-projects.component';
import { CvSkillBlockComponent } from '../components/cv-skill-block/cv-skill-block.component';

@Component({
    selector: 'app-cv-basic',
    imports: [
        NgClass,
        AsyncPipe,
        MarkdownComponent,
        MatButton,
        CvProjectsComponent,
        DatePipe,
        TitleCasePipe,
        CvSkillBlockComponent,
    ],
    templateUrl: './cv-basic.component.html',
    styleUrl: './cv-basic.component.scss'
})
export class CvBasicComponent {
  config$: Subscription;
  config: cvConfig = <cvConfig>{};

  skills$: Subscription;
  skills: Skill[] = <Skill[]>[];

  education$: Subscription;
  education: Education[] = <Education[]>[];

  contactData: Detail[] = <Detail[]>[];
  profileData: Detail[] = <Detail[]>[];

  coverLetterText = 'text';

  content$: Observable<ContentBlock[]>;
  details$: Observable<Detail[]>;

  constructor(
    private cvs: CvService,
    private server: ServerService,
  ) {
    this.content$ = server.getContentGroup('cv');
    this.details$ = server.getAllDetails();

    server.getAllDetails().subscribe({
      next: (value: Detail[]) => {
        this.contactData = value.filter((d) => d.group === 'contact');
        this.profileData = value.filter((d) => d.group === 'profile');
      },
    });

    this.config$ = cvs.getConfig().subscribe({
      next: (value) => {
        this.config = value;
      },
      error: (err) => {
        this.config = cvs.defaultConfig;
        console.log(err);
      },
    });

    this.skills$ = server.getAllSkills().subscribe({
      next: (value) => (value ? (this.skills = value) : []),
    });

    this.education$ = server.getEducation().subscribe({
      next: (value) => (value ? (this.education = value) : []),
    });
  }

  ngOnDestroy() {
    this.config$.unsubscribe();
  }

  protected readonly getDetail = getDetail;
  protected readonly getContentBody = getContentBody;
}
