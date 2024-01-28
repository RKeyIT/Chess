import { useState } from 'react';
import { Coordinates, xyType } from '../model/Coordinates';
import { Board } from '../model/BoardModel';
import styles from './BoardStyles.module.css';

export function BoardComponent() {
  const coords: xyType[] = Coordinates.xyArray;

  const [board, setBoard] = useState(Board.getInstanceLink().board);
  const [renderedBoard, setRenderedBoard] = useState(renderBoard());

  function renderBoard() {
    return coords.map((coord: xyType) => {
      return board[coord].cell.component;
    });
  }

  function handleClick(e: React.MouseEvent) {
    Board.click(e);
    setBoard(Board.getInstanceLink().board);
    setRenderedBoard(renderBoard());
  }

  return (
    <div className={styles.Board} onClick={handleClick}>
      {renderedBoard}
    </div>
  );
}
