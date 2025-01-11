import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  Article,
  ArticlePage,
  ArticleSearchResults,
} from '../../models/article.model';
import { HttpClient } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private API = environment.API;

  private _article = signal<Article>({
    aboveFold: '',
    category: '',
    content: '',
    id: '',
    slug: '',
    tags: [],
    title: '',
    xata: { createdAt: '', updatedAt: '', version: 0 },
  });
  private _articlePage = signal<ArticlePage>({
    meta: { page: { cursor: '', more: false, size: 0 } },
    records: [],
  });
  private _searchResults = signal<ArticleSearchResults>({
    totalCount: 0,
    records: [],
  });
  private _isLastPage = signal(false);
  private _isFirstPage = signal(true);

  get article() {
    return this._article;
  }
  get articlePage() {
    return this._articlePage;
  }
  get isLastPage() {
    return this._isLastPage;
  }
  get isFirstPage() {
    return this._isFirstPage;
  }
  get searchResults() {
    return this._searchResults;
  }

  constructor(
    private http: HttpClient,
    private viewportScroller: ViewportScroller,
    private router: Router,
  ) {}

  fetchArticle(selector: string) {
    return this.http
      .get<Article>(`${this.API}/articles/single/${selector}`)
      .subscribe((article) => this._article.set(article));
  }

  fetchPage(size: number, offset: number, scroll: boolean = false) {
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

    this.http
      .post<ArticlePage>(`${this.API}/articles/getWithFilters`, BlogQuery)
      .subscribe({
        next: (result) => {
          this._articlePage.set(result);
          this._isFirstPage.set(offset === 0);
          this._isLastPage.set(!result.meta.page.more);
          if (scroll) this.viewportScroller.scrollToPosition([0, 0]);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  searchArticles(query: string, navigate: boolean = true) {
    this.http
      .post<ArticleSearchResults>(`${this.API}/articles/search`, {
        searchString: query,
      })
      .subscribe((results) => {
        this._searchResults.set(results);
        console.log(results);
        if (navigate) this.router.navigateByUrl('/blog/search');
      });
  }
}
