import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { UiArticleComponent } from '../components/ui-article/ui-article.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Article } from '../../../models/article.model';
import { BlogService } from '../../../services/blog.service';
import { GoBackDirective } from '../../../directives/go-back.directive';

@Component({
  selector: 'app-article',
  imports: [MatButton, UiArticleComponent, AsyncPipe, GoBackDirective],
  templateUrl: './article-page.component.html',
  standalone: true,
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
