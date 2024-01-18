import { Coordinates, xyType } from '../Coordinates/Coordinates';

export type FieldTypeObject = Record<xyType, ISingleField>;

interface ISingleField {
  cell: null;
  piece: null;
}

export class Board {
  private static instance: Board | null;

  private field: FieldTypeObject;

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

    Coordinates.xyArray.forEach((xy: xyType) => {
      this.field[xy] = {
        cell: null,
        piece: null,
      };
    });

    return field;
  }
}
