import { useState } from 'react';
import { Piece } from '../Piece/PieceModel';
import { xyType } from '../Coordinates/Coordinates';
import { IBoardField } from '../Board/BoardModel';

interface IBoardState {
  selectedPiece: Piece | null; // pickedPiece state
  prevCoords: xyType | null; // chosenCoords state
  prevField: IBoardField | null; // prevPieceField state
  moveTargets: xyType[] | null; // targets state
  moveField: IBoardField | null; // nextPieceField state
}

type StateType = [
  IBoardState,
  React.Dispatch<React.SetStateAction<IBoardState>>
];

// State <--> Reducer <--> Dispatch(Action)
// Action --> Dispatch --> Reducer --> State

export class State {
  private constructor() {}
  private stateInstance = useState<IBoardState>({
    selectedPiece: null,
    moveTargets: null,
    prevField: null,
    prevCoords: null,
    moveField: null,
  });
  private state = this.stateInstance[0];
  private setState = this.stateInstance[1];

  public getState = (): IBoardState => this.state;
  public useState = (): StateType => [this.state, this.setState];
  public resetState = (): void => {
    this.setState({
      selectedPiece: null,
      prevField: null,
      prevCoords: null,
      moveTargets: null,
      moveField: null,
    });
  };

  // 1. selectPiece
  public selectPiece(piece: Piece): void {
    this.setState((prev) => ({ ...prev, selectedPiece: piece }));
  }
  public cancelPieceSelection(): void {
    this.setState((prev) => ({ ...prev, selectedPiece: null }));
  }

  // 2. moveTargets
  public setMoveTargets(targets: xyType[]): void {
    this.setState((prev) => ({ ...prev, moveTargets: targets }));
  }
  public resetMoveTargets(): void {
    this.setState((prev) => ({ ...prev, moveTargets: null }));
  }

  // 3. prevField
  public setPrevField(field: IBoardField): void {
    this.setState((prev) => ({ ...prev, prevField: field }));
  }
  public resetPrevField(): void {
    this.setState((prev) => ({ ...prev, prevField: null }));
  }

  // 4. prevCoords
  public setPrevCoords(coords: xyType): void {
    this.setState((prev) => ({ ...prev, prevCoords: coords }));
  }
  public resetPrevCoords(): void {
    this.setState((prev) => ({ ...prev, prevCoords: null }));
  }

  // 5. selectedMoveField
  public setMoveField(field: IBoardField): void {
    this.setState((prev) => ({ ...prev, moveField: field }));
  }
  public resetMoveField(): void {
    this.setState((prev) => ({ ...prev, moveField: null }));
  }
}
