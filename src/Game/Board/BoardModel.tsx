import { ReactNode } from 'react';
import { Cell } from '../Cell/CellModel';
import { Coordinates, xyType, yType } from '../Coordinates/Coordinates';
import { Piece } from '../Piece/PieceAbstraction';
import { BoardComponent } from './BoardComponent';
import { Pawn } from '../Piece/Pawn/PawnModel';
import { Rook } from '../Piece/Rook/RookModel';
import Knight from '../Piece/Knight/KnightModel';
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

  // NOTE - PUBLIC methods
  static getInstanceLink = (): Board => Board.instance;

  static getFieldLink(coordinates: xyType): IBoardField {
    return Board.instance.board[coordinates];
  }

  static movePiece = (piece: Piece, nextCoords: xyType) => {
    const prevField = this.getFieldLink(piece.coordinates);
    const nextField = this.getFieldLink(nextCoords);

    nextField.piece = piece;
    prevField.piece = null;

    piece.setNewCoords(nextCoords);

    nextField.cell.refreshComponent();
    prevField.cell.refreshComponent();
  };

  static click(Event: React.MouseEvent) {
    /* NOTE - Conditions & Scenarios
        1. Piece selection logic
        2. Piece already selected
          2.1. Click to unavailable zone
          2.2. Click to correct target
      */

    const target = Event.target as HTMLDivElement;
    const isHTML = target && target.parentNode instanceof HTMLDivElement;
    const targetCoords: xyType | null = getCoords();

    function getCoords(): xyType | null {
      // The helper function that returns coords of clicked cell/piece or null
      const parentDiv = isHTML
        ? (target.parentNode as HTMLElement)
        : (target.parentNode?.parentNode as HTMLElement) || null;

      return (parentDiv?.dataset.coordinates as xyType) || null;
    }

    console.log(targetCoords);
  }
}
