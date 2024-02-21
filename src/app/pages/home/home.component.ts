import { Component } from '@angular/core';
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {UiArticleComponent} from "../../components/ui-article/ui-article.component";
import {map, Observable} from "rxjs";
import {ServerService} from "../../services/server.service";
import {Article} from "../../models/article.model";
import {HomeKeyartComponent} from "./home-keyart/home-keyart.component";
import {featuredStackItem, HomeFeatureComponent} from "./home-feature/home-feature.component";
import {UiSpinnerComponent} from "../../components/ui-spinner/ui-spinner.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgClass,
    UiArticleComponent,
    AsyncPipe,
    NgIf,
    HomeKeyartComponent,
    HomeFeatureComponent,
    UiSpinnerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  article$: Observable<Article[]>
  page$: Observable<Number | void>

  pages: number = 0;
  currentPage: number = 1;

  frontendFeatures: featuredStackItem[] = [
    { img: "html", alt: "HTML", link: "https://www.w3.org/TR/2011/WD-html5-20110405/" },
    { img: "css", alt: "css", link: "https://www.w3.org/Style/CSS/specs.en.html" },
    { img: "js", alt: "JavaScript", link: "https://ecma-international.org/publications-and-standards/standards/ecma-262/" },
    { img: "angular", alt: "Angular", link: "https://angular.dev" },
    { img: "electron", alt: "Electron.js", link: "https://www.electronjs.org/" },
  ]

  backendFeatures: featuredStackItem[] = [
    { img: "node-js", alt: "Node.js", link: "https://nodejs.org/en" },
    { img: "mongodb", alt: "MongoDB", link: "https://www.mongodb.com/" },
    { img: "mysql", alt: "MySQL", link: "https://www.mysql.com/" },
    { img: "PostgreSQL", alt: "PostgreSQL", link: "https://www.postgresql.org/" },
    { img: "xata", alt: "Xata.io", link: "https://xata.io/" },
    { img: "redis", alt: "Redis", link: "https://redis.io/" },
    { img: "dragonfly", alt: "DragonflyDB", link: "https://www.dragonflydb.io/" },
  ]

  otherFeatures: featuredStackItem[] = [
    { img: "typescript", alt: "TypeScript", link: "https://www.typescriptlang.org/" },
    { img: "java", alt: "jana", link: "https://www.oracle.com/java/" },
    { img: "kotlin", alt: "Kotlin", link: "https://kotlinlang.org/" },
    { img: "c-sharp", alt: "C#", link: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
    { img: "android", alt: "Android", link: "https://developer.android.com/studio" },
  ]


  constructor(private server: ServerService) {

    this.page$ = server.getArticlePageCount()
      .pipe(
        map(count => {
          this.pages = Math.ceil(count / 5)
        } )
      )

    this.article$ = server.getArticlePage(1)
  }

  ngOnInit(): void {
  }

  pageSelect(page: number) {
    this.article$ = this.server.getArticlePage(page)
    this.currentPage = page;
  }

  firstPage() {
    if (this.currentPage == 1) return
    this.article$ = this.server.getArticlePage(1)
    this.currentPage = 1;
  }

  prevPage(s: string) {
    if (this.currentPage == 1) return
    this.article$ = this.server.getArticlePage(this.currentPage - 1)
    this.currentPage--
  }

  nextPage() {
    if (this.currentPage == this.pages) return
    this.article$ = this.server.getArticlePage(this.currentPage + 1)
    this.currentPage++
  }

  lastPage() {
    if (this.currentPage == this.pages) return
    this.article$ = this.server.getArticlePage(this.pages)
    this.currentPage = this.pages;
  }
}
