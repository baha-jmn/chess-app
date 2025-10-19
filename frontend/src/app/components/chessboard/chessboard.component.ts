import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game-service/game.service';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit {

  board: string[][] = [];
  flatBoard: string[] = [];
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
      ['♜','♞','♝','♛','♚','♝','♞','♜'],
      ['♟','♟','♟','♟','♟','♟','♟','♟'],
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['♙','♙','♙','♙','♙','♙','♙','♙'],
      ['♖','♘','♗','♕','♔','♗','♘','♖']
    ];
    
    this.flatBoard = this.board.flat();
  }

  getCellClass(row: number, col: number): string {
    const isWhite = (row + col) % 2 === 0;
    const isSelected = this.selectedCell?.row === row && this.selectedCell?.col === col;
    
    return `${isWhite ? 'white-cell' : 'black-cell'}${isSelected ? ' selected' : ''}`;
  }

  getCellClassByIndex(index: number): string {
    const row = Math.floor(index / 8);
    const col = index % 8;
    return this.getCellClass(row, col);
  }

  selectCell(row: number, col: number) {
    const piece = this.board[row][col];
    
    if (this.selectedCell) {
      const from = this.selectedCell;
      const to = { row, col };
      const pieceMoved = this.board[from.row][from.col];

      if (pieceMoved) {
        this.gameService.sendMove({ gameId: this.gameId, from, to, piece: pieceMoved });
        this.applyMove({ from, to, piece: pieceMoved });
      }
      
      this.selectedCell = null;
    } else if (piece) {
      this.selectedCell = { row, col };
    }
  }

  selectCellByIndex(index: number) {
    const row = Math.floor(index / 8);
    const col = index % 8;
    this.selectCell(row, col);
  }

  applyMove(move: { from: { row: number; col: number }; to: { row: number; col: number }; piece: string }) {
    this.board[move.to.row][move.to.col] = move.piece;
    this.board[move.from.row][move.from.col] = '';
    
    this.flatBoard = this.board.flat();
  }
}
