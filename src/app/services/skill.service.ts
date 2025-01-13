import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Skill } from '../models/skill.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private API = environment.API;

  _skillDetails = signal<Skill>({
    _id: '',
    acquired: '',
    group: '',
    isFeatured: false,
    isPublished: false,
    level: 0,
    link: '',
    logo: '',
    name: '',
    notes: '',
    proficiency: '',
  });

  get skillDetails() {
    return this._skillDetails;
  }

  skills: Subject<Skill[]> = new Subject();
  selectedSkills: Subject<Skill[]> = new Subject();

  constructor(private http: HttpClient) {}

  fetchSkillDetails(id: string) {
    return this.http
      .get<Skill>(`${this.API}/skills/${id}`)
      .subscribe((skill) => {
        this._skillDetails.set(skill);
      });
  }
}
