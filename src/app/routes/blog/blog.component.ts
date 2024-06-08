import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, ViewportScroller} from "@angular/common";
import {ArticleDisplayStyle, UiArticleComponent} from "../../components/ui-article/ui-article.component";
import {ArticlePage} from "../../models/article.model";
import {BlogService} from "../../services/blog.service";
import {Observable, Subject, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    AsyncPipe,
    UiArticleComponent,
    NgClass
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit, OnDestroy {
  articles$!: Subject<ArticlePage>;
  currentSize: number;
  currentPage: number;

  _isFirstPage$: Subscription;
  _isLastPage$ : Subscription;

  isFirstPage = false;
  isLastPage = false;

  constructor(
    private bs: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articles$ = this.bs.getArticleSub()
    this._isFirstPage$ = this.bs.isFirstPage$.subscribe(value => this.isFirstPage = value)
    this._isLastPage$ = this.bs.isLastPage$.subscribe(value => this.isLastPage = value)


    this.currentSize = Number(this.route.snapshot.queryParamMap.get('size')) || 5
    this.currentPage = Number(this.route.snapshot.queryParamMap.get('page'))
  }

  ngOnInit(): void {
      this.getPage(this.currentPage)
  }

  ngOnDestroy() {
    //this.articles$.unsubscribe();
    this._isFirstPage$.unsubscribe();
    this._isLastPage$.unsubscribe();
  }

  lastPage() {
    if (this.isFirstPage) return;

    const newPage = --this.currentPage;
    this.getPage(newPage)
  }

  nextPage() {
    if (this.isLastPage) return;

    const newPage = ++this.currentPage;
    this.getPage(newPage)
  }

  private getPage(pageNumber: number) {
    this.bs.getArticlePage(this.currentSize, pageNumber, true)

    this.router.navigate([], { queryParams: { page: pageNumber, size: this.currentSize } });

 }


  protected readonly ArticleDisplayStyle = ArticleDisplayStyle;
}
