import {Component, OnDestroy} from '@angular/core';
import {debounceTime, filter, Observable, Subscription, tap} from "rxjs";
import {Profile} from "../../models/profile.model";
import {Project} from "../../models/project.model";
import {Education} from "../../models/education.model";
import {Skill} from "../../models/skill.model";
import {ServerService} from "../../services/server.service";
import {FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatCheckbox} from "@angular/material/checkbox";
import {MarkdownComponent} from "ngx-markdown";
import {CoverletterPipe} from "../../pipes/coverletter.pipe";
import {RouterLink, RouterOutlet} from "@angular/router";
import {cvConfig, CvService} from "./cv.service";

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
    ReactiveFormsModule
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CvComponent implements OnDestroy {


  displayedProjectList: Project[] = [];

  blockChanges = true

  // Styles
  theme = 'dark';
  SimpleLayout: boolean = false;
  CoverLetter = true;

  showPhone = false;

  config$: Subscription;
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
    showYoutube: [true],
    showSalutation: [true],
    showValediction: [true]
  });

  constructor(
    private server: ServerService,
    private fb: FormBuilder,
    private cvs: CvService
  ) {
    this.config$ = cvs.getConfig().subscribe({
      next: value => {
        this.config = value
        this.configForm.patchValue(value)
      },
      error: err => {
        this.config = cvs.defaultConfig
        console.log(err)
      }
    });

    this.configForm.valueChanges.pipe(
      // debounceTime adds a small delay to prevent the method from being called too frequently
      debounceTime(500),
      // only react when the form values are valid (i.e. all form validation checks pass)
      filter(() => this.configForm.valid && !this.blockChanges)
    ).subscribe(formValues => {
      // Handle your form submission logic here.
      // `formValues` is an object that holds the current values of the form.
      console.log(formValues);
      this.updateForm();
    });

  }

  ngOnInit(): void {

  }

  resetProjects(){
    this.displayedProjectList = []
  }

  printPage() {
    window.print();
  }

  ngOnDestroy() {
    this.config$.unsubscribe();
  }

  private updateForm() {
    console.log("Updating Form Config...")
    this.blockChanges = false
    this.cvs.updateConfig(this.config);
    this.blockChanges = true
  }
}
