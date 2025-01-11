import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { UiArticleComponent } from '../components/ui-article/ui-article.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Article } from '../../../models/article.model';
import { BlogService } from '../../../services/blog.service';
import { GoBackDirective } from '../../../directives/go-back.directive';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  imports: [MatButton, UiArticleComponent, AsyncPipe, GoBackDirective],
  templateUrl: './article-page.component.html',
  standalone: true,
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent {
  article$: Observable<Article> | undefined;

  constructor(
    bs: BlogService,
    route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
  ) {
    route.paramMap.subscribe((params) => {
      const slug = params.get('slug');

      if (slug) {
        this.article$ = bs.getArticle(slug);

        this.title.setTitle(`Corbin.dev | ${slug}`);
        this.meta.addTags([
          {
            name: 'description',
            content: 'A blog entry by Emrys Corbin.',
          },
          {
            name: 'keywords',
            content: 'emrys, corbin, corbin.dev, software engineering', //TODO: Convert article tags into keywords
          },
        ]);
      }
    });
  }
}
