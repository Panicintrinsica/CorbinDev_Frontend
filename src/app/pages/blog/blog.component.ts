import { Component } from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {UiArticleComponent} from "../../components/ui-article/ui-article.component";
import {map, Observable} from "rxjs";
import {Article} from "../../models/article.model";
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
  article$: Observable<Article[]>
  page$: Observable<Number | void>

  pages: number = 0;
  currentPage: number = 1;

  constructor(private server: ServerService) {

    this.page$ = server.getArticlePageCount()
      .pipe(
        map(count => {
          this.pages = Math.ceil(count / 5)
        } )
      )

    this.article$ = server.getArticlePage(1)
  }

  ngOnInit(): void {
  }

  pageSelect(page: number) {
    this.article$ = this.server.getArticlePage(page)
    this.currentPage = page;
  }

  firstPage() {
    if (this.currentPage == 1) return
    this.article$ = this.server.getArticlePage(1)
    this.currentPage = 1;
  }

  prevPage(s: string) {
    if (this.currentPage == 1) return
    this.article$ = this.server.getArticlePage(this.currentPage - 1)
    this.currentPage--
  }

  nextPage() {
    if (this.currentPage == this.pages) return
    this.article$ = this.server.getArticlePage(this.currentPage + 1)
    this.currentPage++
  }

  lastPage() {
    if (this.currentPage == this.pages) return
    this.article$ = this.server.getArticlePage(this.pages)
    this.currentPage = this.pages;
  }
}
