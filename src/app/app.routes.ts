import { Routes } from '@angular/router';
import {HomeComponent} from "./modules/home/home.component";
import {ArticlePageComponent} from "./modules/blog/article-page/article-page.component";
import {BiographyComponent} from "./modules/biography/biography.component";
import {ProjectListPageComponent} from "./modules/projects/project-list-page/project-list-page.component";
import {ProjectPageComponent} from "./modules/projects/project-page/project-page.component";
import {CvComponent} from "./modules/cv/cv.component";
import {CoverletterComponent} from "./modules/cv/coverletter/coverletter.component";
import {CvModernComponent} from "./modules/cv/cv-modern/cv-modern.component";
import {CvBasicComponent} from "./modules/cv/cv-basic/cv-basic.component";
import {BlogComponent} from "./modules/blog/blog.component";
import {AdminDashboardComponent} from "./modules/admin/admin-dashboard/admin-dashboard.component";
import {AdminRootComponent} from "./modules/admin/admin-root/admin-root.component";
import {AdminProfileComponent} from "./modules/admin/admin-profile/admin-profile.component";
import {AdminArticleEditorComponent} from "./modules/admin/admin-article-editor/admin-article-editor.component";
import {AdminProjectsEditorComponent} from "./modules/admin/admin-projects-editor/admin-projects-editor.component";
import {AdminProjectsIndexComponent} from "./modules/admin/admin-projects-index/admin-projects-index.component";
import {AdminSkillsIndexComponent} from "./modules/admin/admin-skills-index/admin-skills-index.component";
import {AdminSkillsEditorComponent} from "./modules/admin/admin-skills-editor/admin-skills-editor.component";
import {LoginComponent} from "./modules/admin/login/login.component";
import {AuthGuard} from "./guards/auth-guard.guard";
import {AdminArticleIndexComponent} from "./modules/admin/admin-article-index/admin-article-index.component";

export const routes: Routes = [

  { path: '', component: HomeComponent, data: { animation: 'Home' }},
  { path: 'blog', component: BlogComponent, data: { animation: 'Blog' }},
  { path: 'page/:id', component: HomeComponent, data: { animation: 'Home' }},
  { path: 'article/:slug', component: ArticlePageComponent, data: { animation: 'Article' }},
  { path: 'bio', component: BiographyComponent, data: { animation: 'Bio' }},
  { path: 'cv', component: CvComponent, data: { animation: 'cv' },
    children: [
      { path: '',  component: CoverletterComponent },
      { path: 'modern',  component: CvModernComponent },
      { path: 'basic',  component: CvBasicComponent }
    ]
  },
  { path: 'projects', component: ProjectListPageComponent, data: { animation: 'Projects' }},
  { path: 'project/:slug', component: ProjectPageComponent, data: { animation: 'Project' }},

  { path: 'login', component: LoginComponent },

  { path: 'admin', component: AdminRootComponent, canActivate: [AuthGuard],
    children: [
      { path: '',  component: AdminDashboardComponent },
      { path: 'profile',  component: AdminProfileComponent },

      { path: 'articles',  component: AdminArticleIndexComponent },
      { path: 'articles/new',  component: AdminArticleEditorComponent },
      { path: 'articles/edit/:id',  component: AdminArticleEditorComponent },

      { path: 'projects',  component: AdminProjectsIndexComponent },
      { path: 'projects/new',  component: AdminProjectsEditorComponent },
      { path: 'projects/edit/:id',  component: AdminProjectsEditorComponent },

      { path: 'skills',  component: AdminSkillsIndexComponent },
      { path: 'skills/new',  component: AdminSkillsEditorComponent },
      { path: 'skills/edit/:id',  component: AdminSkillsEditorComponent }
    ]
  },

];
