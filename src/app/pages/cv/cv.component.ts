import { Component } from '@angular/core';
import {Observable, Subscription, tap} from "rxjs";
import {Profile} from "../../models/profile.model";
import {Project} from "../../models/project.model";
import {Education} from "../../models/education.model";
import {Skill} from "../../models/skill.model";
import {ServerService} from "../../services/server.service";
import {FormArray, FormBuilder, FormControl, FormsModule} from "@angular/forms";
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
    RouterLink
  ],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss'
})
export class CvComponent {


  // Master Lists
  localProjects: Project[] = []
  skillList: Skill[] = []
  newSkills = ['Python', 'C#', '.NET'];

  // Temp Content
  objectiveText: string | null = ""
  coverLetterText: string | null = ""
  displayedProjectList: Project[] = [];

  // Styles
  theme = 'dark';
  SimpleLayout: boolean = false;
  CoverLetter = true;
  skillDecor = 'none';
  showSkillsDetails = true;
  showBanner = true;

  // Cover Letter
  showSalutation = true;
  showValediction = true;

  // Sections
  showHeader = true;
  showIntro = true;
  showContacts = true;
  showSkills = true;
  showPhoto = true;
  showInfo = true;
  showProgress = true;
  showLearning = true;
  showProjects = true;
  showEducation = true;
  showGPA = true;
  showCerts = false;
  showAwards = false;
  showObjective = true;

  // Contacts
  showEmail = true;
  showPhone = false;
  showEvilPhone = false;
  showWebsite = true;
  showLinkedIn = true;
  showGithub = true;
  showTwitter = false;
  showMastodon = true;
  showTwitch = false;

  // Used to prevent the project list from being loaded multiple times and causing duplicates
  projectsLoaded = false;
  skillsLoaded = false;

  constructor(private server: ServerService, private fb: FormBuilder) {
    // this.profile$ = server.getProfile()
    // this.education$ = server.getEducation()
    // this.skills$ = server.getSkillsByLevel().pipe(tap(data => {
    //   if (!this.skillsLoaded){
    //
    //     data.sort((a, b) => {
    //       if (a.category == b.category){
    //         return 0
    //       }
    //       else if (a.category == "Language"){
    //         return -1
    //       }
    //       else if (a.category == "Script"){
    //         if (b.category == "Language"){
    //           return 1
    //         }
    //         else {
    //           return -1
    //         }
    //       }
    //       else if (a.category == "Infrastructure"){
    //         if (b.category == "Language" || b.category == "Script" || b.category == "Technology"){
    //           return 1
    //         }
    //         else {
    //           return -1
    //         }
    //       }
    //       else if (a.category == "Technology"){
    //         if (b.category == "Language" || b.category == "Script" || b.category == "Infrastructure"){
    //           return 1
    //         }
    //         else {
    //           return -1
    //         }
    //       }
    //       else if (a.category == "Tool"){
    //         if (b.category == "Language" || b.category == "Script" || b.category == "Technology" || b.category == "Infrastructure"){
    //           return 1
    //         }
    //         else {
    //           return -1
    //         }
    //       }
    //       else {
    //         return 1
    //       }
    //     })
    //
    //     data.forEach((item) => {
    //       this.skills.push(this.fb.group({
    //         name: item.name,
    //         level: item.level,
    //         highlight: item.highlight,
    //         display: item.display,
    //       }))
    //       this.skillList = data
    //       this.skillsLoaded = true;
    //     })
    //   }
    // }))
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {

  }

  // populateProjectForm() {
  //   if(this.localProjects) {
  //     this.localProjects.forEach((item) => {
  //       this.projects.push(this.fb.group({
  //         name: item.name,
  //         hasLink: new FormControl({value: item.hasLink, disabled: !item.url}),
  //         cvDisplay: item.cvDisplay,
  //       }))
  //     })
  //   }
  // }
  //
  // saveProjectList(){
  //   localStorage.setItem('CurrentProjectList', JSON.stringify(this.displayedProjectList))
  // }
  //
  // loadProjectList(){
  //   let loadedList = localStorage.getItem('CurrentProjectList')
  //   if (loadedList != null)
  //     this.displayedProjectList = JSON.parse(loadedList)
  // }
  //
  // saveObjective(){
  //   if (this.objectiveText != null)
  //     localStorage.setItem('CurrentObjective', this.objectiveText)
  // }
  //
  // loadObjective(){
  //   this.objectiveText = localStorage.getItem('CurrentObjective')
  // }
  //
  // saveCoverLetter(){
  //   if (this.coverLetterText != null)
  //     localStorage.setItem('CurrentCoverLetter', this.coverLetterText)
  // }
  //
  // loadCoverLetter(){
  //   this.coverLetterText = localStorage.getItem('CurrentCoverLetter')
  //
  //   if (this.coverLetterText == null || this.coverLetterText == ""){
  //     this.coverLetterText = "You appear to have found my CV, Resume, and Cover Letter tool! \n" +
  //       "\n" +
  //       "If you got here by following a link on one of my job applications, welcome and thank you for taking the time to investigate my work.\n" +
  //       "\n" +
  //       "While I have over a decade of experience styling Word documents, I made this tool as a purpose-built alternative that will allow me to keep all of my information updated and consistent for my entire career.  All CSS (barring the Material buttons, inputs, and the progress bars), HTML, and TypeScript running this tool was written by me over a few different passes as I wanted or needed different features.\n" +
  //       "\n" +
  //       "I made the first version because one of my university courses told us to write a builder as our final. As that was beyond trivial, I decided to try making the entire thing in HTML that could save to a PDF, and I had the first working version of this app up and running in about 3 hours. As the school and its career center wanted only the most traditional of resumes possible, I had to include various styling options to meet their highly limiting standards. The career center is still convinced that I used a template I found online and told me to \"*do my own work*\", which I choose to take as a compliment.\n" +
  //       "\n" +
  //       "Later versions included syncing with the website's API so that my skills, projects, and any future certifications or awards I gather will be kept automatically updated. Additional changes since then have been to refine the style and add even more modularity. This cover letter formatter is the most recent addition, allowing me to ensure total styling consistency.\n" +
  //       "\n" +
  //       "The one big flaw in the current design is that the template code is a bit messy and could benefit from some refactoring. Such is the problem with random unplanned and rushed updates, but I will get around to trimming down some of the problems and moving things into their own components when I have the time. A site such as this is never *really* finished, so I fully intend to keep tinkering with this tool over the years, refining it further and further.\n" +
  //       "\n" +
  //       "So, play around with this tool a bit, look over my site, and maybe also hire me so that I can make even better tools for you!"
  //   }
  // }
  //
  resetProjects(){
    this.displayedProjectList = []
  }
  //
  // projectDrop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.displayedProjectList, event.previousIndex, event.currentIndex);
  //   this.saveProjectList();
  // }
  //
  isSimple(b: boolean) {
    this.SimpleLayout = b
    this.CoverLetter = false
  }
  //
  // isCoverLetter(b: boolean) {
  //   this.CoverLetter = b
  // }
  //
  // diffYear(startDate: number, endDate: number) {
  //   const start = new Date(startDate).getFullYear();
  //   const end = new Date(endDate).getFullYear();
  //
  //   return start != end
  // }
  //
  // skillsForm = this.fb.group({
  //   skills: this.fb.array([])
  // })
  //
  // get skills(): FormArray {
  //   return this.skillsForm.get('skills') as FormArray;
  // }
  //
  // saveSkills() {
  //   this.skillList = this.skills.value.filter( (item: Skill) => item.display )
  // }
  //
  // projectsForm = this.fb.group({
  //   projects: this.fb.array([])
  // })
  //
  //
  // get projects(): FormArray {
  //   return this.projectsForm.get('projects') as FormArray;
  // }
  //
  // saveProjects() {
  //   let result = this.projects.value.filter( (item: Project) => item.cvDisplay )
  //   let newProjectList: Project[] = []
  //
  //   this.localProjects.forEach((item) => {
  //     // check if the project name matches a name in the result
  //     let found = result.find((element: Project) => element.name == item.name)
  //
  //     // Update the project with the new values
  //     if (found != undefined){
  //       item.hasLink = found.hasLink
  //
  //       if (found.cvDisplay){
  //         newProjectList.push(item)
  //       }
  //
  //     }
  //   })
  //
  //   this.displayedProjectList = newProjectList
  //   this.saveProjectList();
  // }
  //
  printPage() {
    window.print();
  }

}
