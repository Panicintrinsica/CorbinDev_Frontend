import { Component } from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {UiArticleComponent} from "../../components/ui-article/ui-article.component";
import {Observable} from "rxjs";
import {ArticlePage} from "../../models/article.model";
import {ServerService} from "../../services/server.service";

@Component({
  selector: 'app-blog',
  standalone: true,
    imports: [
        AsyncPipe,
        UiArticleComponent
    ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  article$: Observable<ArticlePage>

  constructor(private server: ServerService) {
    this.article$ = server.getArticlePage()
  }

  ngOnInit(): void {
  }

  pageSelect(page: number) {

  }

  firstPage() {

  }

  prevPage(s: string) {

  }

  nextPage() {

  }

  lastPage() {

  }
}
