import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private client!: Client;
  public moves$ = new Subject<any>();

  private apiUrl = `${environment.baseUrl}/ws`;

  constructor(private auth: AuthService) {}

  connect() {
    const token = this.auth.getToken();

    this.client = new Client({
      webSocketFactory: () => new SockJS(this.apiUrl),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    this.client.onConnect = () => {
      this.client.subscribe('/topic/moves', (msg: IMessage) => {
        this.moves$.next(JSON.parse(msg.body));
      });
    };

    this.client.activate();
  }

  sendMove(move: any) {
    this.client.publish({ destination: '/app/move', body: JSON.stringify(move) });
  }
}
