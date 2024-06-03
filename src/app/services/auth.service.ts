import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Skill} from "../models/skill.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = environment.API

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify({username, password});
    return this.http.post<AuthTokenResponse>(`${this.API}/auth/login`, body,{'headers':headers})
  }
}

export interface AuthTokenResponse {
  token: string;
}
