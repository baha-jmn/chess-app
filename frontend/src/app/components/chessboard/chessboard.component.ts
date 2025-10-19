import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game-service/game.service';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit {

  board: string[][] = Array(8).fill(null).map(() => Array(8).fill(''));
  selectedCell: { row: number; col: number } | null = null;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.connectWebSocket();

    this.gameService.moves$.subscribe(move => {
      const { from, to, piece } = move;
      this.board[to.row][to.col] = piece;
      this.board[from.row][from.col] = '';
    });
  }

  selectCell(row: number, col: number) {
    if (this.selectedCell) {
      this.gameService.sendMove({ from: this.selectedCell, to: { row, col } });
      this.selectedCell = null;
    } else {
      this.selectedCell = { row, col };
    }
  }
}
