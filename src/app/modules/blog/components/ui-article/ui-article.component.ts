import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { Article } from '../../../../models/article.model';
import { TagComponent } from '../../../ui/ui-tag/tag.component';
import { BlogPipe } from '../../../../pipes/blog.pipe';

interface onInit {}

@Component({
  selector: 'ui-article',
  imports: [
    RouterLink,
    MatButton,
    DatePipe,
    MarkdownComponent,
    TagComponent,
    BlogPipe,
    NgOptimizedImage,
  ],
  templateUrl: './ui-article.component.html',
  standalone: true,
  styleUrl: './ui-article.component.scss',
})
export class UiArticleComponent implements onInit {
  data = input<Article>({
    aboveFold: '',
    category: '',
    content: '',
    id: '',
    slug: '',
    tags: [],
    title: '',
    xata: { createdAt: '', updatedAt: '', version: 0 },
  });
  isStub = input<boolean>(false);
  displayStyle = input<ArticleDisplayStyle>(ArticleDisplayStyle.Simple);
}

export enum ArticleDisplayStyle {
  'Simple' = 'simple',
  'Card' = 'card',
}
