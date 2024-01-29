// General types

import { Piece } from './model/Piece/PieceModel';

export type Color = 'white' | 'black';
export type Direction = 1 | -1;

export enum Pieces {
  KING = 'king',
  QUEEN = 'queen',
  BISHOP = 'bishop',
  KNIGHT = 'knight',
  ROOK = 'rook',
  PAWN = 'pawn',
}

export interface IPieceProps {
  model: Piece;
}
