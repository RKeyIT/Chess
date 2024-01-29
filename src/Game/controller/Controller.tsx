import { Board, BoardTypeObject } from '../model/BoardModel';

export abstract class Controller {
  private static _board: BoardTypeObject = Board.getInstanceLink().board;

  static get board(): BoardTypeObject {
    return this._board;
  }
}
