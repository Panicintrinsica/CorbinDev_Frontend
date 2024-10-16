import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  Article,
  ArticlePage,
  ArticleSearchResults,
} from '../models/article.model';
import { HttpClient } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private API = environment.API;

  private articleSubject: Subject<ArticlePage> = new Subject<ArticlePage>();
  private searchResultsSubject = new BehaviorSubject<ArticleSearchResults>({
    records: [],
    totalCount: 0,
  });

  private _isLastPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  public readonly isLastPage$ = this._isLastPage.asObservable();

  private _isFirstPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true,
  );
  public readonly isFirstPage$ = this._isFirstPage.asObservable();

  private bHasMorePages = false;

  constructor(
    private http: HttpClient,
    private viewportScroller: ViewportScroller,
  ) {}

  getArticle(slug: string): Observable<Article> {
    return this.http.get<Article>(`${this.API}/articles/single/${slug}`);
  }

  getArticleSub(): Subject<ArticlePage> {
    return this.articleSubject;
  }

  getSearchResultSub(): BehaviorSubject<ArticleSearchResults> {
    return this.searchResultsSubject;
  }

  getArticlePage(size: number, offset: number, scroll: boolean = false) {
    const storedFilters = sessionStorage.getItem('blogFilters');
    let filters;

    if (storedFilters) {
      filters = JSON.parse(storedFilters);
    }

    let BlogQuery = {
      size: size || 5,
      offset: offset || 0,
      tags: filters,
    };

    console.log(storedFilters);

    this.http
      .post<ArticlePage>(`${this.API}/articles/getWithFilters`, BlogQuery)
      .subscribe({
        next: (result) => {
          this.articleSubject.next(result);
          this._isFirstPage.next(offset == 0);
          this._isLastPage.next(!result.meta.page.more);
          if (scroll) this.viewportScroller.scrollToPosition([0, 0]);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  searchArticles(query: string): Observable<ArticleSearchResults> {
    console.log(query);
    return this.http.post<ArticleSearchResults>(`${this.API}/articles/search`, {
      searchString: query,
    });
  }

  setSearchResults(results: ArticleSearchResults) {
    this.searchResultsSubject.next(results);
  }

  isLastPage() {
    return !this.bHasMorePages;
  }
}
