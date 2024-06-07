import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {cvConfig, CvService} from "../cv.service";
import {Profile} from "../../../models/profile.model";
import {AsyncPipe, NgClass} from "@angular/common";
import {MarkdownComponent} from "ngx-markdown";
import {CoverletterPipe} from "../../../pipes/coverletter.pipe";
import {ServerService} from "../../../services/server.service";
import {getContentBody, getDetail} from "../../../utilities";
import {ContentBlock} from "../../../models/content.model";
import {Detail} from "../../../models/detail.model";

@Component({
  selector: 'app-coverletter',
  standalone: true,
  imports: [
    NgClass,
    MarkdownComponent,
    CoverletterPipe,
    AsyncPipe
  ],
  templateUrl: './coverletter.component.html',
  styleUrl: './coverletter.component.scss',
})
export class CoverletterComponent implements OnDestroy {

  config$: Subscription;
  config: cvConfig = <cvConfig>{};

  details: any = {};
  details$: Observable<Detail[]>;

  content$: Observable<ContentBlock[]>;

  coverLetterText!: string;

  constructor(private cvs: CvService, private server: ServerService, private cdr: ChangeDetectorRef) {
    this.config$ = cvs.getConfig().subscribe({
      next: value => {
        this.config = value
      },
      error: err => {
        this.config = cvs.defaultConfig
      }
    });
    this.content$ = server.getContentGroup("cv")
    this.details$ = server.getAllDetails()

    this.getCoverLetter()
  }

  ngOnDestroy() {}

  saveCoverLetter() {
    localStorage.setItem('coverLetter', this.coverLetterText);
  }

  getCoverLetter() {
    const coverLetter = localStorage.getItem('coverLetter');

    if (coverLetter) {
      this.coverLetterText = coverLetter;

    } else {

    this.content$.subscribe({
      next: (value: ContentBlock[]) => {
        this.coverLetterText = getContentBody(value, "cvDefaultCover");
        this.cdr.detectChanges();
      }
    });

    }
  }

  protected readonly getContentBody = getContentBody;
  protected readonly getDetail = getDetail;
}
