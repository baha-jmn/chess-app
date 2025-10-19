import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  private apiUrl = `${environment.baseUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  login(data: {username: string, password: string}) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/signin`, data)
      .pipe(tap(res => localStorage.setItem(this.tokenKey, res.token)));
  }

  register(data: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }


  getToken() { return localStorage.getItem(this.tokenKey); }
  isLoggedIn() { return !!this.getToken(); }
}
