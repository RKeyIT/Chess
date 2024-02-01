import { Board, BoardTypeObject } from '../model/BoardModel';
import { xyType } from '../model/Coordinates';

export class BoardController {
  private constructor() {}

  static click(coords: xyType) {
    Board.click(coords);
  }

  static get board(): BoardTypeObject {
    return Board.board;
  }
}
