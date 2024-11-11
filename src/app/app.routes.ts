import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ArticlePageComponent } from './modules/blog/article-page/article-page.component';
import { BiographyComponent } from './modules/biography/biography.component';
import { ProjectListPageComponent } from './modules/projects/project-list-page/project-list-page.component';
import { ProjectPageComponent } from './modules/projects/project-page/project-page.component';
import { CvComponent } from './modules/cv/cv.component';
import { CoverletterComponent } from './modules/cv/coverletter/coverletter.component';
import { CvModernComponent } from './modules/cv/cv-modern/cv-modern.component';
import { CvBasicComponent } from './modules/cv/cv-basic/cv-basic.component';
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
  { path: 'page/:id', component: HomeComponent, data: { animation: 'Home' } },
  {
    path: 'article/:slug',
    component: ArticlePageComponent,
    data: { animation: 'Article' },
  },
  { path: 'bio', component: BiographyComponent, data: { animation: 'Bio' } },
  {
    path: 'cv',
    component: CvComponent,
    data: { animation: 'cv' },
    children: [
      { path: '', component: CoverletterComponent },
      { path: 'modern', component: CvModernComponent },
      { path: 'basic', component: CvBasicComponent },
    ],
  },
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
