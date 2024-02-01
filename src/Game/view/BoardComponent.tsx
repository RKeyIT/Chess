import { ReactNode, useState } from 'react';
import { Coordinates, xyType } from '../model/Coordinates';
import styles from './BoardStyles.module.css';
import { CellComponent } from './CellComponent';
import { BoardController } from '../controller/BoardController';
import { BoardTypeObject } from '../model/BoardModel';

interface IBoardState {
  board: BoardTypeObject;
  view: ReactNode[];
}

// TODO - Refactor re-render logic to reach concrete cells rendering instead of full board
export function BoardComponent() {
  const coords: xyType[] = Coordinates.xyArray;

  const [state, setState] = useState<IBoardState>({
    board: BoardController.board,
    view: renderBoard(BoardController.board),
  });

  function renderBoard(defaultState: BoardTypeObject | null = null) {
    return coords.map((coord: xyType) => {
      const model = defaultState
        ? defaultState[coord].cell
        : state.board[coord].cell;
      const { color, coordinates } = model;

      return <CellComponent key={color + coordinates} model={model} />;
    });
  }

  function click(event: React.MouseEvent) {
    const target = event.target as HTMLDivElement;
    const coords: xyType = target.dataset.coordinates as xyType;

    BoardController.click(coords);
    const updatedBoard = BoardController.board
    
    setState({
        board: updatedBoard,
        view: renderBoard(updatedBoard),
      });
  }

  return (
    <div className={styles.Board} onClick={click}>
      {state.view}
    </div>
  );
}
