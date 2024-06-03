import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UiArticleComponent} from "../../components/ui-article/ui-article.component";
import {AsyncPipe, Location} from "@angular/common";
import {Observable } from "rxjs";
import {Article} from "../../models/article.model";
import {BlogService} from "../../services/blog.service";
import {GoBackDirective} from "../../directives/go-back.directive";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    UiArticleComponent,
    AsyncPipe,
    GoBackDirective
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  article$: Observable<Article> | undefined

  constructor(bs: BlogService, route: ActivatedRoute, private location: Location) {

    route.paramMap.subscribe(params => {
      const slug = params.get('slug')

      if(slug){
        this.article$ = bs.getArticle(slug)
      }
    });
  }
}
