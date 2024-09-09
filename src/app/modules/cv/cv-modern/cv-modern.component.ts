import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { cvConfig, CvService } from '../cv.service';

import { ServerService } from '../../../services/server.service';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { Skill } from '../../../models/skill.model';
import { MarkdownComponent } from 'ngx-markdown';
import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { AsyncPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Education } from '../../../models/education.model';
import { CvProjectsComponent } from '../components/cv-projects/cv-projects.component';
import { NamedSkillLevel } from '../../../pipes/skill-named-level.pipe';
import { ContentBlock } from '../../../models/content.model';
import { Detail } from '../../../models/detail.model';
import { getContentBody, getDetail } from '../../../utilities';
import { CONTACTS } from '../../../constants/contacts.consts';

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
    TitleCasePipe,
    CvProjectsComponent,
    NamedSkillLevel,
    AsyncPipe,
  ],
  templateUrl: './cv-modern.component.html',
  styleUrl: './cv-modern.component.scss',
})
export class CvModernComponent implements OnDestroy {
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
  protected readonly CONTACTS = CONTACTS;
}
