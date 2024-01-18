import { Cell } from '../Cell/CellModel';
import { Coordinates, xyType } from '../Coordinates/Coordinates';

export type FieldTypeObject = Record<xyType, ISingleField>;

interface ISingleField {
  cell: Cell;
  piece: null;
}

export class Board {
  private static instance: Board | null;

  readonly field: FieldTypeObject;

  private constructor() {
    this.field = this.initializeField();
  }

  public static getInstance() {
    if (!Board.instance) {
      Board.instance = new Board();
    }

    return Board.instance;
  }

  private initializeField(): FieldTypeObject {
    const field = {} as FieldTypeObject;

    Coordinates.xyArray.forEach((coords: xyType) => {
      field[coords] = {
        cell: new Cell(coords),
        piece: null,
      };
    });

    return field;
  }

  public setCell(cell: Cell, coordinate: xyType) {
    this.field[coordinate].cell = cell;
  }
}
