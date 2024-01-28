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

  coverLetterText = 'text';

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
