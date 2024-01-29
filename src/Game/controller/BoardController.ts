import React from 'react';
import { Controller } from '.';
import { Board } from '../model/BoardModel';

export class BoardController extends Controller {
  private constructor() {
    super();
  }

  static click(event: React.MouseEvent) {
    Board.click(event);
  }
}
