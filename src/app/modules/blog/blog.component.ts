import { Component, inject, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  ArticleDisplayStyle,
  UiArticleComponent,
} from './components/ui-article/ui-article.component';
import { BlogService } from './blog.service';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { ArticleTypes } from '../../constants/project.consts';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { UiSearchComponent } from '../ui/ui-search/ui-search.component';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-articles',
  imports: [
    UiArticleComponent,
    NgClass,
    MatChipOption,
    MatChipListbox,
    MatIconButton,
    MatIcon,
    FormsModule,
    UiSearchComponent,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  standalone: true,
})
export class BlogComponent implements OnInit {
  blogService = inject(BlogService);

  articlePage = this.blogService.articlePage;
  isFirstPage = this.blogService.isFirstPage;
  isLastPage = this.blogService.isLastPage;

  loadStarted = signal(false);

  currentPage = 0;

  hideSidebar = true;

  selectedCategories = new Set<string>();

  constructor(
    private bs: BlogService,
    private router: Router,
    private meta: Meta,
    private title: Title,
  ) {
    this.title.setTitle('Corbin.dev | Blog');
    this.meta.addTags([
      {
        name: 'description',
        content:
          'News and articles on software engineering, gaming, technologies, cats, coffee, and more.',
      },
    ]);
  }

  ngOnInit(): void {
    this.getSpecificPage(this.currentPage);
    this.initializeCategories();
  }

  initializeCategories(): void {
    const savedCategories = sessionStorage.getItem('blogFilters');
    if (savedCategories) {
      this.selectedCategories = new Set<string>(JSON.parse(savedCategories));
    }
  }

  goToPreviousPage() {
    if (this.isFirstPage()) return;
    const newPage = --this.currentPage;
    this.getSpecificPage(newPage);
  }

  goToNextPage() {
    if (this.isLastPage()) return;
    const newPage = ++this.currentPage;
    this.getSpecificPage(newPage);
  }

  private getSpecificPage(pageNumber: number) {
    this.bs.fetchPage(5, pageNumber, true);
  }

  protected readonly ArticleDisplayStyle = ArticleDisplayStyle;
  protected readonly categoryOptions = ArticleTypes;

  selectCategories(filterKey: string) {
    if (this.selectedCategories && this.selectedCategories.has(filterKey)) {
      this.selectedCategories.delete(filterKey);
    } else {
      this.selectedCategories.add(filterKey);
    }

    sessionStorage.setItem(
      'blogFilters',
      JSON.stringify([...this.selectedCategories]),
    );

    this.getSpecificPage(0);
  }

  searchBlog(query: string) {
    this.bs.searchArticles(query);
  }
}
