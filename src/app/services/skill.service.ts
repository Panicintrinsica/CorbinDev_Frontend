import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {SkillLink, Skill} from "../models/skill.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private API = environment.API

  constructor(private http: HttpClient) { }

  getSkillList(): Observable<Skill[]>{
    return this.http.get<Skill[]>(`${this.API}/skills/list`)
  }

  getSkillsByProject(projectID: string): Observable<SkillLink[]>{
    return this.http.get<Skill[]>(`${this.API}/skills/byProject/${projectID}`).pipe(
      map((ProjectSkillResponse: any[]) => ProjectSkillResponse.map((item) => {
        return {
          "id": item.skill.id,
          "name": item.skill.name,
          "isFeatured": item.skill.isFeatured
        };
      }))
    );
  }

  getSkillById(id: string) {
    return this.http.get<Skill>(`${this.API}/skills/byID/${id}`)
  }
}
