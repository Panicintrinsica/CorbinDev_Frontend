import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Skill} from "../models/skill.model";
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
}
