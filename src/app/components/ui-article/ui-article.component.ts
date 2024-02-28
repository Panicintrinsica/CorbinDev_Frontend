import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {DatePipe, JsonPipe, LowerCasePipe, NgClass} from "@angular/common";
import {MarkdownComponent, MarkdownPipe} from "ngx-markdown";
import {Article} from "../../models/article.model";

interface onInit {
}

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
export class UiArticleComponent implements onInit {
  @Input() data: Partial<Article> = {
    id: "",
    slug: "",
    title: "",
    aboveFold: "",
    content: "",
    category: "",
    tags: [],
    xata: {
      createdAt: "",
      updatedAt: "",
      version: 0
    }
  };

  @Input() isStub: boolean = false;

  fullText: string | undefined = "";

  ngOnInit(): void {
    if(this.data.content){
      this.fullText = this.data.aboveFold + "\n\n" + this.data.content;
    } else {
      this.fullText = this.data.aboveFold
    }
  }

}
