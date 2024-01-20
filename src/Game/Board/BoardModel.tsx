import { ReactNode } from 'react';
import { Cell } from '../Cell/CellModel';
import { Coordinates, xyType } from '../Coordinates/Coordinates';
import { Pawn } from '../Piece/Pawn/PawnModel';
import { Piece } from '../Piece/PieceAbstraction';
import { BoardComponent } from './BoardComponent';

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

    newBoard['C3'].piece = new Pawn('C3', 'white');

    return newBoard;
  }

  public static getInstanceLink = (): Board => Board.instance;

  public static getFieldLink(coordinates: xyType): IBoardField {
    return Board.instance.board[coordinates];
  }

  public static movePiece = (piece: Piece, nextCoords: xyType) => {
    const prevCoords = piece.coordinates;

    this.getFieldLink(nextCoords).piece = piece;
    piece.setNewCoords(nextCoords);

    this.getFieldLink(prevCoords).piece = null;
  };
}
