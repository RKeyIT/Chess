import { ReactNode } from 'react';
import { Cell } from '../Cell/CellModel';
import { Coordinates, xyType, yType } from '../Coordinates/Coordinates';
import { Piece } from '../Piece/PieceModel';
import { BoardComponent } from './BoardComponent';
import { Pawn } from '../Piece/Pawn/PawnModel';
import { Rook } from '../Piece/Rook/RookModel';
import { Knight } from '../Piece/Knight/KnightModel';
import { Bishop } from '../Piece/Bishop/BishopModel';
import { Queen } from '../Piece/Queen/QueenModel';
import { King } from '../Piece/King/KingModel';

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
  readonly component: ReactNode = (<BoardComponent />);

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

  private static spawnPiecesToCommonPositions(board: BoardTypeObject) {
    // this.spawnKingsCommonly(board);
    // this.spawnQueensCommonly(board);
    // this.spawnBishopsCommonly(board);
    // this.spawnKnightsCommonly(board);
    // this.spawnRooksCommonly(board);
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

  private static spawnRooksCommonly(board: BoardTypeObject) {
    board.A1.piece = new Rook('A1', 'white');
    board.H1.piece = new Rook('A8', 'white');
    board.A8.piece = new Rook('A8', 'black');
    board.H8.piece = new Rook('H8', 'black');
  }

  private static spawnKnightsCommonly(board: BoardTypeObject) {
    board.B1.piece = new Knight('B1', 'white');
    board.G1.piece = new Knight('G1', 'white');
    board.B8.piece = new Knight('B8', 'black');
    board.G8.piece = new Knight('G8', 'black');
  }
  private static spawnBishopsCommonly(board: BoardTypeObject) {
    board.C1.piece = new Bishop('C1', 'white');
    board.F1.piece = new Bishop('F1', 'white');
    board.C8.piece = new Bishop('C8', 'black');
    board.F8.piece = new Bishop('F8', 'black');
  }
  private static spawnQueensCommonly(board: BoardTypeObject) {
    board.D1.piece = new Queen('D1', 'white');
    board.D8.piece = new Queen('D8', 'black');
  }
  private static spawnKingsCommonly(board: BoardTypeObject) {
    board.E1.piece = new King('E1', 'white');
    board.E8.piece = new King('E8', 'black');
  }

  private static selectPiece(piece: Piece) {
    Board.selectedPiece = piece;
    Board.selectedPiece.isSelected = true;
  }
  private static dropPiece() {
    if (Board.selectedPiece) {
      Board.selectedPiece.isSelected = false;
    }

    Board.selectedPiece = null;
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
  static getInstanceLink = (): Board => Board.instance;
  static getBoardLink = (): BoardTypeObject => Board.instance.board;

  static getFieldLink(coordinates: xyType): IBoardField {
    return Board.instance.board[coordinates];
  }

  static click(Event: React.MouseEvent) {
    /* NOTE - Conditions & Scenarios
        0. Getting target coordinates
        1. Piece selection logic
        2. Piece already selected
          2.1. Click to piece with same color
          2.2. Click to unavailable zone
          2.3. Click to correct target
      */

    // 0. Getting target coordinates
    const target = Event.target as HTMLDivElement;
    const cellCoords: xyType = target.dataset.coordinates as xyType;
    const targetField = Board.getFieldLink(cellCoords);
    const piece = targetField.piece;

    // 1. Piece selection logic
    if (!Board.selectedPiece || Board.selectedPiece.color === piece?.color) {
      this.cancellHighlightingTargets();

      if (piece) {
        Board.selectPiece(piece);
        const targets: xyType[] = piece.targets;

        // highlight targets
        if (targets.length > 0) {
          this.highlightTargets(targets);
        }
      }
    } else {
      // 2. Piece already selected
      // 2.2. Click to unavailable zone
      const targets = Board.selectedPiece.targets;

      if (cellCoords && !targets.some((el) => el === cellCoords)) {
        Board.dropPiece();
      }

      //  2.3. Click to correct target
      if (cellCoords && targets.some((el) => el === cellCoords)) {
        const board = Board.instance.board;
        const prevCell = board[Board.selectedPiece.coordinates].cell;
        const nextCell = board[cellCoords].cell;

        Board.selectedPiece.move(board, cellCoords);
        Board.dropPiece();

        prevCell.refreshComponent();
        nextCell.refreshComponent();
      }

      this.cancellHighlightingTargets();
    }
  }
}
