import { Cell } from './CellModel';
import { Coordinates, xyType, yType } from './Coordinates';
import { Piece } from './Piece/PieceModel';
import { Pawn } from './Piece/PawnModel';
import { Rook } from './Piece/RookModel';
import { Knight } from './Piece/KnightModel';
import { Bishop } from './Piece/BishopModel';
import { Queen } from './Piece/QueenModel';
import { King } from './Piece/KingModel';

export type BoardTypeObject = Record<xyType, IBoardField>;

export interface IBoardField {
  cell: Cell;
  piece: Piece | null;
}

export class Board {
  private constructor() {}
  private static instance: Board = new Board();
  private static selectedPiece: Piece | null = null;
  private static highlightedCoords: xyType[] = [];

  readonly board: BoardTypeObject = Board.createBoard();

  private static createBoard(): BoardTypeObject {
    const newBoard = {} as BoardTypeObject;

    Coordinates.xyArray.forEach((coords: xyType) => {
      newBoard[coords] = {
        cell: new Cell(coords),
        piece: null,
      };
    });

    this.spawnPiecesToCommonPositions(newBoard);

    return newBoard;
  }

  private static spawnPiecesToCommonPositions(board: BoardTypeObject): void {
    this.spawnKingsCommonly(board);
    this.spawnQueensCommonly(board);
    this.spawnBishopsCommonly(board);
    this.spawnKnightsCommonly(board);
    this.spawnRooksCommonly(board);
    this.spawnPawnsCommonly(board);
  }

  private static spawnPawnsCommonly(board: BoardTypeObject) {
    const lettersArr = Coordinates.xArr;
    const yWhite: yType = '2';
    const yBlack: yType = '7';

    for (let i = 0; i < 8; i++) {
      const x = lettersArr[i];
      const whitePawnCoords: xyType = `${x}${yWhite}`;
      const blackPawnCoords: xyType = `${x}${yBlack}`;

      board[whitePawnCoords].piece = new Pawn(whitePawnCoords, 'white');
      board[blackPawnCoords].piece = new Pawn(blackPawnCoords, 'black');
    }
  }

  private static spawnRooksCommonly(board: BoardTypeObject): void {
    board.A1.piece = new Rook('A1', 'white');
    board.H1.piece = new Rook('A8', 'white');
    board.A8.piece = new Rook('A8', 'black');
    board.H8.piece = new Rook('H8', 'black');
  }

  private static spawnKnightsCommonly(board: BoardTypeObject): void {
    board.B1.piece = new Knight('B1', 'white');
    board.G1.piece = new Knight('G1', 'white');
    board.B8.piece = new Knight('B8', 'black');
    board.G8.piece = new Knight('G8', 'black');
  }
  private static spawnBishopsCommonly(board: BoardTypeObject): void {
    board.C1.piece = new Bishop('C1', 'white');
    board.F1.piece = new Bishop('F1', 'white');
    board.C8.piece = new Bishop('C8', 'black');
    board.F8.piece = new Bishop('F8', 'black');
  }
  private static spawnQueensCommonly(board: BoardTypeObject): void {
    board.D1.piece = new Queen('D1', 'white');
    board.D8.piece = new Queen('D8', 'black');
  }
  private static spawnKingsCommonly(board: BoardTypeObject): void {
    board.E1.piece = new King('E1', 'white');
    board.E8.piece = new King('E8', 'black');
  }

  private static selectPiece(piece: Piece): void {
    this.selectedPiece = piece;
    this.selectedPiece.isSelected = true;
  }

  private static dropPiece(): void {
    if (this.selectedPiece) {
      this.selectedPiece.isSelected = false;
    }

    this.selectedPiece = null;
  }

  private static highlightTargets(targets: xyType[]) {
    this.highlightedCoords = [...targets];

    this.highlightedCoords.forEach((coord) => {
      this.instance.board[coord].cell.isUnderAttack = true;
    });
  }
  private static cancellHighlightingTargets() {
    this.highlightedCoords.forEach((coord) => {
      this.instance.board[coord].cell.isUnderAttack = false;
    });

    this.highlightedCoords.length = 0;
  }

  // NOTE - PUBLIC methods
  static get board() { return this.instance.board }
  static getInstanceLink = (): Board => this.instance;
  static getBoardLink = (): BoardTypeObject => this.instance.board;

  static getFieldLink(coordinates: xyType): IBoardField {
    return this.instance.board[coordinates];
  }

  static click(coords: xyType) {
    /* NOTE - Conditions & Scenarios
        0. Getting target coordinates
        1. Piece selection logic
        2. Piece already selected
          2.1. Click to piece with same color
          2.2. Click to unavailable zone
          2.3. Click to correct target
      */

    // 0. Getting target coordinates
    const targetField = this.board[coords];

    // if we'll try to drag cells we'll receive Board component to target
    // console.log(target) // NOTE <-- Board
    if (!targetField) return;

    const piece = targetField.piece;

    // 1. Piece selection logic || Piece with same color already selected
    if (!this.selectedPiece || this.selectedPiece.color === piece?.color) {
      console.log('1. Piece selection logic || Piece with same color already selected')
      if (this.selectedPiece === piece) {
        this.cancellHighlightingTargets();
        this.dropPiece();
        return;
      }

      if (this.selectedPiece) {
        this.cancellHighlightingTargets();
        this.dropPiece();
      }

      if (piece) {
        this.selectPiece(piece);
        const targets: xyType[] = piece.targets;

        // highlight targets
        if (targets.length > 0) {
          this.highlightTargets(targets);
        }
      }
    } else {
      // 2. Piece already selected
      const targets = this.selectedPiece.targets;
      
      // 2.2. Click to unavailable zone
      if (coords && !targets.some((el) => el === coords)) {
        console.log('2.2. Click to unavailable zone')
        this.dropPiece();
      }

      //  2.3. Click to correct target
      if (coords && targets.some((el) => el === coords)) {
        console.log('2.3. Click to correct target')
        const board = this.board;

        // TODO - En Passant special move
        /* 
          1. If it was first move of current pawn - set this flag to false
          2. Add this coordinates to board.underEnPassantCoords[]
        */

        this.selectedPiece.move(board, coords);
        this.dropPiece();
      }

      this.cancellHighlightingTargets();
    }
  }
}
