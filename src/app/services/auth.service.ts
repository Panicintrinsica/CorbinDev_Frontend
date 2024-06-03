import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = environment.API

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify({username, password});

    this.http.post<AuthTokenResponse>(`${this.API}/auth/login`, body, {'headers': headers}).subscribe({
        next: (response: AuthTokenResponse) => {
          if (response.token) {
            this.saveToken(response.token);
            this.router.navigate(['/admin']);
          }
        },
        error: (error) => {
          console.error(error);
        }
      }
    )

    return
  }

  saveToken(token: string) {
    let date = new Date();
    date.setHours(date.getHours() + 5);
    let diesAt = date.getTime();

    localStorage.setItem('authToken', token)
    localStorage.setItem('authTokenDeadline', diesAt.toString());
  }

  isTokenExpired() {
    let tokenDate = localStorage.getItem('authTokenDeadline')

    if (tokenDate) {
      return new Date().getTime() >= Number(tokenDate);
    } else {
      return true
    }
  }

  clearToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenDeadline');
  }

  getToken(){
    return localStorage.getItem('authToken');
  }

  isVerified(): Observable<boolean> {
    return this.http.post<isVerifiedResponse>(`${this.API}/auth/verify`, {token: this.getToken()}).pipe(
      map((response: isVerifiedResponse) => {
        return response.isVerified;
      }),
      catchError((error) => {
        console.error(error);
        return of(false);
      })
    );
  }
}

export interface AuthTokenResponse {
  token: string;
}

export interface isVerifiedResponse {
  isVerified: boolean;
}
