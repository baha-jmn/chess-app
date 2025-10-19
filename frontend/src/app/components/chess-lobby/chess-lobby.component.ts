import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game-service/game.service';

@Component({
  selector: 'app-chess-lobby',
  templateUrl: './chess-lobby.component.html',
  styleUrls: ['./chess-lobby.component.scss']
})
export class ChessLobbyComponent implements OnInit {
  players: any[] = [];

  constructor(private gameService: GameService, private http: HttpClient) {}

  ngOnInit(): void {
    this.gameService.moves$.subscribe(message => {
      console.log('WebSocket message received:', message);
    });

    // Fetch online players from backend
    this.http.get<any[]>('http://localhost:8080/api/players/online')
      .subscribe({
        next: data => this.players = data,
        error: err => console.error('Failed to fetch players', err)
      });
  }

  invite(player: any) {
    console.log('Inviting player:', player.username);
    if (this.gameService.sendMove) {
      this.gameService.sendMove({ type: 'INVITE', to: player.username });
    } else {
      console.error('WebSocket service not initialized');
    }
  }
}
