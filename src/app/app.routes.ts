import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ArticlePageComponent } from './modules/blog/article-page/article-page.component';
import { BiographyComponent } from './modules/biography/biography.component';
import { ProjectListPageComponent } from './modules/projects/project-list-page/project-list-page.component';
import { ProjectPageComponent } from './modules/projects/project-page/project-page.component';
import { BlogComponent } from './modules/blog/blog.component';
import { BlogSearchResultsComponent } from './modules/blog/blog-search-results/blog-search-results.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'Home' } },
  { path: 'blog', component: BlogComponent, data: { animation: 'Blog' } },
  {
    path: 'blog/search',
    component: BlogSearchResultsComponent,
    data: { animation: 'Article' },
  },

  {
    path: 'blog/a/:date/:uri',
    component: ArticlePageComponent,
    data: { animation: 'Article' },
  },

  { path: 'bio', component: BiographyComponent, data: { animation: 'Bio' } },
  {
    path: 'projects',
    component: ProjectListPageComponent,
    data: { animation: 'Projects' },
  },
  {
    path: 'project/:slug',
    component: ProjectPageComponent,
    data: { animation: 'Project' },
  },
];
