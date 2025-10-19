import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game-service/game.service';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit {

  board: string[][] = [];
  selectedCell: { row: number; col: number } | null = null;
  gameId = 1;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.initializeBoard();
    this.gameService.connectWebSocket();
    this.gameService.onMoveReceived().subscribe(move => this.applyMove(move));
  }

  initializeBoard() {
    this.board = [
      ['♜','♞','♝','♛','♚','♝','♞','♜'], // black back row
      ['♟','♟','♟','♟','♟','♟','♟','♟'], // black pawns
      ['','','','','','','',''],           // empty row
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['♙','♙','♙','♙','♙','♙','♙','♙'], // white pawns
      ['♖','♘','♗','♕','♔','♗','♘','♖']  // white back row
    ];

  }

  getCellColor(row: number, col: number): string {
    return (row + col) % 2 === 0 ? 'white-cell' : 'black-cell';
  }

  selectCell(row: number, col: number) {
    const piece = this.board[row][col];
    if (this.selectedCell) {
      const from = this.selectedCell;
      const to = { row, col };
      const pieceMoved = this.board[from.row][from.col];

      this.gameService.sendMove({ gameId: this.gameId, from, to, piece: pieceMoved });

      this.applyMove({ from, to, piece: pieceMoved });
      this.selectedCell = null;
    } else if (piece) {
      this.selectedCell = { row, col };
    }
  }

  applyMove(move: { from: { row: number; col: number }; to: { row: number; col: number }; piece: string }) {
    this.board[move.to.row][move.to.col] = move.piece;
    this.board[move.from.row][move.from.col] = '';
  }
}
