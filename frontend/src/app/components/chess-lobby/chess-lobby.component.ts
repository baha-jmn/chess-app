import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game-service/game.service';

@Component({
  selector: 'app-chess-lobby',
  templateUrl: './chess-lobby.component.html',
  styleUrls: ['./chess-lobby.component.scss']
})
export class ChessLobbyComponent implements OnInit {
  players: any[] = [
    { username: 'baha' },
    { username: 'bilel' },
    { username: 'sara' }
  ];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.moves$.subscribe(message => {
      console.log('WebSocket message received:', message);
    });
  }

  invite(player: any) {
    console.log('Inviting player:', player.username);
    this.gameService.sendMove({ type: 'INVITE', to: player.username });
  }
}
