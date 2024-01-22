import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ArticleComponent} from "./pages/article/article.component";
import {BiographyComponent} from "./pages/biography/biography.component";
import {ProjectListComponent} from "./pages/project-list/project-list.component";
import {ProjectComponent} from "./pages/project/project.component";

export const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
    data: { animation: 'Home' }
  },
  {
    path: 'page/:id',
    component: HomeComponent,
    data: { animation: 'Home' }
  },
  {
    path: 'article/:slug',
    component: ArticleComponent,
    data: { animation: 'Article' }
  },
  {
    path: 'bio',
    component: BiographyComponent,
    data: { animation: 'Bio' }},
  {
    path: 'projects',
    component: ProjectListComponent,
    data: { animation: 'Projects' }},
  {
    path: 'project/:slug',
    component: ProjectComponent,
    data: { animation: 'Project' }},

];
