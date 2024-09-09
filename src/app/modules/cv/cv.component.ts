import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Project } from '../../models/project.model';

import { ServerService } from '../../services/server.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CdkDrag, CdkDragHandle, CdkDropList } from '@angular/cdk/drag-drop';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatCheckbox } from '@angular/material/checkbox';
import { MarkdownComponent } from 'ngx-markdown';
import { CoverletterPipe } from '../../pipes/coverletter.pipe';
import { RouterLink, RouterOutlet } from '@angular/router';
import { cvConfig, CvService } from './cv.service';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    FormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    MatIcon,
    NgIf,
    NgForOf,
    AsyncPipe,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatCheckbox,
    MarkdownComponent,
    CoverletterPipe,
    NgClass,
    TitleCasePipe,
    DatePipe,
    CdkDropList,
    CdkDragHandle,
    CdkDrag,
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss',
})
export class CvComponent implements OnDestroy {
  displayedProjectList: Project[] = [];

  // Styles
  theme = 'dark';
  SimpleLayout: boolean = false;
  CoverLetter = true;

  configLoaded = false;

  showPhone = false;

  config$: Subscription;
  configChange$!: Subscription;
  config: cvConfig = <cvConfig>{};

  configForm: FormGroup = this.fb.group({
    theme: ['dark'],
    skillDecor: ['chevron'],
    showBanner: [true],
    showSkillDetails: [true],
    showHeader: [true],
    showIntro: [true],
    showContacts: [true],
    showSkills: [true],
    showPhoto: [true],
    showInfo: [true],
    showProgress: [true],
    showLearning: [true],
    showProjects: [true],
    showEducation: [true],
    showGPA: [true],
    showCerts: [true],
    showAwards: [true],
    showObjective: [true],
    showEmail: [true],
    showPhone: [true],
    showEvilPhone: [true],
    showURL: [true],
    showLinkedIn: [true],
    showGithub: [true],
    showMastodon: [true],
    showTwitch: [true],
    showYouTube: [true],
    showSalutation: [true],
    showValediction: [true],
    showInstagram: [false],
    showPixelfed: [false],
    showBluesky: [false],
  });

  constructor(
    private server: ServerService,
    private fb: FormBuilder,
    private cvs: CvService,
  ) {
    this.config$ = cvs.getConfig().subscribe({
      next: (value) => {
        this.config = value;

        if (!this.configLoaded) {
          this.configForm.patchValue(value);
          this.configLoaded = true;
        }
      },
      error: (err) => {
        this.config = cvs.defaultConfig;
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.configChange$ = this.configForm.valueChanges.subscribe(() => {
      // Ensure it isn't triggered by programmatic changes
      if (this.configForm.dirty) {
        this.onSubmit();
      }
    });
  }

  onSubmit() {
    this.cvs.updateConfig(this.configForm.value);
  }

  resetProjects() {
    this.displayedProjectList = [];
  }

  printPage() {
    window.print();
  }

  ngOnDestroy() {
    this.config$.unsubscribe();
    this.configChange$.unsubscribe();
  }
}
