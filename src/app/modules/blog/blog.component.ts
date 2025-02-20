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
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { UiSearchComponent } from '../ui/ui-search/ui-search.component';

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
  totalPages = this.blogService.totalPages;

  loadStarted = signal(false);

  hideSidebar = true;

  selectedCategories = new Set<string>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.blogService.fetchPage(5);
  }

  ngOnInit(): void {
    this.initializeCategories();
    this.initializePageFromUrl();
  }

  initializeCategories(): void {
    const savedCategories = sessionStorage.getItem('blogFilters');
    if (savedCategories) {
      this.selectedCategories = new Set<string>(JSON.parse(savedCategories));
    }
  }

  initializePageFromUrl(): void {
    // Read the page query parameter from the URL
    const pageParam = this.route.snapshot.queryParamMap.get('page');
    const page = pageParam ? Number(pageParam) : 1; // Default to page 1 if no param
    this.blogService.fetchPage(5, page); // Fetch articles for the specified page
  }

  goToPreviousPage() {
    if (!this.isFirstPage()) {
      const currentPage = this.blogService.currentPage(); // Get the current page
      const prevPage = currentPage - 1;
      this.blogService.fetchPage(5, prevPage);
      this.updateUrlWithPage(prevPage); // Update the URL
    }
  }

  goToNextPage() {
    if (!this.isLastPage()) {
      const currentPage = this.blogService.currentPage(); // Get the current page
      const nextPage = currentPage + 1;
      this.blogService.fetchPage(5, nextPage);
      this.updateUrlWithPage(nextPage); // Update the URL
    }
  }

  updateUrlWithPage(page: number) {
    // Update the URL with the current page
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge', // Retain other query params (e.g., tags)
    });
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

    this.blogService.fetchPage(5);
  }

  searchBlog(query: string) {
    this.blogService.searchArticles(query, true);
  }
}
