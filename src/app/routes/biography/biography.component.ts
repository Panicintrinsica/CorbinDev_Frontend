import {Component} from '@angular/core';
import {ServerService} from "../../services/server.service";
import {MarkdownComponent} from "ngx-markdown";
import {AsyncPipe, NgClass, TitleCasePipe} from "@angular/common";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {SkillListComponent} from "../../components/skill-list/skill-list.component";
import {Detail} from '../../models/detail.model';
import {Observable, Subscription} from "rxjs";
import {ContentBlock} from "../../models/content.model";
import {getContentBody, getDetail} from "../../utilities";

@Component({
  selector: 'app-biography',
  standalone: true,
  imports: [
    MarkdownComponent,
    AsyncPipe,
    NgClass,
    TitleCasePipe,
    MatSlideToggle,
    FormsModule,
    SkillListComponent
  ],
  templateUrl: './biography.component.html',
  styleUrl: './biography.component.scss'
})
export class BiographyComponent {

  content$: Observable<ContentBlock[]>;

  details: any = {};
  details$: Observable<Detail[]>;

  constructor(private server: ServerService) {
    this.content$ = server.getContentGroup("bio")
    this.details$ = server.getAllDetails()
  }

  protected readonly getContentBody = getContentBody;
  protected readonly getDetail = getDetail;
}
