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
import {getContentBody} from "../../utilities";

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

  details: any = {};

  protected content$: Observable<ContentBlock[]>;

  firstName = "";
  lastName = "";
  location = "";
  pronouns = "";
  bio = "";

  constructor(private server: ServerService) {

    this.content$ = server.getContentGroup("bio")

    this.server.getAllDetails().subscribe(
      (details) => {
        this.firstName = details.filter((detail: Detail) => detail.label === "firstName")[0].content;
        this.lastName = details.filter((detail: Detail) => detail.label === "lastName")[0].content;
        this.location = details.filter((detail: Detail) => detail.label === "location")[0].content;
        this.pronouns = details.filter((detail: Detail) => detail.label === "pronouns")[0].content;
        this.bio = details.filter((detail: Detail) => detail.label === "bio")[0].content;
      }
    )




  }

  protected readonly getContentBody = getContentBody;
}
