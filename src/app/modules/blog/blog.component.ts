import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import {
  ArticleDisplayStyle,
  UiArticleComponent,
} from './components/ui-article/ui-article.component';
import { ArticlePage } from '../../models/article.model';
import { BlogService } from '../../services/blog.service';
import { Subject, Subscription } from 'rxjs';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { ArticleTypes } from '../../constants/project.consts';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    AsyncPipe,
    UiArticleComponent,
    NgClass,
    MatChipOption,
    MatChipListbox,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit, OnDestroy {
  articles$!: Subject<ArticlePage>;
  currentPage = 0;

  _isFirstPage$: Subscription;
  _isLastPage$: Subscription;

  isFirstPage = false;
  isLastPage = false;

  selectedCategories = new Set<string>();

  constructor(private bs: BlogService) {
    this.articles$ = this.bs.getArticleSub();
    this._isFirstPage$ = this.bs.isFirstPage$.subscribe(
      (value) => (this.isFirstPage = value),
    );
    this._isLastPage$ = this.bs.isLastPage$.subscribe(
      (value) => (this.isLastPage = value),
    );
  }

  ngOnInit(): void {
    this.getPage(this.currentPage);
  }

  ngOnDestroy() {
    this._isFirstPage$.unsubscribe();
    this._isLastPage$.unsubscribe();
  }

  lastPage() {
    if (this.isFirstPage) return;

    const newPage = --this.currentPage;
    this.getPage(newPage);
  }

  nextPage() {
    if (this.isLastPage) return;

    const newPage = ++this.currentPage;
    this.getPage(newPage);
  }

  private getPage(pageNumber: number) {
    this.bs.getArticlePage(5, pageNumber, true);
  }

  protected readonly ArticleDisplayStyle = ArticleDisplayStyle;
  protected readonly categoryOptions = ArticleTypes;

  selectCategories(filterKey: string) {
    if (this.selectedCategories.has(filterKey)) {
      this.selectedCategories.delete(filterKey);
    } else {
      this.selectedCategories.add(filterKey);
    }

    sessionStorage.setItem(
      'blogFilters',
      JSON.stringify([...this.selectedCategories]),
    );

    this.getPage(0);
  }
}
