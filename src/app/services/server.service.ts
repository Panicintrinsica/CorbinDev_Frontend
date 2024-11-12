import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../models/skill.model';
import { Education } from '../models/education.model';
import { environment } from '../../environments/environment';
import { Detail } from '../models/detail.model';
import { ContentBlock } from '../models/content.model';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private API = environment.API;

  constructor(private http: HttpClient) {}

  getAllDetails(): Observable<Detail[]> {
    return this.http.get<Detail[]>(`${this.API}/details`);
  }

  getContentGroup(selector: string): Observable<ContentBlock[]> {
    return this.http.get<ContentBlock[]>(
      `${this.API}/content/group/${selector}`,
    );
  }

  getDisplayedSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.API}/skills`);
  }

  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.API}/skills`);
  }

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.API}/schools`);
  }
}
