import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UiArticleComponent} from "../../components/ui-article/ui-article.component";
import {AsyncPipe} from "@angular/common";
import {Observable, tap} from "rxjs";
import {Article} from "../../models/article.model";
import {ServerService} from "../../services/server.service";

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    UiArticleComponent,
    AsyncPipe
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  article$: Observable<Article> | undefined

  constructor(server: ServerService, route: ActivatedRoute) {

    route.paramMap.subscribe(params => {
      const slug = params.get('slug')

      if(slug){
        this.article$ = server.getArticle(slug).pipe(tap(article => {
          if(article){
            console.log(article)
          }
        }))

      }
    });


  }
}
