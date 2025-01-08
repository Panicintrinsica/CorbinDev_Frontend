import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, Observable, Subject } from 'rxjs';
import { Skill, SkillLink } from '../models/skill.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private API = environment.API;

  skills: Subject<Skill[]> = new Subject();
  selectedSkills: Subject<Skill[]> = new Subject();

  constructor(private http: HttpClient) {}

  getSkillList(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.API}/skills/list`);
  }

  getSkillsByProject(projectID: string): Observable<SkillLink[]> {
    return this.http
      .get<Skill[]>(`${this.API}/skills/byProject/${projectID}`)
      .pipe(
        map((ProjectSkillResponse: any[]) =>
          ProjectSkillResponse.map((item) => {
            return {
              id: item.skill.id,
              name: item.skill.name,
              isFeatured: item.skill.isFeatured,
            };
          }),
        ),
      );
  }

  getSkillById(id: string) {
    return this.http.get<Skill>(`${this.API}/skills/byID/${id}`);
  }

  getSelectedSkills(): Observable<Skill[]> {
    return this.selectedSkills;
  }
}
