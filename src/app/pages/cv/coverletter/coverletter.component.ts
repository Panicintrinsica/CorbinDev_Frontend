import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {cvConfig, CvService} from "../cv.service";
import {Profile} from "../../../models/profile.model";
import {NgClass} from "@angular/common";
import {MarkdownComponent} from "ngx-markdown";
import {CoverletterPipe} from "../../../pipes/coverletter.pipe";
import {ServerService} from "../../../services/server.service";

@Component({
  selector: 'app-coverletter',
  standalone: true,
  imports: [
    NgClass,
    MarkdownComponent,
    CoverletterPipe
  ],
  templateUrl: './coverletter.component.html',
  styleUrl: './coverletter.component.scss'
})
export class CoverletterComponent implements OnDestroy {

  config$: Subscription;
  config: cvConfig = <cvConfig>{};

  profile$: Subscription;
  profile: Profile = <Profile>{};

  coverLetterText = 'My name is Emrys Corbin, and I am eagerly applying for the **Junior Front End Engineer** position. As a seasoned front and back end developer with over 4 years experience in modern JS/TS frameworks, including deeply complex and unorthodox uses of Angular, I believe that I am well qualified for this role.\n' +
    '\n' +
    'I am/was primarily self-taught, and started my development journey as a teen building and customizing old PHP frameworks for personal projects, before eventually moving on to TypeScript, C#, and Java/Kotlin as an adult.  When it became clear that that Software Engineering was going to be my career, and after I had already done a couple of freelance jobs, I decided to make it official. I enrolled in Missouri State University to get my bachelor\'s in Application Development, and I am currently 88% done with that degree, but I am more than ready to finally join a real team. I love programming and learning new skills, and I can rapidly add new tools to my kit as required. As any good developer will say, continuing education is a career requirement, and one that I am highly proficient in. It also helps that I\'ve been doing  remote work with people for over a decade, and thought that project management software was a fun thing to learn when I was a teenager. \n' +
    '\n' +
    'Over the last few years, I have worked on multiple complex projects, from deeply interwoven game logic in TypeScript, to a full-stack web development project for a local business with Angular and Stripe payments. I have learned a lot as a solo developer and some as a student, but it\'s time to take the next step and join a high-performance team where I can learn, grow and contribute high-quality solutions with real value.\n' +
    '\n' +
    'Minware is precisely the kind of company I want to work for. Someplace that values software engineering and quality, works to make the development experience better for everyone, and treats its employees like intellectually capable adults. Making tools to simplify complex tasks and extract meaningful information is something that I already do on my own time, and I know my own unique experiences in this area would provide significant value.';

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
  }

  ngOnDestroy() {
    this.config$.unsubscribe();
    this.profile$.unsubscribe();
  }

}
