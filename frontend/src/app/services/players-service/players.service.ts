import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private apiUrl = `${environment.baseUrl}/api/players/online`;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  private get httpOptions() {
    const token = this.auth.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
  }

  getOnlinePlayers(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl, this.httpOptions);
  }
}
