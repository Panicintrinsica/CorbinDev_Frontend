import { Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { UiArticleComponent } from '../components/ui-article/ui-article.component';
import { BlogService } from '../blog.service';
import { GoBackDirective } from '../../../directives/go-back.directive';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  imports: [MatButton, UiArticleComponent, GoBackDirective],
  templateUrl: './article-page.component.html',
  standalone: true,
  styleUrl: './article-page.component.scss',
})
export class ArticlePageComponent implements OnInit {
  blogService = inject(BlogService);
  article = this.blogService.article;
  slug!: string | null;

  constructor(
    route: ActivatedRoute,
    private meta: Meta,
    private title: Title,
  ) {
    route.paramMap.subscribe((params) => {
      this.slug = params.get('slug');
    });
  }

  ngOnInit(): void {
    if (this.slug) {
      this.blogService.fetchArticle(this.slug).add(() => {
        this.title.setTitle(`Corbin.dev | ${this.article().title}`);
        this.meta.addTags([
          {
            name: 'description',
            content: this.article().aboveFold,
          },
        ]);
      });
    }
  }
}
