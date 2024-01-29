import { ReactNode } from 'react';
import { Coordinates, xType, xyType, yType } from './Coordinates';
import { Color } from '../types';
import { CellComponent } from '../view/CellComponent';
import { Board, IBoardField } from './BoardModel';

export class Cell {
  readonly coordinates: xyType;
  readonly x: xType;
  readonly y: yType;
  readonly color: Color;

  // NOTE - this field will implemented by "lazy" initialisation by it getter
  private _boardField!: IBoardField;
  // FIXME - Remove view component from the model!
  private _component: ReactNode;

  private _isUnderAttack: boolean = false;
  get isUnderAttack() {
    return this._isUnderAttack;
  }
  set isUnderAttack(value: boolean) {
    // TODO - This move can be accept to highlight selected piece
    this._isUnderAttack = value;
    this.refreshComponent();
  }

  constructor(coordinates: xyType) {
    this.coordinates = coordinates;
    this.x = Coordinates.getX(coordinates);
    this.y = Coordinates.getY(coordinates);
    this.color = this.defineColor(this.x, this.y);
    this.refreshComponent();
  }

  refreshComponent = () => {
    this._component = (
      <CellComponent key={this.color + this.coordinates} model={this} />
    );
  };

  // NOTE - "Lazy initialisation" pattern
  get boardField() {
    if (!this._boardField) {
      this._boardField = Board.getFieldLink(this.coordinates);
    }

    return this._boardField;
  }

  get component() {
    return this._component;
  }

  private defineColor(x: xType, y: yType): Color {
    if (Number(y) % 2) {
      return ['A', 'C', 'E', 'G'].some((el) => el === x) ? 'black' : 'white';
    } else {
      return ['B', 'D', 'F', 'H'].some((el) => el === x) ? 'black' : 'white';
    }
  }
}
