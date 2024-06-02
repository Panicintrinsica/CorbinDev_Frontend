import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Article, ArticlePage} from "../models/article.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private API = environment.API

  private articleSubject: Subject<ArticlePage> = new Subject<ArticlePage>();

  private _isLastPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly isLastPage$ = this._isLastPage.asObservable();

  private _isFirstPage: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public readonly isFirstPage$ = this._isFirstPage.asObservable();

  private bHasMorePages = false;

  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<Article>{
    return this.http.get<Article>(`${this.API}/articles/single/${slug}`)
  }

  getArticleSub(): Subject<ArticlePage>{
    return this.articleSubject
  }

  getArticlePage(size: number, offset: number) {
    this.http.get<ArticlePage>(`${this.API}/articles/page/${size}/${offset}`)
      .subscribe({
        next: result => {
          this.articleSubject.next(result)
          this._isFirstPage.next(offset == 0);
          this._isLastPage.next(!result.meta.page.more);
        },
        error: error => {
          console.error(error);
        }
      })
  }

  isLastPage() {
    return !this.bHasMorePages;
  }

}
