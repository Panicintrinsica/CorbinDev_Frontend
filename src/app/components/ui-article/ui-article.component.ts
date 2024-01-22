import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {DatePipe, JsonPipe, LowerCasePipe, NgClass} from "@angular/common";
import {MarkdownComponent, MarkdownPipe} from "ngx-markdown";
import {Article} from "../../models/article.model";

@Component({
  selector: 'ui-article',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    LowerCasePipe,
    DatePipe,
    MarkdownPipe,
    NgClass,
    JsonPipe,
    MarkdownComponent
  ],
  templateUrl: './ui-article.component.html',
  styleUrl: './ui-article.component.scss'
})
export class UiArticleComponent {
  @Input() data: Article = {
    author: "",
    category: "",
    fullContent: "",
    isPublished: false,
    shortContent: "",
    slug: "",
    tags: [],
    title: ""
  };

  @Input() isStub: boolean = false;

}
