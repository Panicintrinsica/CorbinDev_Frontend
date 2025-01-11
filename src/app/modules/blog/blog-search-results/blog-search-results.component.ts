import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  ArticleDisplayStyle,
  UiArticleComponent,
} from '../components/ui-article/ui-article.component';
import { UiSearchComponent } from '../../ui/ui-search/ui-search.component';
import { BlogService } from '../blog.service';
import { BehaviorSubject } from 'rxjs';
import { ArticleSearchResults } from '../../../models/article.model';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-articles-search-results',
  imports: [AsyncPipe, UiArticleComponent, UiSearchComponent],
  templateUrl: './blog-search-results.component.html',
  styleUrl: './blog-search-results.component.scss',
  standalone: true,
})
export class BlogSearchResultsComponent {
  protected readonly ArticleDisplayStyle = ArticleDisplayStyle;

  articles$!: BehaviorSubject<ArticleSearchResults>;

  constructor(
    private bs: BlogService,
    private meta: Meta,
    private title: Title,
  ) {
    this.articles$ = this.bs.getSearchResultSub();

    this.title.setTitle('Corbin.dev | Blog Search Results');

    this.meta.addTags([
      {
        name: 'description',
        content: 'Search Results for the Corbin.dev Blog',
      },
      {
        name: 'keywords',
        content: 'emrys, corbin, corbin.dev, blog',
      },
    ]);
  }

  searchBlog(query: string) {
    this.bs.searchArticles(query).subscribe((results: ArticleSearchResults) => {
      this.bs.setSearchResults(results);
    });
  }
}
