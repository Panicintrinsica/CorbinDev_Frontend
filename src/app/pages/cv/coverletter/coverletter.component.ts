import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {cvConfig, CvService} from "../cv.service";
import {Profile} from "../../../models/profile.model";
import {NgClass} from "@angular/common";
import {MarkdownComponent} from "ngx-markdown";
import {CoverletterPipe} from "../../../pipes/coverletter.pipe";

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
  coverLetterText = 'text';

  constructor(private cvs: CvService) {
    this.config$ = cvs.getConfig().subscribe({
      next: value => {
        this.config = value
        console.log(value)
      },
      error: err => {
        this.config = cvs.defaultConfig
        console.log(err)
      }
    });

    this.profile$ = cvs.getProfile().subscribe({
      next: value => {
        this.profile = value
        console.log(value)
      },
      error: err => {
        this.config = cvs.defaultConfig
      }
    });
  }

  ngOnDestroy() {
    this.config$.unsubscribe();
    this.profile$.unsubscribe();
  }


}
