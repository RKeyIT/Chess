import { ReactNode } from 'react';
import { Cell } from '../Cell/CellModel';
import { Coordinates, xyType, yType } from '../Coordinates/Coordinates';
import { Piece } from '../Piece/PieceAbstraction';
import { BoardComponent } from './BoardComponent';
import { Pawn } from '../Piece/Pawn/PawnModel';

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

  // NOTE - PUBLIC
  public static getInstanceLink = (): Board => Board.instance;

  public static getFieldLink(coordinates: xyType): IBoardField {
    return Board.instance.board[coordinates];
  }

  public static movePiece = (piece: Piece, nextCoords: xyType) => {
    const prevField = this.getFieldLink(piece.coordinates);
    const nextField = this.getFieldLink(nextCoords);

    nextField.piece = piece;
    prevField.piece = null;

    piece.setNewCoords(nextCoords);

    nextField.cell.refreshComponent();
    prevField.cell.refreshComponent();
  };
}
