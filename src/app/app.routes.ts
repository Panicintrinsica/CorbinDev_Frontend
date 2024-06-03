import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ArticleComponent} from "./pages/article/article.component";
import {BiographyComponent} from "./pages/biography/biography.component";
import {ProjectListComponent} from "./pages/project-list/project-list.component";
import {ProjectComponent} from "./pages/project/project.component";
import {CvComponent} from "./pages/cv/cv.component";
import {CoverletterComponent} from "./pages/cv/coverletter/coverletter.component";
import {CvModernComponent} from "./pages/cv/cv-modern/cv-modern.component";
import {CvBasicComponent} from "./pages/cv/cv-basic/cv-basic.component";
import {BlogComponent} from "./pages/blog/blog.component";
import {AdminDashboardComponent} from "./pages/admin/admin-dashboard/admin-dashboard.component";
import {AdminRootComponent} from "./pages/admin/admin-root/admin-root.component";
import {AdminProfileComponent} from "./pages/admin/admin-profile/admin-profile.component";
import {AdminArticleEditorComponent} from "./pages/admin/admin-article-editor/admin-article-editor.component";
import {AdminProjectsEditorComponent} from "./pages/admin/admin-projects-editor/admin-projects-editor.component";
import {AdminProjectsIndexComponent} from "./pages/admin/admin-projects-index/admin-projects-index.component";
import {AdminSkillsIndexComponent} from "./pages/admin/admin-skills-index/admin-skills-index.component";
import {AdminSkillsEditorComponent} from "./pages/admin/admin-skills-editor/admin-skills-editor.component";
import {LoginComponent} from "./pages/auth/login/login.component";

export const routes: Routes = [

  { path: '', component: HomeComponent, data: { animation: 'Home' }},
  { path: 'blog', component: BlogComponent, data: { animation: 'Blog' }},
  { path: 'page/:id', component: HomeComponent, data: { animation: 'Home' }},
  { path: 'article/:slug', component: ArticleComponent, data: { animation: 'Article' }},
  { path: 'bio', component: BiographyComponent, data: { animation: 'Bio' }},
  { path: 'cv', component: CvComponent, data: { animation: 'cv' },
    children: [
      { path: '',  component: CoverletterComponent },
      { path: 'modern',  component: CvModernComponent },
      { path: 'basic',  component: CvBasicComponent }
    ]
  },
  { path: 'projects', component: ProjectListComponent, data: { animation: 'Projects' }},
  { path: 'project/:slug', component: ProjectComponent, data: { animation: 'Project' }},

  { path: 'login', component: LoginComponent },

  { path: 'admin', component: AdminRootComponent,
    children: [
      { path: '',  component: AdminDashboardComponent },
      { path: 'profile',  component: AdminProfileComponent },

      { path: 'articles',  component: AdminDashboardComponent },
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
