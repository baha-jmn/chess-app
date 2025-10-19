import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket-service/websocket.service';
import { AuthService } from '../auth-service/auth.service';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = `${environment.baseUrl}/api/game`;

  public moves$ = new Subject<any>();

  constructor(
    private http: HttpClient,
    private ws: WebsocketService,
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

  createGame(white: string, black: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, { white, black }, this.httpOptions);
  }

  getGame(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  getAllGames(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, this.httpOptions);
  }

  addMove(gameId: number, from: any, to: any, piece: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${gameId}/move`,
      { fromPosition: from, toPosition: to, piece },
      this.httpOptions
    );
  }

  finishGame(gameId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${gameId}/finish`, {}, this.httpOptions);
  }

  connectWebSocket() {
    this.ws.connect();
    this.ws.moves$.subscribe(move => this.moves$.next(move));
  }

  sendMove(move: any) {
    this.ws.sendMove(move);
  }

  onMoveReceived(): Observable<any> {
    return this.ws.moves$;
  }
}
