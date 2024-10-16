import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import {
  ArticleDisplayStyle,
  UiArticleComponent,
} from '../components/ui-article/ui-article.component';
import { UiSearchComponent } from '../../ui/ui-search/ui-search.component';
import { BlogService } from '../../../services/blog.service';
import { BehaviorSubject } from 'rxjs';
import { ArticleSearchResults } from '../../../models/article.model';

@Component({
  selector: 'app-blog-search-results',
  standalone: true,
  imports: [
    AsyncPipe,
    MatChipListbox,
    MatChipOption,
    MatIcon,
    MatIconButton,
    UiArticleComponent,
    UiSearchComponent,
  ],
  templateUrl: './blog-search-results.component.html',
  styleUrl: './blog-search-results.component.scss',
})
export class BlogSearchResultsComponent {
  protected readonly ArticleDisplayStyle = ArticleDisplayStyle;

  articles$!: BehaviorSubject<ArticleSearchResults>;

  constructor(private bs: BlogService) {
    this.articles$ = this.bs.getSearchResultSub();
  }

  searchBlog(query: string) {
    this.bs.searchArticles(query).subscribe((results: ArticleSearchResults) => {
      this.bs.setSearchResults(results);
    });
  }
}
