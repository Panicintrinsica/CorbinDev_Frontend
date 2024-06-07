import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SkillLink, Skill} from "../models/skill.model";
import {Project, ProjectLink} from "../models/project.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private API = environment.API

  constructor(private http: HttpClient) {}

  getProjectsBySkill(skillID: string): Observable<ProjectLink[]>{
    return this.http.get<ProjectLink[]>(`${this.API}/projects/bySkill/${skillID}`).pipe(
      map((response: any[]) => response.map((item) => {
        return {
          "id": item.project.id,
          "name": item.project.name,
          "group": item.project.group,
          "slug": item.project.slug
        };
      }))
    );
  }
}
