import { Component, inject } from '@angular/core';
import {
  ArticleDisplayStyle,
  UiArticleComponent,
} from '../components/ui-article/ui-article.component';
import { UiSearchComponent } from '../../ui/ui-search/ui-search.component';
import { BlogService } from '../blog.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-articles-search-results',
  imports: [UiArticleComponent, UiSearchComponent],
  templateUrl: './blog-search-results.component.html',
  styleUrl: './blog-search-results.component.scss',
  standalone: true,
})
export class BlogSearchResultsComponent {
  protected readonly ArticleDisplayStyle = ArticleDisplayStyle;

  blogService = inject(BlogService);
  articles = this.blogService.searchResults;

  constructor(
    private meta: Meta,
    private title: Title,
  ) {
    this.title.setTitle('Corbin.dev | Blog Search Results');
    this.meta.addTags([
      {
        name: 'description',
        content: 'Search Results for the Corbin.dev Blog',
      },
    ]);
  }

  searchBlog(query: string) {
    this.blogService.searchArticles(query, false);
  }
}
