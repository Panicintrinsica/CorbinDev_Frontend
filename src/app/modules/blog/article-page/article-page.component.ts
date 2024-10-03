import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UiArticleComponent } from '../components/ui-article/ui-article.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Article } from '../../../models/article.model';
import { BlogService } from '../../../services/blog.service';
import { GoBackDirective } from '../../../directives/go-back.directive';
import { BlogPipe } from '../../../pipes/blog.pipe';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    UiArticleComponent,
    AsyncPipe,
    GoBackDirective,
    BlogPipe,
  ],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent {
  article$: Observable<Article> | undefined;

  constructor(bs: BlogService, route: ActivatedRoute) {
    route.paramMap.subscribe((params) => {
      const slug = params.get('slug');

      if (slug) {
        this.article$ = bs.getArticle(slug);
      }
    });
  }
}
