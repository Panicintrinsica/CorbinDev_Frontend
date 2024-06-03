import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {Article, ArticlePage} from "../models/article.model";
import {Skill} from "../models/skill.model";
import {Project, ProjectStub} from "../models/project.model";
import {Education} from "../models/education.model";
import {environment} from "../../environments/environment";
import { Detail } from '../models/detail.model';
import {ContentBlock} from "../models/content.model";

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private API = environment.API

  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<Article>{
    return this.http.get<Article>(`${this.API}/articles/${slug}`)
  }

  getArticlePage(): Observable<ArticlePage>{
    return this.http.get<ArticlePage>(`${this.API}/articles`)
  }

  getAllDetails(): Observable<Detail[]>{
    return this.http.get<Detail[]>(`${this.API}/details`)
  }

  getProfileDetails(): Observable<Detail[]>{
    return this.http.get<Detail[]>(`${this.API}/details/profile`)
  }

  getDetailsByType(type: string): Observable<Detail[]>{
    return this.http.get<Detail[]>(`${this.API}/details/${type}`)
  }

  getContactDetails(): Observable<Detail[]>{
    return this.http.get<Detail[]>(`${this.API}/details/contact`)
  }

  getSkillByID(id: string): Observable<Skill>{
    let encodedID = encodeURIComponent(id);
    return this.http.get<Skill>(`${this.API}/skills/${encodedID}`)
  }

  getContentBlock(selector: string): Observable<ContentBlock>{
    return this.http.get<ContentBlock>(`${this.API}/content/${selector}`)
  }

  getContentGroup(selector: string): Observable<ContentBlock[]>{
    return this.http.get<ContentBlock[]>(`${this.API}/content/group/${selector}`)
  }

  getDisplayedSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(`${this.API}/skills`)
  }

  getAllSkills(): Observable<Skill[]>{
    return this.http.get<Skill[]>(`${this.API}/skills`)
  }

  getSkillsByLevel(): Observable<Skill[]>{
    return this.http.get<Skill[]>(`${this.API}/skills/byLevel`)
  }

  getSkillByName(name: string): Observable<Skill>{
    return this.http.get<Skill>(`${this.API}/skills/byName/${name}`)
  }

  getProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.API}/projects`)
  }

  getProjectsBySkill(skillID: string): Observable<ProjectStub[]>{
    return this.http.get<ProjectStub[]>(`${this.API}/projects/bySkill/${skillID}`)
  }

  getProjectBySlug(slug: string): Observable<Project>{
    return this.http.get<Project>(`${this.API}/projects/${slug}`)
  }

  getEducation(): Observable<Education[]>{
    return this.http.get<Education[]>(`${this.API}/schools`)
  }

}
