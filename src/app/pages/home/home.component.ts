import { Component } from '@angular/core';
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {UiArticleComponent} from "../../components/ui-article/ui-article.component";
import {map, Observable} from "rxjs";
import {ServerService} from "../../services/server.service";
import {Article} from "../../models/article.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgClass,
    UiArticleComponent,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
